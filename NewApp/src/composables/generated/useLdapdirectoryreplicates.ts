// Auto-generated file. Do not edit manually.
// Composable generated from ldapdirectoryreplicateService.ts.

import { ref } from 'vue'
import {
  getLdapdirectoryreplicates,
  getLdapdirectoryreplicateById,
} from '@/services/generated/ldapdirectoryreplicateService'
import type { LDAPDirectoryReplicate } from '@/services/generated/ldapdirectoryreplicateService'

export function useLdapdirectoryreplicates() {
  const ldapdirectoryreplicates = ref<LDAPDirectoryReplicate[]>([])
  const selectedLdapdirectoryreplicate = ref<LDAPDirectoryReplicate | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadLdapdirectoryreplicates() {
    loading.value = true
    error.value = null

    try {
      ldapdirectoryreplicates.value = await getLdapdirectoryreplicates()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadLdapdirectoryreplicateById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedLdapdirectoryreplicate.value = await getLdapdirectoryreplicateById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    ldapdirectoryreplicates,
    selectedLdapdirectoryreplicate,
    loading,
    error,
    loadLdapdirectoryreplicates,
    loadLdapdirectoryreplicateById,
  }
}
