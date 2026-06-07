// Auto-generated file. Do not edit manually.
// Service generated for /Components/SoundCard.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'

export const getSoundcards = () => getAll(ENDPOINTS.COMPONENTS_SOUNDCARD)

export const getSoundcardById = (id: number) => getById(ENDPOINTS.COMPONENTS_SOUNDCARD, id)
