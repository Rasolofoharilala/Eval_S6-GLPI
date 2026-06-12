<script setup lang="ts">
import { ref, computed } from 'vue'
import JSZip from 'jszip'
import AppSidebar from '@/components/layout/AppSidebar.vue'

import { parseCsvFile } from '@/services/csv/csvParser'
import { hasRequiredHeaders } from '@/services/csv/csvValidator'
import type { CsvRow } from '@/services/csv/csvTypes'

import { importAssetRows } from '@/services/import/assetImportService'
import {
  importTicketRows,
  importCoutRows,
  importImageFiles,
} from '@/services/import/ticketImportService'
import { importLogger } from '@/services/import/importLogger'
import { messageErreur } from '@/utils/messageErreur'

import type { AssetCsvRow, ImportResult } from '@/services/import/assetImportTypes'
import type {
  TicketCsvRow,
  CoutCsvRow,
  TicketImportResult,
  CoutImportResult,
  ImageImportResult,
} from '@/services/import/ticketImportTypes'

// ─── Registres partagés ───────────────────────────────────────────────────────

const assetsRegistry = ref<Record<string, { id: number; type: string }>>({})
const ticketRegistry = ref<Record<string, number>>({})

// ─── État global ──────────────────────────────────────────────────────────────

const loading = ref(false)
const importLance = ref(false)

// Résultats
const csv1Results = ref<ImportResult[]>([])
const csv2Results = ref<TicketImportResult[]>([])
const csv3Results = ref<CoutImportResult[]>([])
const imageResults = ref<ImageImportResult[]>([])

// Erreurs de validation
const erreurs = ref<string[]>([])

// Erreur globale (interruption inattendue de l'import)
const erreurGlobale = ref('')

// ─── Fichiers sélectionnés ───────────────────────────────────────────────────

const csv1File = ref<File | null>(null)
const csv2File = ref<File | null>(null)
const csv3File = ref<File | null>(null)
const zipFile = ref<File | null>(null)
const skipImages = ref(false)

// Prévisualisations
const csv1Rows = ref<AssetCsvRow[]>([])
const csv2Rows = ref<TicketCsvRow[]>([])
const csv3Rows = ref<CoutCsvRow[]>([])
const zipImageNames = ref<string[]>([])

// État d'un fichier CSV choisi :
//   'absent'  : aucun fichier choisi
//   'ok'      : en-têtes valides + au moins 1 ligne
//   'vide'    : fichier vide ou juste l'en-tête → rien à importer (PAS une erreur)
//   'invalide': des lignes mais les colonnes attendues manquent → erreur
type EtatCsv = 'absent' | 'ok' | 'vide' | 'invalide'
const csv1Etat = ref<EtatCsv>('absent')
const csv2Etat = ref<EtatCsv>('absent')
const csv3Etat = ref<EtatCsv>('absent')

// ─── En-têtes attendus des CSV ───────────────────────────────────────────────

const CSV1_HEADERS = [
  'name',
  'status',
  'location',
  'manufacturer',
  'item_type',
  'model',
  'inventory_number',
  'user',
]
const CSV2_HEADERS = [
  'ref_ticket',
  'date',
  'heure',
  'type',
  'titre',
  'description',
  'status',
  'priority',
  'items',
]
const CSV3_HEADERS = ['num_ticket', 'duration_second', 'time_cost', 'fixed_cost']

// Extensions d'image acceptées
const IMAGE_EXTENSIONS = ['png', 'jpg', 'jpeg']

function ext(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() ?? ''
}

// ─── Handlers de sélection ───────────────────────────────────────────────────

// Analyse un fichier CSV et renvoie son état + ses lignes.
// Vide ou juste l'en-tête → 'vide' (légitime, on n'importe rien).
async function analyserCsv(
  file: File,
  enTetes: string[],
): Promise<{ etat: EtatCsv; lignes: CsvRow[] }> {
  const parsed = await parseCsvFile(file)

  // Fichier vide (aucune colonne lue) → rien à importer.
  if (parsed.headers.length === 0) {
    return { etat: 'vide', lignes: [] }
  }
  // En-têtes attendus absents → vraie erreur.
  if (!hasRequiredHeaders(parsed, enTetes)) {
    return { etat: 'invalide', lignes: [] }
  }
  // En-têtes OK mais aucune ligne de données → rien à importer.
  if (parsed.rows.length === 0) {
    return { etat: 'vide', lignes: [] }
  }
  return { etat: 'ok', lignes: parsed.rows }
}

async function onCsv1Change(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  csv1File.value = file
  const { etat, lignes } = await analyserCsv(file, CSV1_HEADERS)
  csv1Etat.value = etat
  csv1Rows.value = lignes as AssetCsvRow[]
}

async function onCsv2Change(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  csv2File.value = file
  const { etat, lignes } = await analyserCsv(file, CSV2_HEADERS)
  csv2Etat.value = etat
  csv2Rows.value = lignes as TicketCsvRow[]
}

async function onCsv3Change(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  csv3File.value = file
  const { etat, lignes } = await analyserCsv(file, CSV3_HEADERS)
  csv3Etat.value = etat
  csv3Rows.value = lignes as CoutCsvRow[]
}

async function onZipChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  zipFile.value = file
  zipImageNames.value = []

  const zip = await JSZip.loadAsync(file)
  const names: string[] = []
  zip.forEach((relativePath, entry) => {
    if (entry.dir) return
    const filename = relativePath.split('/').pop() ?? ''
    if (!filename || filename.startsWith('.')) return
    if (IMAGE_EXTENSIONS.includes(ext(filename))) {
      names.push(filename)
    }
  })
  zipImageNames.value = names
}

// ─── Validation avant import ─────────────────────────────────────────────────

// Aucun fichier n'est OBLIGATOIRE : on importe ce qui est fourni.
// Un fichier VIDE (ou juste l'en-tête) est légitime : on n'importe rien, sans erreur.
// On ne signale QUE les en-têtes invalides (fichier non vide mais inexploitable).
function valider(): boolean {
  erreurs.value = []

  if (csv1Etat.value === 'invalide')
    erreurs.value.push('Feuille 1 (inventaire) : en-têtes invalides, fichier ignoré')
  if (csv2Etat.value === 'invalide')
    erreurs.value.push('Feuille 2 (tickets) : en-têtes invalides, fichier ignoré')
  if (csv3Etat.value === 'invalide')
    erreurs.value.push('Feuille 3 (coûts) : en-têtes invalides, fichier ignoré')

  return erreurs.value.length === 0
}

// ─── Import tout en même temps (séquencé) ───────────────────────────────────

async function toutImporter() {
  if (!valider()) return

  loading.value = true
  importLance.value = true
  erreurGlobale.value = ''
  csv1Results.value = []
  csv2Results.value = []
  csv3Results.value = []
  imageResults.value = []

  console.group("[IMPORT] ════════ Démarrage de l'importation ════════")
  importLogger.info(
    `Fichiers : ${csv1Rows.value.length} inventaire, ${csv2Rows.value.length} tickets, ` +
      `${csv3Rows.value.length} coûts, ${zipImageNames.value.length} images`,
  )

  try {
    // Étape 1 — Inventaire
    try {
      importLogger.step(`Inventaire — ${csv1Rows.value.length} ligne(s)`)
      csv1Results.value = await importAssetRows(csv1Rows.value)
      for (const r of csv1Results.value) {
        if (r.success && r.existingId) {
          assetsRegistry.value[r.name] = { id: r.existingId, type: r.itemType }
        }
      }
      importLogger.summary('Inventaire', {
        ok: statsInventaire.value.ok,
        ignorés: statsInventaire.value.skip,
        erreurs: statsInventaire.value.err,
      })
      importLogger.endStep()
    } catch (err) {
      importLogger.error(`Étape Inventaire interrompue : ${messageErreur(err)}`)
      throw err
    }

    // Étape 2 — Tickets
    const { results: ticketRes, ticketRegistry: reg } = await importTicketRows(
      csv2Rows.value,
      assetsRegistry.value,
    )
    csv2Results.value = ticketRes
    ticketRegistry.value = { ...ticketRegistry.value, ...reg }

    // Étape 3 — Coûts
    csv3Results.value = await importCoutRows(csv3Rows.value, ticketRegistry.value)

    // Étape 4 — Images depuis ZIP (optionnel)
    if (!skipImages.value) {
      const images = await extraireImagesZip()
      imageResults.value = await importImageFiles(images, assetsRegistry.value)
    } else {
      importLogger.skip('Import images ignoré (case décochée)')
    }

    importLogger.info('Importation terminée.')
  } catch (err) {
    erreurGlobale.value = messageErreur(err)
    importLogger.error(`Importation interrompue : ${erreurGlobale.value}`)
  } finally {
    loading.value = false
    console.groupEnd()
  }
}

// ─── Extraction du ZIP ───────────────────────────────────────────────────────

async function extraireImagesZip(): Promise<Record<string, Blob>> {
  const result: Record<string, Blob> = {}
  if (!zipFile.value) return result

  const zip = await JSZip.loadAsync(zipFile.value)
  const tasks: Promise<void>[] = []

  zip.forEach((relativePath, entry) => {
    if (entry.dir) return
    const filename = relativePath.split('/').pop() ?? ''
    if (!filename || filename.startsWith('.')) return
    if (!IMAGE_EXTENSIONS.includes(ext(filename))) return

    tasks.push(
      entry.async('blob').then((blob) => {
        result[filename] = blob
      }),
    )
  })

  await Promise.all(tasks)
  return result
}

// ─── Stats récapitulatif ─────────────────────────────────────────────────────

const statsInventaire = computed(() => ({
  ok: csv1Results.value.filter((r) => r.success).length,
  skip: csv1Results.value.filter((r) => r.skipped).length,
  err: csv1Results.value.filter((r) => !r.success).length,
}))

const statsTickets = computed(() => ({
  ok: csv2Results.value.filter((r) => r.success).length,
  err: csv2Results.value.filter((r) => !r.success).length,
}))

const statsCouts = computed(() => ({
  ok: csv3Results.value.filter((r) => r.success).length,
  err: csv3Results.value.filter((r) => !r.success).length,
}))

const statsImages = computed(() => ({
  ok: imageResults.value.filter((r) => r.success).length,
  skip: imageResults.value.filter((r) => r.skipped).length,
  err: imageResults.value.filter((r) => !r.success && !r.skipped).length,
}))
</script>

<template>
  <AppSidebar />
  <main>
    <h1>Import de données</h1>
    <p>Sélectionnez les 3 feuilles CSV et le fichier ZIP des images, puis lancez l'import.</p>

    <!-- ══════════════ SÉLECTION DES FICHIERS ══════════════ -->
    <section>
      <h2>Sélection des fichiers</h2>

      <table border="1" cellpadding="6">
        <thead>
          <tr>
            <th>Fichier</th>
            <th>Sélectionner</th>
            <th>État</th>
          </tr>
        </thead>
        <tbody>
          <!-- CSV1 -->
          <tr>
            <td>
              <strong>Feuille 1 — Inventaire</strong><br />
              <small
                >Colonnes : Name, Status, Location, Manufacturer, Item_Type, Model,
                Inventory_Number, User</small
              >
            </td>
            <td><input type="file" accept=".csv" @change="onCsv1Change" /></td>
            <td>
              <span v-if="csv1Etat === 'ok'" style="color: green">
                ✓ {{ csv1Rows.length }} ligne(s)
              </span>
              <span v-else-if="csv1Etat === 'vide'" style="color: #b26b00">
                ◌ Fichier vide / en-tête seul
              </span>
              <span v-else-if="csv1File" style="color: red"> ✗ En-têtes invalides </span>
              <span v-else style="color: gray">Aucun fichier</span>
            </td>
          </tr>

          <!-- CSV2 -->
          <tr>
            <td>
              <strong>Feuille 2 — Tickets</strong><br />
              <small
                >Colonnes : Ref_Ticket, Date, Heure, Type, Titre, Description, Status, Priority,
                Items</small
              >
            </td>
            <td><input type="file" accept=".csv" @change="onCsv2Change" /></td>
            <td>
              <span v-if="csv2Etat === 'ok'" style="color: green">
                ✓ {{ csv2Rows.length }} ticket(s)
              </span>
              <span v-else-if="csv2Etat === 'vide'" style="color: #b26b00">
                ◌ Fichier vide / en-tête seul
              </span>
              <span v-else-if="csv2File" style="color: red"> ✗ En-têtes invalides </span>
              <span v-else style="color: gray">Aucun fichier</span>
            </td>
          </tr>

          <!-- CSV3 -->
          <tr>
            <td>
              <strong>Feuille 3 — Coûts</strong><br />
              <small>Colonnes : Num_Ticket, Duration_second, Time_Cost, Fixed_Cost</small>
            </td>
            <td><input type="file" accept=".csv" @change="onCsv3Change" /></td>
            <td>
              <span v-if="csv3Etat === 'ok'" style="color: green">
                ✓ {{ csv3Rows.length }} ligne(s)
              </span>
              <span v-else-if="csv3Etat === 'vide'" style="color: #b26b00">
                ◌ Fichier vide / en-tête seul
              </span>
              <span v-else-if="csv3File" style="color: red"> ✗ En-têtes invalides </span>
              <span v-else style="color: gray">Aucun fichier</span>
            </td>
          </tr>

          <!-- ZIP -->
          <tr>
            <td>
              <strong>Images (ZIP)</strong><br />
              <small
                >Fichiers .png / .jpg / .jpeg — nom = nom de l'asset (ex : PC-ADM-001.png)</small
              >
            </td>
            <td><input type="file" accept=".zip" @change="onZipChange" /></td>
            <td>
              <span v-if="zipImageNames.length > 0" style="color: green">
                ✓ {{ zipImageNames.length }} image(s) détectée(s)
              </span>
              <span v-else-if="zipFile" style="color: orange">
                ⚠ Aucune image valide dans le ZIP
              </span>
              <span v-else style="color: gray">Aucun fichier</span>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Option : ignorer les images -->
      <div style="margin-top: 8px">
        <label>
          <input type="checkbox" v-model="skipImages" />
          Ne pas importer les images (ignorer le ZIP)
        </label>
      </div>

      <!-- Images détectées dans le ZIP -->
      <div v-if="zipImageNames.length > 0 && !skipImages">
        <p><strong>Images dans le ZIP :</strong></p>
        <ul>
          <li v-for="name in zipImageNames" :key="name">{{ name }}</li>
        </ul>
      </div>
    </section>

    <!-- ══════════════ ERREURS DE VALIDATION ══════════════ -->
    <section v-if="erreurs.length > 0">
      <ul>
        <li v-for="e in erreurs" :key="e" style="color: red">{{ e }}</li>
      </ul>
    </section>

    <!-- ══════════════ BOUTON IMPORT ══════════════ -->
    <section>
      <button :disabled="loading" @click="toutImporter">
        {{ loading ? 'Import en cours…' : "Lancer l'import complet" }}
      </button>
      <span v-if="loading"> Veuillez patienter…</span>
    </section>

    <!-- ══════════════ ERREUR GLOBALE ══════════════ -->
    <section v-if="erreurGlobale">
      <p style="color: red"><strong>L'import a été interrompu :</strong> {{ erreurGlobale }}</p>
    </section>

    <!-- ══════════════ RÉSULTATS ══════════════ -->
    <section v-if="importLance && !loading">
      <h2>Résultats de l'import</h2>
      <p>
        <small
          >Suivi détaillé disponible dans la console du navigateur (préfixe
          <code>[IMPORT]</code>).</small
        >
      </p>

      <!-- Résumé rapide -->
      <table border="1" cellpadding="6">
        <thead>
          <tr>
            <th>Étape</th>
            <th>Succès</th>
            <th>Ignorés</th>
            <th>Erreurs</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Inventaire</td>
            <td>{{ statsInventaire.ok }}</td>
            <td>{{ statsInventaire.skip }}</td>
            <td>{{ statsInventaire.err }}</td>
          </tr>
          <tr>
            <td>Tickets</td>
            <td>{{ statsTickets.ok }}</td>
            <td>—</td>
            <td>{{ statsTickets.err }}</td>
          </tr>
          <tr>
            <td>Coûts</td>
            <td>{{ statsCouts.ok }}</td>
            <td>—</td>
            <td>{{ statsCouts.err }}</td>
          </tr>
          <tr v-if="!skipImages">
            <td>Images</td>
            <td>{{ statsImages.ok }}</td>
            <td>{{ statsImages.skip }}</td>
            <td>{{ statsImages.err }}</td>
          </tr>
          <tr v-else>
            <td>Images</td>
            <td colspan="3" style="color: gray; font-style: italic">Ignoré</td>
          </tr>
        </tbody>
      </table>

      <!-- Détail inventaire -->
      <details>
        <summary>Détail — Inventaire ({{ csv1Results.length }})</summary>
        <table border="1" cellpadding="4">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Type</th>
              <th>Résultat</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in csv1Results" :key="r.name">
              <td>{{ r.name }}</td>
              <td>{{ r.itemType }}</td>
              <td>
                <span v-if="r.skipped" style="color: orange"
                  >Déjà existant (id={{ r.existingId }})</span
                >
                <span v-else-if="r.success" style="color: green"
                  >Importé (id={{ r.existingId }})</span
                >
                <span v-else style="color: red">Erreur : {{ r.error }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </details>

      <!-- Détail tickets -->
      <details>
        <summary>Détail — Tickets ({{ csv2Results.length }})</summary>
        <table border="1" cellpadding="4">
          <thead>
            <tr>
              <th>Réf.</th>
              <th>Titre</th>
              <th>Résultat</th>
              <th>Éléments associés</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in csv2Results" :key="r.ref">
              <td>{{ r.ref }}</td>
              <td>{{ r.title }}</td>
              <td>
                <span v-if="r.success" style="color: green">Importé</span>
                <span v-else style="color: red">Erreur : {{ r.error }}</span>
              </td>
              <td>
                <span v-if="r.links">
                  {{ r.links.linked }} lié(s)<template v-if="r.links.already"
                    >, {{ r.links.already }} déjà lié(s)</template
                  ><template v-if="r.links.skipped">, {{ r.links.skipped }} introuvable(s)</template
                  ><template v-if="r.links.failed"
                    >, <span style="color: red">{{ r.links.failed }} échec(s)</span></template
                  >
                </span>
                <span v-else>—</span>
              </td>
            </tr>
          </tbody>
        </table>
      </details>

      <!-- Détail coûts -->
      <details>
        <summary>Détail — Coûts ({{ csv3Results.length }})</summary>
        <table border="1" cellpadding="4">
          <thead>
            <tr>
              <th>N° ticket</th>
              <th>Résultat</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in csv3Results" :key="r.numTicket">
              <td>{{ r.numTicket }}</td>
              <td>
                <span v-if="r.success" style="color: green">Importé</span>
                <span v-else style="color: red">Erreur : {{ r.error }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </details>

      <!-- Détail images -->
      <details>
        <summary>Détail — Images ({{ imageResults.length }})</summary>
        <table border="1" cellpadding="4">
          <thead>
            <tr>
              <th>Fichier</th>
              <th>Résultat</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in imageResults" :key="r.name">
              <td>{{ r.name }}</td>
              <td>
                <span v-if="r.success" style="color: green">Importé</span>
                <span v-else-if="r.skipped" style="color: orange">Ignoré : {{ r.error }}</span>
                <span v-else style="color: red">Erreur : {{ r.error }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </details>
    </section>
  </main>
</template>

<style scoped></style>
