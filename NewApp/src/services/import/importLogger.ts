// Suivi de l'importation dans la console du navigateur.
// Chaque étape est tracée (début, succès, échec, ignoré) pour faciliter
// le diagnostic quand un import partiel se produit.

const PREFIX = '[IMPORT]'

export const importLogger = {
  /** Démarre un groupe d'étape (replié) dans la console. */
  step(title: string): void {
    console.groupCollapsed(`${PREFIX} ▶ ${title}`)
  },

  endStep(): void {
    console.groupEnd()
  },

  info(message: string, ...details: unknown[]): void {
    console.log(`${PREFIX} ${message}`, ...details)
  },

  success(message: string, ...details: unknown[]): void {
    console.log(`${PREFIX} ✓ ${message}`, ...details)
  },

  skip(message: string, ...details: unknown[]): void {
    console.warn(`${PREFIX} ⊘ ${message}`, ...details)
  },

  error(message: string, ...details: unknown[]): void {
    console.error(`${PREFIX} ✗ ${message}`, ...details)
  },

  /** Résumé d'une étape : { ok, ignorés, erreurs }. */
  summary(step: string, counts: Record<string, number>): void {
    const parts = Object.entries(counts)
      .map(([k, v]) => `${k}=${v}`)
      .join(', ')
    console.log(`${PREFIX} ═ ${step} terminé — ${parts}`)
  },
}
