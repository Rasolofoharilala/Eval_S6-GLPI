// Auto-generated file. Do not edit manually.
// Composable generated from webhookcategoryService.ts.

import { ref } from 'vue'
import {
  getWebhookcategories,
  getWebhookcategoryById,
} from '@/services/generated/webhookcategoryService'
import type { WebhookCategory } from '@/services/generated/webhookcategoryService'

export function useWebhookcategories() {
  const webhookcategories = ref<WebhookCategory[]>([])
  const selectedWebhookcategory = ref<WebhookCategory | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadWebhookcategories() {
    loading.value = true
    error.value = null

    try {
      webhookcategories.value = await getWebhookcategories()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadWebhookcategoryById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedWebhookcategory.value = await getWebhookcategoryById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    webhookcategories,
    selectedWebhookcategory,
    loading,
    error,
    loadWebhookcategories,
    loadWebhookcategoryById,
  }
}
