// Auto-generated file. Do not edit manually.
// Composable generated from controllerService.ts.

import { ref } from 'vue'
import { getControllers, getControllerById } from '@/services/generated/controllerService'
import type { Controller } from '@/services/generated/controllerService'

export function useControllers() {
  const controllers = ref<Controller[]>([])
  const selectedController = ref<Controller | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadControllers() {
    loading.value = true
    error.value = null

    try {
      controllers.value = await getControllers()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadControllerById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedController.value = await getControllerById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    controllers,
    selectedController,
    loading,
    error,
    loadControllers,
    loadControllerById,
  }
}
