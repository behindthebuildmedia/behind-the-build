/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#C8041C',
          charcoal: '#212121',
          white: '#FFFFFF',
          offwhite: '#FAF9F9',
          lightgray: '#F3F3F3',
          gray: '#E6E6E6',
        }
      },
      fontFamily: {
        sans: ['NimbusSanL', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.03em',
        tighter: '-0.02em',
        tight: '-0.01em',
        wide: '0.02em',
        wider: '0.05em',
        widest: '0.1em',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(-0.5deg)' },
          '50%': { transform: 'translateY(-15px) rotate(0.5deg)' },
        }
      }
    },
  },
  plugins: [],
}

