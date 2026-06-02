<template>
  <form @submit.prevent="submited_value">
    <label for="utilisateurInput">Utilisateur: </label>
    <input type="text" v-model="form.nom" id="utilisateurInput" />

    <label for="passwordInput">Mot de passe: </label>
    <input type="password" v-model="form.password" id="passwordInput" />

    <button>Connexion</button>
  </form>
</template>
<script setup lang="ts">
import { ref, readonly } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref<{ nom: string; password: string }>({
  nom: '',
  password: '',
})

const default_form = readonly<{ nom: string; password: string }>({
  nom: 'util',
  password: 'pass',
})

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const verification = async () => {
  if (default_form.nom !== form.value.nom) {
    console.log("L'utilisateur est introuvable")
    return
  }

  console.log('Utilisateur trouvé')

  if (default_form.password !== form.value.password) {
    console.log('Mot de passe incorrect')
    return
  }

  console.log('Mot de passe correct')
  console.log('Vous serez redirigé dans quelques secondes')

  await sleep(5000)

  router.replace('/accueil')
}

const submited_value = () => {
  console.log('=== Donnée insérée ===')
  console.log('Nom: ' + form.value.nom)
  console.log('Mot de passe: ' + form.value.password)

  verification()
}
</script>
<style scoped></style>
