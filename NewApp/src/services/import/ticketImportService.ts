import axios from 'axios'
import { httpClient } from '@/api/httpClient'
import {
  v1UploadDocument,
  v1LinkDocumentToItem,
  v1LinkItemToTicket,
  v1GetTicketItems,
} from '@/api/glpiV1Client'
import { versItemtypeGlpi } from '@/config/parc'
import { messageErreur } from '@/utils/messageErreur'
import { importLogger } from './importLogger'
import type {
  TicketCsvRow,
  CoutCsvRow,
  TicketImportResult,
  CoutImportResult,
  ImageImportResult,
} from './ticketImportTypes'

// L'API v2 ne gère ni l'upload de fichiers, ni Document_Item, ni Item_Ticket :
// ces trois opérations passent par l'API legacy v1 (voir glpiV1Client).
// La conversion Item_Type CSV → classe GLPI vient de src/config/parc.ts.

// ─── Constantes de mapping ────────────────────────────────────────────────────

// Priorités GLPI : 1=Très basse, 2=Basse, 3=Moyenne, 4=Haute, 5=Très haute, 6=Majeure
const PRIORITY_MAP: Record<string, number> = {
  'very low': 1,
  low: 2,
  medium: 3,
  high: 4,
  'very high': 5,
  major: 6,
  'très basse': 1,
  basse: 2,
  moyenne: 3,
  haute: 4,
  'très haute': 5,
  majeure: 6,
}

// Statuts GLPI : 1=Nouveau, 2=En cours (Attribué), 4=En attente, 5=Résolu, 6=Clos
// Un POST direct avec status={id:6} crée bien un ticket Clos visible (is_deleted=0).
// Seuls 3 statuts apparaissent dans les imports : New, In Progress (assigned), Closed.
const STATUS_MAP: Record<string, number> = {
  new: 1,
  processing: 2,
  'processing (assigned)': 2,
  'in progress': 2,
  'in progress (assigned)': 2,
  pending: 4,
  solved: 5,
  closed: 6,
  validation: 10,
  nouveau: 1,
  'en cours': 2,
  'en cours (attribué)': 2,
  'en attente': 4,
  résolu: 5,
  fermé: 6,
  clos: 6,
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
    return raw
      .split(/[|;]/)
      .map((s) => s.trim())
      .filter(Boolean)
  }
  return []
}

// ─── Détection d'un doublon GLPI ─────────────────────────────────────────────

function isAlreadyLinkedError(err: unknown): boolean {
  if (!axios.isAxiosError(err)) return false
  if (err.response?.status !== 400) return false
  const data = err.response.data
  // GLPI retourne ["ERROR_GLPI_ADD",""] ou {"message":"ERROR_GLPI_ADD"}
  if (Array.isArray(data)) return String(data[0]).includes('ERROR_GLPI_ADD')
  if (typeof data === 'object' && data !== null) {
    const msg = (data as Record<string, unknown>).message
    return typeof msg === 'string' && msg.includes('ERROR_GLPI_ADD')
  }
  return false
}

// ─── Import tickets ───────────────────────────────────────────────────────────

export async function importTicketRows(
  rows: TicketCsvRow[],
  assetsRegistry: Record<string, { id: number; type: string }>,
): Promise<{ results: TicketImportResult[]; ticketRegistry: Record<string, number> }> {
  const results: TicketImportResult[] = []
  const ticketRegistry: Record<string, number> = {}

  importLogger.step(`Tickets — ${rows.length} ligne(s)`)

  for (const row of rows) {
    const ref = row.ref_ticket?.trim() ?? ''
    const title = row.titre?.trim() ?? ''

    try {
      const isoDate = parseDate(row.date?.trim() ?? '', row.heure?.trim() ?? '')

      // L'API v2 attend status comme objet {id:N}. Un POST direct avec status={id:6}
      // crée bien un ticket Clos visible — pas besoin de PATCH en deux étapes.
      const payload = {
        name: title,
        content: row.description?.trim() ?? '',
        date: isoDate,
        status: { id: STATUS_MAP[row.status?.trim().toLowerCase()] ?? 1 },
        priority: PRIORITY_MAP[row.priority?.trim().toLowerCase()] ?? 3,
        type: TYPE_MAP[row.type?.trim().toLowerCase()] ?? 1,
      }

      const res = await httpClient.post<{ id: number }>('/Assistance/Ticket', payload)
      const ticketId = res.data?.id

      if (!ticketId) throw new Error('Aucun id retourné')

      ticketRegistry[ref] = ticketId

      // Associer les assets au ticket (onglet « Éléments ») via l'API v1.
      // On déduplique : un même élément listé deux fois dans le CSV ferait
      // échouer le 2e lien (400 « déjà associé »).
      const itemNames = [...new Set(parseItems(row.items))]
      const links = { linked: 0, already: 0, skipped: 0, failed: 0 }

      // Liens déjà présents sur ce ticket : chargés une seule fois pour rendre
      // l'association idempotente (import relancé → couple dupliqué = 400
      // ["ERROR_GLPI_ADD",""]). Clés `itemtype#items_id`.
      let existingLinks: Set<string> | null = null
      const linkKey = (itemtype: string, id: number) => `${itemtype}#${id}`

      for (const itemName of itemNames) {
        const asset = assetsRegistry[itemName]
        // Élément absent de l'inventaire, ou présent mais sans id valide
        // (création d'asset échouée) : on n'envoie pas de lien voué au 400.
        if (!asset || !asset.id) {
          links.skipped++
          importLogger.skip(`Ticket ${ref} : élément « ${itemName} » introuvable ou non importé`)
          continue
        }

        const itemtype = versItemtypeGlpi(asset.type)

        // Un seul GET /Ticket/{id}/Item_Ticket par ticket.
        if (existingLinks === null) {
          try {
            const items = await v1GetTicketItems(ticketId)
            existingLinks = new Set(items.map((l) => linkKey(l.itemtype, l.items_id)))
          } catch {
            // GET indisponible : on retombe sur le POST (un éventuel doublon
            // redonnera 400, capté par le catch ci-dessous).
            existingLinks = new Set()
          }
        }

        if (existingLinks.has(linkKey(itemtype, asset.id))) {
          links.already++
          importLogger.skip(`Ticket ${ref} : élément « ${itemName} » déjà associé`)
          continue
        }

        try {
          await v1LinkItemToTicket(ticketId, asset.id, itemtype)
          existingLinks.add(linkKey(itemtype, asset.id))
          links.linked++
        } catch (linkErr) {
          // GLPI refuse si l'asset est déjà lié à un autre ticket :
          // contrainte unique (itemtype, items_id) dans glpi_items_tickets.
          // On traite ce cas comme un skip (pas une erreur bloquante).
          if (isAlreadyLinkedError(linkErr)) {
            links.already++
            importLogger.skip(
              `Ticket ${ref} : « ${itemName} » déjà associé à un autre ticket (ignoré)`,
            )
          } else {
            links.failed++
            importLogger.error(
              `Ticket ${ref} : échec association « ${itemName} » → ${messageErreur(linkErr)}`,
            )
          }
        }
      }

      importLogger.success(
        `Ticket ${ref} (id ${ticketId}) — ${links.linked} lié(s), ${links.already} déjà lié(s), ${links.skipped} ignoré(s), ${links.failed} échec(s)`,
      )
      results.push({ ref, title, success: true, links })
    } catch (err) {
      const message = messageErreur(err)
      importLogger.error(`Ticket ${ref} : ${message}`)
      results.push({ ref, title, success: false, error: message })
    }
  }

  importLogger.summary('Tickets', {
    ok: results.filter((r) => r.success).length,
    erreurs: results.filter((r) => !r.success).length,
  })
  importLogger.endStep()

  return { results, ticketRegistry }
}

// ─── Import coûts ─────────────────────────────────────────────────────────────

export async function importCoutRows(
  rows: CoutCsvRow[],
  ticketRegistry: Record<string, number>,
): Promise<CoutImportResult[]> {
  const results: CoutImportResult[] = []

  importLogger.step(`Coûts — ${rows.length} ligne(s)`)

  for (const row of rows) {
    const numTicket = row.num_ticket?.trim() ?? ''
    const ticketId = ticketRegistry[numTicket]

    if (!ticketId) {
      const error = `Ticket ref "${numTicket}" introuvable`
      importLogger.skip(`Coût : ${error}`)
      results.push({ numTicket, success: false, error })
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
      const message = messageErreur(err)
      importLogger.error(`Coût ticket ${numTicket} : ${message}`)
      results.push({ numTicket, success: false, error: message })
    }
  }

  importLogger.summary('Coûts', {
    ok: results.filter((r) => r.success).length,
    erreurs: results.filter((r) => !r.success).length,
  })
  importLogger.endStep()

  return results
}

// ─── Import images depuis ZIP ─────────────────────────────────────────────────

// GLPI vérifie le contenu réel du fichier : les images du ZIP sont des JPEG
// parfois renommés en .png. Toutes les images sont converties en JPEG
// (canvas) avant insertion, quel que soit leur format d'origine.
async function detectImageExtension(blob: Blob): Promise<'png' | 'jpg' | 'gif' | null> {
  const bytes = new Uint8Array(await blob.slice(0, 4).arrayBuffer())

  if (bytes[0] === 0x89 && bytes[1] === 0x50) return 'png'
  if (bytes[0] === 0xff && bytes[1] === 0xd8) return 'jpg'
  if (bytes[0] === 0x47 && bytes[1] === 0x49) return 'gif'
  return null
}

async function toJpegBlob(blob: Blob): Promise<Blob> {
  const bitmap = await createImageBitmap(blob)

  const canvas = document.createElement('canvas')
  canvas.width = bitmap.width
  canvas.height = bitmap.height

  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas 2D indisponible')

  // fond blanc : le JPEG ne gère pas la transparence des PNG
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(bitmap, 0, 0)

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (result) => (result ? resolve(result) : reject(new Error('Conversion JPEG impossible'))),
      'image/jpeg',
      0.9,
    )
  })
}

export async function importImageFiles(
  images: Record<string, Blob>,
  assetsRegistry: Record<string, { id: number; type: string }>,
): Promise<ImageImportResult[]> {
  const results: ImageImportResult[] = []

  importLogger.step(`Images — ${Object.keys(images).length} fichier(s)`)

  for (const [filename, blob] of Object.entries(images)) {
    const baseName = filename.substring(0, filename.lastIndexOf('.'))
    const asset = assetsRegistry[baseName]

    if (!asset || !asset.id) {
      // Image sans asset correspondant dans l'inventaire : ignoré légitime
      // (le ZIP peut contenir plus d'images que d'équipements).
      const error = 'Aucun élément correspondant dans l’inventaire'
      importLogger.skip(`Image « ${filename} » : ${error}`)
      results.push({ name: filename, success: false, skipped: true, error })
      continue
    }

    try {
      const realExt = await detectImageExtension(blob)

      if (!realExt) {
        throw new Error('Format d’image non reconnu (ni PNG, ni JPEG, ni GIF)')
      }

      // Conversion systématique en JPEG avant insertion
      const jpegBlob = realExt === 'jpg' ? blob : await toJpegBlob(blob)
      const uploadName = `${baseName}.jpg`

      // Upload du fichier via l'API v1 (la v2 ne gère pas les fichiers)
      const doc = await v1UploadDocument(baseName, uploadName, jpegBlob)

      if (!doc.id) throw new Error('Aucun id de document retourné')

      // Lien document ↔ asset (onglet « Documents » de l'asset dans GLPI)
      await v1LinkDocumentToItem(doc.id, asset.id, versItemtypeGlpi(asset.type))

      importLogger.success(`Image « ${filename} » → document ${doc.id} lié à ${baseName}`)
      results.push({ name: filename, success: true })
    } catch (err) {
      const message = messageErreur(err)
      importLogger.error(`Image « ${filename} » : ${message}`)
      results.push({ name: filename, success: false, error: message })
    }
  }

  importLogger.summary('Images', {
    ok: results.filter((r) => r.success).length,
    ignorés: results.filter((r) => r.skipped).length,
    erreurs: results.filter((r) => !r.success && !r.skipped).length,
  })
  importLogger.endStep()

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
