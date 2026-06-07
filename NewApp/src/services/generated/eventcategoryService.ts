// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/EventCategory.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { EventCategory } from '@/types/generated'

export type { EventCategory } from '@/types/generated'

export const getEventcategories = () => getAll<EventCategory>(ENDPOINTS.DROPDOWNS_EVENTCATEGORY)

export const getEventcategoryById = (id: number) =>
  getById<EventCategory>(ENDPOINTS.DROPDOWNS_EVENTCATEGORY, id)
