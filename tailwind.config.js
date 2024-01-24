module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        pressStart: ['var(--font-pressStart)']
      },
      colors: {
        terminalGreen: '#FFFFFF',
        terminalBlack: '#000000',
      },
    },
  },
  // ...
}
