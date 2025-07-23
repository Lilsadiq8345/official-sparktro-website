/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './index.html',
        './components/**/*.{html,js}',
         "./src/**/*.html", 
    ],
    theme: {
        fontFamily: {
            sans: ['Work Sans', 'ui-sans-serif', 'system-ui'],
            display: ['Good Times', 'Work Sans', 'ui-sans-serif']
        },
        extend: {
            colors: {
                brand: {
                    500: '#0482F9'
                },
                accent: {
                    red: '#FF6363',
                    yellow: '#F2D519',
                    slate: '#7996B8',
                    green: '#6BB54A'
                }
            },
            maxWidth: {
                design: '1440px'
            },
            spacing: {
                'pad-xl': '240px'
            },
            transitionTimingFunction: {
                soft: 'cubic-bezier(.16,.84,.44,1)',
                expo: 'cubic-bezier(.19,1,.22,1)'
            },
            keyframes: {
                gradientMove: {
                    '0%': { backgroundPosition: '0% 50%' },
                    '100%': { backgroundPosition: '200% 50%' }
                },
                dropdownIn: {
                    '0%': { opacity: 0, transform: 'translateY(-6px) scale(.98)' },
                    '100%': { opacity: 1, transform: 'translateY(0) scale(1)' }
                },
                drawerIn: {
                    '0%': { transform: 'translateX(6%)', opacity: 0 },
                    '100%': { transform: 'translateX(0)', opacity: 1 }
                }
            },
            animation: {
                'gradient-line': 'gradientMove 12s linear infinite',
                'dropdown-in': 'dropdownIn .18s var(--ease-soft) forwards',
                'drawer-in': 'drawerIn .22s var(--ease-soft) forwards'
            },
            boxShadow: {
                'elev-header': '0 1px 2px -1px rgba(0,0,0,.5),0 4px 18px -8px rgba(0,0,0,.6)'
            }
        }
    },
    plugins: [
        function ({ addVariant, e }) {
            addVariant('open-data', ({ modifySelectors, separator }) => {
                modifySelectors(({ className }) =>
                    `[data-open="true"].${e(`open-data${separator}${className}`)}`
                );
            });
        }
    ]
};
