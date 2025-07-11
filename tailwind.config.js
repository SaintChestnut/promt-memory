// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     './pages/**/*.{js,ts,jsx,tsx,mdx}',
//     './components/**/*.{js,ts,jsx,tsx,mdx}',
//     './app/**/*.{js,ts,jsx,tsx,mdx}'
//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//         satoshi: ['Satoshi', 'sans-serif'],
//         inter: ['Inter', 'sans-serif']
//       },
//       colors: {
//         'primary-orange': '#FF5722'
//       }
//     }
//   },
//   plugins: []
// };

// const {
//   default: flattenColorPalette,
// // eslint-disable-next-line @typescript-eslint/no-require-imports
// } = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  prefix: '',
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['Inter', 'sans-serif']
      },
      colors: {
        'primary-orange': '#FF5722'
      }
    }
  },
  plugins: []
};
