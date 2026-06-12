<template>
  <AppSidebar />

  <main>
    <h1>Accueil</h1>
    <RouterLink to="/reinitialisationBase">Reinitialisation</RouterLink>
  </main>
</template>
<script setup lang="ts">
import AppSidebar from '@/components/layout/AppSidebar.vue'
</script>
<style scoped></style>
