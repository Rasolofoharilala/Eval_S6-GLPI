// Auto-generated file. Do not edit manually.
// Composable generated from pluginService.ts.

import { ref } from 'vue'
import { getPlugins } from '@/services/generated/pluginService'
import type { Plugin } from '@/services/generated/pluginService'

export function usePlugins() {
  const plugins = ref<Plugin[]>([])
  const selectedPlugin = ref<Plugin | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadPlugins() {
    loading.value = true
    error.value = null

    try {
      plugins.value = await getPlugins()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    plugins,
    selectedPlugin,
    loading,
    error,
    loadPlugins,
  }
}
