<template>
  <TemplateEmployee>
    <template #header>
      <label>Check-in</label>
    </template>
    <template #content>
      <div class="p-4 max-w-[3000px] mx-auto text-stone">
        <div class="mt-10 md:text-sm text-xs">
          <vue-cal
            style="height: 600px"
            :events="events"
            default-view="month"
            :selected-date="new Date()"
            @cell-click="onDateClick"
          />
        </div>
      </div>
    </template>
  </TemplateEmployee>
</template>

<script setup>
import TemplateEmployee from '@/components/TemplateEmployee.vue'
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import { ref, onMounted } from 'vue'

const mockEvents = [
  {
    start: '2025-07-24T10:00:00.000Z',
    end: '2025-07-24T12:00:00.000Z',
    title: 'เช็คอินรอบเช้า',
    content: 'จองห้องพัก 1',
    color: '#fde047', // yellow-300
  },
  {
    start: '2025-07-25T14:00:00.000Z',
    end: '2025-07-25T15:30:00.000Z',
    title: 'เช็คเอาท์รอบบ่าย',
    content: 'ออกห้องพัก 2',
    color: '#fbbf24', // yellow-400
  },
  {
    start: '2025-07-26T09:00:00.000Z',
    end: '2025-07-26T11:00:00.000Z',
    title: 'จองห้องประชุม',
    content: 'จองห้องประชุม 1',
    color: '#86efac', // green-300
  },
  {
    start: '2025-07-27T18:00:00.000Z',
    end: '2025-07-27T20:00:00.000Z',
    title: 'งานเลี้ยงพนักงาน',
    content: 'งานเลี้ยงประจำปี',
    color: '#fca5a5', // red-300
  },
  {
    start: '2025-07-28T08:00:00.000Z',
    end: '2025-07-28T09:30:00.000Z',
    title: 'ตรวจเช็คห้องพัก',
    content: 'ตรวจเช็คห้อง 101',
    color: '#93c5fd', // blue-300
  },
]

const events = ref([])

onMounted(() => {
  // แปลงวันที่ string เป็น Date object
  events.value = mockEvents.map(event => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
  }))
})

function addEvent(startDate) {
  const start = new Date(startDate)
  start.setHours(10, 0)

  const end = new Date(startDate)
  end.setHours(12, 0)

  events.value.push({
    start,
    end,
    title: 'Event ใหม่',
    content: 'สร้างโดยคลิก',

  })
}

function onDateClick({ startDate }) {
  addEvent(startDate)
}
</script>

<style>
.vuecal__cell--today {
  color: #000 !important;
  font-weight: bold;
  border-radius: 6px;
}
</style>
