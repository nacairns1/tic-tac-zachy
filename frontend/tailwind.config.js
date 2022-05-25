module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			keyframes: {
				jump: {
					"0%": { transform: "translateY(0)" },
					"20%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(0)" },
					"80%": { transform: "translateY(0)" },
					"100%": { transform: "translateY(0)" },
					"40%": { transform: "translateY(-50px)" },
					"60%": { transform: "translateY(-35px)" },
				},
				shake: {
					"10%": { transform: "translateX(-1px)" },
					"90%": { transform: "translateX(-1px)" },
					"20%": { transform: "translateX(2px)" },
					"80%": { transform: "translateX(2px)" },
					"30%": { transform: "translateX(-4px)" },
					"50%": { transform: "translateX(-4px)" },
					"70%": { transform: "translateX(-4px)" },
					"40%": { transform: "translateX(4px)" },
					"60%": { transform: "translateX(4px)" },
				},
			},
			animation: {
				"jump-once-no-delay": "jump 1s linear 0s",
				"jump-once-sm-delay": "jump 1s linear .1s",
				"jump-once-md-delay": "jump 1s linear .2s",
        "shake-once": "shake 0.82s linear .2s"
			},
		},
	},
	plugins: [require("@tailwindcss/typography"), require("daisyui")],
	daisyui: {
		styled: true,
		themes: true,
		base: true,
		utils: true,
		logs: true,
		rtl: false,
		prefix: "",
		darkTheme: "dark",
	},
};
