import json
import re
from pathlib import Path
import tkinter as tk
from tkinter import filedialog, messagebox, ttk


APP_TITLE = "GLPI Endpoint Generator"


def endpoint_to_const_name(endpoint: str) -> str:
    cleaned = endpoint.strip("/")

    if not cleaned:
        return "ROOT"

    cleaned = cleaned.replace("{", "BY_").replace("}", "")
    cleaned = re.sub(r"[^A-Za-z0-9]+", "_", cleaned)
    cleaned = re.sub(r"_+", "_", cleaned)
    cleaned = cleaned.strip("_")

    return cleaned.upper()


def load_endpoints(endpoint_file: Path) -> list[str]:
    with endpoint_file.open("r", encoding="utf-8") as file:
        data = json.load(file)

    if not isinstance(data, list):
        raise ValueError("Le fichier endpoint.json doit contenir une liste JSON.")

    endpoints = [item for item in data if isinstance(item, str)]
    return sorted(set(endpoints))


def generate_typescript(endpoints: list[str]) -> str:
    lines = [
        "// Auto-generated file. Do not edit manually.",
        "// Generated from GLPI endpoint.json.",
        "",
        "export const ENDPOINTS = {",
    ]

    used_names: set[str] = set()

    for endpoint in endpoints:
        name = endpoint_to_const_name(endpoint)

        base_name = name
        index = 2

        while name in used_names:
            name = f"{base_name}_{index}"
            index += 1

        used_names.add(name)
        lines.append(f"  {name}: '{endpoint}',")

    lines.extend([
        "} as const",
        "",
        "export type GlpiEndpointKey = keyof typeof ENDPOINTS",
        "export type GlpiEndpoint = (typeof ENDPOINTS)[GlpiEndpointKey]",
        "",
    ])

    return "\n".join(lines)


class GlpiEndpointGeneratorApp:
    def __init__(self, root: tk.Tk):
        self.root = root
        self.root.title(APP_TITLE)
        self.root.geometry("980x460")
        self.root.minsize(850, 420)

        self.endpoint_file = tk.StringVar()
        self.swagger_file = tk.StringVar()
        self.output_directory = tk.StringVar()
        self.output_filename = tk.StringVar(value="endpoints.ts")

        self.endpoint_count = tk.StringVar(value="Aucun fichier chargé.")

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
            text="Génère un fichier TypeScript propre à partir des endpoints GLPI.",
        )
        subtitle.pack(anchor="w", pady=(4, 24))

        form = ttk.Frame(main)
        form.pack(fill="x")

        self.add_file_row(
            form,
            row=0,
            label="Fichier endpoint.json",
            variable=self.endpoint_file,
            command=self.choose_endpoint_file,
        )

        self.add_file_row(
            form,
            row=1,
            label="Fichier swagger.json",
            variable=self.swagger_file,
            command=self.choose_swagger_file,
            optional=True,
        )

        self.add_directory_row(
            form,
            row=2,
            label="Dossier de génération",
            variable=self.output_directory,
            command=self.choose_output_directory,
        )

        ttk.Label(form, text="Nom du fichier généré").grid(
            row=3,
            column=0,
            sticky="w",
            pady=10,
        )

        ttk.Entry(form, textvariable=self.output_filename).grid(
            row=3,
            column=1,
            sticky="ew",
            padx=12,
            pady=10,
        )

        form.columnconfigure(1, weight=1)

        status_frame = ttk.Frame(main)
        status_frame.pack(fill="x", pady=(20, 8))

        ttk.Label(
            status_frame,
            textvariable=self.endpoint_count,
            foreground="#555555",
        ).pack(anchor="w")

        actions = ttk.Frame(main)
        actions.pack(fill="x", pady=(16, 0))

        generate_button = ttk.Button(
            actions,
            text="Générer endpoints.ts",
            command=self.generate,
        )
        generate_button.pack(side="right")

        preview_button = ttk.Button(
            actions,
            text="Analyser endpoint.json",
            command=self.preview_endpoint_file,
        )
        preview_button.pack(side="right", padx=(0, 12))

        footer = ttk.Label(
            main,
            text="Conseil : sélectionne NewApp/docs/endpoint.json puis NewApp/src/generated comme dossier de génération.",
            foreground="#666666",
        )
        footer.pack(anchor="w", side="bottom")

    def add_file_row(self, parent, row, label, variable, command, optional=False):
        label_text = f"{label} (optionnel)" if optional else label

        ttk.Label(parent, text=label_text).grid(
            row=row,
            column=0,
            sticky="w",
            pady=10,
        )

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

    def add_directory_row(self, parent, row, label, variable, command):
        ttk.Label(parent, text=label).grid(
            row=row,
            column=0,
            sticky="w",
            pady=10,
        )

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

    def choose_endpoint_file(self):
        file_path = filedialog.askopenfilename(
            title="Sélectionner endpoint.json",
            initialdir=str(Path.home()),
            filetypes=[
                ("JSON files", "*.json"),
                ("All files", "*.*"),
            ],
        )

        if file_path:
            self.endpoint_file.set(file_path)
            self.preview_endpoint_file()

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

    def choose_output_directory(self):
        directory = filedialog.askdirectory(
            title="Choisir le dossier de génération",
            initialdir=str(Path.home()),
        )

        if directory:
            self.output_directory.set(directory)

    def preview_endpoint_file(self):
        endpoint_path = Path(self.endpoint_file.get())

        if not endpoint_path.exists():
            self.endpoint_count.set("Aucun fichier endpoint.json valide sélectionné.")
            return

        try:
            endpoints = load_endpoints(endpoint_path)
            self.endpoint_count.set(
                f"{len(endpoints)} endpoint(s) détecté(s) dans {endpoint_path.name}."
            )
        except Exception as error:
            self.endpoint_count.set("Erreur lors de l'analyse du fichier.")
            messagebox.showerror("Erreur", str(error))

    def validate_inputs(self) -> tuple[Path, Path]:
        endpoint_path = Path(self.endpoint_file.get())
        output_dir = Path(self.output_directory.get())
        output_filename = self.output_filename.get().strip()

        if not endpoint_path.exists():
            raise ValueError("Sélectionne un fichier endpoint.json valide.")

        if not output_dir.exists():
            raise ValueError("Sélectionne un dossier de génération valide.")

        if not output_filename:
            raise ValueError("Le nom du fichier généré est obligatoire.")

        if not output_filename.endswith(".ts"):
            output_filename += ".ts"

        output_path = output_dir / output_filename

        return endpoint_path, output_path

    def generate(self):
        try:
            endpoint_path, output_path = self.validate_inputs()

            endpoints = load_endpoints(endpoint_path)
            content = generate_typescript(endpoints)

            output_path.write_text(content, encoding="utf-8")

            messagebox.showinfo(
                "Génération réussie",
                f"Fichier généré avec succès.\n\n"
                f"Endpoints : {len(endpoints)}\n"
                f"Fichier : {output_path}",
            )

            self.endpoint_count.set(
                f"Génération terminée : {len(endpoints)} endpoint(s)."
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

    app = GlpiEndpointGeneratorApp(root)
    root.mainloop()


if __name__ == "__main__":
    main()