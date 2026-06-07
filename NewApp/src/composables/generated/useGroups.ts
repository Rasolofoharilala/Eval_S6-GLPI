// Auto-generated file. Do not edit manually.
// Composable generated from groupService.ts.

import { ref } from 'vue'
import { getGroups, getGroupById } from '@/services/generated/groupService'
import type { Group } from '@/services/generated/groupService'

export function useGroups() {
  const groups = ref<Group[]>([])
  const selectedGroup = ref<Group | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadGroups() {
    loading.value = true
    error.value = null

    try {
      groups.value = await getGroups()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadGroupById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedGroup.value = await getGroupById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    groups,
    selectedGroup,
    loading,
    error,
    loadGroups,
    loadGroupById,
  }
}
