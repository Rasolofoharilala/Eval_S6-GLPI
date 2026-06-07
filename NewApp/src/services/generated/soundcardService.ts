// Auto-generated file. Do not edit manually.
// Service generated for /Components/SoundCard.

import { getAll, getById } from '@/api/crudClient'
import { ENDPOINTS } from '@/generated/endpoints'
import type { SoundCard } from '@/types/generated'

export type { SoundCard } from '@/types/generated'

export const getSoundcards = () => getAll<SoundCard>(ENDPOINTS.COMPONENTS_SOUNDCARD)

export const getSoundcardById = (id: number) =>
  getById<SoundCard>(ENDPOINTS.COMPONENTS_SOUNDCARD, id)
