/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        prussian: {
          DEFAULT: '#1E3A5F',
          dark: '#132846',
          tint: '#E8EDF4',
          accent: '#3B6EA5',
        },
        surface: {
          DEFAULT: '#F4F6F9',
          card: '#EAECF2',
        },
        text: {
          primary: '#132846',
          secondary: '#5C6B82',
          muted: '#8899B0',
        },
        terminal: {
          bg: '#0D1520',
          bar: '#111D2B',
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
