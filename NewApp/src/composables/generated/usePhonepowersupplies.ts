// Auto-generated file. Do not edit manually.
// Composable generated from phonepowersupplyService.ts.

import { ref } from 'vue'
import { getPhonepowersupplies, getPhonepowersupplyById } from '@/services/generated/phonepowersupplyService'

export function usePhonepowersupplies() {
  const phonepowersupplies = ref<any[]>([])
  const selectedPhonepowersupply = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadPhonepowersupplies() {
    loading.value = true
    error.value = null

    try {
      phonepowersupplies.value = await getPhonepowersupplies()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadPhonepowersupplyById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedPhonepowersupply.value = await getPhonepowersupplyById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    phonepowersupplies,
    selectedPhonepowersupply,
    loading,
    error,
    loadPhonepowersupplies,
    loadPhonepowersupplyById,
  }
}
