// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/PeripheralType.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getPeripheraltypes = () => getAll(ENDPOINTS.DROPDOWNS_PERIPHERALTYPE)

export const getPeripheraltypeById = (id: number) => getById(ENDPOINTS.DROPDOWNS_PERIPHERALTYPE, id)
