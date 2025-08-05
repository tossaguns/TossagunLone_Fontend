<template>
  <TemplatePartner>
    <template #header>
      <label>รายได้รวม</label>
    </template>
    <template #content>
      <div class="p-4 max-w-[3000px] mx-auto text-stone">
        <div class="flex flex-col md:flex-row items-center mb-3 gap-3  text-sm md:text-base w-full">
        
          <div class="text-center text-2xl font-bold text-red-500">
            กำลังดำเนินการ...
          </div>
          
        </div>
      </div>
    </template>
  </TemplatePartner>
</template>

<script setup>
import TemplatePartner from "@/components/TemplatePartner.vue";
import { ref, computed, onMounted } from 'vue';
</script>