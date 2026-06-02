// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/DeniedMailContent.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getDeniedmailcontents = () =>
  getAll(ENDPOINTS.DROPDOWNS_DENIEDMAILCONTENT)

export const getDeniedmailcontentById = (id: number) =>
  getById(ENDPOINTS.DROPDOWNS_DENIEDMAILCONTENT, id)
