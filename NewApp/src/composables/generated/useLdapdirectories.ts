// Auto-generated file. Do not edit manually.
// Composable generated from ldapdirectoryService.ts.

import { ref } from 'vue'
import { getLdapdirectories, getLdapdirectoryById } from '@/services/generated/ldapdirectoryService'

export function useLdapdirectories() {
  const ldapdirectories = ref<any[]>([])
  const selectedLdapdirectory = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadLdapdirectories() {
    loading.value = true
    error.value = null

    try {
      ldapdirectories.value = await getLdapdirectories()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadLdapdirectoryById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedLdapdirectory.value = await getLdapdirectoryById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    ldapdirectories,
    selectedLdapdirectory,
    loading,
    error,
    loadLdapdirectories,
    loadLdapdirectoryById,
  }
}
