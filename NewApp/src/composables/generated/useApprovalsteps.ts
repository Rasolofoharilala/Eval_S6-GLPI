// Auto-generated file. Do not edit manually.
// Composable generated from approvalstepService.ts.

import { ref } from 'vue'
import { getApprovalsteps, getApprovalstepById } from '@/services/generated/approvalstepService'
import type { ApprovalStep } from '@/services/generated/approvalstepService'

export function useApprovalsteps() {
  const approvalsteps = ref<ApprovalStep[]>([])
  const selectedApprovalstep = ref<ApprovalStep | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadApprovalsteps() {
    loading.value = true
    error.value = null

    try {
      approvalsteps.value = await getApprovalsteps()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadApprovalstepById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedApprovalstep.value = await getApprovalstepById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    approvalsteps,
    selectedApprovalstep,
    loading,
    error,
    loadApprovalsteps,
    loadApprovalstepById,
  }
}
