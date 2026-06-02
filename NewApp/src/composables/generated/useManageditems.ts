// Auto-generated file. Do not edit manually.
// Composable generated from manageditemService.ts.

import { ref } from 'vue'
import { getManageditems } from '@/services/generated/manageditemService'

export function useManageditems() {
  const manageditems = ref<any[]>([])
  const selectedManageditem = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadManageditems() {
    loading.value = true
    error.value = null

    try {
      manageditems.value = await getManageditems()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    manageditems,
    selectedManageditem,
    loading,
    error,
    loadManageditems,
  }
}
