// Auto-generated file. Do not edit manually.
// Composable generated from ruleService.ts.

import { ref } from 'vue'
import { getRules, getRuleById } from '@/services/generated/ruleService'
import type { Rule } from '@/services/generated/ruleService'

export function useRules() {
  const rules = ref<Rule[]>([])
  const selectedRule = ref<Rule | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadRules() {
    loading.value = true
    error.value = null

    try {
      rules.value = await getRules()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadRuleById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedRule.value = await getRuleById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    rules,
    selectedRule,
    loading,
    error,
    loadRules,
    loadRuleById,
  }
}
