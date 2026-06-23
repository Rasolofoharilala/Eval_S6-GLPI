<script setup lang="ts">
import AppSidebarFO from '@/layouts/AppSidebarFO.vue'
import { computed, onMounted, ref } from 'vue'
import {
  getReouvertures,
  modifierReouverture,
  supprimerReouverture,
  getSupercosts,
  modifierSupercost,
  supprimerSupercost,
  annulerDerniereReouverture,
  getAnnulations,
  retablirReouverture,
  getPlafond,
  setPlafond,
  type Reouverture,
  type Supercost,
} from '@/services/nouveauCoutService'
import { getRefsTickets } from '@/services/sqlite/localDb'

// Libellés des modes de calcul de la base (cf. coutSelonMode dans localDb).
const MODES = [
  { value: 1, label: 'Dernier' },
  { value: 2, label: 'Premier' },
  { value: 3, label: 'Moyenne' },
  { value: 4, label: 'Total' },
]

// listany = la liste des reouverture
const listany = ref<Reouverture[]>([])
// listanyAnnulation = la liste des annulations (réouvertures annulées)
const listanyAnnulation = ref<Reouverture[]>([])
// listanyOuverture = la liste des ouverture (supercost)
const listanyOuverture = ref<Supercost[]>([])
// plafond = pourcentage maximum de réouverture autorisé (Alea 2)
const plafond = ref<number>(0)

// Correspondance inverse id GLPI → Ref_Ticket logique (1, 2, 3…), pour afficher
// la référence du ticket au lieu de son id GLPI auto-incrémenté.
const refParId = ref<Record<number, string>>({})

// Référence à afficher pour un ticket : son Ref_Ticket logique si connu, sinon
// l'id GLPI brut (faute de mieux).
function refTicket(ticketId: number): string {
  return refParId.value[ticketId] ?? String(ticketId)
}

function cle(ticketId: number, lot: number): string {
  return ticketId + '-' + lot
}

// Tous les supercosts (lots de clôture) d'un ticket, triés par lot croissant.
// `valeur` = total du lot (SUM(cout) sur les items). Sert à calculer la base.
function supercostsDuTicket(ticketId: number): Supercost[] {
  return listanyOuverture.value
    .filter((s) => s.ticketId === ticketId)
    .sort((a, b) => a.lot - b.lot)
}

// Base (total ticket) selon le mode — même logique que coutSelonMode côté DB.
// `lotMax` : ne garder que les clôtures ANTÉRIEURES (lot <) à la réouverture,
// car une réouverture se base sur les clôtures déjà faites à son instant.
function baseSelonMode(ticketId: number, mode: number, lotMax?: number): number {
  const valeurs = supercostsDuTicket(ticketId)
    .filter((s) => lotMax == null || s.lot < lotMax)
    .map((s) => s.valeur)
  if (valeurs.length === 0) return 0
  if (mode === 2) return valeurs[0]! // premier
  if (mode === 3) return valeurs.reduce((a, b) => a + b, 0) / valeurs.length // moyenne
  if (mode === 4) return valeurs.reduce((a, b) => a + b, 0) // total
  return valeurs[valeurs.length - 1]! // mode 1 : dernier
}

// Total général de tous les coûts de réouverture (valeur stockée = déjà plafonnée).
const totalReouverture = computed(() =>
  listany.value.reduce((t, l) => t + l.valeur, 0),
)

// Plafond (Alea 2) : le pourcentage est COMMUN à tous les tickets, mais les
// dépenses sont DISTINCTES — chaque ticket a sa propre enveloppe :
//   max ticket = (somme de ses Super Cost) × pourcentage.
const sommeSupercost = computed(() =>
  listanyOuverture.value.reduce((t, l) => t + l.valeur, 0),
)

const arr2 = (n: number) => Math.round(n * 100) / 100

// Enveloppe de plafond par ticket : Super Cost du ticket, max autorisé, déjà
// consommé par ses réouvertures, et reste disponible.
const plafondParTicket = computed(() => {
  const ticketIds = new Set<number>([
    ...listanyOuverture.value.map((s) => s.ticketId),
    ...listany.value.map((r) => r.ticketId),
  ])
  return [...ticketIds].sort((a, b) => a - b).map((ticketId) => {
    const sc = listanyOuverture.value
      .filter((s) => s.ticketId === ticketId)
      .reduce((t, s) => t + s.valeur, 0)
    const utilise = listany.value
      .filter((r) => r.ticketId === ticketId)
      .reduce((t, r) => t + r.valeur, 0)
    const max = arr2(sc * (plafond.value / 100))
    return { ticketId, sc, max, utilise: arr2(utilise), dispo: arr2(Math.max(0, max - utilise)) }
  })
})

// alao ny listany (recuperer les listes)
async function alaoListany() {
  listany.value = await getReouvertures()
  listanyAnnulation.value = await getAnnulations()
  listanyOuverture.value = await getSupercosts()
  plafond.value = await getPlafond()
  // getRefsTickets() renvoie ref → id GLPI ; on inverse pour obtenir id → ref.
  const refs = await getRefsTickets()
  const inverse: Record<number, string> = {}
  for (const [ref, glpiId] of Object.entries(refs)) {
    inverse[glpiId] = ref
  }
  refParId.value = inverse
}

// --- reouverture ---
async function modifier(ligne: Reouverture) {
  await modifierReouverture(ligne.ticketId, ligne.lot, ligne.pourcentage, ligne.mode)
  await alaoListany()
}

async function supprimer(ligne: Reouverture) {
  await supprimerReouverture(ligne.ticketId, ligne.lot)
  await alaoListany()
}

// --- annulations (Alea 1) ---
async function annulerDernier() {
  await annulerDerniereReouverture()
  await alaoListany()
}

async function retablir(ligne: Reouverture) {
  await retablirReouverture(ligne.ticketId, ligne.lot)
  await alaoListany()
}

// --- plafond (Alea 2) ---
async function enregistrerPlafond() {
  await setPlafond(plafond.value)
  await alaoListany()
}

// --- ouverture (supercost) ---
async function modifierOuverture(ligne: Supercost) {
  await modifierSupercost(ligne.ticketId, ligne.lot, ligne.valeur)
  await alaoListany()
}

async function supprimerOuverture(ligne: Supercost) {
  await supprimerSupercost(ligne.ticketId, ligne.lot)
  await alaoListany()
}

onMounted(() => {
  alaoListany();
})
</script>

<template>
  <AppSidebarFO />
  <div class="liste-couts">
    <h3>Ouverture (Supercost)</h3>
    <table border="1">
      <thead>
        <tr>
          <th>Ticket</th>
          <th>Lot</th>
          <th>Supercost</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ligne in listanyOuverture" :key="cle(ligne.ticketId, ligne.lot)">
          <td>{{ refTicket(ligne.ticketId) }}</td>
          <td>{{ ligne.lot }}</td>
          <td><input type="number" v-model.number="ligne.valeur" /></td>
          <td><button @click="modifierOuverture(ligne)">Modifier</button></td>
          <td><button @click="supprimerOuverture(ligne)">Supprimer</button></td>
        </tr>
        <tr v-if="listanyOuverture.length === 0">
          <td colspan="5">Aucune ouverture.</td>
        </tr>
      </tbody>
    </table>

    <h3>Plafond de réouverture</h3>
    <p>
      Plafond (%) :
      <input type="number" v-model.number="plafond" />
      <button @click="enregistrerPlafond">Enregistrer</button>
    </p>
    <p>
      Pourcentage commun à tous les tickets ; les dépenses sont distinctes
      (chaque ticket a sa propre enveloppe). Total Super Cost : {{ sommeSupercost }}.
    </p>
    <table border="1">
      <thead>
        <tr>
          <th>Ticket</th>
          <th>Super Cost</th>
          <th>Plafond max</th>
          <th>Utilisé</th>
          <th>Disponible</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in plafondParTicket" :key="p.ticketId">
          <td>{{ refTicket(p.ticketId) }}</td>
          <td>{{ p.sc }}</td>
          <td>{{ p.max }}</td>
          <td>{{ p.utilise }}</td>
          <td>{{ p.dispo }}</td>
        </tr>
        <tr v-if="plafondParTicket.length === 0">
          <td colspan="5">Aucun ticket.</td>
        </tr>
      </tbody>
    </table>

    <h3>Reouverture</h3>
    <p><button @click="annulerDernier">Annuler le dernier coût</button></p>
    <table border="1">
      <thead>
        <tr>
          <th>Ticket</th>
          <th>Lot</th>
          <th>Mode</th>
          <th>Supercost (base)</th>
          <th>Pourcentage</th>
          <th>Coût réouverture</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ligne in listany" :key="cle(ligne.ticketId, ligne.lot)">
          <td>{{ refTicket(ligne.ticketId) }}</td>
          <td>{{ ligne.lot }}</td>
          <td>
            <select v-model.number="ligne.mode">
              <option v-for="m in MODES" :key="m.value" :value="m.value">
                {{ m.value }} — {{ m.label }}
              </option>
            </select>
          </td>
          <td>{{ baseSelonMode(ligne.ticketId, ligne.mode, ligne.lot) }}</td>
          <td><input type="number" v-model.number="ligne.pourcentage" /> %</td>
          <td>{{ ligne.valeur }}</td>
          <td><button @click="modifier(ligne)">Modifier</button></td>
          <td><button @click="supprimer(ligne)">Supprimer</button></td>
        </tr>
        <tr v-if="listany.length === 0">
          <td colspan="8">Aucune réouverture.</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th colspan="5">Total réouverture</th>
          <th>{{ totalReouverture }}</th>
          <th></th>
          <th></th>
        </tr>
      </tfoot>
    </table>

    <h3>Liste des annulations</h3>
    <table border="1">
      <thead>
        <tr>
          <th>Ticket</th>
          <th>Lot</th>
          <th>Type</th>
          <th>Mode</th>
          <th>Pourcentage</th>
          <th>Coût annulé</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ligne in listanyAnnulation" :key="cle(ligne.ticketId, ligne.lot)">
          <td>{{ refTicket(ligne.ticketId) }}</td>
          <td>{{ ligne.lot }}</td>
          <td>{{ ligne.type === 'reouverture' ? 'Réouverture' : 'Supercost' }}</td>
          <td>{{ ligne.type === 'reouverture' ? ligne.mode : '—' }}</td>
          <td>{{ ligne.type === 'reouverture' ? ligne.pourcentage + ' %' : '—' }}</td>
          <td>{{ ligne.valeur }}</td>
          <td><button @click="retablir(ligne)">Rétablir</button></td>
        </tr>
        <tr v-if="listanyAnnulation.length === 0">
          <td colspan="7">Aucune annulation.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
