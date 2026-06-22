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
// listanyOuverture = la liste des ouverture (supercost)
const listanyOuverture = ref<Supercost[]>([])
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

// Coût de réouverture recalculé EN DIRECT = base (clôtures antérieures × mode) × %.
// Toujours cohérent avec la colonne base, sans avoir à cliquer Modifier.
function coutReouverture(ligne: Reouverture): number {
  const base = baseSelonMode(ligne.ticketId, ligne.mode, ligne.lot)
  return Math.round(base * (ligne.pourcentage / 100) * 100) / 100
}

// Total général de tous les coûts de réouverture (pour comparer à la cible).
const totalReouverture = computed(() =>
  listany.value.reduce((t, l) => t + coutReouverture(l), 0),
)

// alao ny listany (recuperer les listes)
async function alaoListany() {
  listany.value = await getReouvertures()
  listanyOuverture.value = await getSupercosts()
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
  alaoListany()
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

    <h3>Reouverture</h3>
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
          <td>{{ coutReouverture(ligne) }}</td>
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
  </div>
</template>
