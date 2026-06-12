// ═════════════════════════════════════════════════════════════════════════════
// CONFIGURATION CENTRALE DES TICKETS
//
// Source UNIQUE de vérité pour :
//   - les libellés français (statut, priorité, urgence, impact, type)
//   - les options des filtres (mêmes valeurs, réutilisées par les <select>)
//
// Ajouter/renommer une valeur ici la propage partout : dashboards, page
// tickets, barres de filtres. Niveau simple : juste des tables { id: libellé }.
// ═════════════════════════════════════════════════════════════════════════════

// Une option de filtre affichée dans un <select>.
export type OptionFiltre = {
  valeur: number // la valeur GLPI (1, 2, 3…)
  label: string // le texte affiché
}

// ─── Statuts GLPI (1 à 6) ───
// Seuls New(1), In Progress assigned(2), Closed(6) viennent des imports,
// mais on garde les 6 pour rester complet.
export const STATUT_LABELS: Record<number, string> = {
  1: 'Nouveau',
  2: 'En cours (Attribué)',
  3: 'En cours (Planifié)',
  4: 'En attente',
  5: 'Résolu',
  6: 'Clos',
}

// ─── Priorités GLPI (1 à 6) ───
export const PRIORITE_LABELS: Record<number, string> = {
  1: 'Très basse',
  2: 'Basse',
  3: 'Moyenne',
  4: 'Haute',
  5: 'Très haute',
  6: 'Majeure',
}

// ─── Urgences GLPI (1 à 5) ───
export const URGENCE_LABELS: Record<number, string> = {
  1: 'Très basse',
  2: 'Basse',
  3: 'Moyenne',
  4: 'Haute',
  5: 'Très haute',
}

// ─── Impacts GLPI (1 à 5) ───
export const IMPACT_LABELS: Record<number, string> = {
  1: 'Très bas',
  2: 'Bas',
  3: 'Moyen',
  4: 'Haut',
  5: 'Très haut',
}

// ─── Types de ticket ───
export const TYPE_LABELS: Record<number, string> = {
  1: 'Incident',
  2: 'Requête',
}

// Transforme une table { id: libellé } en liste d'options pour un <select>.
export function versOptions(labels: Record<number, string>): OptionFiltre[] {
  const options: OptionFiltre[] = []
  for (const cle of Object.keys(labels)) {
    const valeur = Number(cle)
    options.push({ valeur, label: labels[valeur] ?? '' })
  }
  return options
}

// Options prêtes à l'emploi pour les barres de filtres.
export const OPTIONS_STATUT = versOptions(STATUT_LABELS)
export const OPTIONS_PRIORITE = versOptions(PRIORITE_LABELS)
export const OPTIONS_URGENCE = versOptions(URGENCE_LABELS)
export const OPTIONS_IMPACT = versOptions(IMPACT_LABELS)
export const OPTIONS_TYPE = versOptions(TYPE_LABELS)

// ─── Fonctions de libellé (un id → texte, avec valeur de repli) ───

export function libelleStatut(id?: number): string {
  if (!id) return 'Non renseigné'
  return STATUT_LABELS[id] ?? `Statut ${id}`
}

export function libellePriorite(id?: number): string {
  if (!id) return 'Non renseigné'
  return PRIORITE_LABELS[id] ?? `Priorité ${id}`
}

export function libelleUrgence(id?: number): string {
  if (!id) return 'Non renseigné'
  return URGENCE_LABELS[id] ?? `Urgence ${id}`
}

export function libelleImpact(id?: number): string {
  if (!id) return 'Non renseigné'
  return IMPACT_LABELS[id] ?? `Impact ${id}`
}

export function libelleType(id?: number): string {
  if (!id) return 'Non renseigné'
  return TYPE_LABELS[id] ?? `Type ${id}`
}
