/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{html,js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#C7522A',
				'primary-35': 'rgba(199, 82, 42, 0.35)',
				'primary-50': 'rgba(199, 82, 42, 0.50)',
				primdark: '#B54A26',
				shadow: '#F4F0D8',
				light: '#FFFBE5',
				dark: '#1E1E1E',
				inputbg: '#FFFEF6',
				bg: {
					light: '#FFFBE5',
					dark: '#1E1E1E',
				},
				txt: {
					light: '#000000',
					dark: '#FFFBE5',
				},
			},
			fontFamily: {
				outfit: ['Outfit', 'sans-serif'],
				lexend: ['Lexend', 'sans-serif'],
			},
		},
	},
	plugins: [],
};
