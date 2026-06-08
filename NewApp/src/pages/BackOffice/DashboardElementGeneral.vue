<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'

import { useCables } from '@/composables/generated/useCables'
import { useCartridges } from '@/composables/generated/useCartridges'
import { useComputers } from '@/composables/generated/useComputers'
import { useConsumables } from '@/composables/generated/useConsumables'
import { useEnclosures } from '@/composables/generated/useEnclosures'
import { useMonitors } from '@/composables/generated/useMonitors'
import { useNetworkequipments } from '@/composables/generated/useNetworkequipments'
import { usePassivedcequipments } from '@/composables/generated/usePassivedcequipments'
import { usePdus } from '@/composables/generated/usePdus'
import { usePeripherals } from '@/composables/generated/usePeripherals'
import { usePhones } from '@/composables/generated/usePhones'
import { usePrinters } from '@/composables/generated/usePrinters'
import { useRacks } from '@/composables/generated/useRacks'
import { useSimcards } from '@/composables/generated/useSimcards'
import { useSoftwares } from '@/composables/generated/useSoftwares'
import { useUnmanageds } from '@/composables/generated/useUnmanageds'

const loading = ref(false)
const error = ref('')

const { computers, loadComputers } = useComputers()
const { monitors, loadMonitors } = useMonitors()
const { softwares, loadSoftwares } = useSoftwares()
const { networkequipments, loadNetworkequipments } = useNetworkequipments()
const { peripherals, loadPeripherals } = usePeripherals()
const { printers, loadPrinters } = usePrinters()
const { cartridges, loadCartridges } = useCartridges()
const { consumables, loadConsumables } = useConsumables()
const { phones, loadPhones } = usePhones()
const { racks, loadRacks } = useRacks()
const { enclosures, loadEnclosures } = useEnclosures()
const { pdus, loadPdus } = usePdus()
const { passivedcequipments, loadPassivedcequipments } = usePassivedcequipments()
const { unmanageds, loadUnmanageds } = useUnmanageds()
const { cables, loadCables } = useCables()
const { simcards, loadSimcards } = useSimcards()

const assetCounts = computed(() => [
  { label: 'Ordinateurs', count: computers.value.length },
  { label: 'Moniteurs', count: monitors.value.length },
  { label: 'Logiciels', count: softwares.value.length },
  { label: 'Matériels réseau', count: networkequipments.value.length },
  { label: 'Périphériques', count: peripherals.value.length },
  { label: 'Imprimantes', count: printers.value.length },
  { label: 'Cartouches', count: cartridges.value.length },
  { label: 'Consommables', count: consumables.value.length },
  { label: 'Téléphones', count: phones.value.length },
  { label: 'Baies', count: racks.value.length },
  { label: 'Châssis', count: enclosures.value.length },
  { label: 'PDU', count: pdus.value.length },
  { label: 'Équipements passifs', count: passivedcequipments.value.length },
  { label: 'Actifs non gérés', count: unmanageds.value.length },
  { label: 'Câbles', count: cables.value.length },
  { label: 'Cartes SIM', count: simcards.value.length },
])

const globalCount = computed(() =>
  assetCounts.value.reduce((total, item) => total + item.count, 0),
)

async function loadDashboard() {
  loading.value = true
  error.value = ''

  try {
    await Promise.all([
      loadComputers(),
      loadMonitors(),
      loadSoftwares(),
      loadNetworkequipments(),
      loadPeripherals(),
      loadPrinters(),
      loadCartridges(),
      loadConsumables(),
      loadPhones(),
      loadRacks(),
      loadEnclosures(),
      loadPdus(),
      loadPassivedcequipments(),
      loadUnmanageds(),
      loadCables(),
      loadSimcards(),
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
    <h1>Dashboard</h1>

    <p>Nombre général d’éléments avec détails par type.</p>

    <p v-if="loading">Chargement...</p>

    <p v-if="error">
      Erreur : {{ error }}
    </p>

    <div v-if="!loading && !error">
      <p>
        <strong>Total général : {{ globalCount }}</strong>
      </p>

      <div>
        <p
          v-for="item in assetCounts"
          :key="item.label"
        >
          {{ item.label }} : {{ item.count }}
        </p>
      </div>
    </div>
  </main>
</template>

<style scoped>
</style>