// Auto-generated file. Do not edit manually.
// Composable generated from exportService.ts.

import { ref } from 'vue'
import { getExports } from '@/services/generated/exportService'

export function useExports() {
  const exports = ref<any[]>([])
  const selectedExport = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadExports() {
    loading.value = true
    error.value = null

    try {
      exports.value = await getExports()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    exports,
    selectedExport,
    loading,
    error,
    loadExports,
  }
}
