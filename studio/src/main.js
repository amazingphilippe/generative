import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

export function createStudioApp() {
  const app = createApp(App)
  app.use(createPinia())
  return app
}
