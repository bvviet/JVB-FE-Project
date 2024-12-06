/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        xs: '360px',
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        '2xl': '1400px',
        '3xl': '1670px',
      },
      colors: {
        dark: {},
        primary: {
          main: '#34a853',
          black: '#0b0d28',
          gray: '#7D8087',
          light: '#F1F1F1',
          white: '#ffffff',
          border: '#dcdddf',
        },
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(261deg, #FEF2EB 0%, #F1F1F1 46.23%, #E4E0EA 99.82%)',
        'custom-gradient-1': 'linear-gradient(226.58deg, #FEF2EB 1.52%, #F1F1F1 47.05%, #E4E0EA 99.84%)',
        'footer-bg': 'url(/images/footer__bg.png)',
        'header-banner-bg': 'url(/images/header_banner__bg.png)',
        'header-banner-bg-mobile': 'url(/images/header_banner__bg-mobile.png)',
        'major-bg': 'url(/images/majors__bg.png)',
        'banner-shape-2': 'url(/images/banner-shape-2.svg)',
        'banner-shape-1': 'url(/images/banner-shape.svg)',
        'banner-img': 'url(/images/image_2x.webp)',
        'why-us-bg': 'url(/images/ww-img__bg.svg)',
        'feedback-bg': 'url(/images/feedback__bg.png)',
      },
      fontFamily: {
        logo: ['Azeret Mono', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('flowbite/plugin')],
};
