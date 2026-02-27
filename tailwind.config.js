import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: "#292A2C",
        "primary-light": "#98CF93",
        "primary-hover": "#7FCB79",
        accent: "#78C86F",
        "accent-hover": "#66BA5C",
        white: "#ffff",
        orange: "#F5BE3B",
        gray: "#8D949D",
        text: "#292A2C",
        blue: "#5FAE5A",
        cream: "#F5F7EA",
        sand: "#DCE9CC",
        "light-gray": "#E4E7EB",
        red: "#FF5469",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
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
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: ["var(--font-mulish)"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        'phone-ring': {
          '0%': { transform: 'rotate(0deg)' },
          '5%': { transform: 'rotate(-5deg)' },
          '10%': { transform: 'rotate(5deg)' },
          '15%': { transform: 'rotate(-5deg)' },
          '20%': { transform: 'rotate(5deg)' },
          '25%': { transform: 'rotate(-5deg)' },
          '30%': { transform: 'rotate(5deg)' },
          '35%': { transform: 'rotate(-5deg)' },
          '40%': { transform: 'rotate(5deg)' },
          '45%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        'parallax-scroll': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-300px)' },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'phone-ring': 'phone-ring 1.5s cubic-bezier(0.3, 0.1, 0.3, 1) both',
        'parallax-scroll': 'parallax-scroll 1s ease-out forwards',
      },
      transformOrigin: {
        'center-bottom': 'center bottom',
      },
    },
  },
  plugins: [tailwindcssAnimate],
}

export default config
