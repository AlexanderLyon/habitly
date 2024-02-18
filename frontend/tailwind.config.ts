import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			colors: {
				background: 'rgb(var(--background-rgb) / <alpha-value>)',
				accent: 'rgb(var(--accent-rgb) / <alpha-value>)',
				gunmetal: 'rgb(var(--gunmetal-rgb))',
				inputBackground: 'rgb(var(--input-background-rgb))',
				cardBackground: 'rgb(var(--card-background-rgb))',
			},
		},
	},
	plugins: [],
};
export default config;
