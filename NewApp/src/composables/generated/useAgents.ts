// Auto-generated file. Do not edit manually.
// Composable generated from agentService.ts.

import { ref } from 'vue'
import { getAgents, getAgentById } from '@/services/generated/agentService'

export function useAgents() {
  const agents = ref<any[]>([])
  const selectedAgent = ref<any | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadAgents() {
    loading.value = true
    error.value = null

    try {
      agents.value = await getAgents()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadAgentById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedAgent.value = await getAgentById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    agents,
    selectedAgent,
    loading,
    error,
    loadAgents,
    loadAgentById,
  }
}
