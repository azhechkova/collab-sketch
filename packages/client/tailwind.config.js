/** @type {import('tailwindcss').Config} */
export const purge = ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}']
export const content = []
export const theme = {
  fontFamily: {
    sans: ['Rubik', 'sans-serif']
  },
  extend: {
    colors: {
      primary: {
        100: '#deebff',
        200: 'rgba(19, 117, 190, .4)',
        300: 'rgba(19, 117, 190, .55)',
        400: '#2379f9',
        500: '#1375be',
        600: '#1169aa'
      },
      secondary: {
        100: '#f6f6f6',
        200: '#f2f2f2',
        300: '#e4e4e4',
        400: '#e2e2e2',
        500: '#c8c8c8',
        600: '#777'
      },
      error: {
        100: 'rgba(219, 72, 72, .05)',
        200: '#db4848'
      },
      success: {
        100: 'rgba(8, 133, 20, .05)',
        200: '#088514'
      }
    }
  }
}
export const plugins = []
