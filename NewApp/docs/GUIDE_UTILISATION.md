# Guide d'utilisation — NewApp GLPI

## 1. Démarrage rapide

Prérequis :

- GLPI 11 installé en local (http://localhost).
- Node.js installé.
- Java 17+ et Maven (pour le backend SQLite).

Lancer le frontend :

```bash
cd NewApp
npm install
npm run dev
```

→ ouvrir http://localhost:5173

Lancer le backend SQLite (réglages Kanban) :

```bash
cd Backend
mvn spring-boot:run
```

→ écoute sur le port 8080.

Fichier `NewApp/.env` (clés réelles, secrets masqués) :

| Clé | Valeur |
| --- | --- |
| `VITE_GLPI_API_URL` | `http://localhost/api.php/v2.3` |
| `VITE_GLPI_API_V1_URL` | `http://localhost/apirest.php` |
| `VITE_BACKEND_URL` | `http://localhost:8080` |
| `VITE_GLPI_TOKEN_URL` | `http://localhost/api.php/token` |
| `VITE_GLPI_CLIENT_ID` | `********` (secret) |
| `VITE_GLPI_CLIENT_SECRET` | `********` (secret) |
| `VITE_GLPI_USERNAME` / `VITE_GLPI_PASSWORD` | identifiants GLPI |
| `VITE_GLPI_SCOPE` | `api user email status graphql` |

## 2. Les pages

Toutes les routes sont dans `src/router/index.ts`. `/` redirige vers `/login`.
Les pages BackOffice demandent d'être connecté (`/login`, identifiants GLPI du `.env`).

### BackOffice

| Route | Rôle | Actions possibles |
| --- | --- | --- |
| `/accueil` | Page d'accueil BackOffice. | Lien vers la réinitialisation. |
| `/reinitialisationBase` | Vide la base GLPI (parc, tickets, documents, users non protégés id>6). | Bouton « Réinitialiser » (sélection) ou « Tout réinitialiser », tableau des résultats par endpoint. |
| `/importFichier` | Import complet du jeu d'essai. | Sélection des 3 CSV + ZIP d'images, case « Ne pas importer les images », bouton « Lancer l'import complet », tableaux récapitulatifs. |
| `/dashboardElementGeneral` | Stats des équipements du parc (5 types). | Lecture : vue globale, répartition par statut (tous types), puis par type. |
| `/dashboardTickets` | Stats des tickets. | Lecture : vue globale, statuts, priorités, urgences, impacts, incidents/requêtes par statut, coûts. |
| `/focusTickets` | Liste détaillée des tickets. | Bouton « Voir » sur un ticket → fiche complète (type, statut, priorité, etc.). |
| `/stockage` | Personnalisation du Kanban (couleurs des 3 colonnes + noms malgaches). | Modifier puis « Enregistrer », ou « Restaurer les défauts ». Stocké en SQLite via le backend 8080. |

### FrontOffice

| Route | Rôle | Actions possibles |
| --- | --- | --- |
| `/accueilFrontOffice` | Page d'accueil FrontOffice. | Navigation vers les autres pages. |
| `/listeElement` | Liste des éléments du parc. | Recherche multi-critères : nom/n° inventaire, type, statut, lieu, fabricant, utilisateur. Bouton « Réinitialiser les filtres ». |
| `/createTicket` | Création d'un ticket. | Formulaire complet : ticket, acteurs, **plusieurs éléments associés**, niveaux de service. |
| `/kanbanTickets` | Tickets en Kanban (3 colonnes). | Drag & drop (avec confirmation + note), voir le détail d'un ticket, créer un ticket dans une colonne (**même formulaire** que `/createTicket`), changer la **langue** d'affichage des colonnes. |

> Le formulaire de création est **le même** sur `/createTicket` et dans le
> dialogue « + Ajouter 1 ticket » du Kanban (composant `FormulaireTicket`).
> Les langues et couleurs des colonnes Kanban se gèrent dans `/stockage`.

## 3. Procédure d'import complète (l'ordre exact)

1. `/reinitialisationBase` → « Tout réinitialiser » (vide le parc, les tickets, les documents et les users non protégés id>6).
2. Recharger la page d'import (F5) pour vider les registres en mémoire.
3. `/importFichier` → sélectionner les 3 CSV + le ZIP (ou cocher « Ne pas importer les images »).
4. Cliquer « Lancer l'import complet ».
5. Vérifier le tableau récapitulatif + la console (F12), préfixe `[IMPORT]`.

## 4. VALEURS DE RÉFÉRENCE (jeu d'essai import/120)

### Équipements (CSV 1) — Total : 60

| Type | Nombre |
| --- | --- |
| Computer | 21 |
| Monitor | 20 |
| Phone | 19 |

| Statut | Nombre |
| --- | --- |
| En stock | 13 |
| Maintenance | 9 |
| En panne | 7 |
| Retiré | 7 |
| En production | 7 |
| Volé | 7 |
| Perdu | 5 |
| Au rebut | 5 |

| Lieu | Nombre |
| --- | --- |
| Bibliothèque | 13 |
| Magasin Informatique | 12 |
| Laboratoire IA | 11 |
| Administration | 10 |
| Salle 301 | 9 |
| Comptabilité | 5 |

### Tickets (CSV 2) — Total : 120 (Incidents 60, Requêtes 60)

Statuts CSV → GLPI :

| Statut CSV | Nombre | Statut GLPI |
| --- | --- | --- |
| New | 15 | Nouveau |
| In Progress (assigned) | 63 | En cours (Attribué) |
| Closed | 42 | Clos |

Priorités CSV → GLPI :

| Priorité CSV | Nombre | Priorité GLPI |
| --- | --- | --- |
| Very Low | 17 | Très basse |
| Low | 13 | Basse |
| Medium | 22 | Moyenne |
| High | 22 | Haute |
| Very High | 18 | Très haute |
| Major | 28 | Majeure |

Éléments liés : 279 références brutes dans le CSV, dont 29 doublons dans un même ticket → **250 liens attendus dans GLPI**. 98 tickets ont au moins 1 élément. Toutes les références pointent vers des équipements existants (0 invalide).

### Coûts (CSV 3) — Total : 150 entrées

| Mesure | Valeur |
| --- | --- |
| Tickets uniques avec coûts | 56 |
| Coût temps total | 67 453 050,27 |
| Coût fixe total | 60 989 636,85 |
| Coût global | 128 442 687,12 |
| Durée totale | 418 641 s (≈ 116,3 h) |
| Références orphelines | 0 (toutes existent dans le CSV 2) |

### Où comparer ?

- `/dashboardElementGeneral` : équipements par type et statut.
- `/dashboardTickets` : statuts, priorités, coûts, éléments liés.

IMPORTANT : ces chiffres ne sont valables que sur une BASE FRAÎCHEMENT RÉINITIALISÉE. Si on importe 2 fois sans réinitialiser, les totaux doublent.

## 5. Lire les logs (F12 → Console)

Chaque page écrit ses messages avec un préfixe :
`[IMPORT]`, `[Dashboard Tickets]`, `[Dashboard Éléments]`, `[Réinitialisation]`, `[Stockage Kanban]`, `[Focus Tickets]`, `[Connexion]`.

Symboles : `ℹ` info, `✓` succès, `⚠` attention, `✗` erreur.

Exemple de session d'import saine :

```
[IMPORT] ℹ Début de l'import complet
[IMPORT] ✓ CSV 1 : 60 équipements créés
[IMPORT] ✓ CSV 2 : 120 tickets créés, 250 éléments liés
[IMPORT] ✓ CSV 3 : 150 coûts ajoutés
[IMPORT] ✓ Images : import terminé
```

Repérer une erreur : chercher le symbole `✗` (rouge). Le message donne la ligne CSV ou l'élément en cause, puis l'erreur lisible (HTTP, GLPI...). Un `⚠` n'est pas bloquant (ex. image ignorée).

## 6. Problèmes fréquents

| Symptôme | Cause | Solution |
| --- | --- | --- |
| HTTP 401 | Token expiré | Recharger la page (reconnexion auto). |
| « Backend injoignable » sur `/stockage` | Spring Boot pas lancé | `cd Backend && mvn spring-boot:run` (port 8080). |
| 400 `ERROR_GLPI_ADD` pendant l'import | Élément déjà lié (base non réinitialisée) | Compté « déjà lié », pas bloquant. |
| Image « Ignoré : aucun élément correspondant » | Le nom du fichier ne correspond à aucun `Name` du CSV 1 | Normal. |
| Totaux dashboard ≠ valeurs de référence | Base importée plusieurs fois | Réinitialiser puis réimporter. |
| Type non supporté : `NetworkEquipment` | Hors des 5 types du parc | Normal, ignoré. |

### Commandes utiles

```bash
npm run dev               # frontend en mode développement (port 5173)
npm run build             # build de production
npm run lint              # vérification du code
mvn spring-boot:run       # backend SQLite (depuis Backend/, port 8080)
```
