/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#090909',
        secondary: '#111111',
        surface: '#1A1A1A',
        surfaceHover: '#242424',
        accent: {
          DEFAULT: '#D4AF37',
          hover: '#E5B869',
          light: '#F5D77F',
          muted: 'rgba(212, 175, 55, 0.15)',
        },
        muted: '#A1A1AA',
        foreground: '#FFFFFF',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-syne)', 'Cinzel', 'Playfair Display', 'serif'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s infinite ease-in-out',
        'float': 'float 6s infinite ease-in-out',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'blur(20px)' },
          '50%': { opacity: '0.8', filter: 'blur(30px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
      },
    },
  },
  plugins: [],
};
