<template>
  <div>
    <div class="sticky top-0 z-50">
      <Bar />
    </div>
    <div class="min-h-screen">
      <div class="max-w-7xl mx-auto text-stone-600">
        <div>
          <StepperMain :steps="stepTitles" :validateStep="validateStep" @submit="submitForm" v-slot="{ currentStep }"
            class="mb-32">
            <!-- Step 1 -->
            <StepPanel :step="0" :currentStep="currentStep">
              <h2 class="text-xl font-bold mb-4">ตรวจสอบข้อมูลรายละเอียดห้องพัก</h2>
              <!-- <input v-model="form.name" type="text" placeholder="ชื่อ" class="border p-2 w-full mb-4" />
              <input v-model="form.email" type="email" placeholder="อีเมล" class="border p-2 w-full" /> -->

              <div>
                <div class="text-red-500 text-xl">(ต้องการให้คิดราคาหลายๆห้องรวมกันได้) เดี๋ยวค่อยกลับมาทำ
                  ตอนนี้คิดราคาได้ทีละห้องไปก่อน</div>
                <div class="flex flex-col md:flex-row md:justify-between items-center">
                  <div class="md:w-1/2 flex justify-center px-2">
                    <img src="/imgHotel/sea.jpg" class="h-[310px] w-[550px] object-cover rounded-lg" />
                  </div>

                  <div class="md:w-1/2 space-y-3 w-full md:mt-0 mt-3">
                    <div class=" border rounded-lg lg:px-20 px-6 py-4 md:mx-2">
                      <div class="flex justify-between items-center">
                        <div>
                          <label class="text-xl font-bold">ราคารวม</label>
                        </div>
                        <div class="flex flex-col">
                          <label class="text-red-600 line-through">ราคาเดิม{{ }}</label>
                          <label class="text-2xl font-bold">ราคาที่ลดเเล้ว{{ }}</label>
                          <label class="text-xs tetx-stone-400">รวมภาษีเเละค่าธรรมเนียมเเล้ว</label>
                        </div>
                      </div>
                    </div>

                    <div class="border rounded-lg py-4 lg:px-12 px-6 md:mx-2">
                      <div class="space-x-3 text-sm">
                        <label>ประเภทห้องพัก{{ }}</label>
                        <label>* * * * * (มีกี่รีวิว){{ }}{{ }}</label>
                      </div>

                      <div class="my-2">
                        <label class="text-xl font-bold">ชื่อโรงเเรม {{ }}</label>
                      </div>

                      <div class="text-sm flex flex-col pl-4">
                        <label>บ้านเลขที่ : {{ }}</label>
                        <label>ตำบล : {{ }}</label>
                        <label>อำเภอ : {{ }}</label>
                        <label>จังหวัด : {{ }}</label>
                        <label>รหัสไปรษณีย์ : {{ }}</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>




              <div
                class="flex flex-col md:flex-row md:justify-between items-start md:px-2 md:mt-5 mt-3 md:space-x-3 space-y-3 md:space-y-0">
                <div class="md:w-1/2 border rounded-lg px-4 pt-4 pb-11 w-full">
                  <div>
                    <label class="font-bold">สรุปราคาส่วนลดเเละโค้ดโปรโมชั่น</label>

                    <div class="mt-4 flex lg:flex-row flex-col justify-center items-center space-x-3">
                      <label>กรอกโค้ดส่วนลด : </label>
                      <input class="border py-2 px-4 rounded-lg" placeholder="กรอกรหัสส่วนลด" />
                    </div>

                    <div class="mt-4 px-12">
                      <div class="flex justify-between items-center">
                        <label>ราคาเดิม</label>
                        <label>{{ }}2500 บาท</label>
                      </div>
                      <div class="flex justify-between items-center mt-2">
                        <div class="flex flex-col">
                          <label>ส่วนลด</label>
                          <label class="text-stone-400 text-xs pl-3">ที่พักมอบส่วนลดพิเศษ</label>
                        </div>
                        <label class="text-red-600">- {{ }}500 บาท</label>
                      </div>
                      <div class="flex justify-between items-center mt-2">
                        <div class="flex flex-col">
                          <label>ส่วนลลสมาชิก</label>
                          <label class="text-stone-400 text-xs pl-3">เป็นสมาชิกกับ SLEEPGUN</label>
                        </div>
                        <label class="text-red-600">- {{ }}200 บาท</label>
                      </div>
                      <div class="flex justify-between items-center mt-2">
                        <div class="flex flex-col">
                          <label>โค้ดส่วนลดโปรโมชั่น</label>
                        </div>
                        <label class="text-red-600">- {{ }}200 บาท</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="md:w-1/2 border rounded-lg px-4 py-4 w-full">
                  <div>
                    <label class="font-bold">รายละเอียดการจอง</label>
                    <div class="mt-4">
                      <div class="px-4">
                        <div class="space-x-4">
                          <label>เช็คอิน :</label>
                          <label>14.00-22.00{{ }}</label>
                          <label>วันที่ 12 กันยายน 2564{{ }}</label>
                        </div>
                        <div class="space-x-4">
                          <label>เช็คเอ้าท์ :</label>
                          <label>09.00-12.00{{ }}</label>
                          <label>วันที่ 14 กันยายน 2564{{ }}</label>
                        </div>
                      </div>
                    </div>

                    <div class="mt-4">
                      <label class="font-bold">ระยะเวลาเข้าพักทั้งหมด</label>
                      <div class="px-4">
                        <label>2 {{ }} คืน</label>
                      </div>
                    </div>

                    <div class="mt-4">
                      <label class="font-bold">ประเภทห้องพักที่เลือก</label>
                      <div class="px-4">
                        <label>ธรรมดา {{ }}</label>
                      </div>
                    </div>

                    <div class="mt-4">
                      <label class="font-bold">เข้าพักจำนวน</label>
                      <div class="px-4">
                        <label>2 {{ }} คน</label>
                      </div>
                    </div>
                  </div>
                </div>


              </div>



              <div class="flex justify-end mt-12">
                <button class="text-yellow-500 font-bold">อ่านเงื่อนไขเเละข้อกำหนดการจอง</button>
              </div>
              <div>

              </div>
            </StepPanel>

            <!-- Step 2 -->
            <StepPanel :step="1" :currentStep="currentStep">
              <h2 class="text-xl font-bold mb-4">ข้อมูลส่วนตัว</h2>
              <!-- <input v-model="form.address" type="text" placeholder="ที่อยู่" class="border p-2 w-full mb-4" />
              <input v-model="form.postcode" type="text" placeholder="รหัสไปรษณีย์" class="border p-2 w-full" /> -->

              <div class="border rounded-lg py-4 md:px-12 px-4 ">

                <div>
                  <div class="flex items-center mb-8  mt-12">
                    <div class="flex-grow border-t border-gray-300"></div>
                    <span class="mx-4 text-gray-500 font-medium">ข้อมูลส่วนตัว</span>
                    <div class="flex-grow border-t border-gray-300"></div>
                  </div>

                  <div class="md:space-y-3">
                    <div
                      class="flex md:justify-between flex-col md:flex-row w-full md:space-x-3 space-y-3 md:space-y-0">
                      <div class="md:w-1/2">
                        <FloatInput label="ชื่อ" />
                      </div>
                      <div class="md:w-1/2">
                        <FloatInput label="นามสกุล" />
                      </div>
                    </div>

                    <div
                      class="flex justify-between flex-col md:flex-row w-full md:space-x-3 space-y-3 md:space-y-0 mt-3 md:mt-0">
                      <div class="md:w-1/2">
                        <FloatInput label="อีเมล" />
                      </div>
                      <div class="md:w-1/2">
                        <FloatInput label="หมายเลขโทรศัพท์" />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div class="flex items-center mb-8  mt-12">
                    <div class="flex-grow border-t border-gray-300"></div>
                    <span class="mx-4 text-gray-500 font-medium">ข้อมูลที่อยู่</span>
                    <div class="flex-grow border-t border-gray-300"></div>
                  </div>

                  <div class="space-y-3">
                    <div>
                      <FloatInput label="จังหวัด" />
                    </div>
                    <div>
                      <FloatInput label="อำเภอ" />
                    </div>
                    <div>
                      <FloatInput label="ตำบล" />
                    </div>
                    <div>
                      <FloatInput label="รหัสไปรษณีย์" />
                    </div>
                    <div>
                      <FloatInput label="บ้านเลขที่" />
                    </div>
                  </div>
                </div>


                <div>
                  <div class="flex items-center mb-8  mt-12">
                    <div class="flex-grow border-t border-gray-300"></div>
                    <span class="mx-4 text-gray-500 font-medium">ข้อมูลสำหรับการเข้าพัก</span>
                    <div class="flex-grow border-t border-gray-300"></div>
                  </div>

                  <div class="space-y-3">
                    <div>
                      <FloatInput label="ชื่อผู้เข้าพัก" />
                    </div>
                    <div>
                      <FloatInput label="ระบุคำขอ(ถ้ามี)" />
                    </div>
                    <div>
                      <FloatInput label="ระบุเวลาที่คาดว่าจะไปถึง" />
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex justify-end mt-12">
                <button class="text-yellow-500 font-bold">อ่านเงื่อนไขเเละข้อกำหนดการจอง</button>
              </div>
            </StepPanel>

            <!-- Step 3 -->
            <StepPanel :step="2" :currentStep="currentStep">
              <h2 class="text-xl font-bold mb-4">ยืนยันการจอง</h2>
              <div class="border p-4 rounded-lg">
                <label class="font-bold">เลือกวิธีการชำระเงิน</label>
                <div class="my-8 space-y-3">

                  <div class="border rounded-lg py-4 flex md:justify-between items-center md:px-20 px-8">
                    <div class="flex space-x-4">
                      <input type="checkbox" />
                      <label class="text-xl hidden md:block">True Money</label>
                    </div>
                    <div class="pl-12">
                      <img src="/imgHotel/payment/truemoney.png" class="w-40 " />
                    </div>
                  </div>
                  <div class="border rounded-lg py-4 flex md:justify-between items-center md:px-20 px-8">
                    <div class="flex space-x-4">
                      <input type="checkbox" />
                      <label class="text-xl hidden md:block">True Money</label>
                    </div>
                    <div class="pl-12">
                      <img src="/imgHotel/payment/truemoney.png" class="w-40 " />
                    </div>
                  </div>
                  <div class="border rounded-lg py-4 flex md:justify-between items-center md:px-20 px-8">
                    <div class="flex space-x-4">
                      <input type="checkbox" />
                      <label class="text-xl hidden md:block">True Money</label>
                    </div>
                    <div class="pl-12">
                      <img src="/imgHotel/payment/truemoney.png" class="w-40 " />
                    </div>
                  </div>
                  <div class="border rounded-lg py-4 flex md:justify-between items-center md:px-20 px-8">
                    <div class="flex space-x-4">
                      <input type="checkbox" />
                      <label class="text-xl hidden md:block">True Money</label>
                    </div>
                    <div class="pl-12">
                      <img src="/imgHotel/payment/truemoney.png" class="w-40 " />
                    </div>
                  </div>

                </div>
                <div class="text-stone-400 flex justify-end">
                  <label class="md:text-base text-xs">** ชำระเงินทันทีเมื่อการจองสำเร็จ!</label>
                </div>
              </div>

              <div class="mt-4 space-x-2">
                <label>***เมื่อยืนยันการจองสำเร็จถ์อว่าท่านยอมรับ</label>
                <button
                  class="text-yellow-500 hover:text-yellow-400 underline underline-offset-2">เงื่อนไขการจอง</button>
                <button
                  class="text-yellow-500 hover:text-yellow-400 underline underline-offset-2">นโยบายความเป็นส่วนตัว</button>
                <label>เเละ</label>
                <button class="text-yellow-500 hover:text-yellow-400 underline underline-offset-2">ข้อกำหนดการจองของทาง
                  SLEEPGUN</button>
              </div>

              <div class="flex justify-end mt-12">
                <label class="text-stone-500">โปรดตรวจสอบความถูกต้องทั้งหมดก่อนทำการกดยืนยันการจอง</label>
              </div>
            </StepPanel>
          </StepperMain>

        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Bar from "@components/BarMember.vue";
import Footer from "@components/FooterLoneTossagun.vue";
import StepPanel from "@components/element/Stepper.vue";
import StepperMain from "@components/element/StepperMain.vue";
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { reactive } from 'vue'
import axios from 'axios';
import FloatInput from '@/components/element/FloatInput.vue'
const router = useRouter();

const stepTitles = ['ทั่วไป', 'ที่อยู่', 'เพิ่มเติม']

const form = reactive({
  name: '',
  email: '',
  address: '',
  postcode: '',
  note: ''
})

// const validateStep = (step) => {
//   if (step === 0) {
//     return form.name.trim() !== '' && form.email.trim() !== '';
//   }
//   if (step === 1) {
//     return form.address.trim() !== '' && form.postcode.trim() !== '';
//   }
//   return true;
// }

const submitForm = async () => {
  try {
    // ตัวอย่าง: เปลี่ยน URL เป็น endpoint จริงของคุณ
    await axios.post('/api/member', form);
    alert('บันทึกข้อมูลสำเร็จ!');
    // router.push('/success') // หรือ redirect ไปหน้าอื่น
  } catch (e) {
    alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
  }
}
</script>
