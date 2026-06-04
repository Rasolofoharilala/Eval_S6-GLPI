<template>
    <h1>Reinitialisation de base de donnees</h1>

    <label for="buttonResetSQLite">Reinitialiser la base SQLite</label>
    <button @click="resetSQLite" id="buttonResetSQLite">Reinitialiser</button>

    <label for="buttonResetGLPI">Reinitialiser la base GLPI</label>
    <button @click="resetGLPI" id="buttonResetGLPI">Reinitialiser</button>

    <div class="">
        <label for="listes_tables_SQLite">Liste des tableaux dans SQLite</label>
        <ul id="listes_tables_SQLite">
            <li v-for="table in tableNames" :key="table">{{ table }}</li>
        </ul>
    </div>

</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { deleteDatabase, getTableName } from '@/services/sqliteService.ts'

const tableNames = ref<string[]>([])

onMounted(async () => {
  tableNames.value = await getTableName()
  console.log(tableNames.value)
})

const resetSQLite = async () => {
  console.log('resetSQLite')
  await deleteDatabase()

  // Recharge la liste après suppression
  tableNames.value = await getTableName()
}

const resetGLPI = () => {
  console.log('resetGLPI')
}
</script>
<style scoped>

</style>