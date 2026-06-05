<script setup lang="ts">
import { useRouter } from 'vue-router'
import { logout } from '@/auth/authService'

const router = useRouter()

function handleLogout() {
  logout()
  router.replace('/login')
}
</script>

<template>
  <button type="button" @click="handleLogout">
    Déconnexion
  </button>
</template>