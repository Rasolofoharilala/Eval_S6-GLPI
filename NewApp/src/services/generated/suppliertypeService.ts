// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/SupplierType.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { SupplierType } from '@/types/generated'

export type { SupplierType } from '@/types/generated'

export const getSuppliertypes = () => getAll<SupplierType>(ENDPOINTS.DROPDOWNS_SUPPLIERTYPE)

export const getSuppliertypeById = (id: number) =>
  getById<SupplierType>(ENDPOINTS.DROPDOWNS_SUPPLIERTYPE, id)
