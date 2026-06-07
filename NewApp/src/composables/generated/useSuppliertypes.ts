// Auto-generated file. Do not edit manually.
// Composable generated from suppliertypeService.ts.

import { ref } from 'vue'
import { getSuppliertypes, getSuppliertypeById } from '@/services/generated/suppliertypeService'
import type { SupplierType } from '@/services/generated/suppliertypeService'

export function useSuppliertypes() {
  const suppliertypes = ref<SupplierType[]>([])
  const selectedSuppliertype = ref<SupplierType | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadSuppliertypes() {
    loading.value = true
    error.value = null

    try {
      suppliertypes.value = await getSuppliertypes()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadSuppliertypeById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedSuppliertype.value = await getSuppliertypeById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    suppliertypes,
    selectedSuppliertype,
    loading,
    error,
    loadSuppliertypes,
    loadSuppliertypeById,
  }
}
