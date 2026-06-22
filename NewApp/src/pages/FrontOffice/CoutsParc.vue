<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import AppSidebarFO from '@/layouts/AppSidebarFO.vue'
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
    [
      ligne.ticketNom,
      ligne.ticketId,
      ...ligne.items.flatMap((i) => [i.itemType, i.itemId, i.nomItem]),
    ].some((valeur) => String(valeur).toLowerCase().includes(texte)),
  )
})

const totalGeneral = computed(() =>
  lignesFiltrees.value.reduce((total, ligne) => total + ligne.total, 0),
)

const totalSansHoraire = computed(() =>
  lignesFiltrees.value.reduce((total, ligne) => total + ligne.totalSansHoraire, 0),
)

// Tickets dépliés (détail visible). On stocke les ticketId ouverts.
const ouverts = ref<Set<number>>(new Set())
function basculerDetail(ticketId: number) {
  const copie = new Set(ouverts.value)
  if (copie.has(ticketId)) copie.delete(ticketId)
  else copie.add(ticketId)
  ouverts.value = copie
}

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

      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th class="col-expand"></th>
              <th>Ticket</th>
              <th>Items</th>
              <th>Nb Items liés</th>
              <th>Coût fixe</th>
              <th>Coût horaire</th>
              <th>Nouveau prix</th>
              <th>Total</th>
              <th>Total sans horaire</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td colspan="9" class="empty">Chargement…</td>
            </tr>
            <tr v-else-if="lignesFiltrees.length === 0">
              <td colspan="9" class="empty">Aucun coût trouvé.</td>
            </tr>
            <template v-for="ligne in lignesFiltrees" :key="ligne.allocationId">
              <tr class="ligne-ticket" @click="basculerDetail(ligne.ticketId)">
                <td class="col-expand">
                  <span class="chevron" :class="{ ouvert: ouverts.has(ligne.ticketId) }">▸</span>
                </td>
                <td>
                  <strong>#{{ ligne.ticketId }}</strong>
                  <span>{{ ligne.ticketNom }}</span>
                </td>
                <td class="cellule-items">
                  <div
                    v-for="item in ligne.items"
                    :key="`${item.itemType}:${item.itemId}`"
                    class="item-ligne"
                  >
                    <strong>{{ item.itemType }}</strong>
                    <span>{{ item.nomItem }} — #{{ item.itemId }}</span>
                  </div>
                </td>
                <td>{{ ligne.nbItemsLies }}</td>
                <td class="montant">{{ formatMontant(ligne.coutFixe) }}</td>
                <td class="montant">{{ formatMontant(ligne.coutHoraire) }}</td>
                <td class="montant">{{ formatMontant(ligne.nouveauPrix) }}</td>
                <td class="montant total">{{ formatMontant(ligne.total) }}</td>
                <td class="montant">{{ formatMontant(ligne.totalSansHoraire) }}</td>
              </tr>

              <tr v-if="ouverts.has(ligne.ticketId)" class="ligne-detail">
                <td></td>
                <td colspan="8">
                  <div class="detail">
                    <!-- Un bloc par item (asset) avec ses propres détails. -->
                    <article
                      v-for="item in ligne.items"
                      :key="`i-${item.itemType}:${item.itemId}`"
                      class="item-detail"
                    >
                      <header class="item-detail-head">
                        <div>
                          <strong>{{ item.itemType }} — {{ item.nomItem }}</strong>
                          <span>#{{ item.itemId }}</span>
                        </div>
                        <span class="montant total">{{
                          formatMontant(item.nouveauPrixParItem)
                        }}</span>
                      </header>

                      <p v-if="item.coutsSqlite.length === 0" class="vide">
                        Aucun coût enregistré en base pour cet item.
                      </p>
                      <ul v-else>
                        <li
                          v-for="c in item.coutsSqlite"
                          :key="`s-${c.id}`"
                          :class="{ annule: c.annule }"
                        >
                          <span> #{{ c.id }} <em v-if="c.annule">(annulé)</em> </span>
                          <strong>{{ formatMontant(c.cout) }}</strong>
                        </li>
                      </ul>
                    </article>

                    <!-- Coûts GLPI : propres au ticket, pas à un item. -->
                    <article class="item-detail">
                      <header class="item-detail-head">
                        <strong>Coûts GLPI du ticket</strong>
                      </header>
                      <p v-if="ligne.detail.coutsGlpi.length === 0" class="vide">
                        Aucun coût GLPI.
                      </p>
                      <ul v-else>
                        <li v-for="(c, i) in ligne.detail.coutsGlpi" :key="`g-${i}`">
                          <span>Ligne {{ i + 1 }}</span>
                          <span>
                            Fixe {{ formatMontant(c.fixe) }} · Matériel
                            {{ formatMontant(c.materiel) }} · Horaire {{ formatMontant(c.horaire) }}
                          </span>
                        </li>
                      </ul>
                    </article>
                  </div>
                </td>
              </tr>
            </template>
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

/* ── Ligne ticket cliquable ────────────────────────────────────────────── */
.ligne-ticket {
  cursor: pointer;
}

.ligne-ticket:hover {
  background: #f5f8fc;
}

.col-expand {
  width: 1.8rem;
  text-align: center;
}

.chevron {
  display: inline-block;
  color: #7a8490;
  transition: transform 0.15s ease;
}

.chevron.ouvert {
  transform: rotate(90deg);
}

.cellule-items {
  white-space: normal;
}

.item-ligne {
  padding: 0.15rem 0;
}

.item-ligne + .item-ligne {
  border-top: 1px dashed #eef0f3;
}

.item-ligne strong {
  font-size: 0.9rem;
}

/* ── Sous-ligne de détail dépliable ────────────────────────────────────── */
.ligne-detail > td {
  background: #fafbfc;
  padding: 0;
}

.detail {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.25rem;
  padding: 1rem 1.25rem;
}

.item-detail {
  background: white;
  border: 1px solid #e6e9ed;
  border-radius: 7px;
  padding: 0.75rem 0.9rem;
}

.item-detail-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eef0f3;
}

.item-detail-head strong {
  font-size: 0.9rem;
}

.item-detail-head span {
  color: #7a8490;
  font-size: 0.8rem;
}

.item-detail-head .montant {
  color: #1f2937;
  font-size: 0.95rem;
}

.detail ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.detail li {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.35rem 0;
  border-bottom: 1px solid #eef0f3;
  font-size: 0.85rem;
  white-space: normal;
}

.detail li.annule {
  color: #9aa3ad;
  text-decoration: line-through;
}

.detail .vide {
  margin: 0;
  color: #9aa3ad;
  font-size: 0.85rem;
}

.detail em {
  color: #b42318;
  font-style: normal;
  font-size: 0.78rem;
}
</style>
