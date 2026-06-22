# Documentation technique — Page « Liste des réouvertures »

- **URL** : `http://localhost:5173/listeReouverture`
- **Route** : `src/router/index.ts` → `path: '/listeReouverture'`, `name: 'listeReouverture'`
- **Composant** : [src/pages/FrontOffice/ListeReouverture.vue](src/pages/FrontOffice/ListeReouverture.vue)
- **Service** : [src/services/nouveauCoutService.ts](src/services/nouveauCoutService.ts)
- **Persistance** : SQLite local (`sql.js` + IndexedDB) via [src/services/sqlite/localDb.ts](src/services/sqlite/localDb.ts), table `nouveau_cout`. Pas de backend Spring Boot.

---

## 1. Rôle de la page

La page affiche et permet de modifier deux jeux de données issus de la table locale `nouveau_cout`, regroupés par **lot** :

1. **Ouvertures (Supercost)** — le coût de base de clôture d'un ticket (`type = 'supercost'`).
2. **Réouvertures** — la majoration appliquée quand un ticket passe de *Terminé → En cours* (`type = 'reouverture'`).

Elle sert de tableau de contrôle : on y édite les pourcentages, le mode de calcul de la base et les valeurs supercost, et on vérifie le **total général des réouvertures** par rapport à la cible attendue (785,5).

---

## 2. Modèle de données

Une seule table `nouveau_cout`, une ligne **par item** d'un lot. Les colonnes clés :

| Colonne | Sens |
|---|---|
| `ticket_id` | id GLPI réel du ticket |
| `lot` | numéro de lot (clôture / réouverture successives) |
| `type` | `'supercost'` ou `'reouverture'` |
| `cout` | coût **par item** |
| `pourcentage`, `mode` | conservés pour pouvoir recalculer une réouverture |
| `annule` | `1` = lot annulé (exclu des supercosts actifs) |

Les types exposés au composant (regroupés par lot, `valeur = SUM(cout)`) :

```ts
type Supercost   = { ticketId: number; lot: number; valeur: number }
type Reouverture = { ticketId: number; lot: number; pourcentage: number; mode: number; valeur: number }
```

---

## 3. Cycle de vie du composant

```
onMounted → alaoListany()
              ├─ getReouvertures()  → listany           (réouvertures par lot)
              ├─ getSupercosts()    → listanyOuverture   (supercosts actifs par lot)
              └─ getRefsTickets()   → refParId           (inverse : id GLPI → Ref logique)
```

Après **chaque** modification/suppression, `alaoListany()` est rappelé : la vue est toujours rechargée depuis la base (pas de mise à jour optimiste).

### Affichage de la référence ticket
La table `ref_ticket` mappe `Ref_Ticket` logique (1, 2, 3…) → id GLPI auto-incrémenté.
`getRefsTickets()` renvoie `ref → id` ; le composant **inverse** ce mapping dans `refParId`, puis
`refTicket(ticketId)` affiche la référence logique, avec repli sur l'id GLPI brut si la référence est inconnue.

---

## 4. Calcul du coût de réouverture

### Base selon le mode
La base est dérivée des **lots supercost** du ticket (`baseSelonMode` côté composant, miroir de `coutSelonMode` côté DB) :

| Mode | Label | Base |
|---|---|---|
| 1 | Dernier | dernier lot supercost |
| 2 | Premier | premier lot supercost |
| 3 | Moyenne | moyenne des lots |
| 4 | Total | somme des lots |

> ⚠️ Subtilité : côté **composant**, `baseSelonMode` travaille en **total ticket** (`SUM(cout)` par lot, recalculé en direct depuis `listanyOuverture`). Côté **DB**, `coutSelonMode` travaille **par item** (`SUM(cout)/COUNT(*)`). La colonne « Supercost (base) » affichée et la valeur réellement persistée peuvent donc différer d'un facteur = nombre d'items du lot. La colonne « Coût réouverture » affichée est, elle, recalculée en direct par le composant.

### Formule
```
coutReouverture = arrondi( baseSelonMode(ticketId, mode) × (pourcentage / 100) )
```
- Composant : arrondi à 2 décimales (`Math.round(x*100)/100`), affichage live.
- DB (`updateReouverture` / `recalculerReouvertures`) : `arrondi4(base_par_item × %)`, valeur persistée.

### Total
`totalReouverture` (computed) = somme des `coutReouverture` de toutes les lignes affichées → comparé à la cible **785,5**.

---

## 5. Opérations

### Ouverture (Supercost)
| Action | Service | Effet DB |
|---|---|---|
| Modifier | `modifierSupercost(ticketId, lot, valeur)` | répartit `valeur` sur les items du lot (`valeur / COUNT(items)`), **puis recalcule les réouvertures** du ticket |
| Supprimer | `supprimerSupercost(ticketId, lot)` | `DELETE` du lot supercost, **puis recalcule les réouvertures** |

> La base change → `recalculerReouvertures(db, ticketId)` réaligne toutes les réouvertures du ticket. Sans ça, `/coutsParc` sommerait une nouvelle base avec une réouverture figée → totaux faux.

### Réouverture
| Action | Service | Effet DB |
|---|---|---|
| Modifier | `modifierReouverture(ticketId, lot, pourcentage, mode)` | recalcule `cout = base(mode) × %` et met à jour `pourcentage` + `mode` du lot |
| Supprimer | `supprimerReouverture(ticketId, lot)` | `DELETE` de toutes les lignes du lot réouverture |

---

## 6. Chaîne d'appels

```
ListeReouverture.vue
   └─ nouveauCoutService.ts   (couche service, ré-export des types)
        └─ localDb.ts          (sql.js : SQL, regroupement par lot, recalculs, persist IndexedDB)

ListeReouverture.vue
   └─ localDb.getRefsTickets() (mapping ref ↔ id GLPI, table ref_ticket)
```

---

## 7. Points d'attention / pièges

- **Pas de garde de chargement** : les tables s'affichent vides (« Aucune… ») tant que `alaoListany()` n'a pas résolu ; aucun spinner.
- **Édition non transactionnelle UI** : `v-model` modifie l'objet de la liste *avant* le clic « Modifier ». Si l'utilisateur change une valeur sans valider, l'affichage diverge de la base jusqu'au prochain `alaoListany()`.
- **Incohérence base total vs base par item** (cf. §4) : à connaître si on compare la colonne affichée à la valeur stockée.
- **`refTicket` est purement cosmétique** : les `:key` et tous les appels service utilisent toujours `ticketId` (id GLPI) — le renommage n'affecte que l'affichage.
- **Recalcul en cascade** : toute opération supercost relance le recalcul des réouvertures du même ticket ; une opération réouverture, non.
