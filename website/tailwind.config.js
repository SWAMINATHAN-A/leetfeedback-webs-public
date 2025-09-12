/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    safelist: [
        'animate-cell-ripple',
        'mask-radial-from-20%',
        'mask-radial-at-top',
    ],
    theme: {
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            fontFamily: {
                sans: [
                    "HarmonyOS Sans",
                    "system-ui",
                    "-apple-system",
                    "BlinkMacSystemFont",
                    "Segoe UI",
                    "Roboto",
                    "sans-serif",
                ],
                mono: [
                    "ui-monospace",
                    "SFMono-Regular",
                    "SF Mono",
                    "Consolas",
                    "Liberation Mono",
                    "Menlo",
                    "monospace",
                ],
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
                "fade-in": {
                    from: { opacity: "0", transform: "translateY(10px)" },
                    to: { opacity: "1", transform: "translateY(0)" },
                },
                glow: {
                    "0%, 100%": {
                        boxShadow: "0 0 20px rgba(255, 255, 255, 0.1)",
                    },
                    "50%": { boxShadow: "0 0 30px rgba(255, 255, 255, 0.2)" },
                },
                ripple: {
                    "0%, 100%": {
                        transform: "translate(-50%, -50%) scale(1)",
                    },
                    "50%": {
                        transform: "translate(-50%, -50%) scale(0.9)",
                    },
                },
                "line-shadow": {
                    "0%": {
                        backgroundPosition: "0 0",
                    },
                    "100%": {
                        backgroundPosition: "100% -100%",
                    },
                },
                "cell-ripple": {
                    "0%": {
                        transform: "scale(1)",
                        opacity: "1",
                    },
                    "50%": {
                        transform: "scale(1.1)",
                        opacity: "0.8",
                    },
                    "100%": {
                        transform: "scale(1)",
                        opacity: "0.4",
                    },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "fade-in": "fade-in 0.8s ease-out forwards",
                glow: "glow 2s ease-in-out infinite",
                ripple: "ripple 2s ease-in-out infinite",
                "line-shadow": "line-shadow 35s linear infinite",
                "cell-ripple": "cell-ripple var(--duration, 300ms) ease-out",
            },
        },
    },
    plugins: [
        function ({ addUtilities }) {
            const newUtilities = {
                '.mask-radial-from-20\\%': {
                    '-webkit-mask-image': 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
                    'mask-image': 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
                },
                '.mask-radial-at-top': {
                    '-webkit-mask-position': 'top center',
                    'mask-position': 'top center',
                },
            };
            addUtilities(newUtilities);
        },
    ],
};
