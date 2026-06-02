// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/EventCategory.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getEventcategories = () =>
  getAll(ENDPOINTS.DROPDOWNS_EVENTCATEGORY)

export const getEventcategoryById = (id: number) =>
  getById(ENDPOINTS.DROPDOWNS_EVENTCATEGORY, id)
