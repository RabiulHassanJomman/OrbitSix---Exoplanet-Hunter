/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
        },
        dark: {
          800: '#1F2937',
          900: '#111827',
        }
      },
      backgroundImage: {
        'space-gradient': 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%)',
        'planet': "url('/src/assets/planet-bg.jpg')"
      }
    },
  },
  plugins: [],
}
