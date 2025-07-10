<template>
  <div class="bg-white shadow-md rounded-lg overflow-hidden">
    <div class="px-6 py-4 border-b border-gray-200" v-if="title">
      <h2 class="text-xl font-semibold text-gray-800">{{ title }}</h2>
    </div>
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th v-for="(column, index) in columns" :key="index"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
              {{ column.label }}
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(row, rowIndex) in paginatedData" :key="rowIndex"
            class="hover:bg-gray-50 transition-colors duration-150">
            <td v-for="(column, colIndex) in columns" :key="colIndex"
              class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <!-- Dynamic slot for custom cell rendering -->
              <slot :name="`cell(${column.key})`" :item="row" :value="row[column.key]" :index="rowIndex" :extra="extra">
                {{ row[column.key] }}
              </slot>
            </td>
          </tr>
          <tr v-if="data.length === 0">
            <td :colspan="columns.length" class="px-6 py-12 text-center text-sm text-gray-500">
              <slot name="no-data">No data available</slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div v-if="data.length > 0" class="px-6 py-3 border-t border-gray-200 flex justify-between items-center">
      <div class="flex items-center">
        <span class="text-sm text-gray-700">
          แสดง {{ startIndex + 1 }} ถึง
          {{ Math.min(endIndex, data.length) }} จาก {{ data.length }} รายการ
        </span>
        <div class="ml-4">
          <select v-model="perPage" class="border rounded px-2 py-1 text-sm">
            <option v-for="option in perPageOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>
      </div>

      <div class="flex space-x-1">
        <button @click="currentPage--" :disabled="currentPage === 1" class="px-3 py-1 rounded border text-sm"
          :class="currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''">
          &lt;
        </button>
        <button v-for="page in visiblePageNumbers" :key="page" @click="currentPage = page"
          class="px-3 py-1 rounded border text-sm" :class="currentPage === page ? 'bg-[#2c344e] text-white' : ''">
          {{ page }}
        </button>
        <button @click="currentPage++" :disabled="currentPage === totalPages" class="px-3 py-1 rounded border text-sm"
          :class="currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
            ">
          &gt;
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

// Static title for the table
const title = "รายชื่อพนักงาน";

// Optional extra data (currently unused but kept for compatibility with slot)
const extra = {};

// Define table columns
const columns = [
  { label: "ชื่อ", key: "name" },
  { label: "อีเมล", key: "email" },
  { label: "ตำแหน่ง", key: "position" },
];

// Sample mock data for the table
const data = ref([
  { name: "สมชาย ใจดี", email: "somchai@example.com", position: "ผู้จัดการ" },
  { name: "สมหญิง แสนสวย", email: "somying@example.com", position: "บัญชี" },
  { name: "จารุวรรณ ตั้งใจ", email: "jaruwan@example.com", position: "ฝ่ายขาย" },
  { name: "อดิศร พัฒนกิจ", email: "adisorn@example.com", position: "เทคนิค" },
  { name: "นฤมล นวลใส", email: "naruemon@example.com", position: "บริการลูกค้า" },
  { name: "ธีรภัทร คิดดี", email: "teerapat@example.com", position: "พัฒนา" },
]);

// Pagination
const currentPage = ref(1);
const perPage = ref(5);
const perPageOptions = [5, 10, 20, 50];

const totalPages = computed(() => Math.ceil(data.value.length / perPage.value));
const startIndex = computed(() => (currentPage.value - 1) * perPage.value);
const endIndex = computed(() => startIndex.value + perPage.value);

const paginatedData = computed(() =>
  data.value.slice(startIndex.value, endIndex.value)
);

const visiblePageNumbers = computed(() => {
  const pages = [];
  for (let i = 1; i <= totalPages.value; i++) {
    pages.push(i);
  }
  return pages;
});
</script>
