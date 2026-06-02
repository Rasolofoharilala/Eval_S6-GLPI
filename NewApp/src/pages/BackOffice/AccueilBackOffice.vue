<template>
  <h1>Accueil</h1>  
  
</template>

<script setup lang="ts">
import { glpiConfig } from '@/api/glpiConfig'
import { generateToken } from '@/api/tokenManager'
import { httpClient } from '@/api/httpClient'

console.log(glpiConfig)

generateToken().then(token => {
  console.log('TOKEN GLPI:', token)
})

async function testApi() {
  const response = await httpClient.get('/Administration/User/Me')
  console.log(response.data)
}

testApi()

</script>

<style scoped>
</style>