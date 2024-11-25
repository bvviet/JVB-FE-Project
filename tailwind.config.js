/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './node_modules/flowbite/**/*.js'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        xs: { max: '450px' },
        xm: { min: '451px', max: '639px' },
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('flowbite/plugin')],
};
