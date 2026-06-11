<script setup lang="ts">
import AppSidebar from '@/components/layout/AppSidebar.vue'
import { computed, onMounted } from 'vue'

import { useParcAssets } from '@/composables/useParcAssets'
import type { AssetParc } from '@/composables/useParcAssets'
import { creerLogger } from '@/utils/pageLogger'

const log = creerLogger('Dashboard Éléments')

// ─── Le composable central charge les 5 types du parc et gère loading/error ───
const { groupes, tousLesElements, loading, error, chargerParc } = useParcAssets()

// Une ligne de comptage affichée dans les tableaux.
type LigneCompte = { label: string; nombre: number }

// ─── Nombre d'éléments par type (un groupe = un type du parc) ───
const comptesParType = computed<LigneCompte[]>(() => {
  const lignes: LigneCompte[] = []
  for (const groupe of groupes.value) {
    lignes.push({ label: groupe.label, nombre: groupe.elements.length })
  }
  return lignes
})

// ─── Total général : somme des comptes par type ───
const totalGeneral = computed(() => {
  let total = 0
  for (const ligne of comptesParType.value) {
    total = total + ligne.nombre
  }
  return total
})

// Statut lisible d'un élément (ou "Inconnu" si absent).
function nomStatut(element: AssetParc): string {
  return element.status?.name ?? 'Inconnu'
}

// Transforme un compteur { statut: nombre } en lignes triées par effectif décroissant.
function compteurVersLignes(compteur: Record<string, number>): LigneCompte[] {
  const lignes: LigneCompte[] = []
  for (const statut of Object.keys(compteur)) {
    lignes.push({ label: statut, nombre: compteur[statut] ?? 0 })
  }
  lignes.sort((a, b) => b.nombre - a.nombre)
  return lignes
}

// ─── Répartition par statut, tous types confondus ───
const comptesParStatut = computed<LigneCompte[]>(() => {
  const compteur: Record<string, number> = {}
  for (const element of tousLesElements.value) {
    const statut = nomStatut(element)
    compteur[statut] = (compteur[statut] ?? 0) + 1
  }
  return compteurVersLignes(compteur)
})

// ─── Répartition par statut, détaillée par type (on ignore les types vides) ───
const statutsParType = computed<{ label: string; statuts: LigneCompte[] }[]>(() => {
  const resultats: { label: string; statuts: LigneCompte[] }[] = []
  for (const groupe of groupes.value) {
    if (groupe.elements.length === 0) {
      continue
    }
    const compteur: Record<string, number> = {}
    for (const element of groupe.elements) {
      const statut = nomStatut(element)
      compteur[statut] = (compteur[statut] ?? 0) + 1
    }
    resultats.push({ label: groupe.label, statuts: compteurVersLignes(compteur) })
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

  // Détail par type pour le log de succès (ex : "Ordinateurs: 21, Moniteurs: 20").
  const details: string[] = []
  for (const groupe of groupes.value) {
    details.push(groupe.label + ': ' + groupe.elements.length)
  }
  log.succes(totalGeneral.value + ' éléments chargés — ' + details.join(', '))
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
      <section>
        <h2>Vue globale</h2>
        <p>
          <strong>Total général : {{ totalGeneral }}</strong>
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
