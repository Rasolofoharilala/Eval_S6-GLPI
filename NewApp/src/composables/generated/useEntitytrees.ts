// Auto-generated file. Do not edit manually.
// Composable generated from entitytreeService.ts.

import { ref } from 'vue'
import { getEntitytrees } from '@/services/generated/entitytreeService'

export function useEntitytrees() {
  const entitytrees = ref<unknown[]>([])
  const selectedEntitytree = ref<unknown | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadEntitytrees() {
    loading.value = true
    error.value = null

    try {
      entitytrees.value = await getEntitytrees()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    entitytrees,
    selectedEntitytree,
    loading,
    error,
    loadEntitytrees,
  }
}
