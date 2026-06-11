# Rapport — Revue du sujet, corrections et backend SQLite

Date : 11 juin 2026
Périmètre : `NewApp/` (Vue 3), nouveau `Backend/` (Spring Boot + SQLite), conformité au sujet d'évaluation (J0 → J2).

---

## 1. Couverture du sujet

### Jour 0 / pré-requis

| Exigence | État | Où |
|---|---|---|
| NewApp sur techno au choix (Vue 3) liée à GLPI | ✅ | `NewApp/` (Vite + Vue 3 + TS) |
| Réinitialisation de données | ✅ | `/reinitialisationBase` |
| Import de fichier | ✅ | `/importFichier` |
| Utilisation de SQLite | ✅ **(nouveau)** | `Backend/` Spring Boot + SQLite (`Backend/data/newapp.db`) |
| Échanges API au format JSON | ✅ | API GLPI v2 (JSON) + backend Spring Boot (JSON) |

### Jour 1 — BackOffice

| Exigence | État | Où |
|---|---|---|
| Code unique comme mot de passe, prérempli sur le formulaire | ✅ | `/login` (`pass` prérempli) |
| Protection des pages du back office | ✅ **(corrigé)** | guard `requiresAuth` — `/focusTickets` et `/stockage` n'étaient pas protégées |
| Page bouton de réinitialisation | ✅ | `/reinitialisationBase` |
| Import des 4 fichiers (3 CSV + 1 ZIP d'images) | ✅ | `/importFichier` (sélection simultanée, import séquentiel, ZIP via JSZip) |
| Dashboard nb d'éléments général + détail par type | ✅ | `/dashboardElementGeneral` (16 types) |
| Dashboard nb de tickets général + détail par type | ✅ | `/dashboardTickets` (total, incidents/requêtes, par statut, par priorité) |
| Page tickets avec fiche | ✅ | `/focusTickets` |

### Jour 1 — FrontOffice

| Exigence | État | Où |
|---|---|---|
| Liste des éléments avec recherche multi-critères | ✅ | `/listeElement` (type + nom + statut + lieu + utilisateur ; statut et lieu en `<select>` alimentés dynamiquement) |
| Création de ticket avec plusieurs éléments associés | ✅ (avec contournement API, cf. §4) | `/createTicket` |

### Jour 2 — FrontOffice : Kanban

| Exigence | État | Où |
|---|---|---|
| 3 colonnes Nouveau / In progress / Terminé | ✅ | `/kanbanTickets` |
| Création via « + Ajouter 1 ticket » (par colonne) | ✅ | dialogue titre + description, statut de la colonne appliqué |
| Glisser-déposer de n'importe quelle colonne vers n'importe quelle autre | ✅ | drag & drop HTML5 |
| Boîte de dialogue si infos supplémentaires au changement de statut | ✅ | dialogue de confirmation + note de suivi optionnelle (ajoutée en followup) |
| Clic sur un ticket = tous les détails | ✅ | dialogue détail (statut, priorité, urgence, impact, catégorie, lieu, dates, description…) |
| Nombre total de tickets par colonne | ✅ | badge compteur dans l'en-tête de chaque colonne |

### Jour 2 — BackOffice : valeurs dans SQLite

| Exigence | État | Où |
|---|---|---|
| Personnaliser les 3 couleurs de fond du Kanban | ✅ **(nouveau)** | `/stockage` → PUT backend → SQLite ; couleurs appliquées au fond des colonnes du Kanban |
| Version malgache des noms de statut (vaovao, efa manao, vita) | ✅ **(nouveau)** | `/stockage` (libellés FR + MG par colonne) ; bouton de bascule FR ↔ MG sur le Kanban |
| Stockage dans SQLite | ✅ **(nouveau)** | table `kanban_settings` dans `Backend/data/newapp.db` |

> Avant cette session, la page `/stockage` gérait couleurs/langues **uniquement en mémoire** (rien de persisté, rien d'appliqué au Kanban) — c'était le principal écart au sujet.

---

## 2. Nouveau backend Spring Boot + SQLite

```
Backend/
├── pom.xml                  Spring Boot 3.3.5, Java 17, sqlite-jdbc, hibernate-community-dialects
├── README.md                instructions de lancement + doc API
├── data/newapp.db           base SQLite (créée automatiquement au 1er démarrage)
└── src/main/java/com/newapp/backend/
    ├── BackendApplication.java          point d'entrée + seed des 3 colonnes
    ├── config/CorsConfig.java           CORS pour http://localhost:5173 (Vite)
    └── kanban/
        ├── KanbanSetting.java           entité JPA (statusKey, position, labelFr, labelMg, color)
        ├── KanbanSettingRepository.java
        ├── KanbanSettingService.java    validation #RRGGBB, mise à jour partielle, reset
        ├── KanbanSettingUpdate.java     DTO du corps JSON
        └── KanbanSettingController.java REST JSON
```

### API (JSON)

| Méthode | URL | Rôle |
|---|---|---|
| GET | `/api/kanban/settings` | les 3 colonnes |
| PUT | `/api/kanban/settings` | mise à jour partielle (champs absents non modifiés), couleur validée `#RRGGBB` → 400 sinon |
| POST | `/api/kanban/settings/reset` | restaure Nouveau/Vaovao `#dbeafe`, In progress/Efa manao `#ffedd5`, Terminé/Vita `#dcfce7` |

### Tests effectués (curl, backend lancé)

- `GET` → 3 colonnes seedées ✔
- `PUT {color:"#ffcc00", labelMg:"Vaovao be"}` → persisté, **vérifié directement dans le fichier SQLite** (`sqlite3 … "SELECT …"`) ✔
- `PUT {color:"rouge"}` → **400** ✔
- `POST /reset` → valeurs par défaut restaurées ✔
  (un bug a été trouvé et corrigé pendant ce test : Hibernate réordonnait les INSERT avant le DELETE → violation de contrainte unique ; corrigé avec `deleteAllInBatch()`)

### Côté frontend

- `NewApp/src/services/kanbanSettingsService.ts` *(nouveau)* : GET/PUT/reset typés + valeurs par défaut de secours.
- `StockageValeursVersionLangue.vue` *(réécrite)* : tableau des 3 colonnes (label FR, label MG, couleur, aperçu), boutons « Enregistrer dans SQLite » et « Restaurer les valeurs par défaut », message clair si le backend est éteint.
- `KanbanTickets.vue` : charge les réglages au montage (repli silencieux sur les défauts si backend éteint), applique la **couleur de fond par colonne** et propose un bouton de **bascule français ↔ malagasy** des noms de colonnes.
- `.env` : ajout de `VITE_BACKEND_URL=http://localhost:8080`.

---

## 3. Anomalies trouvées et corrigées

### Conformité au sujet

| # | Problème | Correction |
|---|---|---|
| 1 | `/stockage` et `/focusTickets` (pages BackOffice) **sans `requiresAuth`** | ajouté dans `src/router/index.ts` |
| 2 | Sidebar BackOffice : liens **morts** vers `/stockageCouleur` et `/stockageLangue` (routes inexistantes) | remplacés par un lien unique vers `/stockage` |
| 3 | Couleurs/langue du Kanban ni persistées ni appliquées | backend SQLite + application au Kanban (cf. §2) |
| 4 | « Durée totale » du ticket jamais enregistrée | cf. §4 (contournement testé sur l'API réelle) |

### Build cassé — 51 erreurs TypeScript → 0

`npm run build` (qui inclut `vue-tsc`) **échouait avant la revue**. Détail :

| Fichier | Problème | Correction |
|---|---|---|
| `src/import/{cout,image,inventaire,ticket}.ts` | orphelins (jamais importés), pointaient vers des modules **inexistants** (`@/api/clientV1`, `@/utils/chunk`, `@/types/import`…) — ~25 erreurs | **supprimés** (`git rm`, récupérables dans l'historique) ; remplacés depuis longtemps par `src/services/import/*` |
| `src/pages/BackOffice/StockageValeursCouleur.vue` | page orpheline (non routée), typage faux (`const couleur1: string = ref("")`), aucune sauvegarde réelle (console.log) | **supprimée** — remplacée par la page `/stockage` connectée à SQLite |
| `CreateTickets.vue` | `actiontime` envoyé dans le POST alors que le type (et l'API) ne l'acceptent pas | remplacé par la création d'une tâche (cf. §4) |
| `computerImportMapper.ts` / `monitorImportMapper.ts` | relations `{ id }` incompatibles avec les types `*Input` générés (10 erreurs) | ajout de `ComputerCreatePayload` / `MonitorCreatePayload` dans les services (même pattern que `TicketCreatePayload` déjà en place pour les tickets) |
| `csvParser.ts` | `rows[0]` possiblement `undefined` | garde `?? []` |
| `ticketImportService.ts` | `day`/`month` possiblement `undefined` dans `parseDate` | garde explicite |
| `sqliteService.ts` | paramètre implicitement `any` + `dbInstance: any` | typé avec `Database` de `sql.js` |
| `AppSidebarFO.vue` | accès à `menu.children` non présent dans le type inféré | type `MenuEntry` explicite |

### Lint — 52 erreurs → 0

- 25 services générés : import `getById` inutilisé → retiré.
- `tokenManager.ts` : variable `refreshToken` écrite mais jamais lue → supprimée.
- `eslint.config.ts` : `src/types/generated/**` (schémas générés du swagger, 8 erreurs `{}`) exclu du lint — on ne corrige pas du code généré à la main.
- `no-explicit-any` : tous les `any` éliminés (`ListeElement`, `KanbanTickets`, `CreateTickets`, `assetImportService`, `ticketImportService`, `glpiEnsureService`, `glpiAssetLookupService`, `sqliteService`) au profit de types structurels ou de narrowing.
- Fonctions/imports morts : `assetPresentPourImage` (ImportBackOffice), import `parseCsvFile` (Réinitialisation), variable `created` (Kanban).

### Qualité / UX

- `LoginBackOffice.vue` : « Mot de passe incorrect » partait dans `console.log` → affiché en rouge dans le formulaire.
- `KanbanTickets.vue` : un échec du PATCH de statut était avalé silencieusement → message d'erreur affiché.
- `deconnexionButton` rendait un `<button>` directement enfant de `<ul>` (HTML invalide) → enveloppé dans `<li>` dans les deux sidebars.
- `console.log` retirés des pages et services (`ReinitialisationBackOffice`, `resetService`).

---

## 4. Limites connues de l'API GLPI v2 et contournements (testés sur l'instance locale)

| Limitation API v2 | Preuve | Contournement implémenté |
|---|---|---|
| **`Item_Ticket` n'existe pas** (impossible d'associer officiellement un élément à un ticket) | 10+ endpoints essayés → 404 | les éléments sélectionnés sont consignés dans un **followup** de la timeline du ticket |
| **`team` ignoré** dans le POST `/Assistance/Ticket` | acteurs absents après création | POST `/Assistance/Ticket/{id}/TeamMember` par rôle (requester / observer / assigned) après création — fonctionne (201) |
| **`actiontime` readonly** (durée totale) | POST avec `actiontime: 3600` → relu à `0` | GLPI calcule la durée totale comme la **somme des durées des tâches** : on crée une tâche `Timeline/Task` avec `duration` (secondes). Testé : ticket relu avec `actiontime = 3600` ✔. Le champ « Durée totale » de `/createTicket` est désormais un `<select>` identique à GLPI (0h05 → 8h00) |

Note Kanban : la colonne « In progress » regroupe les statuts GLPI 2 (attribué), 3 (planifié), 4 (en attente) et 10 ; « Terminé » regroupe 5 (résolu) et 6 (clos). Un dépôt dans une colonne applique le statut principal (2 ou 5).

---

## 5. Points restants (non bloquants, en connaissance de cause)

- `src/services/sqliteService.ts` (sql.js en mémoire navigateur) et `NewApp/database/*.sql` : approche SQLite initiale, **plus utilisée nulle part** depuis le backend Spring Boot. Conservés pour référence ; supprimables.
- `src/stores/counter.ts` : store Pinia d'exemple du scaffold, jamais utilisé.
- Les identifiants OAuth GLPI sont en clair dans `NewApp/.env` (committé). Acceptable pour une éval en local, à ne pas reproduire en production.
- Le bundle JS dépasse 500 kB (warning Vite) — du code-splitting par route serait possible.

---

## 6. Lancement de l'ensemble

```bash
# 1. GLPI (ExistingApp) — doit tourner sur http://localhost

# 2. Backend SQLite (réglages Kanban)
cd Backend
mvn spring-boot:run            # → http://localhost:8080, crée data/newapp.db

# 3. Frontend
cd NewApp
npm install
npm run dev                    # → http://localhost:5173
```

Parcours de démo J2 : `/login` (code `pass`) → `/stockage` : changer une couleur et un nom malgache → Enregistrer → ouvrir `/kanbanTickets` : les fonds de colonnes reflètent SQLite, le bouton « Hova amin'ny teny malagasy » bascule les titres en vaovao / efa manao / vita.

---

## 7. État final des vérifications

| Vérification | Avant | Après |
|---|---|---|
| `npm run type-check` (vue-tsc) | **51 erreurs** | **0** |
| `npm run lint` (oxlint + eslint) | **52 erreurs** | **0** |
| `npm run build` | échec (type-check) | ✅ |
| `mvn package` (Backend) | — | ✅ |
| API backend (GET/PUT/400/reset + fichier SQLite) | — | ✅ testée via curl |
| Durée totale ticket (`actiontime`) | jamais enregistrée | ✅ testée : relue à 3600 s |
