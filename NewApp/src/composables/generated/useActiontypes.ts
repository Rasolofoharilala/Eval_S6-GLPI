// Auto-generated file. Do not edit manually.
// Composable generated from actiontypeService.ts.

import { ref } from 'vue'
import { getActiontypes } from '@/services/generated/actiontypeService'
import type { RuleActionType } from '@/services/generated/actiontypeService'

export function useActiontypes() {
  const actiontypes = ref<RuleActionType[]>([])
  const selectedActiontype = ref<RuleActionType | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadActiontypes() {
    loading.value = true
    error.value = null

    try {
      actiontypes.value = await getActiontypes()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    actiontypes,
    selectedActiontype,
    loading,
    error,
    loadActiontypes,
  }
}
