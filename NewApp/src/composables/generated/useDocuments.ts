// Auto-generated file. Do not edit manually.
// Composable generated from documentService.ts.

import { ref } from 'vue'
import { getDocuments, getDocumentById } from '@/services/generated/documentService'
import type { Document } from '@/services/generated/documentService'

export function useDocuments() {
  const documents = ref<Document[]>([])
  const selectedDocument = ref<Document | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadDocuments() {
    loading.value = true
    error.value = null

    try {
      documents.value = await getDocuments()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadDocumentById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedDocument.value = await getDocumentById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    documents,
    selectedDocument,
    loading,
    error,
    loadDocuments,
    loadDocumentById,
  }
}
