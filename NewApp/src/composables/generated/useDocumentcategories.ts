// Auto-generated file. Do not edit manually.
// Composable generated from documentcategoryService.ts.

import { ref } from 'vue'
import {
  getDocumentcategories,
  getDocumentcategoryById,
} from '@/services/generated/documentcategoryService'
import type { DocumentCategory } from '@/services/generated/documentcategoryService'

export function useDocumentcategories() {
  const documentcategories = ref<DocumentCategory[]>([])
  const selectedDocumentcategory = ref<DocumentCategory | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadDocumentcategories() {
    loading.value = true
    error.value = null

    try {
      documentcategories.value = await getDocumentcategories()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadDocumentcategoryById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedDocumentcategory.value = await getDocumentcategoryById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    documentcategories,
    selectedDocumentcategory,
    loading,
    error,
    loadDocumentcategories,
    loadDocumentcategoryById,
  }
}
