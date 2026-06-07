<template>
  <AppSidebar />

  <main>
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

      <p v-if="csvRows.length > 0">
        {{ csvRows.length }} ligne(s) détectée(s).
      </p>

      <ul v-if="csvRows.length > 0">
        <li
          v-for="row in csvRows"
          :key="row.inventory_number"
        >
          {{ row.name }} — {{ row.item_type }} — {{ row.inventory_number }}
        </li>
      </ul>
    </div>

    <div>
      <button
        type="button"
        :disabled="csvRows.length === 0 || loading"
        @click="handleImport"
      >
        {{ loading ? 'Importation...' : 'Importer' }}
      </button>
    </div>

    <div v-if="importResults.length > 0">
      <h2>Résultats</h2>

      <ul>
        <li
          v-for="result in importResults"
          :key="result.name"
        >
          <strong>{{ result.name }}</strong>

          <span v-if="result.success">
            — Importé
          </span>

          <span v-else>
            — Erreur : {{ result.error }}
          </span>
        </li>
      </ul>
    </div>
    <div v-if="importResults.length > 0">
  <h2>Résultats</h2>

  <ul>
    <li
      v-for="result in importResults"
      :key="result.name"
    >
      <strong>{{ result.name }}</strong>

      <span v-if="result.skipped">
        — Déjà existant, ignoré
      </span>

      <span v-else-if="result.success">
        — Importé
      </span>

      <span v-else>
        — Erreur : {{ result.error }}
      </span>
    </li>
  </ul>
</div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'

import { parseCsvFile } from '@/services/csv/csvParser'
import { importAssetRows } from '@/services/import/assetImportService'

import type {
  AssetCsvRow,
  ImportResult,
} from '@/services/import/assetImportTypes'

const selectedFileName = ref('')
const csvRows = ref<AssetCsvRow[]>([])
const importResults = ref<ImportResult[]>([])
const loading = ref(false)

async function handleFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]

  if (!file) {
    selectedFileName.value = ''
    csvRows.value = []
    importResults.value = []
    return
  }

  selectedFileName.value = file.name
  importResults.value = []

  const result = await parseCsvFile(file)

  csvRows.value = result.rows as AssetCsvRow[]

  console.log('Headers:', result.headers)
  console.log('Rows:', csvRows.value)
}

async function handleImport() {
  if (csvRows.value.length === 0) {
    console.log('Aucune donnée à importer')
    return
  }

  loading.value = true
  importResults.value = []

  try {
    importResults.value = await importAssetRows(csvRows.value)

    console.log('Résultat import:', importResults.value)
  } catch (error) {
    console.error('Erreur pendant l’import', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
</style>
