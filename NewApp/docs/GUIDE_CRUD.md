# Guide CRUD — catalogue des fonctions prêtes à l'emploi

> But : quand on te dit **« modifie juste X »** (le statut d'un ticket, le lieu
> d'un équipement, renomme un fabricant…), il existe **déjà une fonction**. Tu
> l'appelles, c'est tout. Pas de payload à deviner.
>
> Tout est dans `src/crud/` et importable depuis `@/crud`.

## Comment importer

```ts
// Par domaine (recommandé, lisible) :
import { Tickets, Parc, References, Utilisateurs } from '@/crud'

// Générique (n'importe quel endpoint GLPI) :
import { listerActifs, parId, creer, modifierUnChamp, purger } from '@/crud'
```

---

## 1. TICKETS — `Tickets.*`

| Fonction | Effet |
|---|---|
| `listerTickets()` | Tous les tickets. |
| `ticketParId(id)` | Un ticket complet (catégorie, lieu, équipe). |
| `creerTicket(donnees)` | Ticket complet (acteurs + éléments + durée). |
| `creerTicketSimple(titre, statutId?)` | Ticket minimal (juste un titre). |
| `changerStatut(id, statutId, note?)` | **Change que le statut** (1=Nouveau, 2=En cours, 5=Résolu, 6=Clos). |
| `changerPriorite(id, 1..6)` | Change que la priorité. |
| `changerUrgence(id, 1..5)` | Change que l'urgence. |
| `changerImpact(id, 1..5)` | Change que l'impact. |
| `changerTitre(id, titre)` | Renomme. |
| `changerDescription(id, texte)` | Change la description. |
| `changerType(id, 1\|2)` | Incident / Demande. |
| `changerCategorie(id, categorieId)` | Change la catégorie. |
| `changerLieu(id, lieuId)` | Change le lieu. |
| `modifierTicket(id, {champs})` | Modifie plusieurs champs d'un coup. |
| `supprimerTicket(id)` | Met en corbeille. |
| `purgerTicket(id)` | Supprime définitivement. |
| `listerElementsLies(id)` | Éléments associés au ticket. |
| `associerElement(id, itemtype, itemId)` | Associe 1 élément (ex `'Computer', 12`). |
| `associerElements(id, [{id,itemtype}])` | Associe plusieurs éléments. |
| `ajouterSuivi(id, texte)` | Note de suivi (followup). |
| `ajouterTache(id, texte, minutes?)` | Tâche timeline. |
| `listerCouts(id)` / `ajouterCout(id, temps, fixe, sec?)` | Coûts du ticket. |

**Exemples :**
```ts
await Tickets.changerStatut(12, 6)              // clore le ticket 12
await Tickets.changerPriorite(12, 6)            // priorité Majeure
await Tickets.associerElement(12, 'Phone', 7)   // lier le téléphone 7
const t = await Tickets.ticketParId(12)         // lire un ticket
```

---

## 2. PARC / ÉQUIPEMENTS — `Parc.*`

Le 1er argument est le **type** : `'computer'`, `'monitor'`, `'printer'`,
`'peripheral'`, `'phone'`, `'networkequipment'` (voir `config/parc.ts`).

| Fonction | Effet |
|---|---|
| `listerAssets(type)` | Équipements actifs d'un type. |
| `listerToutLeParc()` | Tous les équipements, tous types, à plat. |
| `assetParId(type, id)` | Un équipement. |
| `creerAsset(type, {champs})` | Crée (name, otherserial, statusId, locationId, userId, manufacturerId, modelId). |
| `modifierAsset(type, id, {champs})` | Modifie plusieurs champs. |
| `changerNom(type, id, nom)` | Renomme. |
| `changerStatut(type, id, statutId)` | Change le statut. |
| `changerLieu(type, id, lieuId)` | Change le lieu. |
| `changerUtilisateur(type, id, userId)` | Change l'utilisateur affecté. |
| `changerFabricant(type, id, fabId)` | Change le fabricant. |
| `changerModele(type, id, modeleId)` | Change le modèle. |
| `changerNumeroInventaire(type, id, num)` | Change le n° d'inventaire. |
| `supprimerAsset(type, id)` | Met en corbeille. |
| `purgerAsset(type, id)` | Supprime définitivement. |

**Exemples :**
```ts
const ordis = await Parc.listerAssets('computer')
await Parc.changerLieu('computer', 5, 3)        // ordi 5 → lieu 3
await Parc.changerStatut('phone', 7, 2)         // téléphone 7 → statut 2
await Parc.creerAsset('monitor', { name: 'ECRAN-99', statusId: 1 })
```

---

## 3. RÉFÉRENCES (dropdowns) — `References.*`

Clés : `statut`, `lieu`, `fabricant`, `categorie`, `source`,
`modeleOrdinateur`, `modeleMoniteur`, `modeleImprimante`, `modelePeripherique`,
`modeleTelephone` (voir `REFERENCES` dans `crudReferences.ts`).

| Fonction | Effet |
|---|---|
| `listerReferences(cle)` | Liste les valeurs (ex tous les lieux). |
| `referenceParId(cle, id)` | Une valeur. |
| `trouverOuCreer(cle, nom)` | **Trouve OU crée** (évite le 500 « doit être unique »). Renvoie l'id. |
| `creerReference(cle, nom)` | Crée sans vérifier (échoue si doublon). |
| `renommerReference(cle, id, nom)` | Renomme. |
| `supprimerReference(cle, id)` / `purgerReference(cle, id)` | Corbeille / purge. |

**Exemples :**
```ts
const lieuId = await References.trouverOuCreer('lieu', 'Salle 301')
const fabricants = await References.listerReferences('fabricant')
```

---

## 4. UTILISATEURS — `Utilisateurs.*`

> Les comptes système (id ≤ 6) sont protégés : suppression refusée.

| Fonction | Effet |
|---|---|
| `listerUtilisateurs()` | Comptes actifs. |
| `utilisateurParId(id)` | Un compte. |
| `creerUtilisateur({username, firstname, realname, password, is_active})` | Crée. |
| `modifierUtilisateur(id, {champs})` | Modifie. |
| `changerActivation(id, actif)` | Active / désactive. |
| `supprimerUtilisateur(id)` / `purgerUtilisateur(id)` | Corbeille / purge (refuse id ≤ 6). |

---

## 5. GÉNÉRIQUE — pour TOUT autre endpoint GLPI

Si aucun CRUD dédié n'existe (problèmes, changements, contrats…), utilise les
fonctions génériques avec l'endpoint v2 directement :

| Fonction | Effet |
|---|---|
| `lister(endpoint)` | Liste tout (corbeille incluse). |
| `listerActifs(endpoint)` | Liste actifs seulement. |
| `parId(endpoint, id)` | Un élément. |
| `creer(endpoint, {donnees})` | Crée. |
| `modifier(endpoint, id, {donnees})` | Modifie plusieurs champs. |
| `modifierUnChamp(endpoint, id, champ, valeur)` | **Modifie un seul champ.** |
| `mettreEnCorbeille(endpoint, id)` | Suppression réversible (v2). |
| `purger(endpoint, id)` / `purgerPlusieurs(endpoint, ids)` | Suppression définitive (v1). |
| `relation(id)` | `{ id }` pour un champ relation (ou `undefined` si 0). |

**Exemples :**
```ts
import { listerActifs, modifierUnChamp, purger, relation } from '@/crud'

const problemes = await listerActifs('/Assistance/Problem')
await modifierUnChamp('/Assistance/Problem', 4, 'priority', 5)
await modifierUnChamp('/Assistance/Problem', 4, 'status', relation(6))
await purger('/Assistance/Problem', 4)
```

---

## 6. Rappels (pièges GLPI déjà gérés par ces fonctions)

- **Statut / relations** : toujours `{ id: N }` — les fonctions le font pour toi.
- **Suppression** : la corbeille (v2) ≠ la purge (v1 `force_purge`). `purger*`
  supprime vraiment ; `supprimer*` met en corbeille.
- **Doublon de référence** : utilise `References.trouverOuCreer` (sinon 500).
- **Listes > 100** : pour les tickets, `Tickets.listerTickets()` pagine déjà
  correctement (API v1). Pour les autres, `listerActifs` gère la pagination.
