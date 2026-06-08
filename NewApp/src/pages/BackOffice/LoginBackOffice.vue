<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/auth/authService'

const router = useRouter()

const form = ref({
  password: 'pass',
})

function handleSubmit() {
  const success = login(form.value.password)

  if (!success) {
    console.log('Mot de passe incorrect')
    return
  }

  router.replace('/accueil')
}

const redirectFrontOffice = () => {
  console.log('Redirect on')
  router.replace('/accueilFrontOffice')
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <label for="passwordInput">Mot de passe :</label>

    <input id="passwordInput" v-model="form.password" type="password" />

    <button type="submit">Connexion</button>
  </form>
  <button @click="redirectFrontOffice">Front office</button>
</template>
