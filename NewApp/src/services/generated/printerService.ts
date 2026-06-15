// Auto-generated file. Do not edit manually.
// Service generated for /Assets/Printer.

import { getAll, getById } from '@/services/api/crudClient'
import { ENDPOINTS } from '@/services/generated/endpoints'
import type { Printer } from '@/types/generated'

export type { Printer } from '@/types/generated'

export const getPrinters = () => getAll<Printer>(ENDPOINTS.ASSETS_PRINTER)

export const getPrinterById = (id: number) => getById<Printer>(ENDPOINTS.ASSETS_PRINTER, id)
