// import Theme from './styles/theme'
import Theme from './styles/theme'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules:['@primevue/nuxt-module'],
  primevue: {
    options: {
      theme: {
        preset: Theme,
        options: {
          darkModeSelector: '[data-theme="dark"]',
        }
      }
    }
  }
})
