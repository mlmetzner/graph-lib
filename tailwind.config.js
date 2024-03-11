/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        "fs-sm": "clamp(0.8rem, 0.59vw + 0.65rem, 1.13rem)",
        "fs-base": "clamp(1rem, 0.91vw + 0.77rem, 1.5rem)",
        "fs-md": "clamp(1.25rem, 1.36vw + 0.91rem, 2rem)",
        "fs-lg": "clamp(1.56rem, 2.01vw + 1.06rem, 2.67rem)",
        "fs-xl": "clamp(1.95rem, 2.91vw + 1.23rem, 3.55rem)",
        "fs-xxl": "clamp(2.44rem, 4.17vw + 1.4rem, 4.74rem)",
        "fs-xxxl": "clamp(3.05rem, 5.93vw + 1.57rem, 6.31rem)",
      }
    },
  },
  plugins: [],
}

