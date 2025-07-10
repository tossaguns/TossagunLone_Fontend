<script setup>
import Nav from "../minerex/all/nav.vue";
import AdminNav from "../minerex/all/admin-nav.vue";
import { computed } from "vue";
import ProfileBtn from "../minerex/all/profile-btn.vue";
defineProps({
  class: {
    type: String,
    default: "",
  },
});

const navComponent = computed(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user &&
    ["ผู้บริหาร", "ผู้จัดการ", "หัวหน้าแผนก", "HR"].includes(user.position)
    ? AdminNav
    : Nav;
});
</script>

<template>
  <div :class="['flex h-screen w-full bg-gray-50 text-black', $props.class]">
    <component :is="navComponent" />
    <div class="flex-1 flex flex-col overflow-auto relative">
      <profile-btn class="absolute top-4 right-4 z-10" />
      <!-- Main content -->
      <div class="flex-1 w-full h-full p-4 pt-20 flex flex-col gap-8">
        <!-- Header -->
        <slot name="header">
          <h1 class="text-2xl font-bold">Header</h1>
        </slot>

        <!-- Content -->
        <div class="flex-1 w-full h-fit bg-white rounded-lg shadow p-6">
          <slot name="content">
            <div>content goes here....</div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>
