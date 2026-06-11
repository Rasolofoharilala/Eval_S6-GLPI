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

export async function v1Post<T = { id: number }>(path: string, input: unknown): Promise<T> {
  return withSession(async (token) => {
    const res = await axios.post<T>(`${v1Url}${path}`, { input }, {
      headers: { 'Session-Token': token, 'Content-Type': 'application/json' },
    })
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
    formData.append('uploadManifest', new Blob([manifest], { type: 'application/json' }))
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
