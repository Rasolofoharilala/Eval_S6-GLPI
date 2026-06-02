// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/PrinterType.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getPrintertypes = () =>
  getAll(ENDPOINTS.DROPDOWNS_PRINTERTYPE)

export const getPrintertypeById = (id: number) =>
  getById(ENDPOINTS.DROPDOWNS_PRINTERTYPE, id)
