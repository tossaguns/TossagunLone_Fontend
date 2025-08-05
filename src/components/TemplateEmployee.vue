<template>
  <div class="w-full min-h-screen bg-stone-100">
    <Bar @toggle-sidebar="handleSidebarToggle" />

    <div class="flex-1 md:pl-4 md:pr-2 py-4 md:py-3 mt-14 md:mt-0 transition-all duration-300"
      :class="sidebarMarginClass">
      <div class="md:mt-1 md:ml-2 relative">
        <div class="fixed bg-white overflow-y-auto custom-scrollbar transition-all duration-300 ease-in-out"
          :class="containerClass">

          <div class="text-stone-700">
            <div class="bg-stone-700 h-10 flex items-center pl-8">
              <div class="text-white font-semibold">
                <slot name="header" />
              </div>
            </div>

            <div>
              <slot name="content" />
            </div>
          </div>
        </div>
      </div>
      <CheckInOrderMobile :is-sidebar-collapsed="isSidebarCollapsed" :cart-count="0" />
    </div>
  </div>
</template>

<script setup>
import Bar from "@components/BarEmployee.vue";
import { ref, computed } from "vue";
import { useWindowSize } from "@vueuse/core";
import CheckInOrderMobile from "@/views/Partner/Employee/POS/CheckInOrderMobile.vue";

const { width } = useWindowSize();
const screenIsMobile = computed(() => width.value < 768);

const isSidebarCollapsed = ref(false);

const containerClass = computed(() => {
  if (screenIsMobile.value) {
    // สำหรับหน้าจอเล็ก (< md) ใช้ top-14 และความสูงเต็มหน้าจอ เว้น Bar ไว้
    return "top-14 left-0 right-0 h-[calc(100vh-3.5rem)] rounded-none md:absolute";
  }
  // สำหรับหน้าจอใหญ่ (>= md) ใช้แบบเดิม (fixed + margin ซ้ายขวา + top + height)
  return isSidebarCollapsed.value
    ? "left-[95px] right-2 top-4 h-[calc(100vh-2rem)] rounded-lg"
    : "left-[256px] right-2 top-4 h-[calc(100vh-2rem)] rounded-lg";
});

const sidebarMarginClass = computed(() => {
  return isSidebarCollapsed.value ? "md:ml-[72px]" : "md:ml-[232px]";
});

function handleSidebarToggle(isCollapsed) {
  isSidebarCollapsed.value = isCollapsed;
}
</script>

<style scoped>
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #dfdfdf #f8f8f9;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
  border-radius: 8px;
  background: #f3f4f6;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: hsl(0, 0%, 68%);
  border-radius: 8px;
  transition: background 0.2s;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #d4d4d43d;
}
</style>
