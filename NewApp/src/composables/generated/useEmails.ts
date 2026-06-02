// Auto-generated file. Do not edit manually.
// Composable generated from emailService.ts.

import { ref } from 'vue'
import { getEmails, getEmailById } from '@/services/generated/emailService'

export function useEmails() {
  const emails = ref<any[]>([])
  const selectedEmail = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadEmails() {
    loading.value = true
    error.value = null

    try {
      emails.value = await getEmails()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadEmailById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedEmail.value = await getEmailById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    emails,
    selectedEmail,
    loading,
    error,
    loadEmails,
    loadEmailById,
  }
}
