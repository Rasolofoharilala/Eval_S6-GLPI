<script setup lang="ts">
// Page « Créer un ticket » : enveloppe fine autour du formulaire partagé.
// Toute la logique de champs est dans FormulaireTicket.vue ; ici on ne fait
// qu'appeler creerTicketComplet à la soumission.

import { ref } from 'vue'
import AppSidebarFO from '@/components/layout/AppSidebarFO.vue'
import FormulaireTicket from '@/components/FormulaireTicket.vue'
import { creerTicketComplet, type DonneesTicket } from '@/services/ticketActions'
import { creerLogger } from '@/utils/pageLogger'
import { messageErreur } from '@/utils/messageErreur'

const log = creerLogger('Création ticket')

const enChargement = ref(false)
const erreur = ref('')
const succes = ref('')
const formulaire = ref<InstanceType<typeof FormulaireTicket> | null>(null)

async function creer(donnees: DonneesTicket) {
  enChargement.value = true
  erreur.value = ''
  succes.value = ''
  log.info(`Création du ticket « ${donnees.name} »…`)
  try {
    const id = await creerTicketComplet(donnees)
    const nbElements = donnees.elements?.length ?? 0
    succes.value =
      `Ticket créé (ID ${id})` + (nbElements ? ` — ${nbElements} élément(s) associé(s).` : '.')
    log.succes(`Ticket ${id} créé`)
    formulaire.value?.reinitialiser()
  } catch (err) {
    erreur.value = messageErreur(err)
    log.erreur('Échec de la création', err)
  } finally {
    enChargement.value = false
  }
}
</script>

<template>
  <AppSidebarFO />

  <main>
    <h1>Créer un ticket</h1>

    <p v-if="erreur" class="message-erreur">{{ erreur }}</p>
    <p v-if="succes" class="message-succes">{{ succes }}</p>

    <FormulaireTicket ref="formulaire" :en-chargement="enChargement" @submit="creer" />
  </main>
</template>

<style scoped></style>
