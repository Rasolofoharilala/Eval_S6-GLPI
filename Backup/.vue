<template>
  <form @submit.prevent="helloWorld">
    <select v-model="form.id">
      <option v-for="(temp, index) in type_connection" :key="index" :value="index">
        {{ index }} {{ temp }}
      </option>
    </select>

    <p>Timer: <input type="checkbox" v-model="isTimerActive" /></p>

    <div v-for="temp in liste_departement" :key="temp.id">
        <input type="checkbox" :id="'dept-' + temp.id" :value="temp.nom" v-model="checkedDepartements" />
        <label :for="'dept-' + temp.id">{{ temp.nom }}</label>
    </div> 

    <input type="text" v-model="form.nom" placeholder="Nom" />
    <input type="password" v-model="form.mot_de_passe" placeholder="Mot de passe" />
    <button type="submit">Connexion</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const type_connection: string[] = ['Employer', 'Admin']

interface Departement {
    id: number,
    nom: string
}

const liste_departement: Departement[] = [
    { id: 1, nom: "Informatique" },
    { id: 2, nom: "Ressources humaines" },
    { id: 3, nom: "Securite" }
]

// Variables réactives
const checkedDepartements = ref<string[]>([]) 
const isTimerActive = ref(false) // Lié à la checkbox du timer

const form = ref<{
  id: number | null
  nom: string | null
  mot_de_passe: string | null
}>({
  id: null,
  nom: '',
  mot_de_passe: '',
})

// Fonction Delay
const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const timeOut = async () => {
  console.log('Début de la session de 3 secondes...')
  await delay(3000)
  console.log('Compte expiré')
}

// Fonction de soumission convertie en async pour gérer le await
const helloWorld = async () => {
  // Correction de la condition grâce au v-model
  if (isTimerActive.value) {
    await timeOut() // On attend la fin des 3 secondes avant de continuer
  }

  console.log('Hello world')
  console.log('Formulaire soumis :', form.value)
  console.log('Départements cochés :', checkedDepartements.value)
  
  // Sécurité TypeScript pour l'index
  if (form.value.id !== null) {
    console.log(`Connecté en tant que: ${type_connection[form.value.id]}`)
  }
}
</script>