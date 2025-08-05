<!-- components/StepPanel.vue -->
<template>
  <div v-if="step === currentStep">
    <slot />
  </div>
</template>

<script setup>
defineProps(['step', 'currentStep'])
</script>
