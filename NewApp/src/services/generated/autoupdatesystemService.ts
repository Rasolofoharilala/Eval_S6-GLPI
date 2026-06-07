// Auto-generated file. Do not edit manually.
// Service generated for /Dropdowns/AutoUpdateSystem.

import { getAll, getById, create, update, remove } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { AutoUpdateSystem } from '@/types/generated'

export type { AutoUpdateSystem } from '@/types/generated'

export const getAutoupdatesystems = () =>
  getAll<AutoUpdateSystem>(ENDPOINTS.DROPDOWNS_AUTOUPDATESYSTEM)

export const getAutoupdatesystemById = (id: number) =>
  getById<AutoUpdateSystem>(ENDPOINTS.DROPDOWNS_AUTOUPDATESYSTEM, id)

export const createAutoupdatesystem = <Payload>(payload: Payload) =>
  create(ENDPOINTS.DROPDOWNS_AUTOUPDATESYSTEM, payload)

export const updateAutoupdatesystem = <Payload>(id: number, payload: Payload) =>
  update(ENDPOINTS.DROPDOWNS_AUTOUPDATESYSTEM, id, payload)

export const deleteAutoupdatesystem = (id: number) =>
  remove(ENDPOINTS.DROPDOWNS_AUTOUPDATESYSTEM, id)
