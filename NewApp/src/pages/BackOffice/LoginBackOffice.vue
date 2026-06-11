<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/auth/authService'

const router = useRouter()

const form = ref({
  password: 'pass',
})

const error = ref('')

function handleSubmit() {
  const success = login(form.value.password)

  if (!success) {
    error.value = 'Code incorrect'
    return
  }

  error.value = ''
  router.replace('/accueil')
}

const redirectFrontOffice = () => {
  router.replace('/accueilFrontOffice')
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <label for="passwordInput">Mot de passe :</label>

    <input id="passwordInput" v-model="form.password" type="password" />

    <button type="submit">Connexion</button>

    <p v-if="error" style="color: red">{{ error }}</p>
  </form>
  <button @click="redirectFrontOffice">Front office</button>
</template>
