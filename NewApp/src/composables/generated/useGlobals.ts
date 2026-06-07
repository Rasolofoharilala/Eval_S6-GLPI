// Auto-generated file. Do not edit manually.
// Composable generated from globalService.ts.

import { ref } from 'vue'
import { getGlobals } from '@/services/generated/globalService'
import type { GlobalStats } from '@/services/generated/globalService'

export function useGlobals() {
  const globals = ref<GlobalStats[]>([])
  const selectedGlobal = ref<GlobalStats | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadGlobals() {
    loading.value = true
    error.value = null

    try {
      globals.value = await getGlobals()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    globals,
    selectedGlobal,
    loading,
    error,
    loadGlobals,
  }
}
