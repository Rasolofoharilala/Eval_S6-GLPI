<template>
  <h1>Accueil</h1>  
  
</template>

<script setup lang="ts">
import { glpiConfig } from '@/api/glpiConfig'
import { generateToken } from '@/api/tokenManager'

console.log(glpiConfig)

generateToken().then(token => {
  console.log('TOKEN GLPI:', token)
})

</script>

<style scoped>
</style>