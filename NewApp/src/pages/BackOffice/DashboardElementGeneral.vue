<script setup lang="ts">
import { onMounted } from 'vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import { useComputers } from '@/composables/generated/useComputers'

const { computers, loadComputers } = useComputers()

onMounted(async () => {
  await loadComputers()
  console.log("Nombre d'ordinateurs:", computers.value.length)
})

// const detailComputers = (idComputer: number):void  => {
//     console.log(`Id selectionner: ${idComputer}`);
// }

</script>

<template>
  <AppSidebar />
  <h1>DashBoard: le nombre d’éléments général, avec détails par type</h1>

  <div>
    
  </div>
</template>

<style scoped>
</style>
