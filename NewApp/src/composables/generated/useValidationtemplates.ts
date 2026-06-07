// Auto-generated file. Do not edit manually.
// Composable generated from validationtemplateService.ts.

import { ref } from 'vue'
import {
  getValidationtemplates,
  getValidationtemplateById,
} from '@/services/generated/validationtemplateService'
import type { ValidationTemplate } from '@/services/generated/validationtemplateService'

export function useValidationtemplates() {
  const validationtemplates = ref<ValidationTemplate[]>([])
  const selectedValidationtemplate = ref<ValidationTemplate | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadValidationtemplates() {
    loading.value = true
    error.value = null

    try {
      validationtemplates.value = await getValidationtemplates()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadValidationtemplateById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedValidationtemplate.value = await getValidationtemplateById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    validationtemplates,
    selectedValidationtemplate,
    loading,
    error,
    loadValidationtemplates,
    loadValidationtemplateById,
  }
}
