// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura'

export default defineNuxtConfig({
  modules: [
    '@primevue/nuxt-module',
    '@pinia/nuxt',
    '@nuxt/image',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@vueuse/nuxt',
  ],
  ssr: true,
  devtools: { enabled: true },
  app: {
    baseURL: '/',
    head: {
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes',
        },
        {
          name: 'description',
          content: 'Интернет магазин велосипедов Bike-Shop',
        },
      ],
      title: 'Bike-Shop',
      htmlAttrs: {
        lang: 'ru',
      },
    },
  },
  css: ['normalize.css', '@/assets/css/main.scss'],
  routeRules: {
    '/': {
      redirect: '/catalog?page=1',
    },
  },
  compatibilityDate: '2025-01-23',
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use "~/assets/css/_variables.scss" as *;
          @use "~/assets/css/_mixins.scss" as *;
          `,
        },
      },
    },
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  fonts: {
    provider: 'google',
    families: [
      {
        name: 'Montserrat',
        weights: [400, 500, 600, 700, 800],
        styles: ['normal'],
        subsets: ['cyrillic', 'latin'],
        display: 'swap',
      },
    ],
  },
  primevue: {
    options: {
      theme: {
        preset: Aura,
      },
    },
    autoImport: false,
    components: {
      include: [
        'ProgressSpinner',
        'Select',
        'InputNumber',
        'FloatLabel',
        'Drawer',
        'Dialog',
        'InputText',
        'Toast',
        'Message',
        'Password',
        'Carousel',
        'InputMask',
      ],
    },
  },
})
