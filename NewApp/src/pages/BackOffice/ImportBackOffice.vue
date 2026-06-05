<template>
  <AppSidebar />

  <h1>Page d'import</h1>

  <div>
    <h2>Parc Informatique</h2>

    <input
      type="file"
      accept=".csv"
      @change="handleFileChange"
    >
  </div>

  <div>
    <h2>Aperçu</h2>

    <p v-if="selectedFileName">
      Fichier sélectionné : {{ selectedFileName }}
    </p>

    <p v-else>
      Aucun fichier sélectionné.
    </p>
  </div>

  <div>
    <button type="button">
      Importer
    </button>

    <button type="button">
      Tout importer
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'

const selectedFileName = ref<string>('')

async function handleFileChange(event: Event) {
  const input = event.target as HTMLInputElement

  const file = input.files?.[0]

  if (!file) {
    selectedFileName.value = ''
    return
  }

  selectedFileName.value = file.name

  const csvContent = await file.text()

  console.log(csvContent)


}
</script>

<style scoped>
</style>