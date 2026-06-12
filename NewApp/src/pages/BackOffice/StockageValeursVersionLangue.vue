<script setup lang="ts">
import { onMounted, ref } from 'vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import {
  getLangues,
  creerLangue,
  majLangue,
  supprimerLangue,
  type Langue,
} from '@/services/langueService'
import { creerLogger } from '@/utils/pageLogger'
import { messageErreur } from '@/utils/messageErreur'

// CRUD des langues du Kanban : chaque langue a 3 statuts (Nouveau, In progress,
// Terminé) avec un libellé et une couleur PERSONNALISABLES par langue.
// Stocké en SQLite via le backend Spring Boot (port 8080).

const log = creerLogger('Stockage Langues')

const langues = ref<Langue[]>([])
const loading = ref(false)
const error = ref('')
const success = ref('')

// Formulaire d'ajout d'une nouvelle langue.
const nouvelleLangue = ref({ code: '', nom: '' })

async function charger() {
  loading.value = true
  error.value = ''
  log.info('Chargement des langues…')
  try {
    langues.value = await getLangues()
    log.succes(`${langues.value.length} langue(s) chargée(s)`)
  } catch (err) {
    error.value =
      'Backend injoignable. Lancez-le avec : cd Backend && mvn spring-boot:run (port 8080).'
    log.erreur('Échec du chargement des langues', err)
  } finally {
    loading.value = false
  }
}

// ─── CRÉER une langue ───
async function ajouter() {
  error.value = ''
  success.value = ''
  if (!nouvelleLangue.value.code.trim() || !nouvelleLangue.value.nom.trim()) {
    error.value = 'Code et nom obligatoires.'
    return
  }
  try {
    await creerLangue(nouvelleLangue.value.code.trim(), nouvelleLangue.value.nom.trim())
    nouvelleLangue.value = { code: '', nom: '' }
    success.value = 'Langue ajoutée.'
    log.succes('Langue créée')
    await charger()
  } catch (err) {
    error.value = messageErreur(err)
    log.erreur('Échec de la création', err)
  }
}

// ─── MODIFIER une langue (nom + libellés + couleurs de ses statuts) ───
async function enregistrer(langue: Langue) {
  error.value = ''
  success.value = ''
  try {
    await majLangue(langue.id, langue.nom, langue.statuts)
    success.value = `Langue « ${langue.nom} » enregistrée.`
    log.succes(`Langue ${langue.code} enregistrée`)
  } catch (err) {
    error.value = messageErreur(err)
    log.erreur('Échec de la sauvegarde', err)
  }
}

// ─── SUPPRIMER une langue ───
async function supprimer(langue: Langue) {
  const ok = window.confirm(`Supprimer la langue « ${langue.nom} » ?`)
  if (!ok) return
  error.value = ''
  success.value = ''
  try {
    await supprimerLangue(langue.id)
    success.value = `Langue « ${langue.nom} » supprimée.`
    log.succes(`Langue ${langue.code} supprimée`)
    await charger()
  } catch (err) {
    error.value = messageErreur(err)
    log.erreur('Échec de la suppression', err)
  }
}

// Applique la couleur du 1er statut à tous les statuts de la langue
// (cas « même couleur partout »). L'utilisateur enregistre ensuite.
function memeCouleurPartout(langue: Langue) {
  const couleur = langue.statuts[0]?.color ?? '#dbeafe'
  for (const statut of langue.statuts) {
    statut.color = couleur
  }
}

onMounted(charger)
</script>

<template>
  <AppSidebar />

  <main>
    <h1>Langues du Kanban</h1>
    <p>
      Chaque langue définit le <strong>nom</strong> et la <strong>couleur</strong> de chaque
      statut (Nouveau, In progress, Terminé). Tout est personnalisable : même couleur partout,
      une couleur par statut, ou des couleurs différentes selon la langue. Stocké dans
      <strong>SQLite</strong> via le backend Spring Boot.
    </p>

    <p v-if="loading">Chargement…</p>
    <p v-if="error" style="color: red">{{ error }}</p>
    <p v-if="success" style="color: green">{{ success }}</p>

    <!-- ─── Ajouter une langue ─── -->
    <section>
      <h2>Ajouter une langue</h2>
      <form @submit.prevent="ajouter">
        <label>
          Code
          <input v-model="nouvelleLangue.code" type="text" placeholder="ex : en" />
        </label>
        <label>
          Nom
          <input v-model="nouvelleLangue.nom" type="text" placeholder="ex : Anglais" />
        </label>
        <button type="submit">Ajouter</button>
      </form>
    </section>

    <!-- ─── Une carte par langue ─── -->
    <section v-for="langue in langues" :key="langue.id" class="carte-langue">
      <h2>
        {{ langue.nom }} <small>({{ langue.code }})</small>
      </h2>

      <label>
        Nom de la langue
        <input v-model="langue.nom" type="text" />
      </label>

      <table border="1" cellpadding="6">
        <thead>
          <tr>
            <th>Statut</th>
            <th>Libellé</th>
            <th>Couleur</th>
            <th>Aperçu</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="statut in langue.statuts" :key="statut.statusKey">
            <td>{{ statut.statusKey }}</td>
            <td><input v-model="statut.label" type="text" /></td>
            <td><input v-model="statut.color" type="color" /></td>
            <td>
              <span
                :style="`display:inline-block;padding:4px 16px;border-radius:6px;background:${statut.color}`"
              >
                {{ statut.label }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <p>
        <button type="button" @click="enregistrer(langue)">Enregistrer</button>
        <button type="button" @click="memeCouleurPartout(langue)">
          Même couleur pour tous les statuts
        </button>
        <button type="button" style="color: red" @click="supprimer(langue)">Supprimer</button>
      </p>
    </section>
  </main>
</template>

<style scoped>
.carte-langue {
  margin-top: 16px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
form label,
.carte-langue > label {
  margin-right: 12px;
}
</style>
