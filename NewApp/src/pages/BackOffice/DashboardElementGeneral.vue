<script setup lang="ts">
import AppSidebar from '@/components/layout/AppSidebar.vue'
import BarreFiltres from '@/components/BarreFiltres.vue'
import { computed, onMounted } from 'vue'

import { useParcAssets } from '@/composables/useParcAssets'
import { useFiltreParc, type ElementParc } from '@/composables/useFiltreParc'
import { TYPES_PARC } from '@/config/parc'
import { creerLogger } from '@/utils/pageLogger'

const log = creerLogger('Dashboard Éléments')

// ─── Le composable central charge les 5 types du parc ───
const { groupes, loading, error, chargerParc } = useParcAssets()

// ─── Filtres (recherche, type, statut, lieu, fabricant) ───
const { filtres, elementsFiltres, optionsStatut, optionsLieu, optionsFabricant, reinitialiser } =
  useFiltreParc(groupes)

// Options du select "type" : construites depuis la config centrale du parc.
const optionsType = TYPES_PARC.map((t) => ({ valeur: t.cle, label: t.label }))

// Les champs de la barre de filtres (statut/lieu/fabricant sont dynamiques).
const champsFiltres = computed(() => [
  { cle: 'recherche', label: 'Recherche (nom ou n° inventaire)', type: 'texte' as const },
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
])

// Une ligne de comptage affichée dans les tableaux.
type LigneCompte = { label: string; nombre: number }

// ─── Total affiché = nombre d'éléments filtrés ───
const totalGeneral = computed(() => elementsFiltres.value.length)

// ─── Nombre d'éléments par type (sur la liste filtrée) ───
const comptesParType = computed<LigneCompte[]>(() => {
  const compteur: Record<string, number> = {}
  for (const e of elementsFiltres.value) {
    compteur[e.typeLabel] = (compteur[e.typeLabel] ?? 0) + 1
  }
  return compteurVersLignes(compteur)
})

// Statut lisible d'un élément (ou "Inconnu" si absent).
function nomStatut(element: ElementParc): string {
  return element.status?.name ?? 'Inconnu'
}

// Transforme un compteur { étiquette: nombre } en lignes triées par effectif.
function compteurVersLignes(compteur: Record<string, number>): LigneCompte[] {
  const lignes: LigneCompte[] = []
  for (const etiquette of Object.keys(compteur)) {
    lignes.push({ label: etiquette, nombre: compteur[etiquette] ?? 0 })
  }
  lignes.sort((a, b) => b.nombre - a.nombre)
  return lignes
}

// ─── Répartition par statut, sur la liste filtrée ───
const comptesParStatut = computed<LigneCompte[]>(() => {
  const compteur: Record<string, number> = {}
  for (const e of elementsFiltres.value) {
    const s = nomStatut(e)
    compteur[s] = (compteur[s] ?? 0) + 1
  }
  return compteurVersLignes(compteur)
})

// ─── Répartition par statut, détaillée par type (liste filtrée) ───
const statutsParType = computed<{ label: string; statuts: LigneCompte[] }[]>(() => {
  // On regroupe les éléments filtrés par leur type.
  const parType: Record<string, ElementParc[]> = {}
  for (const e of elementsFiltres.value) {
    const liste = parType[e.typeLabel] ?? []
    liste.push(e)
    parType[e.typeLabel] = liste
  }

  const resultats: { label: string; statuts: LigneCompte[] }[] = []
  for (const label of Object.keys(parType)) {
    const elements = parType[label] ?? []
    const compteur: Record<string, number> = {}
    for (const e of elements) {
      const s = nomStatut(e)
      compteur[s] = (compteur[s] ?? 0) + 1
    }
    resultats.push({ label, statuts: compteurVersLignes(compteur) })
  }
  return resultats
})

onMounted(async () => {
  log.info('Chargement du parc...')
  await chargerParc()

  if (error.value) {
    log.erreur('Erreur pendant le chargement du parc', error.value)
    return
  }

  const details: string[] = []
  for (const groupe of groupes.value) {
    details.push(groupe.label + ': ' + groupe.elements.length)
  }
  log.succes(elementsFiltres.value.length + ' éléments chargés — ' + details.join(', '))
})
</script>

<template>
  <AppSidebar />

  <main>
    <h1>Dashboard: element general</h1>

    <p>Nombre général d’éléments avec détails par type et par statut.</p>

    <p v-if="loading">Chargement...</p>
    <p v-if="error">Erreur : {{ error }}</p>

    <div v-if="!loading && !error">
      <BarreFiltres :modele="filtres" :champs="champsFiltres" @reset="reinitialiser" />

      <section>
        <h2>Vue globale</h2>
        <p>
          <strong>Total affiché : {{ totalGeneral }}</strong>
        </p>
        <table border="1" cellpadding="6">
          <thead>
            <tr>
              <th>Type</th>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ligne in comptesParType" :key="ligne.label">
              <td>{{ ligne.label }}</td>
              <td>{{ ligne.nombre }}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>Répartition par statut (tous types)</h2>
        <table border="1" cellpadding="6">
          <thead>
            <tr>
              <th>Statut</th>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ligne in comptesParStatut" :key="ligne.label">
              <td>{{ ligne.label }}</td>
              <td>{{ ligne.nombre }}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section v-for="groupe in statutsParType" :key="groupe.label">
        <h2>{{ groupe.label }} — par statut</h2>
        <table border="1" cellpadding="6">
          <thead>
            <tr>
              <th>Statut</th>
              <th>Nombre</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ligne in groupe.statuts" :key="ligne.label">
              <td>{{ ligne.label }}</td>
              <td>{{ ligne.nombre }}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </main>
</template>

<style scoped></style>
