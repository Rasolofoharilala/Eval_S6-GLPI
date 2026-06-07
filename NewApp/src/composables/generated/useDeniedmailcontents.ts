// Auto-generated file. Do not edit manually.
// Composable generated from deniedmailcontentService.ts.

import { ref } from 'vue'
import {
  getDeniedmailcontents,
  getDeniedmailcontentById,
} from '@/services/generated/deniedmailcontentService'
import type { DeniedMailContent } from '@/services/generated/deniedmailcontentService'

export function useDeniedmailcontents() {
  const deniedmailcontents = ref<DeniedMailContent[]>([])
  const selectedDeniedmailcontent = ref<DeniedMailContent | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadDeniedmailcontents() {
    loading.value = true
    error.value = null

    try {
      deniedmailcontents.value = await getDeniedmailcontents()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadDeniedmailcontentById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedDeniedmailcontent.value = await getDeniedmailcontentById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    deniedmailcontents,
    selectedDeniedmailcontent,
    loading,
    error,
    loadDeniedmailcontents,
    loadDeniedmailcontentById,
  }
}
