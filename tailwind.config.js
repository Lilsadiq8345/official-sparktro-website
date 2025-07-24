/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,js,ts,jsx,tsx}",
        "./*.html",
        "./src/pages/**/*.html",
        "./src/components/**/*.html"
    ],
    theme: {
        extend: {
            colors: {
                'hannan-black': '#1e2533',
                'hannan-sub-text': '#5a556e',
                'hannan-primary-2': '#0a97b0',
                'hannan-border-1': '#bdc7d3',
                'hannan-border-2': '#d6e2ef',
                'hannan-fill-color': '#8d97a3',
                'hannan-white': '#ffffff',
                'hannan-green': '#1d9993',
                'hannan-active': '#0dc46e',
                'hannan-red': '#ff4340',
                'hannan-yellow': '#fdcb02',
                'hannan-blue': '#0482f9',
                'hannan-pink': '#ee2358',
                'hannan-purple': '#ee23da',
                'hannan-orange': '#fdd40f',
                'hannan-light-green': '#6bb54a',
            },
            fontFamily: {
                'goodtimes': ['GoodTimes-Regular', 'sans-serif'],
                'worksans': ['WorkSans-Regular', 'sans-serif'],
                'worksans-medium': ['WorkSans-Medium', 'sans-serif'],
                'worksans-semibold': ['WorkSans-SemiBold', 'sans-serif'],
                'worksans-bold': ['WorkSans-Bold', 'sans-serif'],
                'dmsans': ['DmSans-Regular', 'sans-serif'],
                'dmsans-bold': ['DmSans-Bold', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-border': 'linear-gradient(90deg, rgba(255, 99, 99, 1) 0%, rgba(4, 130, 249, 1) 23.15%, rgba(242, 213, 25, 1) 45.79%, rgba(121, 150, 184, 1) 72.19%, rgba(107, 181, 74, 1) 100%)',
            },
            boxShadow: {
                'custom': '0px 4px 10px 0px rgba(10, 151, 176, 0.1)',
                'card': '0px 0px 30px 0px rgba(0, 0, 0, 0.06)',
            },
            backdropBlur: {
                'xs': '2px',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'scale-in': 'scaleIn 0.3s ease-out',
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.95)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
            },
        },
    },
    plugins: [],
}

// For HTML files using CDN Tailwind
if (typeof window !== 'undefined' && window.tailwind) {
    window.tailwind.config = module.exports;
}
