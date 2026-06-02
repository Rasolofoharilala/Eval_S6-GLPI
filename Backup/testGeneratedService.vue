<script setup lang="ts">
import { onMounted } from 'vue'
import { getUsers } from '@/services/generated/userService'
import { getTickets } from '@/services/generated/ticketService'
import { getComputers } from '@/services/generated/computerService'

onMounted(async () => {
  const users = await getUsers()
  console.log('USERS:', users)

  const tickets = await getTickets()
  console.log('TICKETS:', tickets)

  const computers = await getComputers()
  console.log('COMPUTERS:', computers)
})
</script>

<template>
  <main>
    <h1>Back Office GLPI</h1>
  </main>
</template>