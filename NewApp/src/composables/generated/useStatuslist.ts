// Auto-generated file. Do not edit manually.
// Composable generated from statusService.ts.

import { ref } from 'vue'
import { getStatuslist } from '@/services/generated/statusService'

export function useStatuslist() {
  const statuslist = ref<unknown[]>([])
  const selectedStatus = ref<unknown | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadStatuslist() {
    loading.value = true
    error.value = null

    try {
      statuslist.value = await getStatuslist()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    statuslist,
    selectedStatus,
    loading,
    error,
    loadStatuslist,
  }
}
