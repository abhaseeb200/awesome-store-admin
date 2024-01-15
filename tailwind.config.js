/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#7367f0',
        'primaryDark': '#685dd8',
        'primaryLight': '#eae8fd',
        'dark-100': "#25293c", // For body background color
        'dark-200': "#2f3349",  //For cards background color
        'dark-600': "#424659",  //For on background texts color
        // 'darkLight-100': "#cfd3ec", //For head text color
        // 'darkLight-200': "#9da4c7", //For body text color
      }
    },
  },
  plugins: [],
}