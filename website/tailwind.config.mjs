/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        prussian: {
          DEFAULT: '#1B3A6B',
          dark: '#0F2A4A',
          tint: '#E6ECF4',
          accent: '#1B3A6B',
        },
        surface: {
          DEFAULT: '#F2F4F8',
          card: '#E6ECF4',
        },
        text: {
          primary: '#0F2A4A',
          secondary: '#4A6788',
          muted: '#7A8AA3',
        },
        terminal: {
          bg: '#FFFFFF',
          bar: '#E6ECF4',
          border: '#D8E0EC',
        },
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
        serif: ['IBM Plex Serif', 'serif'],
        pixel: ['VT323', 'monospace'],
      },
    },
  },
  plugins: [],
};
