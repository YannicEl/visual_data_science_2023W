import { defineConfig, presetIcons, presetWind, transformerDirectives } from 'unocss';

export default defineConfig({
	presets: [presetWind(), presetIcons({ warn: true, cdn: 'https://esm.sh/' })],
	transformers: [transformerDirectives()],
	theme: {
		container: {
			center: true,
			padding: '1rem',
		},
		fontFamily: {
			sans: ['Open Sans', 'sans-serif'],
		},
	},
	safelist: [],
});
