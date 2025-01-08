import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#EA580C',
          secondary: '#F97316',
          tertiary: '#FDBA74',
          inverse: '#F9FAFB',
        },
        status: {
          hover: '#C2410C',
          focus: '#9A3412',
          danger: '#DC2626',
          disabled: '#9CA3AF',
        },
        text: {
          title: '#111827',
          default: '#1F2937',
          disabled: '#9CA3AF',
        },
        border: {
          primary: '#111827',
          secondary: '#E5E7EB',
        },
      },
      fontFamily: {
        sans: 'var(--font-pretendard), -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif',
      },
      spacing: {
        '4.5': '1.125rem', // 18px
        '5.5': '1.375rem', // 22px
        '6.5': '1.625rem', // 26px
        '7.5': '1.875rem', // 30px
      },
      borderRadius: {
        xs: '0.125rem', // 2px
        sm: '0.25rem', // 4px
        DEFAULT: '0.375rem', // 6px
        md: '0.5rem', // 8px
        lg: '0.75rem', // 12px
        xl: '1rem', // 16px
        '2xl': '1.5rem', // 24px
      },
      screens: {
        xs: '475px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      maxWidth: {
        '8xl': '88rem', // 1408px
        '9xl': '96rem', // 1536px
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [],
};

export default config;
