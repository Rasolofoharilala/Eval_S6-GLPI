// Auto-generated file. Do not edit manually.
// Service generated for /Management/Contact.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getContacts = () =>
  getAll(ENDPOINTS.MANAGEMENT_CONTACT)

export const getContactById = (id: number) =>
  getById(ENDPOINTS.MANAGEMENT_CONTACT, id)
