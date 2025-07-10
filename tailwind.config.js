// module.exports = {
//   content: [
//     "./src/**/*.{vue,js,ts,jsx,tsx}",
//     "./src/components/NavbarMember.vue",
//      "./**/*.vue"
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
//   //jit: true, // เปิดใช้งาน JIT mode
// };
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],

  important: true, //ให้ tailwind สำคัญกว่า primevue

  theme: {
    extend: {
      fontSize: {
        xxs: "0.65rem",
        xxxs: "0.50rem",
      },
    },
  },
  plugins: [],
};
