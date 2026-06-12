// ═════════════════════════════════════════════════════════════════════════════
// EXÉCUTER DES TÂCHES EN PARALLÈLE, PAR LOTS
//
// Lance les tâches `taille` par `taille` au lieu de toutes d'un coup (pour ne
// pas saturer le serveur) ni une par une (trop lent).
//
// Exemple :
//   await executerParLots(endpoints, 5, async (ep) => { await vider(ep) })
//   -> traite 5 endpoints en parallèle, puis les 5 suivants, etc.
// ═════════════════════════════════════════════════════════════════════════════

export async function executerParLots<T>(
  elements: T[],
  taille: number,
  tache: (element: T) => Promise<void>,
): Promise<void> {
  for (let debut = 0; debut < elements.length; debut += taille) {
    const lot = elements.slice(debut, debut + taille)
    // Promise.all attend que tout le lot soit fini avant de passer au suivant.
    await Promise.all(lot.map((element) => tache(element)))
  }
}
