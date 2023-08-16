// https://nuxt.com/docs/api/configuration/nuxt-config
// import './assets/css/main.css'
export default defineNuxtConfig({
   css: ["vuetify/styles/main.sass", "@mdi/font/css/materialdesignicons.css", "~/assets/main.scss",],
   build: {
    transpile: ['vuetify']
   },
   modules: ["@nuxtjs/google-fonts"],
   googleFonts:{
    families:{
      Inter: [300,400,500, 600, 700, 800],
      Montserrat:[600, 800],
      Poppins:[400, 600, 800]
    },
    download: true,
    useStylesheet: true
   }
     
})
