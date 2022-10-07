/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        dark: "#3c3744",
        light: "#fbfff1",
        "primary-dark": "#090c9b",
        primary: "#3066BE",
        "primary-light": "#B4C5E4",
      },
    },
  },
  plugins: [],
};
