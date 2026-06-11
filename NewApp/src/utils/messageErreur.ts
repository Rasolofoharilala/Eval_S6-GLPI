// ═════════════════════════════════════════════════════════════════════════════
// MESSAGE D'ERREUR LISIBLE
//
// Transforme n'importe quelle erreur (axios, Error, texte…) en une phrase
// affichable à l'écran. Une seule fonction pour toute l'application :
// plus besoin de réécrire un try/catch compliqué dans chaque page.
//
// Exemple :
//   try { … } catch (err) { erreur.value = messageErreur(err) }
// ═════════════════════════════════════════════════════════════════════════════

import axios from 'axios'

export function messageErreur(err: unknown): string {
  // Erreur HTTP (axios) : on cherche le message renvoyé par le serveur.
  if (axios.isAxiosError(err)) {
    const statut = err.response?.status
    const data = err.response?.data as
      | { title?: string; detail?: string; message?: string; error?: string }
      | string[]
      | undefined

    // L'API v1 de GLPI renvoie parfois un tableau : ["ERROR_GLPI_ADD", "…"]
    if (Array.isArray(data)) {
      return `HTTP ${statut} — ${data.filter(Boolean).join(' ')}`
    }

    const texte = data?.title ?? data?.detail ?? data?.message ?? data?.error ?? err.message
    return statut ? `HTTP ${statut} — ${texte}` : texte
  }

  // Erreur JavaScript classique.
  if (err instanceof Error) {
    return err.message
  }

  // Tout le reste (texte brut, objet inconnu…).
  return typeof err === 'string' ? err : 'Erreur inconnue'
}
