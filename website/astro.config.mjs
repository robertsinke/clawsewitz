// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	site: 'https://robertsinke.github.io',
	base: '/clawsewitz',
	integrations: [
		starlight({
			title: 'clawsewitz',
			description: 'Senior partner-grade strategy agent for Claude Code, grounded in Clausewitz.',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/robertsinke/clawsewitz' }],
			customCss: ['./src/styles/custom.css'],
			sidebar: [
				{ label: 'Home', slug: 'index' },
				{ label: 'Installation', slug: 'installation' },
				{ label: 'Strategy Loop', slug: 'strategy-loop' },
				{ label: 'Commands', slug: 'commands' },
				{ label: 'Changelog', slug: 'changelog' },
			],
		}),
	],
});
