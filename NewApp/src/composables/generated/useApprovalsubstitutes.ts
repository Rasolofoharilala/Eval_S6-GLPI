// Auto-generated file. Do not edit manually.
// Composable generated from approvalsubstituteService.ts.

import { ref } from 'vue'
import {
  getApprovalsubstitutes,
  getApprovalsubstituteById,
} from '@/services/generated/approvalsubstituteService'
import type { ApprovalSubstitute } from '@/services/generated/approvalsubstituteService'

export function useApprovalsubstitutes() {
  const approvalsubstitutes = ref<ApprovalSubstitute[]>([])
  const selectedApprovalsubstitute = ref<ApprovalSubstitute | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadApprovalsubstitutes() {
    loading.value = true
    error.value = null

    try {
      approvalsubstitutes.value = await getApprovalsubstitutes()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadApprovalsubstituteById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedApprovalsubstitute.value = await getApprovalsubstituteById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    approvalsubstitutes,
    selectedApprovalsubstitute,
    loading,
    error,
    loadApprovalsubstitutes,
    loadApprovalsubstituteById,
  }
}
