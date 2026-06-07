// Auto-generated file. Do not edit manually.
// Service generated for /Assets/Computer.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getComputers = () => getAll(ENDPOINTS.ASSETS_COMPUTER)

export const getComputerById = (id: number) => getById(ENDPOINTS.ASSETS_COMPUTER, id)
