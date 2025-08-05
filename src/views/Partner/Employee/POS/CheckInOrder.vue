<template>
  <div class="h-full flex flex-col">
    <div class=" lg:text-sm text-xs text-stone-400">

      <div class="flex justify-between items-center">
        <div class="flex justify-center items-center pb-4">
          <button @click="resetData">
            <div class="flex items-center rounded-md shadow py-2 px-4">
              <img src="/imgHotel/deletered.png" alt="" class="w-6 h-6">
              <label class="text-red-600 ml-2">รีเซ็ทข้อมุล</label>
            </div>
          </button>
        </div>
        <div class="flex flex-col font-bold justify-end items-end">
          <label>Order Check-in ID : {{ checkInOrderId }}</label>
          <label>OrderAll : {{ orderAll }}</label>
        </div>
      </div>

      <div class="flex justify-start items-start flex-col mt-3">
        <label>Date : {{ orderDate }} ,Time : {{ orderTime }}</label>

        <label>Order by : {{ orderBy || 'ไม่ระบุ' }}</label>
      </div>
    </div>

    <div class="my-2">
      <hr class="border" />
    </div>

    <!-- แสดงข้อมูลการตั้งค่าของโรงแรม -->
    <div v-if="checkInStore.aboutHotelData" class="bg-blue-50 p-3 rounded-md mb-3">
      <h3 class="font-bold text-blue-800 mb-2">การตั้งค่าของโรงแรม</h3>
      <div class="grid grid-cols-2 gap-2 text-sm">
        <div>
          <span class="font-medium">ค่ามัดจำ:</span>
          <span class="text-blue-600">{{ checkInStore.aboutHotelData.cashPledge?.price?.toLocaleString() || 0 }}
            บาท</span>


        </div>
        <div>
          <span class="font-medium">เข้าพักก่อนเวลา:</span>
          <span class="text-blue-600">{{ checkInStore.aboutHotelData.checkInEarlyPricePerHour?.toLocaleString() || 100
          }} บาท/ชั่วโมง</span>
        </div>
        <div>
          <span class="font-medium">เตียงเด็ก:</span>
          <span class="text-blue-600">{{ checkInStore.aboutHotelData.typeBedPrice?.child?.toLocaleString() || 200 }}
            บาท/คืน</span>
        </div>
        <div>
          <span class="font-medium">เตียงธรรมดา:</span>
          <span class="text-blue-600">{{ checkInStore.aboutHotelData.typeBedPrice?.normal?.toLocaleString() || 300 }}
            บาท/คืน</span>
        </div>

        <div>
          <span class="font-medium">เวลาเช็คอิน:</span>
          <span class="text-blue-600">{{ checkInStore.aboutHotelData.checkInForm || "14:00" }} - {{
            checkInStore.aboutHotelData.checkInTo || "ไม่ระบุ" }}</span>
        </div>
        <div>
          <span class="font-medium">เวลาเช็คเอาท์:</span>
          <span class="text-blue-600">{{ checkInStore.aboutHotelData.checkOutForm || "12:00" }} - {{
            checkInStore.aboutHotelData.checkOutTo || "ไม่ระบุ" }}</span>
        </div>
      </div>
    </div>

    <!-- Content Area with Scroll -->
    <div class="flex-1 overflow-y-auto">
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
          <label>email (ถ้ามี)</label>
          <input type="email" v-model="emailCustomer" class="border rounded-md p-1" placeholder="กรอกอีเมล" />
        </div>

        <div class="flex space-x-2 items-center">
          <label>จำนวนคนเข้าพัก</label>
          <div class="flex items-center space-x-1">
            <button @click="decreaseCustomerGuests"
              class="bg-white text-red-500 hover:bg-stone-200 text-xl rounded-md shadow px-2">-</button>
            <input type="number" v-model="numberCustomerStay" class="border rounded-md p-1 w-20 text-center"
              placeholder="1" min="1" />
            <button @click="increaseCustomerGuests"
              class="bg-white text-blue-500 hover:bg-stone-200 text-xl rounded-md shadow px-2">+</button>
          </div>
        </div>

        <!-- แสดงข้อมูลการคำนวณจำนวนคนเข้าพัก -->
        <div class="bg-blue-50 p-3 rounded-md">
          <div class="text-sm">
            <div class="flex justify-between items-center mb-2">
              <span class="font-medium">จำนวนคนที่ลูกค้าต้องการ:</span>
              <span class="font-bold text-blue-600">{{ numberCustomerStay }} คน</span>
            </div>
            <div class="flex justify-between items-center mb-2">
              <span class="font-medium">จำนวนคนที่เข้าพักในห้อง:</span>
              <span class="font-bold text-green-600">{{ totalGuestsInRooms }} คน</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="font-medium">จำนวนคนที่เหลือ:</span>
              <span
                :class="remainingGuests < 0 ? 'text-red-600 font-bold' : remainingGuests === 0 ? 'text-green-600 font-bold' : 'text-orange-600 font-bold'">
                {{ remainingGuests }} คน
              </span>
            </div>
            <!-- แสดงข้อความแจ้งเตือนเฉพาะเมื่อกด Check-in แล้ว -->
            <div v-if="checkInAttempted && remainingGuests < 0"
              class="mt-2 p-2 bg-red-100 border border-red-300 rounded text-red-700 text-xs">
              ⚠️ จำนวนคนที่เข้าพักในห้องเกินกว่าที่ลูกค้าต้องการ
            </div>
            <div v-else-if="checkInAttempted && remainingGuests === 0"
              class="mt-2 p-2 bg-green-100 border border-green-300 rounded text-green-700 text-xs">
              ✅ จำนวนคนเข้าพักครบถ้วนแล้ว
            </div>
            <div v-else-if="checkInAttempted && remainingGuests > 0"
              class="mt-2 p-2 bg-orange-100 border border-orange-300 rounded text-orange-700 text-xs">
              ⚠️ ยังมีจำนวนคนที่เหลือ {{ remainingGuests }} คน
            </div>
          </div>
        </div>
      </div>


      <div class="my-2">
        <hr class="border" />
      </div>
      <!-- ข้อมูลรายการห้องที่เลือก -->
      <div v-if="selectedRooms.length > 0">
        <label class="text-lg font-bold px-4">ห้องที่เลือก ({{ totalRooms }} ห้อง)</label>

        <!-- แสดงรายการห้องที่เลือก -->
        <div v-for="(room, index) in selectedRooms" :key="room._id" class="border rounded-md p-2 mt-3"
          :class="room.status === 'SleepGunWeb' ? 'bg-amber-100' : ''">
          <div class="flex justify-between items-center lg:text-sm text-xs text-green-600 ">
            <label>รายการที่ {{ index + 1 }}</label>
            <div>
              <label>วันที่เข้าพัก : {{ new Date().toLocaleDateString('th-TH') }}</label>
              <label class="ml-2">จำนวนวัน : 1 วัน</label>
            </div>
          </div>

          <div class="my-2">
            <hr class="border" />
          </div>

          <div>
            <div class="flex justify-between items-start">
              <div class="w-1/2">
                <Tooltip position="top" class="relative">
                  <template #trigger>
                    <button
                      class="absolute top-4 left-2 px-3  rounded-full shadow-lg bg-white z-10 text-lg font-bold ">!</button>
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
                  <img :src="room.images?.[0]?.preview || '/imgHotel/sea.jpg'" :alt="`ห้อง ${room.roomNumber}`"
                    class="w-full h-28 object-cover rounded-md" />
                </div>
              </div>

              <div class="w-1/2 flex flex-col justify-end items-end ">
                <div class="flex  mb-6">
                  <button @click="removeRoom(room._id)" class="rounded-full p-2 shadow-md">
                    <img src="/imgHotel/deletered.png" alt="" class="w-6 h-6" />
                  </button>
                </div>

                <div class="flex justify-center items-center flex-col w-full">
                  <div>
                    <label class="font-bold">ห้อง {{ room.roomNumber }}</label>
                  </div>
                  <div>
                    <label class="text-lg font-bold">ราคา {{ room.totalPrice?.toLocaleString() ||
                      room.basePrice?.toLocaleString() }} THB</label>
                  </div>
                  <!-- แสดงจำนวนคนเข้าพักในห้องนี้ -->
                  <div class="mt-2 p-2 bg-blue-100 rounded-md">
                    <label class="text-sm font-medium text-blue-800">เข้าพัก {{ room.numberOfGuests || 1 }} คน</label>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div class="flex flex-col my-2">
                <label>เข้าพักห้องนี้จำนวนกี่คน</label>
                <div class="flex items-center space-x-1">
                  <button @click="decreaseRoomGuests(room._id)"
                    class="bg-white text-red-500 hover:bg-stone-200 text-xl rounded-md shadow px-2 ">-</button>
                  <input type="number" :value="room.numberOfGuests"
                    @change="updateRoomData(room._id, { numberOfGuests: parseInt($event.target.value) || 1 })"
                    class="border rounded-md py-1 px-4 w-20 text-center" :placeholder="room.stayPeople || 1" :min="1"
                    :max="room.stayPeople || 10" />
                  <button @click="increaseRoomGuests(room._id)"
                    class="bg-white text-blue-500 hover:bg-stone-200 text-xl rounded-md shadow px-2">+</button>
                </div>
                <!-- แสดงจำนวนคนสูงสุดที่สามารถเข้าพักได้ -->
                <div class="text-xs text-gray-600 mt-1">
                  <span>สูงสุด {{ room.stayPeople || 'ไม่จำกัด' }} คน</span>
                  <span v-if="room.numberOfGuests > (room.stayPeople || 10)" class="text-red-600 ml-2">
                    ⚠️ เกินจำนวนที่แนะนำ
                  </span>
                </div>
              </div>

              <div class="mt-4">
                <label>+ ค่าห้องปกติ ราคา {{ room.basePrice?.toLocaleString() || 0 }}</label>
                <div>
                  <label>+ ค่ามัดจำ ราคา {{ room.deposit?.toLocaleString() || 0 }}</label>
                </div>

                <div class="flex space-x-2">
                  <input class="border rounded-md py-1 px-4" type="checkbox" :checked="room.isAddBed"
                    @change="updateRoomData(room._id, { isAddBed: $event.target.checked })" />
                  <label class="cursor-pointer">+ เตียงเสริม ราคารวม {{ room.extraBedPrice?.toLocaleString() || 0 }}
                    (คลิกเพื่อดูรายละเอียด)</label>
                </div>
                <!-- แจ้งเตือนเข้าพักก่อนเวลาตามเวลา -->
                <div v-if="isBeforeCheckInTime()" class="border rounded-md p-2 bg-amber-50 border-amber-200 mt-2">
                  <div class="flex items-center space-x-2">
                    <div class="w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center">
                      <span class="text-amber-800 text-xs">!</span>
                    </div>
                    <label class="text-amber-800 font-semibold">แจ้งเตือน: เข้าพักก่อนเวลา</label>
                  </div>
                  <div class="mt-1 text-sm text-amber-700">
                    <p>เวลาปัจจุบัน: {{ checkInStore.getCurrentTime() }}</p>
                    <p>เวลาเช็คอินมาตรฐาน: {{ checkInStore.aboutHotelData?.checkInForm || "14:00" }}</p>
                    <p>เข้าพักก่อนเวลา: {{ checkInStore.calculateEarlyCheckInHours() }} ชั่วโมง</p>
                    <p class="font-bold">ราคาเพิ่ม: {{ (checkInStore.calculateEarlyCheckInHours() *
                      (checkInStore.aboutHotelData?.checkInEarlyPricePerHour || 100))?.toLocaleString() }} บาท</p>
                  </div>
                </div>

                <!-- ส่วนเตียงเสริม -->
                <div v-if="room.isAddBed" class="border rounded-md p-2 bg-stone-100 mt-2">
                  <label class="text-sm font-semibold">ค่าเตียงเสริม</label>
                  <div>
                    <div class="flex space-x-2">
                      <input type="checkbox" :checked="room.isAddBedChild"
                        @change="updateRoomData(room._id, { isAddBedChild: $event.target.checked })" />
                      <label>เตียงเด็กราคา ราคา {{ checkInStore.aboutHotelData?.typeBedPrice?.child || 200 }}
                        /คืน</label>
                    </div>
                    <div class="flex space-x-2">
                      <input type="checkbox" :checked="room.isAddBedNormal"
                        @change="updateRoomData(room._id, { isAddBedNormal: $event.target.checked })" />
                      <label>เตียงธรรมดา ราคา {{ checkInStore.aboutHotelData?.typeBedPrice?.normal || 300 }}
                        /คืน</label>
                    </div>
                  </div>

                  <!-- กด checkbox เตียงเด็กจะแสดงช่องกรอกจำนวนเตียงเด็ก -->
                  <div v-if="room.isAddBedChild" class="border rounded-md p-2 bg-stone-50 mt-2 flex flex-col">
                    <label class="text-sm font-semibold">จำนวนเตียงเด็ก :</label>
                    <div class="flex items-center space-x-1">
                      <button @click="decreaseChildBeds(room._id)"
                        class="bg-white text-red-500 hover:bg-stone-200 text-xl rounded-md shadow px-2">-</button>
                      <input type="number" :value="room.numberAddBedChild"
                        @input="updateRoomData(room._id, { numberAddBedChild: parseInt($event.target.value) || 0 })"
                        class="border rounded-md py-1 px-4 w-20 text-center" min="0" />
                      <button @click="increaseChildBeds(room._id)"
                        class="bg-white text-blue-500 hover:bg-stone-200 text-xl rounded-md shadow px-2">+</button>
                    </div>
                    <label>ราคาที่เพิ่มเตียงเด็กรวม : {{ (room.numberAddBedChild *
                      (checkInStore.aboutHotelData?.typeBedPrice?.child
                        || 200))?.toLocaleString() || 0 }}
                      บาท</label>
                  </div>

                  <!-- กด checkbox เตียงธรรมดา จะแสดงช่องกรอกจำนวนเตียงธรรมดา -->
                  <div v-if="room.isAddBedNormal" class="border rounded-md p-2 bg-stone-50 mt-2 flex flex-col">
                    <label class="text-sm font-semibold">จำนวนเตียงธรรมดา :</label>
                    <div class="flex items-center space-x-1">
                      <button @click="decreaseNormalBeds(room._id)"
                        class="bg-white text-red-500 hover:bg-stone-200 text-xl rounded-md shadow px-2">-</button>
                      <input type="number" :value="room.numberAddBedNormal"
                        @input="updateRoomData(room._id, { numberAddBedNormal: parseInt($event.target.value) || 0 })"
                        class="border rounded-md py-1 px-4 w-20 text-center" min="0" />
                      <button @click="increaseNormalBeds(room._id)"
                        class="bg-white text-blue-500 hover:bg-stone-200 text-xl rounded-md shadow px-2">+</button>
                    </div>
                    <label>ราคาที่เพิ่มเตียงธรรมดารวม : {{ (room.numberAddBedNormal *
                      (checkInStore.aboutHotelData?.typeBedPrice?.normal || 300))?.toLocaleString() || 0 }}
                      บาท</label>
                  </div>

                  <div class="mt-2 flex justify-end">
                    <label class="text-red-600">ราคาที่เพิ่มเตียงรวม : {{ ((room.numberAddBedChild *
                      (checkInStore.aboutHotelData?.typeBedPrice?.child || 200)) +
                      (room.numberAddBedNormal * (checkInStore.aboutHotelData?.typeBedPrice?.normal ||
                        300)))?.toLocaleString() || 0
                    }} บาท</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- แสดงข้อความเมื่อไม่มีห้องที่เลือก -->
      <div v-else class="border rounded-md p-4 mt-2 bg-gray-50 text-center">
        <p class="text-gray-500">ยังไม่มีห้องที่เลือก กรุณากดปุ่ม "Check In" ที่ห้องที่ต้องการ</p>
      </div>
    </div>

    <div class="mt-auto flex-shrink-0">
      <div class="mt-20">

        <div class="border rounded-md p-4 bg-green-600 text-white flex flex-col">
          <label class="text-lg font-bold mb-3">สรุปราคา ({{ totalRooms }} รายการ)</label>

          <!-- รายละเอียดราคา -->
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span>ราคาห้องทั้งหมด:</span>
              <span>{{ totalBasePrice?.toLocaleString() || 0 }} บาท</span>
            </div>

            <div class="flex justify-between">
              <span>ค่ามัดจำรวม:</span>
              <span>{{ totalDeposit?.toLocaleString() || 0 }} บาท</span>
            </div>

            <div class="flex justify-between">
              <span>ค่าเตียงรวม:</span>
              <span>{{ totalExtraBedPrice?.toLocaleString() || 0 }} บาท</span>
            </div>

            <div class="flex justify-between">
              <span>ค่าเข้าพักก่อนเวลารวม:</span>
              <span>{{ totalEarlyCheckInPrice?.toLocaleString() || 0 }} บาท</span>
            </div>

            <hr class="border-white/30 my-2">

            <div class="flex justify-between font-semibold">
              <span>รวมยอด:</span>
              <span>{{ subtotal?.toLocaleString() || 0 }} บาท</span>
            </div>

            <div class="flex justify-between">
              <span>ภาษี 7%:</span>
              <span>{{ tax?.toLocaleString() || 0 }} บาท</span>
            </div>

            <hr class="border-white/30 my-2">

            <div class="flex justify-between text-xl font-bold">
              <span>ราคารวมทั้งหมด:</span>
              <span>{{ grandTotal?.toLocaleString() || 0 }} บาท</span>
            </div>
          </div>

          <div class="flex justify-end mt-4">
            <button @click="handleCheckIn"
              :disabled="selectedRooms.length === 0 || !nameCustomer || !phoneCustomer || checkInStore.isLoading"
              class="bg-white text-lg font-bold text-green-600 px-4 py-2 rounded-md disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed">
              {{ checkInStore.isLoading ? 'กำลังประมวลผล...' : 'Check-in' }}
            </button>
          </div>
        </div>
        <div class="flex justify-center items-center">
          <img src="/imgHotel/checkinHotel.jpg" alt="" class="h-[160px] rounded-md p-2" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Tooltip from "@/components/element/Tooltip.vue";
import { ref, onMounted, onUnmounted, computed, watch } from "vue";
import { useCheckInStore } from '@/stores/checkInStore';
import { useAuthStore } from '@/stores/auth';
import { CheckInOrderService } from '@/service/CheckInOrderService';

// Define emits
const emit = defineEmits(['showPaymentModal']);

// Initialize stores
const checkInStore = useCheckInStore();
const authStore = useAuthStore();

// ข้อมูล Check-in Order (ใช้จาก store)
const checkInOrderId = computed(() => checkInStore.checkInOrderId);
const orderAll = computed(() => checkInStore.orderAll);
const orderDate = computed(() => checkInStore.orderDate);
const orderTime = computed(() => checkInStore.orderTime);
const orderBy = computed(() => checkInStore.orderBy);

// ข้อมูลลูกค้า (ใช้จาก store)
const customerData = computed(() => checkInStore.customerData);
const nameCustomer = computed({
  get: () => customerData.value.name,
  set: (value) => checkInStore.updateCustomerData({ name: value })
});
const genderCustomer = computed({
  get: () => customerData.value.gender,
  set: (value) => checkInStore.updateCustomerData({ gender: value })
});
const birthDateCustomer = computed({
  get: () => customerData.value.birthDate,
  set: (value) => checkInStore.updateCustomerData({ birthDate: value })
});
const ageCustomer = computed(() => customerData.value.age);
const phoneCustomer = computed({
  get: () => customerData.value.phone,
  set: (value) => checkInStore.updateCustomerData({ phone: value })
});
const numberCustomerStay = computed({
  get: () => customerData.value.numberOfGuests,
  set: (value) => checkInStore.updateCustomerData({ numberOfGuests: parseInt(value) || 1 })
});
const emailCustomer = computed({
  get: () => customerData.value.email,
  set: (value) => checkInStore.updateCustomerData({ email: value })
});

// รายการห้องที่เลือก (ใช้จาก store)
const selectedRooms = computed(() => checkInStore.selectedRooms);
const totalRooms = computed(() => checkInStore.totalRooms);
const totalPrice = computed(() => checkInStore.totalPrice);

// คำนวณราคาต่างๆ
const totalBasePrice = computed(() => {
  return selectedRooms.value.reduce((total, room) => {
    return total + (room.basePrice || 0);
  }, 0);
});

const totalDeposit = computed(() => {
  return selectedRooms.value.reduce((total, room) => {
    return total + (room.deposit || 0);
  }, 0);
});

const totalExtraBedPrice = computed(() => {
  return selectedRooms.value.reduce((total, room) => {
    return total + (room.extraBedPrice || 0);
  }, 0);
});

const totalEarlyCheckInPrice = computed(() => {
  return selectedRooms.value.reduce((total, room) => {
    return total + (room.earlyCheckInPrice || 0);
  }, 0);
});

const subtotal = computed(() => {
  return totalBasePrice.value + totalDeposit.value + totalExtraBedPrice.value + totalEarlyCheckInPrice.value;
});

const tax = computed(() => {
  return subtotal.value * 0.07; // ภาษี 7%
});

const grandTotal = computed(() => {
  return subtotal.value + tax.value;
});

// คำนวณจำนวนคนเข้าพัก
const totalGuestsInRooms = computed(() => {
  return selectedRooms.value.reduce((total, room) => {
    return total + (parseInt(room.numberOfGuests) || 1);
  }, 0);
});

const remainingGuests = computed(() => {
  const customerGuests = parseInt(numberCustomerStay.value) || 1;
  return customerGuests - totalGuestsInRooms.value;
});

const isGuestCountValid = computed(() => {
  return remainingGuests.value >= 0;
});

// ตัวแปรสำหรับติดตามการกดปุ่ม Check-in
const checkInAttempted = ref(false);

// ฟังก์ชันลบห้อง
const removeRoom = (roomId) => {
  checkInStore.removeRoom(roomId);
};

// ฟังก์ชันอัปเดตข้อมูลห้อง
const updateRoomData = (roomId, updates) => {
  // ตรวจสอบจำนวนคนเข้าพัก
  if (updates.numberOfGuests !== undefined) {
    const room = selectedRooms.value.find(r => r._id === roomId);
    if (room) {
      const maxGuests = room.stayPeople || 10;
      if (updates.numberOfGuests > maxGuests) {
        alert(`ห้องนี้รองรับได้สูงสุด ${maxGuests} คน`);
        return;
      }
      if (updates.numberOfGuests < 1) {
        alert('จำนวนคนเข้าพักต้องไม่น้อยกว่า 1 คน');
        return;
      }
    }
  }

  checkInStore.updateRoom(roomId, updates);
};

// ฟังก์ชันรีเซ็ทข้อมูล
const resetData = () => {
  if (confirm('คุณต้องการรีเซ็ทข้อมูลทั้งหมดหรือไม่?')) {
    checkInStore.resetData();
    checkInAttempted.value = false; // รีเซ็ตสถานะการกดปุ่ม Check-in
  }
};

// ฟังก์ชันเพิ่ม/ลดจำนวนคนเข้าพักของลูกค้า
const increaseCustomerGuests = () => {
  const currentValue = parseInt(numberCustomerStay.value) || 1;
  numberCustomerStay.value = currentValue + 1;
};

const decreaseCustomerGuests = () => {
  const currentValue = parseInt(numberCustomerStay.value) || 1;
  if (currentValue > 1) {
    numberCustomerStay.value = currentValue - 1;
  }
};

// ฟังก์ชันเพิ่ม/ลดจำนวนคนเข้าพักของห้อง
const increaseRoomGuests = (roomId) => {
  const room = selectedRooms.value.find(r => r._id === roomId);
  if (room) {
    const currentValue = parseInt(room.numberOfGuests) || 1;
    const maxGuests = room.stayPeople || 10; // จำนวนคนสูงสุดที่แนะนำ

    if (currentValue < maxGuests) {
      updateRoomData(roomId, { numberOfGuests: currentValue + 1 });
    } else {
      alert(`ห้องนี้รองรับได้สูงสุด ${maxGuests} คน`);
    }
  }
};

const decreaseRoomGuests = (roomId) => {
  const room = selectedRooms.value.find(r => r._id === roomId);
  if (room) {
    const currentValue = parseInt(room.numberOfGuests) || 1;
    if (currentValue > 1) {
      updateRoomData(roomId, { numberOfGuests: currentValue - 1 });
    }
  }
};

// ฟังก์ชันเพิ่ม/ลดจำนวนเตียงเด็ก
const increaseChildBeds = (roomId) => {
  const room = selectedRooms.value.find(r => r._id === roomId);
  if (room) {
    const currentValue = parseInt(room.numberAddBedChild) || 0;
    updateRoomData(roomId, { numberAddBedChild: currentValue + 1 });
  }
};

const decreaseChildBeds = (roomId) => {
  const room = selectedRooms.value.find(r => r._id === roomId);
  if (room) {
    const currentValue = parseInt(room.numberAddBedChild) || 0;
    if (currentValue > 0) {
      updateRoomData(roomId, { numberAddBedChild: currentValue - 1 });
    }
  }
};

// ฟังก์ชันเพิ่ม/ลดจำนวนเตียงธรรมดา
const increaseNormalBeds = (roomId) => {
  const room = selectedRooms.value.find(r => r._id === roomId);
  if (room) {
    const currentValue = parseInt(room.numberAddBedNormal) || 0;
    updateRoomData(roomId, { numberAddBedNormal: currentValue + 1 });
  }
};

const decreaseNormalBeds = (roomId) => {
  const room = selectedRooms.value.find(r => r._id === roomId);
  if (room) {
    const currentValue = parseInt(room.numberAddBedNormal) || 0;
    if (currentValue > 0) {
      updateRoomData(roomId, { numberAddBedNormal: currentValue - 1 });
    }
  }
};

// ฟังก์ชันตรวจสอบว่าปัจจุบันเป็นเวลาก่อนเวลาเช็คอินหรือไม่
const isBeforeCheckInTime = () => {
  return checkInStore.calculateEarlyCheckInHours() > 0;
};

// ฟังก์ชัน Check-in
const handleCheckIn = async () => {
  try {
    // ตั้งค่าสถานะการกดปุ่ม Check-in
    checkInAttempted.value = true;

    // ตรวจสอบข้อมูลที่จำเป็น
    if (!nameCustomer.value || !phoneCustomer.value) {
      alert('กรุณากรอกข้อมูลลูกค้าให้ครบถ้วน');
      return;
    }

    if (selectedRooms.value.length === 0) {
      alert('กรุณาเลือกห้องอย่างน้อย 1 ห้อง');
      return;
    }

    // ตรวจสอบจำนวนคนเข้าพัก
    if (remainingGuests.value < 0) {
      alert(`จำนวนคนที่เข้าพักในห้องเกินกว่าที่ลูกค้าต้องการ\nลูกค้าต้องการ: ${numberCustomerStay.value} คน\nเข้าพักในห้อง: ${totalGuestsInRooms.value} คน\nเกิน: ${Math.abs(remainingGuests.value)} คน`);
      return;
    }

    if (remainingGuests.value > 0) {
      const confirmMessage = `จำนวนคนที่เข้าพักยังไม่ครบถ้วน\nลูกค้าต้องการ: ${numberCustomerStay.value} คน\nเข้าพักในห้อง: ${totalGuestsInRooms.value} คน\nเหลือ: ${remainingGuests.value} คน\n\nคุณต้องการดำเนินการต่อหรือไม่?`;
      if (!confirm(confirmMessage)) {
        return;
      }
    }

    // ส่งข้อมูลไปยัง MainPOS component เพื่อแสดง popup การชำระเงิน
    const checkInData = {
      customerData: customerData.value,
      selectedRooms: selectedRooms.value,
      totalRooms: totalRooms.value,
      totalBasePrice: totalBasePrice.value,
      totalDeposit: totalDeposit.value,
      totalExtraBedPrice: totalExtraBedPrice.value,
      totalEarlyCheckInPrice: totalEarlyCheckInPrice.value,
      subtotal: subtotal.value,
      tax: tax.value,
      grandTotal: grandTotal.value,
      employeeData: checkInStore.employeeData,
      orderBy: orderBy.value
    };

    // เรียก event เพื่อส่งข้อมูลไปยัง parent component
    emit('showPaymentModal', checkInData);

  } catch (error) {
    console.error('Error during check-in:', error);
    alert(`เกิดข้อผิดพลาดในการ Check-in: ${error.message}`);
  }
};

// ตัวแปรสำหรับ timer
let priceUpdateTimer = null;

// ฟังก์ชันอัปเดตราคาอัตโนมัติตามเวลา
const updatePricesBasedOnTime = () => {
  if (selectedRooms.value.length > 0) {
    selectedRooms.value.forEach(room => {
      checkInStore.updateRoom(room._id, {});
    });
  }
};

// เริ่มต้นเมื่อ component mount
onMounted(async () => {
  // ข้อมูลจะถูกเริ่มต้นจาก store แล้ว
  console.log('CheckInOrder component mounted');
  console.log('Auth Store User:', authStore.user);

  // ตั้งค่าข้อมูลพนักงานจาก auth store
  if (authStore.user && authStore.user.role === 'employee') {
    checkInStore.setEmployeeDataFromAuth(authStore.user);
  }

  // โหลดข้อมูล aboutHotel ถ้ามี partnerId
  if (authStore.user && authStore.user.partnerId) {
    await checkInStore.initializeData(authStore.user.partnerId);
  }

  // เริ่มต้น timer สำหรับอัปเดตราคาตามเวลา (ทุก 1 นาที)
  priceUpdateTimer = setInterval(updatePricesBasedOnTime, 60000);
});

// ทำความสะอาด timer เมื่อ component unmount
onUnmounted(() => {
  if (priceUpdateTimer) {
    clearInterval(priceUpdateTimer);
  }
});
</script>