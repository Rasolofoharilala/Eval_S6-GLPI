// Auto-generated file. Do not edit manually.
// Service generated for /Assistance/PlanningReminder.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { PlanningReminder } from '@/types/generated'

export type { PlanningReminder } from '@/types/generated'

export const getPlanningreminders = () =>
  getAll<PlanningReminder>(ENDPOINTS.ASSISTANCE_PLANNINGREMINDER)

export const getPlanningreminderById = (id: number) =>
  getById<PlanningReminder>(ENDPOINTS.ASSISTANCE_PLANNINGREMINDER, id)
