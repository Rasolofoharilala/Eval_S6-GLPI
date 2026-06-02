// Auto-generated file. Do not edit manually.
// Composable generated from processorService.ts.

import { ref } from 'vue'
import { getProcessors, getProcessorById } from '@/services/generated/processorService'

export function useProcessors() {
  const processors = ref<any[]>([])
  const selectedProcessor = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadProcessors() {
    loading.value = true
    error.value = null

    try {
      processors.value = await getProcessors()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadProcessorById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedProcessor.value = await getProcessorById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    processors,
    selectedProcessor,
    loading,
    error,
    loadProcessors,
    loadProcessorById,
  }
}
