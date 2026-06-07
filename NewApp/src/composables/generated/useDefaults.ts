// Auto-generated file. Do not edit manually.
// Composable generated from defaultService.ts.

import { ref } from 'vue'
import { getDefaults } from '@/services/generated/defaultService'
import type { EmailAddress } from '@/services/generated/defaultService'

export function useDefaults() {
  const defaults = ref<EmailAddress[]>([])
  const selectedDefault = ref<EmailAddress | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadDefaults() {
    loading.value = true
    error.value = null

    try {
      defaults.value = await getDefaults()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    defaults,
    selectedDefault,
    loading,
    error,
    loadDefaults,
  }
}
