# Guide FrontOffice — par thématique et par page

> But : **modifier** ou **créer** une page FrontOffice vite, sans IA, en
> réutilisant les **modules centraux**. Règle d'or identique au BackOffice :
> on réutilise un module, on ne recopie pas de logique.

Sommaire :
- [A. Les modules réutilisables](#a-les-modules-réutilisables)
- [B. Thématique : Parc / Éléments (liste)](#b-thématique--parc--éléments)
- [C. Thématique : Tickets — création](#c-thématique--tickets--création)
- [D. Thématique : Tickets — Kanban](#d-thématique--tickets--kanban)
- [E. Le formulaire de ticket PARTAGÉ](#e-le-formulaire-de-ticket-partagé)
- [F. Recette : créer une nouvelle page FrontOffice](#f-recette--créer-une-nouvelle-page-frontoffice)

---

## A. Les modules réutilisables

| Module | Sert à | Pages |
|---|---|---|
| `config/parc.ts` | Types d'équipements (1 ligne = 1 type). | Liste, Formulaire |
| `config/tickets.ts` | Libellés + options de filtre tickets. | Kanban, Formulaire |
| `config/kanban.ts` | Les 3 colonnes + statuts de chacune. | Kanban |
| `composables/useParcAssets.ts` | Charger le parc. | Liste |
| `composables/useFiltreParc.ts` | Filtrer le parc + helpers d'affichage. | Liste |
| `composables/useOptionsElements.ts` | Assets sélectionnables (multi). | Formulaire |
| `services/ticketActions.ts` | `creerTicketComplet` / `changerStatutTicket`. | Création, Kanban |
| `services/langueService.ts` | Langues Kanban (couleurs/libellés, SQLite). | Kanban |
| `components/FormulaireTicket.vue` | **LE** formulaire de ticket. | Création, Kanban |
| `components/BarreFiltres.vue` | Barre de filtres. | Liste |

Toutes les pages FrontOffice commencent par `<AppSidebarFO />` puis `<main>`.

---

## B. Thématique : Parc / Éléments

**Page** : `ListeElement.vue` (`/listeElement`) — sujet J1 « liste avec
recherche multi-critères ».
**Modules** : `useParcAssets` (charge les types), `useFiltreParc` (filtre +
helpers `nomStatut`, `nomLieu`, `nomUtilisateur`, `nomModele`,
`numeroInventaire`), `BarreFiltres`, `config/parc`.

- Colonnes : ID, Type, Nom, Statut, Lieu, Utilisateur, Fabricant, Modèle, N°.
- Filtres : nom/n° inventaire, type, statut, lieu, fabricant, utilisateur.
- Si une colonne est vide pour tous : les assets ont été importés sans cette
  donnée (réimporter le CSV complet).

**Ajouter une colonne** → ajouter un `<th>` + un `<td>{{ helper(row) }}</td>`,
en réutilisant un helper de `useFiltreParc.ts` (ou en ajouter un, exporté).

**Ajouter un critère de recherche** → MAINTENANCE §9 recette 8.

---

## C. Thématique : Tickets — création

**Page** : `CreateTickets.vue` (`/createTicket`) — sujet J1 « créer un ticket,
associer plusieurs éléments ».
**Modules** : `FormulaireTicket.vue` (tout le formulaire) + `ticketActions`
(`creerTicketComplet`).

La page est **fine** : elle affiche le formulaire et, au `@submit`, appelle
`creerTicketComplet(donnees)`. Toute la logique de champs est dans le composant.

```vue
<FormulaireTicket ref="formulaire" :en-chargement="enChargement" @submit="creer" />
```

`creerTicketComplet` gère pour toi : POST du ticket (status en `{id}`), acteurs
(TeamMember), éléments associés (API v1 Item_Ticket), durée (tâche timeline).

---

## D. Thématique : Tickets — Kanban

**Page** : `KanbanTickets.vue` (`/kanbanTickets`) — sujet J2 « présentation
Kanban ».
**Modules** : `config/kanban` (colonnes), `config/tickets` (libellés),
`ticketActions` (statut), `langueService` (langues), `FormulaireTicket` (dialogue
de création), `getTicketById` (détail complet).

- 3 colonnes ; quel statut va dans quelle colonne = `config/kanban.ts`.
- **Drag & drop** : déposer une carte → dialogue de confirmation + note de
  suivi (sujet J2) → `changerStatutTicket`.
- **« + Ajouter 1 ticket »** : ouvre le **même** formulaire que `/createTicket`
  (mode compact), pré-positionné sur le statut de la colonne.
- **Clic sur une carte** : recharge le ticket complet (`getTicketById`) pour
  afficher catégorie, lieu, etc. (absents de la liste).
- **Langue** : le sélecteur en haut change libellés + couleurs des colonnes
  (lus depuis le CRUD `/stockage`).
- Compteur par colonne = nombre de cartes (sujet J2).

**Changer les statuts d'une colonne** → `config/kanban.ts`, champ `statutsGlpi`.
**Changer une couleur/un libellé de colonne** → page `/stockage` (pas de code).

---

## E. Le formulaire de ticket PARTAGÉ

`components/FormulaireTicket.vue` est utilisé par **deux** pages : `/createTicket`
et le dialogue du Kanban. C'est la pièce la plus importante du FrontOffice.

Principe : le formulaire **n'appelle jamais le réseau**. Il émet `@submit` avec
un objet `DonneesTicket`. La page parente décide quoi en faire.

Props :
- `statutInitial` (number) : statut pré-sélectionné (le Kanban met celui de la colonne) ;
- `compact` (bool) : version réduite pour le dialogue (cache SLA/OLA, catégorie…) ;
- `enChargement` (bool) : désactive le bouton pendant l'envoi.

**Ajouter un champ au formulaire** (apparaît dans LES DEUX pages) :
1. `FormulaireTicket.vue` → ajouter la clé dans `form`, le `<label>`, et dans
   l'objet émis par `envoyer()` ;
2. `services/ticketActions.ts` → ajouter le champ dans `DonneesTicket` et son
   mapping dans `creerTicketComplet`.

---

## F. Recette : créer une nouvelle page FrontOffice

Exemple : « Page qui affiche mes tickets en cartes (sans drag) ».

1. **Créer** `src/pages/FrontOffice/MesTickets.vue` :
   ```vue
   <script setup lang="ts">
   import { onMounted } from 'vue'
   import AppSidebarFO from '@/components/layout/AppSidebarFO.vue'
   import { useTickets } from '@/composables/generated/useTickets'
   import { useFiltreTickets } from '@/composables/useFiltreTickets'
   import BarreFiltres from '@/components/BarreFiltres.vue'
   import { OPTIONS_STATUT } from '@/config/tickets'

   const { tickets, loadTickets } = useTickets()
   const { filtres, ticketsFiltres, reinitialiser } = useFiltreTickets(tickets)
   const champs = [{ cle: 'statut', label: 'Statut', type: 'select', options: OPTIONS_STATUT }]
   onMounted(loadTickets)
   </script>
   <template>
     <AppSidebarFO />
     <main>
       <h1>Mes tickets</h1>
       <BarreFiltres :modele="filtres" :champs="champs" @reset="reinitialiser" />
       <div v-for="t in ticketsFiltres" :key="t.id">{{ t.name }}</div>
     </main>
   </template>
   ```
2. **Route** dans `src/router/index.ts` : importer la page en haut du fichier
   (`import mesTickets from '@/pages/FrontOffice/MesTickets.vue'`) puis ajouter
   `{ path: '/mesTickets', name: 'mesTickets', component: mesTickets }`.
   (Pas de `requiresAuth` : le FrontOffice n'est pas protégé.)
3. **Lien** dans `src/components/layout/AppSidebarFO.vue` (tableau `menus`).
4. **Vérifier** : `npx vue-tsc --noEmit` + `npm run build`.

> Pour une page de **création/édition** de ticket : réutiliser
> `FormulaireTicket` + `creerTicketComplet` (voir §C et §E). Ne jamais
> reconstruire un formulaire de ticket à la main.

> Pour une page **liste d'un autre type** : copier `ListeElement.vue` et changer
> la source via `config/parc.ts` (ou un `getAllActifs('/Assets/…')`).
