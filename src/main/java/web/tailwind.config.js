/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"index.html",
		"view/**/*.{js,ts,jsx,tsx,mdx}"
	],
	theme: {
		screens: {
			micro: "360px",
			mini: "720px",
			macro: "1080px",
			large: "1280px",
			desktop: "1366px",
			bigass: "1440px",
		},
		fontFamily: {
			poppins: ["Poppins", "sans"],
			anton: ["Anton", "sans"]
		},
	},
	plugins: [],
}

