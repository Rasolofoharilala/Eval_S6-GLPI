// Auto-generated file. Do not edit manually.
// Service generated for /Assistance/Problem.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getProblems = () => getAll(ENDPOINTS.ASSISTANCE_PROBLEM)

export const getProblemById = (id: number) => getById(ENDPOINTS.ASSISTANCE_PROBLEM, id)
