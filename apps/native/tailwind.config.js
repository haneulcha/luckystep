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
        indigo: {
          10: '#dae0fc',
          20: '#b4c1f9',
          30: '#8fa1f6',
          40: '#6982f3',
          50: '#4463F0',
          60: '#364fc0',
          70: '#293b90',
          80: '#1b2860',
          90: '#0e1430',
        },
        grun: {
          10: '#e4efe4',
          20: '#c9dec9',
          30: '#adceae',
          40: '#92bd93',
          50: '#77ad78', //
          60: '#5f8a60',
          70: '#476848',
          80: '#304530',
          90: '#182318',
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
