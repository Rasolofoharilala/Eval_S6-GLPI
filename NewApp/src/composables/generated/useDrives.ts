// Auto-generated file. Do not edit manually.
// Composable generated from driveService.ts.

import { ref } from 'vue'
import { getDrives, getDriveById } from '@/services/generated/driveService'
import type { Drive } from '@/services/generated/driveService'

export function useDrives() {
  const drives = ref<Drive[]>([])
  const selectedDrive = ref<Drive | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadDrives() {
    loading.value = true
    error.value = null

    try {
      drives.value = await getDrives()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadDriveById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedDrive.value = await getDriveById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    drives,
    selectedDrive,
    loading,
    error,
    loadDrives,
    loadDriveById,
  }
}
