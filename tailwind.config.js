module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    fontFamily: {
      sans: ["Vazir FD", "Arial"],
      serif: [],
    },
    extend: {},
  },
  plugins: [require("tailwind-scrollbar")],
};
