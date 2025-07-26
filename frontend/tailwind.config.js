import lineClamp from '@tailwindcss/line-clamp'

const config = {
	content: ['./app/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {},
	},
	plugins: [lineClamp],
};

export default config;
