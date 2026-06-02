// Auto-generated file. Do not edit manually.
// Composable generated from configService.ts.

import { ref } from 'vue'
import { getConfigs } from '@/services/generated/configService'

export function useConfigs() {
  const configs = ref<any[]>([])
  const selectedConfig = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadConfigs() {
    loading.value = true
    error.value = null

    try {
      configs.value = await getConfigs()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    configs,
    selectedConfig,
    loading,
    error,
    loadConfigs,
  }
}
