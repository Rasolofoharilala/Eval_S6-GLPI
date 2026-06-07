// Auto-generated file. Do not edit manually.
// Composable generated from enclosuremodelService.ts.

import { ref } from 'vue'
import {
  getEnclosuremodels,
  getEnclosuremodelById,
} from '@/services/generated/enclosuremodelService'
import type { EnclosureModel } from '@/services/generated/enclosuremodelService'

export function useEnclosuremodels() {
  const enclosuremodels = ref<EnclosureModel[]>([])
  const selectedEnclosuremodel = ref<EnclosureModel | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadEnclosuremodels() {
    loading.value = true
    error.value = null

    try {
      enclosuremodels.value = await getEnclosuremodels()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadEnclosuremodelById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedEnclosuremodel.value = await getEnclosuremodelById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    enclosuremodels,
    selectedEnclosuremodel,
    loading,
    error,
    loadEnclosuremodels,
    loadEnclosuremodelById,
  }
}
