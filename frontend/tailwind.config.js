/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FD5918",
        primaryHover: "#fd5918c4",
        dark: "#303030",
      },
    },
  },
  plugins: [],
};
