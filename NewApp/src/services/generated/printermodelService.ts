// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/PrinterModel.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getPrintermodels = () =>
  getAll(ENDPOINTS.DROPDOWNS_PRINTERMODEL)

export const getPrintermodelById = (id: number) =>
  getById(ENDPOINTS.DROPDOWNS_PRINTERMODEL, id)
