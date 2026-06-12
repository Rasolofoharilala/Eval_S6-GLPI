import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// CSS global minimaliste (layout barre latérale + contenu, tableaux, boutons).
import './assets/backoffice.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
