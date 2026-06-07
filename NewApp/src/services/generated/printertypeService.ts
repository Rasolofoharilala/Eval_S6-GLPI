// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/PrinterType.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { PrinterType } from '@/types/generated'

export type { PrinterType } from '@/types/generated'

export const getPrintertypes = () => getAll<PrinterType>(ENDPOINTS.DROPDOWNS_PRINTERTYPE)

export const getPrintertypeById = (id: number) =>
  getById<PrinterType>(ENDPOINTS.DROPDOWNS_PRINTERTYPE, id)
