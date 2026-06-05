<script setup lang="ts">
import { ref } from 'vue'
import { RESETTABLE_ENDPOINTS } from '@/reset/resetEndpointPolicy'
import { resetSelectedEndpoints } from '@/reset/resetService'

const selectedEndpoints = ref<string[]>([])
const results = ref<any[]>([])

async function reset() {
  results.value = await resetSelectedEndpoints(selectedEndpoints.value)
  console.log(results.value)
}
</script>

<template>
  <main>
    <h1>Réinitialisation GLPI</h1>

    <ul>
      <li v-for="item in RESETTABLE_ENDPOINTS" :key="item.endpoint">
        <label>
          <input
            v-model="selectedEndpoints"
            type="checkbox"
            :value="item.endpoint"
          >

          {{ item.endpoint }}
        </label>
      </li>
    </ul>

    <button @click="reset">
      Réinitialiser
    </button>

    <div v-if="results.length > 0">
      <h2>Résultats</h2>

      <ul>
        <li v-for="result in results" :key="result.endpoint">
          <strong>{{ result.endpoint }}</strong>

          <span v-if="result.success">
            — OK — supprimés : {{ result.deleted }} / {{ result.total }}
          </span>

          <span v-else>
            — Erreur — {{ result.error }}
          </span>
        </li>
      </ul>
    </div>
  </main>
</template>