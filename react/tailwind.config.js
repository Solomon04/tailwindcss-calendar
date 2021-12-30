module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        fontFamily: {
            sans: ["'Josefin Sans'"],
            mono: ["'Space Mono'"]
        }
    },
    plugins: [require("@tailwindcss/typography")]
};
