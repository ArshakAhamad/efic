import type { Config } from 'tailwindcss';

const config: Config = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Poppins', 'sans-serif'],
            },
            colors: {
                'efic-accent': '#00cc88',
                'efic-dark': '#008060',
            },
            animation: {
                'fade-in': 'fadeIn 0.3s ease-out',
                shake: 'shake 0.4s ease-in-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                shake: {
                    '0%, 100%': { transform: 'translateX(0)' },
                    '20%, 60%': { transform: 'translateX(-10px)' },
                    '40%, 80%': { transform: 'translateX(10px)' },
                },
            },
        },
    },
    plugins: [
        require('tailwind-scrollbar'),
    ],
};

export default config;
