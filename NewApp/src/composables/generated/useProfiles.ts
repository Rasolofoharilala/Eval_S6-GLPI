// Auto-generated file. Do not edit manually.
// Composable generated from profileService.ts.

import { ref } from 'vue'
import { getProfiles, getProfileById } from '@/services/generated/profileService'
import type { Profile } from '@/services/generated/profileService'

export function useProfiles() {
  const profiles = ref<Profile[]>([])
  const selectedProfile = ref<Profile | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadProfiles() {
    loading.value = true
    error.value = null

    try {
      profiles.value = await getProfiles()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  async function loadProfileById(id: number) {
    loading.value = true
    error.value = null

    try {
      selectedProfile.value = await getProfileById(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    profiles,
    selectedProfile,
    loading,
    error,
    loadProfiles,
    loadProfileById,
  }
}
