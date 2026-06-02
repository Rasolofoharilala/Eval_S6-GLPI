// Auto-generated file. Do not edit manually.
// Composable generated from usertitleService.ts.

import { ref } from 'vue'
import { getUsertitles, getUsertitleById } from '@/services/generated/usertitleService'

export function useUsertitles() {
  const usertitles = ref<any[]>([])
  const selectedUsertitle = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadUsertitles() {
    loading.value = true
    error.value = null

    try {
      usertitles.value = await getUsertitles()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadUsertitleById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedUsertitle.value = await getUsertitleById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    usertitles,
    selectedUsertitle,
    loading,
    error,
    loadUsertitles,
    loadUsertitleById,
  }
}
