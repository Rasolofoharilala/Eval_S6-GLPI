import { httpClient } from '@/api/httpClient'
import { v1UploadDocument, v1LinkDocumentToItem, v1LinkItemToTicket } from '@/api/glpiV1Client'
import type { TicketCsvRow, CoutCsvRow, TicketImportResult, CoutImportResult } from './ticketImportTypes'

// L'API v2 ne gère ni l'upload de fichiers, ni Document_Item, ni Item_Ticket :
// ces trois opérations passent par l'API legacy v1 (voir glpiV1Client).

const GLPI_ITEMTYPES: Record<string, string> = {
  computer: 'Computer',
  monitor: 'Monitor',
  printer: 'Printer',
  networkequipment: 'NetworkEquipment',
  peripheral: 'Peripheral',
  phone: 'Phone',
  software: 'Software',
}

function toGlpiItemtype(type: string): string {
  const normalized = type.trim().toLowerCase()
  return GLPI_ITEMTYPES[normalized] ?? type.trim()
}

function getErrorMessage(error: unknown): string {
  if (typeof error !== 'object' || error === null) {
    return 'Erreur inconnue'
  }

  const err = error as {
    response?: { data?: { title?: string; detail?: string } }
    message?: string
  }

  return err.response?.data?.title ?? err.response?.data?.detail ?? err.message ?? 'Erreur inconnue'
}

// ─── Constantes de mapping ────────────────────────────────────────────────────

const PRIORITY_MAP: Record<string, number> = {
  low: 2,
  medium: 3,
  high: 4,
  'very high': 5,
  basse: 2,
  moyenne: 3,
  haute: 4,
  'très haute': 5,
}

const STATUS_MAP: Record<string, number> = {
  new: 1,
  processing: 2,
  pending: 4,
  solved: 5,
  closed: 6,
  validation: 10,
  nouveau: 1,
  'en cours': 2,
  'en attente': 4,
  résolu: 5,
  fermé: 6,
}

const TYPE_MAP: Record<string, number> = {
  incident: 1,
  request: 2,
  demande: 2,
  requête: 2,
}

// ─── Parsing du champ Items du CSV2 ──────────────────────────────────────────

function parseItems(raw: string): string[] {
  if (!raw || raw.trim() === '') return []
  try {
    const cleaned = raw.replace(/^"(.*)"$/, '$1').replace(/""/g, '"')
    const parsed = JSON.parse(cleaned)
    if (Array.isArray(parsed)) return parsed.map((s) => String(s).trim())
  } catch {
    return raw.split(/[|;]/).map((s) => s.trim()).filter(Boolean)
  }
  return []
}

// ─── Import tickets ───────────────────────────────────────────────────────────

export async function importTicketRows(
  rows: TicketCsvRow[],
  assetsRegistry: Record<string, { id: number; type: string }>,
): Promise<{ results: TicketImportResult[]; ticketRegistry: Record<string, number> }> {
  const results: TicketImportResult[] = []
  const ticketRegistry: Record<string, number> = {}

  for (const row of rows) {
    const ref = row.ref_ticket?.trim() ?? ''
    const title = row.titre?.trim() ?? ''

    try {
      const isoDate = parseDate(row.date?.trim() ?? '', row.heure?.trim() ?? '')

      const payload = {
        name: title,
        content: row.description?.trim() ?? '',
        date: isoDate,
        external_id: ref,
        status: STATUS_MAP[row.status?.trim().toLowerCase()] ?? 1,
        priority: PRIORITY_MAP[row.priority?.trim().toLowerCase()] ?? 3,
        type: TYPE_MAP[row.type?.trim().toLowerCase()] ?? 1,
      }

      const res = await httpClient.post<{ id: number }>('/Assistance/Ticket', payload)
      const ticketId = res.data?.id

      if (!ticketId) throw new Error('Aucun id retourné')

      ticketRegistry[ref] = ticketId

      // Associer les assets au ticket (onglet « Éléments ») via l'API v1
      const itemNames = parseItems(row.items)
      for (const itemName of itemNames) {
        const asset = assetsRegistry[itemName]
        if (!asset) continue
        try {
          await v1LinkItemToTicket(ticketId, asset.id, toGlpiItemtype(asset.type))
        } catch {
          // lien non-bloquant
        }
      }

      results.push({ ref, title, success: true })
    } catch (err) {
      results.push({
        ref,
        title,
        success: false,
        error: getErrorMessage(err),
      })
    }
  }

  return { results, ticketRegistry }
}

// ─── Import coûts ─────────────────────────────────────────────────────────────

export async function importCoutRows(
  rows: CoutCsvRow[],
  ticketRegistry: Record<string, number>,
): Promise<CoutImportResult[]> {
  const results: CoutImportResult[] = []

  for (const row of rows) {
    const numTicket = row.num_ticket?.trim() ?? ''
    const ticketId = ticketRegistry[numTicket]

    if (!ticketId) {
      results.push({ numTicket, success: false, error: `Ticket ref "${numTicket}" introuvable` })
      continue
    }

    try {
      const payload = {
        name: 'Coût importé',
        duration: Number(row.duration_second) || 0,
        cost_time: parseFloat(row.time_cost?.replace(',', '.')) || 0,
        cost_fixed: parseFloat(row.fixed_cost?.replace(',', '.')) || 0,
      }

      await httpClient.post(`/Assistance/Ticket/${ticketId}/Cost`, payload)
      results.push({ numTicket, success: true })
    } catch (err) {
      results.push({
        numTicket,
        success: false,
        error: getErrorMessage(err),
      })
    }
  }

  return results
}

// ─── Import images depuis ZIP ─────────────────────────────────────────────────

// GLPI vérifie le contenu réel du fichier : les images du ZIP sont des JPEG
// parfois renommés en .png, il faut donc détecter le vrai format (magic bytes)
// et corriger l'extension avant l'upload.
async function detectImageExtension(blob: Blob): Promise<'png' | 'jpg' | 'gif' | null> {
  const bytes = new Uint8Array(await blob.slice(0, 4).arrayBuffer())

  if (bytes[0] === 0x89 && bytes[1] === 0x50) return 'png'
  if (bytes[0] === 0xff && bytes[1] === 0xd8) return 'jpg'
  if (bytes[0] === 0x47 && bytes[1] === 0x49) return 'gif'
  return null
}

export async function importImageFiles(
  images: Record<string, Blob>,
  assetsRegistry: Record<string, { id: number; type: string }>,
): Promise<{ name: string; success: boolean; error?: string }[]> {
  const results: { name: string; success: boolean; error?: string }[] = []

  for (const [filename, blob] of Object.entries(images)) {
    const baseName = filename.substring(0, filename.lastIndexOf('.'))
    const asset = assetsRegistry[baseName]

    if (!asset) {
      results.push({ name: filename, success: false, error: 'Asset non trouvé dans le registre' })
      continue
    }

    try {
      const realExt = await detectImageExtension(blob)

      if (!realExt) {
        throw new Error('Format d’image non reconnu (ni PNG, ni JPEG, ni GIF)')
      }

      const uploadName = `${baseName}.${realExt}`

      // Upload du fichier via l'API v1 (la v2 ne gère pas les fichiers)
      const doc = await v1UploadDocument(baseName, uploadName, blob)

      if (!doc.id) throw new Error('Aucun id de document retourné')

      // Lien document ↔ asset (onglet « Documents » de l'asset dans GLPI)
      await v1LinkDocumentToItem(doc.id, asset.id, toGlpiItemtype(asset.type))

      results.push({ name: filename, success: true })
    } catch (err) {
      results.push({ name: filename, success: false, error: getErrorMessage(err) })
    }
  }

  return results
}

// ─── Utilitaires privés ───────────────────────────────────────────────────────

function parseDate(date: string, heure: string): string {
  const [day, month, year] = date.split('/')
  if (day && month && year) {
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')} ${heure || '00:00'}:00`
  }
  return `${date} ${heure || '00:00'}:00`
}
