<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import AppSidebarFO from '@/components/layout/AppSidebarFO.vue'
import { createTicket } from '@/services/generated/ticketService'
import type { TicketCreatePayload } from '@/services/generated/ticketService'
import { useEntities } from '@/composables/generated/useEntities'
import { useItilcategories } from '@/composables/generated/useItilcategories'
import { useLocations } from '@/composables/generated/useLocations'
import { useOlas } from '@/composables/generated/useOlas'
import { useRequesttypes } from '@/composables/generated/useRequesttypes'
import { useSlas } from '@/composables/generated/useSlas'
import { useUsers } from '@/composables/generated/useUsers'

type Level = 1 | 2 | 3 | 4 | 5

const { entities, loadEntities } = useEntities()
const { itilcategories, loadItilcategories } = useItilcategories()
const { locations, loadLocations } = useLocations()
const { olas, loadOlas } = useOlas()
const { requesttypes, loadRequesttypes } = useRequesttypes()
const { slas, loadSlas } = useSlas()
const { users, loadUsers } = useUsers()

const levels: Array<{ value: Level; label: string }> = [
  { value: 1, label: 'Très basse' },
  { value: 2, label: 'Basse' },
  { value: 3, label: 'Moyenne' },
  { value: 4, label: 'Haute' },
  { value: 5, label: 'Très haute' },
]

const statuses = [
  { value: 1, label: 'Nouveau' },
  { value: 2, label: 'En cours (attribué)' },
  { value: 3, label: 'En cours (planifié)' },
  { value: 4, label: 'En attente' },
  { value: 5, label: 'Résolu' },
  { value: 6, label: 'Clos' },
]

const form = reactive({
  name: '',
  content: '',
  date: '',
  type: 1 as 1 | 2,
  entityId: 0,
  categoryId: 0,
  statusId: 1,
  requestTypeId: 0,
  locationId: 0,
  urgency: 3 as Level,
  impact: 3 as Level,
  priority: 3 as Level,
  totalDuration: '',
  externalId: '',
  requesterId: 0,
  observerId: 0,
  assignedId: 0,
  slaTtoId: 0,
  slaTtrId: 0,
  olaTtoId: 0,
  olaTtrId: 0,
  associatedItemType: '',
  associatedItemId: '',
  linkType: 'related',
  linkedTicketId: '',
})

const loading = ref(false)
const error = ref('')
const success = ref('')
const selectedFiles = ref<File[]>([])

function toGlpiDate(value: string): string | undefined {
  if (!value) {
    return undefined
  }

  return value.replace('T', ' ') + ':00'
}

function relation(id: number) {
  return id ? { id } : undefined
}

function onFilesSelected(event: Event) {
  const input = event.target as HTMLInputElement
  selectedFiles.value = Array.from(input.files ?? [])
}

function userLabel(user: { username?: string; firstname?: string; realname?: string }) {
  const fullName = [user.firstname, user.realname].filter(Boolean).join(' ')
  return fullName || user.username || 'Utilisateur sans nom'
}

async function handleSubmit() {
  loading.value = true
  error.value = ''
  success.value = ''

  const team: NonNullable<TicketCreatePayload['team']> = []

  if (form.observerId) {
    team.push({ type: 'User', id: form.observerId, role: 'observer' })
  }

  if (form.assignedId) {
    team.push({ type: 'User', id: form.assignedId, role: 'assigned' })
  }

  const payload: TicketCreatePayload = {
    name: form.name.trim(),
    content: form.content.trim(),
    date: toGlpiDate(form.date),
    type: form.type,
    entity: relation(form.entityId),
    category: relation(form.categoryId),
    status: relation(form.statusId),
    request_type: relation(form.requestTypeId),
    location: relation(form.locationId),
    urgency: form.urgency,
    impact: form.impact,
    priority: form.priority,
    external_id: form.externalId.trim() || undefined,
    user_recipient: relation(form.requesterId),
    team: team.length ? team : undefined,
    sla_tto: relation(form.slaTtoId),
    sla_ttr: relation(form.slaTtrId),
    ola_tto: relation(form.olaTtoId),
    ola_ttr: relation(form.olaTtrId),
  }

  try {
    const ticket = await createTicket(payload)
    const deferredFields = [
      selectedFiles.value.length ? 'pièces jointes' : '',
      form.associatedItemId ? 'élément associé' : '',
      form.linkedTicketId ? 'liaison entre tickets' : '',
    ].filter(Boolean)

    success.value = `Ticket créé avec succès${ticket.id ? ` (ID ${ticket.id})` : ''}.${
      deferredFields.length
        ? ` À compléter via les endpoints secondaires : ${deferredFields.join(', ')}.`
        : ''
    }`

    form.name = ''
    form.content = ''
    form.externalId = ''
    selectedFiles.value = []
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Erreur pendant la création du ticket'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  void Promise.all([
    loadEntities(),
    loadItilcategories(),
    loadLocations(),
    loadOlas(),
    loadRequesttypes(),
    loadSlas(),
    loadUsers(),
  ])
})
</script>

<template>
  <AppSidebarFO />

  <main class="ticket-page">
    <header class="page-header">
      <div>
        <p class="eyebrow">Assistance / Tickets</p>
        <h1>Créer un ticket</h1>
      </div>
      <span class="api-badge">POST /Assistance/Ticket</span>
    </header>

    <form class="ticket-form" @submit.prevent="handleSubmit">
      <section class="request-card">
        <div class="entity-banner">
          <span>Le ticket sera ajouté à l'entité</span>
          <select v-model.number="form.entityId" aria-label="Entité">
            <option :value="0">Entité par défaut</option>
            <option v-for="entity in entities" :key="entity.id" :value="entity.id">
              {{ entity.name }}
            </option>
          </select>
        </div>

        <div class="field full">
          <label for="ticket-title">Titre <strong>*</strong></label>
          <input id="ticket-title" v-model="form.name" type="text" required />
        </div>

        <div class="field full">
          <label for="ticket-description">Description <strong>*</strong></label>
          <textarea
            id="ticket-description"
            v-model="form.content"
            rows="12"
            required
            placeholder="Décrivez précisément le problème ou la demande..."
          />
        </div>

        <div class="upload-zone">
          <label for="ticket-files">Fichier(s)</label>
          <p>Glissez vos fichiers ici ou sélectionnez-les.</p>
          <input id="ticket-files" type="file" multiple @change="onFilesSelected" />
          <small v-if="selectedFiles.length">
            {{ selectedFiles.length }} fichier(s) sélectionné(s)
          </small>
          <small>Les documents seront envoyés par l'endpoint Timeline/Document.</small>
        </div>
      </section>

      <div class="details-column">
        <section class="panel">
          <h2>Ticket</h2>
          <div class="fields-grid">
            <div class="field">
              <label for="ticket-date">Date d'ouverture</label>
              <input id="ticket-date" v-model="form.date" type="datetime-local" />
            </div>

            <div class="field">
              <label for="ticket-type">Type</label>
              <select id="ticket-type" v-model.number="form.type">
                <option :value="1">Incident</option>
                <option :value="2">Demande</option>
              </select>
            </div>

            <div class="field">
              <label for="ticket-category">Catégorie</label>
              <select id="ticket-category" v-model.number="form.categoryId">
                <option :value="0">Aucune catégorie</option>
                <option v-for="category in itilcategories" :key="category.id" :value="category.id">
                  {{ category.completename || category.name }}
                </option>
              </select>
            </div>

            <div class="field">
              <label for="ticket-status">Statut</label>
              <select id="ticket-status" v-model.number="form.statusId">
                <option v-for="status in statuses" :key="status.value" :value="status.value">
                  {{ status.label }}
                </option>
              </select>
            </div>

            <div class="field">
              <label for="ticket-source">Source de la demande</label>
              <select id="ticket-source" v-model.number="form.requestTypeId">
                <option :value="0">Source par défaut</option>
                <option v-for="source in requesttypes" :key="source.id" :value="source.id">
                  {{ source.name }}
                </option>
              </select>
            </div>

            <div class="field">
              <label for="ticket-location">Lieu</label>
              <select id="ticket-location" v-model.number="form.locationId">
                <option :value="0">Aucun lieu</option>
                <option v-for="location in locations" :key="location.id" :value="location.id">
                  {{ location.completename || location.name }}
                </option>
              </select>
            </div>

            <div class="field">
              <label for="ticket-urgency">Urgence</label>
              <select id="ticket-urgency" v-model.number="form.urgency">
                <option v-for="level in levels" :key="level.value" :value="level.value">
                  {{ level.label }}
                </option>
              </select>
            </div>

            <div class="field">
              <label for="ticket-impact">Impact</label>
              <select id="ticket-impact" v-model.number="form.impact">
                <option v-for="level in levels" :key="level.value" :value="level.value">
                  {{ level.label }}
                </option>
              </select>
            </div>

            <div class="field">
              <label for="ticket-priority">Priorité</label>
              <select id="ticket-priority" v-model.number="form.priority">
                <option v-for="level in levels" :key="level.value" :value="level.value">
                  {{ level.label }}
                </option>
              </select>
            </div>

            <div class="field">
              <label for="ticket-duration">Durée totale</label>
              <input
                id="ticket-duration"
                v-model="form.totalDuration"
                type="text"
                placeholder="Ex. 2 heures"
              />
            </div>

            <div class="field full">
              <label for="ticket-external-id">ID externe</label>
              <input id="ticket-external-id" v-model="form.externalId" type="text" />
            </div>
          </div>
        </section>

        <section class="panel">
          <h2>Acteurs</h2>
          <div class="actors-grid">
            <div class="field">
              <label for="ticket-requester">Demandeur</label>
              <select id="ticket-requester" v-model.number="form.requesterId">
                <option :value="0">Utilisateur connecté</option>
                <option v-for="user in users" :key="user.id" :value="user.id">
                  {{ userLabel(user) }}
                </option>
              </select>
            </div>

            <div class="field">
              <label for="ticket-observer">Observateur</label>
              <select id="ticket-observer" v-model.number="form.observerId">
                <option :value="0">Aucun observateur</option>
                <option v-for="user in users" :key="user.id" :value="user.id">
                  {{ userLabel(user) }}
                </option>
              </select>
            </div>

            <div class="field">
              <label for="ticket-assigned">Attribué à</label>
              <select id="ticket-assigned" v-model.number="form.assignedId">
                <option :value="0">Non attribué</option>
                <option v-for="user in users" :key="user.id" :value="user.id">
                  {{ userLabel(user) }}
                </option>
              </select>
            </div>
          </div>
        </section>

        <section class="panel">
          <h2>Éléments</h2>
          <div class="inline-fields">
            <div class="field">
              <label for="item-type">Type d'élément</label>
              <select id="item-type" v-model="form.associatedItemType">
                <option value="">Sélectionner</option>
                <option value="Computer">Ordinateur</option>
                <option value="Monitor">Moniteur</option>
                <option value="Printer">Imprimante</option>
                <option value="NetworkEquipment">Matériel réseau</option>
                <option value="Phone">Téléphone</option>
                <option value="Software">Logiciel</option>
              </select>
            </div>
            <div class="field">
              <label for="item-id">ID de l'élément</label>
              <input
                id="item-id"
                v-model="form.associatedItemId"
                type="number"
                min="1"
                placeholder="ID GLPI"
              />
            </div>
          </div>
          <p class="helper">L'association sera réalisée après la création du ticket.</p>
        </section>

        <section class="panel">
          <h2>Niveaux de service</h2>
          <div class="fields-grid">
            <div class="field">
              <label for="sla-tto">TTO</label>
              <select id="sla-tto" v-model.number="form.slaTtoId">
                <option :value="0">Aucun SLA TTO</option>
                <option v-for="sla in slas" :key="sla.id" :value="sla.id">{{ sla.name }}</option>
              </select>
            </div>
            <div class="field">
              <label for="sla-ttr">TTR</label>
              <select id="sla-ttr" v-model.number="form.slaTtrId">
                <option :value="0">Aucun SLA TTR</option>
                <option v-for="sla in slas" :key="sla.id" :value="sla.id">{{ sla.name }}</option>
              </select>
            </div>
            <div class="field">
              <label for="ola-tto">TTO interne</label>
              <select id="ola-tto" v-model.number="form.olaTtoId">
                <option :value="0">Aucun OLA TTO</option>
                <option v-for="ola in olas" :key="ola.id" :value="ola.id">{{ ola.name }}</option>
              </select>
            </div>
            <div class="field">
              <label for="ola-ttr">TTR interne</label>
              <select id="ola-ttr" v-model.number="form.olaTtrId">
                <option :value="0">Aucun OLA TTR</option>
                <option v-for="ola in olas" :key="ola.id" :value="ola.id">{{ ola.name }}</option>
              </select>
            </div>
          </div>
        </section>

        <section class="panel">
          <h2>Liaisons</h2>
          <div class="inline-fields">
            <div class="field">
              <label for="link-type">Relation</label>
              <select id="link-type" v-model="form.linkType">
                <option value="related">Lié à</option>
                <option value="duplicate">Duplique</option>
                <option value="parent">Parent de</option>
                <option value="child">Enfant de</option>
              </select>
            </div>
            <div class="field">
              <label for="linked-ticket">Ticket lié</label>
              <input
                id="linked-ticket"
                v-model="form.linkedTicketId"
                type="number"
                min="1"
                placeholder="ID du ticket"
              />
            </div>
          </div>
          <p class="helper">La liaison sera réalisée après la création du ticket.</p>
        </section>
      </div>

      <div class="form-footer">
        <p v-if="error" class="message error-message">{{ error }}</p>
        <p v-if="success" class="message success-message">{{ success }}</p>
        <button type="submit" :disabled="loading">
          {{ loading ? 'Création...' : 'Ajouter le ticket' }}
        </button>
      </div>
    </form>
  </main>
</template>

<style scoped>
.ticket-page {
  min-height: 100vh;
  margin-left: 240px;
  padding: 28px;
  color: #20304a;
  background:
    radial-gradient(circle at top right, rgba(239, 176, 48, 0.12), transparent 28rem), #f4f7fb;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1500px;
  margin: 0 auto 18px;
}

.eyebrow {
  margin: 0 0 4px;
  color: #6b7890;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

h1 {
  margin: 0;
  color: #18253b;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(1.8rem, 3vw, 2.7rem);
}

.api-badge {
  padding: 8px 12px;
  border: 1px solid #d7dfeb;
  border-radius: 999px;
  color: #53617a;
  background: rgba(255, 255, 255, 0.75);
  font-family: monospace;
  font-size: 0.78rem;
}

.ticket-form {
  display: grid;
  grid-template-columns: minmax(320px, 0.75fr) minmax(520px, 1.25fr);
  gap: 16px;
  max-width: 1500px;
  margin: 0 auto;
}

.request-card,
.panel {
  border: 1px solid #dce3ed;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 12px 35px rgba(42, 59, 86, 0.06);
}

.request-card {
  align-self: start;
  display: grid;
  gap: 18px;
  padding: 20px;
}

.entity-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px;
  border: 1px solid #b8ddc2;
  border-radius: 9px;
  color: #285d35;
  background: #edf9f0;
  font-size: 0.86rem;
}

.entity-banner select {
  width: min(220px, 50%);
}

.details-column {
  display: grid;
  gap: 14px;
}

.panel {
  padding: 18px;
}

.panel h2 {
  margin: 0 0 16px;
  color: #2d4774;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 1.15rem;
}

.fields-grid,
.actors-grid,
.inline-fields {
  display: grid;
  gap: 14px;
}

.fields-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.actors-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.inline-fields {
  grid-template-columns: minmax(180px, 0.7fr) minmax(220px, 1.3fr);
}

.field {
  display: grid;
  gap: 6px;
}

.field.full {
  grid-column: 1 / -1;
}

label {
  color: #4b5d79;
  font-size: 0.8rem;
  font-weight: 700;
}

label strong {
  color: #c74432;
}

input,
select,
textarea {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 11px;
  border: 1px solid #cfd8e6;
  border-radius: 7px;
  color: #20304a;
  background: #fff;
  font: inherit;
  transition:
    border-color 160ms ease,
    box-shadow 160ms ease;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #5275ad;
  box-shadow: 0 0 0 3px rgba(82, 117, 173, 0.13);
}

textarea {
  resize: vertical;
  min-height: 230px;
  line-height: 1.5;
}

.upload-zone {
  display: grid;
  place-items: center;
  gap: 8px;
  padding: 20px;
  border: 1px dashed #9ec6a8;
  border-radius: 10px;
  color: #3e6548;
  background: #f1faf3;
  text-align: center;
}

.upload-zone p,
.upload-zone small,
.helper {
  margin: 0;
}

.upload-zone input {
  max-width: 100%;
  border: 0;
  background: transparent;
}

.helper,
.upload-zone small {
  color: #78869a;
  font-size: 0.75rem;
}

.form-footer {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  padding: 14px 16px;
  border: 1px solid #dce3ed;
  border-radius: 12px;
  background: #fff;
}

button {
  padding: 11px 18px;
  border: 0;
  border-radius: 8px;
  color: #2a250f;
  background: #f6bd45;
  font: inherit;
  font-weight: 800;
  cursor: pointer;
}

button:hover:not(:disabled) {
  background: #ffc95c;
}

button:disabled {
  cursor: wait;
  opacity: 0.65;
}

.message {
  margin: 0 auto 0 0;
  font-size: 0.86rem;
}

.error-message {
  color: #a82f2f;
}

.success-message {
  color: #26733c;
}

@media (max-width: 1100px) {
  .ticket-form {
    grid-template-columns: 1fr;
  }

  .request-card {
    align-self: stretch;
  }
}

@media (max-width: 760px) {
  .ticket-page {
    margin-left: 0;
    padding: 18px 12px 90px;
  }

  .page-header,
  .entity-banner,
  .form-footer {
    align-items: stretch;
    flex-direction: column;
  }

  .api-badge {
    align-self: flex-start;
  }

  .entity-banner select {
    width: 100%;
  }

  .fields-grid,
  .actors-grid,
  .inline-fields {
    grid-template-columns: 1fr;
  }

  .form-footer button {
    width: 100%;
  }
}
</style>
