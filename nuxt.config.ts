// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura'
import { definePreset } from '@primevue/themes'

const MyPreset = definePreset(Aura, {

})
export default defineNuxtConfig({
  modules: ['@primevue/nuxt-module', '@pinia/nuxt', '@nuxt/image', '@nuxt/eslint'],
  ssr: true,
  devtools: { enabled: true },
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
        },
      ],
      title: 'Bike-Shop',
      htmlAttrs: {
        lang: 'ru',
      },
    },
  },
  css: ['normalize.css', '@/assets/css/main.scss'],
  build: {
    analyze: false,
  },
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
        'Carousel',
      ],
    },
  },
})
