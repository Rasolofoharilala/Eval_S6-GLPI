<template>
    <form @submit.prevent="">
        <label for="utilisateurInput">Utilisateur: </label>
        <input type="text" v-model="form.nom" id="utilisateurInput">
        
        <label for="passwordInput">Mot de passe: </label>
        <input type="password" v-model="form.password" id="passwordInput">
        
        <button>
            Connexion
        </button>
    </form>
</template>
<script setup lang="ts">
    import { ref } from 'vue'

    const form = ref<{nom: string, password: string}>({ nom: "", password:""})
    const default_form = <{nom: string, password: string}>({ nom: "admin", password:"admin"})

    if( form.value.nom === default_form.value.nom ){
        if ( form.value.password === default_form.value.password ) {
            router.replace("")
        } else {
            console.log("Mot De passe Incorrect")
        }
    } else {
        console.log("L'utilisateur n'est pas reconnues")
    }

</script>
<style scoped>
</style>