/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        dark: "#685454",
        light: "#f2f2f2",
        primary: "#ea8a8a",
        secondary: "#ffd3b6",
      },
    },
  },
  plugins: [],
};
