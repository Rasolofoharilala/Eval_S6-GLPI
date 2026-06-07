// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/ApplianceEnvironment.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { ApplianceEnvironment } from '@/types/generated'

export type { ApplianceEnvironment } from '@/types/generated'

export const getApplianceenvironments = () =>
  getAll<ApplianceEnvironment>(ENDPOINTS.DROPDOWNS_APPLIANCEENVIRONMENT)

export const getApplianceenvironmentById = (id: number) =>
  getById<ApplianceEnvironment>(ENDPOINTS.DROPDOWNS_APPLIANCEENVIRONMENT, id)
