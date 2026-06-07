// Auto-generated file. Do not edit manually.
// Composable generated from taskService.ts.

import { ref } from 'vue'
import { getTasks, getTaskById } from '@/services/generated/taskService'
import type { ProjectTask } from '@/services/generated/taskService'

export function useTasks() {
  const tasks = ref<ProjectTask[]>([])
  const selectedTask = ref<ProjectTask | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadTasks() {
    loading.value = true
    error.value = null

    try {
      tasks.value = await getTasks()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadTaskById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedTask.value = await getTaskById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    tasks,
    selectedTask,
    loading,
    error,
    loadTasks,
    loadTaskById,
  }
}
