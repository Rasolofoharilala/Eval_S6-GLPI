// Auto-generated file. Do not edit manually.
// Composable generated from phoneService.ts.

import { ref } from 'vue'
import { getPhones, getPhoneById } from '@/services/generated/phoneService'

export function usePhones() {
  const phones = ref<any[]>([])
  const selectedPhone = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadPhones() {
    loading.value = true
    error.value = null

    try {
      phones.value = await getPhones()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadPhoneById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedPhone.value = await getPhoneById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    phones,
    selectedPhone,
    loading,
    error,
    loadPhones,
    loadPhoneById,
  }
}
