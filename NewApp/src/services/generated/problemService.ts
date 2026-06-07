// Auto-generated file. Do not edit manually.
// Service generated for /Assistance/Problem.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { Problem } from '@/types/generated'

export type { Problem } from '@/types/generated'

export const getProblems = () => getAll<Problem>(ENDPOINTS.ASSISTANCE_PROBLEM)

export const getProblemById = (id: number) => getById<Problem>(ENDPOINTS.ASSISTANCE_PROBLEM, id)
