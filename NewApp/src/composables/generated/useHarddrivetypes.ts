// Auto-generated file. Do not edit manually.
// Composable generated from harddrivetypeService.ts.

import { ref } from 'vue'
import { getHarddrivetypes, getHarddrivetypeById } from '@/services/generated/harddrivetypeService'
import type { HardDriveType } from '@/services/generated/harddrivetypeService'

export function useHarddrivetypes() {
  const harddrivetypes = ref<HardDriveType[]>([])
  const selectedHarddrivetype = ref<HardDriveType | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadHarddrivetypes() {
    loading.value = true
    error.value = null

    try {
      harddrivetypes.value = await getHarddrivetypes()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadHarddrivetypeById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedHarddrivetype.value = await getHarddrivetypeById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    harddrivetypes,
    selectedHarddrivetype,
    loading,
    error,
    loadHarddrivetypes,
    loadHarddrivetypeById,
  }
}
