// Auto-generated file. Do not edit manually.
// Service generated for /Administration/User/Me/Email.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getEmails = () =>
  getAll(ENDPOINTS.ADMINISTRATION_USER_ME_EMAIL)

export const getEmailById = (id: number) =>
  getById(ENDPOINTS.ADMINISTRATION_USER_ME_EMAIL, id)
