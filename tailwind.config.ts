/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        custom: "1272px",
      },
      padding: {
        "side-mobile": "15px",
      },
    },
  },
  plugins: [],
};
