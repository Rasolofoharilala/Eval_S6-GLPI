// ═════════════════════════════════════════════════════════════════════════════
// SERVICE : CRUD DES LANGUES DU KANBAN
//
// Chaque langue a 3 statuts (nouveau, in_progress, termine), chacun avec son
// libellé et sa couleur. Stocké en SQLite local (sql.js + IndexedDB) via le
// module @/sqlite/localDb — il n'y a plus de backend Spring Boot.
//
//   getLangues()                  → toutes les langues
//   creerLangue(code, nom)        → créer une langue (+ 3 statuts par défaut)
//   majLangue(id, nom, statuts)   → modifier nom + libellés/couleurs des statuts
//   supprimerLangue(id)           → supprimer une langue
// ═════════════════════════════════════════════════════════════════════════════

import * as localDb from '@/sqlite/localDb'
import type { Langue, StatutLangue } from '@/sqlite/localDb'

export type { Langue, StatutLangue }

// Langue de repli (toujours définie) si la base locale est indisponible.
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

export function getLangues(): Promise<Langue[]> {
  return localDb.getLangues()
}

export function creerLangue(code: string, nom: string): Promise<Langue> {
  return localDb.creerLangue(code, nom)
}

export function majLangue(id: number, nom: string, statuts: StatutLangue[]): Promise<Langue> {
  return localDb.majLangue(id, nom, statuts)
}

export function supprimerLangue(id: number): Promise<void> {
  return localDb.supprimerLangue(id)
}
