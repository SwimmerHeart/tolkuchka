// https://nuxt.com/docs/api/configuration/nuxt-config
import { categories, products } from './shared/mocks/products';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  watchers: {
    chokidar: {
      usePolling: true,
      interval: 1000,
    },
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@pinia/nuxt',
    '@sidebase/nuxt-auth',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
  ],
  site: {
    url: 'https://tolkuchka.ru',
  },
  sitemap: {
    urls: [
      ...categories.map((c) => ({
        loc: `/categories/${c.slug}`,
        changefreq: 'daily' as const,
        priority: 0.8 as const,
      })),
      ...products.map((p) => ({
        loc: `/products/${p.slug}`,
        changefreq: 'hourly' as const,
        priority: 0.7 as const,
      })),
    ],
  },
  auth: {
    isEnabled: true,
    baseURL: '/api/auth',
    provider: { type: 'authjs', trustHost: true },
  },
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
  routeRules: {
    // страницы каталога пересобираются не чаще раза в час
    '/products/**': { isr: 3600 },
    '/categories/**': { isr: 3600 },
  },
});
