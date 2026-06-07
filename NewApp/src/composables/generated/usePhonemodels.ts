// Auto-generated file. Do not edit manually.
// Composable generated from phonemodelService.ts.

import { ref } from 'vue'
import { getPhonemodels, getPhonemodelById } from '@/services/generated/phonemodelService'
import type { PhoneModel } from '@/services/generated/phonemodelService'

export function usePhonemodels() {
  const phonemodels = ref<PhoneModel[]>([])
  const selectedPhonemodel = ref<PhoneModel | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadPhonemodels() {
    loading.value = true
    error.value = null

    try {
      phonemodels.value = await getPhonemodels()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadPhonemodelById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedPhonemodel.value = await getPhonemodelById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    phonemodels,
    selectedPhonemodel,
    loading,
    error,
    loadPhonemodels,
    loadPhonemodelById,
  }
}
