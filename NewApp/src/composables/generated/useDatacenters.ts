// Auto-generated file. Do not edit manually.
// Composable generated from datacenterService.ts.

import { ref } from 'vue'
import { getDatacenters, getDatacenterById } from '@/services/generated/datacenterService'
import type { DataCenter } from '@/services/generated/datacenterService'

export function useDatacenters() {
  const datacenters = ref<DataCenter[]>([])
  const selectedDatacenter = ref<DataCenter | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadDatacenters() {
    loading.value = true
    error.value = null

    try {
      datacenters.value = await getDatacenters()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadDatacenterById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedDatacenter.value = await getDatacenterById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    datacenters,
    selectedDatacenter,
    loading,
    error,
    loadDatacenters,
    loadDatacenterById,
  }
}
