import { defineStore } from "pinia";
import { ref } from "vue";
import Swal from "sweetalert2";
import router from "../routes";

export const useAuthStore = defineStore("auth", () => {
    const user = ref({
        id: null,
        title: "",
        fullName: "",
        firstname: "",
        lastname: "",
        username: "",
        role: "",
        partnerId: "",
        aboutHotelId: null,
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

    function login(loginResponse) {
        try {
            if (!loginResponse) {
                console.error("Invalid login response:", loginResponse);
                throw new Error("Invalid login response");
            }

            console.log("Auth Store - Login response received:", loginResponse);

            // ตรวจสอบโครงสร้างข้อมูล
            const { token: responseToken, role, user: userData, partner } = loginResponse;
            
            console.log("Auth Store - Destructured data:", { responseToken, role, userData, partner });

            if (!userData) {
                console.error("No user data in login response");
                throw new Error("No user data in login response");
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
            const mappedUser = {
                id: userData._id || null,
                partnerId: userData.partnerId || null,
                title: userData.title || "",
                fullName: userData.fullName || "",
                firstname: userData.firstname || "",
                lastname: userData.lastname || "",
                username: userData.username || "",
                role: role || userData.role || "",
                personalPhone: userData.personalPhone || "",
                personalEmail: userData.personalEmail || "",
                aboutHotelId: userData.aboutHotelId || null,
            };
            
            console.log('Auth Store - Mapped user data:', mappedUser);
            
            user.value = mappedUser;
            
            console.log('Auth Store - User data after assignment:', user.value);

            token.value = responseToken || null;
            localStorage.setItem("token", token.value);
            localStorage.setItem("user", JSON.stringify(user.value));

            isAuthenticated.value = true;

            // ไม่ต้อง route ที่นี่ เพราะ LoginCompany.vue จะจัดการเอง
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
            firstname: "",
            lastname: "",
            username: "",
            role: "",
            partnerId: "",
            aboutHotelId: null,
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
