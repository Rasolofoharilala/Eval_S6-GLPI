import re
from pathlib import Path
import tkinter as tk
from tkinter import filedialog, messagebox, ttk


APP_TITLE = "GLPI Composable Generator"


def to_pascal_case(value: str) -> str:
    parts = re.split(r"[^A-Za-z0-9]+", value)
    return "".join(part.capitalize() for part in parts if part)


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


def singularize(name: str) -> str:
    if name.endswith("ies"):
        return name[:-3] + "y"

    if name.endswith("s") and not name.endswith("ss"):
        return name[:-1]

    return name


def extract_resource_from_service_file(file_path: Path) -> str:
    name = file_path.stem

    if not name.endswith("Service"):
        raise ValueError(f"Le fichier {file_path.name} n'est pas un service valide.")

    return name.replace("Service", "")


def find_exported_functions(service_content: str) -> list[str]:
    pattern = re.compile(r"export\s+const\s+([A-Za-z0-9_]+)\s*=")
    return pattern.findall(service_content)


def find_get_all_function(functions: list[str], resource: str) -> str | None:
    plural_resource = pluralize(resource)
    expected = f"get{to_pascal_case(plural_resource)}"

    if expected in functions:
        return expected

    for function in functions:
        if function.startswith("get") and function.endswith("s"):
            return function

    for function in functions:
        if function.startswith("get") and not function.endswith("ById"):
            return function

    return None


def find_get_by_id_function(functions: list[str], resource: str) -> str | None:
    expected = f"get{to_pascal_case(resource)}ById"

    if expected in functions:
        return expected

    for function in functions:
        if function.startswith("get") and function.endswith("ById"):
            return function

    return None


def find_resource_type(service_content: str) -> str:
    match = re.search(
        r"export\s+type\s+\{\s*([A-Za-z0-9_]+)\s*\}\s+from\s+'@/types/generated'",
        service_content,
    )
    return match.group(1) if match else "unknown"


def generate_composable_content(
    service_file: Path,
    resource: str,
    get_all_function: str,
    get_by_id_function: str | None,
    resource_type: str,
) -> str:
    plural_resource = pluralize(resource)

    pascal_resource = to_pascal_case(resource)
    pascal_plural = to_pascal_case(plural_resource)

    camel_resource = to_camel_case(resource)
    camel_plural = to_camel_case(plural_resource)

    service_module = service_file.stem

    imports = [
        "import { ref } from 'vue'",
        f"import {{ {get_all_function}{', ' + get_by_id_function if get_by_id_function else ''} }} from '@/services/generated/{service_module}'",
        f"import type {{ {resource_type} }} from '@/services/generated/{service_module}'" if resource_type != "unknown" else "",
        "",
    ]
    imports = [line for line in imports if line]
    imports.append("")

    lines = [
        "// Auto-generated file. Do not edit manually.",
        f"// Composable generated from {service_file.name}.",
        "",
        *imports,
        f"export function use{pascal_plural}() {{",
        f"  const {camel_plural} = ref<{resource_type}[]>([])",
        f"  const selected{pascal_resource} = ref<{resource_type} | null>(null)",
        "  const loading = ref(false)",
        "  const error = ref<string | null>(null)",
        "",
        f"  async function load{pascal_plural}() {{",
        "    loading.value = true",
        "    error.value = null",
        "",
        "    try {",
        f"      {camel_plural}.value = await {get_all_function}()",
        "    } catch (err) {",
        "      error.value = err instanceof Error ? err.message : 'Erreur inconnue'",
        "    } finally {",
        "      loading.value = false",
        "    }",
        "  }",
        "",
    ]

    if get_by_id_function:
        lines.extend([
            f"  async function load{pascal_resource}ById(id: number) {{",
            "    loading.value = true",
            "    error.value = null",
            "",
            "    try {",
            f"      selected{pascal_resource}.value = await {get_by_id_function}(id)",
            "    } catch (err) {",
            "      error.value = err instanceof Error ? err.message : 'Erreur inconnue'",
            "    } finally {",
            "      loading.value = false",
            "    }",
            "  }",
            "",
        ])

    lines.extend([
        "  return {",
        f"    {camel_plural},",
        f"    selected{pascal_resource},",
        "    loading,",
        "    error,",
        f"    load{pascal_plural},",
    ])

    if get_by_id_function:
        lines.append(f"    load{pascal_resource}ById,")

    lines.extend([
        "  }",
        "}",
        "",
    ])

    return "\n".join(lines)


def generate_index_file(files: list[str]) -> str:
    lines = [
        "// Auto-generated file. Do not edit manually.",
        "",
    ]

    for file_name in sorted(files):
        module_name = file_name.replace(".ts", "")
        lines.append(f"export * from './{module_name}'")

    lines.append("")
    return "\n".join(lines)


class GlpiComposableGeneratorApp:
    def __init__(self, root: tk.Tk):
        self.root = root
        self.root.title(APP_TITLE)
        self.root.geometry("980x460")
        self.root.minsize(860, 420)

        self.services_directory = tk.StringVar()
        self.output_directory = tk.StringVar()
        self.generate_index = tk.BooleanVar(value=True)

        self.status_text = tk.StringVar(value="Aucun dossier de services sélectionné.")

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
            text="Génère automatiquement des composables Vue à partir des services GLPI.",
        )
        subtitle.pack(anchor="w", pady=(4, 24))

        form = ttk.Frame(main)
        form.pack(fill="x")

        self.add_directory_row(
            form,
            row=0,
            label="Dossier des services générés",
            variable=self.services_directory,
            command=self.choose_services_directory,
        )

        self.add_directory_row(
            form,
            row=1,
            label="Dossier de sortie des composables",
            variable=self.output_directory,
            command=self.choose_output_directory,
        )

        options = ttk.LabelFrame(main, text="Options", padding=14)
        options.pack(fill="x", pady=(20, 10))

        ttk.Checkbutton(
            options,
            text="Générer index.ts",
            variable=self.generate_index,
        ).pack(anchor="w")

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
            text="Analyser les services",
            command=self.preview,
        ).pack(side="right", padx=(0, 12))

        ttk.Button(
            actions,
            text="Générer les composables",
            command=self.generate,
        ).pack(side="right")

        footer = ttk.Label(
            main,
            text="Conseil : entrée = NewApp/src/services/generated ; sortie = NewApp/src/composables/generated.",
            foreground="#666666",
        )
        footer.pack(anchor="w", side="bottom")

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

    def choose_services_directory(self):
        directory = filedialog.askdirectory(
            title="Choisir le dossier des services générés",
            initialdir=str(Path.home()),
        )

        if directory:
            self.services_directory.set(directory)
            self.preview()

    def choose_output_directory(self):
        directory = filedialog.askdirectory(
            title="Choisir le dossier de sortie des composables",
            initialdir=str(Path.home()),
        )

        if directory:
            self.output_directory.set(directory)

    def validate_inputs(self) -> tuple[Path, Path]:
        services_dir = Path(self.services_directory.get())
        output_dir = Path(self.output_directory.get())

        if not services_dir.exists():
            raise ValueError("Sélectionne un dossier de services valide.")

        if not output_dir.exists():
            raise ValueError("Sélectionne un dossier de sortie valide.")

        return services_dir, output_dir

    def get_service_files(self, services_dir: Path) -> list[Path]:
        files = [
            file
            for file in services_dir.glob("*Service.ts")
            if file.name != "index.ts"
        ]

        return sorted(files)

    def preview(self):
        services_dir = Path(self.services_directory.get())

        if not services_dir.exists():
            self.status_text.set("Aucun dossier de services valide sélectionné.")
            return

        files = self.get_service_files(services_dir)

        self.status_text.set(
            f"{len(files)} service(s) détecté(s) dans {services_dir.name}."
        )

    def generate(self):
        try:
            services_dir, output_dir = self.validate_inputs()
            service_files = self.get_service_files(services_dir)

            if not service_files:
                raise ValueError("Aucun fichier *Service.ts trouvé.")

            generated_files: list[str] = []

            for service_file in service_files:
                resource = extract_resource_from_service_file(service_file)
                service_content = service_file.read_text(encoding="utf-8")
                functions = find_exported_functions(service_content)

                get_all_function = find_get_all_function(functions, resource)
                get_by_id_function = find_get_by_id_function(functions, resource)
                resource_type = find_resource_type(service_content)

                if not get_all_function:
                    continue

                plural_resource = pluralize(resource)
                composable_name = f"use{to_pascal_case(plural_resource)}.ts"

                content = generate_composable_content(
                    service_file=service_file,
                    resource=resource,
                    get_all_function=get_all_function,
                    get_by_id_function=get_by_id_function,
                    resource_type=resource_type,
                )

                output_path = output_dir / composable_name
                output_path.write_text(content, encoding="utf-8")

                generated_files.append(composable_name)

            if not generated_files:
                raise ValueError("Aucun composable n'a pu être généré.")

            if self.generate_index.get():
                index_path = output_dir / "index.ts"
                index_content = generate_index_file(generated_files)
                index_path.write_text(index_content, encoding="utf-8")

            self.status_text.set(
                f"Génération terminée : {len(generated_files)} composable(s)."
            )

            messagebox.showinfo(
                "Succès",
                f"Génération réussie.\n\n"
                f"Composables générés : {len(generated_files)}\n"
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

    GlpiComposableGeneratorApp(root)
    root.mainloop()


if __name__ == "__main__":
    main()
