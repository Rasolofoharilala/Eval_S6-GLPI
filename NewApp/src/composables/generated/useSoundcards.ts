// Auto-generated file. Do not edit manually.
// Composable generated from soundcardService.ts.

import { ref } from 'vue'
import { getSoundcards, getSoundcardById } from '@/services/generated/soundcardService'
import type { SoundCard } from '@/services/generated/soundcardService'

export function useSoundcards() {
  const soundcards = ref<SoundCard[]>([])
  const selectedSoundcard = ref<SoundCard | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadSoundcards() {
    loading.value = true
    error.value = null

    try {
      soundcards.value = await getSoundcards()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadSoundcardById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedSoundcard.value = await getSoundcardById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    soundcards,
    selectedSoundcard,
    loading,
    error,
    loadSoundcards,
    loadSoundcardById,
  }
}
