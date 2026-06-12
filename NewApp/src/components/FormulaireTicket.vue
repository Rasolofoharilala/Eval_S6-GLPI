<script setup lang="ts">
// ═══════════════════════════════════════════════════════════════════════════
// FORMULAIRE DE TICKET PARTAGÉ
//
// Le MÊME formulaire sert sur la page « Créer un ticket » ET dans le dialogue
// du Kanban. Il rassemble : titre, description, type, statut, priorité,
// urgence, impact, date, acteurs, et l'association de plusieurs éléments.
//
// Il ne fait PAS l'appel réseau lui-même : au clic sur « Enregistrer », il
// émet l'événement `submit` avec un objet DonneesTicket. La page parente
// décide quoi en faire (créer le ticket via ticketActions).
//
// Props :
//   - statutInitial : statut pré-sélectionné (le Kanban met le statut de la colonne)
//   - compact : true = version réduite pour le dialogue (cache SLA/OLA)
//   - enChargement : désactive le bouton pendant l'envoi
// ═══════════════════════════════════════════════════════════════════════════

import { computed, onMounted, reactive, ref } from 'vue'
import { useEntities } from '@/composables/generated/useEntities'
import { useItilcategories } from '@/composables/generated/useItilcategories'
import { useLocations } from '@/composables/generated/useLocations'
import { useRequesttypes } from '@/composables/generated/useRequesttypes'
import { useUsers } from '@/composables/generated/useUsers'
import { useOptionsElements, type OptionElement } from '@/composables/useOptionsElements'
import {
  OPTIONS_STATUT,
  OPTIONS_PRIORITE,
  OPTIONS_URGENCE,
  OPTIONS_IMPACT,
  OPTIONS_TYPE,
} from '@/config/tickets'
import type { DonneesTicket, ElementLie } from '@/services/ticketActions'

const props = withDefaults(
  defineProps<{
    statutInitial?: number
    compact?: boolean
    enChargement?: boolean
  }>(),
  { statutInitial: 1, compact: false, enChargement: false },
)

const emit = defineEmits<{ submit: [donnees: DonneesTicket] }>()

// ─── Listes déroulantes (chargées depuis GLPI) ───
const { entities, loadEntities } = useEntities()
const { itilcategories, loadItilcategories } = useItilcategories()
const { locations, loadLocations } = useLocations()
const { requesttypes, loadRequesttypes } = useRequesttypes()
const { users, loadUsers } = useUsers()
const { options: elements, optionsType, loading: chargementElements, chargerOptions } =
  useOptionsElements()

// ─── État du formulaire ───
const form = reactive({
  name: '',
  content: '',
  date: '',
  type: 1,
  statutId: props.statutInitial,
  categoryId: 0,
  locationId: 0,
  requestTypeId: 0,
  urgency: 3,
  impact: 3,
  priority: 3,
  externalId: '',
  entityId: 0,
  requesterId: 0,
  observerId: 0,
  assignedId: 0,
})

const erreur = ref('')

// ─── Éléments associés (multi-sélection) ───
const elementsChoisis = ref<OptionElement[]>([])
const rechercheElement = ref('')
const typeElement = ref('')

const elementsFiltres = computed(() => {
  const q = rechercheElement.value.trim().toLowerCase()
  return elements.value.filter((e) => {
    if (typeElement.value && e.itemtype !== typeElement.value) return false
    if (q && !e.name.toLowerCase().includes(q)) return false
    return true
  })
})

function estChoisi(e: OptionElement): boolean {
  return elementsChoisis.value.some((c) => c.id === e.id && c.itemtype === e.itemtype)
}

function basculerElement(e: OptionElement) {
  if (estChoisi(e)) {
    elementsChoisis.value = elementsChoisis.value.filter(
      (c) => !(c.id === e.id && c.itemtype === e.itemtype),
    )
  } else {
    elementsChoisis.value.push(e)
  }
}

function userLabel(u: { username?: string; firstname?: string; realname?: string }): string {
  return [u.firstname, u.realname].filter(Boolean).join(' ') || u.username || 'Sans nom'
}

// La date 'AAAA-MM-JJTHH:MM' du champ datetime-local → format GLPI.
function dateGlpi(): string | undefined {
  return form.date ? form.date.replace('T', ' ') + ':00' : undefined
}

function envoyer() {
  if (!form.name.trim()) {
    erreur.value = 'Le titre est obligatoire.'
    return
  }
  erreur.value = ''

  const elementsLies: ElementLie[] = elementsChoisis.value.map((e) => ({
    id: e.id,
    itemtype: e.itemtype,
  }))

  emit('submit', {
    name: form.name,
    content: form.content,
    type: form.type,
    statutId: form.statutId,
    date: dateGlpi(),
    categoryId: form.categoryId,
    locationId: form.locationId,
    requestTypeId: form.requestTypeId,
    urgency: form.urgency,
    impact: form.impact,
    priority: form.priority,
    externalId: form.externalId,
    entityId: form.entityId,
    requesterId: form.requesterId,
    observerId: form.observerId,
    assignedId: form.assignedId,
    elements: elementsLies,
  })
}

// Remet le formulaire à zéro (appelé par le parent après un succès via ref).
function reinitialiser() {
  form.name = ''
  form.content = ''
  form.externalId = ''
  elementsChoisis.value = []
}
defineExpose({ reinitialiser })

onMounted(() => {
  void Promise.all([
    loadEntities(),
    loadItilcategories(),
    loadLocations(),
    loadRequesttypes(),
    loadUsers(),
    chargerOptions(),
  ])
})
</script>

<template>
  <form class="form-ticket" @submit.prevent="envoyer">
    <p v-if="erreur" class="erreur">{{ erreur }}</p>

    <!-- Champs principaux -->
    <label class="plein">
      Titre *
      <input v-model="form.name" type="text" required />
    </label>

    <label class="plein">
      Description
      <textarea v-model="form.content" rows="5" />
    </label>

    <div class="grille">
      <label>
        Type
        <select v-model.number="form.type">
          <option v-for="o in OPTIONS_TYPE" :key="o.valeur" :value="o.valeur">{{ o.label }}</option>
        </select>
      </label>

      <label>
        Statut
        <select v-model.number="form.statutId">
          <option v-for="o in OPTIONS_STATUT" :key="o.valeur" :value="o.valeur">
            {{ o.label }}
          </option>
        </select>
      </label>

      <label>
        Priorité
        <select v-model.number="form.priority">
          <option v-for="o in OPTIONS_PRIORITE" :key="o.valeur" :value="o.valeur">
            {{ o.label }}
          </option>
        </select>
      </label>

      <label>
        Urgence
        <select v-model.number="form.urgency">
          <option v-for="o in OPTIONS_URGENCE" :key="o.valeur" :value="o.valeur">
            {{ o.label }}
          </option>
        </select>
      </label>

      <label>
        Impact
        <select v-model.number="form.impact">
          <option v-for="o in OPTIONS_IMPACT" :key="o.valeur" :value="o.valeur">
            {{ o.label }}
          </option>
        </select>
      </label>

      <label>
        Date d'ouverture
        <input v-model="form.date" type="datetime-local" />
      </label>

      <label v-if="!compact">
        Catégorie
        <select v-model.number="form.categoryId">
          <option :value="0">Aucune</option>
          <option v-for="c in itilcategories" :key="c.id" :value="c.id">
            {{ c.completename || c.name }}
          </option>
        </select>
      </label>

      <label v-if="!compact">
        Lieu
        <select v-model.number="form.locationId">
          <option :value="0">Aucun</option>
          <option v-for="l in locations" :key="l.id" :value="l.id">
            {{ l.completename || l.name }}
          </option>
        </select>
      </label>

      <label v-if="!compact">
        Source de la demande
        <select v-model.number="form.requestTypeId">
          <option :value="0">Par défaut</option>
          <option v-for="r in requesttypes" :key="r.id" :value="r.id">{{ r.name }}</option>
        </select>
      </label>

      <label v-if="!compact">
        Entité
        <select v-model.number="form.entityId">
          <option :value="0">Par défaut</option>
          <option v-for="e in entities" :key="e.id" :value="e.id">{{ e.name }}</option>
        </select>
      </label>

      <label v-if="!compact">
        ID externe
        <input v-model="form.externalId" type="text" />
      </label>
    </div>

    <!-- Acteurs -->
    <fieldset v-if="!compact">
      <legend>Acteurs</legend>
      <div class="grille">
        <label>
          Demandeur
          <select v-model.number="form.requesterId">
            <option :value="0">Utilisateur connecté</option>
            <option v-for="u in users" :key="u.id" :value="u.id">{{ userLabel(u) }}</option>
          </select>
        </label>
        <label>
          Observateur
          <select v-model.number="form.observerId">
            <option :value="0">Aucun</option>
            <option v-for="u in users" :key="u.id" :value="u.id">{{ userLabel(u) }}</option>
          </select>
        </label>
        <label>
          Attribué à
          <select v-model.number="form.assignedId">
            <option :value="0">Non attribué</option>
            <option v-for="u in users" :key="u.id" :value="u.id">{{ userLabel(u) }}</option>
          </select>
        </label>
      </div>
    </fieldset>

    <!-- Éléments associés (multi) -->
    <fieldset>
      <legend>Éléments associés ({{ elementsChoisis.length }} choisi(s))</legend>

      <ul v-if="elementsChoisis.length" class="choisis">
        <li v-for="e in elementsChoisis" :key="`c-${e.itemtype}-${e.id}`">
          {{ e.typeLabel }} : {{ e.name }}
          <button type="button" @click="basculerElement(e)">✕</button>
        </li>
      </ul>

      <div class="grille-2">
        <label>
          Type
          <select v-model="typeElement">
            <option v-for="o in optionsType" :key="o.valeur" :value="o.valeur">{{ o.label }}</option>
          </select>
        </label>
        <label>
          Recherche
          <input v-model="rechercheElement" type="text" placeholder="Nom…" />
        </label>
      </div>

      <p v-if="chargementElements">Chargement des éléments…</p>
      <div v-else class="liste-elements">
        <label v-for="e in elementsFiltres" :key="`${e.itemtype}-${e.id}`" class="ligne-element">
          <input type="checkbox" :checked="estChoisi(e)" @change="basculerElement(e)" />
          <span>{{ e.typeLabel }} — {{ e.name }}</span>
        </label>
        <p v-if="elementsFiltres.length === 0">Aucun élément.</p>
      </div>
    </fieldset>

    <button type="submit" :disabled="enChargement">
      {{ enChargement ? 'Enregistrement…' : 'Enregistrer le ticket' }}
    </button>
  </form>
</template>

<style scoped>
.form-ticket {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.form-ticket label {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 0.85rem;
}
.grille {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}
.grille-2 {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 12px;
}
fieldset {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
}
.choisis {
  list-style: none;
  margin: 0 0 8px;
  padding: 0;
}
.choisis li {
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
}
.liste-elements {
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #eee;
  border-radius: 6px;
  padding: 6px;
}
.ligne-element {
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 2px 0;
  cursor: pointer;
}
.erreur {
  color: #b91c1c;
}
</style>
