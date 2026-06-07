// Auto-generated file. Do not edit manually.
// Composable generated from useditemService.ts.

import { ref } from 'vue'
import { getUseditems } from '@/services/generated/useditemService'

export function useUseditems() {
  const useditems = ref<unknown[]>([])
  const selectedUseditem = ref<unknown | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadUseditems() {
    loading.value = true
    error.value = null

    try {
      useditems.value = await getUseditems()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    useditems,
    selectedUseditem,
    loading,
    error,
    loadUseditems,
  }
}
