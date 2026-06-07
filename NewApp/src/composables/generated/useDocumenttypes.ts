// Auto-generated file. Do not edit manually.
// Composable generated from documenttypeService.ts.

import { ref } from 'vue'
import { getDocumenttypes, getDocumenttypeById } from '@/services/generated/documenttypeService'
import type { DocumentType } from '@/services/generated/documenttypeService'

export function useDocumenttypes() {
  const documenttypes = ref<DocumentType[]>([])
  const selectedDocumenttype = ref<DocumentType | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadDocumenttypes() {
    loading.value = true
    error.value = null

    try {
      documenttypes.value = await getDocumenttypes()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadDocumenttypeById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedDocumenttype.value = await getDocumenttypeById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    documenttypes,
    selectedDocumenttype,
    loading,
    error,
    loadDocumenttypes,
    loadDocumenttypeById,
  }
}
