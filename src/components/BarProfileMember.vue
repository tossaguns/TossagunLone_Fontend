<template>
  <div>
    <div class="border-x w-[260px] min-h-screen shadow-md">
      <div>
        <div class="pt-12">
          <div @click="goToMainProfile" class="flex justify-center ">
            <Profile />
          </div>

          <div class="flex flex-col items-start pl-5 mt-8 space-y-3 text-lg font-bold">
            <template v-for="item in menuItems" :key="item.path">
              <router-link :to="item.path" class="hover:text-yellow-400"
                :class="route.path === item.path ? 'text-yellow-400' : ''">
                {{ item.label }}
              </router-link>
            </template>

            <div class="pt-12">
              <button class="hover:text-red-500">LogOut</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Profile from '@components/element/Profile.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const menuItems = [
  { label: 'ข้อมูลส่วนตัว', path: '/dataprofilemember' },
  { label: 'กระเป๋า TOSSAGUN', path: '/paymentmember' },
  { label: 'ประวัติการทำรายการ', path: '/historybyemember' },
  { label: 'ถูกใจ', path: '/collectionmember' },
  { label: 'รีวิว', path: '/reviewmember' },
]

function goToMainProfile() {
  router.push('/')
}

</script>