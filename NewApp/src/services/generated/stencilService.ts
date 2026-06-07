// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/Stencil.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getStencils = () => getAll(ENDPOINTS.DROPDOWNS_STENCIL)

export const getStencilById = (id: number) => getById(ENDPOINTS.DROPDOWNS_STENCIL, id)
