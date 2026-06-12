# Guide BackOffice — par thématique et par page

> But : pouvoir **modifier une page** ou **créer une page** rapidement, en
> temps limité et sans IA, en s'appuyant sur les **modules centraux**.
>
> Règle d'or : on ne recopie pas de logique. On **réutilise un module**
> (`config/*`, `services/*`, `composables/*`, `components/*`). Modifier le
> module modifie toutes les pages d'un coup.

Sommaire :
- [A. Les modules réutilisables](#a-les-modules-réutilisables)
- [B. Thématique : Authentification & protection](#b-thématique--authentification--protection)
- [C. Thématique : Réinitialisation (parc + tickets)](#c-thématique--réinitialisation)
- [D. Thématique : Import des données](#d-thématique--import)
- [E. Thématique : Dashboards (parc & tickets)](#e-thématique--dashboards)
- [F. Thématique : Tickets (consultation + fiche)](#f-thématique--tickets)
- [G. Thématique : Kanban / Langues (SQLite)](#g-thématique--langues-kanban-sqlite)
- [H. Recette : créer une nouvelle page BackOffice](#h-recette--créer-une-nouvelle-page-backoffice)

---

## A. Les modules réutilisables

| Module | Sert à | Pages qui l'utilisent |
|---|---|---|
| `config/parc.ts` | Liste des types d'équipements (Computer, Monitor…). | Import, Dashboard parc, Liste éléments |
| `config/tickets.ts` | Libellés + options de filtre des tickets (statut, priorité…). | Dashboard tickets, Focus tickets, Formulaire |
| `composables/useParcAssets.ts` | Charger les types du parc en 1 appel. | Dashboard parc, Liste éléments |
| `composables/useFiltreParc.ts` | Filtrer le parc + helpers `nomStatut`, `nomLieu`… | Dashboard parc, Liste éléments |
| `composables/useFiltreTickets.ts` | Filtrer une liste de tickets. | Dashboard tickets, Focus tickets |
| `components/BarreFiltres.vue` | Barre de filtres réutilisable. | Tous les dashboards + liste |
| `services/dashboard/dashboardTicketStats.ts` | Coûts + nombre d'éléments liés. | Dashboard tickets |
| `reset/resetService.ts` | Purge réelle via API v1. | Réinitialisation |
| `services/langueService.ts` | CRUD langues Kanban (SQLite). | Stockage |
| `utils/pageLogger.ts` | `creerLogger('Page')` → logs console préfixés. | Toutes |
| `utils/messageErreur.ts` | Erreur API → phrase lisible. | Toutes |

Squelette commun à TOUTES les pages BackOffice :

```vue
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import { creerLogger } from '@/utils/pageLogger'
import { messageErreur } from '@/utils/messageErreur'

const log = creerLogger('Nom de la page')
const loading = ref(false)
const error = ref('')

async function charger() {
  loading.value = true
  error.value = ''
  try {
    // … appels …
    log.succes('Chargé')
  } catch (err) {
    error.value = messageErreur(err)
    log.erreur('Échec', err)
  } finally {
    loading.value = false
  }
}
onMounted(charger)
</script>

<template>
  <AppSidebar />
  <main>
    <h1>Titre</h1>
    <p v-if="loading">Chargement…</p>
    <p v-if="error" class="message-erreur">{{ error }}</p>
    <!-- contenu -->
  </main>
</template>
```

> Toujours mettre le contenu dans `<main>` : le CSS global le décale à droite
> de la barre latérale automatiquement.

---

## B. Thématique : Authentification & protection

**Page** : `LoginBackOffice.vue` (`/login`) · **Module** : `auth/authService.ts`

- Code d'accès unique pré-rempli (`CODE_ACCES` dans `authService.ts`).
- Les pages BackOffice sont protégées par `meta.requiresAuth` + le garde
  `router.beforeEach` dans `router/index.ts`.

**Modifier le code d'accès** → `auth/authService.ts`, changer `CODE_ACCES`.
Le formulaire et la vérification suivent (la constante est partagée).

**Protéger une nouvelle page** → dans `router/index.ts`, ajouter
`meta: { requiresAuth: true }` à sa route. Rien d'autre.

---

## C. Thématique : Réinitialisation

**Page** : `ReinitialisationBackOffice.vue` (`/reinitialisationBase`)
**Module** : `reset/resetService.ts` + `reset/resetEndpointPolicy.ts`

- Liste les éléments (actifs **et** corbeille) puis **purge** via l'API v1
  (`force_purge=1`). L'API v2 ne fait que mettre en corbeille — d'où v1.
- Purge en masse (1 requête par type) + endpoints traités par lots parallèles.
- Les comptes par défaut (utilisateurs id ≤ 6) sont protégés.

**Ajouter un type à réinitialiser** → `reset/resetEndpointPolicy.ts`, ajouter
une entrée `{ endpoint, deleteTarget, category, reason, methods }` dans
`RESETTABLE_ENDPOINTS`. La page l'affiche et le bouton le vide automatiquement.

**Piège** : ne jamais lister via `getAllActifs` pour le reset (ça exclut la
corbeille → des éléments survivent). `previewReset` utilise déjà
`v1GetAllIncludingDeleted`.

---

## D. Thématique : Import

**Page** : `ImportBackOffice.vue` (`/importFichier`)
**Modules** : `services/import/*` (assetImportService, ticketImportService,
parcAssetMapper, glpiEnsureService), `config/parc.ts`

- 3 CSV (inventaire, tickets, coûts) + 1 ZIP d'images.
- Les références (statut, lieu, fabricant, modèle) sont **find-or-create** via
  `glpiEnsureService` : si le nom existe déjà, on le réutilise (sinon GLPI
  renvoie 500 « doit être unique »).
- Les tickets : `status` envoyé en objet `{ id }`. Les liens éléments passent
  par l'API v1 (`Item_Ticket`).

**Ajouter un type d'équipement importable** → 1 ligne dans `config/parc.ts`
(voir recette dans `GUIDE_MAINTENANCE.md` §4). L'import le prend en compte si
le `Item_Type` du CSV correspond.

**Modifier un mapping CSV → GLPI** (ex : un statut) → `ticketImportService.ts`,
tables `STATUS_MAP` / `PRIORITY_MAP` / `TYPE_MAP`.

---

## E. Thématique : Dashboards

Deux pages, **même recette** : charger → filtrer → compter sur la liste filtrée.

### E.1 Dashboard parc — `DashboardElementGeneral.vue` (`/dashboardElementGeneral`)
Modules : `useParcAssets` (charge), `useFiltreParc` (filtre), `BarreFiltres` (UI).
Affiche : total, par type, par statut (global et par type). Les compteurs sont
recalculés sur `elementsFiltres`.

### E.2 Dashboard tickets — `DashboardTicktes.vue` (`/dashboardTickets`)
Modules : `useTickets` (charge), `useFiltreTickets` (filtre), `BarreFiltres`,
`config/tickets` (libellés), `dashboardTicketStats` (coûts + éléments liés).
Affiche : total, par type/statut/priorité/urgence/impact, coûts.

**Ajouter un comptage** → ajouter un `computed` qui compte sur la liste filtrée,
puis un `<section><table>` qui l'affiche. (Recette détaillée : MAINTENANCE §3.)

**Ajouter un filtre** → MAINTENANCE §9 recette 8 (composable + `champsFiltres`).

---

## F. Thématique : Tickets (consultation)

**Page** : `FocusTickets.vue` (`/focusTickets`)
Modules : `useTickets`, `useFiltreTickets`, `BarreFiltres`, `config/tickets`,
helpers `helpers/Dashboard/Tickets.ts` (demandeur, technicien, catégorie…).

- Liste filtrable des tickets + **fiche détaillée** au clic (« Voir »).
- Les libellés (statut, priorité…) viennent de `config/tickets.ts`.

**Ajouter une colonne/un champ dans la fiche** → ajouter une ligne dans le
`<table>` de la fiche, en lisant `selectedTicket.<champ>`. Pour un libellé,
utiliser/ajouter un helper dans `config/tickets.ts`.

---

## G. Thématique : Langues Kanban (SQLite)

**Page** : `StockageValeursVersionLangue.vue` (`/stockage`)
**Modules** : `services/langueService.ts` (front) + backend Spring
`Backend/.../langue/*` (table SQLite).

CRUD complet des langues : chaque langue a 3 statuts (Nouveau, In progress,
Terminé) avec **libellé + couleur** par statut. Deux modes :
- couleurs différentes par langue ;
- une couleur par statut identique à toutes les langues (bouton dédié).

**Ajouter une langue** : aucun code — page `/stockage`, bouton « Ajouter ».
**Le Kanban (FrontOffice) lit ces langues** : tes couleurs/libellés s'y appliquent.

---

## H. Recette : créer une nouvelle page BackOffice

Exemple : « Page qui liste les documents importés ».

1. **Créer le fichier** `src/pages/BackOffice/DocumentsPage.vue` à partir du
   squelette §A (avec `AppSidebar`, `creerLogger`, `loading`/`error`).
2. **Réutiliser un module pour les données** :
   - liste générique → `getAll('/Management/Document')` de `api/crudClient`
     (paginé, exclut la corbeille avec `getAllActifs`) ;
   - besoin de filtres → réutiliser `BarreFiltres` + un petit objet `reactive`.
3. **Déclarer la route** dans `src/router/index.ts`. Comme les autres pages :
   en haut du fichier, importer le composant ; puis l'utiliser dans `routes` :
   ```ts
   // en haut, avec les autres imports :
   import documents from '@/pages/BackOffice/DocumentsPage.vue'

   // dans le tableau routes :
   {
     path: '/documents',
     name: 'documents',
     component: documents,
     meta: { title: 'documents', requiresAuth: true },   // requiresAuth = page protégée
   }
   ```
4. **Ajouter le lien** dans la barre : `src/components/layout/AppSidebar.vue`,
   tableau `menus` (une entrée `{ label, path }` ou dans `children`).
5. **Vérifier** : `npx vue-tsc --noEmit` puis `npm run build`.

> Si la page ressemble à un dashboard existant, **copier la page la plus proche**
> (`DashboardElementGeneral.vue`) et remplacer la source de données : c'est plus
> rapide et garanti cohérent.
