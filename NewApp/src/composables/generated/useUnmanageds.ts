// Auto-generated file. Do not edit manually.
// Composable generated from unmanagedService.ts.

import { ref } from 'vue'
import { getUnmanageds, getUnmanagedById } from '@/services/generated/unmanagedService'

export function useUnmanageds() {
  const unmanageds = ref<any[]>([])
  const selectedUnmanaged = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadUnmanageds() {
    loading.value = true
    error.value = null

    try {
      unmanageds.value = await getUnmanageds()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadUnmanagedById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedUnmanaged.value = await getUnmanagedById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    unmanageds,
    selectedUnmanaged,
    loading,
    error,
    loadUnmanageds,
    loadUnmanagedById,
  }
}
