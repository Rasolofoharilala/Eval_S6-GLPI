// Auto-generated file. Do not edit manually.
// Composable generated from filesystemService.ts.

import { ref } from 'vue'
import { getFilesystems, getFilesystemById } from '@/services/generated/filesystemService'
import type { Filesystem } from '@/services/generated/filesystemService'

export function useFilesystems() {
  const filesystems = ref<Filesystem[]>([])
  const selectedFilesystem = ref<Filesystem | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadFilesystems() {
    loading.value = true
    error.value = null

    try {
      filesystems.value = await getFilesystems()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadFilesystemById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedFilesystem.value = await getFilesystemById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    filesystems,
    selectedFilesystem,
    loading,
    error,
    loadFilesystems,
    loadFilesystemById,
  }
}
