// Auto-generated file. Do not edit manually.
// Composable generated from clusterService.ts.

import { ref } from 'vue'
import { getClusters, getClusterById } from '@/services/generated/clusterService'

export function useClusters() {
  const clusters = ref<any[]>([])
  const selectedCluster = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadClusters() {
    loading.value = true
    error.value = null

    try {
      clusters.value = await getClusters()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadClusterById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedCluster.value = await getClusterById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    clusters,
    selectedCluster,
    loading,
    error,
    loadClusters,
    loadClusterById,
  }
}
