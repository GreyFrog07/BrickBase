import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0B2545',
          soft: '#13315C',
        },
        sand: {
          DEFAULT: '#FBF7F0',
          warm: '#F4ECD8',
        },
        accent: {
          DEFAULT: '#C9803F',
          deep: '#A8632B',
        },
        line: '#E5DDD0',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
