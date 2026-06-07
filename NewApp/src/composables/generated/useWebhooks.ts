// Auto-generated file. Do not edit manually.
// Composable generated from webhookService.ts.

import { ref } from 'vue'
import { getWebhooks, getWebhookById } from '@/services/generated/webhookService'
import type { Webhook } from '@/services/generated/webhookService'

export function useWebhooks() {
  const webhooks = ref<Webhook[]>([])
  const selectedWebhook = ref<Webhook | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadWebhooks() {
    loading.value = true
    error.value = null

    try {
      webhooks.value = await getWebhooks()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadWebhookById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedWebhook.value = await getWebhookById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    webhooks,
    selectedWebhook,
    loading,
    error,
    loadWebhooks,
    loadWebhookById,
  }
}
