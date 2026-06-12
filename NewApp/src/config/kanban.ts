// ═════════════════════════════════════════════════════════════════════════════
// CONFIGURATION CENTRALE DU KANBAN
//
// Le tableau Kanban a 3 colonnes. Chaque colonne regroupe un ou plusieurs
// statuts GLPI. Cette correspondance est définie ICI et nulle part ailleurs.
//
// ➜ Pour changer quels statuts vont dans quelle colonne : modifier `statutsGlpi`
//   ci-dessous. Le board, le comptage et le drag&drop suivent automatiquement.
//
// Rappel statuts GLPI : 1=Nouveau, 2=En cours (attribué), 3=En cours (planifié),
// 4=En attente, 5=Résolu, 6=Clos, 10=En cours.
// ═════════════════════════════════════════════════════════════════════════════

// La clé d'une colonne — identique à la statusKey du CRUD langues (SQLite).
export type CleColonne = 'nouveau' | 'in_progress' | 'termine'

export type ColonneKanban = {
  cle: CleColonne
  /** Statut GLPI envoyé quand on dépose une carte dans cette colonne. */
  statutCible: number
  /** Tous les statuts GLPI affichés dans cette colonne. */
  statutsGlpi: number[]
}

export const COLONNES_KANBAN: ColonneKanban[] = [
  { cle: 'nouveau', statutCible: 1, statutsGlpi: [1] },
  { cle: 'in_progress', statutCible: 2, statutsGlpi: [2, 3, 4, 10] },
  { cle: 'termine', statutCible: 5, statutsGlpi: [5, 6] },
]

// La 1re colonne, utilisée comme repli (toujours définie : le tableau est constant).
const COLONNE_DEFAUT: ColonneKanban = COLONNES_KANBAN[0] ?? {
  cle: 'nouveau',
  statutCible: 1,
  statutsGlpi: [1],
}

/** Trouve la colonne qui contient un statut GLPI donné (défaut : 1re colonne). */
export function colonnePourStatut(statutGlpi: number): ColonneKanban {
  for (const colonne of COLONNES_KANBAN) {
    if (colonne.statutsGlpi.includes(statutGlpi)) {
      return colonne
    }
  }
  return COLONNE_DEFAUT
}
