// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  plugins: ['~/plugins/vue3-easy-data-table.js'], // Keeping your client-side plugin for the table
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  nitro: {
    externals: {
      inline: ['sqlite3'],  // Inline the sqlite3 package so it works in the server context
    },
  },
});
