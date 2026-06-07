// Auto-generated file. Do not edit manually.
// Composable generated from articleService.ts.

import { ref } from 'vue'
import { getArticles } from '@/services/generated/articleService'
import type { KBArticle } from '@/services/generated/articleService'

export function useArticles() {
  const articles = ref<KBArticle[]>([])
  const selectedArticle = ref<KBArticle | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadArticles() {
    loading.value = true
    error.value = null

    try {
      articles.value = await getArticles()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    articles,
    selectedArticle,
    loading,
    error,
    loadArticles,
  }
}
