<script setup lang="ts">
import { ref, computed } from 'vue'
import JSZip from 'jszip'
import AppSidebar from '@/components/layout/AppSidebar.vue'

import { parseCsvFile } from '@/services/csv/csvParser'
import { hasRequiredHeaders } from '@/services/csv/csvValidator'

import { importAssetRows } from '@/services/import/assetImportService'
import { importTicketRows, importCoutRows, importImageFiles } from '@/services/import/ticketImportService'

import type { AssetCsvRow, ImportResult } from '@/services/import/assetImportTypes'
import type { TicketCsvRow, CoutCsvRow, TicketImportResult, CoutImportResult } from '@/services/import/ticketImportTypes'

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
const imageResults = ref<{ name: string; success: boolean; error?: string }[]>([])

// Erreurs de validation
const erreurs = ref<string[]>([])

// ─── Fichiers sélectionnés ───────────────────────────────────────────────────

const csv1File = ref<File | null>(null)
const csv2File = ref<File | null>(null)
const csv3File = ref<File | null>(null)
const zipFile = ref<File | null>(null)

// Prévisualisations
const csv1Rows = ref<AssetCsvRow[]>([])
const csv2Rows = ref<TicketCsvRow[]>([])
const csv3Rows = ref<CoutCsvRow[]>([])
const zipImageNames = ref<string[]>([])

const CSV1_HEADERS = ['name', 'status', 'location', 'manufacturer', 'item_type', 'model', 'inventory_number', 'user']
const CSV2_HEADERS = ['ref_ticket', 'date', 'heure', 'type', 'titre', 'description', 'status', 'priority', 'items']
const CSV3_HEADERS = ['num_ticket', 'duration_second', 'time_cost', 'fixed_cost']

// Extensions d'image acceptées
const IMAGE_EXTENSIONS = ['png', 'jpg', 'jpeg']

function ext(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() ?? ''
}

// ─── Handlers de sélection ───────────────────────────────────────────────────

async function onCsv1Change(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  csv1File.value = file
  csv1Rows.value = []
  const parsed = await parseCsvFile(file)
  if (hasRequiredHeaders(parsed, CSV1_HEADERS)) {
    csv1Rows.value = parsed.rows as AssetCsvRow[]
  }
}

async function onCsv2Change(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  csv2File.value = file
  csv2Rows.value = []
  const parsed = await parseCsvFile(file)
  if (hasRequiredHeaders(parsed, CSV2_HEADERS)) {
    csv2Rows.value = parsed.rows as TicketCsvRow[]
  }
}

async function onCsv3Change(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  csv3File.value = file
  csv3Rows.value = []
  const parsed = await parseCsvFile(file)
  if (hasRequiredHeaders(parsed, CSV3_HEADERS)) {
    csv3Rows.value = parsed.rows as CoutCsvRow[]
  }
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

function valider(): boolean {
  erreurs.value = []
  if (!csv1File.value || csv1Rows.value.length === 0)
    erreurs.value.push('Feuille 1 (inventaire) : fichier manquant ou en-têtes invalides')
  if (!csv2File.value || csv2Rows.value.length === 0)
    erreurs.value.push('Feuille 2 (tickets) : fichier manquant ou en-têtes invalides')
  if (!csv3File.value || csv3Rows.value.length === 0)
    erreurs.value.push('Feuille 3 (coûts) : fichier manquant ou en-têtes invalides')
  if (!zipFile.value || zipImageNames.value.length === 0)
    erreurs.value.push('Images ZIP : fichier manquant ou aucune image valide')
  return erreurs.value.length === 0
}

// ─── Import tout en même temps (séquencé) ───────────────────────────────────

async function toutImporter() {
  if (!valider()) return

  loading.value = true
  importLance.value = true
  csv1Results.value = []
  csv2Results.value = []
  csv3Results.value = []
  imageResults.value = []

  try {
    // Étape 1 — Inventaire
    csv1Results.value = await importAssetRows(csv1Rows.value)
    for (const r of csv1Results.value) {
      if (r.success && r.existingId) {
        assetsRegistry.value[r.name] = { id: r.existingId, type: r.itemType }
      }
    }

    // Étape 2 — Tickets
    const { results: ticketRes, ticketRegistry: reg } = await importTicketRows(csv2Rows.value, assetsRegistry.value)
    csv2Results.value = ticketRes
    ticketRegistry.value = { ...ticketRegistry.value, ...reg }

    // Étape 3 — Coûts
    csv3Results.value = await importCoutRows(csv3Rows.value, ticketRegistry.value)

    // Étape 4 — Images depuis ZIP
    const images = await extraireImagesZip()
    imageResults.value = await importImageFiles(images, assetsRegistry.value)

  } finally {
    loading.value = false
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
      })
    )
  })

  await Promise.all(tasks)
  return result
}

// ─── Stats récapitulatif ─────────────────────────────────────────────────────

const statsInventaire = computed(() => ({
  ok: csv1Results.value.filter(r => r.success).length,
  skip: csv1Results.value.filter(r => r.skipped).length,
  err: csv1Results.value.filter(r => !r.success).length,
}))

const statsTickets = computed(() => ({
  ok: csv2Results.value.filter(r => r.success).length,
  err: csv2Results.value.filter(r => !r.success).length,
}))

const statsCouts = computed(() => ({
  ok: csv3Results.value.filter(r => r.success).length,
  err: csv3Results.value.filter(r => !r.success).length,
}))

const statsImages = computed(() => ({
  ok: imageResults.value.filter(r => r.success).length,
  err: imageResults.value.filter(r => !r.success).length,
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
              <small>Colonnes : Name, Status, Location, Manufacturer, Item_Type, Model, Inventory_Number, User</small>
            </td>
            <td><input type="file" accept=".csv" @change="onCsv1Change" /></td>
            <td>
              <span v-if="csv1Rows.length > 0" style="color:green">
                ✓ {{ csv1Rows.length }} ligne(s)
              </span>
              <span v-else-if="csv1File" style="color:red">
                ✗ En-têtes invalides
              </span>
              <span v-else style="color:gray">Aucun fichier</span>
            </td>
          </tr>

          <!-- CSV2 -->
          <tr>
            <td>
              <strong>Feuille 2 — Tickets</strong><br />
              <small>Colonnes : Ref_Ticket, Date, Heure, Type, Titre, Description, Status, Priority, Items</small>
            </td>
            <td><input type="file" accept=".csv" @change="onCsv2Change" /></td>
            <td>
              <span v-if="csv2Rows.length > 0" style="color:green">
                ✓ {{ csv2Rows.length }} ticket(s)
              </span>
              <span v-else-if="csv2File" style="color:red">
                ✗ En-têtes invalides
              </span>
              <span v-else style="color:gray">Aucun fichier</span>
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
              <span v-if="csv3Rows.length > 0" style="color:green">
                ✓ {{ csv3Rows.length }} ligne(s)
              </span>
              <span v-else-if="csv3File" style="color:red">
                ✗ En-têtes invalides
              </span>
              <span v-else style="color:gray">Aucun fichier</span>
            </td>
          </tr>

          <!-- ZIP -->
          <tr>
            <td>
              <strong>Images (ZIP)</strong><br />
              <small>Fichiers .png / .jpg / .jpeg — nom = nom de l'asset (ex : PC-ADM-001.png)</small>
            </td>
            <td><input type="file" accept=".zip" @change="onZipChange" /></td>
            <td>
              <span v-if="zipImageNames.length > 0" style="color:green">
                ✓ {{ zipImageNames.length }} image(s) détectée(s)
              </span>
              <span v-else-if="zipFile" style="color:orange">
                ⚠ Aucune image valide dans le ZIP
              </span>
              <span v-else style="color:gray">Aucun fichier</span>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Images détectées dans le ZIP -->
      <div v-if="zipImageNames.length > 0">
        <p><strong>Images dans le ZIP :</strong></p>
        <ul>
          <li v-for="name in zipImageNames" :key="name">{{ name }}</li>
        </ul>
      </div>
    </section>

    <!-- ══════════════ ERREURS DE VALIDATION ══════════════ -->
    <section v-if="erreurs.length > 0">
      <ul>
        <li v-for="e in erreurs" :key="e" style="color:red">{{ e }}</li>
      </ul>
    </section>

    <!-- ══════════════ BOUTON IMPORT ══════════════ -->
    <section>
      <button :disabled="loading" @click="toutImporter">
        {{ loading ? 'Import en cours…' : 'Lancer l\'import complet' }}
      </button>
      <span v-if="loading"> Veuillez patienter…</span>
    </section>

    <!-- ══════════════ RÉSULTATS ══════════════ -->
    <section v-if="importLance && !loading">
      <h2>Résultats de l'import</h2>

      <!-- Résumé rapide -->
      <table border="1" cellpadding="6">
        <thead>
          <tr><th>Étape</th><th>Succès</th><th>Ignorés</th><th>Erreurs</th></tr>
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
          <tr>
            <td>Images</td>
            <td>{{ statsImages.ok }}</td>
            <td>—</td>
            <td>{{ statsImages.err }}</td>
          </tr>
        </tbody>
      </table>

      <!-- Détail inventaire -->
      <details>
        <summary>Détail — Inventaire ({{ csv1Results.length }})</summary>
        <table border="1" cellpadding="4">
          <thead><tr><th>Nom</th><th>Type</th><th>Résultat</th></tr></thead>
          <tbody>
            <tr v-for="r in csv1Results" :key="r.name">
              <td>{{ r.name }}</td>
              <td>{{ r.itemType }}</td>
              <td>
                <span v-if="r.skipped" style="color:orange">Déjà existant (id={{ r.existingId }})</span>
                <span v-else-if="r.success" style="color:green">Importé (id={{ r.existingId }})</span>
                <span v-else style="color:red">Erreur : {{ r.error }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </details>

      <!-- Détail tickets -->
      <details>
        <summary>Détail — Tickets ({{ csv2Results.length }})</summary>
        <table border="1" cellpadding="4">
          <thead><tr><th>Réf.</th><th>Titre</th><th>Résultat</th></tr></thead>
          <tbody>
            <tr v-for="r in csv2Results" :key="r.ref">
              <td>{{ r.ref }}</td>
              <td>{{ r.title }}</td>
              <td>
                <span v-if="r.success" style="color:green">Importé</span>
                <span v-else style="color:red">Erreur : {{ r.error }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </details>

      <!-- Détail coûts -->
      <details>
        <summary>Détail — Coûts ({{ csv3Results.length }})</summary>
        <table border="1" cellpadding="4">
          <thead><tr><th>N° ticket</th><th>Résultat</th></tr></thead>
          <tbody>
            <tr v-for="r in csv3Results" :key="r.numTicket">
              <td>{{ r.numTicket }}</td>
              <td>
                <span v-if="r.success" style="color:green">Importé</span>
                <span v-else style="color:red">Erreur : {{ r.error }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </details>

      <!-- Détail images -->
      <details>
        <summary>Détail — Images ({{ imageResults.length }})</summary>
        <table border="1" cellpadding="4">
          <thead><tr><th>Fichier</th><th>Résultat</th></tr></thead>
          <tbody>
            <tr v-for="r in imageResults" :key="r.name">
              <td>{{ r.name }}</td>
              <td>
                <span v-if="r.success" style="color:green">Importé</span>
                <span v-else style="color:red">Erreur : {{ r.error }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </details>
    </section>

  </main>
</template>

<style scoped></style>
