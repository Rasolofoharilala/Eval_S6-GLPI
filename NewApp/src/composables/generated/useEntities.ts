// Auto-generated file. Do not edit manually.
// Composable generated from entityService.ts.

import { ref } from 'vue'
import { getEntities, getEntityById } from '@/services/generated/entityService'
import type { Entity } from '@/services/generated/entityService'

export function useEntities() {
  const entities = ref<Entity[]>([])
  const selectedEntity = ref<Entity | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadEntities() {
    loading.value = true
    error.value = null

    try {
      entities.value = await getEntities()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadEntityById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedEntity.value = await getEntityById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    entities,
    selectedEntity,
    loading,
    error,
    loadEntities,
    loadEntityById,
  }
}
