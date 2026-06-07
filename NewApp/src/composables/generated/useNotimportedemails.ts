// Auto-generated file. Do not edit manually.
// Composable generated from notimportedemailService.ts.

import { ref } from 'vue'
import {
  getNotimportedemails,
  getNotimportedemailById,
} from '@/services/generated/notimportedemailService'
import type { NotImportedEmail } from '@/services/generated/notimportedemailService'

export function useNotimportedemails() {
  const notimportedemails = ref<NotImportedEmail[]>([])
  const selectedNotimportedemail = ref<NotImportedEmail | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadNotimportedemails() {
    loading.value = true
    error.value = null

    try {
      notimportedemails.value = await getNotimportedemails()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadNotimportedemailById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedNotimportedemail.value = await getNotimportedemailById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    notimportedemails,
    selectedNotimportedemail,
    loading,
    error,
    loadNotimportedemails,
    loadNotimportedemailById,
  }
}
