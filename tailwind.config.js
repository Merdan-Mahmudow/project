/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      "backgroundImage":{
        "headerNav": 'url(../assets/images/nav_header.png)'
      }
    },
    fontFamily: {
      'next': 'Next_Art',
      'term': 'Terminator_Gen',
    }
  },
  plugins: [],
}

