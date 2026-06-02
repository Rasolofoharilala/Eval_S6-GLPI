// Auto-generated file. Do not edit manually.
// Composable generated from rssfeedService.ts.

import { ref } from 'vue'
import { getRssfeeds, getRssfeedById } from '@/services/generated/rssfeedService'

export function useRssfeeds() {
  const rssfeeds = ref<any[]>([])
  const selectedRssfeed = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadRssfeeds() {
    loading.value = true
    error.value = null

    try {
      rssfeeds.value = await getRssfeeds()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadRssfeedById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedRssfeed.value = await getRssfeedById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    rssfeeds,
    selectedRssfeed,
    loading,
    error,
    loadRssfeeds,
    loadRssfeedById,
  }
}
