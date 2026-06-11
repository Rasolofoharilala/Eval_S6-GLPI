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

const assetCounts = computed(() => [
  { label: 'Ordinateurs', count: computers.value.length },
  { label: 'Moniteurs', count: monitors.value.length },
  { label: 'Imprimantes', count: printers.value.length },
  { label: 'Périphériques', count: peripherals.value.length },
  { label: 'Téléphones', count: phones.value.length },
])

const globalCount = computed(() => assetCounts.value.reduce((total, item) => total + item.count, 0))

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
