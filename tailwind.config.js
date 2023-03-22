/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        eveentTheme: {
          "primary": "#C8B027",
          "secondary": "#01202C",
          "accent": "#60A4BF",
          "registerBtn": "#60A4BF"
        },
      },
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}