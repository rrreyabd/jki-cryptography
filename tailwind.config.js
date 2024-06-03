/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#111829",
        secondary: "#828cf8",
        tertiary: "#be84fc",
        lightYellow: '#b1f079',
        lightBlue: '#73e9e3',
      },
      keyframes: {
        animatedgradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        gradient: "animatedgradient 6s ease infinite alternate",
      },
      backgroundSize: {
        "300%": "300%",
      },
    },
  },
  plugins: [],
};
