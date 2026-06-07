// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/PrinterModel.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { PrinterModel } from '@/types/generated'

export type { PrinterModel } from '@/types/generated'

export const getPrintermodels = () => getAll<PrinterModel>(ENDPOINTS.DROPDOWNS_PRINTERMODEL)

export const getPrintermodelById = (id: number) =>
  getById<PrinterModel>(ENDPOINTS.DROPDOWNS_PRINTERMODEL, id)
