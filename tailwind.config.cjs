/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		container: {
			center: true,
		},
		extend: {
			colors: {
				primary: '#1f253d',
				secondary: '#3E4063',
				active: '#5A9CF8',
			},
			fontFamily: {
				main: ['Orbitron-400', 'sans-serif'],
				'main-bold': ['Orbitron-500', 'sans-serif'],
			},
		},
	},
	plugins: [],
};
