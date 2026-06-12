<script setup lang="ts">
// Page « Liste des éléments » avec recherche multi-critères.
// Réutilise les modules centraux : useParcAssets (chargement) + useFiltreParc
// (filtrage) + BarreFiltres (UI de filtres) — comme les dashboards.

import { computed, onMounted } from 'vue'
import AppSidebarFO from '@/components/layout/AppSidebarFO.vue'
import BarreFiltres from '@/components/BarreFiltres.vue'
import { useParcAssets } from '@/composables/useParcAssets'
import {
  useFiltreParc,
  nomStatut,
  nomLieu,
  nomFabricant,
  nomUtilisateur,
  nomModele,
  numeroInventaire,
} from '@/composables/useFiltreParc'
import { TYPES_PARC } from '@/config/parc'
import { creerLogger } from '@/utils/pageLogger'

const log = creerLogger('Liste éléments')

const { groupes, loading, error, chargerParc } = useParcAssets()
const { filtres, elementsFiltres, optionsStatut, optionsLieu, optionsFabricant, reinitialiser } =
  useFiltreParc(groupes)

// Options du filtre type (depuis la config centrale du parc).
const optionsType = TYPES_PARC.map((t) => ({ valeur: t.cle, label: t.label }))

// Champs de la barre de filtres (statut/lieu/fabricant sont dynamiques).
const champsFiltres = computed(() => [
  { cle: 'recherche', label: 'Nom ou n° inventaire', type: 'texte' as const },
  { cle: 'type', label: 'Type', type: 'select' as const, options: optionsType },
  {
    cle: 'statut',
    label: 'Statut',
    type: 'select' as const,
    options: optionsStatut.value.map((s) => ({ valeur: s, label: s })),
  },
  {
    cle: 'lieu',
    label: 'Lieu',
    type: 'select' as const,
    options: optionsLieu.value.map((l) => ({ valeur: l, label: l })),
  },
  {
    cle: 'fabricant',
    label: 'Fabricant',
    type: 'select' as const,
    options: optionsFabricant.value.map((f) => ({ valeur: f, label: f })),
  },
  { cle: 'utilisateur', label: 'Utilisateur', type: 'texte' as const },
])

// Total tous types confondus (avant filtre).
const totalAssets = computed(() => {
  let total = 0
  for (const g of groupes.value) total += g.elements.length
  return total
})

onMounted(async () => {
  log.info('Chargement du parc…')
  await chargerParc()
  if (error.value) {
    log.erreur('Échec du chargement', error.value)
  } else {
    log.succes(`${totalAssets.value} élément(s) chargé(s)`)
  }
})

// Helpers d'affichage : '—' si vide (réutilisent les helpers centraux).
function afficher(valeur: string): string {
  return valeur || '—'
}
</script>

<template>
  <AppSidebarFO />
  <main>
    <h1>Liste des éléments</h1>

    <p v-if="loading">Chargement…</p>
    <p v-if="error" class="message-erreur">{{ error }}</p>

    <div v-if="!loading && !error">
      <BarreFiltres :modele="filtres" :champs="champsFiltres" @reset="reinitialiser" />

      <p>
        <strong>{{ elementsFiltres.length }}</strong> / {{ totalAssets }} élément(s)
      </p>

      <table border="1" cellpadding="4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Nom</th>
            <th>Statut</th>
            <th>Lieu</th>
            <th>Utilisateur</th>
            <th>Fabricant</th>
            <th>Modèle</th>
            <th>N° inventaire</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="elementsFiltres.length === 0">
            <td colspan="9">Aucun élément trouvé</td>
          </tr>
          <tr v-for="row in elementsFiltres" :key="`${row.typeCle}-${row.id}`">
            <td>{{ row.id }}</td>
            <td>{{ row.typeLabel }}</td>
            <td>{{ afficher(row.name ?? '') }}</td>
            <td>{{ afficher(nomStatut(row)) }}</td>
            <td>{{ afficher(nomLieu(row)) }}</td>
            <td>{{ afficher(nomUtilisateur(row)) }}</td>
            <td>{{ afficher(nomFabricant(row)) }}</td>
            <td>{{ afficher(nomModele(row)) }}</td>
            <td>{{ afficher(numeroInventaire(row)) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<style scoped></style>
