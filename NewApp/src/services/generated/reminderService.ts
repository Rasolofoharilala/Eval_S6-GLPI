// Auto-generated file. Do not edit manually.
// Service generated for /Tools/Reminder.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { Reminder } from '@/types/generated'

export type { Reminder } from '@/types/generated'

export const getReminders = () => getAll<Reminder>(ENDPOINTS.TOOLS_REMINDER)

export const getReminderById = (id: number) => getById<Reminder>(ENDPOINTS.TOOLS_REMINDER, id)
