<template>
  <SectionPage>
    <template #header>
      <div></div>
    </template>

    <template #content>
      <div class="mb-5">
        <h1 class="text-3xl font-semibold text-[#2c344e]">รายชื่อพนักงาน</h1>
        <div
          class="flex flex-col lg:flex-row lg:justify-between justify-center items-center mt-8 md:text-base text-xs space-y-3 lg:space-y-0">

          <div class="flex flex-col md:flex-row justify-center items-center gap-6 px-4">

            <div>
              <div class="card flex justify-center">
                <IconField>
                  <InputIcon class="pi pi-search" />
                  <InputText v-model="value1" placeholder="Search" />
                </IconField>
              </div>
            </div>

            <div class="flex justify-center items-center">
              <h2 class="text-center mb-2 md:mb-0 hidden lg:block px-3 text-gray-500">ตำแหน่ง</h2>
              <div class="card flex justify-center">
                <CascadeSelect v-model="selectedCity" :options="countries" optionLabel="cname" optionGroupLabel="name"
                  :optionGroupChildren="['states', 'cities']" class="w-56" placeholder="ตำแหน่ง" />
              </div>
            </div>
          </div>

          <div>
            <button class="text-white bg-[#2c344e] md:py-2 py-3 px-2 rounded-md">กำหนดเงินเดือนพนักงาน</button>
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
import { ref } from "vue";
import SectionPage from "../minerex/SectionPage.vue";
import TableSection from "../minerex/TableSection.vue";
import CascadeSelect from 'primevue/cascadeselect';


import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';


const value1 = ref(null);
</script>
<style></style>