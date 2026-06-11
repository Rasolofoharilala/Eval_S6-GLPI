<script setup lang="ts">
import { ref } from 'vue'
import { RESETTABLE_ENDPOINTS } from '@/reset/resetEndpointPolicy'
import { resetSelectedEndpoints, type ResetResult } from '@/reset/resetService'
import { creerLogger } from '@/utils/pageLogger'
import { messageErreur } from '@/utils/messageErreur'

import AppSidebar from '@/components/layout/AppSidebar.vue'

const log = creerLogger('Réinitialisation Page')

// ─── État de la page ───
const selectedEndpoints = ref<string[]>([])
const results = ref<ResetResult[]>([])
const enCours = ref(false)
const erreur = ref('')

// ─── Lance la suppression sur une liste d'endpoints (avec confirmation) ───
async function lancerReset(endpoints: string[]) {
  erreur.value = ''

  // Sécurité : rien de coché → on prévient et on ne fait rien
  if (endpoints.length === 0) {
    erreur.value = 'Aucun endpoint sélectionné.'
    log.attention('Réinitialisation annulée : aucun endpoint sélectionné')
    return
  }

  // Sécurité : confirmation obligatoire car la suppression est définitive
  const confirme = window.confirm(
    `Supprimer définitivement les éléments de ${endpoints.length} endpoint(s) ? Cette action est irréversible.`
  )
  if (!confirme) {
    return
  }

  enCours.value = true
  log.info(`Lancement de la réinitialisation : ${endpoints.join(', ')}`)

  try {
    results.value = await resetSelectedEndpoints(endpoints)

    // Totaux pour le log de fin
    let totalSupprimes = 0
    let totalEchecs = 0
    for (const result of results.value) {
      totalSupprimes += result.deleted
      totalEchecs += result.failed
    }
    log.succes(`Réinitialisation terminée : ${totalSupprimes} supprimé(s), ${totalEchecs} échec(s)`)
  } catch (err) {
    erreur.value = messageErreur(err)
    log.erreur('Échec de la réinitialisation', err)
  } finally {
    enCours.value = false
  }
}

async function reset() {
  await lancerReset(selectedEndpoints.value)
}

async function resetAll() {
  // On vide TOUS les endpoints autorisés
  const tous: string[] = []
  for (const item of RESETTABLE_ENDPOINTS) {
    tous.push(item.endpoint)
  }
  await lancerReset(tous)
}
</script>

<template>
  <AppSidebar />

  <main>
    <h1>Réinitialisation GLPI</h1>

    <button :disabled="enCours" @click="reset">
      {{ enCours ? 'Suppression en cours…' : 'Réinitialiser' }}
    </button>
    <button :disabled="enCours" @click="resetAll">
      {{ enCours ? 'Suppression en cours…' : 'Tout réinitialiser' }}
    </button>

    <p v-if="erreur" style="color: red">{{ erreur }}</p>

    <div v-if="results.length > 0">
      <h2>Résultats</h2>

      <ul>
        <li v-for="result in results" :key="result.endpoint">
          <strong>{{ result.endpoint }}</strong>

          <span v-if="result.success">
            — OK — supprimés : {{ result.deleted }} / {{ result.total }}
          </span>

          <span v-else> — Erreur — {{ result.error }} </span>

          <span v-if="result.protected > 0"> — protégés : {{ result.protected }}</span>

          <span v-if="result.failed > 0" style="color: red"> — échecs : {{ result.failed }}</span>
        </li>
      </ul>
    </div>

    <ul>
      <li v-for="item in RESETTABLE_ENDPOINTS" :key="item.endpoint">
        <label>
          <input v-model="selectedEndpoints" type="checkbox" :value="item.endpoint" />

          {{ item.endpoint }}
        </label>
      </li>
    </ul>

    <h2>Endpoints réinitialisables</h2>

    <table border="1" cellpadding="6">
      <thead>
        <tr>
          <th>endpoint</th>
          <th>deleteTarget</th>
          <th>category</th>
          <th>reason</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in RESETTABLE_ENDPOINTS" :key="item.endpoint">
          <td>{{ item.endpoint }}</td>
          <td>{{ item.deleteTarget }}</td>
          <td>{{ item.category }}</td>
          <td>{{ item.reason }}</td>
        </tr>
      </tbody>
    </table>
  </main>
</template>
