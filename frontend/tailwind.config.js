module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFD1DC',
        'primary-foreground': '#5D4037',
        secondary: '#FFFDD0',
        'secondary-foreground': '#5D4037',
        accent: '#FF69B4',
        'accent-foreground': '#FFFFFF',
        background: '#FFF0F5',
        card: '#FFFFFF',
        'text-main': '#5D4037',
        'text-muted': '#8D6E63',
        success: '#98FB98',
        error: '#FFB6C1',
      },
      fontFamily: {
        heading: ['Pinyon Script', 'cursive'],
        body: ['Gaegu', 'sans-serif'],
        accent: ['Fredoka', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'shake': 'shake 0.5s',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-10px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(10px)' },
        },
      },
    },
  },
  plugins: [],
}
