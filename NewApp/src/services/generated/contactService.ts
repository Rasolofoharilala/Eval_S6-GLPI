// Auto-generated file. Do not edit manually.
// Service generated for /Management/Contact.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { Contact } from '@/types/generated'

export type { Contact } from '@/types/generated'

export const getContacts = () => getAll<Contact>(ENDPOINTS.MANAGEMENT_CONTACT)

export const getContactById = (id: number) => getById<Contact>(ENDPOINTS.MANAGEMENT_CONTACT, id)
