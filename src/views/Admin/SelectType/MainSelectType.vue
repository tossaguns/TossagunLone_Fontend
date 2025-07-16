<template>
  <TemplateAdmin>
    <template #header>
      <label>จัดการตัวเลือก</label>
    </template>

    <template #content>
      <div class="p-4 max-w-[3000px] mx-auto">
        <!-- Hotel -->
        <div class="mb-5" :ref="setSectionRef('hotel')">
          <div class=" bg-cyan-50 h-[160px] w-full rounded-lg shadow-md cursor-pointer" @click="toggleSection('hotel')">
            <div>
              ประเภททที่พัก
            </div>
          </div>
          <transition name="slide-fade">
            <div v-if="visibleSection === 'hotel'" class="lg:px-12 px-4 border mx-3 lg:py-8 py-4 rounded-b-lg">
              <AddTypeHotel />
            </div>
          </transition>
        </div>

        <!-- Room -->
        <div class="mb-5" :ref="setSectionRef('room')">
          <div class="bg-rose-50 h-[160px] w-full rounded-lg shadow-md cursor-pointer" @click="toggleSection('room')">
            <div>
              ประเภทห้อง
            </div>
          </div>
          <transition name="slide-fade">
            <div v-if="visibleSection === 'room'" class="lg:px-12 px-4 border mx-3 lg:py-8 py-4 rounded-b-lg">
              <AddTypeRoom />
            </div>
          </transition>
        </div>

        <!-- Facility -->
        <div class="mb-5" :ref="setSectionRef('facility')">
          <div class="bg-lime-50 h-[160px] w-full rounded-lg shadow-md cursor-pointer"
            @click="toggleSection('facility')">
            <div>
              สิ่งอำนวยความสะดวกของที่พัก
            </div>
          </div>
          <transition name="slide-fade">
            <div v-if="visibleSection === 'facility'" class="lg:px-12 px-4 border mx-3 lg:py-8 py-4 rounded-b-lg">
              <AddTypeFacilityHotel />
            </div>
          </transition>
        </div>

        <!-- Type Room -->
        <div class="mb-5" :ref="setSectionRef('typeroom')">
          <div class="bg-stone-50 h-[160px] w-full rounded-lg shadow-md cursor-pointer"
            @click="toggleSection('typeroom')">
            <div>
              สิ่งอำนวนความสะดวกภายในห้อง
            </div>
          </div>
          <transition name="slide-fade">
            <div v-if="visibleSection === 'typeroom'" class="lg:px-12 px-4 border mx-3 lg:py-8 py-4 rounded-b-lg">
              <AddTypeRoomHotel />
            </div>
          </transition>
        </div>

        <!-- Hotel For -->
        <div class="mb-5" :ref="setSectionRef('for')">
          <div class="bg-indigo-50 h-[160px] w-full rounded-lg shadow-md cursor-pointer" @click="toggleSection('for')">
            <div>
              ที่พักเหมาะสำหรับ
            </div>
          </div>
          <transition name="slide-fade">
            <div v-if="visibleSection === 'for'" class="lg:px-12 px-4 border mx-3 lg:py-8 py-4 rounded-b-lg">
              <AddTypeHotelFor />
            </div>
          </transition>
        </div>

        <!-- Location -->
        <div class="mb-5" :ref="setSectionRef('ocation')">
          <div class="bg-fuchsia-50 h-[160px] w-full rounded-lg shadow-md cursor-pointer"
            @click="toggleSection('location')">
            <div>
              สถานที่ใกล้เคียง
            </div>
          </div>
          <transition name="slide-fade">
            <div v-if="visibleSection === 'location'" class="lg:px-12 px-4 border mx-3 lg:py-8 py-4 rounded-b-lg">
              <AddTypeHotelLocation />
            </div>
          </transition>
        </div>

        <!-- Food -->
        <div class="mb-5" :ref="setSectionRef('food')">
          <div class="bg-amber-50 h-[160px] w-full rounded-lg shadow-md cursor-pointer" @click="toggleSection('food')">
            <div>
              มื้ออาหาร
            </div>
          </div>
          <transition name="slide-fade">
            <div v-if="visibleSection === 'food'" class="lg:px-12 px-4 border mx-3 lg:py-8 py-4 rounded-b-lg">
              <AddTypeFoodHotel />
            </div>
          </transition>
        </div>

        <!-- Payment -->
        <div class="mb-5" :ref="setSectionRef('payment')">
          <div class="bg-slate-50 h-[160px] w-full rounded-lg shadow-md cursor-pointer"
            @click="toggleSection('payment')">
            <div>
              นโยบายการจ่ายเงิน
            </div>
          </div>
          <transition name="slide-fade">
            <div v-if="visibleSection === 'payment'" class="lg:px-12 px-4 border mx-3 lg:py-8 py-4 rounded-b-lg">
              <AddTypePaymentPolicy />
            </div>
          </transition>
        </div>
      </div>
    </template>
  </TemplateAdmin>
</template>

<script setup>
import { ref, reactive } from 'vue'

import TemplateAdmin from "@/components/TemplateAdmin.vue";
import AddTypeFacilityHotel from "@/views/Admin/SelectType/typeHotel/AddTypeFacilityHotel.vue"
import AddTypeFoodHotel from "@/views/Admin/SelectType/typeHotel/AddTypeFoodHotel.vue"
import AddTypeHotel from "@/views/Admin/SelectType/typeHotel/AddTypeHotel.vue"
import AddTypeHotelFor from "@/views/Admin/SelectType/typeHotel/AddTypeHotelFor.vue"
import AddTypeHotelLocation from "@/views/Admin/SelectType/typeHotel/AddTypeHotelLocation.vue"
import AddTypePaymentPolicy from "@/views/Admin/SelectType/typeHotel/AddTypePaymentPolicy.vue"
import AddTypeRoomHotel from "@/views/Admin/SelectType/typeHotel/AddTypeRoomHotel.vue"
import AddTypeRoom from "@/views/Admin/SelectType/typeHotel/AddTypeRoom.vue"

const activeSection = ref(null)
const visibleSection = ref(null)
const sectionRefs = reactive({})

function setSectionRef(name) {
  return el => {
    if (el) {
      sectionRefs[name] = el
    }
  }
}

function toggleSection(sectionName) {
  if (visibleSection.value === sectionName) {
    visibleSection.value = null
    activeSection.value = null
  } else if (visibleSection.value) {
    visibleSection.value = null
    setTimeout(() => {
      activeSection.value = sectionName
      visibleSection.value = sectionName

      // scroll ไปยังกล่องใหม่แบบ smooth หลัง DOM render
      nextTick(() => {
        const el = sectionRefs.value[sectionName]
        if (el && el.scrollIntoView) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      })
    }, 350)
  } else {
    activeSection.value = sectionName
    visibleSection.value = sectionName

    // scroll ไปทันที
    nextTick(() => {
      const el = sectionRefs.value[sectionName]
      if (el && el.scrollIntoView) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    })
  }
}

</script>

<style>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.35s ease;
  transform-origin: top;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: scaleY(0.95);
}

.slide-fade-enter-to,
.slide-fade-leave-from {
  opacity: 1;
  transform: scaleY(1);
}
</style>
