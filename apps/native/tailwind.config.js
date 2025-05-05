const { hairlineWidth } = require('nativewind/theme');

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
        // mono: {
        //   10: '#0D0E0D',
        //   20: '#1F221F',
        //   50: '#383D38',
        //   60: '#E0E1E0',
        //   70: '#F0F0F0',
        //   80: '#F0F0F0',
        //   90: '#F5F5F5',
        // },
        mono: {
          10: '#ffffff',
          20: '#f5f5f5',
          30: '#ebebeb',
          40: '#e0e0e0',
          50: '#d6d6d6',
          60: '#c4c4c4',
          70: '#939393',
          80: '#626262',
          90: '#313131',
        },
        blau: {
          10: '#E5F0FF',
          40: '#B3D0FF',
          50: '#094D92',
        },
        rot: {
          10: '#FDEDED',
          20: '#F4A5A4',
          30: '#EE6F6D',
          40: '#E73936',
          50: '#dd1c1a',
          70: '#B81414',
        },
        lila: {
          10: '#F5F0FF',
          40: '#4A4E69',
          50: '#662D91',
        },
        gelb: {
          10: '#FEE9D7',
          20: '#FECEA6',
          30: '#FFB476',
          40: '#FF9945',
          50: '#FA8B30',
          60: '#F57E1C',
          70: '#F07007',
        },
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
    },
  },
  plugins: [],
};
