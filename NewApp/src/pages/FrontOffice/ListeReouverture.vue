<script setup lang="ts">
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

// Base TOTALE (somme sur les items) selon le mode — même logique que coutSelonMode
// côté DB, mais en total ticket et recalculée en direct depuis la liste affichée.
function baseSelonMode(ticketId: number, mode: number): number {
  const valeurs = supercostsDuTicket(ticketId).map((s) => s.valeur)
  if (valeurs.length === 0) return 0
  if (mode === 2) return valeurs[0]! // premier
  if (mode === 3) return valeurs.reduce((a, b) => a + b, 0) / valeurs.length // moyenne
  if (mode === 4) return valeurs.reduce((a, b) => a + b, 0) // total
  return valeurs[valeurs.length - 1]! // mode 1 : dernier
}

// Coût de réouverture recalculé EN DIRECT = base (selon le mode courant) × %.
// Toujours cohérent avec la colonne base, sans avoir à cliquer Modifier.
function coutReouverture(ligne: Reouverture): number {
  return Math.round(baseSelonMode(ligne.ticketId, ligne.mode) * (ligne.pourcentage / 100) * 100) / 100
}

// Total général de tous les coûts de réouverture (pour comparer à la cible).
const totalReouverture = computed(() =>
  listany.value.reduce((t, l) => t + coutReouverture(l), 0),
)

// alao ny listany (recuperer les listes)
async function alaoListany() {
  listany.value = await getReouvertures()
  listanyOuverture.value = await getSupercosts()
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
          <td>{{ ligne.ticketId }}</td>
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
          <td>{{ ligne.ticketId }}</td>
          <td>{{ ligne.lot }}</td>
          <td>
            <select v-model.number="ligne.mode">
              <option v-for="m in MODES" :key="m.value" :value="m.value">
                {{ m.value }} — {{ m.label }}
              </option>
            </select>
          </td>
          <td>{{ baseSelonMode(ligne.ticketId, ligne.mode) }}</td>
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
