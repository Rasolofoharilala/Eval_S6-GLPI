<script setup lang="ts">
import AppSidebar from '@/components/layout/AppSidebar.vue'

const langue: string[] = ["Malagasy", "Francais"]

const listeLangue = () => {
    for (const temp of langue) {
    console.log(temp);
    }
}

</script>
<template>
  <AppSidebar />
    <h1>Stockage: version langue</h1>
    <button @click="listeLangue">Liste des langues</button>


</template>
<style scoped></style>
