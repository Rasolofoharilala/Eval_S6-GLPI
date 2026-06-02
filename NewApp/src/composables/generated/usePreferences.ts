// Auto-generated file. Do not edit manually.
// Composable generated from preferenceService.ts.

import { ref } from 'vue'
import { getPreferences } from '@/services/generated/preferenceService'

export function usePreferences() {
  const preferences = ref<any[]>([])
  const selectedPreference = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadPreferences() {
    loading.value = true
    error.value = null

    try {
      preferences.value = await getPreferences()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    preferences,
    selectedPreference,
    loading,
    error,
    loadPreferences,
  }
}
