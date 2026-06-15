import axios from 'axios'
import { glpiConfig } from './glpiConfig'

// Client pour l'API legacy GLPI (apirest.php).
// L'API v2 (api.php) ne gère ni l'upload de fichiers ni les liens
// Document_Item / Item_Ticket : ces opérations passent par l'API v1.

const v1Url: string = import.meta.env.VITE_GLPI_API_V1_URL ?? 'http://localhost/apirest.php'

let sessionToken: string | null = null

async function initSession(): Promise<string> {
  if (sessionToken) {
    return sessionToken
  }

  const credentials = btoa(`${glpiConfig.username}:${glpiConfig.password}`)

  const res = await axios.get<{ session_token: string }>(`${v1Url}/initSession`, {
    headers: { Authorization: `Basic ${credentials}` },
  })

  sessionToken = res.data.session_token

  return sessionToken
}

function clearSession() {
  sessionToken = null
}

async function withSession<T>(call: (token: string) => Promise<T>): Promise<T> {
  const token = await initSession()

  try {
    return await call(token)
  } catch (err) {
    // session expirée : on retente une fois avec une session neuve
    if (axios.isAxiosError(err) && err.response?.status === 401) {
      clearSession()
      return await call(await initSession())
    }
    throw err
  }
}

/**
 * Liste TOUS les éléments actifs d'un itemtype via l'API v1 (corbeille exclue).
 *
 * POURQUOI v1 ET PAS v2 : l'API v2.3 plafonne à 100 éléments ET ignore l'offset
 * du `range` (range=100-199 renvoie les mêmes 100 premiers) — impossible donc
 * de récupérer plus de 100 éléments. L'API v1 pagine correctement.
 * `is_deleted=0` exclut la corbeille (l'API v1 la respecte, contrairement à v2).
 */
export async function v1GetAll<T = unknown>(itemtype: string): Promise<T[]> {
  return withSession(async (token) => {
    const PAGE = 100
    const items: T[] = []
    let start = 0
    for (let page = 0; page < 100; page++) {
      const res = await axios.get<T[]>(`${v1Url}/${itemtype}`, {
        headers: { 'Session-Token': token },
        params: { is_deleted: 0, range: `${start}-${start + PAGE - 1}` },
      })
      const chunk = Array.isArray(res.data) ? res.data : []
      items.push(...chunk)
      if (chunk.length < PAGE) break
      start += PAGE
    }
    return items
  })
}

/**
 * Liste TOUS les éléments d'un itemtype, ACTIFS ET EN CORBEILLE (is_deleted 0 et 1).
 * Indispensable pour la réinitialisation : un ticket peut être en corbeille
 * (is_deleted=1) sans être purgé, et le reset doit aussi le supprimer
 * définitivement, sinon il s'accumule à chaque import.
 */
export async function v1GetAllIncludingDeleted<T = unknown>(itemtype: string): Promise<T[]> {
  return withSession(async (token) => {
    const PAGE = 100
    const parId = new Map<number, T>()
    for (const deleted of [0, 1]) {
      let start = 0
      for (let page = 0; page < 100; page++) {
        const res = await axios.get<T[]>(`${v1Url}/${itemtype}`, {
          headers: { 'Session-Token': token },
          params: { is_deleted: deleted, range: `${start}-${start + PAGE - 1}` },
        })
        const chunk = Array.isArray(res.data) ? res.data : []
        for (const item of chunk) {
          const id = (item as { id?: number }).id
          if (typeof id === 'number') parId.set(id, item)
        }
        if (chunk.length < PAGE) break
        start += PAGE
      }
    }
    return Array.from(parId.values())
  })
}

export async function v1Post<T = { id: number }>(path: string, input: unknown): Promise<T> {
  return withSession(async (token) => {
    const res = await axios.post<T>(
      `${v1Url}${path}`,
      { input },
      {
        headers: { 'Session-Token': token, 'Content-Type': 'application/json' },
      },
    )
    return res.data
  })
}

/** Résultat d'une purge en masse. */
export type BulkPurgeResult = {
  deleted: number
  failed: number
}

/**
 * Supprime DÉFINITIVEMENT plusieurs éléments en UNE seule requête (bulk).
 *
 * L'API v2 (DELETE) ne fait que mettre en corbeille (is_deleted=true) sans
 * jamais purger ; seule l'API v1 avec force_purge=1 supprime réellement.
 * Le bulk évite N requêtes (1 seule pour tous les ids d'un type).
 *
 * Réponse GLPI :
 *  - succès total : HTTP 200, body [{ "12": true }, ...]
 *  - succès partiel : HTTP 207, body ["ERROR_GLPI_PARTIAL_DELETE", [{ "12": true }, { "99": false }]]
 * On compte donc les true / false pour renvoyer { deleted, failed }.
 *
 * @param itemtype classe GLPI v1 (ex: "Computer", "Ticket", "Document", "User")
 * @param ids identifiants à purger (si vide : ne fait rien, GLPI renverrait 400)
 */
export async function v1BulkPurge(itemtype: string, ids: number[]): Promise<BulkPurgeResult> {
  if (ids.length === 0) {
    return { deleted: 0, failed: 0 }
  }

  return withSession(async (token) => {
    const res = await axios.delete(`${v1Url}/${itemtype}`, {
      headers: { 'Session-Token': token, 'Content-Type': 'application/json' },
      params: { force_purge: true },
      data: { input: ids.map((id) => ({ id })) },
    })

    // GLPI renvoie soit [{id:true}, …], soit ["ERROR_GLPI_PARTIAL_DELETE", [{id:true}, …]].
    // On récupère le tableau des résultats individuels dans les deux cas.
    let resultats: Record<string, unknown>[] = []
    if (Array.isArray(res.data)) {
      if (Array.isArray(res.data[1])) {
        resultats = res.data[1]
      } else {
        resultats = res.data
      }
    }

    let deleted = 0
    let failed = 0
    for (const ligne of resultats) {
      // chaque ligne ressemble à { "12": true, "message": "" } : on lit le booléen
      const valeurs = Object.values(ligne)
      const ok = valeurs.some((v) => v === true)
      if (ok) {
        deleted++
      } else {
        failed++
      }
    }

    return { deleted, failed }
  })
}

/**
 * Upload d'un document avec son fichier (multipart "uploadManifest" de l'API v1).
 * GLPI vérifie le contenu réel du fichier : l'extension de `filename`
 * doit correspondre au vrai format.
 */
export async function v1UploadDocument(
  name: string,
  filename: string,
  blob: Blob,
): Promise<{ id: number }> {
  return withSession(async (token) => {
    const manifest = JSON.stringify({ input: { name, _filename: [filename] } })

    const formData = new FormData()
    // uploadManifest doit être un champ texte ($_POST) : un Blob deviendrait
    // une partie "fichier" ($_FILES) et GLPI répondrait 500.
    formData.append('uploadManifest', manifest)
    formData.append('filename[0]', blob, filename)

    const res = await axios.post<{ id: number }>(`${v1Url}/Document/`, formData, {
      headers: { 'Session-Token': token },
    })

    return res.data
  })
}

/** Associe un document à un élément (table glpi_documents_items). */
export async function v1LinkDocumentToItem(
  documentId: number,
  itemId: number,
  itemtype: string,
): Promise<{ id: number }> {
  return v1Post('/Document_Item/', {
    documents_id: documentId,
    items_id: itemId,
    itemtype,
  })
}

/** Un lien Item_Ticket existant tel que renvoyé par GLPI. */
export type ItemTicketLink = {
  id: number
  itemtype: string
  items_id: number
  tickets_id: number
}

/**
 * Liste les éléments déjà associés à un ticket (GET /Ticket/{id}/Item_Ticket).
 * Permet de rendre l'association idempotente : on évite un POST voué au
 * 400 ["ERROR_GLPI_ADD",""] quand le couple (tickets_id, items_id, itemtype)
 * existe déjà en base (cas d'un import relancé plusieurs fois).
 */
export async function v1GetTicketItems(ticketId: number): Promise<ItemTicketLink[]> {
  return withSession(async (token) => {
    const res = await axios.get<ItemTicketLink[]>(`${v1Url}/Ticket/${ticketId}/Item_Ticket`, {
      headers: { 'Session-Token': token },
      params: { range: '0-999' },
    })
    return Array.isArray(res.data) ? res.data : []
  })
}

/** Associe un élément à un ticket (onglet « Éléments » du ticket). */
export async function v1LinkItemToTicket(
  ticketId: number,
  itemId: number,
  itemtype: string,
): Promise<{ id: number }> {
  return v1Post('/Item_Ticket/', {
    tickets_id: ticketId,
    items_id: itemId,
    itemtype,
  })
}
