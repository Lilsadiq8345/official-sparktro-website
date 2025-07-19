/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './index.html',
        './partials/**/*.html',
        './js/**/*.{js,mjs}',
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    50: 'var(--color-brand-50)',
                    100: 'var(--color-brand-100)',
                    200: 'var(--color-brand-200)',
                    300: 'var(--color-brand-300)',
                    400: 'var(--color-brand-400)',
                    500: 'var(--color-brand-500)',
                    600: 'var(--color-brand-600)',
                    700: 'var(--color-brand-700)',
                    800: 'var(--color-brand-800)',
                    900: 'var(--color-brand-900)',
                    950: 'var(--color-brand-950)'
                },
                yellow: 'var(--color-yellow)',
                black: 'var(--color-black)',
                surface: 'var(--color-surface)',
                'surface-2': 'var(--color-surface-2)',
                border: 'var(--color-border)',
                success: 'var(--color-success-500)',
                warning: 'var(--color-warning-500)',
                danger: 'var(--color-danger-500)',
                info: 'var(--color-info-500)',
                header: 'var(--header-bg)',
            },
            fontFamily: {
                sans: ['Work Sans', 'var(--font-sans)', 'sans-serif'],
                heading: ['Good Times', 'Work Sans', 'sans-serif']
            },
            boxShadow: {
                glow: 'var(--shadow-glow)'
            },
            borderRadius: {
                xs: 'var(--radius-xs)', sm: 'var(--radius-sm)', DEFAULT: 'var(--radius)', md: 'var(--radius-md)', lg: 'var(--radius-lg)', xl: 'var(--radius-xl)', '2xl': 'var(--radius-2xl)', full: 'var(--radius-full)'
            },
        }
    },
    safelist: [
        'px-[240px]',
        'gradient-bottom-border',
        'bg-[linear-gradient(to_right,#FF6363,#0482F9,#F2D519,#7996B8,#6BB54A)]'
    ],
    plugins: []
};