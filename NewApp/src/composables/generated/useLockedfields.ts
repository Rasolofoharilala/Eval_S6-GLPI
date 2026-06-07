// Auto-generated file. Do not edit manually.
// Composable generated from lockedfieldService.ts.

import { ref } from 'vue'
import { getLockedfields, getLockedfieldById } from '@/services/generated/lockedfieldService'
import type { LockedField } from '@/services/generated/lockedfieldService'

export function useLockedfields() {
  const lockedfields = ref<LockedField[]>([])
  const selectedLockedfield = ref<LockedField | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadLockedfields() {
    loading.value = true
    error.value = null

    try {
      lockedfields.value = await getLockedfields()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadLockedfieldById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedLockedfield.value = await getLockedfieldById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    lockedfields,
    selectedLockedfield,
    loading,
    error,
    loadLockedfields,
    loadLockedfieldById,
  }
}
