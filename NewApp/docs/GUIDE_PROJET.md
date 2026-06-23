# GUIDE_PROJET.md — Annulations de réouverture (Alea 1) + Plafond de réouverture (Alea 2)

## 1. Résumé de la fonctionnalité

Page **Liste des réouvertures** (`ListeReouverture.vue`).

**Alea 1 — Annulations**
- Bouton **« Annuler le dernier coût »** : la dernière réouverture est marquée annulée (elle disparaît de la liste des réouvertures et apparaît dans un nouveau tableau **« Liste des annulations »**).
- Bouton **« Rétablir »** dans la liste des annulations : la réouverture redevient active, exactement à sa position d'origine (son `lot` ne change pas), puis les valeurs sont recalculées.
- On n'a pas créé de table : on réutilise la colonne `annule` de `nouveau_cout` (0 = active, 1 = annulée).

**Alea 2 — Plafond**
- Nouveau paramètre **Plafond de réouverture (%)**, stocké en SQLite dans une nouvelle table `parametre`.
- Le total cumulé des réouvertures ne dépasse jamais : `somme(Super Cost) × plafond %`.
- Si une réouverture dépasse, sa valeur est automatiquement limitée au disponible. Recalcul automatique après chaque ajout/suppression/annulation/rétablissement de coût.
- Les réouvertures annulées (négligeables) ne comptent pas dans le total.

---

## 2. Ordre logique des fichiers à toucher

1. `src/services/sqlite/localDb.ts` (table + logique SQLite)
2. `src/services/nouveauCoutService.ts` (wrappers)
3. `src/pages/FrontOffice/ListeReouverture.vue` (interface)

---

## 3. Modifications détaillées par fichier

## Fichier : src/services/sqlite/localDb.ts

### Ligne à ajouter ou modifier

Chercher cette ligne (fin de la constante `SCHEMA`) :

```
CREATE TABLE IF NOT EXISTS ref_ticket (
  ref        TEXT PRIMARY KEY,
  glpi_id    INTEGER NOT NULL
);
`
```

Remplacer par :

```ts
CREATE TABLE IF NOT EXISTS ref_ticket (
  ref        TEXT PRIMARY KEY,
  glpi_id    INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS parametre (
  cle    TEXT PRIMARY KEY,
  valeur TEXT NOT NULL
);
`
```

---

### Nouvelle fonction à ajouter

À placer après la fonction :
`coutSelonMode`

```ts
// ─── PLAFOND DE RÉOUVERTURE (Alea 2) ──────────────────────────────────────────
//
// Le total cumulé des coûts de réouverture ne doit jamais dépasser un pourcentage
// de la somme des Super Cost. On stocke ce pourcentage dans la table `parametre`
// (clé 'plafond_reouverture'). Les réouvertures annulées (annule = 1, considérées
// négligeables) ne comptent pas dans le total.

// Lit le plafond en % (0 = pas de plafond défini).
function lirePlafond(db: Database): number {
  const r = lignes(db, "SELECT valeur FROM parametre WHERE cle = 'plafond_reouverture'")[0]
  return r ? Number(r.valeur) || 0 : 0
}

// Somme de tous les Super Cost actifs (base du plafond).
function sommeSupercosts(db: Database): number {
  return unNombre(
    db,
    "SELECT COALESCE(SUM(cout), 0) FROM nouveau_cout WHERE type = 'supercost' AND annule = 0",
  )
}

// Total des réouvertures actives, en excluant le lot en cours de calcul.
function totalReouvertures(db: Database, exclTicket?: number, exclLot?: number): number {
  let sql = "SELECT COALESCE(SUM(cout), 0) FROM nouveau_cout WHERE type = 'reouverture' AND annule = 0"
  const params: unknown[] = []
  if (exclTicket != null && exclLot != null) {
    sql += ' AND NOT (ticket_id = ? AND lot = ?)'
    params.push(exclTicket, exclLot)
  }
  return unNombre(db, sql, params)
}

// Limite un total de réouverture voulu au plafond encore disponible.
// Renvoie le total autorisé (jamais négatif). Sans plafond défini → total voulu.
function limiterAuPlafond(
  db: Database,
  totalVoulu: number,
  exclTicket?: number,
  exclLot?: number,
): number {
  const pourcentage = lirePlafond(db)
  if (pourcentage <= 0) {
    return totalVoulu
  }
  const max = sommeSupercosts(db) * (pourcentage / 100)
  const dispo = max - totalReouvertures(db, exclTicket, exclLot)
  if (dispo <= 0) {
    return 0
  }
  return totalVoulu > dispo ? dispo : totalVoulu
}

/** Plafond de réouverture en % (0 si non défini). */
export async function getPlafond(): Promise<number> {
  const db = await getDb()
  return lirePlafond(db)
}

/** Enregistre le plafond de réouverture (en %). */
export async function setPlafond(valeur: number): Promise<void> {
  const db = await getDb()
  db.run("INSERT OR REPLACE INTO parametre (cle, valeur) VALUES ('plafond_reouverture', ?)", [
    String(valeur),
  ])
  await persister(db)
}
```

---

### Ancienne fonction

`reouvrir` (extrait à modifier au milieu de la fonction) :

```ts
  const lot = prochainLot(db, ticketId)
  const base = await coutSelonMode(ticketId, mode, lot) // déjà par item
  const incrementParItem = arrondi4(base * (pourcentage / 100))

  const crees = insererCouts(
```

### Nouvelle fonction à copier-coller

```ts
  const lot = prochainLot(db, ticketId)
  const base = await coutSelonMode(ticketId, mode, lot) // déjà par item
  let incrementParItem = arrondi4(base * (pourcentage / 100))

  // Alea 2 : on ne dépasse jamais le plafond de réouverture.
  const totalVoulu = incrementParItem * items.length
  const totalAutorise = limiterAuPlafond(db, totalVoulu, ticketId, lot)
  incrementParItem = arrondi4(totalAutorise / items.length)

  const crees = insererCouts(
```

---

### Ligne à ajouter ou modifier (dans `findAllReouverture`)

Chercher cette ligne :

```
      WHERE type = 'reouverture'
      GROUP BY ticket_id, lot
```

Remplacer par :

```ts
      WHERE type = 'reouverture' AND annule = 0
      GROUP BY ticket_id, lot
```

---

### Ancienne fonction

`updateReouverture` :

```ts
export async function updateReouverture(
  ticketId: number,
  lot: number,
  pourcentage: number,
  mode: number,
): Promise<void> {
  const db = await getDb()
  // base = clôtures ANTÉRIEURES à cette réouverture (lot <), selon le mode.
  const base = await coutSelonMode(ticketId, mode, lot)
  const vaovaoValue = arrondi4(base * (pourcentage / 100))
  db.run(
    "UPDATE nouveau_cout SET cout = ?, pourcentage = ?, mode = ? WHERE ticket_id = ? AND lot = ? AND type = 'reouverture'",
    [vaovaoValue, pourcentage, mode, ticketId, lot],
  )
  await persister(db)
}
```

### Nouvelle fonction à copier-coller

```ts
export async function updateReouverture(
  ticketId: number,
  lot: number,
  pourcentage: number,
  mode: number,
): Promise<void> {
  const db = await getDb()
  // base = clôtures ANTÉRIEURES à cette réouverture (lot <), selon le mode.
  const base = await coutSelonMode(ticketId, mode, lot)
  let vaovaoValue = arrondi4(base * (pourcentage / 100))

  // Alea 2 : on limite le total de cette réouverture au plafond disponible.
  const isany = unNombre(
    db,
    "SELECT COUNT(*) FROM nouveau_cout WHERE ticket_id = ? AND lot = ? AND type = 'reouverture'",
    [ticketId, lot],
  )
  if (isany > 0) {
    const totalAutorise = limiterAuPlafond(db, vaovaoValue * isany, ticketId, lot)
    vaovaoValue = arrondi4(totalAutorise / isany)
  }

  db.run(
    "UPDATE nouveau_cout SET cout = ?, pourcentage = ?, mode = ? WHERE ticket_id = ? AND lot = ? AND type = 'reouverture'",
    [vaovaoValue, pourcentage, mode, ticketId, lot],
  )
  await persister(db)
}
```

---

### Nouvelle fonction à ajouter

À placer après la fonction :
`deleteReouverture`

```ts
// ─── ANNULATIONS DE RÉOUVERTURE (Alea 1) ──────────────────────────────────────
//
// « Annuler le dernier coût » marque la dernière réouverture comme annulée
// (annule = 1) sans la supprimer : elle quitte la liste des réouvertures et
// apparaît dans la liste des annulations. « Rétablir » la remet active (annule = 0)
// exactement à sa position d'origine (son `lot` n'a jamais changé).

/** Annule le dernier coût de réouverture appliqué (le plus récent). */
export async function annulerDerniereReouverture(): Promise<void> {
  const db = await getDb()
  // dernière réouverture active = la ligne au plus grand id
  const r = lignes(
    db,
    "SELECT ticket_id, lot FROM nouveau_cout WHERE type = 'reouverture' AND annule = 0 ORDER BY id DESC LIMIT 1",
  )[0]
  if (!r) {
    return
  }
  const ticketId = Number(r.ticket_id)
  const lot = Number(r.lot)
  db.run(
    "UPDATE nouveau_cout SET annule = 1 WHERE ticket_id = ? AND lot = ? AND type = 'reouverture'",
    [ticketId, lot],
  )
  // Le total des réouvertures a baissé : on recalcule (le plafond se libère).
  await recalculerReouvertures(db, ticketId)
  await persister(db)
}

/** Liste des réouvertures annulées (le tableau « Liste des annulations »). */
export async function findAnnulations(): Promise<Reouverture[]> {
  const db = await getDb()
  return lignes(
    db,
    `SELECT ticket_id, lot, pourcentage, mode, SUM(cout) AS valeur
       FROM nouveau_cout
      WHERE type = 'reouverture' AND annule = 1
      GROUP BY ticket_id, lot
      ORDER BY ticket_id ASC, lot ASC`,
  ).map((r) => ({
    ticketId: Number(r.ticket_id),
    lot: Number(r.lot),
    pourcentage: Number(r.pourcentage),
    mode: Number(r.mode),
    valeur: Number(r.valeur) || 0,
  }))
}

/** Rétablit une réouverture annulée (remise active à sa position d'origine). */
export async function retablirReouverture(ticketId: number, lot: number): Promise<void> {
  const db = await getDb()
  db.run(
    "UPDATE nouveau_cout SET annule = 0 WHERE ticket_id = ? AND lot = ? AND type = 'reouverture'",
    [ticketId, lot],
  )
  // Réouverture de nouveau active : on recalcule sa valeur (base × %, plafonnée).
  await recalculerReouvertures(db, ticketId)
  await persister(db)
}
```

---

### Ancienne fonction

`recalculerReouvertures` :

```ts
async function recalculerReouvertures(db: Database, ticketId: number) {
  // (lot, pourcentage, mode) de chaque lot de réouverture du ticket.
  const lots = lignes(
    db,
    `SELECT lot, pourcentage, mode
       FROM nouveau_cout
      WHERE ticket_id = ? AND type = 'reouverture'
      GROUP BY lot`,
    [ticketId],
  )
  for (const r of lots) {
    const mode = Number(r.mode)
    const pourcentage = Number(r.pourcentage)
    const lot = Number(r.lot)
    // base = clôtures ANTÉRIEURES à cette réouverture (lot <), selon son mode.
    const base = await coutSelonMode(ticketId, mode, lot)
    const valeurParItem = arrondi4(base * (pourcentage / 100))
    db.run(
      "UPDATE nouveau_cout SET cout = ? WHERE ticket_id = ? AND lot = ? AND type = 'reouverture'",
      [valeurParItem, ticketId, lot],
    )
  }
}
```

### Nouvelle fonction à copier-coller

```ts
async function recalculerReouvertures(db: Database, ticketId: number) {
  // (lot, pourcentage, mode) de chaque lot de réouverture ACTIF du ticket.
  const lots = lignes(
    db,
    `SELECT lot, pourcentage, mode, COUNT(*) AS nb
       FROM nouveau_cout
      WHERE ticket_id = ? AND type = 'reouverture' AND annule = 0
      GROUP BY lot`,
    [ticketId],
  )
  for (const r of lots) {
    const mode = Number(r.mode)
    const pourcentage = Number(r.pourcentage)
    const lot = Number(r.lot)
    const nb = Number(r.nb) || 1
    // base = clôtures ANTÉRIEURES à cette réouverture (lot <), selon son mode.
    const base = await coutSelonMode(ticketId, mode, lot)
    // Alea 2 : on recalcule en respectant le plafond disponible.
    const totalAutorise = limiterAuPlafond(db, arrondi4(base * (pourcentage / 100)) * nb, ticketId, lot)
    const valeurParItem = arrondi4(totalAutorise / nb)
    db.run(
      "UPDATE nouveau_cout SET cout = ? WHERE ticket_id = ? AND lot = ? AND type = 'reouverture'",
      [valeurParItem, ticketId, lot],
    )
  }
}
```

---

## Fichier : src/services/nouveauCoutService.ts

### Nouvelle fonction à ajouter

À placer après la fonction :
`supprimerReouverture`

```ts
// ─── ANNULATIONS DE RÉOUVERTURE (Alea 1) ──────────────────────────────────────

/** Annule le dernier coût de réouverture appliqué. */
export function annulerDerniereReouverture(): Promise<void> {
  return localDb.annulerDerniereReouverture()
}

/** Liste des réouvertures annulées. */
export function getAnnulations(): Promise<Reouverture[]> {
  return localDb.findAnnulations()
}

/** Rétablit une réouverture annulée (à sa position d'origine). */
export function retablirReouverture(ticketId: number, lot: number): Promise<void> {
  return localDb.retablirReouverture(ticketId, lot)
}

// ─── PLAFOND DE RÉOUVERTURE (Alea 2) ──────────────────────────────────────────

/** Lit le plafond de réouverture (en %). */
export function getPlafond(): Promise<number> {
  return localDb.getPlafond()
}

/** Enregistre le plafond de réouverture (en %) puis recalcule les réouvertures. */
export async function setPlafond(valeur: number): Promise<void> {
  await localDb.setPlafond(valeur)
  await localDb.recalculerToutesReouvertures()
}
```

---

## Fichier : src/pages/FrontOffice/ListeReouverture.vue

### Ancienne fonction (import)

```ts
import {
  getReouvertures,
  modifierReouverture,
  supprimerReouverture,
  getSupercosts,
  modifierSupercost,
  supprimerSupercost,
  type Reouverture,
  type Supercost,
} from '@/services/nouveauCoutService'
```

### Nouvelle fonction à copier-coller

```ts
import {
  getReouvertures,
  modifierReouverture,
  supprimerReouverture,
  getSupercosts,
  modifierSupercost,
  supprimerSupercost,
  annulerDerniereReouverture,
  getAnnulations,
  retablirReouverture,
  getPlafond,
  setPlafond,
  type Reouverture,
  type Supercost,
} from '@/services/nouveauCoutService'
```

---

### Lignes à ajouter

Chercher ces lignes :

```ts
// listany = la liste des reouverture
const listany = ref<Reouverture[]>([])
// listanyOuverture = la liste des ouverture (supercost)
const listanyOuverture = ref<Supercost[]>([])
```

Remplacer par :

```ts
// listany = la liste des reouverture
const listany = ref<Reouverture[]>([])
// listanyAnnulation = la liste des annulations (réouvertures annulées)
const listanyAnnulation = ref<Reouverture[]>([])
// listanyOuverture = la liste des ouverture (supercost)
const listanyOuverture = ref<Supercost[]>([])
// plafond = pourcentage maximum de réouverture autorisé (Alea 2)
const plafond = ref<number>(0)
```

---

### Ancienne fonction

```ts
// Coût de réouverture recalculé EN DIRECT = base (clôtures antérieures × mode) × %.
// Toujours cohérent avec la colonne base, sans avoir à cliquer Modifier.
function coutReouverture(ligne: Reouverture): number {
  const base = baseSelonMode(ligne.ticketId, ligne.mode, ligne.lot)
  return Math.round(base * (ligne.pourcentage / 100) * 100) / 100
}

// Total général de tous les coûts de réouverture (pour comparer à la cible).
const totalReouverture = computed(() =>
  listany.value.reduce((t, l) => t + coutReouverture(l), 0),
)
```

### Nouvelle fonction à copier-coller

```ts
// Total général de tous les coûts de réouverture (valeur stockée = déjà plafonnée).
const totalReouverture = computed(() =>
  listany.value.reduce((t, l) => t + l.valeur, 0),
)

// Plafond (Alea 2) : somme des Super Cost × pourcentage, et montant encore disponible.
const sommeSupercost = computed(() =>
  listanyOuverture.value.reduce((t, l) => t + l.valeur, 0),
)
const plafondMax = computed(() => Math.round(sommeSupercost.value * (plafond.value / 100) * 100) / 100)
const plafondDispo = computed(() => Math.max(0, Math.round((plafondMax.value - totalReouverture.value) * 100) / 100))
```

---

### Lignes à ajouter (dans `alaoListany`)

Chercher ces lignes :

```ts
async function alaoListany() {
  listany.value = await getReouvertures()
  listanyOuverture.value = await getSupercosts()
```

Remplacer par :

```ts
async function alaoListany() {
  listany.value = await getReouvertures()
  listanyAnnulation.value = await getAnnulations()
  listanyOuverture.value = await getSupercosts()
  plafond.value = await getPlafond()
```

---

### Nouvelle fonction à ajouter

À placer après la fonction :
`supprimer`

```ts
// --- annulations (Alea 1) ---
async function annulerDernier() {
  await annulerDerniereReouverture()
  await alaoListany()
}

async function retablir(ligne: Reouverture) {
  await retablirReouverture(ligne.ticketId, ligne.lot)
  await alaoListany()
}

// --- plafond (Alea 2) ---
async function enregistrerPlafond() {
  await setPlafond(plafond.value)
  await alaoListany()
}
```

---

### Ligne à ajouter ou modifier (template — colonne coût de la table Reouverture)

Chercher cette ligne :

```
          <td>{{ coutReouverture(ligne) }}</td>
```

Remplacer par :

```html
          <td>{{ ligne.valeur }}</td>
```

---

### Lignes à ajouter (template — bloc plafond + bouton « Annuler le dernier coût »)

Chercher ces lignes :

```html
    <h3>Reouverture</h3>
    <table border="1">
```

Remplacer par :

```html
    <h3>Plafond de réouverture</h3>
    <p>
      Plafond (%) :
      <input type="number" v-model.number="plafond" />
      <button @click="enregistrerPlafond">Enregistrer</button>
    </p>
    <p>
      Somme Super Cost : {{ sommeSupercost }} —
      Plafond max : {{ plafondMax }} —
      Disponible : {{ plafondDispo }}
    </p>

    <h3>Reouverture</h3>
    <p><button @click="annulerDernier">Annuler le dernier coût</button></p>
    <table border="1">
```

---

### Lignes à ajouter (template — tableau « Liste des annulations »)

Chercher ces lignes (fin de la table Reouverture) :

```html
      </tfoot>
    </table>
  </div>
</template>
```

Remplacer par :

```html
      </tfoot>
    </table>

    <h3>Liste des annulations</h3>
    <table border="1">
      <thead>
        <tr>
          <th>Ticket</th>
          <th>Lot</th>
          <th>Mode</th>
          <th>Pourcentage</th>
          <th>Coût annulé</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ligne in listanyAnnulation" :key="cle(ligne.ticketId, ligne.lot)">
          <td>{{ refTicket(ligne.ticketId) }}</td>
          <td>{{ ligne.lot }}</td>
          <td>{{ ligne.mode }}</td>
          <td>{{ ligne.pourcentage }} %</td>
          <td>{{ ligne.valeur }}</td>
          <td><button @click="retablir(ligne)">Rétablir</button></td>
        </tr>
        <tr v-if="listanyAnnulation.length === 0">
          <td colspan="6">Aucune annulation.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
```

---

## 4. Commandes utiles

```bash
npm run dev
```

Aucune installation supplémentaire nécessaire (la table `parametre` est créée automatiquement au démarrage via le `SCHEMA`).

---

## 5. Vérification finale

- [ ] La page « Liste des réouvertures » s'ouvre sans erreur.
- [ ] Le bloc « Plafond de réouverture » affiche : Somme Super Cost, Plafond max, Disponible.
- [ ] Saisir un plafond (ex : 30) + « Enregistrer » → Plafond max = Somme Super Cost × 30 %.
- [ ] Une réouverture qui dépasse le plafond est automatiquement limitée au disponible.
- [ ] Ajouter un Super Cost augmente le Plafond max et le Disponible.
- [ ] « Annuler le dernier coût » → la dernière réouverture passe dans « Liste des annulations », le Disponible remonte.
- [ ] « Rétablir » → la réouverture revient dans la liste à son lot d'origine, valeurs recalculées.
</content>
</invoke>
