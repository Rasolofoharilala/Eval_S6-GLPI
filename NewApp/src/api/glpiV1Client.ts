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

/** Liste les éléments d'un itemtype. Utile quand l'endpoint v2 est en erreur (ex: Cartridge/Consumable → 500). */
export async function v1GetAll<T = unknown>(itemtype: string): Promise<T[]> {
  return withSession(async (token) => {
    const res = await axios.get<T[]>(`${v1Url}/${itemtype}`, {
      headers: { 'Session-Token': token },
      params: { range: '0-999' },
    })
    return Array.isArray(res.data) ? res.data : []
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
