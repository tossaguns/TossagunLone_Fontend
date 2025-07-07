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
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}', // ต้องมี!
  ],
  theme: {
    extend: {
      fontSize: {
        'xxs': '0.65rem',
        'xxxs': '0.50rem',  // เพิ่มขนาดเล็กกว่า xs (text-xs = 0.75rem)
      },
    },
  },
  plugins: [],
}

