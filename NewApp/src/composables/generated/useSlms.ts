// Auto-generated file. Do not edit manually.
// Composable generated from slmService.ts.

import { ref } from 'vue'
import { getSlms, getSlmById } from '@/services/generated/slmService'
import type { SLM } from '@/services/generated/slmService'

export function useSlms() {
  const slms = ref<SLM[]>([])
  const selectedSlm = ref<SLM | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadSlms() {
    loading.value = true
    error.value = null

    try {
      slms.value = await getSlms()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadSlmById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedSlm.value = await getSlmById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    slms,
    selectedSlm,
    loading,
    error,
    loadSlms,
    loadSlmById,
  }
}
