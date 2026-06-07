import json
import re
from pathlib import Path
import tkinter as tk
from tkinter import filedialog, messagebox, ttk


APP_TITLE = "GLPI Service Generator"


EndpointMap = dict[str, str]
Swagger = dict[str, object]

SCHEMA_ALIASES = {
    "CalendarCloseTime": "CloseTime",
}


def parse_endpoints_ts(file_path: Path) -> EndpointMap:
    content = file_path.read_text(encoding="utf-8")

    pattern = re.compile(r"^\s*([A-Z0-9_]+)\s*:\s*'([^']+)'\s*,?\s*$", re.MULTILINE)

    endpoints: EndpointMap = {}

    for match in pattern.finditer(content):
        key = match.group(1)
        value = match.group(2)
        endpoints[key] = value

    if not endpoints:
        raise ValueError("Aucun endpoint trouvé dans le fichier endpoints.ts.")

    return endpoints


def to_pascal_case(value: str) -> str:
    parts = re.split(r"[^A-Za-z0-9]+", value)
    return "".join(part.capitalize() for part in parts if part)


def schema_to_type_name(value: str) -> str:
    parts = re.split(r"[^A-Za-z0-9]+", value)
    return "".join(part[:1].upper() + part[1:] for part in parts if part)


def load_swagger(file_path: Path) -> Swagger:
    with file_path.open("r", encoding="utf-8") as file:
        data = json.load(file)

    if not isinstance(data, dict):
        raise ValueError("Le fichier swagger.json doit contenir un objet JSON.")

    return data


def extract_response_type(swagger: Swagger, endpoint: str) -> str | None:
    paths = swagger.get("paths", {})

    if not isinstance(paths, dict):
        return None

    path_data = paths.get(endpoint, {})
    if not isinstance(path_data, dict):
        return None

    get_data = path_data.get("get", {})
    if not isinstance(get_data, dict):
        return None

    responses = get_data.get("responses", {})
    if not isinstance(responses, dict):
        return None

    response = responses.get("200", {})
    if not isinstance(response, dict):
        return None

    content = response.get("content", {})
    if not isinstance(content, dict):
        return None

    json_content = content.get("application/json", {})
    if not isinstance(json_content, dict):
        return None

    schema = json_content.get("schema", {})
    if not isinstance(schema, dict):
        return None

    if schema.get("type") == "array":
        items = schema.get("items", {})
        if isinstance(items, dict):
            schema = items

    ref = schema.get("$ref")
    if not isinstance(ref, str):
        return None

    schema_name = ref.split("/")[-1]
    schemas = swagger.get("components", {})
    if isinstance(schemas, dict):
        schemas = schemas.get("schemas", {})

    if not isinstance(schemas, dict):
        return None

    resolved_name = SCHEMA_ALIASES.get(schema_name, schema_name)
    if resolved_name not in schemas:
        return None

    return schema_to_type_name(resolved_name)


def to_camel_case(value: str) -> str:
    pascal = to_pascal_case(value)
    if not pascal:
        return "resource"
    return pascal[0].lower() + pascal[1:]


def pluralize(name: str) -> str:
    if name.endswith("y"):
        return name[:-1] + "ies"

    if name.endswith("s"):
        return name + "List"

    return name + "s"


def service_file_name(resource_name: str) -> str:
    return f"{to_camel_case(resource_name)}Service.ts"


def extract_resource_name(endpoint: str) -> str:
    parts = [part for part in endpoint.strip("/").split("/") if part]

    if not parts:
        return "Root"

    return parts[-1]


def is_simple_collection_endpoint(endpoint: str) -> bool:
    if endpoint == "/":
        return False

    if "{" in endpoint or "}" in endpoint:
        return False

    if endpoint.endswith("/"):
        return False

    return True


def find_by_id_key(collection_key: str, collection_endpoint: str, endpoints: EndpointMap) -> str | None:
    expected_path = f"{collection_endpoint}/{{id}}"

    for key, value in endpoints.items():
        if value == expected_path:
            return key

    return None


def should_ignore_endpoint(endpoint: str) -> bool:
    ignored_prefixes = [
        "/authorize",
        "/doc",
        "/doc.json",
        "/getting-started",
        "/swagger-oauth-redirect",
        "/token",
        "/session",
        "/locales",
        "/GraphQL",
    ]

    return any(endpoint.startswith(prefix) for prefix in ignored_prefixes)


def generate_service_content(
    collection_key: str,
    collection_endpoint: str,
    by_id_key: str | None,
    include_write_methods: bool,
    response_type: str | None = None,
) -> str:
    resource_name = extract_resource_name(collection_endpoint)

    pascal_name = to_pascal_case(resource_name)
    camel_name = to_camel_case(resource_name)
    plural_name = pluralize(camel_name)

    imports = [
        "import { getAll, getById } from '@/api/crudClient'",
        "import { ENDPOINTS } from '@/generated/endpoints'",
    ]

    if response_type:
        imports.append(f"import type {{ {response_type} }} from '@/types/generated'")

    if include_write_methods:
        imports[0] = "import { getAll, getById, create, update, remove } from '@/api/crudClient'"

    lines = [
        "// Auto-generated file. Do not edit manually.",
        f"// Service generated for {collection_endpoint}.",
        "",
        *imports,
        "",
        *([f"export type {{ {response_type} }} from '@/types/generated'", ""] if response_type else []),
        f"export const get{to_pascal_case(plural_name)} = () =>",
        f"  getAll<{response_type or 'unknown'}>(ENDPOINTS.{collection_key})",
        "",
    ]

    if by_id_key:
        lines.extend([
            f"export const get{pascal_name}ById = (id: number) =>",
            f"  getById<{response_type or 'unknown'}>(ENDPOINTS.{collection_key}, id)",
            "",
        ])

    if include_write_methods:
        lines.extend([
            f"export const create{pascal_name} = <Payload>(payload: Payload) =>",
            f"  create(ENDPOINTS.{collection_key}, payload)",
            "",
        ])

        if by_id_key:
            lines.extend([
                f"export const update{pascal_name} = <Payload>(id: number, payload: Payload) =>",
                f"  update(ENDPOINTS.{collection_key}, id, payload)",
                "",
                f"export const delete{pascal_name} = (id: number) =>",
                f"  remove(ENDPOINTS.{collection_key}, id)",
                "",
            ])

    return "\n".join(lines)


def generate_index_file(service_files: list[str]) -> str:
    lines = [
        "// Auto-generated file. Do not edit manually.",
        "",
    ]

    for file_name in sorted(service_files):
        module_name = file_name.replace(".ts", "")
        lines.append(f"export * from './{module_name}'")

    lines.append("")
    return "\n".join(lines)


class GlpiServiceGeneratorApp:
    def __init__(self, root: tk.Tk):
        self.root = root
        self.root.title(APP_TITLE)
        self.root.geometry("980x500")
        self.root.minsize(860, 460)

        self.endpoints_file = tk.StringVar()
        self.swagger_file = tk.StringVar()
        self.output_directory = tk.StringVar()

        self.include_write_methods = tk.BooleanVar(value=False)
        self.generate_index = tk.BooleanVar(value=True)

        self.status_text = tk.StringVar(value="Aucun fichier endpoints.ts sélectionné.")

        self.build_ui()

    def build_ui(self):
        main = ttk.Frame(self.root, padding=24)
        main.pack(fill="both", expand=True)

        title = ttk.Label(
            main,
            text=APP_TITLE,
            font=("Arial", 18, "bold"),
        )
        title.pack(anchor="w")

        subtitle = ttk.Label(
            main,
            text="Génère automatiquement des services TypeScript à partir de ENDPOINTS.",
        )
        subtitle.pack(anchor="w", pady=(4, 24))

        form = ttk.Frame(main)
        form.pack(fill="x")

        self.add_file_row(
            form,
            row=0,
            label="Fichier endpoints.ts",
            variable=self.endpoints_file,
            command=self.choose_endpoints_file,
        )

        self.add_directory_row(
            form,
            row=2,
            label="Dossier de sortie des services",
            variable=self.output_directory,
            command=self.choose_output_directory,
        )

        self.add_file_row(
            form,
            row=1,
            label="Fichier swagger.json",
            variable=self.swagger_file,
            command=self.choose_swagger_file,
        )

        options = ttk.LabelFrame(main, text="Options", padding=14)
        options.pack(fill="x", pady=(20, 10))

        ttk.Checkbutton(
            options,
            text="Générer aussi create/update/delete",
            variable=self.include_write_methods,
        ).pack(anchor="w")

        ttk.Checkbutton(
            options,
            text="Générer index.ts",
            variable=self.generate_index,
        ).pack(anchor="w", pady=(8, 0))

        status = ttk.Label(
            main,
            textvariable=self.status_text,
            foreground="#555555",
        )
        status.pack(anchor="w", pady=(16, 0))

        actions = ttk.Frame(main)
        actions.pack(fill="x", pady=(24, 0))

        ttk.Button(
            actions,
            text="Analyser endpoints.ts",
            command=self.preview,
        ).pack(side="right", padx=(0, 12))

        ttk.Button(
            actions,
            text="Générer les services",
            command=self.generate,
        ).pack(side="right")

        footer = ttk.Label(
            main,
            text="Conseil : entrée = NewApp/src/generated/endpoints.ts ; sortie = NewApp/src/services/generated.",
            foreground="#666666",
        )
        footer.pack(anchor="w", side="bottom")

    def add_file_row(self, parent, row, label, variable, command):
        ttk.Label(parent, text=label).grid(row=row, column=0, sticky="w", pady=10)

        ttk.Entry(parent, textvariable=variable).grid(
            row=row,
            column=1,
            sticky="ew",
            padx=12,
            pady=10,
        )

        ttk.Button(parent, text="Parcourir", command=command).grid(
            row=row,
            column=2,
            sticky="e",
            pady=10,
        )

        parent.columnconfigure(1, weight=1)

    def add_directory_row(self, parent, row, label, variable, command):
        ttk.Label(parent, text=label).grid(row=row, column=0, sticky="w", pady=10)

        ttk.Entry(parent, textvariable=variable).grid(
            row=row,
            column=1,
            sticky="ew",
            padx=12,
            pady=10,
        )

        ttk.Button(parent, text="Parcourir", command=command).grid(
            row=row,
            column=2,
            sticky="e",
            pady=10,
        )

        parent.columnconfigure(1, weight=1)

    def choose_endpoints_file(self):
        file_path = filedialog.askopenfilename(
            title="Sélectionner endpoints.ts",
            initialdir=str(Path.home()),
            filetypes=[
                ("TypeScript files", "*.ts"),
                ("All files", "*.*"),
            ],
        )

        if file_path:
            self.endpoints_file.set(file_path)
            self.preview()

    def choose_output_directory(self):
        directory = filedialog.askdirectory(
            title="Choisir le dossier de sortie",
            initialdir=str(Path.home()),
        )

        if directory:
            self.output_directory.set(directory)

    def choose_swagger_file(self):
        file_path = filedialog.askopenfilename(
            title="Sélectionner swagger.json",
            initialdir=str(Path.home()),
            filetypes=[
                ("JSON files", "*.json"),
                ("All files", "*.*"),
            ],
        )

        if file_path:
            self.swagger_file.set(file_path)

    def validate_inputs(self) -> tuple[Path, Path, Path]:
        endpoints_path = Path(self.endpoints_file.get())
        swagger_path = Path(self.swagger_file.get())
        output_dir = Path(self.output_directory.get())

        if not endpoints_path.exists():
            raise ValueError("Sélectionne un fichier endpoints.ts valide.")

        if not output_dir.exists():
            raise ValueError("Sélectionne un dossier de sortie valide.")

        if not swagger_path.exists():
            raise ValueError("Sélectionne un fichier swagger.json valide.")

        return endpoints_path, swagger_path, output_dir

    def get_generatable_services(self, endpoints: EndpointMap) -> list[tuple[str, str, str | None]]:
        services = []

        for key, endpoint in endpoints.items():
            if should_ignore_endpoint(endpoint):
                continue

            if not is_simple_collection_endpoint(endpoint):
                continue

            by_id_key = find_by_id_key(key, endpoint, endpoints)

            services.append((key, endpoint, by_id_key))

        return services

    def preview(self):
        endpoints_path = Path(self.endpoints_file.get())

        if not endpoints_path.exists():
            self.status_text.set("Aucun fichier endpoints.ts valide sélectionné.")
            return

        try:
            endpoints = parse_endpoints_ts(endpoints_path)
            services = self.get_generatable_services(endpoints)

            self.status_text.set(
                f"{len(endpoints)} endpoint(s) détecté(s). "
                f"{len(services)} service(s) générable(s)."
            )

        except Exception as error:
            self.status_text.set("Erreur lors de l'analyse du fichier.")
            messagebox.showerror("Erreur", str(error))

    def generate(self):
        try:
            endpoints_path, swagger_path, output_dir = self.validate_inputs()

            endpoints = parse_endpoints_ts(endpoints_path)
            swagger = load_swagger(swagger_path)
            services = self.get_generatable_services(endpoints)

            if not services:
                raise ValueError("Aucun service générable trouvé.")

            generated_files = []

            for collection_key, collection_endpoint, by_id_key in services:
                resource_name = extract_resource_name(collection_endpoint)
                file_name = service_file_name(resource_name)
                output_path = output_dir / file_name

                content = generate_service_content(
                    collection_key=collection_key,
                    collection_endpoint=collection_endpoint,
                    by_id_key=by_id_key,
                    include_write_methods=self.include_write_methods.get(),
                    response_type=extract_response_type(swagger, collection_endpoint),
                )

                output_path.write_text(content, encoding="utf-8")
                generated_files.append(file_name)

            if self.generate_index.get():
                index_path = output_dir / "index.ts"
                index_content = generate_index_file(generated_files)
                index_path.write_text(index_content, encoding="utf-8")

            self.status_text.set(
                f"Génération terminée : {len(generated_files)} service(s)."
            )

            messagebox.showinfo(
                "Succès",
                f"Génération réussie.\n\n"
                f"Services générés : {len(generated_files)}\n"
                f"Dossier : {output_dir}",
            )

        except Exception as error:
            messagebox.showerror("Erreur", str(error))


def main():
    root = tk.Tk()

    try:
        style = ttk.Style()
        style.theme_use("clam")
    except tk.TclError:
        pass

    GlpiServiceGeneratorApp(root)
    root.mainloop()


if __name__ == "__main__":
    main()
