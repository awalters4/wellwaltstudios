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
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
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
      },
    },
  },
  plugins: [],
};
