// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/ApplianceEnvironment.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getApplianceenvironments = () => getAll(ENDPOINTS.DROPDOWNS_APPLIANCEENVIRONMENT)

export const getApplianceenvironmentById = (id: number) =>
  getById(ENDPOINTS.DROPDOWNS_APPLIANCEENVIRONMENT, id)
