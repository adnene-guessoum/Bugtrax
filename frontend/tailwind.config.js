/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      minWidth: {
        320: '320px'
      },
      typography: theme => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            a: {
              color: theme('colors.blue.500'),
              '&:hover': {
                color: theme('colors.blue.700')
              }
            },
            h2: {
              color: theme('colors.gray.900')
            }
          }
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.blue.400'),
              '&:hover': {
                color: theme('colors.blue.600')
              }
            },
            h2: {
              color: theme('colors.gray.100')
            }
          }
        }
      })
    }
  },
  plugins: [require('@tailwindcss/typography')],
  variants: {
    extend: {
      display: ['group-hover']
    }
  }
};
