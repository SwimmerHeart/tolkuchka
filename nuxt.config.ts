// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  watchers: {
    chokidar: {
      usePolling: true,
      interval: 1000,
    },
  },
  modules: ['@nuxt/eslint', '@nuxt/ui', '@pinia/nuxt'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    authSecret: '',
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  fonts: {
    providers: {
      fontshare: false,
    },
  },
  icon: {
    provider: 'server',
    serverBundle: {
      collections: ['heroicons'],
    },
  },
});
