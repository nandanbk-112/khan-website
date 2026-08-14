import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F0F7FF',
          100: '#E0EFFE',
          500: '#2563EB',
          600: '#1D4ED8',
          700: '#1E40AF',
          900: '#0F172A',
          navy: '#0F172A',
          slate: '#1E293B',
        },
        gold: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          500: '#D97706',
          600: '#B45309',
          accent: '#C9A227',
        },
        emerald: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          600: '#059669',
          700: '#047857',
          900: '#064E3B',
        },
        purple: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          600: '#7C3AED',
          700: '#6D28D9',
        },
        rose: {
          50: '#FFF1F2',
          100: '#FFE4E6',
          600: '#E11D48',
        },
        background: {
          DEFAULT: "#FFFFFF",
          secondary: "#F8FAFC",
          card: "#FFFFFF",
          accent: "#F1F5F9",
          tint: "#F0F4F8",
        },
        text: {
          primary: "#0F172A",
          secondary: "#334155",
          muted: "#64748B",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "Manrope", "sans-serif"],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(15, 23, 42, 0.06), 0 2px 6px -1px rgba(15, 23, 42, 0.03)',
        'soft-lg': '0 12px 36px -4px rgba(15, 23, 42, 0.1), 0 4px 12px -2px rgba(15, 23, 42, 0.04)',
        'color-blue': '0 10px 25px -5px rgba(37, 99, 235, 0.25)',
        'color-gold': '0 10px 25px -5px rgba(201, 162, 39, 0.25)',
        'modal': '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      }
    },
  },
  plugins: [],
};

export default config;
