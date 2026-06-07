// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/SupplierType.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getSuppliertypes = () => getAll(ENDPOINTS.DROPDOWNS_SUPPLIERTYPE)

export const getSuppliertypeById = (id: number) => getById(ENDPOINTS.DROPDOWNS_SUPPLIERTYPE, id)
