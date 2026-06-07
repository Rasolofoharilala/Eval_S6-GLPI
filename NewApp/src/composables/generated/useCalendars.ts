// Auto-generated file. Do not edit manually.
// Composable generated from calendarService.ts.

import { ref } from 'vue'
import { getCalendars, getCalendarById } from '@/services/generated/calendarService'
import type { Calendar } from '@/services/generated/calendarService'

export function useCalendars() {
  const calendars = ref<Calendar[]>([])
  const selectedCalendar = ref<Calendar | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadCalendars() {
    loading.value = true
    error.value = null

    try {
      calendars.value = await getCalendars()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadCalendarById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedCalendar.value = await getCalendarById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    calendars,
    selectedCalendar,
    loading,
    error,
    loadCalendars,
    loadCalendarById,
  }
}
