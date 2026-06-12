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
  <div class="login-page">
    <div class="login-card">
      <h1>Back Office</h1>
      <p class="sous-titre">Saisissez le code d'accès</p>

      <form @submit.prevent="handleSubmit">
        <label for="passwordInput">Code d'accès</label>
        <input id="passwordInput" v-model="form.password" type="password" />

        <button type="submit">Connexion</button>
        <p v-if="error" class="message-erreur">{{ error }}</p>
      </form>

      <button class="lien-fo" @click="redirectFrontOffice">Aller au Front Office →</button>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
.login-card {
  width: 320px;
  padding: 28px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  text-align: center;
}
.login-card h1 {
  margin: 0 0 4px;
}
.sous-titre {
  margin: 0 0 18px;
  color: #6b7280;
}
.login-card form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: left;
}
.lien-fo {
  margin-top: 16px;
  background: transparent;
  color: #2563eb;
  border: none;
}
</style>
