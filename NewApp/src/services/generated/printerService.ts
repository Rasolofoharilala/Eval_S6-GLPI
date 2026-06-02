// Auto-generated file. Do not edit manually.
// Service generated for /Assets/Printer.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getPrinters = () =>
  getAll(ENDPOINTS.ASSETS_PRINTER)

export const getPrinterById = (id: number) =>
  getById(ENDPOINTS.ASSETS_PRINTER, id)
