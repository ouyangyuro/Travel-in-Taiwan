/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // using `src` directory:
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
        secondary: 'var(--secondary)',
        light_secondary: 'var(--light_secondary)',
        pale_secondary: 'var(--pale_secondary)',
        tertiary: 'var(--tertiary)',
        light_tertiary: 'var(--light_tertiary)',
        pale_tertiary: 'var(--pale_tertiary)',
        quaternary: 'var(--quaternary)',
        light_quaternary: 'var(--light_quaternary)',
        pale_quaternary: 'var(--pale_quaternary)',
        text_primary: 'var(--text_primary)',
        text_second: 'var(--text_second)',
        text_tertiary: 'var(--text_tertiary)',
        background_white: 'var(--background_white)',
        background_gray: 'var(--background_gray)',
        line: 'var(--line)',
      },
      boxShadow: {
        '3xl': '0px 14px 24px 0px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
};
