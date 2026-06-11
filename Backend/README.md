# Backend Spring Boot — Réglages Kanban (SQLite)

Backend REST (JSON) qui stocke dans **SQLite** les réglages du tableau Kanban du FrontOffice :

- les **3 couleurs de fond** des colonnes,
- la **version malgache** du nom de chaque statut (ex : *vaovao*, *efa manao*, *vita*).

## Prérequis

- Java 17
- Maven 3.9+

## Lancer

```bash
cd Backend
mvn spring-boot:run
```

Le serveur écoute sur **http://localhost:8080**.
La base SQLite est créée automatiquement dans `Backend/data/newapp.db`
et les 3 colonnes par défaut sont insérées au premier démarrage.

## API

| Méthode | URL | Description |
|---|---|---|
| GET | `/api/kanban/settings` | Les 3 colonnes (couleur, label FR, label MG) |
| PUT | `/api/kanban/settings` | Met à jour une ou plusieurs colonnes |
| POST | `/api/kanban/settings/reset` | Restaure les valeurs par défaut |

### Exemple GET

```json
[
  { "id": 1, "statusKey": "nouveau",     "position": 1, "labelFr": "Nouveau",     "labelMg": "Vaovao",    "color": "#dbeafe" },
  { "id": 2, "statusKey": "in_progress", "position": 2, "labelFr": "In progress", "labelMg": "Efa manao", "color": "#ffedd5" },
  { "id": 3, "statusKey": "termine",     "position": 3, "labelFr": "Terminé",     "labelMg": "Vita",      "color": "#dcfce7" }
]
```

### Exemple PUT

```bash
curl -X PUT http://localhost:8080/api/kanban/settings \
  -H "Content-Type: application/json" \
  -d '[{"statusKey":"nouveau","color":"#ffcc00","labelMg":"Vaovao be"}]'
```

Les champs absents ou vides ne sont pas modifiés. La couleur doit être au format `#RRGGBB`.

## Inspecter la base SQLite

```bash
sqlite3 Backend/data/newapp.db "SELECT * FROM kanban_settings;"
```

## CORS

Les origines `http://localhost:5173` et `http://127.0.0.1:5173` (Vite) sont autorisées.
