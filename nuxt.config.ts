// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';
import { definePreset } from '@primevue/themes';
const MyPreset = definePreset(Aura, {});
export default defineNuxtConfig({
  compatibilityDate: '2025-01-14',
  devtools: { enabled: true },
  ssr: true,
  app: {
    baseURL: '/',
    head: {
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
        },
        {
          name: 'description',
          content: 'Интернет магазин велосипедов Bike-Shop',
        }
      ],
      title: 'Bike-Shop',
      htmlAttrs: {
        lang: 'ru',
      },
    },
  },
  routeRules: {
    '/': {
      redirect: '/catalog',
    },
  },
  modules: [
    '@primevue/nuxt-module',
    '@vueuse/nuxt',
    '@nuxt/fonts',
    '@pinia/nuxt',
    '@nuxt/image',
    '@nuxtjs/html-validator',
  ],
  css: ['normalize.css', '@/assets/css/main.scss'],
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
  build: {
    analyze: false,
  },
  primevue: {
    options: {
      theme: {
        preset: MyPreset,
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
      ],
    },
  },
});