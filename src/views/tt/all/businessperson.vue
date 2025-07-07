<template>
  <div class=" mt-32">
    <div ref="heading" class="md:text-3xl text-xl font-bold mb-8 lg:mb-0 text-center md:text-left text-red-700 italic"
      :class="[
        ' transition-all duration-1000 ease-in-out',
        headingVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
      ]">
      <p>ร้านค้าตำบลในฝัน</p>
    </div>

    <div ref="container" class="px-4" :class="[
      visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12',
      'transition-all duration-1000 ease-in-out'
    ]">
      <div class="flex flex-col md:flex-row justify-center items-center">
        <div class="lg:w-2/3 lg:bg-green-700 md:py-10 lg:shadow-lg lg:text-stone-200 md:px-8">
          <p class="indent-8">
            <span class="font-bold indent-0">สถานที่</span> ดำเนินโครงการทั่วประเทศ โดยมีศูนย์กลางที่จังหวัดนำร่อง 10 แห่ง
            การดำเนินโครงการจะครอบคลุมพื้นที่ทั่วประเทศ โดยมุ่งเน้นการพัฒนาและขยายแพลตฟอร์มผ่านศูนย์กลางที่จังหวัดนำร่อง
            10
            แห่ง ซึ่งจะถูกคัดเลือกโดยพิจารณาจากศักยภาพทางเศรษฐกิจ วิถีชีวิตของชุมชน
            และความพร้อมในการนำเทคโนโลยีดิจิทัลมาใช้
            โดยจังหวัดนำร่องที่คาดว่าจะได้รับการคัดเลือก ได้แก่
          </p>
        </div>
        <div class="lg:w-1/3 hidden lg:block">
          <img src="/graphics/store.jpg" class="h-[300px] shadow-lg rounded-xl" />
        </div>
      </div>

      <div class="px-4 mt-4 space-y-2">
        <p>1.เชียงใหม่ - ศูนย์กลางเกษตรอินทรีย์และ OTOP ในภาคเหนือ</p>
        <p>2.ขอนแก่น - จังหวัดที่มีเครือข่ายเกษตรกรและวิสาหกิจชุมชนที่เข้มแข็งในภาคอีสาน</p>
        <p>3.นครราชสีมา- แหล่งเกษตรกรรมขนาดใหญ่ และมีความต้องการแพลตฟอร์มตลาดดิจิทัลสูง </p>
        <p>4.สุรินทร์ - จังหวัดที่มีผลิตภัณฑ์ข้าวหอมมะลิคุณภาพสูงที่ต้องการขยายตลาด</p>
        <p>5.อุดรธานี - ศูนย์กลางเศรษฐกิจของภาคอีสานที่มีศักยภาพด้านการค้าชายแดน</p>
        <p>6.ราชบุรี - ศูนย์กลางการเกษตรและปศุสัตว์ในภาคตะวันตก</p>
        <p>7.นครปฐม - พื้นที่ที่มีการแปรรูปผลิตภัณฑ์ทางการเกษตรมากมาย</p>
        <p>8.ชลบุรี - จังหวัดที่มีอุตสาหกรรมอาหารและการเกษตรสมัยใหม่</p>
        <p>9.นครศรีธรรมราช - จังหวัดที่มีเศรษฐกิจพื้นฐานจากเกษตรกรรมและการแปรรูปสินค้าเกษตร</p>
        <p>10.สงขลา เมืองเศรษฐกิจสำคัญของภาคใต้ที่มีศักยภาพในการขยายตลาดสินค้าเกษตรและ OTOP</p>
      </div>

      <div class="mt-8 text-center">
        <p>
          ศูนย์กลางในแต่ละจังหวัดจะถูกพัฒนาให้เป็นแหล่งกระจายสินค้า การฝึกอบรม
          และจุดให้บริการของแพลตฟอร์มสวัสดิการดิจิทัล โดยจะร่วมมือกับหน่วยงานท้องถิ่น สถาบันการเงิน และเครือข่ายเกษตรกร
        </p>
        <p>
          เพื่อให้การดำเนินงานเป็นไปอย่างมีประสิทธิภาพและสามารถขยายตัวได้อย่างต่อเนื่อง
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const container = ref(null)
const visible = ref(false)

const heading = ref(null)
const headingVisible = ref(false)

let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.target === container.value) {
          visible.value = entry.isIntersecting
        }
        if (entry.target === heading.value) {
          headingVisible.value = entry.isIntersecting
        }
      })
    },
    { threshold: 0.2 }
  )

  if (container.value) observer.observe(container.value)
  if (heading.value) observer.observe(heading.value)
})

onBeforeUnmount(() => {
  if (observer) {
    if (container.value) observer.unobserve(container.value)
    if (heading.value) observer.unobserve(heading.value)
  }
})
</script>
