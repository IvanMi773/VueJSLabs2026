import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'

import App from './App.vue'
import { i18n } from './i18n'
import { router } from './router'
import { useSettingsStore } from './stores/settings'
import './assets/main.css'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)
app.use(pinia)

const settings = useSettingsStore()
i18n.global.locale.value = settings.locale

app.use(i18n)
app.use(router)
app.mount('#app')
