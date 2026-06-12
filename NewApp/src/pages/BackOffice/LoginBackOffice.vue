<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login, CODE_ACCES } from '@/auth/authService'
import { creerLogger } from '@/utils/pageLogger'

const log = creerLogger('Connexion')

const router = useRouter()

// Le code d'accès est pré-rempli (J1 : « mettre par défaut sur le formulaire »).
const form = ref({
  password: CODE_ACCES,
})

const error = ref('')

function handleSubmit() {
  const success = login(form.value.password)

  if (!success) {
    error.value = 'Code incorrect'
    log.attention('Mot de passe incorrect')
    return
  }

  error.value = ''
  log.succes('Connexion réussie → /accueil')
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
