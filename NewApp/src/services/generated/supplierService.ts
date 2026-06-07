// Auto-generated file. Do not edit manually.
// Service generated for /Management/Supplier.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getSuppliers = () => getAll(ENDPOINTS.MANAGEMENT_SUPPLIER)

export const getSupplierById = (id: number) => getById(ENDPOINTS.MANAGEMENT_SUPPLIER, id)
