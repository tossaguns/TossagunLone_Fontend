<template>

  <SectionPage>
    <template #header>
      <div></div>
    </template>

    <template #content>
      <h1 class="text-5xl font-semibold">สร้างใหม่</h1>
      <div class="mb-5 max-w-5xl mx-auto text-[#2c344e]">
        <div class="flex justify-between max-w-5xl mx-auto items-center">
          <div class="md:w-1/2 ">
            <div class="flex flex-col md:flex-row md:justify-between">
              <div class="w-1/2 flex flex-row ">
                <div>
                  <div class="mt-3 space-y-3">
                    <h1 class="text-lg font-semibold">ช่วงวันที่จ่ายเงิน</h1>
                    <h1 class="text-lg font-semibold">วันที่จ่าย</h1>
                  </div>
                </div>
                <div class="w-full pl-4">
                  <div>
                    <DatePicker v-model="date" placeholder="กรุณาเลือกวันที่" />
                  </div>
                </div>
              </div>
              <div class="w-1/2">
                <div class="mt-2 pl-3 text-sm space-y-3">
                  <h1 class="text-lg font-semibold">วิธีการจ่ายเงิน</h1>
                  <h2>ช่องทางการชำระเงิน</h2>
                  <h2>ธนาคาร</h2>
                  <h2>ประเภทบัญชี</h2>
                  <h2>เลขที่บัญชี</h2>
                </div>
              </div>
            </div>
          </div>

          <div class="md:w-1/2">
            <div class="border shadow-md p-5 flex justify-between items-center">
              <div class="text-xl font-semibold flex flex-col justify-center items-center space-y-4">
                <h1>จำนวนพนักงาน</h1>
                <h1>hhh{{ }}</h1>
              </div>
              <div class="text-xl font-semibold flex flex-col justify-center items-center space-y-4">
                <h1>ยอดรวมจ่ายสุทธิ</h1>
                <h1>hhh{{ }}</h1>
              </div>
            </div>
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
import { ref, onMounted, nextTick } from 'vue'

</script>
<style></style>