<script setup lang="ts">
// ═══════════════════════════════════════════════════════════════════════════
// BARRE DE FILTRES RÉUTILISABLE
//
// Affiche une rangée de champs (recherche, listes déroulantes, dates) reliés à
// un objet de filtres via v-model. Utilisée par les dashboards et la page
// tickets pour ne pas réécrire la même barre partout.
//
// Usage :
//   <BarreFiltres :modele="filtres" :champs="champs" @reset="reinitialiser" />
//
// Chaque champ décrit UN contrôle :
//   { cle: 'statut', label: 'Statut', type: 'select', options: OPTIONS_STATUT }
//   { cle: 'recherche', label: 'Recherche', type: 'texte' }
//   { cle: 'dateDebut', label: 'Du', type: 'date' }
// ═══════════════════════════════════════════════════════════════════════════

// Une option d'une liste déroulante (valeur nombre OU texte).
type Option = { valeur: number | string; label: string }

// La description d'un champ de filtre.
type Champ = {
  cle: string
  label: string
  type: 'texte' | 'select' | 'date'
  options?: Option[] // requis si type === 'select'
}

// `modele` est l'objet de filtres (réactif) ; on lit/écrit ses clés directement.
const props = defineProps<{
  modele: Record<string, string | number>
  champs: Champ[]
}>()

const emit = defineEmits<{ reset: [] }>()

// Met à jour une clé du modèle. Pour un <select> on convertit en nombre si la
// valeur d'origine était un nombre (0 = "Tous").
// `modele` est volontairement un objet réactif partagé (le `filtres` du
// composable) : on le modifie en place, ce qui est le motif voulu ici.
function majValeur(cle: string, valeurBrute: string, estNombre: boolean) {
  // eslint-disable-next-line vue/no-mutating-props
  props.modele[cle] = estNombre ? Number(valeurBrute) : valeurBrute
}
</script>

<template>
  <div class="barre-filtres">
    <label v-for="champ in champs" :key="champ.cle" class="champ">
      <span>{{ champ.label }}</span>

      <!-- Champ texte (recherche) -->
      <input
        v-if="champ.type === 'texte'"
        type="text"
        :value="modele[champ.cle]"
        placeholder="Rechercher…"
        @input="majValeur(champ.cle, ($event.target as HTMLInputElement).value, false)"
      />

      <!-- Champ date -->
      <input
        v-else-if="champ.type === 'date'"
        type="date"
        :value="modele[champ.cle]"
        @input="majValeur(champ.cle, ($event.target as HTMLInputElement).value, false)"
      />

      <!-- Liste déroulante -->
      <select
        v-else
        :value="modele[champ.cle]"
        @change="
          majValeur(
            champ.cle,
            ($event.target as HTMLSelectElement).value,
            typeof modele[champ.cle] === 'number',
          )
        "
      >
        <option :value="typeof modele[champ.cle] === 'number' ? 0 : ''">Tous</option>
        <option v-for="opt in champ.options" :key="String(opt.valeur)" :value="opt.valeur">
          {{ opt.label }}
        </option>
      </select>
    </label>

    <button type="button" @click="emit('reset')">Réinitialiser les filtres</button>
  </div>
</template>

<style scoped>
.barre-filtres {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: flex-end;
  margin-bottom: 16px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fafafa;
}
.champ {
  display: flex;
  flex-direction: column;
  font-size: 0.85rem;
  gap: 4px;
}
.champ input,
.champ select {
  padding: 4px 8px;
}
</style>
