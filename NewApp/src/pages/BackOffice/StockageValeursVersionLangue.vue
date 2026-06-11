<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import {
  getKanbanSettings,
  updateKanbanSettings,
  resetKanbanSettings,
  type KanbanSetting,
} from '@/services/kanbanSettingsService'

// Réglages du Kanban : 3 couleurs de fond + version malgache des statuts.
// Persistés dans SQLite via le backend Spring Boot (port 8080).

const settings = ref<KanbanSetting[]>([])
const loading = ref(false)
const saving = ref(false)
const error = ref('')
const success = ref('')

function messageErreur(err: unknown, fallback: string): string {
  if (axios.isAxiosError(err)) {
    return (err.response?.data as { error?: string } | undefined)?.error ?? err.message
  }
  return err instanceof Error ? err.message : fallback
}

async function charger() {
  loading.value = true
  error.value = ''
  try {
    settings.value = await getKanbanSettings()
  } catch {
    error.value =
      'Backend injoignable. Lancez-le avec : cd Backend && mvn spring-boot:run (port 8080).'
  } finally {
    loading.value = false
  }
}

async function sauvegarder() {
  saving.value = true
  error.value = ''
  success.value = ''
  try {
    settings.value = await updateKanbanSettings(
      settings.value.map((s) => ({
        statusKey: s.statusKey,
        labelFr: s.labelFr,
        labelMg: s.labelMg,
        color: s.color,
      })),
    )
    success.value = 'Réglages enregistrés dans SQLite.'
  } catch (err) {
    error.value = messageErreur(err, 'Erreur pendant la sauvegarde')
  } finally {
    saving.value = false
  }
}

async function restaurerDefauts() {
  saving.value = true
  error.value = ''
  success.value = ''
  try {
    settings.value = await resetKanbanSettings()
    success.value = 'Valeurs par défaut restaurées (vaovao, efa manao, vita).'
  } catch (err) {
    error.value = messageErreur(err, 'Erreur pendant la restauration')
  } finally {
    saving.value = false
  }
}

onMounted(charger)
</script>

<template>
  <AppSidebar />

  <main>
    <h1>Personnalisation du Kanban</h1>
    <p>
      Couleurs de fond des 3 colonnes et version <strong>malgache</strong> des noms de statut.
      Valeurs stockées dans <strong>SQLite</strong> via le backend Spring Boot
      (<code>Backend/data/newapp.db</code>, échanges JSON).
    </p>

    <p v-if="loading">Chargement…</p>
    <p v-if="error" style="color: red">{{ error }}</p>
    <p v-if="success" style="color: green">{{ success }}</p>

    <form v-if="settings.length" @submit.prevent="sauvegarder">
      <table border="1" cellpadding="6">
        <thead>
          <tr>
            <th>Colonne</th>
            <th>Nom (français)</th>
            <th>Version malgache</th>
            <th>Couleur de fond</th>
            <th>Aperçu</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="s in settings" :key="s.statusKey">
            <td>{{ s.position }}</td>
            <td><input v-model="s.labelFr" type="text" required /></td>
            <td><input v-model="s.labelMg" type="text" placeholder="ex : vaovao" required /></td>
            <td><input v-model="s.color" type="color" /></td>
            <td>
              <span
                :style="`display:inline-block;padding:4px 16px;border-radius:6px;background:${s.color}`"
              >
                {{ s.labelMg }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <p>
        <button type="submit" :disabled="saving">
          {{ saving ? 'Enregistrement…' : 'Enregistrer dans SQLite' }}
        </button>
        <button type="button" :disabled="saving" @click="restaurerDefauts">
          Restaurer les valeurs par défaut
        </button>
      </p>
    </form>
  </main>
</template>

<style scoped></style>
