// Auto-generated file. Do not edit manually.
// Composable generated from memoryService.ts.

import { ref } from 'vue'
import { getMemories, getMemoryById } from '@/services/generated/memoryService'

export function useMemories() {
  const memories = ref<any[]>([])
  const selectedMemory = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadMemories() {
    loading.value = true
    error.value = null

    try {
      memories.value = await getMemories()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadMemoryById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedMemory.value = await getMemoryById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    memories,
    selectedMemory,
    loading,
    error,
    loadMemories,
    loadMemoryById,
  }
}
