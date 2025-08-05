<template>
  <div class="p-4 bg-white border shadow rounded-md w-full overflow-x-auto">
    <!-- ตารางสำหรับหน้าจอใหญ่ -->
    <div class="min-w-[640px] hidden lg:block">
      <table class="w-full text-sm text-left border border-gray-300 table-auto">
        <thead class="bg-gray-100">
          <tr>
            <th v-for="key in columnKeys" :key="key" class="py-2 px-4 capitalize">
              {{ columnLabels[key] || key }}
            </th>
            <th class="py-2 px-4 w-10"></th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(row, rowIndex) in paginatedCustomers" :key="'row-' + (row.id ?? rowIndex)">
            <tr class="border-t align-top">
              <td v-for="key in columnKeys" :key="key" class="py-2 px-4 align-top border-b border-gray-200"
                @click="key === 'status' ? null : handleExpand(rowIndex)">
                <!-- แสดงค่าอื่นตามปกติ -->
                <template v-if="key === 'status'">
                  <div v-if="props.statusEditable" class="dropdown-container">
                    <select class="status-select" :class="{
                      'bg-yellow-200 font-bold': row.status === 'SleepGunWeb',
                      'bg-white': row.status === 'Walkin'
                    }" :value="pendingStatusMap[row._id] ?? row.status"
                      @change="(e) => onStatusSelect(row, e.target.value)" @click.stop.prevent @mousedown.stop
                      :disabled="!props.statusOptions || props.statusOptions.length === 0">
                      <option v-for="opt in props.statusOptions" :key="opt" :value="opt">
                        {{ opt }}
                      </option>
                    </select>
                  </div>
                  <div v-else class="status-display" :class="{
                    'bg-yellow-200 font-bold px-3 py-1 rounded': row.status === 'SleepGunWeb',
                    'bg-white border px-3 py-1 rounded': row.status === 'Walkin',
                    'bg-gray-200 px-3 py-1 rounded': row.status === 'Available',
                    'bg-red-200 px-3 py-1 rounded': row.status === 'Occupied',
                    'bg-orange-200 px-3 py-1 rounded': row.status === 'Maintenance'
                  }">
                    {{ row.status }}
                  </div>
                </template>
                <template v-else-if="key === 'statusRoom' || key === 'statusRoom'">
                  <div v-if="props.statusRoomEditable" class="dropdown-container">
                    <select class="status-select" :class="{
                      'bg-lime-500 text-white font-bold': row[key] === 'เปิดใช้งาน',
                      'bg-gray-400 text-white font-bold': row[key] === 'ปิดทำการ'
                    }" :value="pendingStatusRoomMap[row._id] ?? row[key]"
                      @change="(e) => onStatusRoomSelect(row, e.target.value)" @click.stop.prevent @mousedown.stop
                      :disabled="!props.statusRoomOptions || props.statusRoomOptions.length === 0">
                      <option v-for="opt in props.statusRoomOptions" :key="opt" :value="opt">
                        {{ opt }}
                      </option>
                    </select>
                  </div>
                  <div v-else class="status-display" :class="{
                    'bg-lime-500 text-white font-bold px-3 py-1 rounded': row[key] === 'เปิดใช้งาน',
                    'bg-gray-400 text-white font-bold px-3 py-1 rounded': row[key] === 'ปิดทำการ'
                  }">
                    {{ row[key] }}
                  </div>
                </template>
                <template v-else-if="key === 'typeRoom'">
                  {{ row.typeRoomName }}
                </template>
                <template v-else-if="key === 'air'">
                  {{ row.air || '-' }}
                </template>
                <template v-else-if="key === 'imgrooms'">
                  <CustomGallery :images="row.imgrooms" />
                </template>
                <template v-else-if="key === 'statusPromotion'">
                  <div v-if="row.status === 'SleepGunWeb' && props.statusPromotionEditable">
                    <select class="status-select" :class="{
                      'bg-lime-100': row.statusPromotion === 'openPromotion'
                    }" :value="pendingStatusPromotionMap[row._id] ?? row.statusPromotion"
                      @change="(e) => onStatusPromotionSelect(row, e.target.value)" @click.stop.prevent @mousedown.stop
                      :disabled="!props.statusPromotionOptions || props.statusPromotionOptions.length === 0">
                      <option v-for="opt in props.statusPromotionOptions" :key="opt" :value="opt">
                        {{ opt }}
                      </option>
                    </select>
                  </div>
                  <div v-else-if="row.status === 'SleepGunWeb' && !props.statusPromotionEditable">
                    <span :class="{
                      'text-lime-500 font-bold': row.statusPromotion === 'openPromotion',
                      'text-stone-400': row.statusPromotion === 'closePromotion'
                    }">{{ row.statusPromotion || '-' }}</span>
                  </div>
                  <div v-else>
                    <span>-</span>
                  </div>
                </template>
                <template v-else>
                  {{ formatValue(row[key], key) }}
                </template>
              </td>
              <td v-if="!props.hideEditDelete" class="py-2 px-4 cursor-pointer border-b border-gray-200"
                @click="handleExpand(rowIndex)" title="ขยาย / ย่อ รายละเอียด">
                <svg :class="{ 'rotate-90': expandedRow === rowIndex }"
                  class="w-5 h-5 transform transition-transform duration-200" fill="none" stroke="currentColor"
                  stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </td>
            </tr>
            <!-- แถวรายละเอียดเหมือนเดิม -->
            <tr>
              <td :colspan="columnKeys.length + 1" class="p-0">
                <transition name="expand" @enter="onEnter" @leave="onLeave">
                  <div v-show="expandedRow === rowIndex" class="overflow-hidden bg-gray-50" ref="detailBox">
                    <div class="p-4 space-y-4 max-h-[570px] overflow-y-auto">
                      <h3 class="text-lg font-bold text-gray-800">รายละเอียดห้องพัก</h3>

                      <div class="bg-white rounded-md shadow-sm py-2">

                        <div
                          class="flex flex-col 2xl:flex-row 2xl:justify-between justify-center 2xl:items-start items-center w-full">
                          <div class="2xl:w-1/2 flex flex-col justify-start items-start p-4">
                            <div class="flex">
                              <div v-if="getFieldByPosition(1)" class="flex flex-col p-3 col-span-1">
                                <div class="flex justify-center items-center space-x-3">
                                  <span class="text-sm text-gray-500">{{ getFieldByPosition(1).label }}</span>
                                  <span class="text-base text-gray-800 font-medium">{{
                                    formatValue(row[getFieldByPosition(1).key], getFieldByPosition(1).key)
                                  }}</span>
                                </div>
                              </div>

                              <div v-if="getFieldByPosition(10)" class="flex flex-col p-3 col-span-1">
                                <div class="flex justify-center items-center space-x-3">
                                  <span class="text-sm text-gray-500">{{ getFieldByPosition(10).label }}</span>
                                  <span class="text-base text-gray-800 font-medium">{{
                                    formatValue(row[getFieldByPosition(10).key], getFieldByPosition(10).key)
                                  }}</span>
                                </div>
                              </div>
                            </div>

                            <div>
                              <div v-if="getFieldByPosition(11)" class="flex flex-col p-3 col-span-1">
                                <div class="flex justify-center items-center space-x-3">
                                  <span class="text-sm text-gray-500">{{ getFieldByPosition(11).label }}</span>
                                  <span class="text-base text-gray-800 font-medium" :class="{
                                    'text-lime-600 font-bold': row.statusPromotion === 'openPromotion',
                                    'text-stone-400': row.statusPromotion === 'closePromotion'
                                  }">
                                    <template v-if="row.status === 'SleepGunWeb'">
                                      {{ row.statusPromotion || '-' }}
                                    </template>
                                    <template v-else>
                                      -
                                    </template>
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div class="flex space-x-5">
                              <div v-if="getFieldByPosition(4)" class="flex flex-col p-3 col-span-1">
                                <div class="flex justify-center items-center space-x-3">
                                  <span class="text-sm text-gray-500">{{ getFieldByPosition(4).label }}</span>
                                  <span class="text-base text-gray-800 font-medium">{{
                                    formatValue(row[getFieldByPosition(4).key], getFieldByPosition(4).key)
                                  }}</span>
                                </div>
                              </div>

                              <div v-if="getFieldByPosition(2)" class="flex flex-col p-3 col-span-1">
                                <div class="flex justify-center items-center space-x-3">
                                  <span class="text-sm text-gray-500">{{ getFieldByPosition(2).label }}</span>
                                  <span class="text-base text-gray-800 font-medium">{{
                                    formatValue(row[getFieldByPosition(2).key], getFieldByPosition(2).key)
                                  }}</span>
                                </div>
                              </div>
                            </div>

                            <div class="flex space-x-5">
                              <div v-if="getFieldByPosition(3)" class="flex flex-col p-3 col-span-1">
                                <div class="flex justify-center items-center space-x-3">
                                  <span class="text-sm text-gray-500">{{ getFieldByPosition(3).label }}</span>
                                  <span class="text-base text-gray-800 font-medium">{{
                                    formatValue(row[getFieldByPosition(3).key], getFieldByPosition(3).key)
                                  }}</span>
                                </div>
                              </div>

                              <div v-if="getFieldByPosition(5)" class="flex flex-col p-3 col-span-1">
                                <div class="flex justify-center items-center space-x-3">
                                  <span class="text-sm text-gray-500">{{ getFieldByPosition(5).label }}</span>
                                  <span class="text-base text-gray-800 font-medium">{{
                                    formatValue(row[getFieldByPosition(5).key], getFieldByPosition(5).key)
                                  }}</span>
                                </div>
                              </div>
                            </div>

                            <div class="flex space-x-5">
                              <div v-if="getFieldByPosition(12)" class="flex flex-col p-3 col-span-1">
                                <div class="flex justify-center items-center space-x-3">
                                  <span class="text-sm text-gray-500">{{ getFieldByPosition(12).label }}</span>
                                  <span class="text-base text-gray-800 font-medium">{{
                                    formatValue(row[getFieldByPosition(12).key], getFieldByPosition(12).key)
                                  }}</span>
                                </div>
                              </div>
                            </div>

                            <div v-if="getFieldByPosition(6)" class="flex flex-col p-3 col-span-1">
                              <div class="flex justify-center items-center space-x-3">
                                <span class="text-sm text-gray-500">{{ getFieldByPosition(6).label }}</span>
                                <span class="text-base text-gray-800 font-medium">{{
                                  formatValue(row[getFieldByPosition(6).key], getFieldByPosition(6).key)
                                }}</span>
                              </div>
                            </div>

                            <div class="border w-full p-4 rounded-md">
                              <div v-if="getFieldByPosition(7)">
                                <div class="flex justify-start items-center space-x-3">
                                  <span class="text-sm text-gray-500">{{ getFieldByPosition(7).label }}</span>
                                  <span class="text-base text-gray-800 font-medium">{{
                                    formatValue(row[getFieldByPosition(7).key], getFieldByPosition(7).key)
                                  }}</span>
                                </div>
                              </div>
                            </div>
                          </div>


                          <!-- รูปที่ได้จาก back ให้เอามาใส่ใน CustomGallery -->
                          <div class="2xl:w-1/2 w-full px-5 pt-3">
                            <div class="w-full p-4 ">
                              <div v-if="getFieldByPosition(8)" class="flex flex-col p-3 col-span-1">
                                <div class="flex justify-center items-center space-x-3">
                                  <span class="text-sm text-gray-500"></span>
                                  <CustomGallery />
                                  <span class="text-base text-gray-800 font-medium">{{
                                    formatValue(row[getFieldByPosition(8).key], getFieldByPosition(8).key)
                                  }}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div v-if="getFieldByPosition(9)" class="flex flex-col p-3 col-span-1 text-gray-400">
                          <div class="flex justify-center items-center space-x-3">
                            <span class="text-xs pl-6">{{ getFieldByPosition(9).label }}</span>
                            <span class="text-xs font-medium">{{
                              formatValue(row[getFieldByPosition(9).key], getFieldByPosition(9).key)
                            }}</span>
                          </div>
                        </div>

                      </div>

                      <div class="py-4 flex space-x-2 justify-center" v-if="!props.hideEditDelete">
                        <button
                          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow transition-shadow duration-200"
                          @click="editRow(row)">
                          แก้ไขข้อมูล
                        </button>
                        <button
                          class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow transition-shadow duration-200"
                          @click="deleteRow(row)">
                          ลบข้อมูล
                        </button>
                      </div>
                    </div>
                  </div>
                </transition>
              </td>
            </tr>
          </template>
        </tbody>
      </table>

      <!-- Pagination -->
      <div class="flex items-center justify-between mt-4">
        <div>
          <label>Rows per page:</label>
          <select v-model="rowsPerPage" class="border rounded p-1 ml-2">
            <option v-for="opt in [5, 10, 20, 50]" :key="opt" :value="opt">{{ opt }}</option>
          </select>
        </div>
        <div class="flex items-center space-x-2">
          <button @click="prevPage" :disabled="currentPage === 1"
            class="px-2 py-1 bg-gray-200 rounded disabled:opacity-50">
            Prev
          </button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages"
            class="px-2 py-1 bg-gray-200 rounded disabled:opacity-50">
            Next
          </button>
        </div>
      </div>
    </div>

    <!-- การ์ดสำหรับหน้าจอเล็ก -->
    <div class="lg:hidden space-y-4">
      <template v-for="(row, rowIndex) in paginatedCustomers" :key="'card-' + (row.id ?? rowIndex)">
        <div class="border border-gray-300 rounded-md p-4 shadow bg-gray-50">
          <h3 class="font-semibold mb-2 text-lg">
            ลูกค้าลำดับที่ {{ rowIndex + 1 + (currentPage - 1) * rowsPerPage }}
          </h3>
          <div class="space-y-2">
            <div v-for="key in columnKeys" :key="key" class="flex justify-between border-b pb-1">
              <div class="text-gray-600 font-semibold">{{ columnLabels[key] || key }}</div>
              <div class="text-gray-800 break-words">
                <template v-if="key === 'status'">
                  <div v-if="props.statusEditable" class="dropdown-container">
                    <select class="status-select" :class="{
                      'bg-yellow-200': row.status === 'SleepGunWeb',
                      'bg-white': row.status === 'Walkin'
                    }" :value="pendingStatusMap[row._id] ?? row.status"
                      @change="(e) => onStatusSelect(row, e.target.value)" @click.stop.prevent @mousedown.stop
                      :disabled="!props.statusOptions || props.statusOptions.length === 0">
                      <option v-for="opt in props.statusOptions" :key="opt" :value="opt">
                        {{ opt }}
                      </option>
                    </select>
                  </div>
                  <div v-else class="status-display" :class="{
                    'bg-yellow-200 font-bold px-3 py-1 rounded': row.status === 'SleepGunWeb',
                    'bg-white border px-3 py-1 rounded': row.status === 'Walkin',
                    'bg-gray-200 px-3 py-1 rounded': row.status === 'Available',
                    'bg-red-200 px-3 py-1 rounded': row.status === 'Occupied',
                    'bg-orange-200 px-3 py-1 rounded': row.status === 'Maintenance'
                  }">
                    {{ row.status }}
                  </div>
                </template>
                <template v-else-if="key === 'statusRoom' || key === 'statusRoom'">
                  <div v-if="props.statusRoomEditable" class="dropdown-container">
                    <select class="status-select" :class="{
                      'bg-lime-500 text-white font-bold': row[key] === 'เปิดใช้งาน',
                      'bg-gray-400 text-white font-bold': row[key] === 'ปิดทำการ'
                    }" :value="pendingStatusRoomMap[row._id] ?? row[key]"
                      @change="(e) => onStatusRoomSelect(row, e.target.value)" @click.stop.prevent @mousedown.stop
                      :disabled="!props.statusRoomOptions || props.statusRoomOptions.length === 0">
                      <option v-for="opt in props.statusRoomOptions" :key="opt" :value="opt">
                        {{ opt }}
                      </option>
                    </select>
                  </div>
                  <div v-else class="status-display" :class="{
                    'bg-lime-500 text-white font-bold px-3 py-1 rounded': row[key] === 'เปิดใช้งาน',
                    'bg-gray-400 text-white font-bold px-3 py-1 rounded': row[key] === 'ปิดทำการ'
                  }">
                    {{ row[key] }}
                  </div>
                </template>
                <template v-else-if="key === 'typeRoom'">
                  {{ row.typeRoomName }}
                </template>
                <template v-else-if="key === 'air'">
                  {{ row.air || '-' }}
                </template>
                <template v-else-if="key === 'imgrooms'">
                  <CustomGallery :images="row.imgrooms" />
                </template>
                <template v-else-if="key === 'statusPromotion'">
                  <div v-if="row.status === 'SleepGunWeb' && props.statusPromotionEditable">
                    <select class="status-select" :class="{
                      'bg-lime-100': row.statusPromotion === 'openPromotion'
                    }" :value="pendingStatusPromotionMap[row._id] ?? row.statusPromotion"
                      @change="(e) => onStatusPromotionSelect(row, e.target.value)" @click.stop.prevent @mousedown.stop
                      :disabled="!props.statusPromotionOptions || props.statusPromotionOptions.length === 0">
                      <option v-for="opt in props.statusPromotionOptions" :key="opt" :value="opt">
                        {{ opt }}
                      </option>
                    </select>
                  </div>
                  <div v-else-if="row.status === 'SleepGunWeb' && !props.statusPromotionEditable">
                    <span :class="{
                      'text-lime-600 font-bold': row.statusPromotion === 'openPromotion',
                      'text-stone-400': row.statusPromotion === 'closePromotion'
                    }">{{ row.statusPromotion || '-' }}</span>
                  </div>
                  <div v-else>
                    <span>-</span>
                  </div>
                </template>
                <template v-else>
                  {{ formatValue(row[key], key) }}
                </template>
              </div>
            </div>
          </div>

          <!-- ปุ่มในการ์ด (mobile) -->
          <div class="pt-4 flex space-x-2">
            <template v-if="!props.hideEditDelete">
              <button
                class=" hover:bg-blue-100 text-blue-600 text-xl font-semibold px-4 py-2 rounded shadow-md flex-1 transition-shadow duration-200"
                @click="editRow(row)">
                แก้ไขข้อมูล
              </button>
              <button
                class=" hover:bg-red-100  text-red-600 text-xl font-semibold px-4 py-2 rounded shadow-md flex-1 transition-shadow duration-200"
                @click="deleteRow(row)">
                ลบข้อมูล
              </button>
            </template>
            <button class="bg-gray-200 text-gray-800 px-3 py-1 rounded"
              @click="expandedCardIndex = expandedCardIndex === rowIndex ? null : rowIndex">
              {{ expandedCardIndex === rowIndex ? 'ซ่อนรายละเอียด' : 'ดูรายละเอียด' }}
            </button>
          </div>

          <div v-if="expandedCardIndex === rowIndex" class="mt-2 p-3 bg-gray-50 rounded max-h-96 overflow-y-auto">
            <div>
              <div v-for="field in fieldLayout" :key="field.key" class="mb-2">
                <span class="text-gray-500">{{ field.label }}:</span>
                <span class="text-gray-800">{{ formatValue(row[field.key], field.key) }}</span>
              </div>
              <!-- แสดงรูปภาพ -->
              <div v-if="row.imgrooms" class="mt-4">
                <CustomGallery :images="row.imgrooms" />
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- Pagination เหมือนกัน -->
      <div class="flex items-center justify-between mt-4 text-xs">
        <div>
          <label class="text-xxs">Rows per page:</label>
          <select v-model="rowsPerPage" class="border rounded p-1 ml-2">
            <option v-for="opt in [5, 10, 20, 50]" :key="opt" :value="opt">{{ opt }}</option>
          </select>
        </div>
        <div class="flex items-center space-x-2">
          <button @click="prevPage" :disabled="currentPage === 1"
            class="px-2 py-1 bg-gray-200 rounded disabled:opacity-50">
            Prev
          </button>
          <span class="text-xxs text-center">Page {{ currentPage }} of {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages"
            class="px-2 py-1 bg-gray-200 rounded disabled:opacity-50">
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, reactive, watch, defineExpose } from 'vue'
import CustomGallery from '@/components/element/Gallery.vue'
import Confirm from '@/components/element/Confirm.vue'

const rowsPerPage = ref(5)
const currentPage = ref(1)
const expandedRow = ref(null)
const isAnimating = ref(false)
const emit = defineEmits(['update-row', 'delete-row', 'update-status', 'confirm-status-change', 'confirm-status-room-change', 'confirm-status-promotion-change'])

const showEditModal = ref(false)
const editForm = reactive({})

const expandedCardIndex = ref(null);
const pendingStatusMap = ref({})
const pendingStatusRoomMap = ref({})
const pendingStatusPromotionMap = ref({})

const props = defineProps({
  customers: {
    type: Array,
    default: () => []
  },
  statusOptions: {
    type: Array,
    default: () => []
  },
  statusRoomOptions: {
    type: Array,
    default: () => []
  },
  statusPromotionOptions: {
    type: Array,
    default: () => []
  },
  visibleColumns: {
    type: Array,
    default: () => []
  },
  fieldLayout: {
    type: Array,
    default: () => []
  },
  hideEditDelete: {
    type: Boolean,
    default: false
  },
  statusPromotionEditable: {
    type: Boolean,
    default: false
  },
  statusEditable: {
    type: Boolean,
    default: true
  },
  statusRoomEditable: {
    type: Boolean,
    default: true
  }
})

// Watch statusOptions เพื่อ debug
watch(() => props.statusOptions, (newVal) => {
  console.log('statusOptions changed:', newVal)
}, { immediate: true })

// Watch customers เพื่อ debug
watch(() => props.customers, (newVal) => {
  console.log('customers changed:', newVal)
}, { immediate: true })

// Sync selectedStatusMap และ selectedStatusRoomMap กับ customers ทุกครั้งที่ customers เปลี่ยน
watch(() => props.customers, (newVal) => {
  // ลบ logic ที่เกี่ยวกับ pendingStatusMap, selectedStatusMap, resetPendingStatus, applyPendingStatus ออกทั้งหมด
}, { immediate: true })

// ฟังก์ชันให้ parent เรียก reset ค่า dropdown กลับเป็นค่าเดิม
function resetStatusSelection(rowId) {
  if (props.customers) {
    const row = props.customers.find(r => r._id === rowId)
    if (row) {
      // ลบ logic ที่เกี่ยวกับ pendingStatusMap, selectedStatusMap, resetPendingStatus, applyPendingStatus ออกทั้งหมด
    }
  }
}
function collapseDetail() {
  expandedRow.value = null;
  expandedCardIndex.value = null;
}
// ลบ logic ที่เกี่ยวกับ pendingStatusMap, selectedStatusMap, resetPendingStatus, applyPendingStatus ออกทั้งหมด

function onStatusSelect(row, newStatus) {
  pendingStatusMap.value[row._id] = newStatus
  emit('confirm-status-change', { row, newStatus })
}
function onStatusRoomSelect(row, newStatusRoom) {
  pendingStatusRoomMap.value[row._id] = newStatusRoom
  emit('confirm-status-room-change', { row, newStatusRoom })
}
function onStatusPromotionSelect(row, newStatusPromotion) {
  pendingStatusPromotionMap.value[row._id] = newStatusPromotion
  emit('confirm-status-promotion-change', { row, newStatusPromotion })
}
function resetPendingStatus(rowId) {
  pendingStatusMap.value[rowId] = undefined
  pendingStatusRoomMap.value[rowId] = undefined
  pendingStatusPromotionMap.value[rowId] = undefined
}
function applyPendingStatus(rowId) {
  pendingStatusMap.value[rowId] = undefined
  pendingStatusRoomMap.value[rowId] = undefined
  pendingStatusPromotionMap.value[rowId] = undefined
}
defineExpose({ resetPendingStatus, applyPendingStatus, collapseDetail })

const paginatedCustomers = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage.value
  return props.customers.slice(start, start + rowsPerPage.value)
})

const totalPages = computed(() => {
  return Math.ceil(props.customers.length / rowsPerPage.value) || 1;
});

const sortedFields = computed(() => {
  return [...props.fieldLayout].sort((a, b) => a.position - b.position)
})

const columnLabels = computed(() =>
  Object.fromEntries(props.fieldLayout.map(f => [f.key, f.label]))
)

const columnKeys = computed(() => props.visibleColumns ?? [])

function formatValue(value, key) {
  if (key === 'roomNumber') {
    console.log('roomNumber value:', value);
  }
  if (key === 'status') {
    console.log('status value:', value);
  }
  if (key === 'roomDetail') {
    console.log('roomDetail value:', value);
  }
  // กรณี typeRoom เป็น object หรือมี name
  if (key === 'typeRoom' && value && typeof value === 'object' && value.name) {
    return value.name;
  }
  if (key === 'typeRoom' && typeof value === 'string') {
    return '-';
  }
  // กรณี typeRoomHotel เป็น array ของ object ให้ return เฉพาะ name join ด้วย ,
  if (key === 'typeRoomHotel' && Array.isArray(value)) {
    return value.map(v => v.name).join(', ');
  }
  // กรณี air
  if (key === 'air') {
    return value || '-';
  }
  return value ?? '';
}

function getFieldByPosition(pos) {
  return props.fieldLayout.find(f => f.position === pos)
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
    expandedRow.value = null
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    expandedRow.value = null
  }
}

async function handleExpand(index) {
  if (isAnimating.value) return

  if (expandedRow.value === index) {
    expandedRow.value = null
  } else {
    if (expandedRow.value !== null) {
      isAnimating.value = true
      expandedRow.value = null
      await nextTick()
      await new Promise(r => setTimeout(r, 300))
      isAnimating.value = false
    }
    expandedRow.value = index
  }
}

function onEnter(el) {
  el.style.maxHeight = '0'
  el.style.transition = 'max-height 300ms ease'
  nextTick(() => {
    el.style.maxHeight = el.scrollHeight + 'px'
  })
}

function onLeave(el) {
  el.style.maxHeight = el.scrollHeight + 'px'
  void el.offsetHeight // force reflow
  el.style.transition = 'max-height 300ms ease'
  el.style.maxHeight = '0'
}

function editRow(row) {
  emit('edit-row', row)
}

function closeEditModal() {
  showEditModal.value = false
}

function submitEditForm() {
  // ส่งข้อมูลกลับไปยังพ่อ (parent) ผ่าน event หรือ callback (ปรับตามที่คุณใช้งาน)
  // ตัวอย่างนี้ใช้ emit event 'update-row'
  emit('update-row', { ...editForm })
  showEditModal.value = false
}

function handleStatusChange(row, newStatus) {
  // ลบ logic ที่เกี่ยวกับ pendingStatusMap, selectedStatusMap, resetPendingStatus, applyPendingStatus ออกทั้งหมด
}

function handleStatusRoomChange(row, newStatusRoom) {
  // ลบ logic ที่เกี่ยวกับ pendingStatusMap, selectedStatusMap, resetPendingStatus, applyPendingStatus ออกทั้งหมด
}

function deleteRow(row) {
  // ส่ง event ลบข้อมูล
  emit('delete-row', row)
}
</script>

<style scoped>
.rotate-90 {
  transform: rotate(90deg);
  transition: transform 0.3s ease;
}

/* Smooth expand animation */
.expand-enter-active,
.expand-leave-active {
  overflow: hidden;
  transition: max-height 300ms ease;
}

/* แก้ไข CSS สำหรับ dropdown */
.dropdown-container {
  position: relative;
  z-index: 50;
  pointer-events: auto;
}

.status-select {
  /* Basic styling */
  width: 100%;
  min-width: 120px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  padding: 8px 32px 8px 8px;
  font-size: 14px;
  line-height: 1.5;
  color: #374151;
  background-color: #ffffff;
  cursor: pointer;
  pointer-events: auto;

  /* Remove default styling */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  /* Custom dropdown arrow */
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 8px center;
  background-repeat: no-repeat;
  background-size: 16px 16px;

  /* Ensure proper layering */
  position: relative;
  z-index: 100;
}

.status-select:hover {
  border-color: #3b82f6;
  background-color: #f8fafc;
}

.status-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  background-color: #ffffff;
}

.status-select:disabled {
  background-color: #f3f4f6;
  color: #9ca3af;
  cursor: not-allowed;
  opacity: 0.6;
}

/* Dropdown options styling */
.status-select option {
  padding: 8px 12px;
  background-color: #ffffff;
  color: #374151;
  border: none;
}

.status-select option:hover {
  background-color: #f3f4f6;
}

.status-select option:disabled {
  color: #9ca3af;
  background-color: #f9fafb;
}

/* Table styling adjustments */
table {
  position: relative;
  border-collapse: separate;
  border-spacing: 0;
}

tbody tr {
  position: relative;
}

tbody tr:hover {
  background-color: #f8fafc;
}

tbody tr td {
  position: relative;
  z-index: 1;
}

/* Override any conflicting styles */
.status-select,
.status-select * {
  pointer-events: auto !important;
}

.status-select option {
  padding: 8px 12px;
  background-color: #ffffff;
  color: #374151;
  border: none;
  pointer-events: auto;
}

/* Table cell ที่มี dropdown ไม่ควรมี click handler */
/* tbody tr td:has(.dropdown-container) {
  z-index: 60;
  pointer-events: none;
} */

tbody tr td:has(.dropdown-container) .dropdown-container {
  pointer-events: auto;
}

tbody tr td:has(.dropdown-container) .status-select {
  pointer-events: auto;
}
</style>