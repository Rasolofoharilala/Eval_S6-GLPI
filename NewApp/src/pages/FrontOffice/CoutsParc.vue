<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import AppSidebarFO from '@/components/layout/AppSidebarFO.vue'
import { useParcAssets } from '@/composables/useParcAssets'
import { construireCoutsParc, type LigneCoutParc } from '@/services/coutsParcService'

const { groupes, error: parcError, chargerParc } = useParcAssets()
const lignes = ref<LigneCoutParc[]>([])
const loading = ref(false)
const error = ref('')
const recherche = ref('')

const lignesFiltrees = computed(() => {
  const texte = recherche.value.trim().toLowerCase()
  if (!texte) return lignes.value

  return lignes.value.filter((ligne) =>
    [ligne.ticketNom, ligne.ticketId, ligne.itemType, ligne.itemId, ligne.nomItem].some((valeur) =>
      String(valeur).toLowerCase().includes(texte),
    ),
  )
})

const totalGeneral = computed(() =>
  lignesFiltrees.value.reduce((total, ligne) => total + ligne.totalParItem, 0),
)

const totalSansHoraire = computed(() =>
  lignesFiltrees.value.reduce((total, ligne) => total + ligne.totalSansHoraireParItem, 0),
)

function formatMontant(montant: number): string {
  return `${new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(montant)} €`
}

async function charger() {
  loading.value = true
  error.value = ''
  await chargerParc()

  if (parcError.value) {
    error.value = parcError.value
    loading.value = false
    return
  }

  try {
    lignes.value = await construireCoutsParc(groupes.value)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Impossible de charger les coûts.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  void charger()
})
</script>

<template>
  <AppSidebarFO />

  <main class="couts-page">
    <div class="search-bar">
      <span aria-hidden="true">⌕</span>
      <input v-model="recherche" type="search" placeholder="Rechercher" />
    </div>

    <section class="cost-panel">
      <header class="panel-header">
        <div>
          <h1>Coûts par Items</h1>
          <p>
            Total général : <strong>{{ formatMontant(totalGeneral) }}</strong>
            <span>— {{ lignesFiltrees.length }} item(s)</span>
          </p>
        </div>
        <button type="button" @click="charger" :disabled="loading">
          {{ loading ? 'Chargement…' : 'Actualiser' }}
        </button>
      </header>

      <p v-if="error" class="message-erreur">{{ error }}</p>

      <div v-else class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Ticket</th>
              <th>Type Item</th>
              <th>ID Item</th>
              <th>Nb Items liés</th>
              <th>Coût fixe / Item</th>
              <th>Coût horaire / Item</th>
              <th>Nouveau prix / Item</th>
              <th>Total / Item</th>
              <th>Total sans horaire / Item</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="!loading && lignesFiltrees.length === 0">
              <td colspan="9" class="empty">Aucun coût trouvé.</td>
            </tr>
            <tr v-for="ligne in lignesFiltrees" :key="ligne.allocationId">
              <td>
                <strong>#{{ ligne.ticketId }}</strong>
                <span>{{ ligne.ticketNom }}</span>
              </td>
              <td>
                <strong>{{ ligne.itemType }}</strong>
                <span>{{ ligne.nomItem }}</span>
              </td>
              <td>#{{ ligne.itemId }}</td>
              <td>{{ ligne.nbItemsLies }}</td>
              <td class="montant">{{ formatMontant(ligne.coutFixeParItem) }}</td>
              <td class="montant">{{ formatMontant(ligne.coutHoraireParItem) }}</td>
              <td class="montant">{{ formatMontant(ligne.nouveauPrixParItem) }}</td>
              <td class="montant total">{{ formatMontant(ligne.totalParItem) }}</td>
              <td class="montant">{{ formatMontant(ligne.totalSansHoraireParItem) }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th colspan="7">Total général</th>
              <th class="montant total">{{ formatMontant(totalGeneral) }}</th>
              <th class="montant">{{ formatMontant(totalSansHoraire) }}</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  </main>
</template>

<style scoped>
.couts-page {
  min-height: 100vh;
  padding: 2rem;
  background: #f7f8fa;
}

.search-bar {
  width: min(430px, 100%);
  margin: 0 auto 3rem;
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.7rem 1rem;
  background: white;
  border: 1px solid #d7dce2;
  border-radius: 7px;
}

.search-bar input {
  width: 100%;
  border: 0;
  outline: 0;
  font: inherit;
}

.cost-panel {
  width: 100%;
  background: white;
  border: 1px solid #e2e5e9;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgb(0 0 0 / 5%);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.panel-header h1 {
  margin: 0 0 0.35rem;
  font-size: 1.2rem;
}

.panel-header p {
  margin: 0;
  color: #5f6873;
}

.panel-header button {
  padding: 0.55rem 0.9rem;
  border: 1px solid #7a8694;
  border-radius: 6px;
  background: white;
  color: #1f2937;
  font-weight: 600;
  cursor: pointer;
}

.panel-header button:hover:not(:disabled) {
  background: #eef2f7;
}

.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 0.8rem 0.7rem;
  border-bottom: 1px solid #e6e9ed;
  text-align: left;
  white-space: nowrap;
}

thead th {
  color: #4f5965;
  font-size: 0.85rem;
}

td span {
  display: block;
  margin-top: 0.2rem;
  color: #7a8490;
  font-size: 0.8rem;
}

tfoot {
  background: #f5f6f8;
}

.montant {
  text-align: right;
}

.total {
  font-weight: 700;
}

.empty {
  padding: 2rem;
  text-align: center;
  color: #77818c;
}

.message-erreur {
  color: #b42318;
}
</style>
