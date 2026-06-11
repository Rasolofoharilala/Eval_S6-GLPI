<script setup lang="ts">
import AppSidebar from '@/components/layout/AppSidebar.vue'
import { computed, onMounted, ref } from 'vue'

// Endpoints du parc convenus : Computer, Monitor, Printer, Peripheral, Phone
import { useComputers } from '@/composables/generated/useComputers'
import { useMonitors } from '@/composables/generated/useMonitors'
import { usePeripherals } from '@/composables/generated/usePeripherals'
import { usePhones } from '@/composables/generated/usePhones'
import { usePrinters } from '@/composables/generated/usePrinters'

const loading = ref(false)
const error = ref('')

const { computers, loadComputers } = useComputers()
const { monitors, loadMonitors } = useMonitors()
const { printers, loadPrinters } = usePrinters()
const { peripherals, loadPeripherals } = usePeripherals()
const { phones, loadPhones } = usePhones()

// Champs communs aux assets utilisés ici : statut et nom.
type AssetLike = { status?: { name?: string | null } | null; name?: string | null }

const assetGroups = computed<{ label: string; items: AssetLike[] }[]>(() => [
  { label: 'Ordinateurs', items: computers.value as AssetLike[] },
  { label: 'Moniteurs', items: monitors.value as AssetLike[] },
  { label: 'Imprimantes', items: printers.value as AssetLike[] },
  { label: 'Périphériques', items: peripherals.value as AssetLike[] },
  { label: 'Téléphones', items: phones.value as AssetLike[] },
])

const assetCounts = computed(() =>
  assetGroups.value.map((g) => ({ label: g.label, count: g.items.length })),
)

const globalCount = computed(() => assetCounts.value.reduce((total, item) => total + item.count, 0))

// Tous les assets confondus, pour les répartitions transverses.
const allAssets = computed<AssetLike[]>(() => assetGroups.value.flatMap((g) => g.items))

function statusName(a: AssetLike): string {
  return a.status?.name ?? 'Inconnu'
}

// Répartition par statut (tous types confondus), triée par effectif décroissant.
const countByStatus = computed<[string, number][]>(() => {
  const map: Record<string, number> = {}
  for (const a of allAssets.value) {
    const s = statusName(a)
    map[s] = (map[s] ?? 0) + 1
  }
  return Object.entries(map).sort((a, b) => b[1] - a[1])
})

// Répartition par statut, détaillée par type.
const countByTypeAndStatus = computed(() =>
  assetGroups.value.map((g) => {
    const map: Record<string, number> = {}
    for (const a of g.items) {
      const s = statusName(a)
      map[s] = (map[s] ?? 0) + 1
    }
    return { label: g.label, statuses: Object.entries(map).sort((a, b) => b[1] - a[1]) }
  }),
)

async function loadDashboard() {
  loading.value = true
  error.value = ''

  try {
    await Promise.all([
      loadComputers(),
      loadMonitors(),
      loadPrinters(),
      loadPeripherals(),
      loadPhones(),
    ])
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Erreur inconnue'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadDashboard()
})
</script>

<template>
  <AppSidebar />

  <main>
    <h1>Dashboard: element general</h1>

    <p>Nombre général d’éléments avec détails par type et par statut.</p>

    <p v-if="loading">Chargement...</p>

    <p v-if="error">Erreur : {{ error }}</p>

    <div v-if="!loading && !error">
      <section>
        <h2>Vue globale</h2>
        <p>
          <strong>Total général : {{ globalCount }}</strong>
        </p>
        <table border="1" cellpadding="6">
          <thead>
            <tr>
              <th>Type</th>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in assetCounts" :key="item.label">
              <td>{{ item.label }}</td>
              <td>{{ item.count }}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>Répartition par statut (tous types)</h2>
        <table border="1" cellpadding="6">
          <thead>
            <tr>
              <th>Statut</th>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="[label, count] in countByStatus" :key="label">
              <td>{{ label }}</td>
              <td>{{ count }}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section v-for="group in countByTypeAndStatus" :key="group.label">
        <template v-if="group.statuses.length > 0">
          <h2>{{ group.label }} — par statut</h2>
          <table border="1" cellpadding="6">
            <thead>
              <tr>
                <th>Statut</th>
                <th>Nombre</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="[label, count] in group.statuses" :key="label">
                <td>{{ label }}</td>
                <td>{{ count }}</td>
              </tr>
            </tbody>
          </table>
        </template>
      </section>
    </div>
  </main>
</template>

<style scoped></style>
