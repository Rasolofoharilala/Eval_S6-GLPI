// ═════════════════════════════════════════════════════════════════════════════
// JOURNAL DE BORD DES PAGES (console du navigateur : F12 → onglet Console)
//
// Chaque page crée son journal avec un nom, et tous ses messages sont
// préfixés par ce nom. On repère ainsi immédiatement quelle page a parlé.
//
// Exemple :
//   const log = creerLogger('Dashboard Tickets')
//   log.info('Chargement des tickets…')   → [Dashboard Tickets] ℹ Chargement des tickets…
//   log.succes('120 tickets chargés')     → [Dashboard Tickets] ✓ 120 tickets chargés
//   log.erreur('Échec du chargement', e)  → [Dashboard Tickets] ✗ Échec du chargement …
// ═════════════════════════════════════════════════════════════════════════════

export type Logger = {
  /** Information neutre (étape en cours, valeur intermédiaire…). */
  info: (message: string, ...details: unknown[]) => void
  /** Opération réussie. */
  succes: (message: string, ...details: unknown[]) => void
  /** Avertissement : pas bloquant mais à surveiller. */
  attention: (message: string, ...details: unknown[]) => void
  /** Erreur : l'opération a échoué. */
  erreur: (message: string, ...details: unknown[]) => void
}

export function creerLogger(nomPage: string): Logger {
  const prefixe = `[${nomPage}]`

  return {
    info: (message, ...details) => console.log(`${prefixe} ℹ ${message}`, ...details),
    succes: (message, ...details) => console.log(`${prefixe} ✓ ${message}`, ...details),
    attention: (message, ...details) => console.warn(`${prefixe} ⚠ ${message}`, ...details),
    erreur: (message, ...details) => console.error(`${prefixe} ✗ ${message}`, ...details),
  }
}
