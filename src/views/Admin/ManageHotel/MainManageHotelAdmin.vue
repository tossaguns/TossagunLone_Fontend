<template>
  <TemplateAdmin>
    <template #header>
      <label>จัดการพาร์ทเนอร์</label>
    </template>

    <template #content>
      <div class="p-4 max-w-[3000px] mx-auto">
        <div class="my-4">
          <label class="text-2xl font-bold">ข้อมูลพาร์ทเนอร์</label>
        </div>

        <div class="my-12 px-4">
          <div class="flex justify-end items-center space-x-3">
            <input class="border rounded-lg py-2 px-4" type="text" placeholder="ค้นหา ..." />
            <button class="bg-blue-500 hover:bg-blue-400 px-3 py-2 rounded-lg text-white">ค้นหา</button>
          </div>
        </div>

        <!-- หัวตาราง -->
        <div class="hidden xl:block">
          <div class="text-sm text-stone-400 px-4 py-4 flex flex-col xl:flex-row justify-center items-center ">
            <div class="w-[50px] text-center">ลำดับ</div>
            <div class="xl:w-1/12 text-center">โลโก้</div>
            <div class="xl:w-2/12 text-center">ชื่อที่พัก</div>
            <div class="xl:w-2/12 text-center">ชื่อบริษัท</div>
            <div class="xl:w-3/12 text-center">จังหวัด</div>
            <div class="xl:w-1/12 text-center">จำนวนห้อง</div>
            <div class="xl:w-1/12 text-center">เข้าพัก</div>
            <div class="xl:w-1/12 text-center">โปรโมชั่น</div>
            <div class="xl:w-1/12 text-center">ดูรายละเอียด</div>
          </div>
        </div>

        <!-- Loop สมาชิก -->
        <div v-for="(partner, index) in partners" :key="partner.id" class="mb-4">
          <!-- แถวหลัก -->
          <div
            class="border rounded-lg px-4 py-4 flex flex-col xl:flex-row justify-center items-center shadow space-y-2 xl:space-y-0">
            <div class="w-[50px] text-center bg-stone-200 rounded-full mb-4 xl:mb-0">
              <label>{{ index + 1 }}</label>
            </div>
            <div class="xl:w-1/12 flex justify-center items-center">
              <img :src="partner.logoCompany" alt="profileMember"
                class="xl:w-8 w-12 xl:h-8 h-12 object-contain rounded-full shadow-lg" />
            </div>

            <div class="xl:w-2/12 text-center hidden xl:block">{{ partner.hotelName }}</div>
            <div class="xl:w-2/12 text-center hidden xl:block">{{ partner.companyName }}</div>
            <div class="xl:w-3/12 text-center hidden xl:block">{{ partner.provinceCompany }}</div>

            <div class="xl:hidden pt-2">
              <div class="xl:w-2/12 text-center font-bold text-lg">{{ partner.hotelName }}</div>
              <div class="xl:w-2/12 text-center text-stone-400">{{ partner.companyName }}</div>
              <div class="xl:w-3/12 text-center text-sm text-stone-400">{{ partner.provinceCompany }}</div>
            </div>


            <div class="xl:w-1/12 text-center hidden xl:block">{{ partner.countRoomSleepGun }}</div>
            <div class="xl:w-1/12 text-center xl:hidden text-sm pt-6">จำนวนห้องพัก : {{ partner.countRoomSleepGun }}
            </div>

            <div class="xl:w-1/12 text-center hidden xl:block">{{ partner.countRoomSleepGun }}</div>
            <div class="xl:w-1/12 text-center xl:hidden text-sm">จำนวนคนที่เข้าพัก : {{ partner.countRoomSleepGun }}
            </div>

            <div class="xl:w-1/12 text-center hidden xl:block">{{ partner.countRoomSleepGun }}</div>
            <div class="xl:w-1/12 text-center xl:hidden text-sm pb-6">จำนวนโปรโมชั่นที่เคยใช้งาน : {{
              partner.countRoomSleepGun }}</div>

            <div class="xl:w-1/12 text-center">
              <button class="mt-2 xl:mt-0 xl:ml-4 bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded-lg"
                @click="toggleDetail(partner.id)">
                {{ selectedPartnerId === partner.id ? 'ซ่อน' : 'ดูรายละเอียด' }}
              </button>
            </div>
          </div>

          <!-- รายละเอียดที่แสดงใต้ row -->
          <!-- v-if="selectedPartnerId === partner.id" -->
          <div v-if="selectedPartnerId === partner.id" class="bg-stone-50 border rounded-b-lg md:mx-4 mx-1 py-8 shadow-inner">
            <div
              class="flex flex-col xl:flex-row justify-between items-center max-w-7xl mx-auto md:bg-white pb-2 pt-5 rounded-md ">
              <div
                class="w-full md:w-8/12 flex flex-col xl:flex-row xl:justify-between justify-center items-center px-4 xl:px-0 ">
                <div class="w-full xl:w-2/5 flex justify-center items-center mb-4 xl:mb-0">
                  <img :src="partner.logoCompany" alt="profileMember"
                    class="w-32 h-32 object-contain rounded-full shadow-lg" />
                </div>

                <div
                  class="xl:w-4/5 flex flex-col lg:flex-row justify-center  w-full lg:px-0 mt-4 xl:mt-0 md:text-base text-sm">
                  <div
                    class="w-full lg:w-1/2 flex flex-col lg:justify-start lg:items-start  justify-center items-center space-y-1 lg:pl-20 xl:pl-0">
                    <div><label class="font-bold">ประเภทที่พัก :</label> <label
                        class="bg-stone-400 px-2  rounded-md text-sm text-white">{{ partner.hotelType || '-' }}</label>
                    </div>
                    <div><label class="font-bold">ชื่อที่พัก :</label> {{ partner.hotelName || '-' }}</div>
                    <div><label class="font-bold">ชื่อบริษัท :</label> {{ partner.companyName || '-' }}</div>
                  </div>

                  <div
                    class="w-full lg:w-1/2 flex flex-col lg:justify-start lg:items-start  justify-center items-center space-y-1 lg:pl-20 xl:pl-0 mt-4 lg:mt-0 text-xs md:text-base text-stone-500 md:text-stone-700">
                    <div>
                      <label class="font-bold">วันที่สมัครสมาชิก : </label>
                      <label>{{ partner.createdAt }}</label>
                    </div>
                    <div>
                      <label class="font-bold">วันที่อนุมัติสมาชิก : </label>
                      <label>{{ partner.approvedAt }}</label>
                    </div>
                    <div>
                      <label class="font-bold">รหัสเข้าใช้งาน : </label>
                      <label>{{ partner.username }}</label>
                    </div>
                  </div>
                </div>
              </div>

              <div class="xl:w-4/12 w-full md:px-6 xl:mt-0 mt-6">
                <iframe class="w-full h-full rounded-t-lg" frameborder="0" style="border:0" loading="lazy"
                  allowfullscreen referrerpolicy="no-referrer-when-downgrade" :src="mapUrl"></iframe>
                <div class="flex justify-center  md:text-sm text-xxs space-x-2">
                  <label>ละติจูด : {{ latitude }}</label>
                  <label>ลองติจูด : {{ longitude }}</label>
                </div>
              </div>
            </div>

            <div class="max-w-7xl mx-auto md:p-4 px-4 mt-4">
              <div
                class="w-full flex flex-col xl:flex-row justify-between items-start md:pl-6 xl:pl-0 space-y-4 xl:space-y-0 text-xs md:text-base">
                <div class="w-full xl:w-1/4 px-2 hidden xl:block">
                  <div><label class="font-bold">ชื่อ - นามสกุล :</label> {{ partner.firstname }} {{ partner.lastname
                  }}
                  </div>
                  <div><label class="font-bold">เพศ :</label> {{ partner.sex || '-' }}</div>
                  <div><label class="font-bold">เบอร์โทร :</label> {{ partner.phone }}</div>
                  <div><label class="font-bold">อีเมล :</label> {{ partner.email }}</div>
                </div>

                <div class="w-full xl:w-1/4 px-2 hidden xl:block">
                  <div>
                    <label class="font-bold">เลขบัตรประชาชน : </label>
                    <label>{{ partner.idCard }}</label>
                  </div>
                  <div>
                    <label class="font-bold">วีซ่า : </label>
                    <label>{{ partner.visa }}</label>
                  </div>
                  <div>
                    <label class="font-bold">เลขประจำตัวผู้เสียภาษี :</label>
                    <label>{{ partner.taxId }}</label>
                  </div>
                  <div>
                    <label class="font-bold">เลขบัญชีธนาคาร : </label>
                    <label>{{ partner.bankAccount }}</label>
                  </div>
                  <div>
                    <label class="font-bold">ชื่อธนาคาร : </label>
                    <label>{{ partner.bankName }}</label>
                  </div>
                </div>

                <div class="w-full xl:w-1/4 px-2 xl:pl-8 hidden xl:block">
                  <div>
                    <label class="font-bold">ที่อยู่บุคคล : </label>
                    <label>{{ partner.address }}</label>
                  </div>
                  <div>
                    <label class="font-bold">ตำบล : </label>
                    <label>{{ partner.subdistrict }}</label>
                  </div>
                  <div>
                    <label class="font-bold">อำเภอ : </label>
                    <label>{{ partner.district }}</label>
                  </div>
                  <div>
                    <label class="font-bold">จังหวัด : </label>
                    <label>{{ partner.province }}</label>
                  </div>
                  <div>
                    <label class="font-bold">รหัสไปรษณีย์ : </label>
                    <label>{{ partner.postcode }}</label>
                  </div>
                </div>

                <div class="w-full xl:w-1/4 px-2 hidden xl:block">
                  <div>
                    <label class="font-bold">ที่อยู่บริษัท : </label>
                    <label>{{ partner.addressCompany }}</label>
                  </div>
                  <div>
                    <label class="font-bold">ตำบล : </label>
                    <label>{{ partner.subdistrictCompany }}</label>
                  </div>
                  <div>
                    <label class="font-bold">อำเภอ : </label>
                    <label>{{ partner.districtCompany }}</label>
                  </div>
                  <div>
                    <label class="font-bold">จังหวัด : </label>
                    <label>{{ partner.provinceCompany }}</label>
                  </div>
                  <div>
                    <label class="font-bold">รหัสไปรษณีย์ : </label>
                    <label>{{ partner.postcodeCompany }}</label>
                  </div>
                </div>
              </div>

              <!-- หน้าจอน้อยกว่า xl -->
              <div
                class="xl:hidden flex flex-col md:flex-row justify-between items-start space-y-4 md:space-y-0  md:text-sm text-xs">
                <div class="w-full md:w-1/2 px-2 md:pl-8">
                  <div><label class="font-bold">ชื่อ - นามสกุล :</label> {{ partner.firstname }} {{ partner.lastname
                  }}
                  </div>
                  <div><label class="font-bold">เพศ :</label> {{ partner.sex || '-' }}</div>
                  <div><label class="font-bold">เบอร์โทร :</label> {{ partner.phone }}</div>
                  <div><label class="font-bold">อีเมล :</label> {{ partner.email }}</div>
                </div>

                <div class="w-full md:w-1/2 px-2">
                  <div>
                    <label class="font-bold">เลขบัตรประชาชน : </label>
                    <label>{{ partner.idCard }}</label>
                  </div>
                  <div>
                    <label class="font-bold">วีซ่า : </label>
                    <label>{{ partner.visa }}</label>
                  </div>
                  <div>
                    <label class="font-bold">เลขประจำตัวผู้เสียภาษี :</label>
                    <label>{{ partner.taxId }}</label>
                  </div>
                  <div>
                    <label class="font-bold">เลขบัญชีธนาคาร : </label>
                    <label>{{ partner.bankAccount }}</label>
                  </div>
                  <div>
                    <label class="font-bold">ชื่อธนาคาร : </label>
                    <label>{{ partner.bankName }}</label>
                  </div>
                </div>
              </div>

              <div
                class="xl:hidden flex flex-col md:flex-row justify-between items-start space-y-4 md:space-y-0 mt-4 md:text-sm text-xs">
                <div class="w-full md:w-1/2 px-2 md:pl-8">
                  <div>
                    <label class="font-bold">ที่อยู่บุคคล : </label>
                    <label>{{ partner.address }}</label>
                  </div>
                  <div>
                    <label class="font-bold">ตำบล : </label>
                    <label>{{ partner.subdistrict }}</label>
                  </div>
                  <div>
                    <label class="font-bold">อำเภอ : </label>
                    <label>{{ partner.district }}</label>
                  </div>
                  <div>
                    <label class="font-bold">จังหวัด : </label>
                    <label>{{ partner.province }}</label>
                  </div>
                  <div>
                    <label class="font-bold">รหัสไปรษณีย์ : </label>
                    <label>{{ partner.postcode }}</label>
                  </div>
                </div>

                <div class="w-full md:w-1/2 px-2">
                  <div>
                    <label class="font-bold">ที่อยู่บริษัท : </label>
                    <label>{{ partner.addressCompany }}</label>
                  </div>
                  <div>
                    <label class="font-bold">ตำบล : </label>
                    <label>{{ partner.subdistrictCompany }}</label>
                  </div>
                  <div>
                    <label class="font-bold">อำเภอ : </label>
                    <label>{{ partner.districtCompany }}</label>
                  </div>
                  <div>
                    <label class="font-bold">จังหวัด : </label>
                    <label>{{ partner.provinceCompany }}</label>
                  </div>
                  <div>
                    <label class="font-bold">รหัสไปรษณีย์ : </label>
                    <label>{{ partner.postcodeCompany }}</label>
                  </div>
                </div>
              </div>


              <div
                class="flex flex-col xl:flex-row justify-center items-center mt-12 xl:space-x-4 text-xs space-y-3 xl:space-y-0">
                <div class="md:flex md:space-x-4">
                  <div>
                    <label>รูปที่พัก </label>
                    <img :src="partner.imageHotel" alt="imgHotel" class="w-52 h-36 object-cover rounded-lg shadow-lg" />
                  </div>
                  <div>
                    <label>รูปบัตรประชาชน </label>
                    <img :src="partner.imageIdCard" alt="imgIdCard"
                      class="w-52 h-36 object-cover rounded-lg shadow-lg" />
                  </div>
                </div>
                <div class="md:flex md:space-x-4">
                  <div>
                    <label>รูปวีซ่า </label>
                    <img :src="partner.imageVisa" alt="imgVisa" class="w-52 h-36 object-cover rounded-lg shadow-lg" />
                  </div>
                  <div>
                    <label>รูปบัตรธนาคาร </label>
                    <img :src="partner.imageBank" alt="imgBank" class="w-52 h-36 object-cover rounded-lg shadow-lg" />
                  </div>
                </div>
                <div>
                  <label>เอกสารประกอบธุรกิจ </label>
                  <img :src="partner.paperBusiness" alt="imgBusiness"
                    class="w-52 h-36 object-cover rounded-lg shadow-lg" />
                </div>
              </div>
            </div>



            <div class="mx-3 2xl:mx-0  mt-12">
              <button
                class="border rounded-lg p-3 max-w-7xl mx-auto bg-stone-200 shadow-inner w-full flex justify-between items-center"
                @click="toggleBookingDetails">
                <label class="md:text-xl text-base font-bold">รายละเอียดการจองกับ SleepGun</label>
                <span>
                  <svg v-if="isBookingDetailsOpen" xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-gray-700 transition-transform duration-300" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-gray-700 transition-transform duration-300" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
            </div>

            <!-- รายละเอียดการจองกับ SleepGun -->
            <div v-if="isBookingDetailsOpen"
              class="max-w-7xl mx-auto px-3 2xl:px-0 text-xs md:text-sm lg:text-base mb-3">
              <div class=" bg-white rounded-b-lg p-4 mx-2">
                <label class="text-xl font-bold">รายละเอียดการจองกับ SleepGun</label>
                <div
                  class="flex flex-col xl:flex-row justify-center items-center mt-6 xl:space-x-4 lg:text-sm text-xs border rounded-lg p-4">
                  <div class="flex items-center space-x-2">
                    <img src="/imgHotel/checkin.png" alt="check-in" class="w-6 h-6 object-cover"></img>
                    <div>
                      <label>เวลา Check-in :</label>
                      <label>{{ partner.checkInTimeStart }} - {{ partner.checkInTimeEnd }} น.</label>
                    </div>
                  </div>

                  <div class="flex items-center space-x-2 mt-4 xl:mt-0">
                    <img src="/imgHotel/checkout.png" alt="check-out" class="w-6 h-6 object-cover"></img>
                    <div>
                      <label>เวลา Check-out :</label>
                      <label>{{ partner.checkOutTimeStart }} - {{ partner.checkOutTimeEnd }} น.</label>
                    </div>
                  </div>
                </div>

                <div
                  class="flex flex-col xl:flex-row justify-center xl:items-start items-center mt-12 xl:space-x-4 lg:text-base text-xs xl:space-y-0 space-y-2">
                  <div class="flex items-center space-x-2">
                    <label class="font-bold">เตียงเสริม : </label>
                    <label :class="partner.hascountBedExtra === 'มี' ? 'bg-green-500' : 'bg-red-500'"
                      class="px-4 md:py-1 rounded-md md:text-sm text-xs text-white">
                      <div>{{ partner.hascountBedExtra }}</div>
                    </label>
                  </div>
                  <div class="pl-4">
                    <div>
                      <label class="font-bold">ราคาเตียงเด็ก : </label>
                      <label>{{ partner.priceBedChild }} THB</label>
                    </div>
                    <div>
                      <label class="font-bold">ราคาเตียงผู้ใหญ่ : </label>
                      <label>{{ partner.priceBedAdult }} THB</label>
                    </div>
                  </div>
                </div>

                <div
                  class="flex flex-col xl:flex-row justify-center xl:items-start items-center mt-6 xl:space-x-4 lg:text-base text-xs xl:space-y-0 space-y-2">
                  <div class="flex items-center space-x-2">
                    <label class="font-bold">เงินมัดจำ : </label>
                    <label :class="partner.hasdeposit === 'มี' ? 'bg-green-500' : 'bg-red-500'"
                      class="px-4 md:py-1 rounded-md md:text-sm text-xs text-white">
                      <div>{{ partner.hasdeposit }}</div>
                    </label>
                  </div>
                  <div class="pl-4">
                    <label class="font-bold">ราคามัดจำ : </label>
                    <label>{{ partner.depositPrice }} THB</label>
                  </div>
                </div>

                <div
                  class="flex flex-col xl:flex-row justify-center xl:items-start items-center mt-12 xl:space-x-4 lg:text-base md:text-sm text-xs xl:space-y-0 space-y-2">
                  <div class="w-full xl:w-1/2">
                    <label class="font-bold">โปรโมชั่นที่เคยใช้งานทั้งหมด ({{ partner.promotionUsed.length }} รายการ):
                    </label>
                    <div class="mt-2 space-y-1">
                      <div v-for="(promotion, index) in partner.promotionUsed" :key="index"
                        class="bg-gray-100 px-3 py-1 rounded-md lg:text-base md:text-sm text-xxs">
                        {{ index + 1 }}. {{ promotion.name }} ({{ promotion.promotionStartDate }} - {{
                          promotion.promotionEndDate }})
                      </div>
                    </div>
                  </div>
                  <div class="w-full xl:w-1/2">
                    <label class="font-bold">โปรโมชั่นที่กำลังใช้งาน ({{ partner.promotionNow.length }} รายการ):
                    </label>
                    <div class="mt-2 space-y-1">
                      <div v-for="(promotion, index) in partner.promotionNow" :key="index"
                        class="bg-green-100 px-3 py-1 rounded-md lg:text-base md:text-sm text-xxs">
                        {{ index + 1 }}. {{ promotion.name }} ({{ promotion.promotionStartDate }} - {{
                          promotion.promotionEndDate }})
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div class="flex justify-center px-3 mt-3">
              <button
                class="border rounded-lg p-3 max-w-7xl mx-auto bg-stone-200 shadow-inner w-full flex justify-between items-center"
                @click="toggleBookingHistory">
                <label class="md:text-xl text-base font-bold">รายการห้องที่เปิดใช้งานกับ SleepGun</label>
                <span>
                  <svg v-if="isBookingHistoryOpen" xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-gray-700 transition-transform duration-300" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-gray-700 transition-transform duration-300" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
            </div>
            <!-- ห้องใน SleepGun -->
            <div v-if="showBookingHistory" class=" max-w-7xl mx-auto mb-3">
              <div class="border rounded-b-lg p-4 bg-white mx-4">
                <div class="flex justify-between items-center md:text-sm text-xs">
                  <button
                    class="bg-yellow-400 hover:bg-yellow-300 text-white px-3 md:py-1 py-2 rounded-md">เยี่ยมชมห้องพัก</button>
                  <label class="font-bold">รายการทั้งหมด {{ bookingHistory.length }} รายการ</label>
                </div>

                <div class="my-2">
                  <hr class="border" />
                </div>

                <div v-for="(item, idx) in bookingHistory" :key="idx" class="border rounded-lg xl:p-5 p-3 mb-4">
                  <div class="flex flex-col md:flex-row md:space-x-3 mb-4 text-xs md:text-xxs text-stone-400">
                    <div>รายการที่ {{ idx + 1 }} </div>
                    <div class="flex space-x-2 mt-2 md:mt-0">
                      <div>อัปเดตล่าสุด {{ item.bookingDate }} </div>
                      <div> {{ item.bookingTime }} </div>
                    </div>
                  </div>

                  <div class="flex flex-col xl:flex-row justify-between items-center md:text-sm text-xs">
                    <div class="flex flex-col xl:flex-row justify-between items-center w-full ">
                      <div class="xl:w-2/5 flex justify-center">
                        <img :src="item.imageHotel" alt="imgHotel"
                          class="xl:w-full xl:h-60 md:h-44 md:w-72 w-full h-36 object-cover rounded-lg shadow-lg" />
                      </div>

                      <div class="xl:w-3/5 w-full flex flex-col justify-center xl:px-8 mt-8 xl:mt-0 lg:px-6">
                        <div class="mb-4">
                          <div class="flex flex-col lg:flex-row lg:space-x-3">
                            <div><label class="font-bold">หมายเลขห้องพัก : </label> {{ item.nameRoom }}</div>
                          </div>
                          <div class="flex flex-col lg:flex-row lg:space-x-3">
                            <div><label class="font-bold">ประเภทห้องพัก :</label> {{ item.roomType }}</div>
                            <div><label class="font-bold">เข้าพักได้สูงสุด / ห้อง : </label> {{ item.countPerson }}
                            </div>
                          </div>
                          <div>
                            <label class="font-bold">รายละเอียดห้องพัก : </label> {{ item.roomDetail }}
                          </div>
                        </div>
                        <div class="mb-4">
                          <div>
                            <label class="font-bold">ราคาห้องพักเดิม : </label>
                            <label class="line-through">{{ item.priceold }} THB</label>
                          </div>
                          <div>
                            <label class="font-bold">ราคาห้องพักใหม่ : </label>
                            <label class="text-xl font-bold">{{ item.price }} THB</label>
                          </div>
                        </div>

                        <div class="mb-4">
                          <label class="font-bold">จำนวนคนที่เคยเข้าพักทั้งหมด : </label>
                          <label>{{ item.countPerson }}</label>
                        </div>


                        <div class="mb-4">
                          <div>
                            <label class="font-bold">คะเเนนรีวิว : </label>
                            <label>{{ item.rating }}</label>
                          </div>
                          <div>
                            <label class="font-bold">จำนวนรีวิวทั้งหมด : </label>
                            <label>{{ item.countReview }}</label>
                          </div>
                        </div>


                        <div class="flex flex-col md:flex-row text-xxs text-stone-500">
                          <label class="font-bold">กำลังใช้งานโปรโมชั่น : </label>
                          <div class="space-x-2">
                            <label v-for="(promotion, index) in item.promotionNow" :key="index"
                              class="bg-green-100 px-3  rounded-md">
                              {{ promotion.name }}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="flex xl:justify-end justify-center pt-4 2xl:mt-0 md:text-base text-xs space-x-2">
                    <button class="bg-green-500 hover:bg-green-400 text-white px-3 md:py-1 py-2 rounded-md"
                      @click="openIncomThisRoomModal(item.nameRoom, partner)">ดูเมมเบอร์ที่เคยเข้าพักเเละราคาที่เคยจ่าย</button>
                    <button @click="openReviewModal"
                      class="bg-blue-500 hover:bg-blue-400 text-white px-3 md:py-1 py-2 rounded-md">ดูรีวิวที่พักของเมมเบอร์</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="mx-3 2xl:mx-0 mt-3">
              <button
                class="border rounded-lg p-3 max-w-7xl mx-auto bg-stone-200 shadow-inner w-full flex justify-between items-center"
                @click="toggleIncomeAll">
                <label class="md:text-xl text-base font-bold">รายได้ทั้งหมด</label>
                <span>
                  <svg v-if="isIncomeAllOpen" xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-gray-700 transition-transform duration-300" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-gray-700 transition-transform duration-300" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
            </div>
            <!-- รายได้ทั้งหมด -->
            <div v-if="isIncomeAllOpen" class="max-w-7xl mx-auto px-3 2xl:px-0  text-xs md:text-sm lg:text-base">
              <div class="bg-white p-4 rounded-b-lg 2xl:mx-4 mx-1">
                <div
                  class="space-x-2 flex flex-col justify-center items-center space-y-2 mb-12 bg-yellow-50 p-4 rounded-lg shadow-md">
                  <div class="flex flex-col md:flex-row justify-center items-center md:space-x-2">
                    <label class="font-bold">รายได้ที่ได้จากการเปิดใช้งานกับ SleepGun : </label>
                    <label class="font-bold text-lg text-lime-500">+ {{ partner.incomeSleepGun }} THB</label>
                  </div>
                  <button class="w-fit bg-gray-500 hover:bg-gray-400 text-white px-3 md:py-1 py-2 rounded-md"
                    @click="openIncomRoomModal(partner)">ดูรายได้ห้องพัก</button>
                </div>

                <div class="flex flex-col justify-center items-center md:flex-row md:space-x-2 ">
                  <label>รายได้ที่ต้องจ่ายให้กับ SleepGun หัก5% : </label>
                  <label class="font-bold text-red-500">{{ partner.incomeSleepGunPay }} THB</label>
                </div>
                <div class="flex flex-col justify-center items-center md:flex-row mb-4 space-x-2">
                  <label>รายได้ที่พาร์ทเนอร์ได้รับทั้งหมด : </label>
                  <label class="font-bold  text-lime-500"> {{ partner.incomeSleepGunPartner }} THB</label>
                </div>

                <!-- เเบ่งราคารายไดทั้งหมดเป็น -->
                <div class="text-xxs md:text-xs">
                  <div class="mb-4">
                    <div>
                      <label>โอนเข้าบริษัทโดยตรง(โอนเข้าบัญชีบริษัทของพาร์ทเนอร์) : </label>
                      <label>{{ partner.incomeSleepGunPartner }} THB</label>
                    </div>
                    <div>
                      <label>โอนเข้ากระเป๋าตัง tossagun : </label>
                      <label>{{ partner.incomeSleepGunWallet }} THB</label>
                    </div>
                  </div>

                  <div class="text-stone-400 mb-2 ">
                    <div class=" p-2 flex flex-col md:flex-row justify-center items-center rounded-lg shadow-md">
                      <img src="/imgHotel/payment/Wallet.png" alt="wallet" class="w-28 h-20">
                      <div class="text-sm md:text-base ">
                        <div class="flex flex-col md:flex-row justify-center items-center">
                          <label class="">เลขกระเป๋าตัง tossagun : </label>
                          <label>{{ partner.numberSleepGunWallet }}</label>
                        </div>
                        <div class="flex flex-col md:flex-row justify-center items-center">
                          <label class="font-bold">ยอดเงินคงเหลือในกระเป๋าตัง tossagun : </label>
                          <label class="font-bold">{{ partner.incomeSleepGunWalletLeft }} THB</label>
                        </div>
                      </div>
                    </div>
                    <div class="flex flex-col justify-end items-end p-2">
                      <div>
                        <button class="bg-blue-500 hover:bg-blue-400 text-white px-3 md:py-1 py-2 rounded-md"
                          @click="openTransactionSleepGunModal(partner)">ดูประวัติการทำรายการของกระเป๋า
                          SleepGun</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </TemplateAdmin>



  <!-- Popup Modal รายได้ของห้องนี้เท่านั้น -->
  <div v-if="showIncomThisRoomModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-xl max-h-[80vh] flex flex-col mx-4">
      <div class="flex justify-between items-center p-4 border-b">
        <h2 class="lg:text-lg text-sm font-bold">รายชื่อคนที่เคยเข้าพักห้องนี้และราคาที่จ่าย</h2>
        <button @click="closeIncomThisRoomModal" class="text-xl font-bold">x</button>
      </div>
      <div class="my-2 flex justify-end px-4 shadow-md">
        <label class="font-bold">รายได้รวมของห้องนี้ : {{ totalAmountThisRoom }} THB</label>
      </div>
      <div class="p-4 overflow-y-auto" style="max-height:60vh;">
        <div v-for="(incomThisRoom, idx) in incomThisRoomTransactions" :key="idx" class="mb-4 border-b pb-2">


          <div class="flex justify-start space-x-4">
            <div>
              <label class="md:text-sm text-xxs text-stone-400">
                รายการที่ {{ incomThisRoomTransactions.length - idx }}
              </label>
            </div>
            <div>
              <div class="space-x-1">
                <label class="md:text-sm text-xxs text-stone-400">วันที่เช็คอิน {{ incomThisRoom.dateCheckIn }}</label>
                <label class="md:text-sm text-xxs text-stone-400">/ {{ incomThisRoom.timeCheckIn }}</label>
              </div>
              <div class="space-x-1">
                <label class="md:text-sm text-xxs text-stone-400">วันที่เข้าเช็คเอ้าท์ {{ incomThisRoom.dateCheckOut
                }}</label>
                <label class="md:text-sm text-xxs text-stone-400">/ {{ incomThisRoom.timeCheckOut }}</label>
              </div>
            </div>
          </div>
          <div class="mt-2 text-sm md:text-base">
            <div>
              <label>ชื่อ : </label>
              <label>{{ incomThisRoom.name }}</label>
            </div>
            <div>
              <label>ชื่อโปรไฟล์ : </label>
              <label>{{ incomThisRoom.nameProfile }}</label>
            </div>
            <div>
              <label>อีเมล : </label>
              <label>{{ incomThisRoom.email }}</label>
            </div>
            <div>
              <label>ราคาที่จ่าย : </label>
              <label class="text-lime-500 font-bold">{{ incomThisRoom.amount }} THB</label>
            </div>
            <div class="mt-2 flex justify-end">
              <button
                class="bg-blue-500 hover:bg-blue-400 text-white px-3 md:py-1 py-2 rounded-md">ดูข้อมูลเมมเบอร์</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Popup Modal รายได้ของแต่ละห้องพักรวมกัน -->
  <div v-if="showIncomRoomModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-xl max-h-[80vh] flex flex-col mx-4">
      <div class="flex justify-between items-center p-4 border-b">
        <h2 class="text-lg font-bold">รายได้ห้องพัก</h2>
        <button @click="closeIncomRoomModal" class="text-xl font-bold">x</button>
      </div>
      <div class="p-4 flex justify-end shadow-md">
        <label class="font-bold">รายได้รวมทั้งหมด : {{ totalAmountRoom }} THB</label>
      </div>
      <div class="p-4 overflow-y-auto" style="max-height:60vh;">
        <div v-for="(incomRoom, idx) in incomRoomTransactions" :key="idx" class="mb-4 border-b pb-2">

          <div class="flex justify-start space-x-4">
            <div>
              <label class="md:text-sm text-xxs text-stone-400">
                รายการที่ {{ incomRoomTransactions.length - idx }}
              </label>
            </div>
            <div class="space-x-1">
              <label class="md:text-sm text-xxs text-stone-400">{{ incomRoom.date }}</label>
              <label class="md:text-sm text-xxs text-stone-400">/ {{ incomRoom.time }}</label>
            </div>
          </div>
          <div class="mt-2">
            <div class="flex justify-end px-4 md:text-xl text-lg pt-4 font-bold">
              <label class="text-lime-500"> + {{ incomRoom.amount }} THB</label>
            </div>
            <div>
              <label>รายได้รวม : {{ incomRoom.amount }} THB</label>
              <label v-if="incomRoom.room"> | ห้อง : {{ incomRoom.room }}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Popup Modal สำหรับประวัติการทำรายการของกระเป๋า SleepGun -->
  <div v-if="showTransactionSleepGunModal"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-xl max-h-[80vh] flex flex-col mx-4">
      <div class="flex justify-between items-center p-4 border-b">
        <h2 class="text-lg font-bold">ประวัติการทำรายการของกระเป๋า SleepGun</h2>
        <button @click="closeTransactionSleepGunModal" class="text-xl font-bold">x</button>
      </div>
      <div class="p-4 overflow-y-auto" style="max-height:60vh;">
        <div v-for="(txn, idx) in incomeSleepGunWalletTransactions" :key="idx" class="mb-4 border-b pb-2">
          <div class="flex justify-start space-x-4">
            <div>
              <label class="md:text-sm text-xxs text-stone-400">
                รายการที่ {{ incomeSleepGunWalletTransactions.length - idx }}
              </label>
            </div>
            <div class="space-x-1">
              <label class="md:text-sm text-xxs text-stone-400">{{ txn.date }}</label>
              <label class="md:text-sm text-xxs text-stone-400">/ {{ txn.time }}</label>
            </div>
          </div>
          <div class="mt-2">
            <div class="flex justify-end px-4 md:text-xl text-lg pt-4 font-bold">
              <template v-if="txn.amount > 0">
                <label class="text-lime-500"> + {{ txn.amount }} THB</label>
              </template>
              <template v-else>
                <label class="text-red-500"> {{ txn.amount }} THB</label>
              </template>
            </div>
            <div class="flex justify-end px-4 md:text-sm text-xxs text-stone-400">
              <label>ยอดเงินคงเหลือ : {{ txn.tossagunWalletBalance || '-' }} THB</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


  <!-- Popup Modal สำหรับประวัติการทำรายการ -->
  <div v-if="showTransactionModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-xl max-h-[80vh] flex flex-col mx-4">
      <div class="flex justify-between items-center p-4 border-b">
        <h2 class="text-lg font-bold">ประวัติการทำรายการ</h2>
        <button @click="closeTransactionModal" class="text-xl font-bold">x</button>
      </div>
      <div class="p-4 overflow-y-auto" style="max-height:60vh;">
        <div
          v-for="(txn, txnIndex) in (selectedTransactionPartner?.transactions ? [...selectedTransactionPartner.transactions].reverse() : [])"
          :key="txnIndex" class="mb-4 border-b pb-2">
          <div class="flex justify-start space-x-4">
            <div>
              <label class="md:text-sm text-xxs text-stone-400">
                รายการที่ {{ (selectedTransactionPartner?.transactions?.length || 0) - txnIndex }}
              </label>
            </div>
            <div class="space-x-1">
              <label class="md:text-sm text-xxs text-stone-400">{{ txn.date }}</label>
              <label class="md:text-sm text-xxs text-stone-400">/ {{ txn.time }}</label>
            </div>
          </div>
          <div class="mt-2">
            <div class="flex justify-end px-4 md:text-xl text-lg pt-4 font-bold">
              <template v-if="txn.amount > 0">
                <label class="text-lime-500"> + {{ txn.amount }} THB</label>
              </template>
              <template v-else>
                <label class="text-red-500"> {{ txn.amount }} THB</label>
              </template>
            </div>
            <div class="flex justify-end px-4 md:text-sm text-xxs text-stone-400">
              <label>ยอดเงินคงเหลือ : {{ txn.tossagunWalletBalance || '-' }} THB</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>



  <!-- Popup Modal สำหรับรีวิวที่พักของเมมเบอร์ -->
  <div v-if="showReviewModal" class="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black bg-opacity-40">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] flex flex-col">
      <div class="flex justify-between items-center p-4 border-b">
        <h2 class="text-lg font-bold">รีวิวที่พักของเมมเบอร์</h2>
        <button @click="closeReviewModal" class="text-xl font-bold">x</button>
      </div>
      <div class="p-4 overflow-y-auto" style="max-height:60vh;">
        <Review :reviews="reviews" />
      </div>
    </div>
  </div>
</template>

<script setup>
import TemplateAdmin from "@/components/TemplateAdmin.vue";
import { ref, computed } from "vue";
import Review from "@/components/Review.vue";

const mapUrl =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.725152370527!2d100.52318681534138!3d13.736717401027756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2992e2dc0db0d%3A0x78e9f0aa1d401c6c!2z4LiB4Li44Lih4LiE4Lij4Li04Lip4Lix4LiU4Lij4Liw4Lia4Li54LiZ4LiiIOC4l-C4quC4suC4geC4seC4meC4suC4geC4peC4seC4lOC4hOC4meC4reC4mQ!5e0!3m2!1sth!2sth!4v1620278354921!5m2!1sth!2sth'


const selectedPartnerId = ref(null)
const showTransactionModal = ref(false)
const selectedTransactionPartner = ref(null)
const showReviewModal = ref(false);
function openReviewModal() { showReviewModal.value = true; }
function closeReviewModal() { showReviewModal.value = false; }

const showBookingHistory = ref(false);
function toggleBookingHistory() { showBookingHistory.value = !showBookingHistory.value; }

const isIncomeAllOpen = ref(false);
function toggleIncomeAll() { isIncomeAllOpen.value = !isIncomeAllOpen.value; }

const isBookingDetailsOpen = ref(false);
function toggleBookingDetails() { isBookingDetailsOpen.value = !isBookingDetailsOpen.value; }

// เพิ่มตัวแปรและฟังก์ชันสำหรับ Popup รายชื่อคนที่เคยเข้าพัก
// ลบตัวแปร members และ showMemberModal, openMemberModal, closeMemberModal

const bookingHistory = [
  {
    id: 1,
    imageHotel: "/imgHotel/sea.jpg",
    bookingDate: "2024-06-10",
    bookingTime: "14:00",
    hotelName: "โรงแรมตัวอย่าง 1",
    roomType: "Deluxe",
    checkIn: "2024-06-15",
    checkInTimestart: "14:00",
    checkInTimeend: "18:00",
    checkInDate: "2024-06-15",
    checkOut: "2024-06-17",
    checkOutTimestart: "11:00",
    checkOutTimeend: "12:00",
    checkOutDate: "2024-06-17",
    timeMember: "2024-06-10 13:00",
    timePayment: "2024-06-10 13:30",
    paymentMethod: "โอนผ่านธนาคาร",
    countPerson: 2,
    status: "เข้าพักเสร็จสิ้น",
    price: 3500,
    countPerson: 2,
    roomDetail: "ห้องพักสะอาดมาก พนักงานบริการดี ประทับใจสุดๆ",
    priceold: 3500,
    rating: 4.5,
    countPerson: 2,
    countReview: 10,
    countPerson: 2,
    nameRoom: "103",
    promotionNow: [
      {
        name: "โปรโมชั่นฤดูร้อน",
        promotionStartDate: "01/07/2024",
        promotionEndDate: "30/09/2024"
      },
      {
        name: "โปรโมชั่นสมาชิกใหม่",
        promotionStartDate: "01/01/2024",
        promotionEndDate: "31/12/2024"
      }
    ]
  },
  {
    id: 2,
    imageHotel: "/imgHotel/sea.jpg",
    bookingDate: "2024-05-10",
    bookingTime: "10:00",
    hotelName: "โรงแรมตัวอย่าง 2",
    roomType: "Standard",
    checkIn: "2024-05-12",
    checkInTimestart: "13:00",
    checkInTimeend: "17:00",
    checkInDate: "2024-05-12",
    checkOut: "2024-05-14",
    checkOutTimestart: "10:00",
    checkOutTimeend: "11:00",
    checkOutDate: "2024-05-14",
    timeMember: "2024-05-10 09:00",
    timePayment: "2024-05-10 09:30",
    paymentMethod: "บัตรเครดิต",
    countPerson: 1,
    status: "ยกเลิกการจอง",
    price: 2200,
    countPerson: 1,
    roomDetail: "ห้องพักสะอาดมาก พนักงานบริการดี ประทับใจสุดๆ",
    priceold: 2200,
    rating: 4.5,
    countPerson: 1,
    countReview: 10,
    countPerson: 1,
    nameRoom: "102",
    promotionNow: [
      {
        name: "โปรโมชั่นวันหยุด",
        promotionStartDate: "01/04/2024",
        promotionEndDate: "30/06/2024"
      }
    ]
  },
  {
    id: 3,
    imageHotel: "/imgHotel/sea.jpg",
    bookingDate: "2024-04-01",
    bookingTime: "08:00",
    hotelName: "โรงแรมตัวอย่าง 3",
    roomType: "Suite",
    checkIn: "2024-04-03",
    checkInTimestart: "15:00",
    checkInTimeend: "19:00",
    checkInDate: "2024-04-03",
    checkOut: "2024-04-05",
    checkOutTimestart: "12:00",
    checkOutTimeend: "13:00",
    checkOutDate: "2024-04-05",
    timeMember: "2024-04-01 07:00",
    timePayment: "2024-04-01 07:30",
    paymentMethod: "พร้อมเพย์",
    countPerson: 3,
    status: "กำลังเข้าพัก",
    price: 5000,
    countPerson: 3,
    roomDetail: "ห้องพักสะอาดมาก พนักงานบริการดี ประทับใจสุดๆ",
    priceold: 5000,
    rating: 4.5,
    countPerson: 3,
    countReview: 10,
    countPerson: 3,
    nameRoom: "101",
    promotionNow: [
      {
        name: "โปรโมชั่นปีใหม่",
        promotionStartDate: "01/10/2024",
        promotionEndDate: "31/12/2024"
      },
      {
        name: "โปรโมชั่นสมาชิกใหม่",
        promotionStartDate: "01/01/2024",
        promotionEndDate: "31/12/2024"
      },
      {
        name: "โปรโมชั่นเปิดใหม่",
        promotionStartDate: "01/01/2024",
        promotionEndDate: "31/03/2024"
      }
    ]
  }
];

const reviews = [
  {
    name: "สมชาย",
    rating: 5,
    roomType: "Deluxe",
    dateStay: 2,
    monthStay: "มิถุนายน",
    yearStay: 2024,
    detail: "ห้องพักสะอาดมาก พนักงานบริการดี ประทับใจสุดๆ",
    dateReview: "10/06/2024"
  },
  {
    name: "อรทัย",
    rating: 4,
    roomType: "Standard",
    dateStay: 1,
    monthStay: "มิถุนายน",
    yearStay: 2024,
    detail: "วิวสวย อาหารเช้าอร่อย แต่ที่จอดรถน้อยไปนิด",
    dateReview: "09/06/2024"
  },
  {
    name: "ปกรณ์",
    rating: 3,
    roomType: "Suite",
    dateStay: 3,
    monthStay: "พฤษภาคม",
    yearStay: 2024,
    detail: "ห้องโอเคตามราคา แต่แอร์เสียงดังไปนิด",
    dateReview: "28/05/2024"
  },
  {
    name: "ศิริพร",
    rating: 5,
    roomType: "Family",
    dateStay: 2,
    monthStay: "พฤษภาคม",
    yearStay: 2024,
    detail: "เหมาะกับครอบครัวมาก เด็กๆชอบสระว่ายน้ำ",
    dateReview: "25/05/2024"
  },
  {
    name: "ณัฐวุฒิ",
    rating: 4,
    roomType: "Romantic",
    dateStay: 1,
    monthStay: "เมษายน",
    yearStay: 2024,
    detail: "บรรยากาศดี เหมาะกับคู่รัก",
    dateReview: "15/04/2024"
  }
];

// เพิ่มตัวแปรข้อมูล member
// ลบตัวแปร members และ showMemberModal, openMemberModal, closeMemberModal

function toggleDetail(id) {
  selectedPartnerId.value = selectedPartnerId.value === id ? null : id
}

function openTransactionModal(partner) {
  selectedTransactionPartner.value = partner;
  showTransactionModal.value = true;
}
function closeTransactionModal() {
  showTransactionModal.value = false;
  selectedTransactionPartner.value = null;
}


const showTransactionSleepGunModal = ref(false);
const incomeSleepGunWalletTransactions = ref([]); // สำหรับเก็บธุรกรรมของกระเป๋า SleepGun

function openTransactionSleepGunModal(partner) {
  incomeSleepGunWalletTransactions.value = partner.incomeSleepGunWalletTransactions || [];
  showTransactionSleepGunModal.value = true;
}
function closeTransactionSleepGunModal() {
  showTransactionSleepGunModal.value = false;
  incomeSleepGunWalletTransactions.value = [];
}

// เพิ่มตัวแปรและฟังก์ชันสำหรับรายได้ห้องพัก
const showIncomRoomModal = ref(false);
const incomRoomTransactions = ref([]);
function openIncomRoomModal(partner) {
  incomRoomTransactions.value = partner.incomRoomTransactions || [];
  showIncomRoomModal.value = true;
}
function closeIncomRoomModal() {
  showIncomRoomModal.value = false;
  incomRoomTransactions.value = [];
}

// เพิ่มตัวแปรและฟังก์ชันสำหรับ popup รายได้ห้องนี้เท่านั้น
const showIncomThisRoomModal = ref(false);
const incomThisRoomTransactions = ref([]);
function openIncomThisRoomModal(roomNameOrId, partner) {
  // กรองเฉพาะธุรกรรมของห้องนี้เท่านั้น
  incomThisRoomTransactions.value = (partner.incomRoomTransactions || []).filter(tran => tran.room === roomNameOrId);
  showIncomThisRoomModal.value = true;
}
function closeIncomThisRoomModal() {
  showIncomThisRoomModal.value = false;
  incomThisRoomTransactions.value = [];
}

const totalAmountThisRoom = computed(() => {
  return incomThisRoomTransactions.value.reduce((sum, t) => sum + (t.amount || 0), 0);
});

const totalAmountRoom = computed(() => {
  return incomRoomTransactions.value.reduce((sum, t) => sum + (t.amount || 0), 0);
});

const partnerTemplate = {
  id: 1,
  logoCompany: "/images/icon/employee_navAdmin.png",
  firstname: "สมชาย",
  lastname: "ใจดี",
  sex: "ชาย",
  birthday: "01/01/2530",
  phone: "0812345678",
  email: "somchai@email.com",
  nationality: "ไทย",
  addressCompany: "123/45",
  subdistrictCompany: "บางรัก",
  districtCompany: "บางรัก",
  provinceCompany: "กรุงเทพมหานคร",
  postcodeCompany: "10500",
  createdAt: "2024-06-01",
  tossagunWalletAccount: "TOS1234567890",
  tossagunWalletBalance: 15000,
  tossagunWalletCredit: 5000,
  tossagunWalletTransactionCount: 12,
  tossagunWalletTransactionDate: "2024-06-10",
  tossagunWalletTransactionTime: "14:35",
  tossagunWalletTransactionAmount: 2000,

  paperBusiness: "/imgHotel/sea.jpg",
  imageBank: "/imgHotel/sea.jpg",
  imageVisa: "/imgHotel/sea.jpg",
  imageIdCard: "/imgHotel/sea.jpg",
  imageHotel: "/imgHotel/sea.jpg",
  address: "123/45",
  subdistrict: "บางรัก",
  district: "บางรัก",
  province: "กรุงเทพมหานคร",
  postcode: "10500",
  bankName: "ธนาคารกรุงเทพ",
  bankAccount: "1234567890123",
  taxId: "1234567890123",
  visa: "1234567890123",
  idCard: "1234567890123",
  username: "somchai",
  approvedAt: "2024-06-01",
  hotelType: "รีสอร์ท",
  hotelName: "สมชาย45t",
  companyName: "บริษัทสมชายใจดี",
  countRoomSleepGun: 10,
  countRoomSleepGun: 10,

  hasdeposit: "ไม่มี",
  depositPrice: 100,
  promotionUsed: [
    {
      name: "โปรโมชั่นเปิดใหม่",
      promotionStartDate: "01/01/2024",
      promotionEndDate: "31/03/2024"
    },
    {
      name: "โปรโมชั่นวันหยุด",
      promotionStartDate: "01/04/2024",
      promotionEndDate: "30/06/2024"
    },
    {
      name: "โปรโมชั่นฤดูร้อน",
      promotionStartDate: "01/07/2024",
      promotionEndDate: "30/09/2024"
    },
    {
      name: "โปรโมชั่นปีใหม่",
      promotionStartDate: "01/10/2024",
      promotionEndDate: "31/12/2024"
    },
    {
      name: "โปรโมชั่นสมาชิกใหม่",
      promotionStartDate: "01/01/2024",
      promotionEndDate: "31/12/2024"
    }
  ],
  promotionNow: [
    {
      name: "โปรโมชั่นฤดูร้อน",
      promotionStartDate: "01/07/2024",
      promotionEndDate: "30/09/2024"
    },
    {
      name: "โปรโมชั่นสมาชิกใหม่",
      promotionStartDate: "01/01/2024",
      promotionEndDate: "31/12/2024"
    }
  ],
  priceBedChild: 100,
  priceBedAdult: 200,
  hascountBedExtra: "มี",
  checkInTimeStart: "14:00",
  checkInTimeEnd: "18:00",
  checkOutTimeStart: "11:00",
  checkOutTimeEnd: "12:00",

  // รายได้
  incomeSleepGun: 10000,
  incomeSleepGunPay: 10000 * 0.05,
  // แบ่ง netIncome เป็น 60% โอนเข้าบริษัท, 40% โอนเข้ากระเป๋า tossagun
  get incomeSleepGunPartner() {
    const netIncome = this.incomeSleepGun - this.incomeSleepGunPay;
    return netIncome * 0.6;
  },
  get incomeSleepGunWallet() {
    const netIncome = this.incomeSleepGun - this.incomeSleepGunPay;
    return netIncome * 0.4;
  },
  lastWithdrawalAmount: 1000,
  lastWithdrawalDate: "2024-06-10",
  get incomeSleepGunWalletLeft() {
    return this.incomeSleepGunWallet - this.lastWithdrawalAmount;
  },

  incomeSleepGunWalletTransactions: [
    { date: "2024-06-10", time: "14:35", amount: 2000, tossagunWalletBalance: 15000 },
    { date: "2024-06-09", time: "09:20", amount: -1500, tossagunWalletBalance: 13000 },
    { date: "2024-06-08", time: "16:10", amount: 3000, tossagunWalletBalance: 14500 },
    { date: "2024-06-07", time: "11:45", amount: -500, tossagunWalletBalance: 11500 },
    { date: "2024-06-06", time: "08:30", amount: 1000, tossagunWalletBalance: 12000 }
  ],
  // เพิ่มข้อมูลรายได้ห้องพักตัวอย่าง
  incomRoomTransactions: [
    // ห้อง 101 - 3 รายการ
    {
      name: 'สมชาย ใจดี',
      nameProfile: 'somchai123',
      email: 'somchai@email.com',
      dateCheckIn: '2024-06-10',
      timeCheckIn: '14:00',
      dateCheckOut: '2024-06-11',
      timeCheckOut: '11:00',
      date: '2024-06-10',
      time: '14:00',
      amount: 3500,
      room: '101'
    },
    {
      name: 'อรทัย สวยงาม',
      nameProfile: 'ornth123',
      email: 'ornth@email.com',
      dateCheckIn: '2024-06-12',
      timeCheckIn: '15:00',
      dateCheckOut: '2024-06-13',
      timeCheckOut: '10:00',
      date: '2024-06-12',
      time: '15:00',
      amount: 3600,
      room: '101'
    },
    {
      name: 'ปกรณ์ ทองดี',
      nameProfile: 'pakorn456',
      email: 'pakorn@email.com',
      dateCheckIn: '2024-06-14',
      timeCheckIn: '16:00',
      dateCheckOut: '2024-06-15',
      timeCheckOut: '12:00',
      date: '2024-06-14',
      time: '16:00',
      amount: 3700,
      room: '101'
    },
    // ห้อง 102 - 2 รายการ
    {
      name: 'ศิริพร สายใจ',
      nameProfile: 'siriporn789',
      email: 'siriporn@email.com',
      dateCheckIn: '2024-06-09',
      timeCheckIn: '13:00',
      dateCheckOut: '2024-06-10',
      timeCheckOut: '10:00',
      date: '2024-06-09',
      time: '13:00',
      amount: 2200,
      room: '102'
    },
    {
      name: 'ณัฐวุฒิ ใจดี',
      nameProfile: 'natthawut999',
      email: 'natthawut@email.com',
      dateCheckIn: '2024-06-11',
      timeCheckIn: '14:30',
      dateCheckOut: '2024-06-12',
      timeCheckOut: '11:00',
      date: '2024-06-11',
      time: '14:30',
      amount: 2250,
      room: '102'
    },
    // ห้อง 103 - 5 รายการ
    {
      name: 'สมศรี สายทอง',
      nameProfile: 'somsri111',
      email: 'somsri@email.com',
      dateCheckIn: '2024-06-08',
      timeCheckIn: '15:00',
      dateCheckOut: '2024-06-09',
      timeCheckOut: '12:00',
      date: '2024-06-08',
      time: '15:00',
      amount: 5000,
      room: '103'
    },
    {
      name: 'ประสิทธิ์ ทองคำ',
      nameProfile: 'prasit222',
      email: 'prasit@email.com',
      dateCheckIn: '2024-06-10',
      timeCheckIn: '16:00',
      dateCheckOut: '2024-06-11',
      timeCheckOut: '11:00',
      date: '2024-06-10',
      time: '16:00',
      amount: 5100,
      room: '103'
    },
    {
      name: 'สายฝน ฟ้าใส',
      nameProfile: 'saifon333',
      email: 'saifon@email.com',
      dateCheckIn: '2024-06-12',
      timeCheckIn: '17:00',
      dateCheckOut: '2024-06-13',
      timeCheckOut: '10:00',
      date: '2024-06-12',
      time: '17:00',
      amount: 5200,
      room: '103'
    },
    {
      name: 'วราภรณ์ สายลม',
      nameProfile: 'waraporn444',
      email: 'waraporn@email.com',
      dateCheckIn: '2024-06-14',
      timeCheckIn: '18:00',
      dateCheckOut: '2024-06-15',
      timeCheckOut: '12:00',
      date: '2024-06-14',
      time: '18:00',
      amount: 5300,
      room: '103'
    },
    {
      name: 'กิตติศักดิ์ สายรุ้ง',
      nameProfile: 'kittisak555',
      email: 'kittisak@email.com',
      dateCheckIn: '2024-06-16',
      timeCheckIn: '19:00',
      dateCheckOut: '2024-06-17',
      timeCheckOut: '11:00',
      date: '2024-06-16',
      time: '19:00',
      amount: 5400,
      room: '103'
    }
  ]
};

const partners = Array.from({ length: 2 }, (_, i) => ({ ...partnerTemplate, id: i + 1 }));
</script>