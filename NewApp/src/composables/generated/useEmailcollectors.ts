// Auto-generated file. Do not edit manually.
// Composable generated from emailcollectorService.ts.

import { ref } from 'vue'
import { getEmailcollectors, getEmailcollectorById } from '@/services/generated/emailcollectorService'

export function useEmailcollectors() {
  const emailcollectors = ref<any[]>([])
  const selectedEmailcollector = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadEmailcollectors() {
    loading.value = true
    error.value = null

    try {
      emailcollectors.value = await getEmailcollectors()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadEmailcollectorById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedEmailcollector.value = await getEmailcollectorById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    emailcollectors,
    selectedEmailcollector,
    loading,
    error,
    loadEmailcollectors,
    loadEmailcollectorById,
  }
}
