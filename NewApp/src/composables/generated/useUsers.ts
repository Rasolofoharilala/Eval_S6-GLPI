// Auto-generated file. Do not edit manually.
// Composable generated from userService.ts.

import { ref } from 'vue'
import { getUsers, getUserById } from '@/services/generated/userService'
import type { User } from '@/services/generated/userService'

export function useUsers() {
  const users = ref<User[]>([])
  const selectedUser = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadUsers() {
    loading.value = true
    error.value = null

    try {
      users.value = await getUsers()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadUserById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedUser.value = await getUserById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    users,
    selectedUser,
    loading,
    error,
    loadUsers,
    loadUserById,
  }
}
