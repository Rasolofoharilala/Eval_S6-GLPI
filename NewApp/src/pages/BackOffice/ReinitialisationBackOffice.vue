<template>
    <h1>Reinitialisation de base de donnees</h1>

    <label for="buttonResetSQLite">Reinitialiser la base SQLite</label>
    <button @click="resetSQLite" id="buttonResetSQLite">Reinitialiser</button>

    <label for="buttonResetGLPI">Reinitialiser la base GLPI</label>
    <button @click="resetGLPI" id="buttonResetGLPI">Reinitialiser</button>

</template>
<script setup lang="ts">

    import { deleteDatabase } from '@/services/sqliteService.ts'

    const resetSQLite = () => {
        console.log("resetSQLite")
        deleteDatabase()
    }

    const resetGLPI = () => {
        console.log("resetGLPI")
    }

</script>
<style scoped>

</style>