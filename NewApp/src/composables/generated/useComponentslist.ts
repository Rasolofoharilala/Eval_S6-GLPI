// Auto-generated file. Do not edit manually.
// Composable generated from componentsService.ts.

import { ref } from 'vue'
import { getComponentslist } from '@/services/generated/componentsService'

export function useComponentslist() {
  const componentslist = ref<any[]>([])
  const selectedComponents = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadComponentslist() {
    loading.value = true
    error.value = null

    try {
      componentslist.value = await getComponentslist()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    componentslist,
    selectedComponents,
    loading,
    error,
    loadComponentslist,
  }
}
