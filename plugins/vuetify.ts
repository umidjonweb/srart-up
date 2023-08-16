import { createVuetify, ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const myTheme: ThemeDefinition = {
    dark: false,
    colors: {
         primary: "#5459EA",
        "primary-800": "#5A60FF",
        "primary-400": "#DEDFFF",
        "primary-200": "#D6E0FF",
         secondary: "#003E41",
        "secondary-800  ": "#03676C",
        "secondary-light": "#03676C",   
        "secondary-600": "#368589",
         danger: "#ff323f",
         "danger-500": "#FFD4D4",
         "danger-400": "#FFD6D9",
         "info":"#FF9533",
         "info-200":"#FFEAD&",
          dark: "#000000",
         "dark-900": "#252733",
         "dark-800": "#2E3A59",
         "dark-600": "#192A3E",
         "dark-500": "#505470",
    },
    variables: {}
};
export default defineNuxtPlugin((nuxt)=>{
    const vuetify = createVuetify({
      ssr: true,
      components,
      directives,
       theme: {
            defaultTheme: "myTheme",
            themes: {
                myTheme
            }
      },
    })
    nuxt.vueApp.use(vuetify)
})