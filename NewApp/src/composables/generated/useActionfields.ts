// Auto-generated file. Do not edit manually.
// Composable generated from actionfieldService.ts.

import { ref } from 'vue'
import { getActionfields } from '@/services/generated/actionfieldService'
import type { RuleActionField } from '@/services/generated/actionfieldService'

export function useActionfields() {
  const actionfields = ref<RuleActionField[]>([])
  const selectedActionfield = ref<RuleActionField | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadActionfields() {
    loading.value = true
    error.value = null

    try {
      actionfields.value = await getActionfields()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    actionfields,
    selectedActionfield,
    loading,
    error,
    loadActionfields,
  }
}
