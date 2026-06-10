<script setup lang="ts">
import { ref, computed } from 'vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'

// ─── Types ───────────────────────────────────────────────────────────────────

type Couleur = {
  id: number
  label: string
  valeur: string
}

type Langue = {
  id: number
  nom: string
  code: string
}

// ─── Couleurs ─────────────────────────────────────────────────────────────────

const nextCouleurId = ref(4)

const couleurs = ref<Couleur[]>([
  { id: 1, label: 'Statut 1', valeur: '#4caf50' },
  { id: 2, label: 'Statut 2', valeur: '#ff9800' },
  { id: 3, label: 'Statut 3', valeur: '#f44336' },
])

// Sélection de couleurs
const selectionCouleurs = ref<number[]>([])
const toutSelectionnerCouleurs = computed(
  () => selectionCouleurs.value.length === couleurs.value.length
)
function toggleToutCouleurs() {
  if (toutSelectionnerCouleurs.value) {
    selectionCouleurs.value = []
  } else {
    selectionCouleurs.value = couleurs.value.map((c) => c.id)
  }
}

// Formulaire couleur (ajout / édition)
const formCouleur = ref({ label: '', valeur: '#000000' })
const editCouleurId = ref<number | null>(null)

function ajouterCouleur() {
  if (!formCouleur.value.label.trim()) return
  couleurs.value.push({
    id: nextCouleurId.value++,
    label: formCouleur.value.label.trim(),
    valeur: formCouleur.value.valeur,
  })
  formCouleur.value = { label: '', valeur: '#000000' }
}

function editerCouleur(c: Couleur) {
  editCouleurId.value = c.id
  formCouleur.value = { label: c.label, valeur: c.valeur }
}

function sauvegarderCouleur() {
  const idx = couleurs.value.findIndex((c) => c.id === editCouleurId.value)
  if (idx !== -1) {
    couleurs.value[idx].label = formCouleur.value.label.trim()
    couleurs.value[idx].valeur = formCouleur.value.valeur
  }
  annulerEditionCouleur()
}

function annulerEditionCouleur() {
  editCouleurId.value = null
  formCouleur.value = { label: '', valeur: '#000000' }
}

function supprimerCouleur(id: number) {
  couleurs.value = couleurs.value.filter((c) => c.id !== id)
  selectionCouleurs.value = selectionCouleurs.value.filter((sid) => sid !== id)
}

// Modification en groupe
const couleurGroupe = ref('#000000')
function appliquerGroupeCouleurs() {
  for (const id of selectionCouleurs.value) {
    const c = couleurs.value.find((c) => c.id === id)
    if (c) c.valeur = couleurGroupe.value
  }
  selectionCouleurs.value = []
}

// ─── Langues ──────────────────────────────────────────────────────────────────

const nextLangueId = ref(3)

const langues = ref<Langue[]>([
  { id: 1, nom: 'Malagasy', code: 'mg' },
  { id: 2, nom: 'Français', code: 'fr' },
])

// Sélection de langues
const selectionLangues = ref<number[]>([])
const toutSelectionnerLangues = computed(
  () => selectionLangues.value.length === langues.value.length
)
function toggleToutLangues() {
  if (toutSelectionnerLangues.value) {
    selectionLangues.value = []
  } else {
    selectionLangues.value = langues.value.map((l) => l.id)
  }
}

// Formulaire langue (ajout / édition)
const formLangue = ref({ nom: '', code: '' })
const editLangueId = ref<number | null>(null)

function ajouterLangue() {
  if (!formLangue.value.nom.trim()) return
  langues.value.push({
    id: nextLangueId.value++,
    nom: formLangue.value.nom.trim(),
    code: formLangue.value.code.trim(),
  })
  formLangue.value = { nom: '', code: '' }
}

function editerLangue(l: Langue) {
  editLangueId.value = l.id
  formLangue.value = { nom: l.nom, code: l.code }
}

function sauvegarderLangue() {
  const idx = langues.value.findIndex((l) => l.id === editLangueId.value)
  if (idx !== -1) {
    langues.value[idx].nom = formLangue.value.nom.trim()
    langues.value[idx].code = formLangue.value.code.trim()
  }
  annulerEditionLangue()
}

function annulerEditionLangue() {
  editLangueId.value = null
  formLangue.value = { nom: '', code: '' }
}

function supprimerLangue(id: number) {
  langues.value = langues.value.filter((l) => l.id !== id)
  selectionLangues.value = selectionLangues.value.filter((sid) => sid !== id)
}

// Modification en groupe (suffixe nom)
const suffixeGroupeLangue = ref('')
function appliquerGroupeLangues() {
  if (!suffixeGroupeLangue.value.trim()) return
  for (const id of selectionLangues.value) {
    const l = langues.value.find((l) => l.id === id)
    if (l) l.nom = suffixeGroupeLangue.value.trim()
  }
  suffixeGroupeLangue.value = ''
  selectionLangues.value = []
}

// ─── Onglet actif ─────────────────────────────────────────────────────────────

type Onglet = 'couleur' | 'langue' | 'les-deux'
const ongletActif = ref<Onglet>('les-deux')
</script>

<template>
  <AppSidebar />
  <h1>Stockage : Couleurs &amp; Langues</h1>

  <!-- Sélection du mode -->
  <div>
    <button @click="ongletActif = 'couleur'">Couleurs seulement</button>
    <button @click="ongletActif = 'langue'">Langues seulement</button>
    <button @click="ongletActif = 'les-deux'">Couleurs + Langues</button>
  </div>

  <hr />

  <!-- ═══════════════════════════ SECTION COULEURS ═══════════════════════════ -->
  <section v-if="ongletActif === 'couleur' || ongletActif === 'les-deux'">
    <h2>Couleurs des statuts</h2>

    <!-- Tableau -->
    <table border="1" cellpadding="6">
      <thead>
        <tr>
          <th>
            <input type="checkbox" :checked="toutSelectionnerCouleurs" @change="toggleToutCouleurs" />
            Tout
          </th>
          <th>ID</th>
          <th>Label</th>
          <th>Couleur</th>
          <th>Aperçu</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="c in couleurs" :key="c.id">
          <td>
            <input type="checkbox" :value="c.id" v-model="selectionCouleurs" />
          </td>
          <td>{{ c.id }}</td>
          <td>
            <template v-if="editCouleurId === c.id">
              <input type="text" v-model="formCouleur.label" />
            </template>
            <template v-else>{{ c.label }}</template>
          </td>
          <td>
            <template v-if="editCouleurId === c.id">
              <input type="color" v-model="formCouleur.valeur" />
            </template>
            <template v-else>{{ c.valeur }}</template>
          </td>
          <td>
            <span :style="`display:inline-block;width:32px;height:16px;background:${c.valeur};border:1px solid #888`"></span>
          </td>
          <td>
            <template v-if="editCouleurId === c.id">
              <button @click="sauvegarderCouleur">Sauvegarder</button>
              <button @click="annulerEditionCouleur">Annuler</button>
            </template>
            <template v-else>
              <button @click="editerCouleur(c)">Modifier</button>
              <button @click="supprimerCouleur(c.id)">Supprimer</button>
            </template>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modification en groupe -->
    <div v-if="selectionCouleurs.length > 0">
      <p>{{ selectionCouleurs.length }} couleur(s) sélectionnée(s) — Appliquer une valeur commune :</p>
      <input type="color" v-model="couleurGroupe" />
      <button @click="appliquerGroupeCouleurs">Appliquer à la sélection</button>
    </div>

    <!-- Formulaire ajout -->
    <h3>Ajouter une couleur</h3>
    <form @submit.prevent="ajouterCouleur">
      <label>Label : <input type="text" v-model="formCouleur.label" placeholder="ex: Statut 4" /></label>
      <label>Couleur : <input type="color" v-model="formCouleur.valeur" /></label>
      <button type="submit">Ajouter</button>
    </form>
  </section>

  <hr v-if="ongletActif === 'les-deux'" />

  <!-- ════════════════════════════ SECTION LANGUES ═══════════════════════════ -->
  <section v-if="ongletActif === 'langue' || ongletActif === 'les-deux'">
    <h2>Versions de langue</h2>

    <!-- Tableau -->
    <table border="1" cellpadding="6">
      <thead>
        <tr>
          <th>
            <input type="checkbox" :checked="toutSelectionnerLangues" @change="toggleToutLangues" />
            Tout
          </th>
          <th>ID</th>
          <th>Nom</th>
          <th>Code</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="l in langues" :key="l.id">
          <td>
            <input type="checkbox" :value="l.id" v-model="selectionLangues" />
          </td>
          <td>{{ l.id }}</td>
          <td>
            <template v-if="editLangueId === l.id">
              <input type="text" v-model="formLangue.nom" />
            </template>
            <template v-else>{{ l.nom }}</template>
          </td>
          <td>
            <template v-if="editLangueId === l.id">
              <input type="text" v-model="formLangue.code" placeholder="ex: fr" />
            </template>
            <template v-else>{{ l.code }}</template>
          </td>
          <td>
            <template v-if="editLangueId === l.id">
              <button @click="sauvegarderLangue">Sauvegarder</button>
              <button @click="annulerEditionLangue">Annuler</button>
            </template>
            <template v-else>
              <button @click="editerLangue(l)">Modifier</button>
              <button @click="supprimerLangue(l.id)">Supprimer</button>
            </template>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modification en groupe -->
    <div v-if="selectionLangues.length > 0">
      <p>{{ selectionLangues.length }} langue(s) sélectionnée(s) — Renommer en :</p>
      <input type="text" v-model="suffixeGroupeLangue" placeholder="Nouveau nom" />
      <button @click="appliquerGroupeLangues">Appliquer à la sélection</button>
    </div>

    <!-- Formulaire ajout -->
    <h3>Ajouter une langue</h3>
    <form @submit.prevent="ajouterLangue">
      <label>Nom : <input type="text" v-model="formLangue.nom" placeholder="ex: English" /></label>
      <label>Code : <input type="text" v-model="formLangue.code" placeholder="ex: en" /></label>
      <button type="submit">Ajouter</button>
    </form>
  </section>
</template>

<style scoped></style>
