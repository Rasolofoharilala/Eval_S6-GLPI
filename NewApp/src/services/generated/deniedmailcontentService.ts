// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/DeniedMailContent.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { DeniedMailContent } from '@/types/generated'

export type { DeniedMailContent } from '@/types/generated'

export const getDeniedmailcontents = () =>
  getAll<DeniedMailContent>(ENDPOINTS.DROPDOWNS_DENIEDMAILCONTENT)

export const getDeniedmailcontentById = (id: number) =>
  getById<DeniedMailContent>(ENDPOINTS.DROPDOWNS_DENIEDMAILCONTENT, id)
