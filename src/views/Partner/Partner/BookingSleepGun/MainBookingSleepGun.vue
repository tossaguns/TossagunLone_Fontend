<template>
  <TemplatePartner>
    <template #header>
      <label>จองกับ SleepGun</label>
    </template>
    <template #content>
      <div class="p-4 max-w-[3000px] mx-auto">
        <div>
          <label class="text-2xl font-bold text-red-500">กำลังดำเนินการ...</label>
          <div>
            
          </div>
        </div>
      </div>
    </template>
  </TemplatePartner>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import TemplatePartner from "@/components/TemplatePartner.vue";
import Swal from 'sweetalert2'

</script>
