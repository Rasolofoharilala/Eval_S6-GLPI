// Auto-generated file. Do not edit manually.
// Service generated for /Management/Supplier.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { Supplier } from '@/types/generated'

export type { Supplier } from '@/types/generated'

export const getSuppliers = () => getAll<Supplier>(ENDPOINTS.MANAGEMENT_SUPPLIER)

export const getSupplierById = (id: number) => getById<Supplier>(ENDPOINTS.MANAGEMENT_SUPPLIER, id)
