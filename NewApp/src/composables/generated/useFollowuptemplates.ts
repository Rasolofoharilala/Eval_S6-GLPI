// Auto-generated file. Do not edit manually.
// Composable generated from followuptemplateService.ts.

import { ref } from 'vue'
import {
  getFollowuptemplates,
  getFollowuptemplateById,
} from '@/services/generated/followuptemplateService'

export function useFollowuptemplates() {
  const followuptemplates = ref<any[]>([])
  const selectedFollowuptemplate = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadFollowuptemplates() {
    loading.value = true
    error.value = null

    try {
      followuptemplates.value = await getFollowuptemplates()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadFollowuptemplateById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedFollowuptemplate.value = await getFollowuptemplateById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    followuptemplates,
    selectedFollowuptemplate,
    loading,
    error,
    loadFollowuptemplates,
    loadFollowuptemplateById,
  }
}
