/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    container: {
      center: true,
      screens: {
        sm: "600px",
        md: "728px",
        lg: "984px",
        xl: "1400px",
        "2xl": "1496px",
      },
    },
    colors: {
      green: "#02676C",
      "green-800": "#358589",
      "green-dark": "#013E41",
      primary: "#5459EA",
      "primary-800": "#078ABE",
      "primary-700": "#3366FF",
      "primary-600": "#D6E0FF",
      "primary-400": "#DEDFFF",
      "primary-200": "#EF33FF",

      danger: "#FF2929",
      "danger-400 ": "#FFD4D4 ",

      secondary: "#FF9533",
      "secondary-200": "#FFEAD7",

      black: "#192A3E",
      "black-800": "#2E3A59",
      "black-600": "#192A3E",
      "black-400": "#505470 ",

      success: "#34B87C",
      white: "#ffffff",
      gray: "#9DA3BB",
      "gray-800": "#90A0B7",
    },
    extend: {
      
    },
  },
  plugins: [],
};

