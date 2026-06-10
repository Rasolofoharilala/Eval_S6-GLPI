import { httpClient } from '@/api/httpClient'
import type { TicketCsvRow, CoutCsvRow, TicketImportResult, CoutImportResult } from './ticketImportTypes'

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

      // Lier les assets au ticket via POST /Assets/Custom/Item_Ticket (API v2)
      const itemNames = parseItems(row.items)
      for (const itemName of itemNames) {
        const asset = assetsRegistry[itemName]
        if (!asset) continue
        try {
          await httpClient.post('/Assets/Custom/Item_Ticket', {
            tickets_id: ticketId,
            items_id: asset.id,
            itemtype: asset.type,
          })
        } catch {
          // lien non-bloquant
        }
      }

      results.push({ ref, title, success: true })
    } catch (err: any) {
      results.push({
        ref,
        title,
        success: false,
        error: err.response?.data?.title ?? err.response?.data?.detail ?? err.message ?? 'Erreur inconnue',
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
    } catch (err: any) {
      results.push({
        numTicket,
        success: false,
        error: err.response?.data?.title ?? err.message ?? 'Erreur inconnue',
      })
    }
  }

  return results
}

// ─── Import images depuis ZIP ─────────────────────────────────────────────────

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
      // Upload du document via API v2
      const formData = new FormData()
      formData.append('uploadManifest', JSON.stringify({
        input: {
          name: baseName,
          _filename: [filename],
        },
      }))
      formData.append('filename[0]', blob, filename)

      const docRes = await httpClient.post<{ id: number }>('/Management/Document', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      const docId = docRes.data?.id

      if (!docId) throw new Error('Aucun id de document retourné')

      // Lier le document à l'asset via POST /Assets/Custom/Document_Item (API v2)
      await httpClient.post('/Assets/Custom/Document_Item', {
        documents_id: docId,
        items_id: asset.id,
        itemtype: asset.type,
      })

      results.push({ name: filename, success: true })
    } catch (err: any) {
      results.push({ name: filename, success: false, error: err.message ?? 'Erreur inconnue' })
    }
  }

  return results
}

// ─── Utilitaires privés ───────────────────────────────────────────────────────

function parseDate(date: string, heure: string): string {
  const parts = date.split('/')
  if (parts.length === 3) {
    const [day, month, year] = parts
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')} ${heure || '00:00'}:00`
  }
  return `${date} ${heure || '00:00'}:00`
}
