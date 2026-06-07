// Auto-generated file. Do not edit manually.
// Composable generated from emailauthserverService.ts.

import { ref } from 'vue'
import {
  getEmailauthservers,
  getEmailauthserverById,
} from '@/services/generated/emailauthserverService'

export function useEmailauthservers() {
  const emailauthservers = ref<any[]>([])
  const selectedEmailauthserver = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadEmailauthservers() {
    loading.value = true
    error.value = null

    try {
      emailauthservers.value = await getEmailauthservers()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadEmailauthserverById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedEmailauthserver.value = await getEmailauthserverById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    emailauthservers,
    selectedEmailauthserver,
    loading,
    error,
    loadEmailauthservers,
    loadEmailauthserverById,
  }
}
