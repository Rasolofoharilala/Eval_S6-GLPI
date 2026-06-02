// Auto-generated file. Do not edit manually.
// Service generated for /Tools/Reminder.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getReminders = () =>
  getAll(ENDPOINTS.TOOLS_REMINDER)

export const getReminderById = (id: number) =>
  getById(ENDPOINTS.TOOLS_REMINDER, id)
