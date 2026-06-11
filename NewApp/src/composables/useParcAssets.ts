// ═════════════════════════════════════════════════════════════════════════════
// COMPOSABLE : CHARGER TOUT LE PARC EN UNE FOIS
//
// Au lieu d'importer 5 composables (useComputers, useMonitors, …) dans
// chaque page, celui-ci charge les 5 types d'équipements définis dans
// src/config/parc.ts et les renvoie groupés par type.
//
// Exemple dans une page :
//   const { groupes, tousLesElements, loading, error, chargerParc } = useParcAssets()
//   onMounted(chargerParc)
// ═════════════════════════════════════════════════════════════════════════════

import { computed, ref } from 'vue'
import { getAllActifs } from '@/api/crudClient'
import { TYPES_PARC } from '@/config/parc'
import { messageErreur } from '@/utils/messageErreur'

/** Champs communs aux 5 types d'assets renvoyés par l'API GLPI. */
export type AssetParc = {
  id?: number
  name?: string | null
  status?: { name?: string | null } | null
  location?: { name?: string | null; completename?: string | null } | null
  user?: {
    name?: string | null
    firstname?: string | null
    realname?: string | null
  } | null
  manufacturer?: { name?: string | null } | null
  model?: { name?: string | null } | null
  otherserial?: string | null
  serial?: string | null
}

/** Un type du parc avec ses éléments chargés. */
export type GroupeParc = {
  cle: string
  itemtype: string
  label: string
  elements: AssetParc[]
}

export function useParcAssets() {
  const groupes = ref<GroupeParc[]>([])
  const loading = ref(false)
  const error = ref('')

  /** Tous les éléments des 5 types, dans une seule liste à plat. */
  const tousLesElements = computed<AssetParc[]>(() => {
    const liste: AssetParc[] = []
    for (const groupe of groupes.value) {
      liste.push(...groupe.elements)
    }
    return liste
  })

  /** Charge les 5 types en parallèle (5 requêtes simultanées, corbeille exclue). */
  async function chargerParc() {
    loading.value = true
    error.value = ''

    try {
      const reponses = await Promise.all(
        TYPES_PARC.map((type) => getAllActifs<AssetParc>(type.endpoint)),
      )

      groupes.value = TYPES_PARC.map((type, i) => ({
        cle: type.cle,
        itemtype: type.itemtype,
        label: type.label,
        elements: reponses[i] ?? [],
      }))
    } catch (err) {
      error.value = messageErreur(err)
    } finally {
      loading.value = false
    }
  }

  return { groupes, tousLesElements, loading, error, chargerParc }
}
