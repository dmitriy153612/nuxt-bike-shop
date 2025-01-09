// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';
import { definePreset } from '@primevue/themes';
const MyPreset = definePreset(Aura, {
  
});
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: false,
  app: {
    baseURL: '/'
  },
  routeRules: {
    '/': {
      redirect: '/catalog'
    }
  },
  modules: [
    '@primevue/nuxt-module',
    '@vueuse/nuxt',
    '@nuxt/fonts',
    '@pinia/nuxt',
    '@nuxt/image'
  ],
  css: ['normalize.css', '@/assets/css/main.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use "~/assets/css/_variables.scss" as *;
          @use "~/assets/css/_mixins.scss" as *;
          `
        }
      }
    }
  },
  build: {
    analyze: true,
  },
  primevue: {
    options: {
      theme: {
        preset: MyPreset,
      },
    },
    autoImport: false,
    components: {
      include: ['ProgressSpinner', 'Select']
    }
  },
});