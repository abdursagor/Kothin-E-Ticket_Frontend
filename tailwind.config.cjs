/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                mynavy: "#143F6B",
                myred: "#F55353",
                mysnow: "#FAF6F6",
                myviolet: "#7678ED",
                
                myorange: "#FEB139",
                myyellow: "#F6F54D",
            },
            keyframes: {
                getOut: {
                    '100%': { opacity: '0' }
                }
            },
            animation: {
                'goSide': 'getOut 1s alternate forwards',
              }
        },
    },
    plugins: [],
};
