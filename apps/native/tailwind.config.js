const { hairlineWidth } = require('nativewind/theme');
const { colors } = require('./features/shared/const/colors');
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}', './features/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: '#FFFFFF',
        foreground: '#09090B',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: '#FAFAFA',
        },
        secondary: {
          DEFAULT: '#F4F4F5',
          foreground: '#18181B',
        },
        destructive: {
          DEFAULT: '#EF4444',
        },
        ...colors,

        // lila: {
        //   10: '#F5F0FF',
        //   40: '#4A4E69',
        //   50: '#662D91',
        // },
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
    },
  },
  plugins: [],
};
