/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'chat-dark': '#121212',
        'chat-darker': '#0a0a0a',
        'chat-light': '#2a2a2a',
        'chat-accent': '#6366f1',
        'chat-text': '#e2e2e2',
        'chat-text-secondary': '#a0a0a0',
      }
    },
  },
  plugins: [],
}