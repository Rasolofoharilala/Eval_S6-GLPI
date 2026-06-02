// Auto-generated file. Do not edit manually.
// Composable generated from snmpcredentialService.ts.

import { ref } from 'vue'
import { getSnmpcredentials, getSnmpcredentialById } from '@/services/generated/snmpcredentialService'

export function useSnmpcredentials() {
  const snmpcredentials = ref<any[]>([])
  const selectedSnmpcredential = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadSnmpcredentials() {
    loading.value = true
    error.value = null

    try {
      snmpcredentials.value = await getSnmpcredentials()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadSnmpcredentialById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedSnmpcredential.value = await getSnmpcredentialById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    snmpcredentials,
    selectedSnmpcredential,
    loading,
    error,
    loadSnmpcredentials,
    loadSnmpcredentialById,
  }
}
