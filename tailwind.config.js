/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
         prata: ['Prata', 'serif'],
         poppins: ['Poppins', 'serif'],
          montserrat: ['Montserrat', 'sans-serif'],
          times: ['"Times New Roman"', 'Times', 'serif'],
        // 'sans': ['Caslon', 'Arial', 'sans-serif'],
      },
      screens: {
        'xs': '375px',
        // => @media (min-width: 375px) { ... }
  
        'sm': '640px',
        // => @media (min-width: 640px) { ... }
  
        'md': '768px',
        // => @media (min-width: 768px) { ... }
  
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
  
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },
      colors: {
        "primary": "#091235",
        "secondary":'#ceb46a',
      }, 
      backgroundImage: {
        "hero-img": "url('/src/assets/Lane-booking2.png')",
        "hero-img-mob": "url('/src/assets/Lane-booking-mobile.png')",
        "ecc-img": "url('/src/assets/eccbg.webp')"

      },

      keyframes: {
        'mouse-run': {
          '0%': { top: '-25px' },
          '100%': { top: '50px' },
        },
      },
      animation: {
        'mouse-run': 'mouse-run 2.2s cubic-bezier(.4,0,.2,1) infinite',
      },
     },
   },
  plugins: [],
}

