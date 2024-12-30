import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 커스텀 색상
        primary: {
          DEFAULT: '#007AFF',
          dark: '#0056B3',
        },
        secondary: {
          DEFAULT: '#6C757D',
          dark: '#495057',
        },
      },
      fontFamily: {
        sans: ['var(--font-pretendard)'],
      },
      spacing: {
        // 커스텀 spacing
      },
      borderRadius: {
        // 커스텀 radius
      },
      screens: {
        'xs': '475px',
        // 기본 breakpoints
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
};

export default config;