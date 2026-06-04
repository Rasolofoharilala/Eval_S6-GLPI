<script setup lang="ts">
import { AVOID_RESET_ENDPOINTS, RESETTABLE_ENDPOINTS } from '@/reset/resetEndpointPolicy'
</script>

<template>
  <main>
    <h1>Réinitialisation GLPI</h1>

    <div>
      <h2>Endpoints réinitialisables</h2>

      <ul>
        <li v-for="item in RESETTABLE_ENDPOINTS" :key="item.endpoint">
          <strong>{{ item.endpoint }}</strong>
          <span> — {{ item.category }}</span>
          <span> — {{ item.methods.join(', ') }}</span>
        </li>
      </ul>
    </div>

    <div>
      <h2>Endpoints non réinitialisables</h2>

      <ul>
        <li v-for="item in AVOID_RESET_ENDPOINTS" :key="item.endpoint">
          <strong>{{ item.endpoint }}</strong>
          <span> — {{ item.category }}</span>
          <span> — {{ item.methods.join(', ') }}</span>
        </li>
      </ul>
    </div>
  </main>
</template>
