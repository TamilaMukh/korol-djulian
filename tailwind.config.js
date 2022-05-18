module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "rgb(255, 105, 0)"
      },
      width: {
        th: "31%"
      },
      fontFamily: {
        montserrat: "'Montserrat', sans-serif",
      }
    },
  },
  plugins: [],
}
