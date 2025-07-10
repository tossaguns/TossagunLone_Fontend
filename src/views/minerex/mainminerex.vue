<template>

  <SectionPage>
    <template #header>
      <div></div>
    </template>

    <template #content>
      <div class="mb-5">
        <h1 class="text-3xl font-semibold text-[#2c344e]">จ่ายเงินเดือน-ค่าจ้าง</h1>
        <div class="flex justify-between items-center mt-8 md:text-base text-xs">
          <div>
            <DatePicker v-model="date" placeholder="กรุณาเลือกวันที่" />
          </div>
          <div>
            <button class="text-white bg-[#2c344e] md:py-2 py-3 px-2 rounded-md">สร้างใหม่</button>
          </div>
        </div>
      </div>
      <div class="border rounded-xl p-4">
        <TableSection>
        </TableSection>
      </div>
    </template>
  </SectionPage>

</template>

<script setup>
import SectionPage from "../minerex/SectionPage.vue";
import TableSection from "../minerex/TableSection.vue";
import DatePicker from 'primevue/datepicker';



</script>
<style></style>