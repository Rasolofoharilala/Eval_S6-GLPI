// Auto-generated file. Do not edit manually.
// Composable generated from oauthclientService.ts.

import { ref } from 'vue'
import { getOauthclients, getOauthclientById } from '@/services/generated/oauthclientService'
import type { OAuthClient } from '@/services/generated/oauthclientService'

export function useOauthclients() {
  const oauthclients = ref<OAuthClient[]>([])
  const selectedOauthclient = ref<OAuthClient | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadOauthclients() {
    loading.value = true
    error.value = null

    try {
      oauthclients.value = await getOauthclients()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadOauthclientById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedOauthclient.value = await getOauthclientById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    oauthclients,
    selectedOauthclient,
    loading,
    error,
    loadOauthclients,
    loadOauthclientById,
  }
}
