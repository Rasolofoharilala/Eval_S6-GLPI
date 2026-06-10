<template>
  <AppSidebar />
  <h1>Stockage: couleur</h1>
  <p>Pour personnaliser les 3 couleurs de fond du tableau kanban</p>

  <form @submit.prevent="stockageCouleur" method="post">
    <div class="">
      <label for="Couleur1">Couleur status 1: </label>
      <input type="color" v-model="couleur1" id="Couleur1" />
    </div>
    <div class="">
      <label for="Couleur2">Couleur status 2: </label>
      <input type="color" v-model="couleur2" id="Couleur2" />
    </div>
    <div class="">
      <label for="Couleur3">Couleur status 3: </label>
      <input type="color" v-model="couleur3" id="Couleur3" />
    </div>
    <input type="submit" value="Enregistrer">
  </form>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'

const couleur1: string = ref("") 
const couleur2: string = ref("") 
const couleur3: string = ref("") 

const stockageCouleur = () => {
    console.log("Couleur recuperer: ");
    console.log(couleur1.value);
    console.log(couleur2.value);
    console.log(couleur3.value);
}

</script>
<style scoped></style>
