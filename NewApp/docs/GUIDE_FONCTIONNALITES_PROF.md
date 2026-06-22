# Guide débutant — Les 3 fonctionnalités clés (pattern du prof)

> **À lire en premier.** Ce guide explique, pas à pas et avec des extraits de
> code commentés, les trois pages qui portent les fonctionnalités demandées par
> le prof. Les prochaines fonctionnalités se baseront sur ces principes, donc
> prends le temps de bien comprendre :
>
> 1. **`/importMouvements`** — le pattern « une seule fonction métier » (saisie
>    manuelle ET import appellent EXACTEMENT la même fonction).
> 2. **`/coutsParc`** — le calcul des coûts (fixe + horaire + nouveau prix).
> 3. **`/kanbanTickets`** — l'affichage du `Ref_Ticket` (1, 2, 3…) au lieu de
>    l'id GLPI à 4 chiffres.
>
> Un fil rouge relie les trois : la **correspondance `Ref_Ticket → id GLPI`**.

---

## Table des matières

- [0. Vocabulaire de base](#0-vocabulaire-de-base)
- [1. Le fil rouge : Ref_Ticket ≠ id GLPI](#1-le-fil-rouge--ref_ticket--id-glpi)
- [2. Page `/importMouvements` (le pattern du prof)](#2-page-importmouvements-le-pattern-du-prof)
- [3. Page `/coutsParc` (calcul des coûts)](#3-page-coutsparc-calcul-des-coûts)
- [4. Page `/kanbanTickets` (afficher la réf)](#4-page-kanbantickets-afficher-la-réf)
- [5. Récapitulatif & ordre des opérations](#5-récapitulatif--ordre-des-opérations)
- [6. Comment ajouter une nouvelle fonctionnalité dessus](#6-comment-ajouter-une-nouvelle-fonctionnalité-dessus)

---

## 0. Vocabulaire de base

| Terme | Ce que c'est |
|-------|--------------|
| **GLPI** | Le logiciel de gestion de parc + tickets. On lui parle via une **API REST** (HTTP). |
| **API v1 / v2** | Deux versions de l'API GLPI. v2 = moderne (`api.php`), v1 = ancienne (`apirest.php`). On utilise les deux selon les cas. |
| **SQLite local** | Une petite base de données qui vit **dans le navigateur** (via `sql.js` + IndexedDB). Elle remplace l'ancien backend Spring Boot. Fichier : [`src/services/sqlite/localDb.ts`](../src/services/sqlite/localDb.ts). |
| **Ref_Ticket** | Le numéro logique du ticket dans les **fichiers d'import** (1, 2, 3…). |
| **id GLPI** | Le vrai identifiant que GLPI attribue tout seul (ex : 2976). On ne le choisit pas. |
| **Vue / `.vue`** | Le framework d'interface. Un fichier `.vue` = un écran (HTML + JS + CSS ensemble). |
| **`ref()` / `computed()`** | Outils Vue. `ref()` = une variable réactive (l'écran se met à jour quand elle change). `computed()` = une valeur calculée automatiquement à partir d'autres `ref()`. |

---

## 1. Le fil rouge : `Ref_Ticket` ≠ `id GLPI`

C'est **le** point à comprendre avant tout le reste.

### Le problème

Tes fichiers d'import (dossier `import/202600605-J1/`) numérotent les tickets
`1, 2, 3…` (colonne `Ref_Ticket`). Mais quand on crée un ticket dans GLPI,
**c'est GLPI qui choisit son id** (2976, 2977…). On ne peut **pas** forcer GLPI
à repartir de 1 : l'API REST ne permet pas de réinitialiser son compteur
interne (`AUTO_INCREMENT`).

```
Fichier CSV          GLPI
Ref_Ticket = 1   →   id = 2976
Ref_Ticket = 2   →   id = 2977
```

Donc si un fichier de mouvements dit « ticket 1, terminer, 150 », il faut
**traduire** le `1` en `2976` avant d'appeler GLPI.

### La solution : une table de correspondance dans SQLite

On crée une table `ref_ticket` qui mémorise le lien. Elle est **remplie au moment
où on importe les tickets**, puis **relue** par les mouvements et le Kanban.

**Schéma de la table** — [`src/services/sqlite/localDb.ts`](../src/services/sqlite/localDb.ts) :

```ts
CREATE TABLE IF NOT EXISTS ref_ticket (
  ref        TEXT PRIMARY KEY,   -- "1", "2", "3"… (la réf du fichier)
  glpi_id    INTEGER NOT NULL    -- 2976, 2977…    (l'id réel GLPI)
);
```

**Les 3 fonctions pour la manipuler** (toujours dans `localDb.ts`) :

```ts
// 1) ENREGISTRER : appelé à l'import des tickets.
//    mapping = { "1": 2976, "2": 2977 }
export async function enregistrerRefsTickets(mapping: Record<string, number>): Promise<void> {
  const db = await getDb()
  for (const [ref, glpiId] of Object.entries(mapping)) {
    if (!ref?.trim() || !glpiId) continue
    // INSERT OR REPLACE = ajoute, ou écrase si la réf existe déjà.
    db.run('INSERT OR REPLACE INTO ref_ticket (ref, glpi_id) VALUES (?, ?)', [ref.trim(), glpiId])
  }
  await persister(db) // sauvegarde dans le navigateur (IndexedDB)
}

// 2) LIRE : renvoie tout le mapping sous forme d'objet { "1": 2976, "2": 2977 }
export async function getRefsTickets(): Promise<Record<string, number>> {
  const db = await getDb()
  const out: Record<string, number> = {}
  for (const r of lignes(db, 'SELECT ref, glpi_id FROM ref_ticket')) {
    out[String(r.ref)] = Number(r.glpi_id)
  }
  return out
}

// 3) VIDER : appelé à la réinitialisation de la base.
export async function supprimerRefsTickets(): Promise<void> {
  const db = await getDb()
  db.run('DELETE FROM ref_ticket')
  await persister(db)
}
```

> 🧠 **À retenir :** la table `ref_ticket` est le « traducteur ». Sans elle,
> les mouvements et le Kanban retombent sur l'id GLPI brut.

---

## 2. Page `/importMouvements` (le pattern du prof)

Fichiers :
- Écran : [`src/pages/BackOffice/ImportMouvements.vue`](../src/pages/BackOffice/ImportMouvements.vue)
- Logique métier : [`src/services/import/mouvementImportService.ts`](../src/services/import/mouvementImportService.ts)

### 2.1 Le principe DU PROF : UNE seule fonction métier

> 🎯 **C'est LE point de l'évaluation.** Le prof veut que **la saisie manuelle**
> et **l'import de fichier** appellent **exactement la même fonction**. On ne
> duplique pas la logique : on construit le même texte CSV des deux côtés, puis
> on le donne à une fonction unique.

Schéma mental :

```
   Saisie manuelle  ┐
   (lignes + bouton)│
                    ├──►  on fabrique le MÊME texte CSV  ──►  traiter(csv)
   Import fichier   │                                          (1 seule fonction)
   (.csv / .txt)    ┘
```

### 2.2 La fonction métier unique : `traiter(csv)`

Dans `ImportMouvements.vue`. Elle **ne sait pas** d'où vient le texte. Elle fait
toujours la même chose : analyser le CSV, puis appliquer les mouvements.

```ts
// ─── 1. FONCTION MÉTIER (la « source de vérité ») ───
//   Elle ne sait PAS d'où viennent les lignes (manuel ou fichier).
//   La saisie manuelle ET l'import construisent le MÊME texte CSV puis
//   appellent EXACTEMENT cette fonction.
async function traiter(csv: string) {
  erreurGlobale.value = ''
  resultats.value = []

  // Étape A : transformer le texte en liste de mouvements (+ erreurs de format)
  const { mouvements, erreurs } = parserMouvements(csv)
  erreursParsing.value = erreurs

  if (mouvements.length === 0) {
    erreurGlobale.value = 'Aucun mouvement valide à importer.'
    return
  }

  // Étape B : appliquer les mouvements (statut GLPI + coût SQLite)
  loading.value = true
  try {
    resultats.value = await importerMouvements(mouvements)
  } catch (err) {
    erreurGlobale.value = messageErreur(err)
  } finally {
    loading.value = false
  }
}
```

### 2.3 Comment la SAISIE MANUELLE alimente cette fonction

L'utilisateur remplit des lignes (ticket / mvt / valeur) avec un bouton `+`.
Ces lignes sont **transformées en texte CSV**, le même format que le fichier.

```ts
// Une ligne de saisie = 3 champs (comme une ligne du fichier)
type LigneManuelle = { ticket: string; mvt: string; valeur: string }
const lignesManuelles = ref<LigneManuelle[]>([{ ticket: '', mvt: 'open', valeur: '' }])

function ajouterLigne() {
  lignesManuelles.value.push({ ticket: '', mvt: 'open', valeur: '' }) // le bouton +
}

// 👇 LE point clé : on sérialise les lignes manuelles dans le MÊME format
//    CSV que le fichier. Résultat : "2968, close, 150\n2969, cancel"
function manuelVersCsv(): string {
  return lignesManuelles.value
    .filter((l) => l.ticket.trim() !== '')              // on ignore les lignes vides
    .map((l) =>
      l.mvt === 'cancel'                                // cancel n'a pas de valeur
        ? `${l.ticket}, cancel`
        : `${l.ticket}, ${l.mvt}, ${l.valeur}`,
    )
    .join('\n')
}
```

### 2.4 Comment l'IMPORT FICHIER alimente cette fonction

On lit le fichier comme texte, on le met dans la même variable `texte`.

```ts
// APPEL DEPUIS L'IMPORTATION (fichier) : on lit le contenu puis on le stocke.
async function onFichier(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  texte.value = await file.text()   // le contenu brut du .csv
  rafraichirParsing()
}
```

### 2.5 Le branchement final : tout passe par `traiter()`

Les deux sources (manuel + fichier) sont **combinables** grâce à 2 cases à cocher.
Le bouton « Traiter » fabrique le CSV combiné et appelle l'unique `traiter()`.

```ts
const modeManuel = ref(true)   // case « Saisie manuelle »
const modeFichier = ref(false) // case « Fichier / texte CSV »

// CSV combiné : lignes manuelles (si actif) + texte/fichier (si actif).
function csvCombine(): string {
  const morceaux: string[] = []
  if (modeManuel.value) morceaux.push(manuelVersCsv()) // source 1
  if (modeFichier.value) morceaux.push(texte.value)    // source 2
  return morceaux.filter((m) => m.trim() !== '').join('\n')
}

// APPEL DEPUIS L'INTERFACE : manuel et/ou fichier → la MÊME fonction traiter().
function lancer() {
  return traiter(csvCombine())
}
```

> ✅ **Résumé du pattern :** `manuelVersCsv()` et `onFichier()` produisent tous
> deux du **texte CSV**. `csvCombine()` les fusionne. `traiter()` est appelée une
> seule fois, peu importe la source. **C'est exactement ce que le prof demande.**

### 2.6 La sémantique des mouvements (open / cancel / close)

Dans [`mouvementImportService.ts`](../src/services/import/mouvementImportService.ts),
chaque mouvement déclenche une action métier précise :

```ts
const STATUT_IN_PROGRESS = 2  // « En cours » dans GLPI
const STATUT_TERMINE = 5      // « Résolu/Terminé » dans GLPI

async function appliquerUn(m: MouvementParse): Promise<MouvementResultat> {
  try {
    // ── cancel : on annule les coûts et on repasse le ticket « en cours » ──
    if (m.mvt === 'cancel') {
      await annulerCoutsDuTicket(m.ticketId)
      await changerStatutTicket(m.ticketId, STATUT_IN_PROGRESS)
      return { ...m, success: true, message: 'Coûts annulés, ticket repassé en cours' }
    }

    // open et close ont besoin des items liés (pour répartir le coût dessus)
    const items = await v1GetTicketItems(m.ticketId)
    if (items.length === 0) {
      return { ...m, success: false, message: 'Aucun item lié à ce ticket : le coût ne peut pas être réparti' }
    }

    // ── open : RÉOUVERTURE, on majore le dernier coût de +N % ──
    if (m.mvt === 'open') {
      await reouvrirTicket(m.ticketId, m.valeur, items)
      await changerStatutTicket(m.ticketId, STATUT_IN_PROGRESS)
      return { ...m, success: true, message: `Réouverture +${m.valeur} % appliquée` }
    }

    // ── close : TERMINER, on enregistre le nouveau coût « valeur » ──
    await changerStatutTicket(m.ticketId, STATUT_TERMINE)
    await enregistrerNouveauCout(m.ticketId, m.valeur, items)
    return { ...m, success: true, message: `Ticket terminé, coût ${m.valeur} enregistré` }
  } catch (err) {
    return { ...m, success: false, message: messageErreur(err) }
  }
}
```

| Mouvement | Exemple CSV | Effet |
|-----------|-------------|-------|
| `open` | `1, open, 16.5` | Réouverture : majore le dernier coût de **+16,5 %**, statut → En cours |
| `cancel` | `2, cancel` | Annule les coûts actifs du ticket, statut → En cours |
| `close` | `1, close, 150` | Terminer : enregistre un nouveau coût de **150**, statut → Terminé |

### 2.7 La traduction Ref → id (le fil rouge en action)

`importerMouvements()` relit la table `ref_ticket` et traduit chaque réf :

```ts
export async function importerMouvements(mouvements: MouvementParse[]): Promise<MouvementResultat[]> {
  // tickets réellement présents dans GLPI (on ne crée jamais de ticket ici)
  const tickets = await getTickets()
  const idsExistants = new Set(tickets.map((t) => t.id).filter((id): id is number => id != null))

  // 👇 le traducteur Ref_Ticket → id GLPI (rempli à l'import des tickets)
  const refs = await getRefsTickets()

  const resultats: MouvementResultat[] = []
  for (const m of mouvements) {
    // 1) si la réf "1" est connue → on prend l'id GLPI (ex 2976)
    // 2) sinon → on garde la valeur telle quelle (au cas où c'est déjà un id GLPI)
    const idResolu = refs[m.ref] ?? m.ticketId
    const m2 = { ...m, ticketId: idResolu }

    if (!idsExistants.has(idResolu)) {
      // le ticket n'existe pas → message clair, on n'applique rien
      resultats.push({ ...m2, success: false,
        message: `Ticket introuvable dans GLPI — réimportez les tickets d'abord` })
      continue
    }
    resultats.push(await appliquerUn(m2)) // ✅ ici on applique vraiment
  }
  return resultats
}
```

---

## 3. Page `/coutsParc` (calcul des coûts)

Fichiers :
- Écran : [`src/pages/FrontOffice/CoutsParc.vue`](../src/pages/FrontOffice/CoutsParc.vue)
- Logique : [`src/services/coutsParcService.ts`](../src/services/coutsParcService.ts)

### 3.1 Les 3 composantes d'un coût

Pour **un ticket**, le total se compose de :

```
total = coût fixe  +  coût horaire  +  nouveau prix
```

- **coût fixe** = `cost_fixed` + `cost_material` (vient de GLPI)
- **coût horaire** = `cost_time` × (durée / 3600) ← ⚠️ piège, voir ci-dessous
- **nouveau prix** = les coûts saisis via les mouvements (stockés en SQLite)

### 3.2 ⚠️ Le piège du coût horaire (taux × durée)

`cost_time` n'est **pas** un montant : c'est un **taux horaire** (€/h). Le vrai
coût = taux × durée. La durée est en **secondes** → on divise par 3600 (1 heure).

```ts
// Dans coutsGlpiDuTicket() — coutsParcService.ts
const tauxHoraire = nombre(ligne.cost_time)                   // ex : 8,7 €/h
const dureeSecondes = nombre(ligne.duration) || nombre(ligne.actiontime) // ex : 600 s
const ligneHoraire = tauxHoraire * (dureeSecondes / 3600)     // 8,7 × (600/3600) = 1,45 €
```

> 💡 `duration` est le nom du champ en API v2 ; `actiontime` en API v1. On gère
> les deux avec `|| ` (« si l'un est vide, prends l'autre »).

**Exemple concret (données du dossier `import/202600605-J1/`)** — ticket
« Tsy mandeha » a 2 lignes de coût GLPI :

| Ligne | cost_fixed | cost_time (taux) | durée | coût horaire calculé |
|-------|-----------|------------------|-------|----------------------|
| 1 | 109 | 0 | 0 s | 0 |
| 2 | 50 | 8,7 €/h | 600 s | 8,7 × 600/3600 = **1,45 €** |

```
coût fixe   = 109 + 50 = 159,00 €
coût horaire= 0 + 1,45   =   1,45 €
total       = 159 + 1,45 = 160,45 €   ✅
```

### 3.3 Le total par ticket

```ts
// Dans construireCoutsParc()
const coutFixe = coutsGlpi.fixe                                   // 159
const coutHoraire = coutsGlpi.horaire                             // 1,45
const nouveauPrix = items.reduce((s, i) => s + i.nouveauPrixParItem, 0) // 0 ici
const total = coutFixe + coutHoraire + nouveauPrix               // 160,45
```

### 3.4 D'où viennent les lignes du tableau

> 🧠 Les lignes du tableau **ne viennent pas** de SQLite, mais des **liens
> (ticket × item) de GLPI**. Ainsi un ticket apparaît dès qu'il a un item lié,
> même si aucun coût n'a encore été saisi.

```ts
// On demande à GLPI les items liés de chaque ticket
const items = await v1GetTicketItems(id)
// → une ligne par ticket, les items empilés dans la cellule « Items »
```

Le « nouveau prix » SQLite (saisi par les mouvements) vient **se superposer**
à ces lignes. Si SQLite est vide, la colonne affiche simplement `0,00 €`.

---

## 4. Page `/kanbanTickets` (afficher la réf)

Fichier : [`src/pages/FrontOffice/KanbanTickets.vue`](../src/pages/FrontOffice/KanbanTickets.vue)

### 4.1 Objectif

Afficher le **Ref_Ticket** (1, 2, 3…) sur les cartes, avec l'**id GLPI** entre
parenthèses « au cas où ». C'est encore le fil rouge `ref_ticket`.

### 4.2 Construire la map inverse (id GLPI → réf)

La table SQLite stocke `réf → id`. Pour le Kanban on a besoin de l'**inverse**
(`id → réf`), car on part d'un ticket GLPI et on veut retrouver sa réf.

```ts
// Map inverse de la table ref_ticket
const refParId = ref<Map<number, string>>(new Map())

// On charge tickets + mapping en parallèle, puis on inverse le mapping
async function charger() {
  loading.value = true
  try {
    const [liste, refs] = await Promise.all([getTickets(), getRefsTickets()])
    tickets.value = liste
    // refs = { "1": 2976 } → on veut Map { 2976 → "1" }
    refParId.value = new Map(Object.entries(refs).map(([ref, id]) => [id, ref]))
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Erreur inconnue'
  } finally {
    loading.value = false
  }
}
```

### 4.3 La fonction d'affichage (avec repli)

```ts
/** Ref logique du ticket si connue, sinon son id GLPI en repli. */
function refDuTicket(t: Ticket): string {
  return (t.id != null && refParId.value.get(t.id)) || String(t.id ?? '?')
}
```

> 🧠 Le **repli** (`|| String(t.id)`) est important : si un ticket n'a pas été
> importé via les fichiers (donc absent de `ref_ticket`), on affiche quand même
> son id GLPI au lieu de rien.

### 4.4 L'affichage dans le HTML (template)

```html
<!-- Sur la carte -->
<div class="card-id">
  #{{ refDuTicket(ticket) }}
  <span class="card-id-glpi">(GLPI #{{ ticket.id }})</span>
</div>

<!-- Dans le détail -->
<h2>
  Ticket #{{ refDuTicket(detailTicket) }}
  <small class="titre-glpi">(GLPI #{{ detailTicket.id }})</small>
</h2>
```

Résultat à l'écran : **`#1 (GLPI #2976)`** au lieu de `#2976`.

---

## 5. Récapitulatif & ordre des opérations

> ⚠️ **L'ordre compte !** La table `ref_ticket` est remplie à l'import des
> tickets. Tant qu'elle est vide, les mouvements et le Kanban retombent sur
> l'id GLPI.

```
1. Réinitialiser la base      (vide GLPI + SQLite, y compris ref_ticket)
        │
2. Importer les fichiers      (crée les tickets dans GLPI
   (page Import de fichiers)   ET remplit ref_ticket : "1"→2976, "2"→2977)
        │
3. Importer les mouvements    (lit ref_ticket, traduit 1→2976, applique open/cancel/close)
   (page Import de mouvements)
        │
4. Voir le résultat           Kanban : #1 (GLPI #2976)
                              Coûts  : 160,45 €
```

**Où la correspondance est créée** — [`ImportBackOffice.vue`](../src/pages/BackOffice/ImportBackOffice.vue), après l'import des tickets :

```ts
const { results, ticketRegistry: reg } = await importTicketRows(csv2Rows.value, assetsRegistry.value)
// reg = { "1": 2976, "2": 2977 }
await enregistrerRefsTickets(reg)  // 👈 on mémorise la correspondance
```

---

## 6. Comment ajouter une nouvelle fonctionnalité dessus

Les prochaines fonctionnalités réutiliseront ces briques. Quelques réflexes :

1. **Besoin d'une nouvelle source de saisie (ex : coller depuis Excel) ?**
   → ne réécris pas la logique. Produis du **texte CSV** et appelle `traiter()`.
   C'est tout l'intérêt du pattern du prof.

2. **Besoin d'un nouveau type de mouvement ?**
   → ajoute-le dans `TypeMouvement` + `MVT_VALIDES` + un `if` dans `appliquerUn()`
   ([`mouvementImportService.ts`](../src/services/import/mouvementImportService.ts)).

3. **Besoin d'afficher la réf ailleurs ?**
   → réutilise `getRefsTickets()` et construis la map inverse, comme dans le
   Kanban (`refParId` + `refDuTicket`).

4. **Besoin de stocker une nouvelle donnée locale ?**
   → ajoute une table dans le `SCHEMA` de [`localDb.ts`](../src/services/sqlite/localDb.ts)
   et des fonctions `enregistrer…` / `get…` / `supprimer…` à côté.
   N'oublie pas de la vider dans la réinitialisation
   ([`resetService.ts`](../src/services/reset/resetService.ts)).

5. **Toujours** : un coût horaire = **taux × durée/3600**, jamais le taux brut.

---

*Fichiers de référence :*
- [`src/services/import/mouvementImportService.ts`](../src/services/import/mouvementImportService.ts)
- [`src/pages/BackOffice/ImportMouvements.vue`](../src/pages/BackOffice/ImportMouvements.vue)
- [`src/services/coutsParcService.ts`](../src/services/coutsParcService.ts)
- [`src/pages/FrontOffice/CoutsParc.vue`](../src/pages/FrontOffice/CoutsParc.vue)
- [`src/pages/FrontOffice/KanbanTickets.vue`](../src/pages/FrontOffice/KanbanTickets.vue)
- [`src/services/sqlite/localDb.ts`](../src/services/sqlite/localDb.ts)
