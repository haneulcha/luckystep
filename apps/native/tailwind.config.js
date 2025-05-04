const { hairlineWidth } = require('nativewind/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

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
        mono: {
          10: '#0D0E0D',
          20: '#1F221F',
          50: '#383D38',
          60: '#E0E1E0',
          90: '#F5F5F5',
        },
        blau: {
          50: '#094D92',
        },
        rot: {
          50: '#DD1C1A',
        },
        violet: {
          40: '#4A4E69',
          50: '#662D91',
        },
        gelb: {
          10: '#FDF0B0',
          30: '#FBE574',
          40: '#F9D938',
          50: '#F7CC00',
          70: '#F0C808',
        },
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
    },
  },
  plugins: [],
};
