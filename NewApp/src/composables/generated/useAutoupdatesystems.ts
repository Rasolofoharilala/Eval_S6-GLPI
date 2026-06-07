// Auto-generated file. Do not edit manually.
// Composable generated from autoupdatesystemService.ts.

import { ref } from 'vue'
import {
  getAutoupdatesystems,
  getAutoupdatesystemById,
} from '@/services/generated/autoupdatesystemService'
import type { AutoUpdateSystem } from '@/services/generated/autoupdatesystemService'

export function useAutoupdatesystems() {
  const autoupdatesystems = ref<AutoUpdateSystem[]>([])
  const selectedAutoupdatesystem = ref<AutoUpdateSystem | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadAutoupdatesystems() {
    loading.value = true
    error.value = null

    try {
      autoupdatesystems.value = await getAutoupdatesystems()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadAutoupdatesystemById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedAutoupdatesystem.value = await getAutoupdatesystemById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    autoupdatesystems,
    selectedAutoupdatesystem,
    loading,
    error,
    loadAutoupdatesystems,
    loadAutoupdatesystemById,
  }
}
