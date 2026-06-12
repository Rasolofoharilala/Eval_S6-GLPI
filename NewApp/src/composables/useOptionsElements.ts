// ═════════════════════════════════════════════════════════════════════════════
// COMPOSABLE : LISTE DES ÉLÉMENTS SÉLECTIONNABLES (pour associer à un ticket)
//
// Charge les types du parc (config/parc.ts) et renvoie une liste à plat
// d'options { id, name, itemtype, typeLabel } prête pour un sélecteur multiple.
//
// Utilisé par le formulaire de ticket partagé. Ajouter un type dans
// config/parc.ts l'ajoute ici automatiquement.
// ═════════════════════════════════════════════════════════════════════════════

import { computed, ref } from 'vue'
import { getAllActifs } from '@/api/crudClient'
import { TYPES_PARC } from '@/config/parc'

export type OptionElement = {
  id: number
  name: string
  itemtype: string // classe GLPI (Computer, Phone…)
  typeLabel: string // libellé affiché (Ordinateurs…)
}

type AssetBrut = { id?: number; name?: string | null }

export function useOptionsElements() {
  const options = ref<OptionElement[]>([])
  const loading = ref(false)

  async function chargerOptions() {
    loading.value = true
    try {
      // Une requête par type, en parallèle.
      const reponses = await Promise.all(TYPES_PARC.map((t) => getAllActifs<AssetBrut>(t.endpoint)))

      const liste: OptionElement[] = []
      TYPES_PARC.forEach((type, i) => {
        for (const asset of reponses[i] ?? []) {
          liste.push({
            id: asset.id ?? 0,
            name: asset.name ?? '?',
            itemtype: type.itemtype,
            typeLabel: type.label,
          })
        }
      })
      options.value = liste
    } finally {
      loading.value = false
    }
  }

  // Options des types pour un <select> (Tous + chaque type).
  const optionsType = computed(() => [
    { valeur: '', label: 'Tous' },
    ...TYPES_PARC.map((t) => ({ valeur: t.itemtype, label: t.label })),
  ])

  return { options, optionsType, loading, chargerOptions }
}
