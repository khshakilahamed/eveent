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
          neutral: "#3D4451"
        },
      },
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}