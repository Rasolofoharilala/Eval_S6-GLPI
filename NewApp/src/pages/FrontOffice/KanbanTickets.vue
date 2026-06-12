<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import AppSidebarFO from '@/components/layout/AppSidebarFO.vue'
import FormulaireTicket from '@/components/FormulaireTicket.vue'
import { getTickets, getTicketById } from '@/services/generated/ticketService'
import { creerTicketComplet, changerStatutTicket, type DonneesTicket } from '@/services/ticketActions'
import type { Ticket } from '@/services/generated/ticketService'
import { getLangues, LANGUES_DEFAUT, LANGUE_DEFAUT, type Langue } from '@/services/langueService'
import { COLONNES_KANBAN, colonnePourStatut, type CleColonne } from '@/config/kanban'
import { libelleStatut, libellePriorite } from '@/config/tickets'

// ─── Langues du Kanban (CRUD SQLite, page /stockage) ───
// On lit les MÊMES langues que le CRUD : tes couleurs et libellés s'appliquent ici.
const langues = ref<Langue[]>(LANGUES_DEFAUT)
const codeLangue = ref('fr')

const langueActive = computed<Langue>(
  () =>
    langues.value.find((l) => l.code === codeLangue.value) ??
    langues.value[0] ??
    LANGUE_DEFAUT,
)

// Les 3 colonnes : couleur + libellé viennent de la langue active (par statut).
const COLONNES = computed(() =>
  COLONNES_KANBAN.map((col) => {
    const reglage = langueActive.value.statuts.find((s) => s.statusKey === col.cle)
    return {
      cle: col.cle,
      statutCible: col.statutCible,
      label: reglage?.label ?? col.cle,
      color: reglage?.color ?? '#eee',
    }
  }),
)

// ─── État ───
const tickets = ref<Ticket[]>([])
const loading = ref(false)
const error = ref('')

// Dialogue détail (ticket complet chargé via getTicketById)
const detailTicket = ref<Ticket | null>(null)

// Dialogue création (utilise le formulaire partagé)
const showCreateDialog = ref(false)
const createStatutId = ref(1)
const createLoading = ref(false)
const formulaire = ref<InstanceType<typeof FormulaireTicket> | null>(null)

// Dialogue changement de statut
const showStatusDialog = ref(false)
const pendingDrop = ref<{ ticket: Ticket; statutCible: number; libelle: string } | null>(null)
const statusNote = ref('')
const statusLoading = ref(false)

// Glisser-déposer
const draggingTicketId = ref<number | null>(null)
const dragOverCle = ref<CleColonne | null>(null)

// ─── Cartes par colonne ───
function statutDuTicket(t: Ticket): number {
  return t.status && typeof t.status === 'object' ? (t.status.id ?? 1) : 1
}

function ticketsDeColonne(cle: CleColonne): Ticket[] {
  return tickets.value.filter((t) => colonnePourStatut(statutDuTicket(t)).cle === cle)
}

const comptesColonnes = computed(() =>
  Object.fromEntries(COLONNES.value.map((c) => [c.cle, ticketsDeColonne(c.cle).length])),
)

// ─── Chargement ───
async function charger() {
  loading.value = true
  error.value = ''
  try {
    tickets.value = await getTickets()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Erreur inconnue'
  } finally {
    loading.value = false
  }
}

async function chargerLangues() {
  try {
    langues.value = await getLangues()
  } catch {
    // backend SQLite injoignable : on garde les langues par défaut
  }
}

onMounted(() => {
  void charger()
  void chargerLangues()
})

// ─── Détail : on recharge le ticket complet (catégorie, lieu… absents de la liste) ───
async function openDetail(ticket: Ticket) {
  detailTicket.value = ticket
  if (ticket.id) {
    try {
      detailTicket.value = await getTicketById(ticket.id)
    } catch {
      // on garde la version liste si le détail échoue
    }
  }
}

function closeDetail() {
  detailTicket.value = null
}

// ─── Création via le formulaire partagé ───
function openCreate(statutCible: number) {
  createStatutId.value = statutCible
  showCreateDialog.value = true
}

async function creerDepuisFormulaire(donnees: DonneesTicket) {
  createLoading.value = true
  try {
    await creerTicketComplet(donnees)
    await charger()
    showCreateDialog.value = false
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Erreur création'
  } finally {
    createLoading.value = false
  }
}

// ─── Glisser-déposer ───
function onDragStart(ticket: Ticket) {
  draggingTicketId.value = ticket.id ?? null
}

function onDragEnd() {
  draggingTicketId.value = null
  dragOverCle.value = null
}

function onDragOver(cle: CleColonne, event: DragEvent) {
  event.preventDefault()
  dragOverCle.value = cle
}

function onDrop(cle: CleColonne) {
  dragOverCle.value = null
  const ticket = tickets.value.find((t) => t.id === draggingTicketId.value)
  if (!ticket) return

  const colonneActuelle = colonnePourStatut(statutDuTicket(ticket)).cle
  if (colonneActuelle === cle) return

  const colonne = COLONNES.value.find((c) => c.cle === cle)
  if (!colonne) return

  // Toujours demander confirmation / infos supplémentaires (sujet J2).
  pendingDrop.value = { ticket, statutCible: colonne.statutCible, libelle: colonne.label }
  statusNote.value = ''
  showStatusDialog.value = true
}

// ─── Changement de statut (action centralisée) ───
async function confirmStatusChange() {
  if (!pendingDrop.value) return
  const { ticket, statutCible } = pendingDrop.value
  statusLoading.value = true
  try {
    await changerStatutTicket(ticket.id ?? 0, statutCible, statusNote.value)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Échec du changement de statut'
  } finally {
    await charger()
    showStatusDialog.value = false
    pendingDrop.value = null
    statusLoading.value = false
  }
}

function cancelStatusChange() {
  showStatusDialog.value = false
  pendingDrop.value = null
}

// ─── Helpers affichage (libellés centraux) ───
function classePriorite(p?: number) {
  if (p === 6 || p === 5 || p === 4) return 'prio-high'
  if (p === 3) return 'prio-med'
  return 'prio-low'
}

function formatDate(d?: string) {
  if (!d) return '—'
  return d.slice(0, 10)
}
</script>

<template>
  <AppSidebarFO />

  <main class="kanban-page">
    <header class="kanban-header">
      <h1>Tickets — Vue Kanban</h1>
      <button class="btn-reload" @click="charger" :disabled="loading">
        {{ loading ? 'Chargement…' : 'Actualiser' }}
      </button>
      <label class="select-langue">
        Langue
        <select v-model="codeLangue">
          <option v-for="l in langues" :key="l.code" :value="l.code">{{ l.nom }}</option>
        </select>
      </label>
    </header>

    <p v-if="error" class="kanban-error">{{ error }}</p>

    <!-- Board -->
    <div class="kanban-board">
      <div
        v-for="col in COLONNES"
        :key="col.cle"
        class="kanban-col"
        :class="{ 'drag-over': dragOverCle === col.cle }"
        :style="{ background: col.color }"
        @dragover="onDragOver(col.cle, $event)"
        @dragleave="dragOverCle = null"
        @drop="onDrop(col.cle)"
      >
        <!-- En-tête colonne -->
        <div class="col-header">
          <span class="col-title">{{ col.label }}</span>
          <span class="col-count">{{ comptesColonnes[col.cle] }}</span>
        </div>

        <!-- Cartes -->
        <div
          v-for="ticket in ticketsDeColonne(col.cle)"
          :key="ticket.id"
          class="ticket-card"
          :class="[classePriorite(ticket.priority), { dragging: draggingTicketId === ticket.id }]"
          draggable="true"
          @dragstart="onDragStart(ticket)"
          @dragend="onDragEnd"
          @click="openDetail(ticket)"
        >
          <div class="card-title">{{ ticket.name ?? '(sans titre)' }}</div>
          <div class="card-meta">
            <span v-if="ticket.priority" class="badge-prio">{{
              libellePriorite(ticket.priority)
            }}</span>
            <span class="card-date">{{ formatDate(ticket.date) }}</span>
          </div>
        </div>

        <!-- Ajouter un ticket -->
        <button class="btn-add" @click="openCreate(col.statutCible)">+ Ajouter 1 ticket</button>
      </div>
    </div>

    <!-- ─── Dialogue Détail ──────────────────────────────────────────────── -->
    <div v-if="detailTicket" class="dialog-overlay" @click.self="closeDetail">
      <div class="dialog">
        <button class="dialog-close" @click="closeDetail">✕</button>
        <h2>Ticket #{{ detailTicket.id }}</h2>
        <table class="detail-table">
          <tbody>
            <tr>
              <th>Titre</th>
              <td>{{ detailTicket.name ?? '—' }}</td>
            </tr>
            <tr>
              <th>Statut</th>
              <td>{{ libelleStatut(detailTicket.status?.id ?? 0) }}</td>
            </tr>
            <tr>
              <th>Type</th>
              <td>{{ detailTicket.type === 1 ? 'Incident' : 'Demande' }}</td>
            </tr>
            <tr>
              <th>Priorité</th>
              <td>{{ libellePriorite(detailTicket.priority) }}</td>
            </tr>
            <tr>
              <th>Urgence</th>
              <td>{{ libellePriorite(detailTicket.urgency) }}</td>
            </tr>
            <tr>
              <th>Impact</th>
              <td>{{ libellePriorite(detailTicket.impact) }}</td>
            </tr>
            <tr>
              <th>Catégorie</th>
              <td>{{ detailTicket.category?.name ?? '—' }}</td>
            </tr>
            <tr>
              <th>Lieu</th>
              <td>{{ detailTicket.location?.name ?? '—' }}</td>
            </tr>
            <tr>
              <th>Date ouverture</th>
              <td>{{ formatDate(detailTicket.date) }}</td>
            </tr>
            <tr>
              <th>Date résolution</th>
              <td>{{ formatDate(detailTicket.resolution_date) }}</td>
            </tr>
            <tr>
              <th>ID externe</th>
              <td>{{ detailTicket.external_id ?? '—' }}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>
                <pre class="content-pre">{{ detailTicket.content ?? '—' }}</pre>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ─── Dialogue Création (formulaire PARTAGÉ, version compacte) ──────── -->
    <div v-if="showCreateDialog" class="dialog-overlay" @click.self="showCreateDialog = false">
      <div class="dialog">
        <button class="dialog-close" @click="showCreateDialog = false">✕</button>
        <h2>Nouveau ticket</h2>
        <FormulaireTicket
          ref="formulaire"
          :statut-initial="createStatutId"
          :compact="true"
          :en-chargement="createLoading"
          @submit="creerDepuisFormulaire"
        />
      </div>
    </div>

    <!-- ─── Dialogue Changement de statut ────────────────────────────────── -->
    <div
      v-if="showStatusDialog && pendingDrop"
      class="dialog-overlay"
      @click.self="cancelStatusChange"
    >
      <div class="dialog">
        <button class="dialog-close" @click="cancelStatusChange">✕</button>
        <h2>Changer le statut</h2>
        <p>
          Déplacer <strong>« {{ pendingDrop.ticket.name }} »</strong> vers
          <strong>{{ pendingDrop.libelle }}</strong> ?
        </p>
        <div class="field">
          <label>Note de suivi (optionnel)</label>
          <textarea
            v-model="statusNote"
            rows="3"
            placeholder="Raison du changement, informations complémentaires…"
          />
        </div>
        <div class="dialog-actions">
          <button class="btn-cancel" @click="cancelStatusChange">Annuler</button>
          <button class="btn-confirm" @click="confirmStatusChange" :disabled="statusLoading">
            {{ statusLoading ? 'Mise à jour…' : 'Confirmer' }}
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.kanban-page {
  padding: 1.5rem;
  min-height: 100vh;
  background: #f4f6f9;
}

.kanban-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.kanban-header h1 {
  margin: 0;
  font-size: 1.4rem;
}

.btn-reload {
  padding: 0.4rem 0.9rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: white;
  cursor: pointer;
}

.select-langue {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
}

.kanban-error {
  color: #c0392b;
  margin-bottom: 1rem;
}

/* ─── Board ─────────────────────────────────────────────────────────────────── */

.kanban-board {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.kanban-col {
  flex: 1;
  min-width: 220px;
  background: #e8edf2;
  border-radius: 10px;
  padding: 0.75rem;
  transition: background 0.15s;
}

.kanban-col.drag-over {
  background: #d0dff0;
  outline: 2px dashed #3a86d4;
}

.col-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.col-title {
  font-weight: 600;
  font-size: 0.95rem;
}

.col-count {
  background: #c5cfd9;
  border-radius: 999px;
  padding: 0 0.5rem;
  font-size: 0.8rem;
  font-weight: 700;
}

/* ─── Cartes ─────────────────────────────────────────────────────────────────── */

.ticket-card {
  background: white;
  border-radius: 8px;
  padding: 0.7rem 0.85rem;
  margin-bottom: 0.5rem;
  cursor: grab;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #aaa;
  transition:
    opacity 0.15s,
    box-shadow 0.15s;
}

.ticket-card:hover {
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
}

.ticket-card.dragging {
  opacity: 0.4;
}

.ticket-card.prio-high {
  border-left-color: #e74c3c;
}
.ticket-card.prio-med {
  border-left-color: #f39c12;
}
.ticket-card.prio-low {
  border-left-color: #2ecc71;
}

.card-title {
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.35rem;
  word-break: break-word;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: #666;
}

.badge-prio {
  background: #eee;
  border-radius: 4px;
  padding: 0 0.4rem;
}

.btn-add {
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.45rem;
  border: 1px dashed #aaa;
  border-radius: 6px;
  background: transparent;
  color: #555;
  cursor: pointer;
  font-size: 0.85rem;
  transition: background 0.1s;
}

.btn-add:hover {
  background: rgba(0, 0, 0, 0.05);
}

/* ─── Dialogues ─────────────────────────────────────────────────────────────── */

.dialog-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.dialog {
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  width: 100%;
  max-width: 540px;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
}

.dialog h2 {
  margin: 0 0 1rem;
  font-size: 1.1rem;
}

.dialog-close {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: none;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  color: #888;
}

.dialog-error {
  color: #c0392b;
  margin-bottom: 0.75rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-bottom: 0.9rem;
}

.field label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #444;
}

.field input,
.field textarea {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 0.5rem;
  font-size: 0.9rem;
  resize: vertical;
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1rem;
}

.btn-cancel {
  padding: 0.45rem 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: white;
  cursor: pointer;
}

.btn-confirm {
  padding: 0.45rem 1rem;
  border: none;
  border-radius: 6px;
  background: #3a86d4;
  color: white;
  cursor: pointer;
  font-weight: 600;
}

.btn-confirm:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* ─── Table détail ───────────────────────────────────────────────────────────── */

.detail-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.detail-table th {
  width: 35%;
  text-align: left;
  padding: 0.4rem 0.5rem;
  color: #555;
  font-weight: 600;
  vertical-align: top;
}

.detail-table td {
  padding: 0.4rem 0.5rem;
  word-break: break-word;
}

.detail-table tr:nth-child(even) {
  background: #f8f9fa;
}

.content-pre {
  white-space: pre-wrap;
  word-break: break-word;
  margin: 0;
  font-family: inherit;
  font-size: 0.88rem;
}
</style>
