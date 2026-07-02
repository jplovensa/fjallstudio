/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
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
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        apple: {
          text: '#1d1d1f',
          bg: '#f5f5f7',
          gray: '#86868b',
          blue: '#0071e3',
          border: 'rgba(255,255,255,0.5)',
        },
        fjall: {
          light: '#4CD3B3',
          dark: '#3D867C'
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Text"', '"SF Pro Display"', 'system-ui', 'sans-serif'],
        display: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
        '4xl': '2.5rem',
        '5xl': '3.5rem',
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.05)',
        'glass-hover': '0 12px 40px 0 rgba(31, 38, 135, 0.08)',
        'glass-dark': '0 12px 40px 0 rgba(0, 0, 0, 0.2)',
        'island': '0 10px 25px rgba(0,0,0,0.2)',
        'ipad': '0 40px 80px -20px rgba(0,0,0,0.8)',
        'os-nav': '0 20px 40px rgba(0,0,0,0.4)',
        'hub': '0 0 30px rgba(0,113,227,0.5)',
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
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(40px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        'pulse-dot': {
          '0%': { boxShadow: '0 0 0 0 rgba(52, 199, 89, 0.7)' },
          '70%': { boxShadow: '0 0 0 15px rgba(52, 199, 89, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(52, 199, 89, 0)' },
        },
        orbit: {
          '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
          '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
        },
        'orbit-reverse': {
          '0%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
          '100%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
        },
        'scan-line': {
          '0%': { transform: 'translateZ(0px)', opacity: '0.8' },
          '100%': { transform: 'translateZ(100px)', opacity: '0.1' }
        },
        'spin-360': {
          '0%': { transform: 'rotateX(60deg) rotateZ(-40deg)' },
          '100%': { transform: 'rotateX(60deg) rotateZ(320deg)' }
        },
        'spin-slow': {
          '0%': { transform: 'rotateX(60deg) rotateZ(0deg)' },
          '100%': { transform: 'rotateX(60deg) rotateZ(360deg)' }
        },
        'data-flow': {
          '0%': { left: '0%', transform: 'translateX(-100%)' },
          '100%': { left: '100%', transform: 'translateX(0)' }
        },
        'eps-drop': {
          '0%': { transform: 'translateZ(100px)', opacity: '0' },
          '15%': { transform: 'translateZ(0)', opacity: '1' },
          '85%': { transform: 'translateZ(0)', opacity: '1' },
          '100%': { transform: 'translateZ(0)', opacity: '0' }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
        'blob': 'blob 10s infinite alternate',
        'pulse-dot': 'pulseDot 2s infinite',
        'orbit': 'orbit 20s linear infinite',
        'orbit-reverse': 'orbitReverse 25s linear infinite',
        'scan-line': 'scanLine 3s ease-in-out infinite alternate',
        'spin-360': 'spin360 12s linear infinite',
        'spin-slow': 'spinSlow 20s linear infinite',
        'data-flow': 'dataFlow 2.5s infinite cubic-bezier(0.4, 0, 0.2, 1)'
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
