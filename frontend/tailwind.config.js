/** @type {import('tailwindcss').Config} */
module.exports = {
    theme: {
      extend: {
        screens: {
          'xs': '360px',     
          'sm': '640px',
          'md': '768px',
          'lg': '1024px',
          'xl': '1280px',
          '2xl': '1536px',
          'ultra': '1920px', 
        },
      },
    },
    // If needed
    content: ['./src/**/*.{js,ts,jsx,tsx,html}'],
    plugins: [],
  }
  