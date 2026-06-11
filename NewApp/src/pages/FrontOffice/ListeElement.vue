<script setup lang="ts">
import AppSidebarFO from '@/components/layout/AppSidebarFO.vue'
import { computed, onMounted, ref } from 'vue'

// Endpoints du parc : Computer, Monitor, Printer, Peripheral, Phone
import { useComputers } from '@/composables/generated/useComputers'
import { useMonitors } from '@/composables/generated/useMonitors'
import { usePrinters } from '@/composables/generated/usePrinters'
import { usePeripherals } from '@/composables/generated/usePeripherals'
import { usePhones } from '@/composables/generated/usePhones'

const { computers, loadComputers } = useComputers()
const { monitors, loadMonitors } = useMonitors()
const { printers, loadPrinters } = usePrinters()
const { peripherals, loadPeripherals } = usePeripherals()
const { phones, loadPhones } = usePhones()

const loading = ref(false)
const error = ref('')

// ─── Filtres ─────────────────────────────────────────────────────────────────

const typeFilter = ref('tous')
const searchNom = ref('')
const searchStatut = ref('')
const searchLieu = ref('')
const searchUtilisateur = ref('')

const statutOptions = computed(() =>
  [...new Set(allAssets.value.map((a) => a.statut).filter((s) => s !== '—'))].sort(),
)
const lieuOptions = computed(() =>
  [...new Set(allAssets.value.map((a) => a.lieu).filter((l) => l !== '—'))].sort(),
)

const typeOptions = [
  { value: 'tous', label: 'Tous les types' },
  { value: 'Computer', label: 'Ordinateurs' },
  { value: 'Monitor', label: 'Moniteurs' },
  { value: 'Printer', label: 'Imprimantes' },
  { value: 'Peripheral', label: 'Périphériques' },
  { value: 'Phone', label: 'Téléphones' },
]

// ─── Liste unifiée ───────────────────────────────────────────────────────────

type AssetRow = {
  id: number
  type: string
  typeLabel: string
  name: string
  statut: string
  lieu: string
  utilisateur: string
  fabricant: string
  modele: string
  numero: string
}

// Champs communs aux différents types d'assets retournés par l'API
type RawAsset = {
  id?: number
  name?: string | null
  status?: { name?: string | null } | null
  location?: { completename?: string | null; name?: string | null } | null
  user?: {
    name?: string | null
    firstname?: string | null
    realname?: string | null
    username?: string | null
  } | null
  manufacturer?: { name?: string | null } | null
  model?: { name?: string | null } | null
  otherserial?: string | null
  serial?: string | null
}

function toRow(item: RawAsset, type: string, typeLabel: string): AssetRow {
  return {
    id: item.id ?? 0,
    type,
    typeLabel,
    name: item.name ?? '—',
    statut: item.status?.name ?? '—',
    lieu: item.location?.completename ?? item.location?.name ?? '—',
    utilisateur:
      [item.user?.firstname, item.user?.realname].filter(Boolean).join(' ') ||
      item.user?.name ||
      item.user?.username ||
      '—',
    fabricant: item.manufacturer?.name ?? '—',
    modele: item.model?.name ?? '—',
    numero: item.otherserial ?? item.serial ?? '—',
  }
}

const allAssets = computed<AssetRow[]>(() => [
  ...computers.value.map((c) => toRow(c, 'Computer', 'Ordinateur')),
  ...monitors.value.map((m) => toRow(m, 'Monitor', 'Moniteur')),
  ...printers.value.map((p) => toRow(p, 'Printer', 'Imprimante')),
  ...peripherals.value.map((p) => toRow(p, 'Peripheral', 'Périphérique')),
  ...phones.value.map((p) => toRow(p, 'Phone', 'Téléphone')),
])

const filteredAssets = computed<AssetRow[]>(() => {
  const nom = searchNom.value.trim().toLowerCase()
  const statut = searchStatut.value
  const lieu = searchLieu.value
  const user = searchUtilisateur.value.trim().toLowerCase()

  return allAssets.value.filter((row) => {
    if (typeFilter.value !== 'tous' && row.type !== typeFilter.value) return false
    if (nom && !row.name.toLowerCase().includes(nom)) return false
    if (statut && row.statut !== statut) return false
    if (lieu && row.lieu !== lieu) return false
    if (user && !row.utilisateur.toLowerCase().includes(user)) return false
    return true
  })
})

// ─── Chargement ──────────────────────────────────────────────────────────────

async function charger() {
  loading.value = true
  error.value = ''
  try {
    await Promise.all([
      loadComputers(),
      loadMonitors(),
      loadPrinters(),
      loadPeripherals(),
      loadPhones(),
    ])
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Erreur inconnue'
  } finally {
    loading.value = false
  }
}

onMounted(charger)
</script>

<template>
  <AppSidebarFO />
  <main>
    <h1>Liste des éléments</h1>
    <p v-if="loading">Chargement…</p>
    <p v-if="error" style="color: red">{{ error }}</p>

    <!-- Filtres -->
    <table border="0" cellpadding="4">
      <tbody>
        <tr>
          <td><label>Type</label></td>
          <td>
            <select v-model="typeFilter">
              <option v-for="opt in typeOptions" :key="opt.value" :value="opt.value">
                {{ opt.label }}
              </option>
            </select>
          </td>
          <td><label>Nom</label></td>
          <td><input v-model="searchNom" type="text" placeholder="Recherche nom…" /></td>
        </tr>
        <tr>
          <td><label>Statut</label></td>
          <td>
            <select v-model="searchStatut">
              <option value="">Tous les statuts</option>
              <option v-for="s in statutOptions" :key="s" :value="s">{{ s }}</option>
            </select>
          </td>
          <td><label>Lieu</label></td>
          <td>
            <select v-model="searchLieu">
              <option value="">Tous les lieux</option>
              <option v-for="l in lieuOptions" :key="l" :value="l">{{ l }}</option>
            </select>
          </td>
        </tr>
        <tr>
          <td><label>Utilisateur</label></td>
          <td>
            <input v-model="searchUtilisateur" type="text" placeholder="Recherche utilisateur…" />
          </td>
          <td></td>
          <td>
            <span>{{ filteredAssets.length }} / {{ allAssets.length }} élément(s)</span>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Tableau des éléments -->
    <table border="1" cellpadding="4">
      <thead>
        <tr>
          <th>ID</th>
          <th>Type</th>
          <th>Nom</th>
          <th>Statut</th>
          <th>Lieu</th>
          <th>Utilisateur</th>
          <th>Fabricant</th>
          <th>Modèle</th>
          <th>N° inventaire</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="filteredAssets.length === 0">
          <td colspan="9">Aucun élément trouvé</td>
        </tr>
        <tr v-for="row in filteredAssets" :key="`${row.type}-${row.id}`">
          <td>{{ row.id }}</td>
          <td>{{ row.typeLabel }}</td>
          <td>{{ row.name }}</td>
          <td>{{ row.statut }}</td>
          <td>{{ row.lieu }}</td>
          <td>{{ row.utilisateur }}</td>
          <td>{{ row.fabricant }}</td>
          <td>{{ row.modele }}</td>
          <td>{{ row.numero }}</td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<style scoped></style>
