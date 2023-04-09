/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      iphone: '375px',
      // iphone => @media (min-width: 375px) { ... }

      tablet: '640px',
      // tablet => @media (min-width: 640px) { ... }

      ipad: '768px',
      // ipad => @media (min-width: 768px) { ... }

      laptop: '1024px',
      // laptop => @media (min-width: 1024px) { ... }

      desktop: '1280px',
      // desktop => @media (min-width: 1280px) { ... }

      lgdesktop: '1440px',
      // desktop => @media (min-width: 1440px) { ... }
    },
    extend: {
      colors: {
        primary: 'var(--primary)',
        light_primary: 'var(--light_primary)',
        pale_primary: 'var(--pale_primary)',
        text_primary: 'var(--text_primary)',
        text_second: 'var(--text_second)',
        text_tertiary: 'var(--text_tertiary)',
        background_white: 'var(--background_white)',
        background_gray: 'var(--background_gray)',
        line: 'var(--line)',
      },
    },
  },
  plugins: [],
};
