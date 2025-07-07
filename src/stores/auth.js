import { defineStore } from "pinia";
import { ref } from "vue";
import Swal from "sweetalert2";
import router from "../routes";

export const useAuthStore = defineStore("auth", () => {
    const user = ref({
        id: null,
        title: "",
        fullName: "",
        username: "",
        role: "",
        partnerId: "",
    });

    const token = ref(localStorage.getItem("token") || null);
    const isAuthenticated = ref(!!token.value);

    const initializeAuth = () => {
        if (typeof window !== "undefined") {
            const savedUser = localStorage.getItem("user");
            const token = localStorage.getItem("token");

            if (savedUser && token) {
                isAuthenticated.value = true;
                user.value = JSON.parse(savedUser);
            }
        }
    };

    function login(userData) {
        try {
            if (!userData) {
                console.error("Invalid login data:", userData);
                throw new Error("Invalid login response");
            }

            // เช็ค status ก็ต่อเมื่อ role === 'partner'
            if (userData.status === "รอยืนยัน" || userData.status === "ไม่ยืนยัน" ) {
                Swal.fire({
                    title: "การเข้าถึงถูกปฏิเสธ",
                    text: 'สถานะของคุณคือ "รอยืนยัน" กรุณารอการยืนยันจากเจ้าหน้าที่',
                    icon: "warning",
                    confirmButtonText: "ตกลง",
                }).then(() => {
                    logout();
                });
                return false;
            }

            // แมปข้อมูล user ให้ตรงกับ response ที่คาดไว้
            user.value = {
                id: userData._id || null,
                partnerId: userData.partnerId || null, // อาจไม่มีใน member
                title: userData.title || "", // เปลี่ยนชื่อฟิลด์ตามจริงถ้ามี
                fullName: userData.fullName || "",
                username: userData.username || "",
                role: userData.role || "",
                personalPhone: userData.personalPhone || "",
                personalEmail: userData.personalEmail || "",
            };

            token.value = userData.token || null;
            localStorage.setItem("token", token.value);
            localStorage.setItem("user", JSON.stringify(userData));

            isAuthenticated.value = true;

            switch (user.value.role) {
                case "partner":
                    router.push("/partner");
                    break;
                case "admin":
                    router.push("/admin");
                    break;
                default:
                    router.push("/e-market");
            }

            return true;
        } catch (error) {
            console.error("Login failed:", error);
            logout();
            return false;
        }
    }

    function logout() {
        // เซ็ต user กลับเป็น object ว่าง ไม่ใช่ null
        user.value = {
            id: null,
            title: "",
            fullName: "",
            username: "",
            role: "",
            partnerId: "",
        };
        token.value = null;
        isAuthenticated.value = false;

        localStorage.clear();
        router.push("/");
    }

    return {
        user,
        token,
        isAuthenticated,
        login,
        logout,
        initializeAuth,
    };
});
