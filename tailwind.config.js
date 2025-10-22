/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#FDE2E2',      // Soft blush
        secondary: '#F5EBDD',    // Warm tan
        highlight: '#D8B4A6',    // Muted mauve
        bgLight: '#FFFFFF',
        bgWarm: '#FFF8F2',
        textDark: '#333333',
        textGray: '#666666',
        // Soft pink/gold/purple accent colors
        pink: {
          light: '#FFD6E8',
          DEFAULT: '#FFB4D5',
          dark: '#F39EC4',
        },
        gold: {
          light: '#FFF4DC',
          DEFAULT: '#F4D58D',
          dark: '#E8C170',
        },
        purple: {
          light: '#E8D5F2',
          DEFAULT: '#C9A9E6',
          dark: '#B591D9',
        },
      },
      fontFamily: {
        tech: ['"Share Tech Mono"', 'monospace'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        md: '0 4px 6px rgba(0,0,0,0.1)',
        lg: '0 10px 15px rgba(0,0,0,0.15)',
        xl: '0 20px 25px rgba(0,0,0,0.2)',
        'glow-pink': '0 0 20px rgba(255, 180, 213, 0.4)',
        'glow-gold': '0 0 20px rgba(244, 213, 141, 0.4)',
        'glow-purple': '0 0 20px rgba(201, 169, 230, 0.4)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-pink-gold': 'linear-gradient(135deg, #FFB4D5 0%, #F4D58D 100%)',
        'gradient-pink-purple': 'linear-gradient(135deg, #FFB4D5 0%, #C9A9E6 100%)',
        'gradient-shimmer': 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
