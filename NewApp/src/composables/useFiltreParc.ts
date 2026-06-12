// ═════════════════════════════════════════════════════════════════════════════
// COMPOSABLE : FILTRER LES ÉLÉMENTS DU PARC
//
// On lui passe les groupes du parc (sortie de useParcAssets) et il renvoie :
//   - `filtres` : l'état des filtres
//   - `elementsFiltres` : la liste à plat filtrée (chaque élément garde son type)
//   - `optionsStatut`, `optionsLieu`, `optionsFabricant` : valeurs distinctes
//     présentes dans les données (pour remplir les <select>)
//   - `reinitialiser()`
//
// Filtres : recherche texte (nom + n° d'inventaire), type d'équipement,
// statut, lieu, fabricant.
// ═════════════════════════════════════════════════════════════════════════════

import { computed, reactive, type Ref } from 'vue'
import type { AssetParc, GroupeParc } from '@/composables/useParcAssets'

// Un élément du parc enrichi de son type (label + clé), pour l'affichage filtré.
export type ElementParc = AssetParc & {
  typeLabel: string
  typeCle: string
}

export type FiltresParc = {
  recherche: string
  type: string // clé du type ('computer'…) ou '' pour tous
  statut: string // nom du statut ou '' pour tous
  lieu: string
  fabricant: string
}

function filtresVides(): FiltresParc {
  return { recherche: '', type: '', statut: '', lieu: '', fabricant: '' }
}

function nomStatut(e: AssetParc): string {
  return e.status?.name ?? ''
}
function nomLieu(e: AssetParc): string {
  return e.location?.name ?? e.location?.completename ?? ''
}
function nomFabricant(e: AssetParc): string {
  return e.manufacturer?.name ?? ''
}

// Liste triée des valeurs distinctes non vides d'un champ (pour un <select>).
function valeursDistinctes(elements: ElementParc[], lire: (e: AssetParc) => string): string[] {
  const vues = new Set<string>()
  for (const e of elements) {
    const v = lire(e)
    if (v) vues.add(v)
  }
  return Array.from(vues).sort()
}

export function useFiltreParc(groupes: Ref<GroupeParc[]>) {
  const filtres = reactive<FiltresParc>(filtresVides())

  // Tous les éléments, à plat, avec leur type.
  const tousLesElements = computed<ElementParc[]>(() => {
    const liste: ElementParc[] = []
    for (const groupe of groupes.value) {
      for (const element of groupe.elements) {
        liste.push({ ...element, typeLabel: groupe.label, typeCle: groupe.cle })
      }
    }
    return liste
  })

  const elementsFiltres = computed<ElementParc[]>(() => {
    const recherche = filtres.recherche.trim().toLowerCase()

    return tousLesElements.value.filter((e) => {
      if (recherche) {
        const nom = (e.name ?? '').toLowerCase()
        const inv = (e.otherserial ?? '').toLowerCase()
        if (!nom.includes(recherche) && !inv.includes(recherche)) {
          return false
        }
      }
      if (filtres.type && e.typeCle !== filtres.type) return false
      if (filtres.statut && nomStatut(e) !== filtres.statut) return false
      if (filtres.lieu && nomLieu(e) !== filtres.lieu) return false
      if (filtres.fabricant && nomFabricant(e) !== filtres.fabricant) return false
      return true
    })
  })

  // Options des <select>, calculées sur toutes les données (pas seulement filtrées).
  const optionsStatut = computed(() => valeursDistinctes(tousLesElements.value, nomStatut))
  const optionsLieu = computed(() => valeursDistinctes(tousLesElements.value, nomLieu))
  const optionsFabricant = computed(() => valeursDistinctes(tousLesElements.value, nomFabricant))

  function reinitialiser() {
    Object.assign(filtres, filtresVides())
  }

  return {
    filtres,
    elementsFiltres,
    optionsStatut,
    optionsLieu,
    optionsFabricant,
    reinitialiser,
  }
}
