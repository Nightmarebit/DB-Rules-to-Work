import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        db: {
          red: '#EC0016',
          dark: '#282D37',
          light: '#F0F3F5',
          yellow: '#FFCC00',
          green: '#3ECF8E',
          gray: {
            100: '#F5F5F5',
            200: '#E8E8E8',
            300: '#D1D1D1',
            400: '#9E9E9E',
            500: '#6E6E6E',
            600: '#4A4A4A',
            700: '#2D2D2D',
            800: '#1F1F1F',
            900: '#141414',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
      },
      minHeight: { touch: '48px' },
      minWidth: { touch: '48px' },
    },
  },
  plugins: [],
};

export default config;
