# Cheat Sheet SQLite — Ubuntu / VS Code

## 1. Installation SQLite sur Ubuntu

```bash
sudo apt update
sudo apt install sqlite3
```

Vérifier l'installation :

```bash
sqlite3 --version
```

Installer une interface graphique :

```bash
sudo apt install sqlitebrowser
```

Lancer DB Browser :

```bash
sqlitebrowser
```

---

## 2. Créer ou ouvrir une base SQLite

SQLite stocke les données dans un fichier `.db`.

```bash
sqlite3 database.db
```

Créer dans un dossier spécifique :

```bash
mkdir database
sqlite3 database/database.db
```

Exemple de structure propre :

```txt
mon-projet/
├── database/
│   └── database.db
├── src/
└── README.md
```

---

## 3. Quitter SQLite

```sql
.quit
```

ou :

```sql
.exit
```

---

## 4. Commandes internes SQLite

Afficher les tables :

```sql
.tables
```

Afficher la structure d'une table :

```sql
.schema nom_table
```

Afficher toute la structure de la base :

```sql
.schema
```

Activer les en-têtes :

```sql
.headers on
```

Afficher en mode colonne :

```sql
.mode column
```

Afficher en mode tableau :

```sql
.mode table
```

Afficher en mode liste :

```sql
.mode list
```

Effacer l'écran :

```sql
.shell clear
```

Voir les bases ouvertes :

```sql
.databases
```

---

## 5. Créer une table

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT UNIQUE,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
```

Types principaux SQLite :

```txt
INTEGER  → nombre entier
REAL     → nombre décimal
TEXT     → texte
BLOB     → fichier binaire
NULL     → valeur vide
```

Important : SQLite n'a pas de vrai type `BOOLEAN`.

On utilise souvent :

```sql
is_active INTEGER DEFAULT 1
```

Avec :

```txt
1 = true
0 = false
```

---

## 6. Insérer des données

```sql
INSERT INTO users (username, email, password)
VALUES ('admin', 'admin@example.com', '1234');
```

Insérer plusieurs lignes :

```sql
INSERT INTO users (username, email, password)
VALUES 
('manoa', 'manoa@example.com', 'pass123'),
('test', 'test@example.com', 'pass456');
```

---

## 7. Lire les données

Lire toute la table :

```sql
SELECT * FROM users;
```

Lire certaines colonnes :

```sql
SELECT id, username, email FROM users;
```

Filtrer avec `WHERE` :

```sql
SELECT * FROM users
WHERE id = 1;
```

```sql
SELECT * FROM users
WHERE username = 'admin';
```

---

## 8. Trier les résultats

Ordre croissant :

```sql
SELECT * FROM users
ORDER BY username ASC;
```

Ordre décroissant :

```sql
SELECT * FROM users
ORDER BY id DESC;
```

---

## 9. Limiter les résultats

```sql
SELECT * FROM users
LIMIT 5;
```

Avec décalage :

```sql
SELECT * FROM users
LIMIT 5 OFFSET 10;
```

---

## 10. Rechercher avec LIKE

```sql
SELECT * FROM users
WHERE username LIKE '%man%';
```

Explication :

```txt
'man%'  → commence par man
'%man'  → finit par man
'%man%' → contient man
```

---

## 11. Modifier une donnée

```sql
UPDATE users
SET username = 'nouveau_nom'
WHERE id = 1;
```

Modifier plusieurs colonnes :

```sql
UPDATE users
SET 
    username = 'admin2',
    email = 'admin2@example.com'
WHERE id = 1;
```

Attention : sans `WHERE`, toute la table est modifiée.

```sql
UPDATE users
SET username = 'test';
```

Danger : cette requête modifie tous les utilisateurs.

---

## 12. Supprimer une donnée

```sql
DELETE FROM users
WHERE id = 1;
```

Attention : sans `WHERE`, toute la table est supprimée.

```sql
DELETE FROM users;
```

---

## 13. Supprimer une table

```sql
DROP TABLE users;
```

---

## 14. Vider une table

```sql
DELETE FROM users;
```

Réinitialiser aussi l'auto-incrément :

```sql
DELETE FROM sqlite_sequence
WHERE name = 'users';
```

---

## 15. Ajouter une colonne

```sql
ALTER TABLE users
ADD COLUMN role TEXT DEFAULT 'user';
```

SQLite permet facilement d'ajouter une colonne, mais modifier ou supprimer une colonne est plus limité selon la version.

---

## 16. Contraintes utiles

### PRIMARY KEY

```sql
id INTEGER PRIMARY KEY AUTOINCREMENT
```

### NOT NULL

```sql
username TEXT NOT NULL
```

### UNIQUE

```sql
email TEXT UNIQUE
```

### DEFAULT

```sql
role TEXT DEFAULT 'user'
```

### CHECK

```sql
age INTEGER CHECK(age >= 18)
```

---

## 17. Clé étrangère

Exemple avec deux tables :

```sql
CREATE TABLE roles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);
```

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    role_id INTEGER,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);
```

Activer les clés étrangères :

```sql
PRAGMA foreign_keys = ON;
```

Vérifier si elles sont activées :

```sql
PRAGMA foreign_keys;
```

Important : dans SQLite, les clés étrangères doivent être activées explicitement dans beaucoup de cas.

---

## 18. Jointures

### INNER JOIN

```sql
SELECT users.username, roles.name
FROM users
INNER JOIN roles ON users.role_id = roles.id;
```

### LEFT JOIN

```sql
SELECT users.username, roles.name
FROM users
LEFT JOIN roles ON users.role_id = roles.id;
```

---

## 19. Fonctions d'agrégation

Compter :

```sql
SELECT COUNT(*) FROM users;
```

Somme :

```sql
SELECT SUM(amount) FROM payments;
```

Moyenne :

```sql
SELECT AVG(amount) FROM payments;
```

Minimum :

```sql
SELECT MIN(amount) FROM payments;
```

Maximum :

```sql
SELECT MAX(amount) FROM payments;
```

---

## 20. GROUP BY

```sql
SELECT role_id, COUNT(*) AS total
FROM users
GROUP BY role_id;
```

Avec condition après regroupement :

```sql
SELECT role_id, COUNT(*) AS total
FROM users
GROUP BY role_id
HAVING total > 1;
```

---

## 21. Dates dans SQLite

SQLite stocke souvent les dates en `TEXT`.

Format conseillé :

```txt
YYYY-MM-DD
```

Exemple :

```sql
CREATE TABLE payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    amount REAL NOT NULL,
    payment_date TEXT NOT NULL
);
```

Insérer une date :

```sql
INSERT INTO payments (amount, payment_date)
VALUES (50000, '2026-06-03');
```

Date actuelle :

```sql
SELECT date('now');
```

Date et heure actuelles :

```sql
SELECT datetime('now');
```

---

## 22. Sauvegarder une base SQLite

Faire une copie simple :

```bash
cp database.db backup.db
```

Exporter en SQL :

```bash
sqlite3 database.db .dump > backup.sql
```

Restaurer depuis un fichier SQL :

```bash
sqlite3 new_database.db < backup.sql
```

---

## 23. Importer un fichier SQL

```bash
sqlite3 database.db < schema.sql
```

Exemple `schema.sql` :

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT UNIQUE
);

INSERT INTO users (username, email)
VALUES ('admin', 'admin@example.com');
```

---

## 24. Exporter en CSV

Dans SQLite :

```sql
.headers on
.mode csv
.output users.csv
SELECT * FROM users;
.output stdout
```

Ou directement depuis le terminal :

```bash
sqlite3 -header -csv database.db "SELECT * FROM users;" > users.csv
```

---

## 25. Importer un CSV

Créer la table avant :

```sql
CREATE TABLE users (
    id INTEGER,
    username TEXT,
    email TEXT
);
```

Importer :

```sql
.mode csv
.import users.csv users
```

---

## 26. Utiliser SQLite avec Vue.ts sans backend

Dans une application Vue web sans backend, mettre la base dans :

```txt
public/database/database.db
```

Structure :

```txt
mon-projet/
├── public/
│   └── database/
│       └── database.db
├── src/
│   ├── App.vue
│   └── main.ts
└── package.json
```

La base sera accessible avec :

```txt
/database/database.db
```

Installation de `sql.js` :

```bash
npm install sql.js
npm install -D @types/sql.js
```

Exemple de lecture :

```ts
import initSqlJs from "sql.js"

export async function loadDatabase() {
  const SQL = await initSqlJs({
    locateFile: file => `https://sql.js.org/dist/${file}`
  })

  const response = await fetch("/database/database.db")
  const buffer = await response.arrayBuffer()

  const db = new SQL.Database(new Uint8Array(buffer))

  const result = db.exec("SELECT * FROM users")

  return result
}
```

Transformer le résultat en tableau d'objets :

```ts
export function formatSqlResult(result: any[]) {
  if (result.length === 0) {
    return []
  }

  const columns = result[0].columns
  const values = result[0].values

  return values.map((row: any[]) => {
    return Object.fromEntries(
      columns.map((column: string, index: number) => [
        column,
        row[index]
      ])
    )
  })
}
```

Exemple dans Vue :

```vue
<script setup lang="ts">
import { onMounted, ref } from "vue"
import { loadDatabase, formatSqlResult } from "./services/sqliteService"

const users = ref<any[]>([])

onMounted(async () => {
  const result = await loadDatabase()
  users.value = formatSqlResult(result)
})
</script>

<template>
  <main>
    <h1>Utilisateurs</h1>

    <div v-for="user in users" :key="user.id">
      {{ user.username }} - {{ user.email }}
    </div>
  </main>
</template>
```

Important :

```txt
Vue sans backend + SQLite = lecture possible avec sql.js
Vue sans backend + SQLite = écriture persistante compliquée
```

Le navigateur télécharge une copie de la base en mémoire.  
Il ne modifie pas directement le fichier `.db`.

---

## 27. Utiliser SQLite avec Node.js

Installation :

```bash
npm install better-sqlite3
```

Exemple :

```js
const Database = require("better-sqlite3")

const db = new Database("database/database.db")

const users = db.prepare("SELECT * FROM users").all()

console.log(users)
```

Insertion :

```js
const insertUser = db.prepare(`
  INSERT INTO users (username, email, password)
  VALUES (?, ?, ?)
`)

insertUser.run("admin", "admin@example.com", "1234")
```

---

## 28. Bonnes pratiques

Ne pas mettre la base SQLite dans `/src` pour Vue.

Préférer :

```txt
public/database/database.db
```

Pour une vraie application avec données modifiables :

```txt
Vue.ts
↓
Backend API
↓
SQLite
```

Pour une application locale desktop :

```txt
Vue.ts + Electron/Tauri
↓
SQLite local
```

Ne jamais stocker des mots de passe en clair :

```txt
Mauvais : password = "1234"
Bon : password_hash = hash sécurisé
```

Ne jamais construire des requêtes avec concaténation directe :

```sql
-- Mauvais
SELECT * FROM users WHERE username = '${username}';
```

Utiliser des paramètres préparés avec un backend :

```js
db.prepare("SELECT * FROM users WHERE username = ?").get(username)
```

---

## 29. Commandes rapides

Créer une base :

```bash
sqlite3 database.db
```

Créer une table :

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL
);
```

Insérer :

```sql
INSERT INTO users (username)
VALUES ('admin');
```

Lire :

```sql
SELECT * FROM users;
```

Modifier :

```sql
UPDATE users
SET username = 'root'
WHERE id = 1;
```

Supprimer :

```sql
DELETE FROM users
WHERE id = 1;
```

Voir les tables :

```sql
.tables
```

Voir la structure :

```sql
.schema users
```

Quitter :

```sql
.quit
```

---

## 30. Résumé mental

SQLite = fichier `.db`.

Pas besoin de serveur.

Chemin relatif :

```bash
sqlite3 database.db
```

Dépend du dossier actuel.

Chemin absolu :

```bash
sqlite3 /home/user/projet/database/database.db
```

Ne dépend pas du dossier actuel.

Dans Vue web sans backend :

```txt
public/database/database.db
```

Lecture avec :

```txt
sql.js
```

Pour une vraie persistance :

```txt
backend obligatoire ou application desktop
```