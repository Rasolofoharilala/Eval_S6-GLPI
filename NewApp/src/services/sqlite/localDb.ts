import initSqlJs, { type Database } from 'sql.js'

// ═════════════════════════════════════════════════════════════════════════════
// BASE SQLITE LOCALE — REMPLACE LE BACKEND SPRING BOOT
//
// Tout ce que faisait le backend Spring Boot (réglages Kanban : langues + statuts
// et « nouveaux coûts ») est désormais géré ICI, dans un seul fichier, côté
// navigateur, avec sql.js (SQLite compilé en WebAssembly).
//
// La base vit en mémoire ; après chaque écriture on l'exporte en octets et on la
// persiste dans IndexedDB, de sorte que les données survivent aux rechargements.
//
// Tables :
//   langue(id, code UNIQUE, nom)
//   statut_langue(id, langue_id, status_key, position, label, color)
//   nouveau_cout(id, ticket_id, item_id, item_type, cout, annule)
// ═════════════════════════════════════════════════════════════════════════════

// ─── Persistance IndexedDB ────────────────────────────────────────────────────

const IDB_NAME = 'newapp-local'
const IDB_STORE = 'sqlite'
const IDB_KEY = 'reglages.db'

function ouvrirIdb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(IDB_NAME, 1)
    req.onupgradeneeded = () => {
      req.result.createObjectStore(IDB_STORE)
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

async function lireBytes(): Promise<Uint8Array | null> {
  const idb = await ouvrirIdb()
  return new Promise((resolve, reject) => {
    const tx = idb.transaction(IDB_STORE, 'readonly')
    const req = tx.objectStore(IDB_STORE).get(IDB_KEY)
    req.onsuccess = () => resolve((req.result as Uint8Array) ?? null)
    req.onerror = () => reject(req.error)
  })
}

async function ecrireBytes(bytes: Uint8Array): Promise<void> {
  const idb = await ouvrirIdb()
  return new Promise((resolve, reject) => {
    const tx = idb.transaction(IDB_STORE, 'readwrite')
    tx.objectStore(IDB_STORE).put(bytes, IDB_KEY)
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

// ─── Ouverture / schéma / seed ────────────────────────────────────────────────

let dbPromise: Promise<Database> | null = null

const SCHEMA = `
CREATE TABLE IF NOT EXISTS langue (
  id   INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT NOT NULL UNIQUE,
  nom  TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS statut_langue (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  langue_id  INTEGER NOT NULL,
  status_key TEXT NOT NULL,
  position   INTEGER NOT NULL,
  label      TEXT NOT NULL,
  color      TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS nouveau_cout (
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  ticket_id INTEGER NOT NULL,
  item_id   INTEGER NOT NULL,
  item_type TEXT NOT NULL,
  cout      REAL NOT NULL,
  annule    INTEGER NOT NULL DEFAULT 0,
  lot       INTEGER NOT NULL DEFAULT 1
);
CREATE TABLE IF NOT EXISTS ref_ticket (
  ref        TEXT PRIMARY KEY,
  glpi_id    INTEGER NOT NULL
);
`

// Les 3 statuts fixes, dans l'ordre d'affichage (identique à l'ancien backend).
const STATUS_KEYS = ['nouveau', 'in_progress', 'termine'] as const
const LABELS_DEFAUT = ['Nouveau', 'In progress', 'Terminé']
const COULEURS_DEFAUT = ['#dbeafe', '#ffedd5', '#dcfce7']
const HEX_COLOR = /^#[0-9a-fA-F]{6}$/

async function getDb(): Promise<Database> {
  if (dbPromise) {
    return dbPromise
  }
  dbPromise = (async () => {
    const SQL = await initSqlJs({
      locateFile: (file) => `/node_modules/sql.js/dist/${file}`,
    })
    const bytes = await lireBytes()
    const db = bytes ? new SQL.Database(bytes) : new SQL.Database()
    db.run(SCHEMA)
    // si la base existait déjà sans la colonne lot, on l'ajoute (sinon erreur ignorée)
    try {
      db.run('ALTER TABLE nouveau_cout ADD COLUMN lot INTEGER NOT NULL DEFAULT 1')
    } catch {
      // la colonne lot existe déjà : rien à faire
    }
    seedIfEmpty(db)
    await persister(db)
    return db
  })()
  return dbPromise
}

// Exporte la base en octets et la sauvegarde dans IndexedDB.
async function persister(db: Database): Promise<void> {
  await ecrireBytes(db.export())
}

/** Au premier démarrage : crée Français et Malgache si aucune langue n'existe. */
function seedIfEmpty(db: Database): void {
  const count = unNombre(db, 'SELECT COUNT(*) FROM langue')
  if (count > 0) {
    return
  }
  creerLangueAvecLabels(db, 'fr', 'Français', ['Nouveau', 'In progress', 'Terminé'])
  creerLangueAvecLabels(db, 'mg', 'Malgache', ['Vaovao', 'Efa manao', 'Vita'])
}

// ─── Petits utilitaires SQL ───────────────────────────────────────────────────

// Renvoie la 1ère valeur de la 1ère ligne (ex : COUNT, last_insert_rowid).
function unNombre(db: Database, sql: string, params: unknown[] = []): number {
  const res = db.exec(sql, params as never)
  const val = res[0]?.values?.[0]?.[0]
  return val == null ? 0 : Number(val)
}

// Exécute un SELECT et renvoie des objets {colonne: valeur}.
function lignes(db: Database, sql: string, params: unknown[] = []): Record<string, unknown>[] {
  const res = db.exec(sql, params as never)
  if (!res[0]) {
    return []
  }
  const { columns, values } = res[0]
  return values.map((row) => {
    const obj: Record<string, unknown> = {}
    columns.forEach((col, i) => (obj[col] = row[i]))
    return obj
  })
}

// ═════════════════════════════════════════════════════════════════════════════
// LANGUES (ex-LangueService)
// ═════════════════════════════════════════════════════════════════════════════

export type StatutLangue = {
  statusKey: string
  position: number
  label: string
  color: string
}

export type Langue = {
  id: number
  code: string
  nom: string
  statuts: StatutLangue[]
}

function creerLangueAvecLabels(db: Database, code: string, nom: string, labels: string[]): number {
  db.run('INSERT INTO langue (code, nom) VALUES (?, ?)', [code, nom])
  const langueId = unNombre(db, 'SELECT * last_insert_rowid()')
  for (let i = 0; i < STATUS_KEYS.length; i++) {
    db.run(
      'INSERT INTO statut_langue (langue_id, status_key, position, label, color) VALUES (?, ?, ?, ?, ?)',
      [langueId, STATUS_KEYS[i]!, i + 1, labels[i]!, COULEURS_DEFAUT[i]!],
    )
  }
  return langueId
}

function langueVersDto(db: Database, id: number): Langue {
  const l = lignes(db, 'SELECT id, code, nom FROM langue WHERE id = ?', [id])[0]!
  const statuts = lignes(
    db,
    'SELECT status_key, position, label, color FROM statut_langue WHERE langue_id = ? ORDER BY position ASC',
    [id],
  ).map((s) => ({
    statusKey: String(s.status_key),
    position: Number(s.position),
    label: String(s.label),
    color: String(s.color),
  }))
  return { id: Number(l.id), code: String(l.code), nom: String(l.nom), statuts }
}

/** Liste toutes les langues avec leurs 3 statuts. */
export async function getLangues(): Promise<Langue[]> {
  const db = await getDb()
  return lignes(db, 'SELECT id FROM langue ORDER BY id ASC').map((r) =>
    langueVersDto(db, Number(r.id)),
  )
}

/** Crée une nouvelle langue + ses 3 statuts par défaut. */
export async function creerLangue(code: string, nom: string): Promise<Langue> {
  const db = await getDb()
  const codeN = (code ?? '').trim().toLowerCase()
  const nomN = (nom ?? '').trim()
  if (!codeN || !nomN) {
    throw new Error('Le code et le nom sont obligatoires.')
  }
  if (unNombre(db, 'SELECT COUNT(*) FROM langue WHERE code = ?', [codeN]) > 0) {
    throw new Error('Ce code de langue existe déjà : ' + codeN)
  }
  const id = creerLangueAvecLabels(db, codeN, nomN, LABELS_DEFAUT)
  await persister(db)
  return langueVersDto(db, id)
}

/** Met à jour le nom de la langue et les libellés/couleurs de ses statuts. */
export async function majLangue(id: number, nom: string, statuts: StatutLangue[]): Promise<Langue> {
  const db = await getDb()
  if (unNombre(db, 'SELECT COUNT(*) FROM langue WHERE id = ?', [id]) === 0) {
    throw new Error('Langue introuvable : ' + id)
  }
  if (nom != null && nom.trim() !== '') {
    db.run('UPDATE langue SET nom = ? WHERE id = ?', [nom.trim(), id])
  }
  if (statuts) {
    for (const maj of statuts) {
      const existe =
        unNombre(db, 'SELECT COUNT(*) FROM statut_langue WHERE langue_id = ? AND status_key = ?', [
          id,
          maj.statusKey,
        ]) > 0
      if (!existe) {
        continue
      }
      if (maj.label != null && maj.label.trim() !== '') {
        db.run('UPDATE statut_langue SET label = ? WHERE langue_id = ? AND status_key = ?', [
          maj.label.trim(),
          id,
          maj.statusKey,
        ])
      }
      if (maj.color != null) {
        if (!HEX_COLOR.test(maj.color)) {
          throw new Error('Couleur invalide (#RRGGBB attendu) : ' + maj.color)
        }
        db.run('UPDATE statut_langue SET color = ? WHERE langue_id = ? AND status_key = ?', [
          maj.color,
          id,
          maj.statusKey,
        ])
      }
    }
  }
  await persister(db)
  return langueVersDto(db, id)
}

/** Supprime une langue et ses 3 statuts. */
export async function supprimerLangue(id: number): Promise<void> {
  const db = await getDb()
  if (unNombre(db, 'SELECT COUNT(*) FROM langue WHERE id = ?', [id]) === 0) {
    throw new Error('Langue introuvable : ' + id)
  }
  db.run('DELETE FROM statut_langue WHERE langue_id = ?', [id])
  db.run('DELETE FROM langue WHERE id = ?', [id])
  await persister(db)
}

// ═════════════════════════════════════════════════════════════════════════════
// NOUVEAUX COÛTS (ex-CoutService)
// ═════════════════════════════════════════════════════════════════════════════

export type CoutCree = {
  id: number
  ticketId: number
  itemId: number
  itemType: string
  cout: number
  annule: boolean
}

export type CoutParItem = {
  itemId: number
  itemType: string
  cout: number
}

export type ItemLie = {
  itemId: number
  itemType: string
}

// Arrondi à 4 décimales (équivalent BigDecimal scale=4, HALF_UP).
function arrondi4(n: number): number {
  return Math.round((n + Number.EPSILON) * 10000) / 10000
}

function coutVersDto(row: Record<string, unknown>): CoutCree {
  return {
    id: Number(row.id),
    ticketId: Number(row.ticket_id),
    itemId: Number(row.item_id),
    itemType: String(row.item_type),
    cout: Number(row.cout),
    annule: Number(row.annule) === 1,
  }
}

// Numéro du prochain lot pour un ticket (un lot = une création OU une réouverture).
// Sert à séparer les coûts dans le temps pour le calcul des modes (premier, dernier…).
function prochainLot(db: Database, ticketId: number): number {
  return (
    unNombre(db, 'SELECT COALESCE(MAX(lot), 0) FROM nouveau_cout WHERE ticket_id = ?', [ticketId]) +
    1
  )
}

function insererCouts(
  db: Database,
  ticketId: number,
  items: ItemLie[],
  coutParItem: number,
  lot: number,
): CoutCree[] {
  const crees: CoutCree[] = []
  for (const item of items) {
    db.run(
      'INSERT INTO nouveau_cout (ticket_id, item_id, item_type, cout, annule, lot) VALUES (?, ?, ?, ?, 0, ?)',
      [ticketId, item.itemId, item.itemType.trim(), coutParItem, lot],
    )
    const id = unNombre(db, 'SELECT last_insert_rowid()')
    crees.push(coutVersDto(lignes(db, 'SELECT * FROM nouveau_cout WHERE id = ?', [id])[0]!))
  }
  return crees
}

/** Crée un nouveau coût pour un ticket, réparti sur ses items. */
export async function creerCout(
  ticketId: number,
  nouveauCout: number,
  items: ItemLie[],
): Promise<CoutCree[]> {
  const db = await getDb()
  if (ticketId == null || ticketId <= 0) {
    throw new Error("L'identifiant du ticket est obligatoire.")
  }
  if (nouveauCout == null || nouveauCout < 0) {
    throw new Error('Le nouveau coût doit être un nombre positif ou nul.')
  }
  if (!items || items.length === 0) {
    throw new Error('Le ticket doit avoir au moins un item lié.')
  }
  for (const item of items) {
    if (
      !item ||
      item.itemId == null ||
      item.itemId <= 0 ||
      !item.itemType ||
      !item.itemType.trim()
    ) {
      throw new Error('Chaque item doit avoir un id et un type valides.')
    }
  }
  const coutParItem = arrondi4(nouveauCout / items.length)
  const lot = prochainLot(db, ticketId)
  const crees = insererCouts(db, ticketId, items, coutParItem, lot)
  await persister(db)
  return crees
}

/**
 * Dernier coût TOTAL actif d'un ticket = somme de toutes les lignes actives
 * (un ticket n'a qu'un lot actif à la fois après annulation des anciens).
 */
export async function dernierCoutTotalActif(ticketId: number): Promise<number> {
  const db = await getDb()
  const total = lignes(
    db,
    'SELECT COALESCE(SUM(cout), 0) AS total FROM nouveau_cout WHERE ticket_id = ? AND annule = 0',
    [ticketId],
  )[0]
  return Number(total?.total) || 0
}

/**
 * Coût de base utilisé pour la réouverture, selon le mode choisi.
 * On regarde le total de CHAQUE lot du ticket (un lot = un coût enregistré),
 * puis :
 *   mode 1 = dernier coût   (le plus récent)
 *   mode 2 = premier coût   (le tout premier)
 *   mode 3 = moyenne des coûts
 *   mode 4 = total des coûts (tout additionné)
 */
export async function coutSelonMode(ticketId: number, mode: number): Promise<number> {
  const db = await getDb()
  // total de chaque lot, du plus ancien au plus récent
  const vidiny = lignes(
    db,
    'SELECT lot, SUM(cout) AS total FROM nouveau_cout WHERE ticket_id = ? GROUP BY lot ORDER BY lot ASC',
    [ticketId],
  ).map((r) => Number(r.total) || 0)

  if (vidiny.length === 0) {
    return 0
  }
  if (mode === 2) {
    return vidiny[0]! // premier
  }
  if (mode === 3) {
    const somme = vidiny.reduce((a, b) => a + b, 0)
    return arrondi4(somme / vidiny.length) // moyenne
  }
  if (mode === 4) {
    return vidiny.reduce((a, b) => a + b, 0) // total
  }
  return vidiny[vidiny.length - 1]! // mode 1 (défaut) : dernier
}

/**
 * RÉOUVERTURE (Terminé → In progress) avec un pourcentage :
 *   nouvelle valeur = coût de base (selon le mode) + (pourcentage % × coût de base).
 * On annule les coûts actifs puis on réinsère la nouvelle valeur sur les items.
 */
export async function reouvrir(
  ticketId: number,
  pourcentage: number,
  items: ItemLie[],
  mode: number = 1,
): Promise<CoutCree[]> {
  const db = await getDb()
  if (ticketId == null || ticketId <= 0) {
    throw new Error("L'identifiant du ticket est obligatoire.")
  }
  if (pourcentage == null || pourcentage < 0) {
    throw new Error('Le pourcentage doit être positif ou nul.')
  }
  if (!items || items.length === 0) {
    throw new Error('Le ticket doit avoir au moins un item lié.')
  }

  const base = await coutSelonMode(ticketId, mode)
  const nouvelle = base + base * (pourcentage / 100)

  db.run('UPDATE nouveau_cout SET annule = 1 WHERE ticket_id = ? AND annule = 0', [ticketId])

  const coutParItem = arrondi4(nouvelle / items.length)
  const lot = prochainLot(db, ticketId)
  const crees = insererCouts(db, ticketId, items, coutParItem, lot)
  await persister(db)
  return crees
}

/** Annule (sans réinsérer) les coûts actifs d'un ticket. */
export async function annulerActifs(ticketId: number): Promise<void> {
  const db = await getDb()
  db.run('UPDATE nouveau_cout SET annule = 1 WHERE ticket_id = ? AND annule = 0', [ticketId])
  await persister(db)
}

/** Supprime physiquement tous les coûts d'un ticket. */
export async function supprimerByTicketId(ticketId: number): Promise<void> {
  const db = await getDb()
  if (ticketId == null || ticketId <= 0) {
    throw new Error("L'identifiant du ticket est obligatoire.")
  }
  db.run('DELETE FROM nouveau_cout WHERE ticket_id = ?', [ticketId])
  await persister(db)
}

/** Tous les coûts d'un ticket (annulés inclus). */
export async function getByTicketId(ticketId: number): Promise<CoutCree[]> {
  const db = await getDb()
  return lignes(db, 'SELECT * FROM nouveau_cout WHERE ticket_id = ?', [ticketId]).map(coutVersDto)
}

/** Coûts ACTIFS d'un ticket (annulés exclus). */
export async function getActifsByTicketId(ticketId: number): Promise<CoutCree[]> {
  const db = await getDb()
  return lignes(db, 'SELECT * FROM nouveau_cout WHERE ticket_id = ? AND annule = 0', [
    ticketId,
  ]).map(coutVersDto)
}

/** Tous les coûts ACTIFS (annulés exclus) — utilisé par /coutsParc. .*/
export async function getAllCouts(): Promise<CoutCree[]> {
  const db = await getDb()
  return lignes(db, 'SELECT * FROM nouveau_cout WHERE annule = 0').map(coutVersDto)
}

/** Totaux par item (actifs). */
export async function getCoutsParItem(): Promise<CoutParItem[]> {
  const db = await getDb()
  return lignes(
    db,
    `SELECT item_id, item_type, SUM(cout) AS cout
       FROM nouveau_cout
      WHERE annule = 0
      GROUP BY item_type, item_id`,
  ).map((r) => ({
    itemId: Number(r.item_id),
    itemType: String(r.item_type),
    cout: Number(r.cout),
  }))
}

/**
 * Vide la table des nouveaux coûts (appelé à la réinitialisation).
 * On remet aussi le compteur AUTOINCREMENT à zéro pour que les prochains
 * coûts repartent de l'id 1 (sinon SQLite conserve le dernier id atteint
 * dans la table interne `sqlite_sequence`).
 */
export async function supprimerTousLesCouts(): Promise<void> {
  const db = await getDb()
  db.run('DELETE FROM nouveau_cout')
  db.run("DELETE FROM sqlite_sequence WHERE name = 'nouveau_cout'")
  await persister(db)
}

// ═════════════════════════════════════════════════════════════════════════════
// CORRESPONDANCE Ref_Ticket (1, 2, 3…) → id GLPI réel (2968…)
//
// Les CSV d'import utilisent un Ref_Ticket logique (1, 2, 3) tandis que GLPI
// attribue ses propres id auto-incrémentés. On mémorise ce lien à l'import des
// tickets pour que l'import de mouvements retrouve le bon id GLPI à partir du
// numéro logique du fichier.
// ═════════════════════════════════════════════════════════════════════════════

/** Enregistre (ou met à jour) plusieurs correspondances ref → id GLPI. */
export async function enregistrerRefsTickets(mapping: Record<string, number>): Promise<void> {
  const db = await getDb()
  for (const [ref, glpiId] of Object.entries(mapping)) {
    if (!ref?.trim() || !glpiId) continue
    db.run('INSERT OR REPLACE INTO ref_ticket (ref, glpi_id) VALUES (?, ?)', [ref.trim(), glpiId])
  }
  await persister(db)
}

/** Renvoie tout le mapping ref → id GLPI (objet). */
export async function getRefsTickets(): Promise<Record<string, number>> {
  const db = await getDb()
  const out: Record<string, number> = {}
  for (const r of lignes(db, 'SELECT ref, glpi_id FROM ref_ticket')) {
    out[String(r.ref)] = Number(r.glpi_id)
  }
  return out
}

/** Vide la table de correspondance (réinitialisation). */
export async function supprimerRefsTickets(): Promise<void> {
  const db = await getDb()
  db.run('DELETE FROM ref_ticket')
  await persister(db)
}
