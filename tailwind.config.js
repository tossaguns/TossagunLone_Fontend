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
/** @type {import('tailwindcss').Config} */ export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  important: true, // ให้ tailwind สำคัญกว่า primevue

  theme: {
    extend: {
      fontSize: {
        xxs: "0.65rem",
        xxxs: "0.50rem",
      },
      // ✅ เพิ่มตรงนี้เข้าไป
      animation: {
        shake: "shake 0.4s ease-in-out", // ชื่อ class: animate-shake
      },
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-5px)" },
          "50%": { transform: "translateX(5px)" },
          "75%": { transform: "translateX(-5px)" },
        },
      },
      screens: {
        '3xl': '2000px',
        '4xl': '2500px',  
      },
    },
  },
  plugins: [],
};
