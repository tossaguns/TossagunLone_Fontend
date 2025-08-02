<template>
  <div class="min-h-screen flex flex-col">
    <div class="flex flex-col justify-end items-end lg:text-sm text-xs text-stone-400">
      <div>
        <!-- ออเดอร์ check-in : CI-yyyymm-x  (ตัวอย่าง CI-202508-102) ให้รีเฟส x ทุกเดือน-->
        <label>Order Check-in ID : {{ }}</label>
        <!-- ออเดอร์ทั้งหมดมีกี่อัน -->
        <label>OrderAll : {{ }}</label>
      </div>
      <!-- OrderTIme ให้เเสดงเวลาเเบบเรียลทาม หากกดบันทึกเเล้วค่อยบันทึกตอนเวลาบันทึกจริง -->
      <label>Order Date : {{ }} ,Order Time{{ }}</label>
      <!-- ดึงชื่อมาจาก Login -->
      <label>Order by {{ }}</label>
    </div>

    <div class="my-2">
      <hr class="border" />
    </div>

    <!-- กรอกข้อมูลผู้เข้าพัก -->
    <div class="flex flex-col space-y-3 bg-stone-100 p-4 rounded-md">

      <label class="text-lg font-bold">ข้อมูลผู้เข้าพัก</label>

      <div class="flex space-x-2 items-center">
        <label>ชื่อผู้เข้าพัก</label>
        <input type="text" v-model="nameCustomer" class="border rounded-md p-1" placeholder="กรอกชื่อผู้เข้าพัก" />
      </div>

      <div class="flex space-x-2 items-center">
        <label>เพศ</label>
        <select v-model="genderCustomer" class="border rounded-md p-1">
          <option disabled value="">เลือกเพศ</option>
          <option value="ชาย">ชาย</option>
          <option value="หญิง">หญิง</option>
        </select>
      </div>

      <div class="flex space-x-2 items-center">
        <label>วันเกิด</label>
        <input type="date" v-model="birthDateCustomer" class="border rounded-md p-1" />
      </div>
      <!-- อายุให้เอาวันเกิดมาลบกับวันปัจจุบัน -->
      <div class="flex space-x-2 items-center">
        <label>อายุ</label>
        <input type="number" v-model="ageCustomer" class="border rounded-md p-1" placeholder="กรอกอายุ" />
      </div>

      <div class="flex space-x-2 items-center">
        <label>เบอร์โทรศัพท์</label>
        <input type="text" v-model="phoneCustomer" class="border rounded-md p-1" placeholder="กรอกเบอร์โทรศัพท์" />
      </div>
      <div class="flex space-x-2 items-center">
        <label>จำนวนคนเข้าพัก</label>
        <input type="number" v-model="numberCustomerStay" class="border rounded-md p-1"
          placeholder="กรอกจำนวนคนเข้าพัก" />
      </div>

      <div class="flex space-x-2 items-center">
        <label>email</label>
        <input type="email" v-model="emailCustomer" class="border rounded-md p-1" placeholder="กรอกอีเมล" />
      </div>
    </div>


    <div class="my-2">
      <hr class="border" />
    </div>
    <!-- ข้อมูลรายการห้องที่เลือก -->
    <div>
      <label class="text-lg font-bold px-4">ห้องที่เลือก</label>
      <div class="border rounded-md p-2 mt-2">
        <div class=" flex justify-between items-center lg:text-sm text-xs text-stone-400">
          <!-- รายการที่ ndex+1 -->
          <label>รายการที่ {{ }}</label>
          <div>
            <!-- ดึงวันที่มาจาก เลือกวันที่ datepicker ในไล์ MainPOS -->
            <label>วันที่เข้าพัก : {{ }}</label>
            <!-- คำนวนจากวันที่ -->
            <label>จำนวนวัน : {{ }} วัน</label>
          </div>
        </div>

        <div class="my-2">
          <hr class="border" />
        </div>

        <div>
          <div class="flex justify-between items-center">
            <div class="w-1/2">
              <Tooltip position="top" class="relative">
                <template #trigger>
                  <button
                    class="absolute top-4 left-2 px-4 py-1 rounded-full shadow-lg bg-white z-10 text-lg font-bold ">!</button>
                </template>

                <template #content>
                  <!-- <div class="text-sm font-semibold bg-stone-600 rounded-lg text-white">
                    <div class="p-4">
                      <h3 class="text-lg font-bold pb-3">ห้อง {{ room.roomNumber }}</h3>
                      <h3 class="text-lg font-bold pb-3">ราคา{{ room.roomPrice }}</h3>

                      <div class="flex items-start flex-col mb-4">
                        <span class="font-bold">ประเภท:</span>
                        <span :class="getTypeBadgeClass(room.typeRoom)" class=" px-2 py-1 rounded text-xs font-medium">
                          {{ room.typeRoom?.mainName || room.typeRoom }}
                        </span>
                        <span class="">{{ room.typeRoom?.name || room.typeRoom }}, </span>
                        <span class="">{{ room.air ||
                          'ไม่มีแอร์' }}</span>
                      </div>

                      <div v-if="room.stayPeople" class="flex items-center">
                        <span class="font-medium">จำนวนคน:</span>
                        <span class="ml-2">{{ room.stayPeople }} คน</span>
                      </div>

                      <div v-if="room.roomDetail" class="flex items-center">
                        <span class="font-medium">รายละเอียด:</span>
                        <span class="ml-2 text-xs">{{ room.roomDetail }}</span>
                      </div>

                      ลักษณะห้องพัก 
                      <div v-if="room.typeRoomHotel && room.typeRoomHotel.length > 0" class="flex flex-wrap gap-1">
                        <span v-for="tag in room.typeRoomHotel" :key="tag._id"
                          class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {{ tag.name }}
                        </span>
                      </div>

                      ข้อมูลตึกและชั้น 
                      <div class="text-xs mt-2">
                        <span v-if="room.buildingId">ตึก {{ getBuildingName(room.buildingId) }}</span>
                        <span v-if="room.floor">, ชั้น {{ room.floor }}</span>
                      </div>

                      <div class="my-4">
                        <hr class="border border-gray-200" />
                      </div>

                      <div class="flex items-center space-x-2">
                        <label class="text-xs font-medium ">สถานะห้อง:</label>
                        <div v-if="statusRoomEditable">
                          <select v-model="room.statusRoom"
                            @change="updateRoomStatus(room._id, 'statusRoom', $event.target.value)"
                            class="text-xs border rounded px-2 py-1 flex-1">
                            <option value="ว่าง">ว่าง</option>
                            <option value="ไม่ว่าง">ไม่ว่าง</option>
                            <option value="กำลังทำความสะอาด">กำลังทำความสะอาด</option>
                          </select>
                        </div>
                        <label v-else>{{ room.statusRoom }}</label>
                      </div>

                      สถานะการเข้าพัก 
                      <div class="flex items-center space-x-2">
                        <label class="text-xs font-medium ">สถานะ:</label>
                        <div v-if="statusEditable">
                          <select v-model="room.status"
                            @change="updateRoomStatus(room._id, 'status', $event.target.value)"
                            class="text-xs border rounded px-2 py-1 flex-1"
                            :disabled="room.status !== 'SleepGunWeb' && getSleepGunCount() >= 5">
                            <option value="SleepGunWeb"
                              :disabled="room.status !== 'SleepGunWeb' && getSleepGunCount() >= 5">
                              SleepGunWeb {{ room.status !== 'SleepGunWeb' && getSleepGunCount() >= 5 ?
                              '(โควต้าเต็ม)'
                              :
                              '' }}
                            </option>
                            <option value="Walkin">Walkin</option>
                          </select>
                        </div>
                        <label v-else>{{ room.status }}</label>
                      </div>


                      สถานะโปรโมชั่น (แสดงเฉพาะเมื่อเป็น SleepGunWeb) 
                      <div v-if="room.status === 'SleepGunWeb'" class="rounded">
                        <div class="flex items-center space-x-2 mb-2">
                          <label class="text-xs font-medium ">สถานะโปรโมชั่น:</label>
                          <label>{{ room.statusPromotion }}</label>
                        </div>
                      </div>

                    </div>
                  </div> -->
                </template>
              </Tooltip>

              <div class="mb-4">
                <img src="/imgHotel/sea.jpg" alt="" class="w-full h-28 object-cover rounded-md" />
              </div>
            </div>

            <div class="w-1/2 flex flex-col justify-center items-center">
              <div>
                <label class="font-bold">หมายเลขห้อง {{ }}</label>
              </div>
              <div>
                <!-- ราคาที่รวมทั้งหมดของห้องนี้ -->
                <label class="text-lg font-bold">ราคารวมห้องนี้ {{ }} THB</label>
              </div>

              <div class="mt-4">
                <button class="px-2 py-2 rounded-full shadow-md bg-red-400">
                  <img src="/imgHotel/delete.png" alt="" class="w-6 h-6 rounded-md" />
                </button>
              </div>
            </div>
          </div>


          <div>
            <div class="flex flex-col my-2">
              <label>เข้าพักห้องนี้จำนวนกี่คน</label>
              <input type="number" v-model="numberCustomerStaybyRoom" class="border rounded-md py-1 px-4 w-3/4"
                placeholder="กรอกจำนวนคน" />
            </div>

            <div>
              <label>+ ค่าห้องปกติ ราคา {{ }}</label>
              <div>
                <label>+ ค่ามัดจำ ราคา {{ }}</label>
              </div>

              <div class="flex space-x-2">
                <input class="border rounded-md py-1 px-4" type="checkbox" v-model="isAddBed" />
                <!-- ใส่ราคารวมของเตียงที่ครีเอทที่หลังเตียงเสริม -->
                <label>+ เตียงเสริม ราคารวม{{ }}</label>
              </div>
              <div class="flex space-x-2">
                <input class="border rounded-md py-1 px-4" type="checkbox" v-model="isEarlyCheckIn" />
                <label>+ เข้าพักก่อนเวลา ราคารวม {{ }}</label>
              </div>

              <!-- เเสดงเมื่อกดcheckbox เตียงเสริม -->
              <div v-if="isAddBed" class="border rounded-md p-2 bg-stone-100 mt-2">
                <label class="text-sm font-semibold">ค่าเตียงเสริม {{ }}</label>
                <div>
                  <!-- ดึงราคามาจากไฟล์ aboutHotel.schema.js 
// ประกาศ typeBedPriceSchema
const typeBedPriceSchema = new Schema({
  child: { type: Number, default: 0 },
  normal: { type: Number, default: 0 }
}); typeBedPrice: {
      type: typeBedPriceSchema,
      default: () => ({ child: 0, normal: 0 })
    }, -->
                  <div class="flex space-x-2">
                    <input type="checkbox" v-model="isAddBedChild" />
                    <label>เตียงเด็กราค ราคา {{ }} /คืน</label>
                  </div>
                  <div class="flex space-x-2">
                    <input type="checkbox" v-model="isAddBedNormal" />
                    <label>เตียงธรรมดา ราคา {{ }} /คืน</label>
                  </div>
                </div>
                <!-- กด checkbox เตียงเด็กจะเเสดงช่องกรอกจำนวนเตียงเด็ก -->
                <div v-if="isAddBedChild" class="border rounded-md p-2 bg-stone-50 mt-2 flex flex-col">
                  <label class="text-sm font-semibold">จำนวนเตียงเด็ก :</label>
                  <input type="number" v-model="numberAddBedChild" class="border rounded-md py-1 px-4" />
                  <label>ราคาที่เพิ่มเตียงเด็กรวม : {{ }} บาท</label>
                </div>
                <!-- กด checkbox เตียงธรรมดา จะเเสดงช่องกรอกจำนวนเตียงธรรมดา -->
                <div v-if="isAddBedNormal" class="border rounded-md p-2 bg-stone-50 mt-2 flex flex-col">
                  <label class="text-sm font-semibold">จำนวนเตียงธรรมดา :</label>
                  <input type="number" v-model="numberAddBedNormal" class="border rounded-md py-1 px-4" />
                  <label>ราคาที่เพิ่มเตียงธรรมดารวม : {{ }} บาท</label>
                </div>

                <div class="mt-2 flex justify-end">
                  <label class="text-red-600">ราคาที่เพิ่มเตียงรวม : {{ }} บาท</label>
                </div>
              </div>




              <!-- เเสดงเมื่อกดcheckbox เข้าพักก่อนเวลา -->
              <div v-if="isEarlyCheckIn" class="border rounded-md p-2 bg-stone-100 mt-2">
                <label class="text-sm font-semibold">ค่าเข้าพักก่อนเวลา {{ }}</label>

                <div>
                  <!-- ดึงราคาชั่วโมงมาจาก ไฟล์ aboutHotel.schema.js
  checkInEarlyPricePerHour: { type: Number },
  checkOutEarlyPricePerHour: { type: Number }, -->
                  <label>คิดราคาชั่วโมงละ {{ }} บาท</label>
                  <!-- เเสดงเวลาที่ลบเเล้วเป็น 3.12 นาที -->
                  <label>เข้าก่อนเวลา (เวลาเช็คอิน-เวลาปัจจุบัน) = <span class="font-bold bg-white px-4 rounded-md mx-3">{{ }}</span> นาที</label>
                  <div class="flex justify-end mt-2">
                    <!-- เอาราคาที่บันทึกไว้ checkInEarlyPricePerHour * เวลาที่ลบเเล้วเป็น  -->
                    <label class="text-red-600">ราคาที่เพิ่มเข้าพักก่อนเวลา = {{ }} บาท</label>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-auto">
      <div>
        <div class="border rounded-md p-4 bg-green-600 text-white flex flex-col">
          <label>รวมรายการห้องที่เลือก {{ }} รายการ</label>
          <!-- ราคารวมห้องที่เลือกทั้งหมด -->
          <label class="text-2xl font-bold">ราคารวมทั้งหมด {{ }} บาท</label>

          <div class="flex justify-end mt-4">
            <button class="bg-white text-lg font-bold text-green-600 px-4 py-2 rounded-md">Check-in</button>
          </div>
        </div>
        <div class="flex justify-between items-center">
          <img src="/imgHotel/checkinHotel.jpg" alt="" class="h-[160px] rounded-md p-2" />
          <img src="/imgHotel/checkinHotel1.jpg" alt="" class="h-[160px] rounded-md" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Tooltip from "@/components/element/Tooltip.vue";
import { ref } from "vue";
const isAddBed = ref(false);
const isEarlyCheckIn = ref(false);
const isAddBedChild = ref(false);
const isAddBedNormal = ref(false);
const numberAddBedChild = ref(0);
const numberAddBedNormal = ref(0);
const genderCustomer = ref('')

</script>