// Auto-generated file. Do not edit manually.
// Composable generated from contacttypeService.ts.

import { ref } from 'vue'
import { getContacttypes, getContacttypeById } from '@/services/generated/contacttypeService'
import type { ContactType } from '@/services/generated/contacttypeService'

export function useContacttypes() {
  const contacttypes = ref<ContactType[]>([])
  const selectedContacttype = ref<ContactType | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadContacttypes() {
    loading.value = true
    error.value = null

    try {
      contacttypes.value = await getContacttypes()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadContacttypeById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedContacttype.value = await getContacttypeById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    contacttypes,
    selectedContacttype,
    loading,
    error,
    loadContacttypes,
    loadContacttypeById,
  }
}
