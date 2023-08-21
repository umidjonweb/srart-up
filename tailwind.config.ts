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
       primary: "#358589",
      "primary-800": "#078ABE",
      "primary-500": "#16a34a",
      "primary-400": "#3CCC65",
      "primary-300": "#E0EDED",

       danger: "#dc2626",
      "danger-600 ": "#E93940",
      "danger-400 ": "#FFD4D4 ",

       secondary: "#EA580C",
      "secondary-200": "#FFEAD7",
      "secondary-100": "#FFCF23",

       black: "#000000",
       "black-900": "#030723",
      "black-800": "#121C2D",
      "black-400": "#455A64 ",

      success: "#34B87C",
      white: "#ffffff",
      gray: "#9DA3BB",
      "gray-800": "#90A0B7",
      "indigo": "#5F66EA",
      "indigo-light": "#44678F",
      "indigo-bold": "#192A3E",
      "blue": "#376FFF",
      "blue-200": "#EBF4FF",
      "brown": "#CA8A04"
    },
    extend: {
              fontFamily: {
                "montserrat": ["montserrat-600"],
                "montserrat-600": ["montserrat-600"],
                "montserrat-800": ["montserrat-800"],
                "inter": ["inter-600"],
                 "inter-400": ["inter-400"],
                "inter-500": ["inter-500"],
                "inter-600": ["inter-600"],
                 "poppins-400": ["poppins-400"],
                 "poppins-500": ["poppins-500"],
                 "poppins-600": ["poppins-600"],
            }
    },
  },
  plugins: [],
};

