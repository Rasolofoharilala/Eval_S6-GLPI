# Guide de maintenance — NewApp GLPI

Guide pour modifier ce projet **seul, en temps limité**. Tout est copiable.
Racine du projet : `NewApp/`. Les chemins ci-dessous partent de `NewApp/src/` sauf mention contraire.

---

## 1. Mini-cours TypeScript/Vue 3 (le strict nécessaire pour CE projet)

### 1.1 `ref()` : une valeur qui peut changer et que l'écran suit

```ts
import { ref } from 'vue'

const compteur = ref(0)        // .value pour lire/écrire dans le script
compteur.value = compteur.value + 1
// Dans le template : {{ compteur }}  (sans .value)
```

### 1.2 `computed()` : une valeur calculée à partir d'autres refs

```ts
import { computed } from 'vue'

const tickets = ref<Ticket[]>([])
const incidents = computed(() => tickets.value.filter((t) => t.type === 1))
// incidents se met à jour TOUT SEUL quand tickets change. Ne jamais écrire dedans.
```

Règle simple : **`ref` = donnée brute, `computed` = donnée dérivée** (filtre, compte, total).

### 1.3 `<script setup lang="ts">` : l'ordre dans une page

```vue
<script setup lang="ts">
// 1) les imports (Vue, composants, modules du projet)
import { ref, computed, onMounted } from 'vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import { creerLogger } from '@/utils/pageLogger'

// 2) les refs (l'état de la page)
const log = creerLogger('Ma Page')
const liste = ref<string[]>([])
const recherche = ref('')

// 3) les computed et les fonctions
const nombre = computed(() => liste.value.length)
function ajouter() {
  liste.value.push(recherche.value)
}

// 4) le chargement initial
onMounted(() => {
  log.info('Page prête')
})
</script>

<template>
  <AppSidebar />
  <!-- v-model : lie un input à une ref -->
  <input v-model="recherche" />
  <!-- @click : appelle une fonction au clic -->
  <button @click="ajouter">Ajouter</button>
  <!-- v-if : affiche seulement si la condition est vraie -->
  <p v-if="liste.length === 0">Liste vide.</p>
  <!-- v-for : répète un élément pour chaque entrée (toujours avec :key) -->
  <ul>
    <li v-for="element in liste" :key="element">{{ element }}</li>
  </ul>
</template>
```

### 1.4 `async/await` + `try/catch` : LE squelette utilisé partout dans le projet

```ts
import { creerLogger } from '@/utils/pageLogger'
import { messageErreur } from '@/utils/messageErreur'
import { getAll } from '@/api/crudClient'

const log = creerLogger('Ma Page')
const loading = ref(false)
const erreur = ref('')
const tickets = ref<Ticket[]>([])

async function charger() {
  loading.value = true
  erreur.value = ''
  log.info('Chargement...')
  try {
    tickets.value = await getAll<Ticket>('/Assistance/Ticket')
    log.succes(tickets.value.length + ' tickets chargés')
  } catch (err) {
    erreur.value = messageErreur(err)        // texte lisible pour l'écran
    log.erreur('Échec du chargement', err)   // détail dans la console
  } finally {
    loading.value = false                    // TOUJOURS exécuté, même en erreur
  }
}

onMounted(charger)
```

### 1.5 Les types simples

```ts
// Un objet avec des champs nommés :
type Ligne = { label: string; nombre: number }
const ligne: Ligne = { label: 'Ordinateurs', nombre: 21 }
```

`Record<string, number>` = un dictionnaire « texte → nombre ». On l'utilise pour
compter des occurrences sans connaître les clés à l'avance.

```ts
const compteur: Record<string, number> = {}
compteur['Nouveau'] = (compteur['Nouveau'] ?? 0) + 1   // ?? 0 : si la clé n'existe pas encore
```

---

## 2. Architecture du projet (où est quoi)

### 2.1 Frontend (`NewApp/src/`)

```
src/
├── api/
│   ├── httpClient.ts        axios + token OAuth automatique (intercepteur Bearer, purge si 401)
│   ├── crudClient.ts        getAll (PAGINÉ, voir §5) / getById / create / update / remove
│   ├── glpiV1Client.ts      API v1 (apirest.php) : fichiers + liens Document_Item / Item_Ticket (voir §6)
│   ├── glpiConfig.ts        URLs + identifiants GLPI (variables d'environnement)
│   └── tokenManager.ts      obtention / rafraîchissement du token OAuth v2
├── config/
│   └── parc.ts              ★ LA table des 5 types du parc (cle, itemtype, label, endpoint, modelEndpoint)
├── utils/
│   ├── pageLogger.ts        creerLogger('Nom') → log.info/succes/attention/erreur (préfixe [Nom] dans la console)
│   └── messageErreur.ts     messageErreur(err) → phrase lisible (« HTTP 400 — ... »)
├── composables/
│   ├── useParcAssets.ts     charge les 5 types du parc d'un coup (groupes, tousLesElements, loading, error)
│   └── generated/           ⚠ GÉNÉRÉ, NE PAS ÉDITER (useTickets, useComputers, ...)
├── services/
│   ├── generated/           ⚠ GÉNÉRÉ, NE PAS ÉDITER (ticketService, ...)
│   ├── csv/                 csvParser.ts (texte → lignes), csvValidator.ts, csvTypes.ts
│   ├── import/              (détail ci-dessous)
│   ├── dashboard/
│   │   └── dashboardTicketStats.ts   agrégats lourds : coûts des tickets + nb d'éléments liés (API v1)
│   └── kanbanSettingsService.ts      appels au backend Spring (réglages Kanban, voir Recette 5)
├── types/generated/         ⚠ GÉNÉRÉ, NE PAS ÉDITER
├── reset/
│   ├── resetEndpointPolicy.ts   politique : RESETTABLE_ENDPOINTS (8 supprimables) vs AVOID (1181 protégés)
│   └── resetService.ts          previewReset / resetEndpoint / resetSelectedEndpoints (DELETE un par un)
├── helpers/Dashboard/Tickets.ts  libellés français : getTicketPriorityLabel, getTicketStatusLabel, ...
├── pages/
│   ├── BackOffice/          Login, Accueil, Import, Réinitialisation, Dashboards, FocusTickets, Stockage
│   └── FrontOffice/         Accueil, ListeElement, CreateTickets, KanbanTickets
├── components/layout/AppSidebar.vue   le menu latéral (tableau `menus`)
└── router/index.ts          les routes + garde `requiresAuth`
```

Rôle de chaque fichier de `services/import/` (1 ligne chacun) :

| Fichier | Rôle |
|---|---|
| `assetImportService.ts` | importe le CSV 1 (parc) : crée chaque asset via l'endpoint trouvé dans `config/parc.ts` |
| `assetImportTypes.ts` | types des lignes du CSV 1 et du résultat d'import |
| `parcAssetMapper.ts` | transforme une ligne CSV en payload GLPI (mapper UNIQUE pour les 5 types du parc) |
| `glpiAssetLookupService.ts` | détecte les doublons : l'asset existe-t-il déjà (nom / otherserial) ? |
| `glpiEnsureService.ts` | « trouve ou crée » une valeur de dropdown (statut, lieu, fabricant, modèle) avec cache |
| `glpiReferenceConfig.ts` | table des endpoints de dropdowns (`/Dropdowns/State`, `/Dropdowns/Location`, ...) |
| `glpiReferenceTypes.ts` | types des références ci-dessus |
| `userEnsureService.ts` | « trouve ou crée » un utilisateur GLPI à partir d'un nom complet (« Rakoto Jean ») |
| `ticketImportService.ts` | importe CSV 2 (tickets) + CSV 3 (coûts) + images ; liens Items via l'API v1 |
| `ticketImportTypes.ts` | types des lignes tickets/coûts et des résultats |
| `importLogger.ts` | journal console groupé, préfixe `[IMPORT]` (step / ok / fail / skip) |

### 2.2 Backend Spring (`Backend/`)

```
Backend/src/main/java/com/newapp/backend/
├── BackendApplication.java
├── config/CorsConfig.java        autorise le front (http://localhost:5173) sur /api/**
└── kanban/
    ├── KanbanSetting.java        entité JPA : statusKey, position, labelFr, labelMg, color
    ├── KanbanSettingRepository.java
    ├── KanbanSettingUpdate.java  corps JSON reçu en PUT
    ├── KanbanSettingService.java valeurs par défaut + validation couleur #RRGGBB + reset
    └── KanbanSettingController.java   API REST :
        GET  /api/kanban/settings        → les 3 colonnes (couleur, labels fr/mg)
        PUT  /api/kanban/settings        → met à jour une ou plusieurs colonnes
        POST /api/kanban/settings/reset  → restaure les valeurs par défaut
```

Données stockées dans **SQLite** : `Backend/data/newapp.db`. Au premier démarrage,
`seedIfEmpty()` insère les 3 colonnes par défaut (`nouveau` / `in_progress` / `termine`).
Une couleur invalide en PUT renvoie **HTTP 400** `{"error": "Couleur invalide (#RRGGBB attendu) : ..."}`.

---

## 3. Les modules centraux (le cœur de la modularité)

### 3.1 `src/config/parc.ts` — la table des 5 types du parc

Tout le code (import, dashboards, liste, reset) lit CETTE table. API exacte :

```ts
export type TypeParc = {
  cle: string           // clé interne minuscule = champ Item_Type du CSV 1
  itemtype: string      // nom de classe GLPI (liens API v1)
  label: string         // libellé affiché
  endpoint: string      // endpoint API v2 de la collection
  modelEndpoint: string // endpoint des modèles (dropdown)
}
export const TYPES_PARC: TypeParc[]
export function trouverTypeParc(itemType: string): TypeParc | null  // insensible à la casse
export function versItemtypeGlpi(itemType: string): string          // "computer" → "Computer"
```

Exemple réel (`services/import/assetImportService.ts`) :

```ts
const type = trouverTypeParc(row.item_type)
if (!type) {
  throw new Error(`Type non encore supporté : ${row.item_type}`)
}
```

### 3.2 `src/utils/pageLogger.ts` — journal console par page

```ts
export function creerLogger(nomPage: string): Logger
// Logger = { info, succes, attention, erreur } — chacun : (message: string, ...details: unknown[]) => void
```

Exemple réel (`pages/BackOffice/DashboardElementGeneral.vue`) :

```ts
const log = creerLogger('Dashboard Éléments')
log.info('Chargement du parc...')
log.succes(totalGeneral.value + ' éléments chargés — ' + details.join(', '))
log.erreur('Erreur pendant le chargement du parc', error.value)
```

Résultat dans la console (F12) : `[Dashboard Éléments] ✓ 105 éléments chargés — ...`

### 3.3 `src/utils/messageErreur.ts` — erreur → phrase lisible

```ts
export function messageErreur(err: unknown): string
```

Gère les erreurs axios (`HTTP 400 — detail`), les tableaux de l'API v1
(`["ERROR_GLPI_ADD", "..."]`), les `Error` classiques et le reste. Utilisation type :

```ts
try {
  // ...
} catch (err) {
  erreur.value = messageErreur(err)
}
```

### 3.4 `src/composables/useParcAssets.ts` — charger les 5 types d'un coup

```ts
export function useParcAssets(): {
  groupes: Ref<GroupeParc[]>              // GroupeParc = { cle, itemtype, label, elements: AssetParc[] }
  tousLesElements: ComputedRef<AssetParc[]>  // les 5 types à plat
  loading: Ref<boolean>
  error: Ref<string>
  chargerParc: () => Promise<void>        // gère loading/error tout seul
}
```

Exemple réel (`pages/BackOffice/DashboardElementGeneral.vue`) :

```ts
const { groupes, tousLesElements, loading, error, chargerParc } = useParcAssets()

onMounted(async () => {
  log.info('Chargement du parc...')
  await chargerParc()
  if (error.value) {
    log.erreur('Erreur pendant le chargement du parc', error.value)
    return
  }
  log.succes(totalGeneral.value + ' éléments chargés')
})
```

---

## 4. Recettes pas-à-pas (le plus important — évaluation en temps limité)

### Recette 1 : ajouter un 6e type d'équipement au parc (ex : NetworkEquipment)

**UNE seule ligne à ajouter** dans `src/config/parc.ts`, dans le tableau `TYPES_PARC` :

```ts
  {
    cle: 'networkequipment',
    itemtype: 'NetworkEquipment',
    label: 'Équipements réseau',
    endpoint: '/Assets/NetworkEquipment',
    modelEndpoint: '/Dropdowns/NetworkEquipmentModel',
  },
```

Effet **automatique** : l'import CSV accepte ce type, le dashboard Éléments
le compte, `useParcAssets` le charge, la liste FrontOffice l'affiche.

**Cas particulier — la réinitialisation** : la page Réinitialisation ne lit pas
`parc.ts` mais `RESETTABLE_ENDPOINTS` dans `src/reset/resetEndpointPolicy.ts`.
Ajouter ce bloc dans le tableau (copier un bloc « assets » existant) :

```ts
  {
    endpoint: '/Assets/NetworkEquipment',
    deleteTarget: '/Assets/NetworkEquipment/{id}',
    category: 'assets',
    reason:
      'Endpoint du parc retenu pour le reset contrôlé: GET la collection puis DELETE item par item via deleteTarget.',
    methods: ['GET', 'POST'],
  },
```

### Recette 2 : ajouter une nouvelle page BackOffice

**Étape 1** — créer `src/pages/BackOffice/MaPage.vue` (squelette complet) :

```vue
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import { getAll } from '@/api/crudClient'
import { creerLogger } from '@/utils/pageLogger'
import { messageErreur } from '@/utils/messageErreur'

const log = creerLogger('Ma Page')

// ─── État de la page ───
type Element = { id?: number; name?: string | null }
const elements = ref<Element[]>([])
const loading = ref(false)
const erreur = ref('')

const total = computed(() => elements.value.length)

// ─── Chargement des données ───
async function charger() {
  loading.value = true
  erreur.value = ''
  log.info('Chargement...')
  try {
    elements.value = await getAll<Element>('/Assets/Computer')
    log.succes(total.value + ' éléments chargés')
  } catch (err) {
    erreur.value = messageErreur(err)
    log.erreur('Échec du chargement', err)
  } finally {
    loading.value = false
  }
}

onMounted(charger)
</script>

<template>
  <AppSidebar />
  <main>
    <h1>Ma page</h1>
    <p v-if="loading">Chargement...</p>
    <p v-if="erreur">Erreur : {{ erreur }}</p>
    <div v-if="!loading && !erreur">
      <p>Total : {{ total }}</p>
      <ul>
        <li v-for="element in elements" :key="element.id">{{ element.name }}</li>
      </ul>
    </div>
  </main>
</template>

<style scoped></style>
```

**Étape 2** — déclarer la route dans `src/router/index.ts`.
D'abord l'import en haut du fichier (avec les autres) :

```ts
import maPage from '@/pages/BackOffice/MaPage.vue'
```

Puis le bloc dans le tableau `routes` (format réel du fichier) :

```ts
    {
      path: '/maPage',
      name: 'maPage',
      component: maPage,
      meta: {
        title: 'Ma Page',
        requiresAuth: true,
      },
    },
```

`requiresAuth: true` est obligatoire pour le BackOffice : la garde
`router.beforeEach` renvoie vers `/login` si l'utilisateur n'est pas connecté.

**Étape 3** — ajouter le lien dans `src/components/layout/AppSidebar.vue`,
dans le tableau `menus` (format réel) :

```ts
  {
    label: 'Ma Page',
    path: '/maPage',
  },
```

Ou comme sous-menu :

```ts
  {
    label: 'Mon groupe',
    children: [
      {
        label: 'Ma Page',
        path: '/maPage',
      },
    ],
  },
```

### Recette 3 : ajouter un comptage/statistique au dashboard tickets

Fichier : `src/pages/BackOffice/DashboardTicktes.vue` (oui, avec la faute de frappe).
Le pattern « compter par X » : un dictionnaire `Record<string, number>` rempli
dans un `computed`.

**1) Le comptage** (à coller dans le `<script setup>`, après les autres computed) :

```ts
// ─── Répartition par urgence (exemple : remplacer par le champ voulu) ───
const comptesParUrgence = computed<Record<string, number>>(() => {
  const compteur: Record<string, number> = {}
  for (const ticket of tickets.value) {
    const label = getTicketUrgencyLabel(ticket.urgency)   // libellé français (helpers/Dashboard/Tickets.ts)
    compteur[label] = (compteur[label] ?? 0) + 1
  }
  return compteur
})
```

Les helpers disponibles dans `@/helpers/Dashboard/Tickets` :
`getTicketStatusLabel`, `getTicketPriorityLabel`, `getTicketUrgencyLabel`,
`getTicketImpactLabel`, `getTicketCategoryLabel`, `getTicketLocationLabel`,
`getTicketRequesterName`, `getTicketAssignedName`.

**2) Le tableau** (à coller dans le `<template>`, dans une `<section>`) :

```html
    <section>
      <h2>Urgences</h2>
      <table border="1" cellpadding="6">
        <thead>
          <tr>
            <th>Urgence</th>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(count, label) in comptesParUrgence" :key="label">
            <td>{{ label }}</td>
            <td>{{ count }}</td>
          </tr>
        </tbody>
      </table>
    </section>
```

`v-for="(count, label) in ..."` sur un `Record` : la **valeur d'abord, la clé ensuite**.

### Recette 4 : modifier les mappings d'import (statut/priorité CSV → GLPI)

Fichier : `src/services/import/ticketImportService.ts`, en haut :
`STATUS_MAP`, `PRIORITY_MAP`, `TYPE_MAP` (tous des `Record<string, number>`,
clés CSV en minuscules → code numérique GLPI).

```ts
const STATUS_MAP: Record<string, number> = {
  new: 1,
  'in progress': 2,
  pending: 4,
  solved: 5,
  closed: 6,
  // ➜ ajouter ici une nouvelle valeur CSV, ex :  reopened: 2,
}
```

**Codes GLPI à connaître par cœur :**

| Statut | Code | | Priorité | Code | | Type | Code |
|---|---|---|---|---|---|---|---|
| Nouveau | 1 | | Très basse | 1 | | Incident | 1 |
| En cours (Attribué) | 2 | | Basse | 2 | | Demande | 2 |
| En attente | 4 | | Moyenne | 3 | | | |
| Résolu | 5 | | Haute | 4 | | | |
| Clos | 6 | | Très haute | 5 | | | |
| | | | Majeure | 6 | | | |

Valeurs par défaut si la valeur CSV est inconnue : statut `1`, priorité `3`, type `1`
(voir `STATUS_MAP[...] ?? 1` dans `importTicketRows`). Les libellés affichés côté
dashboard sont dans `src/helpers/Dashboard/Tickets.ts` (`PRIORITY_LABELS`, ...).

### Recette 5 : modifier les colonnes/couleurs du Kanban

- **Frontend** : `src/services/kanbanSettingsService.ts` → `DEFAULT_KANBAN_SETTINGS`
  (3 colonnes : `nouveau` #dbeafe, `in_progress` #ffedd5, `termine` #dcfce7,
  avec `labelFr` et `labelMg`). C'est la valeur de secours si le backend est éteint.
- **Backend** : `Backend/.../kanban/KanbanSettingService.java` → méthode `defaults()`
  (mêmes valeurs) + validation des couleurs au format `#RRGGBB`
  (regex `^#[0-9a-fA-F]{6}$`, sinon HTTP 400).
- **Édition à l'écran** : la page `/stockage`
  (`src/pages/BackOffice/StockageValeursVersionLangue.vue`) lit et écrit via
  `getKanbanSettings()` / `updateKanbanSettings()` / `resetKanbanSettings()`.
- **Repartir de zéro** : arrêter le backend, **supprimer `Backend/data/newapp.db`**,
  redémarrer → `seedIfEmpty()` recrée les 3 colonnes par défaut.

### Recette 6 : déboguer une erreur API

1. **F12 → Console** : chercher la ligne avec `✗` et son préfixe de page
   (ex : `[Dashboard Tickets] ✗ ...`) ou `[IMPORT]` pour l'import.
2. **F12 → Network** : cliquer sur la requête en rouge → onglet *Response* pour
   lire la réponse du serveur, et noter le **statut HTTP**.
3. À l'écran, `messageErreur` affiche déjà « `HTTP xxx — détail` ».
4. Interpréter le statut :

| Statut | Cause probable | Que faire |
|---|---|---|
| 401 | token expiré/invalide | se reconnecter ; `httpClient` purge le token automatiquement |
| 400 | données invalides ou doublon (`ERROR_GLPI_ADD`) | vérifier le payload dans Network ; doublon = élément déjà créé |
| 404 | endpoint inexistant | vérifier l'orthographe de l'endpoint (`/Assets/Computer`...) |
| 500 | bug côté serveur GLPI | réessayer ; certains endpoints v2 sont cassés → passer par l'API v1 (§6) |

---

## 5. Pourquoi `getAll` pagine (piège GLPI)

GLPI plafonne **chaque réponse de liste à 100 éléments** (statut 206 Partial
Content) et indique le total dans l'en-tête `Content-Range: 0-99/453`.
Sans pagination, un dashboard plafonnerait à 100 et **tous les comptages
seraient faux**. `src/api/crudClient.ts` boucle donc automatiquement :

```ts
const PAGE_SIZE = 100

export async function getAll<T>(endpoint: string): Promise<T[]> {
  const sep = endpoint.includes('?') ? '&' : '?'
  const items: T[] = []
  let start = 0

  for (;;) {
    const end = start + PAGE_SIZE - 1
    const response = await httpClient.get<T[]>(`${endpoint}${sep}range=${start}-${end}`)
    const chunk = Array.isArray(response.data) ? response.data : []
    items.push(...chunk)

    const total = parseTotalFromContentRange(response.headers?.['content-range'])

    if (chunk.length < PAGE_SIZE) break
    if (total !== null && items.length >= total) break

    start += PAGE_SIZE
  }

  return items
}
```

Conclusion : pour lister, **toujours utiliser `getAll` de `@/api/crudClient`**,
jamais un `httpClient.get` direct sur une collection.

---

## 6. API v1 vs API v2 (piège GLPI)

| | v2 (`api.php`) | v1 (`apirest.php`) |
|---|---|---|
| Fichier | `src/api/httpClient.ts` + `crudClient.ts` | `src/api/glpiV1Client.ts` |
| Auth | token OAuth (Bearer) | session (`initSession`, login/mot de passe) |
| Usage | **tout le CRUD** (assets, tickets, dropdowns, users) | **UNIQUEMENT** ce que la v2 ne sait pas faire |

La v2 ne gère **ni l'upload de fichiers, ni les liens** : ces 3 opérations
passent obligatoirement par la v1 (fonctions de `glpiV1Client.ts`) :

- `v1UploadDocument(name, filename, blob)` → crée un Document avec son fichier ;
- `v1LinkDocumentToItem(documentId, itemId, itemtype)` → lie un document à un élément ;
- `v1LinkItemToTicket(ticketId, itemId, itemtype)` → onglet « Éléments » d'un ticket
  (+ `v1GetTicketItems(ticketId)` pour éviter les doublons de lien).

Le paramètre `itemtype` est le nom de classe GLPI : utiliser
`versItemtypeGlpi('computer')` → `'Computer'` (de `@/config/parc`).

---

## 7. Vérifications avant de rendre (checklist)

Dans `NewApp/`, dans l'ordre :

```bash
npx vue-tsc --noEmit   # 1) typage TypeScript : doit afficher 0 erreur
npx eslint src/        # 2) lint : doit afficher 0 erreur
npm run build          # 3) le build doit passer
```

4) **Test manuel complet** :
   - page Réinitialisation → tout vider ;
   - page Import → réimporter les CSV ;
   - comparer les comptes des dashboards aux **valeurs de référence**
     (voir `docs/GUIDE_UTILISATION.md` §4) ;
   - ouvrir la console (F12) : aucun `✗` ne doit apparaître.

5) Relire son diff : pas de `console.log` orphelin (toujours passer par
   `creerLogger`), pas de fichier `generated/` modifié.

---

## 8. FrontOffice : modules centraux (ajout)

Le FrontOffice (liste éléments, création ticket, Kanban) repose sur quelques
modules partagés. **Modifier l'un d'eux modifie les 3 pages d'un coup.**

| Fichier | Rôle |
|---|---|
| `src/config/tickets.ts` | Libellés ET options de filtre (statut, priorité, urgence, impact, type). Source unique. |
| `src/config/kanban.ts` | Les 3 colonnes du Kanban et quels statuts GLPI vont dans chaque colonne. |
| `src/services/ticketActions.ts` | `creerTicketComplet()` et `changerStatutTicket()` — toutes les écritures de ticket. |
| `src/services/langueService.ts` | CRUD des langues du Kanban (couleurs+libellés par langue, SQLite). |
| `src/composables/useOptionsElements.ts` | Liste à plat des assets sélectionnables (pour associer au ticket). |
| `src/composables/useFiltreParc.ts` | Filtrage du parc + helpers d'affichage (`nomStatut`, `nomLieu`…). |
| `src/components/FormulaireTicket.vue` | **Le** formulaire de ticket, utilisé par la page Création ET le dialogue Kanban. |
| `src/components/BarreFiltres.vue` | Barre de filtres réutilisable (dashboards + liste éléments). |

Règle d'or : le formulaire de ticket n'appelle JAMAIS le réseau lui-même. Il
émet `@submit="..."` avec un objet `DonneesTicket` ; la page appelle
`creerTicketComplet`. C'est pourquoi le même formulaire marche partout.

---

## 9. Recettes FrontOffice (temps limité, sans IA)

### Recette 7 : ajouter un champ au formulaire de ticket (ex : « lieu »)
1. `FormulaireTicket.vue` → ajouter une clé dans `form` (`locationId: 0`) ;
2. ajouter le `<label><select v-model.number="form.locationId">…</select></label>` ;
3. ajouter la clé dans l'objet émis par `envoyer()` ;
4. `services/ticketActions.ts` → `DonneesTicket` : ajouter `locationId?: number`,
   et dans `creerTicketComplet` ajouter `location: relation(d.locationId)`.
→ Le champ apparaît AUTOMATIQUEMENT dans la page Création ET le Kanban.

### Recette 8 : ajouter un critère de recherche à la liste des éléments
1. `composables/useFiltreParc.ts` → ajouter la clé dans `FiltresParc` et
   `filtresVides()`, puis la condition dans le `.filter()` ;
2. `pages/FrontOffice/ListeElement.vue` → ajouter une ligne dans `champsFiltres`.
(Même procédé pour les filtres tickets via `useFiltreTickets.ts`.)

### Recette 9 : changer quels statuts vont dans une colonne Kanban
`src/config/kanban.ts` → modifier `statutsGlpi` de la colonne. Exemple : mettre
les tickets « En attente » (4) dans la 3e colonne au lieu de la 2e. Le board, le
comptage et le drag&drop suivent sans autre modification.

### Recette 10 : ajouter une langue au Kanban
Aucune modification de code. Page `/stockage` → « Ajouter une langue » (code +
nom). Ses 3 statuts/couleurs sont créés et apparaissent dans le sélecteur de
langue du Kanban. (Backend Spring doit tourner.)

---

## 10. Aléas probables et comment réagir (anticipation)

| Symptôme | Cause probable | Réaction |
|---|---|---|
| Colonnes vides dans la liste des éléments | assets importés sans statut/lieu/… (CSV partiel ou import incomplet) | réimporter le CSV complet ; vérifier que `parcAssetMapper` reçoit bien les colonnes |
| Le Kanban affiche 100 tickets max | quelqu'un a remis `getTickets` sur l'API v2 | `getTickets` DOIT passer par `v1GetAll('Ticket')` (cf. §6) |
| Réimport → erreur 500 « doit être unique » | un dropdown (statut/lieu/fabricant) existe déjà | c'est `glpiEnsureService` qui dédoublonne : ne jamais POST un dropdown sans chercher d'abord. Sinon réinitialiser d'abord. |
| Création de ticket : statut ignoré | `status` envoyé comme entier au lieu de `{id:N}` | toujours `status: { id: N }` (géré par `ticketActions`) |
| Tickets « Clos » invisibles | filtre `is_deleted` mal posé | les Clos restent `is_deleted=0` ; ne pas filtrer la corbeille à l'affichage |
| Reset laisse des éléments | suppression via DELETE v2 (corbeille seulement) | la purge passe par l'API v1 `force_purge=1` (cf. `resetService`) |
| Couleurs/langues du Kanban figées | backend Spring éteint → valeurs de repli `LANGUES_DEFAUT` | lancer `cd Backend && mvn spring-boot:run` |
| La page de connexion est décalée à droite | règle CSS d'offset attrape `.login-page` | le sélecteur exclut `.login-page` (cf. `assets/backoffice.css`) |

### Comment ajouter une fonctionnalité vite, sans IA
1. Chercher la **recette** la plus proche dans §4 (BackOffice) ou §9 (FrontOffice).
2. Toujours partir d'un **module central** (`config/*`, `services/*`,
   `composables/*`) : on modifie un seul endroit, l'effet se propage.
3. Lancer la **checklist §7** (type-check, lint, build) avant de rendre.
