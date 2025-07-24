<template>
  <div class="py-2">
    <div class="max-w-7xl mx-auto px-2">
      <div class="flex items-center space-x-2">
        <!-- Search -->
        <div class="flex-1 min-w-0">
          <SearchInput v-model="searchKeyword" placeholder="ค้นหา" @search="onSearch" />
        </div>

        <!-- จำนวนคน -->
        <div class="relative flex-shrink-0">
          <input type="text" readonly class="border py-3 rounded-md px-2 w-32 text-center cursor-pointer"
            :value="guestSummary" placeholder="จำนวนคน" @click="toggleGuestDropdown" />
          <!-- Dropdown -->
          <div v-if="showGuestDropdown" ref="guestDropdownRef"
            class="absolute z-50 bg-white border rounded-lg shadow-lg p-4 mt-1 w-[90vw] max-w-xs sm:w-80 left-1/2 -translate-x-1/2">
            <!-- จำนวนคน -->
            <div class="flex items-center justify-between mb-4">
              <span>จำนวนคน</span>
              <div class="flex items-center space-x-2">
                <button @click="decreaseGuests" class="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
                  :disabled="guests === 0">
                  -
                </button>
                <span>{{ guests }}</span>
                <button @click="increaseGuests" class="px-2 py-1 bg-gray-200 rounded">
                  +
                </button>
              </div>
            </div>

            <!-- พักกับสัตว์เลี้ยง -->
            <div class="flex items-center space-x-2 mb-4">
              <input type="checkbox" id="pets" v-model="withPets" />
              <label for="pets">พักกับสัตว์เลี้ยง</label>
            </div>

            <!-- ปุ่มยืนยัน -->
            <div class="text-right">
              <button @click="confirmGuestSelection" class="bg-blue-500 text-white px-4 py-1 rounded">
                ยืนยัน
              </button>
            </div>
          </div>
        </div>

        <!-- ปฏิทิน -->
        <div class="flex-1 min-w-0">
          <CalendarRangePicker class="w-full" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { onClickOutside } from "@vueuse/core";
import CalendarRangePicker from "@/components/element/CalendarRangePicker.vue";
import SearchInput from "@/components/element/SearchInput.vue";

const searchKeyword = ref("");

const guests = ref(0);
const withPets = ref(false);
const showGuestDropdown = ref(false);
const guestSummary = ref("");

const guestDropdownRef = ref(null);

onClickOutside(guestDropdownRef, () => {
  showGuestDropdown.value = false;
});

const toggleGuestDropdown = () => {
  showGuestDropdown.value = !showGuestDropdown.value;
};

const increaseGuests = () => {
  guests.value++;
};

const decreaseGuests = () => {
  if (guests.value > 0) guests.value--;
};

const confirmGuestSelection = () => {
  const summary = [`${guests.value} คน`];
  if (withPets.value) summary.push("พักกับสัตว์เลี้ยง");
  guestSummary.value = summary.join(", ");
  showGuestDropdown.value = false;
};

const onSearch = (keyword) => {
  console.log("Search keyword:", keyword);
};
</script>

<style scoped>
/* ป้องกัน scroll แนวนอน */
body {
  overflow-x: hidden;
}
</style>
