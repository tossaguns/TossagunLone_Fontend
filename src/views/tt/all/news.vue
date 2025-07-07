<template>
  <div class="bg-white md:shadow-md md:px-4 py-4 mt-20 md:rounded-lg">
    <!-- ข่าวสาร -->
    <div ref="newsSection" :class="[
      'transition-opacity transition-transform duration-700 ease-out',
      newsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
    ]">
      <div>
        <div class="text-xl md:text-2xl font-bold mt-4">
          <p class="text-red-700 md:text-left text-center">ข่าวสาร</p>
        </div>
        <div class="flex justify-center items-center mt-2">
          <div class="bg-gray-200 rounded-lg w-full">
            <div>
              <img alt="รูป Service" class="bg-gray-100 h-44 object-cover md:rounded-lg w-full" src="/icon1/rice.jpg" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- กิจกรรม -->
    <div ref="activitySection" :class="[
      'transition-opacity transition-transform duration-700 ease-out delay-150',
      activityVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
    ]">
      <div class="text-xl md:text-2xl font-bold mt-4">
        <p class="text-red-700 md:text-left text-center">กิจกรรม</p>
      </div>
      <div class="flex justify-center items-center mt-2">
        <div class="bg-gray-200 rounded-lg w-full">
          <div>
            <img alt="รูป Service" class="bg-gray-100 h-44 object-cover md:rounded-lg w-full" src="/icon1/rice.jpg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const newsSection = ref(null);
const activitySection = ref(null);

const newsVisible = ref(false);
const activityVisible = ref(false);

let observer = null;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === newsSection.value) {
            newsVisible.value = true;
            observer.unobserve(newsSection.value);
          }
          if (entry.target === activitySection.value) {
            activityVisible.value = true;
            observer.unobserve(activitySection.value);
          }
        }
      });
    },
    { threshold: 0.3 }
  );

  if (newsSection.value) observer.observe(newsSection.value);
  if (activitySection.value) observer.observe(activitySection.value);
});

onBeforeUnmount(() => {
  if (observer) {
    if (newsSection.value) observer.unobserve(newsSection.value);
    if (activitySection.value) observer.unobserve(activitySection.value);
  }
});
</script>

<style scoped></style>
