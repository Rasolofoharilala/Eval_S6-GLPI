// ═════════════════════════════════════════════════════════════════════════════
// CONFIGURATION CENTRALE DU PARC
//
// Les 5 types d'équipements gérés par l'application sont décrits ICI et
// uniquement ici. Tout le reste du code (import, dashboard, liste, reset)
// lit cette table.
//
// ➜ Pour ajouter un 6e type (ex : NetworkEquipment), il suffit d'ajouter
//   UNE ligne dans TYPES_PARC : l'import et le dashboard le prennent en
//   compte automatiquement.
// ═════════════════════════════════════════════════════════════════════════════

export type TypeParc = {
  /** Clé interne en minuscule. Doit correspondre au champ Item_Type du CSV 1. */
  cle: string
  /** Nom de classe GLPI (sert aux liens Item_Ticket / Document via l'API v1). */
  itemtype: string
  /** Libellé affiché à l'écran. */
  label: string
  /** Endpoint API v2 de la collection (liste / création). */
  endpoint: string
  /** Endpoint API v2 des modèles (dropdown lié au type). */
  modelEndpoint: string
}

export const TYPES_PARC: TypeParc[] = [
  {
    cle: 'computer',
    itemtype: 'Computer',
    label: 'Ordinateurs',
    endpoint: '/Assets/Computer',
    modelEndpoint: '/Dropdowns/ComputerModel',
  },
  {
    cle: 'monitor',
    itemtype: 'Monitor',
    label: 'Moniteurs',
    endpoint: '/Assets/Monitor',
    modelEndpoint: '/Dropdowns/MonitorModel',
  },
  {
    cle: 'printer',
    itemtype: 'Printer',
    label: 'Imprimantes',
    endpoint: '/Assets/Printer',
    modelEndpoint: '/Dropdowns/PrinterModel',
  },
  {
    cle: 'peripheral',
    itemtype: 'Peripheral',
    label: 'Périphériques',
    endpoint: '/Assets/Peripheral',
    modelEndpoint: '/Dropdowns/PeripheralModel',
  },
  {
    cle: 'phone',
    itemtype: 'Phone',
    label: 'Téléphones',
    endpoint: '/Assets/Phone',
    modelEndpoint: '/Dropdowns/PhoneModel',
  },
  {
    cle: 'networkequipment',
    itemtype: 'NetworkEquipment',
    label: 'Matériels réseau',
    endpoint: '/Assets/NetworkEquipment',
    modelEndpoint: '/Dropdowns/NetworkEquipmentModel',
  },
]

/**
 * Retrouve un type du parc à partir du champ Item_Type du CSV
 * (insensible à la casse : "Computer", "computer", " COMPUTER " marchent).
 * Renvoie null si le type n'est pas géré (ex : NetworkEquipment).
 */
export function trouverTypeParc(itemType: string): TypeParc | null {
  const cle = itemType.trim().toLowerCase()
  return TYPES_PARC.find((t) => t.cle === cle) ?? null
}

/**
 * Convertit un Item_Type du CSV en nom de classe GLPI ("computer" → "Computer").
 * Si le type n'est pas dans le parc, on renvoie la valeur telle quelle
 * (GLPI accepte le nom exact, ex : "NetworkEquipment").
 */
export function versItemtypeGlpi(itemType: string): string {
  return trouverTypeParc(itemType)?.itemtype ?? itemType.trim()
}
