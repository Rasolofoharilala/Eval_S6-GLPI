// Auto-generated file. Do not edit manually.
// Composable generated from reminderService.ts.

import { ref } from 'vue'
import { getReminders, getReminderById } from '@/services/generated/reminderService'
import type { Reminder } from '@/services/generated/reminderService'

export function useReminders() {
  const reminders = ref<Reminder[]>([])
  const selectedReminder = ref<Reminder | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadReminders() {
    loading.value = true
    error.value = null

    try {
      reminders.value = await getReminders()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadReminderById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedReminder.value = await getReminderById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    reminders,
    selectedReminder,
    loading,
    error,
    loadReminders,
    loadReminderById,
  }
}
