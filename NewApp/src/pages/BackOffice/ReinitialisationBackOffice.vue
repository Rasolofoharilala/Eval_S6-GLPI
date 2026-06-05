<script setup lang="ts">
import { ref } from 'vue'
import { AVOID_RESET_ENDPOINTS, RESETTABLE_ENDPOINTS } from '@/reset/resetEndpointPolicy'
import { resetSelectedEndpoints } from '@/reset/resetService'
import AppSidebar from '@/components/layout/AppSidebar.vue'

const selectedEndpoints = ref<string[]>([])
const results = ref<any[]>([])

async function reset() {
  results.value = await resetSelectedEndpoints(selectedEndpoints.value)
  console.log(results.value)
}
</script>

<template>
  <AppSidebar />

  <main>
    <h1>Réinitialisation GLPI</h1>

    <ul>
      <li v-for="item in RESETTABLE_ENDPOINTS" :key="item.endpoint">
        <label>
          <input v-model="selectedEndpoints" type="checkbox" :value="item.endpoint" />

          {{ item.endpoint }}
        </label>
      </li>
    </ul>

    <h1>LIST RESETTABLE_ENDPOINTS:</h1>

    <table>
      <thead>
        <tr>
          <th>endpoint</th>
          <th>deleteTarget</th>
          <th>category</th>
          <th>reason</th>
          <th>methods</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in RESETTABLE_ENDPOINTS" :key="item.endpoint">
          <td>{{ item.endpoint }}</td>
          <td>{{ item.deleteTarget }}</td>
          <td>{{ item.category }}</td>
          <td>{{ item.reason }}</td>
          <td>{{ item.methods.join(', ') }}</td>
        </tr>
      </tbody>
    </table>

    <h1>LIST AVOID_RESET_ENDPOINTS:</h1>

    <table>
      <thead>
        <tr>
          <th>endpoint</th>
          <th>category</th>
          <th>reason</th>
          <th>methods</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in AVOID_RESET_ENDPOINTS" :key="item.endpoint">
          <td>{{ item.endpoint }}</td>
          <td>{{ item.category }}</td>
          <td>{{ item.reason }}</td>
          <td>{{ item.methods.join(', ') }}</td>
        </tr>
      </tbody>
    </table>

    <button @click="reset">Réinitialiser</button>

    <div v-if="results.length > 0">
      <h2>Résultats</h2>

      <ul>
        <li v-for="result in results" :key="result.endpoint">
          <strong>{{ result.endpoint }}</strong>

          <span v-if="result.success">
            — OK — supprimés : {{ result.deleted }} / {{ result.total }}
          </span>

          <span v-else> — Erreur — {{ result.error }} </span>
        </li>
      </ul>
    </div>
  </main>
</template>
