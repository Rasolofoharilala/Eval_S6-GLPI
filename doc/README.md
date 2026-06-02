# Initialisation d’un projet Vue 3 + TypeScript

## 1. Prérequis

Vérifier que Node.js et npm sont installés :

```bash
node -v
npm -v
```

Version recommandée :

```txt
Node.js >= 20
npm >= 10
```

---

## 2. Créer le projet VueTS

```bash
npm create vue@latest
```

Répondre aux questions comme ceci :

```txt
Project name: mon-projet-vue
Add TypeScript? Yes
Add JSX Support? No
Add Vue Router? Yes
Add Pinia? Yes
Add Vitest? No
Add an End-to-End Testing Solution? No
Add ESLint? Yes
Add Prettier? Yes
```

Puis entrer dans le projet :

```bash
cd mon-projet-vue
```

Installer les dépendances :

```bash
npm install
```

Lancer le projet :

```bash
npm run dev
```

---

## 3. Ouvrir dans VS Code

```bash
code .
```

Extensions recommandées :

```txt
Vue - Official
ESLint
Prettier - Code formatter
Tailwind CSS IntelliSense
Auto Rename Tag
Path Intellisense
```

---

## 4. Structure professionnelle recommandée

```txt
src/
├── assets/
├── components/
│   └── common/
├── composables/
├── layouts/
├── pages/
├── router/
├── services/
├── stores/
├── types/
├── utils/
├── App.vue
└── main.ts
```

---

## 5. Installer Tailwind CSS

```bash
npm install tailwindcss @tailwindcss/vite
```

Modifier `vite.config.ts` :

```ts
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
```

Dans `src/assets/main.css` :

```css
@import "tailwindcss";
```

---

## 6. Configurer Vue Router

Fichier :

```txt
src/router/index.ts
```

Exemple :

```ts
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
  ],
})

export default router
```

Dans `main.ts` :

```ts
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
```

---

## 7. Configurer Pinia

Créer un store :

```txt
src/stores/userStore.ts
```

```ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const username = ref<string>('Manoa')

  function setUsername(value: string) {
    username.value = value
  }

  return {
    username,
    setUsername,
  }
})
```

Utilisation dans un composant :

```vue
<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
</script>

<template>
  <h1>{{ userStore.username }}</h1>
</template>
```

---

## 8. Exemple de page VueTS propre

Créer :

```txt
src/pages/HomePage.vue
```

```vue
<script setup lang="ts">
const title: string = 'Bienvenue sur Vue 3 + TypeScript'
</script>

<template>
  <main class="min-h-screen flex items-center justify-center bg-gray-100">
    <h1 class="text-3xl font-bold text-gray-900">
      {{ title }}
    </h1>
  </main>
</template>
```

---

## 9. Exemple de service API

Créer :

```txt
src/services/productService.ts
```

```ts
export type Product = {
  id: number
  name: string
  price: number
}

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch('https://api.example.com/products')

  if (!response.ok) {
    throw new Error('Erreur lors du chargement des produits')
  }

  return await response.json()
}
```

---

## 10. Exemple de composable

Créer :

```txt
src/composables/useProducts.ts
```

```ts
import { ref, onMounted } from 'vue'
import { fetchProducts, type Product } from '@/services/productService'

export function useProducts() {
  const products = ref<Product[]>([])
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  async function loadProducts() {
    try {
      loading.value = true
      error.value = null
      products.value = await fetchProducts()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    loadProducts()
  })

  return {
    products,
    loading,
    error,
    loadProducts,
  }
}
```

---

## 11. Utilisation du composable dans une page

```vue
<script setup lang="ts">
import { useProducts } from '@/composables/useProducts'

const { products, loading, error } = useProducts()
</script>

<template>
  <main class="p-6">
    <h1 class="text-2xl font-bold mb-4">Produits</h1>

    <p v-if="loading">Chargement...</p>
    <p v-else-if="error" class="text-red-500">{{ error }}</p>

    <ul v-else class="space-y-2">
      <li
        v-for="product in products"
        :key="product.id"
        class="p-4 border rounded"
      >
        {{ product.name }} - {{ product.price }} €
      </li>
    </ul>
  </main>
</template>
```

---

## 12. Commandes utiles

Lancer le serveur :

```bash
npm run dev
```

Compiler le projet :

```bash
npm run build
```

Prévisualiser le build :

```bash
npm run preview
```

Corriger avec ESLint :

```bash
npm run lint
```

Formater le code :

```bash
npm run format
```

---

## 13. Règles professionnelles

```txt
1. Ne pas mettre la logique métier directement dans les fichiers .vue
2. Utiliser les composables pour la logique de page
3. Utiliser les services pour les appels API
4. Utiliser les stores Pinia pour l’état global
5. Utiliser les types TypeScript dans src/types
6. Garder les composants petits et réutilisables
7. Utiliser les alias @ pour éviter les chemins trop longs
```

---

## 14. Exemple d’architecture finale

```txt
src/
├── api/
│   └── httpClient.ts
├── assets/
│   └── main.css
├── components/
│   ├── common/
│   └── products/
├── composables/
│   └── useProducts.ts
├── layouts/
│   └── DefaultLayout.vue
├── pages/
│   ├── HomePage.vue
│   └── ProductListPage.vue
├── router/
│   └── index.ts
├── services/
│   └── productService.ts
├── stores/
│   └── productStore.ts
├── types/
│   └── product.ts
├── utils/
│   └── formatPrice.ts
├── App.vue
└── main.ts
```

---

## 15. Initialisation Git

```bash
git init
git add .
git commit -m "Initialisation projet Vue 3 TypeScript"
```

---

## 16. Résumé

Ce projet utilise :

```txt
Vue 3
TypeScript
Vite
Vue Router
Pinia
Tailwind CSS
ESLint
Prettier
```

Architecture recommandée :

```txt
.vue = affichage
composables = logique de page
services = appels API
stores = état global
types = typage TypeScript
utils = fonctions réutilisables
```