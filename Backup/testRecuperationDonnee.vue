<script setup lang="ts">
import { onMounted } from 'vue'
import { useUsers } from '@/composables/generated/useUsers'
import { useTickets } from '@/composables/generated/useTickets'
import { useComputers } from '@/composables/generated/useComputers'
import { testDatabase } from '@/services/sqliteService'
const {
  users,
  loading: usersLoading,
  error: usersError,
  loadUsers,
} = useUsers()

const {
  tickets,
  loadTickets,
} = useTickets()

const {
  computers,
  loadComputers,
} = useComputers()

onMounted(async () => {
  await loadUsers()
  await loadTickets()
  await loadComputers()

  const db = await testDatabase()

  console.log(db)

  // const result = db.exec("SELECT name FROM sqlite_master WHERE type='table'")
  // console.log(result)

  // const result = db.exec("SELECT * FROM users")
  // console.log(result)

  const result = db.exec("SELECT * FROM users")

if (result.length > 0) {
  const columns = result[0].columns
  const values = result[0].values

  const users = values.map((row) => {
    return Object.fromEntries(
      columns.map((column, index) => [column, row[index]])
    )
  })

  console.log(users)
}

})
</script>

<template>
  <main>
    <h1>Back Office GLPI</h1>

    <p v-if="usersLoading">Chargement...</p>
    <p v-if="usersError">{{ usersError }}</p>

    <h2>Utilisateurs</h2>
    <pre>{{ users }}</pre>

    <h2>Tickets</h2>
    <pre>{{ tickets }}</pre>

    <h2>Ordinateurs</h2>
    <pre>{{ computers }}</pre>
  </main>
</template>