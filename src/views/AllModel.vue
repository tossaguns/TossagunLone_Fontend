<template>
  <TemplateAdmin>
    <template #header>
      <label>จัดการคำขอสมัครพาร์ทเนอร์</label>
    </template>
    <template #content>
      <div class="p-4 max-w-[3000px] mx-auto">


        <!-- <template>
  <TemplateAdmin>
    <template #header>
      <label>จัดการโรงเเรมในเครือ</label>
    </template>
<template #content>
      <div class="p-4 max-w-[3000px] mx-auto">

      </div>
    </template>
</TemplateAdmin>
</template>

<script setup>
import TemplateAdmin from "@/components/TemplateAdmin.vue";


</script> -->


        <!-- ปฏิทินเลือกวันที่พัก ใน member -->
        <CalendarRangePicker />

        <!-- เลือกวันหยุดสำหรับ partner -->
        <MultiDatePicker />

        <!-- คัสตอมตัวมาร์ เลขโทรศัพท์ เลขบัตรประชาชน -->
        <CustomInputMask v-model="myId" :mask="'999-999999-99999-99'" />
        <CustomInputMask v-model="myId1" :mask="'999-999'" />
        <CustomInputMask v-model="myId2" :mask="'999-99 99-9 99'" />
        <CustomInputMask v-model="myId3" :mask="'999-999999'" />

        <!-- เลือกช่วงวัน ของฟิวเตอร์ -->
        <div class="p-6">
          <DateSearch v-model="selectedDateRange" />
          <p class="mt-4">ช่วงที่เลือก: {{ selectedDateRange }}</p>
        </div>

      </div>
    </template>
  </TemplateAdmin>
</template>

<script setup>
import TemplateAdmin from "@/components/TemplateAdmin.vue";

import CalendarRangePicker from "@/components/element/CalendarRangePicker.vue";
import MultiDatePicker from "@/components/element/MultiDatePicker.vue";
import CustomInputMask from "@/components/element/CustomInputMask.vue"
import DateSearch from '@/components/element/DateSearch.vue';

const myId = ref('');
const myId1 = ref('');
const myId2 = ref('');
const myId3 = ref('');

</script>