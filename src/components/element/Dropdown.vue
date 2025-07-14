
<template>
  <div class="w-56 relative" @click="toggleDropdown" @keydown.escape="closeDropdown" tabindex="0" ref="dropdownRef">
    <div
      class="flex justify-between items-center border rounded px-3 py-2 cursor-pointer bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
    >
      <span class="truncate">
        {{ selectedCityLabel || t('RoomTypeSelected') }}
      </span>
      <svg
        class="w-5 h-5 text-gray-500 transition-transform duration-200"
        :class="{ 'rotate-180': dropdownOpen }"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>

    <div
      v-if="dropdownOpen"
      class="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded border border-gray-300 bg-white shadow-lg"
    >
      <template v-for="group in groupedCities" :key="group.code">
        <div class="px-3 py-1 bg-gray-100 font-semibold flex items-center gap-2 sticky top-0 z-10 border-b border-gray-300">
          <img
            :alt="group.label"
            :src="`https://flagcdn.com/w20/${group.code.toLowerCase()}.png`"
            class="w-5 h-4 object-cover rounded-sm"
          />
          <span>{{ group.label }}</span>
        </div>
        <ul>
          <li
            v-for="city in group.items"
            :key="city.value"
            @click.stop="selectCity(city)"
            class="px-4 py-2 hover:bg-amber-100 cursor-pointer truncate"
            :class="{ 'bg-amber-200 font-semibold': city.value === selectedCity }"
          >
            {{ city.label }}
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>


<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
// รับ groupedCities เป็น props จากไฟล์แม่
const props = defineProps({
  modelValue: String,
  groupedCities: {
    type: Array,
    required: true,
  }
})

const emit = defineEmits(['update:modelValue'])

const dropdownOpen = ref(false)
const selectedCity = ref(props.modelValue)

watch(() => props.modelValue, val => {
  selectedCity.value = val
})

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value
}

function closeDropdown() {
  dropdownOpen.value = false
}

function selectCity(city) {
  selectedCity.value = city.value
  dropdownOpen.value = false
  emit('update:modelValue', city.value)
}

const selectedCityLabel = computed(() => {
  for (const group of props.groupedCities) {
    const city = group.items.find((c) => c.value === selectedCity.value)
    if (city) return city.label
  }
  return null
})

const dropdownRef = ref(null)

function onClickOutside(event) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    closeDropdown()
  }
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside)
})
</script>
