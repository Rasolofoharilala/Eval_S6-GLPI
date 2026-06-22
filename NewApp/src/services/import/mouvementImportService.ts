// ═════════════════════════════════════════════════════════════════════════════
// IMPORT DE MOUVEMENTS À LA MAIN (CSV 3 colonnes : ticket, mvt, valeur)
//
// Applique des mouvements sur des tickets GLPI DÉJÀ EXISTANTS (aucune création).
// Chaque ligne enregistre un coût dans la base SQLite locale (+ statut GLPI) :
//
//   ticket | mvt    | valeur
//   2        open     5        → réouverture +5 %  (reouvrirTicket)
//   2        cancel            → annulation des coûts actifs (annulerCoutsDuTicket)
//   2        close    100      → terminer à 100    (enregistrerNouveauCout)
//
// Format accepté : séparateur virgule OU point-virgule, en-tête facultatif,
// décimale française (16,5) ou anglaise (16.5). Une ligne par mouvement.
// ═════════════════════════════════════════════════════════════════════════════

import { v1GetTicketItems } from '@/services/api/glpiV1Client'
import { changerStatutTicket } from '@/services/ticketActions'
import {
  enregistrerNouveauCout,
  reouvrirTicket,
  annulerCoutsDuTicket,
} from '@/services/nouveauCoutService'
import { getTickets } from '@/services/generated/ticketService'
import { getRefsTickets } from '@/services/sqlite/localDb'
import { messageErreur } from '@/utils/messageErreur'

// Statuts GLPI cibles (cf. src/config/kanban.ts).
const STATUT_IN_PROGRESS = 2
const STATUT_TERMINE = 5

export type TypeMouvement = 'open' | 'cancel' | 'close'

export type MouvementParse = {
  ligne: number // numéro de ligne (1-based, dans la saisie)
  ref: string // valeur de la 1re colonne du fichier (Ref_Ticket logique : 1, 2…)
  ticketId: number // id GLPI réel (résolu via le mapping ; = ref si pas de mapping)
  mvt: TypeMouvement
  valeur: number // 0 pour cancel
  mode: number // 4e colonne : mode de calcul (1=dernier 2=pr.emier 3=moyenne 4=total) — sert seulement à open
  brut: string // texte d'origine (pour l'affichage)
}

export type MouvementResultat = MouvementParse & {
  success: boolean
  message: string
}

const MVT_VALIDES: TypeMouvement[] = ['open', 'cancel', 'close']

// Transforme "16,5" / "16.5" / " 5 " en nombre (virgule décimale FR gérée).
function versNombre(valeur: string | undefined): number {
  if (!valeur) return 0
  return Number(valeur.replace(',', '.').trim()) || 0
}

/**
 * Analyse le texte CSV brut en mouvements.
 * `erreurs` liste les lignes mal formées (sans bloquer les lignes valides).
 */
export function parserMouvements(texte: string): {
  mouvements: MouvementParse[]
  erreurs: string[]
} {
  const mouvements: MouvementParse[] = []
  const erreurs: string[] = []

  const lignes = texte
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l !== '')

  lignes.forEach((ligne, i) => {
    const numLigne = i + 1
    // Séparateur virgule ou point-virgule.
    const champs = ligne.split(/[,;]/).map((c) => c.trim())

    // En-tête éventuel (1re ligne contenant "ticket"/"mvt") : on l'ignore.
    if (i === 0 && /ticket|mvt|mouvement/i.test(ligne) && !/^\d/.test(ligne)) {
      return
    }

    const [colTicket, colMvt, colValeur, colMode] = champs
    const ref = (colTicket ?? '').trim()
    const ticketId = Number(ref)
    const mvt = (colMvt ?? '').toLowerCase() as TypeMouvement
    // 4e colonne : mode de calcul (1 à 4). Vide ou invalide → 1 (dernier coût).
    let mode = Number((colMode ?? '').trim())
    if (!Number.isInteger(mode) || mode < 1 || mode > 4) {
      mode = 1
    }

    if (!Number.isInteger(ticketId) || ticketId <= 0) {
      erreurs.push(`Ligne ${numLigne} : identifiant de ticket invalide (« ${colTicket} »)`)
      return
    }
    if (!MVT_VALIDES.includes(mvt)) {
      erreurs.push(`Ligne ${numLigne} : mouvement inconnu « ${colMvt} » (open / cancel / close)`)
      return
    }

    mouvements.push({
      ligne: numLigne,
      ref,
      ticketId, // résolu plus tard via le mapping ref → id GLPI
      mvt,
      valeur: mvt === 'cancel' ? 0 : versNombre(colValeur),
      mode,
      brut: ligne,
    })
  })

  return { mouvements, erreurs }
}

/** Applique UN mouvement (statut GLPI + coût SQLite). */
async function appliquerUn(m: MouvementParse): Promise<MouvementResultat> {
  try {
    if (m.mvt === 'cancel') {
      await annulerCoutsDuTicket(m.ticketId)
      await changerStatutTicket(m.ticketId, STATUT_IN_PROGRESS)
      return { ...m, success: true, message: 'Coûts annulés, ticket repassé en cours' }
    }

    const items = await v1GetTicketItems(m.ticketId)
    if (items.length === 0) {
      return {
        ...m,
        success: false,
        message: 'Aucun item lié à ce ticket : le coût ne peut pas être réparti',
      }
    }

    if (m.mvt === 'open') {
      await reouvrirTicket(m.ticketId, m.valeur, items, m.mode)
      await changerStatutTicket(m.ticketId, STATUT_IN_PROGRESS)
      return {
        ...m,
        success: true,
        message: `Réouverture +${m.valeur} % (mode ${m.mode}) appliquée`,
      }
    }

    // close
    await changerStatutTicket(m.ticketId, STATUT_TERMINE)
    await enregistrerNouveauCout(m.ticketId, m.valeur, items)
    return { ...m, success: true, message: `Ticket terminé, coût ${m.valeur} enregistré` }
  } catch (err) {
    return { ...m, success: false, message: messageErreur(err) }
  }
}

/**
 * Applique tous les mouvements DANS L'ORDRE (séquentiel : open puis close du
 * même ticket doivent s'enchaîner). Les tickets inexistants dans GLPI sont
 * rejetés (pas de création).
 */
export async function importerMouvements(
  mouvements: MouvementParse[],
): Promise<MouvementResultat[]> {
  // On ne traite que les tickets réellement présents dans GLPI.
  const tickets = await getTickets()
  const idsExistants = new Set(tickets.map((t) => t.id).filter((id): id is number => id != null))

  // Correspondance Ref_Ticket (1, 2, 3…) → id GLPI réel, mémorisée à l'import
  // des tickets. Le fichier de mouvements utilise les Ref logiques.
  const refs = await getRefsTickets()

  const resultats: MouvementResultat[] = []
  for (const m of mouvements) {
    // 1) Ref connue → on traduit vers l'id GLPI réel.
    // 2) Sinon, on tente la valeur telle quelle comme id GLPI direct
    //    (rétro-compatibilité : un fichier qui contiendrait déjà les vrais id).
    const idResolu = refs[m.ref] ?? m.ticketId
    const m2: MouvementParse = { ...m, ticketId: idResolu }

    if (!idsExistants.has(idResolu)) {
      const detail = refs[m.ref] ? `(réf ${m.ref} → id ${idResolu})` : `(réf ${m.ref} non importée)`
      resultats.push({
        ...m2,
        success: false,
        message: `Ticket introuvable dans GLPI ${detail} — réimportez les tickets d'abord`,
      })
      continue
    }
    resultats.push(await appliquerUn(m2))
  }
  return resultats
}
