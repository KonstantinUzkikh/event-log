import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      'sm': '640px',
      'md': '850px',
      'lg': '1024px',
      'xl': '1280px',

      spacing: {
        'base': '8px',
        'tablet': '16px',
        'laptop': '24px',
        'desktop': '32px',
      },

      boxShadow: {
        card: '0px 0px 4px 0px rgba(0, 0, 0, 0.04), 0px 4px 16px 0px rgba(0, 0, 0, 0.02)',
        modal: 'var(--shadow-modal-window)',
      },
      fontSize: {
        'fz-body': [
          '16px',
          {
            lineHeight: '24px',
            fontWeight: '400',
          },
        ],
      },
      colors: {
        'color-base-100-day': 'var(--base-100-day)',
        'color-base-20-day': 'var(--base-20-day)',
        'color-base-0-day': 'var(--base-0-day)',
      },
    },
  },
  plugins: [],
}
export default config
