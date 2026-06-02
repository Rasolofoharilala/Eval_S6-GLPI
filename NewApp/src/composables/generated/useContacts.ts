// Auto-generated file. Do not edit manually.
// Composable generated from contactService.ts.

import { ref } from 'vue'
import { getContacts, getContactById } from '@/services/generated/contactService'

export function useContacts() {
  const contacts = ref<any[]>([])
  const selectedContact = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadContacts() {
    loading.value = true
    error.value = null

    try {
      contacts.value = await getContacts()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadContactById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedContact.value = await getContactById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    contacts,
    selectedContact,
    loading,
    error,
    loadContacts,
    loadContactById,
  }
}
