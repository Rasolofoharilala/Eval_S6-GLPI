import axios from 'axios'

// ═════════════════════════════════════════════════════════════════════════════
// SERVICE : CRUD DES LANGUES DU KANBAN
//
// Chaque langue a 3 statuts (nouveau, in_progress, termine), chacun avec son
// libellé et sa couleur. Stocké en SQLite via le backend Spring Boot.
//
// GET    /api/langues       → toutes les langues
// POST   /api/langues       → créer une langue (code + nom)
// PUT    /api/langues/{id}  → modifier nom + libellés/couleurs des statuts
// DELETE /api/langues/{id}  → supprimer une langue
// ═════════════════════════════════════════════════════════════════════════════

// Un statut d'une langue : libellé + couleur.
export type StatutLangue = {
  statusKey: string // 'nouveau' | 'in_progress' | 'termine'
  position: number
  label: string
  color: string
}

// Une langue complète avec ses 3 statuts.
export type Langue = {
  id: number
  code: string
  nom: string
  statuts: StatutLangue[]
}

const backendUrl = import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:8080'
const URL = `${backendUrl}/api/langues`

// Langue de repli (toujours définie) si le backend SQLite est injoignable.
export const LANGUE_DEFAUT: Langue = {
  id: 0,
  code: 'fr',
  nom: 'Français',
  statuts: [
    { statusKey: 'nouveau', position: 1, label: 'Nouveau', color: '#dbeafe' },
    { statusKey: 'in_progress', position: 2, label: 'In progress', color: '#ffedd5' },
    { statusKey: 'termine', position: 3, label: 'Terminé', color: '#dcfce7' },
  ],
}

// Liste de repli (le Kanban reste utilisable hors-ligne).
export const LANGUES_DEFAUT: Langue[] = [
  LANGUE_DEFAUT,
  {
    id: 0,
    code: 'mg',
    nom: 'Malgache',
    statuts: [
      { statusKey: 'nouveau', position: 1, label: 'Vaovao', color: '#dbeafe' },
      { statusKey: 'in_progress', position: 2, label: 'Efa manao', color: '#ffedd5' },
      { statusKey: 'termine', position: 3, label: 'Vita', color: '#dcfce7' },
    ],
  },
]

export async function getLangues(): Promise<Langue[]> {
  const res = await axios.get<Langue[]>(URL)
  return res.data
}

export async function creerLangue(code: string, nom: string): Promise<Langue> {
  const res = await axios.post<Langue>(URL, { code, nom })
  return res.data
}

export async function majLangue(
  id: number,
  nom: string,
  statuts: StatutLangue[],
): Promise<Langue> {
  const res = await axios.put<Langue>(`${URL}/${id}`, { nom, statuts })
  return res.data
}

export async function supprimerLangue(id: number): Promise<void> {
  await axios.delete(`${URL}/${id}`)
}
