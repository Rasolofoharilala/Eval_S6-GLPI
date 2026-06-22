<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import {
  getReouvertures,
  modifierReouverture,
  supprimerReouverture,
  getSupercosts,
  modifierSupercost,
  supprimerSupercost,
  getCoutSelonMode,
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

// Une ligne unifiée : soit une Ouverture (supercost), soit une Réouverture.
// On garde tout sur une seule ligne pour manipuler facilement pendant l'alea.
type Ligne =
  | { type: 'ouverture'; ticketId: number; lot: number; valeur: number }
  | {
      type: 'reouverture'
      ticketId: number
      lot: number
      pourcentage: number
      mode: number
      base: number
      valeur: number
    }

const lignes = ref<Ligne[]>([])

// Une seule liste, triée par ticket puis lot (ouverture avant réouverture).
const liste = computed(() =>
  [...lignes.value].sort(
    (a, b) => a.ticketId - b.ticketId || a.lot - b.lot || a.type.localeCompare(b.type),
  ),
)

function cle(l: Ligne): string {
  return `${l.type}-${l.ticketId}-${l.lot}`
}

// alao ny listany (recuperer + fusionner les deux listes)
async function alaoListany() {
  const [reouvertures, supercosts]: [Reouverture[], Supercost[]] = await Promise.all([
    getReouvertures(),
    getSupercosts(),
  ])

  const ouvertures: Ligne[] = supercosts.map((s) => ({
    type: 'ouverture',
    ticketId: s.ticketId,
    lot: s.lot,
    valeur: s.valeur,
  }))

  // Pour chaque réouverture, on récupère aussi sa base (supercost selon le mode).
  const reouv: Ligne[] = await Promise.all(
    reouvertures.map(async (r) => ({
      type: 'reouverture' as const,
      ticketId: r.ticketId,
      lot: r.lot,
      pourcentage: r.pourcentage,
      mode: r.mode,
      base: await getCoutSelonMode(r.ticketId, r.mode),
      valeur: r.valeur,
    })),
  )

  lignes.value = [...ouvertures, ...reouv]
}

// Modifier : route vers la bonne fonction selon le type de la ligne.
async function modifier(l: Ligne) {
  if (l.type === 'ouverture') {
    await modifierSupercost(l.ticketId, l.lot, l.valeur)
  } else {
    await modifierReouverture(l.ticketId, l.lot, l.pourcentage, l.mode)
  }
  await alaoListany()
}

// Supprimer : idem.
async function supprimer(l: Ligne) {
  if (l.type === 'ouverture') {
    await supprimerSupercost(l.ticketId, l.lot)
  } else {
    await supprimerReouverture(l.ticketId, l.lot)
  }
  await alaoListany()
}

onMounted(() => {
  alaoListany()
})
</script>

<template>
  <div class="liste-couts">
    <h3>Coûts : ouvertures (supercost) &amp; réouvertures</h3>
    <table border="1">
      <thead>
        <tr>
          <th>Ticket</th>
          <th>Lot</th>
          <th>Type</th>
          <th>Mode</th>
          <th>Base (supercost)</th>
          <th>Pourcentage</th>
          <th>Valeur</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="l in liste" :key="cle(l)">
          <td>{{ l.ticketId }}</td>
          <td>{{ l.lot }}</td>

          <!-- Type -->
          <td>{{ l.type === 'ouverture' ? 'Ouverture' : 'Réouverture' }}</td>

          <!-- Mode (réouverture seulement) -->
          <td>
            <select v-if="l.type === 'reouverture'" v-model.number="l.mode">
              <option v-for="m in MODES" :key="m.value" :value="m.value">
                {{ m.value }} — {{ m.label }}
              </option>
            </select>
            <span v-else>—</span>
          </td>

          <!-- Base : pour une ouverture, la base EST sa valeur ; pour une
               réouverture, c'est le supercost selon le mode. -->
          <td>{{ l.type === 'reouverture' ? l.base : l.valeur }}</td>

          <!-- Pourcentage (réouverture seulement) -->
          <td>
            <template v-if="l.type === 'reouverture'">
              <input type="number" v-model.number="l.pourcentage" /> %
            </template>
            <span v-else>—</span>
          </td>

          <!-- Valeur : ouverture éditable (supercost) ; réouverture calculée. -->
          <td>
            <input v-if="l.type === 'ouverture'" type="number" v-model.number="l.valeur" />
            <span v-else>{{ l.valeur }}</span>
          </td>

          <td><button @click="modifier(l)">Modifier</button></td>
          <td><button @click="supprimer(l)">Supprimer</button></td>
        </tr>
        <tr v-if="liste.length === 0">
          <td colspan="9">Aucun coût.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
