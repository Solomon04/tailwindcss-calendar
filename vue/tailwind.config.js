module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["'Josefin Sans'"],
      mono: ["'Space Mono'"]
    }
  },
  plugins: [require("@tailwindcss/typography")]
}
