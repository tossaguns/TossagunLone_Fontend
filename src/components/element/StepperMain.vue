<template>
  <div class="w-full">
    <!-- Header -->
    <div class="mt-6">
      <div class="px-4 flex items-center justify-center mb-6 w-full">
        <template v-for="(step, index) in steps" :key="index">
          <!-- วงกลมตัวเลข -->
          <div class=" md:w-8 md:h-8 w-4 h-4 text-xxs md:text-base flex items-center justify-center rounded-full text-white z-10"
            :class="currentStep >= index ? 'bg-yellow-500' : 'bg-gray-300'">
            {{ index + 1 }}
          </div>
          <!-- เส้นขั้นระหว่าง step (แสดงเฉพาะถ้าไม่ใช่ step สุดท้าย) -->
          <div v-if="index < steps.length - 1" class="h-1  bg-gray-300 mx-1 relative" style="flex: 1 1 0%;">
            <div class="absolute top-0 left-0 h-1 bg-yellow-500" :style="{ width: currentStep > index ? '100%' : '0%' }"
              style="transition: width 0.3s;"></div>
          </div>
        </template>
      </div>
    </div>

    <!-- Step content slot -->
    <div class="px-4">
      <slot :currentStep="currentStep" />
    </div>

    

    <!-- Navigation -->
    <div class="px-4 flex justify-between mt-6 text-base">
      <button class="bg-stone-400 text-white px-4 py-2 rounded disabled:opacity-50" :disabled="currentStep === 0"
        @click="prevStep">
        กลับ
      </button>
      <button v-if="currentStep < steps.length - 1" class="bg-stone-400 text-white px-4 py-2 rounded" @click="nextStep"
        :disabled="!canGoNext">
        ถัดไป
      </button>
      <button v-else class="bg-yellow-400 font-bold px-4 py-2 rounded" @click="submit">
        ยืนยันการจอง
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const props = defineProps(['steps', 'validateStep'])
const emit = defineEmits(['submit'])

const currentStep = ref(0)
const steps = ref(props.steps)

const canGoNext = computed(() => {
  if (props.validateStep) {
    return props.validateStep(currentStep.value);
  }
  return true;
});

const nextStep = () => {
  if (currentStep.value < steps.value.length - 1 && canGoNext.value) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const submit = () => {
  emit('submit')
}
</script>
