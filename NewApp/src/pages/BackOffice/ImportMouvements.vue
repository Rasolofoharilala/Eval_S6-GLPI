<script setup lang="ts">
import { computed, ref } from 'vue'
import AppSidebar from '@/layouts/AppSidebar.vue'
import {
  parserMouvements,
  importerMouvements,
  type MouvementParse,
  type MouvementResultat,
} from '@/services/import/mouvementImportService'
import { messageErreur } from '@/utils/messageErreur'

const texte = ref('')
const erreursParsing = ref<string[]>([])
const resultats = ref<MouvementResultat[]>([])
const loading = ref(false)
const erreurGlobale = ref('')

// ─── 1. FONCTION MÉTIER (la « source de vérité ») ──────────────────────────
//   Elle ne sait PAS d'où viennent les lignes (manuel ou fichier).
//   La saisie manuelle ET l'import construisent le MÊME texte CSV puis
//   appellent EXACTEMENT cette fonction.
async function traiter(csv: string) {
  erreurGlobale.value = ''
  resultats.value = []
  const { mouvements, erreurs } = parserMouvements(csv)
  erreursParsing.value = erreurs

  if (mouvements.length === 0) {
    erreurGlobale.value = 'Aucun mouvement valide à importer.'
    return
  }

  loading.value = true
  try {
    resultats.value = await importerMouvements(mouvements)
  } catch (err) {
    erreurGlobale.value = messageErreur(err)
  } finally {
    loading.value = false
  }
}

// ─── 2. SAISIE MANUELLE (ligne par ligne, bouton +) ─────────────────────────
type LigneManuelle = { ticket: string; mvt: string; valeur: string; mode: string }
const lignesManuelles = ref<LigneManuelle[]>([{ ticket: '', mvt: 'open', valeur: '', mode: '1' }])

function ajouterLigne() {
  lignesManuelles.value.push({ ticket: '', mvt: 'open', valeur: '', mode: '1' })
}
function supprimerLigne(i: number) {
  lignesManuelles.value.splice(i, 1)
  if (lignesManuelles.value.length === 0) ajouterLigne()
}

// Sérialise les lignes manuelles dans le MÊME format CSV que le fichier.
function manuelVersCsv(): string {
  return lignesManuelles.value
    .filter((l) => l.ticket.trim() !== '')
    .map((l) => {
      if (l.mvt === 'cancel') return `${l.ticket}, cancel`
      // le mode (4e colonne) ne sert qu'à open (réouverture)
      if (l.mvt === 'open') return `${l.ticket}, open, ${l.valeur}, ${l.mode}`
      return `${l.ticket}, ${l.mvt}, ${l.valeur}`
    })
    .join('\n')
}

// ─── 3. MODE : manuel / fichier (toggle, combinables) ───────────────────────
const modeManuel = ref(true)
const modeFichier = ref(false)

// Recharge les erreurs de parsing à chaque saisie (zone fichier/texte).
function rafraichirParsing() {
  erreursParsing.value = parserMouvements(texte.value).erreurs
}

// APPEL DEPUIS L'IMPORTATION (fichier) : on lit A,B,C… puis on appelle traiter.
async function onFichier(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  texte.value = await file.text()
  rafraichirParsing()
}

// CSV combiné : lignes manuelles (si actif) + texte/fichier (si actif).
function csvCombine(): string {
  const morceaux: string[] = []
  if (modeManuel.value) morceaux.push(manuelVersCsv())
  if (modeFichier.value) morceaux.push(texte.value)
  return morceaux.filter((m) => m.trim() !== '').join('\n')
}

// Aperçu des mouvements valides au fil de la saisie (manuel + fichier).
const apercu = computed<MouvementParse[]>(() => {
  const csv = csvCombine()
  if (!csv.trim()) return []
  return parserMouvements(csv).mouvements
})

// APPEL DEPUIS L'INTERFACE : manuel et/ou fichier → la MÊME fonction traiter().
function lancer() {
  return traiter(csvCombine())
}

function exemple() {
  modeFichier.value = true
  texte.value = ['1, open, 16.5, 1', '2, open, 5.5, 3', '2, close, 20', '2, cancel'].join('\n')
  rafraichirParsing()
}

const stats = computed(() => ({
  ok: resultats.value.filter((r) => r.success).length,
  ko: resultats.value.filter((r) => !r.success).length,
}))

function libelleMvt(m: string): string {
  if (m === 'open') return 'Réouverture (+%)'
  if (m === 'cancel') return 'Annulation'
  if (m === 'close') return 'Terminer'
  return m
}
</script>

<template>
  <AppSidebar />

  <main class="import-page">
    <header class="page-header">
      <h1>Import de mouvements à la main</h1>
      <p>
        CSV à 3 colonnes <code>ticket, mvt, valeur</code> appliqué aux tickets GLPI
        <strong>déjà existants</strong> (aucune création). La 1re colonne est le
        <strong>Ref_Ticket</strong> du fichier (1, 2, 3…) : il est traduit vers le vrai id GLPI
        grâce à la correspondance mémorisée lors de l'import des tickets. Enregistré dans la base
        SQLite locale.
      </p>
    </header>

    <section class="panel">
      <div class="legende">
        <span><strong>open</strong> N → réouverture +N %</span>
        <span><strong>cancel</strong> → annulation des coûts</span>
        <span><strong>close</strong> N → terminer à N</span>
      </div>

      <!-- Toggle des modes (combinables) -->
      <div class="modes">
        <label><input type="checkbox" v-model="modeManuel" /> Saisie manuelle</label>
        <label><input type="checkbox" v-model="modeFichier" /> Fichier / texte CSV</label>
      </div>

      <!-- Saisie manuelle : ligne par ligne, bouton + -->
      <div v-if="modeManuel" class="manuel">
        <div v-for="(ligne, i) in lignesManuelles" :key="i" class="manuel-ligne">
          <input v-model="ligne.ticket" class="champ-ticket" placeholder="Ticket (ex: 2968)" />
          <select v-model="ligne.mvt" class="champ-mvt">
            <option value="open">open (réouverture +%)</option>
            <option value="close">close (terminer)</option>
            <option value="cancel">cancel (annulation)</option>
          </select>
          <input
            v-model="ligne.valeur"
            class="champ-valeur"
            :disabled="ligne.mvt === 'cancel'"
            :placeholder="ligne.mvt === 'cancel' ? '—' : 'Valeur'"
          />
          <select v-if="ligne.mvt === 'open'" v-model="ligne.mode" class="champ-mode">
            <option value="1">mode 1 (dernier)</option>
            <option value="2">mode 2 (premier)</option>
            <option value="3">mode 3 (moyenne)</option>
            <option value="4">mode 4 (total)</option>
          </select>
          <button type="button" class="btn-supprimer" title="Supprimer" @click="supprimerLigne(i)">
            ✕
          </button>
        </div>
        <button type="button" class="btn-secondaire" @click="ajouterLigne">
          + Ajouter une ligne
        </button>
      </div>

      <!-- Fichier / texte CSV -->
      <div v-if="modeFichier" class="fichier-bloc">
        <textarea
          v-model="texte"
          class="zone"
          rows="8"
          placeholder="1, open, 16.5&#10;2, open, 5.5&#10;2, close, 20&#10;2, cancel"
          @input="rafraichirParsing"
        ></textarea>
        <label class="btn-fichier">
          Charger un fichier CSV
          <input type="file" accept=".csv,.txt" @change="onFichier" hidden />
        </label>
      </div>

      <div class="actions">
        <button type="button" class="btn-secondaire" @click="exemple">Exemple</button>
        <button type="button" class="btn-principal" :disabled="loading" @click="lancer">
          {{ loading ? 'Import en cours…' : `Traiter ${apercu.length} mouvement(s)` }}
        </button>
      </div>

      <ul v-if="erreursParsing.length" class="erreurs">
        <li v-for="e in erreursParsing" :key="e">{{ e }}</li>
      </ul>
      <p v-if="erreurGlobale" class="erreur-globale">{{ erreurGlobale }}</p>
    </section>

    <!-- Aperçu avant import -->
    <section v-if="apercu.length && !resultats.length" class="panel">
      <h2>Aperçu ({{ apercu.length }})</h2>
      <table>
        <thead>
          <tr>
            <th>Ligne</th>
            <th>Réf (fichier)</th>
            <th>Mouvement</th>
            <th>Valeur</th>
            <th>Mode</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="m in apercu" :key="m.ligne">
            <td>{{ m.ligne }}</td>
            <td>{{ m.ref }}</td>
            <td>{{ libelleMvt(m.mvt) }}</td>
            <td>{{ m.mvt === 'cancel' ? '—' : m.valeur }}</td>
            <td>{{ m.mvt === 'open' ? m.mode : '—' }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- Résultats -->
    <section v-if="resultats.length" class="panel">
      <h2>
        Résultats — <span class="ok">{{ stats.ok }} ok</span>
        <span v-if="stats.ko" class="ko"> · {{ stats.ko }} échec(s)</span>
      </h2>
      <table>
        <thead>
          <tr>
            <th>Ligne</th>
            <th>Réf → Ticket GLPI</th>
            <th>Mouvement</th>
            <th>Valeur</th>
            <th>Mode</th>
            <th>Résultat</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(r, i) in resultats" :key="i" :class="{ 'ligne-ko': !r.success }">
            <td>{{ r.ligne }}</td>
            <td>{{ r.ref }} → #{{ r.ticketId }}</td>
            <td>{{ libelleMvt(r.mvt) }}</td>
            <td>{{ r.mvt === 'cancel' ? '—' : r.valeur }}</td>
            <td>{{ r.mvt === 'open' ? r.mode : '—' }}</td>
            <td>
              <span :class="r.success ? 'ok' : 'ko'">
                {{ r.success ? '✓' : '✗' }} {{ r.message }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </main>
</template>

<style scoped>
.import-page {
  min-height: 100vh;
  padding: 2rem;
  background: #f7f8fa;
}

.page-header h1 {
  margin: 0 0 0.35rem;
  font-size: 1.3rem;
}

.page-header p {
  margin: 0 0 1.5rem;
  color: #5f6873;
  max-width: 60ch;
}

.page-header code,
.legende strong {
  font-weight: 700;
}

.panel {
  background: white;
  border: 1px solid #e2e5e9;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.25rem;
  box-shadow: 0 2px 8px rgb(0 0 0 / 5%);
}

.panel h2 {
  margin: 0 0 1rem;
  font-size: 1.05rem;
}

.legende {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  margin-bottom: 1rem;
  color: #4f5965;
  font-size: 0.9rem;
}

.zone {
  width: 100%;
  font-family: ui-monospace, monospace;
  font-size: 0.95rem;
  padding: 0.8rem;
  border: 1px solid #d7dce2;
  border-radius: 7px;
  resize: vertical;
  box-sizing: border-box;
}

.modes {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
  color: #1f2937;
}

.modes label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
}

.manuel {
  margin-bottom: 1rem;
}

.manuel-ligne {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.manuel-ligne input,
.manuel-ligne select {
  padding: 0.5rem 0.6rem;
  border: 1px solid #d7dce2;
  border-radius: 6px;
  font: inherit;
}

.champ-ticket {
  width: 160px;
}

.champ-mvt {
  width: 200px;
}

.champ-valeur {
  width: 120px;
}

.champ-mode {
  width: 170px;
}

.champ-valeur:disabled {
  background: #f1f3f5;
  color: #9aa3ad;
}

.btn-supprimer {
  border: 1px solid #e0a9a3;
  background: white;
  color: #b42318;
  border-radius: 6px;
  width: 2.2rem;
  cursor: pointer;
}

.fichier-bloc {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.fichier-bloc .btn-fichier {
  align-self: flex-start;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
  margin-top: 1rem;
}

.btn-principal,
.btn-secondaire,
.btn-fichier {
  padding: 0.6rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid #7a8694;
}

.btn-principal {
  background: #1f6fdb;
  border-color: #1f6fdb;
  color: white;
}

.btn-principal:disabled {
  opacity: 0.6;
  cursor: default;
}

.btn-secondaire,
.btn-fichier {
  background: white;
  color: #1f2937;
}

.erreurs {
  margin: 1rem 0 0;
  padding-left: 1.2rem;
  color: #b42318;
}

.erreur-globale {
  margin: 1rem 0 0;
  color: #b42318;
  font-weight: 600;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 0.6rem 0.7rem;
  border-bottom: 1px solid #e6e9ed;
  text-align: left;
  font-size: 0.9rem;
}

thead th {
  color: #4f5965;
  font-size: 0.82rem;
}

.ligne-ko {
  background: #fff5f4;
}

.ok {
  color: #15803d;
}

.ko {
  color: #b42318;
}
</style>
