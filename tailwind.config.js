/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        code: ['Fira Code', 'monospace'],
      },
      colors: {
        'primary': 'var(--color-primary)',
        'secondary': 'var(--color-secondary)',
        'dark-bg': '#121212',
        'dark-surface': '#1E1E1E',
        'light-bg': '#F8F9FA',
        'light-surface': '#FFFFFF',
        'light-gray': '#E0E0E0',
        'dark-gray': '#424242',
        'soft-gray': '#AAAAAA',
        
        // Default pink theme
        'theme-pink-primary': '#FFA4B8',
        'theme-pink-secondary': '#E86C8D',
        
        // Blue theme
        'theme-blue-primary': '#64B5F6',
        'theme-blue-secondary': '#1976D2',
        
        // Green theme
        'theme-green-primary': '#81C784',
        'theme-green-secondary': '#388E3C',
        
        // Purple theme
        'theme-purple-primary': '#B39DDB',
        'theme-purple-secondary': '#673AB7',
        
        // Orange theme
        'theme-orange-primary': '#FFB74D',
        'theme-orange-secondary': '#F57C00',
        
        // Teal theme
        'theme-teal-primary': '#4DB6AC',
        'theme-teal-secondary': '#00796B',
        
        // Red theme (NEW)
        'theme-red-primary': '#EF5350',
        'theme-red-secondary': '#C62828',
        
        // Yellow theme (NEW)
        'theme-yellow-primary': '#FFEE58',
        'theme-yellow-secondary': '#FBC02D',
        
        // Cyan theme (NEW)
        'theme-cyan-primary': '#26C6DA',
        'theme-cyan-secondary': '#0097A7',
        
        // Current theme colors (will be dynamically set via CSS variables)
        'soft-pink': 'var(--color-primary, #FFA4B8)',
        'dark-pink': 'var(--color-secondary, #E86C8D)',
      },
      textColor: {
        'primary': 'var(--color-primary)',
        'secondary': 'var(--color-secondary)',
      },
      backgroundColor: {
        'primary': 'var(--color-primary)',
        'secondary': 'var(--color-secondary)',
      },
      borderColor: {
        'primary': 'var(--color-primary)',
        'secondary': 'var(--color-secondary)',
      },
      gradientColorStops: {
        'primary': 'var(--color-primary)',
        'secondary': 'var(--color-secondary)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
} 