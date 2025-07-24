<template>
  <TemplateEmployee>
    <template #header>
      <label>Check-out</label>
    </template>
    <template #content>
      <div class="p-4 max-w-[3000px] mx-auto text-stone">

      </div>
    </template>
  </TemplateEmployee>
</template>

<script setup>
import TemplateEmployee from "@/components/TemplateEmployee.vue";
import { ref, computed, onMounted } from 'vue';

</script>
