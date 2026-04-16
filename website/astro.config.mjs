import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://robertsinke.github.io',
  base: '/clawsewitz',
  integrations: [tailwind()],
});
