// Auto-generated file. Do not edit manually.
// Composable generated from supplierService.ts.

import { ref } from 'vue'
import { getSuppliers, getSupplierById } from '@/services/generated/supplierService'

export function useSuppliers() {
  const suppliers = ref<any[]>([])
  const selectedSupplier = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadSuppliers() {
    loading.value = true
    error.value = null

    try {
      suppliers.value = await getSuppliers()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadSupplierById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedSupplier.value = await getSupplierById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    suppliers,
    selectedSupplier,
    loading,
    error,
    loadSuppliers,
    loadSupplierById,
  }
}
