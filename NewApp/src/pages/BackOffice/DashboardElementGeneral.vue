<script setup lang="ts">
import AppSidebar from '@/components/layout/AppSidebar.vue'
import { computed, onMounted, ref } from 'vue'

import { useCables } from '@/composables/generated/useCables'
import { useComputers } from '@/composables/generated/useComputers'
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
import { v1GetAll } from '@/api/glpiV1Client'

const loading = ref(false)
const error = ref('')

// /Assets/Cartridge et /Assets/Consumable renvoient 500 (bug serveur GLPI
// 11.0.7) : ces deux compteurs passent par l'API legacy v1.
const cartridgesCount = ref(0)
const consumablesCount = ref(0)

async function loadCartridgesV1() {
  cartridgesCount.value = (await v1GetAll('CartridgeItem')).length
}

async function loadConsumablesV1() {
  consumablesCount.value = (await v1GetAll('ConsumableItem')).length
}

const { computers, loadComputers } = useComputers()
const { monitors, loadMonitors } = useMonitors()
const { softwares, loadSoftwares } = useSoftwares()
const { networkequipments, loadNetworkequipments } = useNetworkequipments()
const { peripherals, loadPeripherals } = usePeripherals()
const { printers, loadPrinters } = usePrinters()
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
  { label: 'Cartouches', count: cartridgesCount.value },
  { label: 'Consommables', count: consumablesCount.value },
  { label: 'Téléphones', count: phones.value.length },
  { label: 'Baies', count: racks.value.length },
  { label: 'Châssis', count: enclosures.value.length },
  { label: 'PDU', count: pdus.value.length },
  { label: 'Équipements passifs', count: passivedcequipments.value.length },
  { label: 'Actifs non gérés', count: unmanageds.value.length },
  { label: 'Câbles', count: cables.value.length },
  { label: 'Cartes SIM', count: simcards.value.length },
])

const globalCount = computed(() => assetCounts.value.reduce((total, item) => total + item.count, 0))

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
      loadCartridgesV1(),
      loadConsumablesV1(),
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
    <h1>Dashboard: element general</h1>

    <p>Nombre général d’éléments avec détails par type.</p>

    <p v-if="loading">Chargement...</p>

    <p v-if="error">Erreur : {{ error }}</p>

    <div v-if="!loading && !error">
      <p>
        <strong>Total général : {{ globalCount }}</strong>
      </p>

      <div>
        <p v-for="item in assetCounts" :key="item.label">{{ item.label }} : {{ item.count }}</p>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
