<template>
  <div class="card p-4 bg-white rounded-md shadow-md">
    <div class="overflow-x-auto">
      <table class="min-w-[50rem] w-full border border-gray-300">
        <thead class="bg-gray-100">
          <tr>
            <th v-for="(col, index) in columns" :key="index" class="p-2 text-left">
              {{ typeof col === 'string' ? col : col.header }}
            </th>
          </tr>
        </thead>
        <tbody v-if="paginatedData.length">
          <tr v-for="(row, rowIndex) in paginatedData" :key="rowIndex" class="border-t">
            <td v-for="(col, colIndex) in columns" :key="colIndex" class="p-2">
              {{ getCellValue(row, col) }}
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td :colspan="columns.length" class="text-center p-4 text-gray-500">
              ไม่มีข้อมูล
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex justify-between items-center mt-4">
      <div class="flex items-center gap-2">
        <label>Rows per page:</label>
        <select v-model.number="rows" class="border rounded p-1">
          <option v-for="option in rowsPerPageOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>

      <div class="flex items-center gap-2">
        <button @click="prevPage" :disabled="currentPage === 1"
          class="px-3 py-1 border rounded bg-gray-100">Prev</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages"
          class="px-3 py-1 border rounded bg-gray-100">Next</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  columns: {
    // string[] หรือ object[] เช่น [{ header: 'ชื่อ', field: 'name' }]
    type: Array,
    required: true
  }
})

const rows = ref(5)
const currentPage = ref(1)
const rowsPerPageOptions = [5, 10, 20, 50]

const totalPages = computed(() => {
  return props.data && props.data.length
    ? Math.ceil(props.data.length / rows.value)
    : 1
})
const paginatedData = computed(() => {
  if (!Array.isArray(props.data)) return []
  const start = (currentPage.value - 1) * rows.value
  return props.data.slice(start, start + rows.value)
})


function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++
}

// ใช้รองรับ nested field เช่น 'country.name'
function getCellValue(row, col) {
  const field = typeof col === 'string' ? col : col.field
  return field.split('.').reduce((acc, key) => acc?.[key], row) ?? '-'
}
</script>
