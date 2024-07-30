/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{html,js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#C7522A',
				shadow: '#F4F0D8',
				light: '#FFFBE5',
				dark: '#1E1E1E',
				bg: {
					light: '#FFFBE5',
					dark: '#1E1E1E',
				},
				txt: {
					light: '#000000',
					dark: '#FFFBE5',
				},
			},
		},
	},
	plugins: [],
};
