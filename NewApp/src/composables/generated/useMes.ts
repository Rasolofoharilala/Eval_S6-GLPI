// Auto-generated file. Do not edit manually.
// Composable generated from meService.ts.

import { ref } from 'vue'
import { getMes } from '@/services/generated/meService'

export function useMes() {
  const mes = ref<any[]>([])
  const selectedMe = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadMes() {
    loading.value = true
    error.value = null

    try {
      mes.value = await getMes()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    mes,
    selectedMe,
    loading,
    error,
    loadMes,
  }
}
