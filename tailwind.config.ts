import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0F1B2D',
          soft: '#16263B',
          softer: '#1D3049',
        },
        paper: {
          DEFAULT: '#F6F4EF',
          soft: '#EDEAE1',
          softer: '#E3E0D5',
        },
        amber: {
          DEFAULT: '#E8A33D',
          dim: '#C98A2E',
        },
        dusk: {
          DEFAULT: '#5B8A9A',
          dim: '#3F6673',
        },
        slate: {
          DEFAULT: '#8B93A1',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      keyframes: {
        rise: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        sweep: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
      },
      animation: {
        rise: 'rise 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
        sweep: 'sweep 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
} satisfies Config
