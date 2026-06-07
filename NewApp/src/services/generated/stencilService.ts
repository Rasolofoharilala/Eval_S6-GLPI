// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/Stencil.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { Stencil } from '@/types/generated'

export type { Stencil } from '@/types/generated'

export const getStencils = () => getAll<Stencil>(ENDPOINTS.DROPDOWNS_STENCIL)

export const getStencilById = (id: number) => getById<Stencil>(ENDPOINTS.DROPDOWNS_STENCIL, id)
