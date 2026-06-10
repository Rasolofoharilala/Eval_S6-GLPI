<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import { useTickets } from '@/composables/generated/useTickets'

const { tickets, loadTickets } = useTickets()

onMounted(async () => {
  await loadTickets()
})
</script>
<template>
  <AppSidebar />
  <h1>Focus Ticket</h1>
  <pre>{{ tickets }}</pre>
</template>
<style scoped></style>
