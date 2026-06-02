// Auto-generated file. Do not edit manually.
// Service generated for /Assistance/PlanningReminder.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getPlanningreminders = () =>
  getAll(ENDPOINTS.ASSISTANCE_PLANNINGREMINDER)

export const getPlanningreminderById = (id: number) =>
  getById(ENDPOINTS.ASSISTANCE_PLANNINGREMINDER, id)
