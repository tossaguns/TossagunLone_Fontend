<template>
  <TemplateEmployee>
    <template #header>
      <label>POS ห้องพัก</label>
    </template>
    <template #content>
      <div class="h-screen flex overflow-hidden">
        <!-- Main Content -->
        <div class="flex-1 h-full overflow-y-auto transition-all duration-300" :class="{
          'mr-0': !isDrawerVisible,
          'xl:mr-[475px]': isDrawerVisible
        }">
          <div class="p-4 max-w-[3000px] mx-auto">
            <div>
              <label class="text-2xl font-bold">ระบบจัดการห้องพัก</label>


              <div class="flex justify-between items-center space-x-2">
                <div class="flex items-center space-x-2">
                  <!-- ใช้ค้นหาหมายเลขห้องพัก ประเภทห้องพัก(เช่น ห้องดีลักซ์ ) ประเภทพัดลม เเอร์ พัดลมเเละเเอร์ -->
                  <label>ค้นหา</label>
                  <input type="text" v-model="searchQuery" placeholder="ค้นหา"
                    class="border border-gray-300 rounded-md p-2" />
                  <button
                    class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed">ค้นหา</button>
                </div>
                <div class="px-4 hidden xl:block">
                  <button @click="openDrawer" class="px-4 py-2 bg-blue-500 text-white rounded">
                    กรอกข้อมูล
                  </button>
                </div>
              </div>

              <div>
                <div class="flex 2xl:flex-row flex-col 2xl:justify-center items-center space-x-4 mt-8">
                  <div class="flex flex-wrap space-x-2 space-y-2">
                    <label>เลือกวันที่ : </label>
                    <DatePicker v-model="selectedDateRange" @dateRangeSelected="handleDateRangeSelected" />
                  </div>

                  <div class="flex flex-wrap justify-center items-center space-x-2 space-y-2 ">
                    <button @click="searchAvailableRooms" :disabled="!selectedDateRange || isSearching"
                      class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed mt-2">
                      {{ isSearching ? 'กำลังค้นหา...' : 'ค้นหาห้องว่าง' }}
                    </button>
                    <button @click="searchCheckedOutRooms" :disabled="!selectedDateRange || isSearching"
                      class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed">
                      {{ isSearching ? 'กำลังค้นหา...' : 'ค้นหาห้องที่ check-out' }}
                    </button>
                    <button @click="searchCleaningRooms" :disabled="!selectedDateRange || isSearching"
                      class="bg-amber-400 text-white px-4 py-2 rounded-md hover:bg-amber-500 disabled:bg-gray-400 disabled:cursor-not-allowed">
                      {{ isSearching ? 'กำลังค้นหา...' : 'ค้นหาห้องกำลังทำความสะอาด' }}
                    </button>
                    <button @click="clearSearch" :disabled="!hasSearchResults"
                      class="bg-white text-red-500 px-4 py-2 rounded-md hover:text-red-600 shadow">
                      ล้างการค้นหา
                    </button>
                  </div>
                </div>
                <!-- เดี๋ยวกลับมาปิด Drawer -->

              </div>


              <!-- สรุปสถิติ -->

              <div class="flex items-center">
                <div class="my-2">
                  <div class="flex  items-start p-3 space-x-4">
                    <div>
                      <label>จำนวนตึกทั้งหมด : </label>
                      <label class="font-bold text-amber-500 px-2 py-1 rounded-md">{{ posSummary.totalBuildingCount ||
                        0
                        }}</label>
                    </div>
                    <div>
                      <label>ห้องว่างทั้งหมด : </label>
                      <label class="font-bold text-amber-500 px-2 py-1 rounded-md">{{ getTotalAvailableRooms()
                        }}</label>
                    </div>

                    <!-- จำนวนห้องที่จองกับ Sleep Gun ตอนนี้ อันนี้เก็บไว้ก่อนยังไม่ต้องเขียนข้อมูลเชื่อมดาต้าเบส
      <div>
        <label>จำนวนห้องที่จองกับ Sleep Gun ตอนนี้ :</label>
        <label class="font-bold text-amber-500 px-2 py-1 rounded-md">{{ }}</label>
      </div> -->
                  </div>
                </div>
                <div>
                  <Tooltip position="bottom">
                    <template #trigger>
                      <button class="px-2 py-2 rounded-full shadow-md">
                        <img src="/imgHotel/warn.png" alt="info" class="w-4 h-4"></img>
                      </button>
                    </template>

                    <template #content>
                      <div class="text-sm font-semibold bg-stone-600 rounded-lg text-white">
                        <div class="my-2">
                          <div class="flex flex-col items-start p-3">
                            <div>
                              <label>จำนวนตึกทั้งหมด : </label>
                              <label class="font-bold text-amber-300 px-2 py-1 rounded-md">{{
                                posSummary.totalBuildingCount
                                ||
                                0
                                }}</label>
                            </div>
                            <div>
                              <label>จำนวนห้องพักทั้งหมด : </label>
                              <label class="font-bold text-amber-300 px-2 py-1 rounded-md">{{ posSummary.totalRoomCount
                                ||
                                0
                                }}</label>
                            </div>
                            <div>
                              <label>โควต้าห้องพัก Sleep Gun :</label>
                              <label class="font-bold text-amber-300 px-2 py-1 rounded-md">{{
                                posSummary.totalRoomCountSleepGun || 0
                                }}</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                  </Tooltip>
                </div>
              </div>



              <!-- เลือกตึก -->
              <div class="mb-4 mt-8">
                <label class="text-stone-400">เลือกตึก</label>
                <div class="md:border rounded-md md:p-4">
                  <div class="grid grid-cols-2 md:flex md:flex-wrap gap-2">
                    <div v-for="building in buildings" :key="building._id"
                      class="md:w-fit border border-stone-300 rounded-md shadow">
                      <button @click="selectBuilding(building._id)"
                        class="w-full md:w-[160px] h-full px-4 py-3 rounded-md font-bold transition-all duration-300"
                        :class="[
                          selectedBuildingId === building._id
                            ? 'border-2 border-yellow-400  shadow-lg scale-105'
                            : ''
                        ]" :style="{
                          color: building.colorText,
                          backgroundColor: selectedBuildingId === building._id
                            ? 'rgba(254, 243, 199, 0.8)'
                            : (building.hascolorBG === 'colorBG' ? building.colorBG : 'transparent'),
                          backgroundImage: building.hascolorBG === 'imgBG' ? `url(${building.imgBG})` : 'none',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          textShadow: building.hascolorBG === 'imgBG' ? '2px 2px 4px rgba(0, 0, 0, 0.2), -2px -2px 4px rgba(0, 0, 0, 0.3)' : 'none',
                          boxShadow: building.hascolorBG === 'imgBG' ? 'inset 0 0 100px rgba(0, 0, 0, 0.8), 0 0 10px rgba(0, 0, 0, 0)' : 'none'
                        }">
                        {{ building.nameBuilding }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- แสดงตึกและชั้น -->
              <div v-if="buildings.length > 0" class="space-y-6 mt-4">

                <!-- แสดงผลการค้นหา (ถ้ามี) -->
                <div v-if="hasSearchResults" class="border rounded-lg p-4 mb-4" :class="{
                  'bg-green-50 border-green-200': searchType === 'available',
                  'bg-red-50 border-red-200': searchType === 'checked-out',
                  'bg-amber-50 border-amber-200': searchType === 'cleaning'
                }">
                  <div class="flex items-center justify-between">
                    <div>
                      <h3 class="text-lg font-bold" :class="{
                        'text-green-800': searchType === 'available',
                        'text-red-800': searchType === 'checked-out',
                        'text-amber-800': searchType === 'cleaning'
                      }">
                        {{
                          searchType === 'available' ? `ผลการค้นหาห้องว่าง (${searchSummary.availableRooms} ห้อง)` :
                            searchType === 'checked-out' ? `ผลการค้นหาห้องที่ check-out (${searchSummary.checkedOutRooms}
                        ห้อง)` :
                              searchType === 'cleaning' ? `ผลการค้นหาห้องกำลังทำความสะอาด (${searchSummary.cleaningRooms}
                        ห้อง)` :
                                'ผลการค้นหา'
                        }}
                      </h3>
                      <div class="text-sm mt-1" :class="{
                        'text-green-600': searchType === 'available',
                        'text-red-600': searchType === 'checked-out',
                        'text-amber-600': searchType === 'cleaning'
                      }">
                        {{ formatDateRange(searchCriteria.startDate, searchCriteria.endDate) }}
                        ({{ searchCriteria.duration }} วัน)
                      </div>
                    </div>
                    <button @click="clearSearch"
                      class="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition">
                      ล้างการค้นหา
                    </button>
                  </div>
                </div>

                <!-- แสดงชั้นและห้องของตึกที่เลือก -->
                <div v-if="selectedBuildingId && selectedBuilding" class="border rounded-lg p-6 bg-gray-50">
                  <!-- หัวข้อตึกที่เลือก -->
                  <div class="flex items-center justify-between mb-6">
                    <h3 class="text-2xl font-bold text-gray-800">{{ selectedBuilding.nameBuilding }}</h3>
                    <div class="flex items-center space-x-4">
                      <span class="text-sm text-gray-600">ชั้น: {{ selectedBuilding.floors?.length || 0 }} ชั้น</span>
                      <span class="text-sm text-gray-600">ห้อง: {{ getTotalRoomsInBuilding(selectedBuilding._id) }}
                        ห้อง</span>
                      <span class="text-sm text-gray-600">ห้องว่างเเต่ละตึก: {{
                        getAvailableRoomsInBuilding(selectedBuilding._id) }}
                      </span>
                    </div>
                  </div>

                  <!-- ชั้นที่มีอยู่แล้ว -->
                  <div v-if="selectedBuilding.floors && selectedBuilding.floors.length > 0" class="space-y-4">
                    <div v-for="floor in selectedBuilding.floors" :key="floor.name"
                      class="border rounded-lg p-4 bg-white shadow-sm">
                      <!-- ชื่อชั้น -->
                      <div class="flex items-center justify-between mb-4">
                        <div class="space-x-4 w-1/3">
                          <label class="text-xl font-bold text-gray-800">{{ floor.name }}</label>
                        </div>

                        <div class="w-2/4 space-x-4">
                          <span class="text-sm text-gray-600">จำนวนห้อง: {{ getRoomsInFloor(selectedBuilding._id,
                            floor.name)
                            }} ห้อง</span>
                          <span class="text-sm text-gray-600">ห้องว่างเเต่ละชั้น: {{
                            getAvailableRoomsInFloor(selectedBuilding._id,
                              floor.name) }}</span>
                        </div>

                        <div class="flex space-x-2">
                          <button @click="toggleFloorExpanded(selectedBuilding._id, floor.name)"
                            class="text-blue-500 hover:text-blue-700 text-sm font-bold px-3 py-1 rounded hover:bg-blue-50">
                            {{ isFloorExpanded(selectedBuilding._id, floor.name) ? 'ซ่อนห้อง' : 'ดูห้อง' }}
                          </button>
                        </div>
                      </div>

                      <!-- ห้องพักในชั้นนี้ -->
                      <div
                        v-if="isFloorExpanded(selectedBuilding._id, floor.name) && getRoomsByBuildingAndFloor(selectedBuilding._id, floor.name).length > 0"
                        class="mb-4">

                        <div
                          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 4xl:grid-cols-5 gap-4">
                          <div v-for="room in getRoomsByBuildingAndFloor(selectedBuilding._id, floor.name)"
                            :key="room._id"
                            class="border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full relative bg-white">
                            <!-- กรอบดำทับสำหรับห้องที่ไม่ว่าง -->
                            <div v-if="room.statusRoom === 'ไม่ว่าง'"
                              class="absolute inset-0 bg-red-900 bg-opacity-30 rounded-lg pointer-events-none z-10">
                            </div>
                            <!-- กรอบดำทับสำหรับห้อง SleepGunWeb -->
                            <div v-if="room.status === 'SleepGunWeb'"
                              class="absolute inset-0 bg-black bg-opacity-20 rounded-lg pointer-events-none z-10"></div>
                            <!-- กรอบดำทับสำหรับห้องที่อยู่ในรายการ Check-in -->
                            <div v-if="isRoomInCheckInOrder(room._id)"
                              class="absolute inset-0 bg-blue-900 bg-opacity-60 rounded-lg pointer-events-none z-10">
                            </div>
                            <!-- ข้อความกำกับสำหรับห้อง SleepGunWeb -->
                            <div v-if="room.status === 'SleepGunWeb'"
                              class="absolute inset-0 flex items-start justify-center z-20 pointer-events-none">
                              <div class="relative w-full h-48">
                                <div class="absolute top-20 flex items-center justify-center w-full">
                                  <span
                                    class="text-white text-lg font-bold bg-black bg-opacity-70 px-4 py-2 rounded-lg">
                                    เปิดห้องกับ SleepGun
                                  </span>
                                </div>
                              </div>
                            </div>
                            <!-- ข้อความกำกับสำหรับห้องที่อยู่ในรายการ Check-in -->
                            <div v-if="isRoomInCheckInOrder(room._id)"
                              class="absolute inset-0 flex items-start justify-center z-20 pointer-events-none">
                              <div class="relative w-full h-48">
                                <div class="absolute top-20 flex items-center justify-center w-full">
                                  <span
                                    class="text-white text-lg font-bold bg-blue-800 bg-opacity-80 px-4 py-2 rounded-lg">
                                    กำลังดำเนินการ
                                  </span>
                                </div>
                              </div>
                            </div>

                            <!-- รูปภาพห้อง -->
                            <div class="relative mb-3">
                              <img :src="room.images?.[0]?.preview || '/imgHotel/sea.jpg'"
                                :alt="`ห้อง ${room.roomNumber}`" class="w-full h-48 object-cover rounded-lg">

                              <!-- สถานะห้อง (Badge) -->
                              <div class="absolute top-2 right-2 z-20">
                                <span :class="getStatusBadgeClass(room.statusRoom)"
                                  class="px-2 py-1 rounded-full text-xs font-bold text-white">
                                  {{ getStatusText(room.statusRoom) }}
                                </span>
                              </div>

                              <!-- ราคา -->
                              <div class="absolute bottom-2 left-2">
                                <span class="bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm font-bold">
                                  THB {{ room.price?.toLocaleString() }}
                                </span>
                              </div>
                            </div>

                            <!-- ข้อมูลห้อง -->
                            <div class="space-y-2 flex-grow">
                              <!-- เลขห้อง -->
                              <div class="flex items-center justify-between">
                                <h3 class="text-lg font-bold">
                                  ห้อง {{ room.roomNumber }}</h3>
                                <Tooltip position="bottom">
                                  <template #trigger>
                                    <button class="px-2 py-2 rounded-full shadow-md">
                                      <img src="/imgHotel/warn.png" alt="info" class="w-4 h-4"></img>
                                    </button>
                                  </template>

                                  <template #content>
                                    <div class="text-sm font-semibold bg-stone-600 rounded-lg text-white">
                                      <div class="p-4">
                                        <h3 class="text-lg font-bold pb-3">ห้อง {{ room.roomNumber }}</h3>

                                        <div class="flex items-start flex-col mb-4">
                                          <span class="font-bold">ประเภท:</span>
                                          <span :class="getTypeBadgeClass(room.typeRoom)"
                                            class=" px-2 py-1 rounded text-xs font-medium">
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

                                        <!-- ลักษณะห้องพัก -->
                                        <div v-if="room.typeRoomHotel && room.typeRoomHotel.length > 0"
                                          class="flex flex-wrap gap-1">
                                          <span v-for="tag in room.typeRoomHotel" :key="tag._id"
                                            class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                            {{ tag.name }}
                                          </span>
                                        </div>

                                        <!-- ข้อมูลตึกและชั้น -->
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

                                        <!-- สถานะการเข้าพัก -->
                                        <div class="flex items-center space-x-2">
                                          <label class="text-xs font-medium ">สถานะ:</label>
                                          <div v-if="statusEditable">
                                            <select v-model="room.status"
                                              @change="updateRoomStatus(room._id, 'status', $event.target.value)"
                                              class="text-xs border rounded px-2 py-1 flex-1"
                                              :disabled="room.status !== 'SleepGunWeb' && getSleepGunCount() >= 5">
                                              <option value="SleepGunWeb"
                                                :disabled="room.status !== 'SleepGunWeb' && getSleepGunCount() >= 5">
                                                SleepGunWeb {{ room.status !== 'SleepGunWeb' && getSleepGunCount() >= 5
                                                  ?
                                                  '(โควต้าเต็ม)'
                                                  :
                                                  '' }}
                                              </option>
                                              <option value="Walkin">Walkin</option>
                                            </select>
                                          </div>
                                          <label v-else>{{ room.status }}</label>
                                        </div>


                                        <!-- สถานะโปรโมชั่น (แสดงเฉพาะเมื่อเป็น SleepGunWeb) -->
                                        <div v-if="room.status === 'SleepGunWeb'" class="rounded">
                                          <div class="flex items-center space-x-2 mb-2">
                                            <label class="text-xs font-medium ">สถานะโปรโมชั่น:</label>
                                            <label>{{ room.statusPromotion }}</label>
                                          </div>
                                        </div>

                                      </div>
                                    </div>
                                  </template>
                                </Tooltip>
                              </div>

                              <!-- ข้อมูลพื้นฐาน -->
                              <div class="text-sm space-y-1">

                                <div class="flex items-center flex-wrap">
                                  <span class="font-bold">ประเภท:</span>
                                  <span :class="getTypeBadgeClass(room.typeRoom)"
                                    class="ml-2 px-2 py-1 rounded text-xs font-medium">
                                    {{ room.typeRoom?.mainName || room.typeRoom }}
                                  </span>
                                  <span class="ml-2">{{ room.typeRoom?.name || room.typeRoom }}, </span>
                                  <span class="ml-2">{{ room.air ||
                                    'ไม่มีแอร์' }}</span>
                                </div>
                              </div>

                              <!-- แสดง เลือกเเท็กที่เเสดง -->
                              <div v-if="room.tag && room.tag.length > 0" class="flex flex-wrap gap-1 mt-2">
                                <span v-for="tagItem in room.tag" :key="tagItem._id || tagItem"
                                  class="px-2 py-1 rounded-full text-xs text-white"
                                  :style="{ backgroundColor: getTagColor(tagItem._id || tagItem), color: getContrastColor(getTagColor(tagItem._id || tagItem)) }">
                                  {{ getTagName(tagItem._id || tagItem) }}
                                </span>
                              </div>
                            </div>

                            <!-- ตัวเลือกการจัดการ -->
                            <div class="mt-4">
                              <hr class="border border-gray-200" />
                            </div>

                            <!-- สถานะห้อง -->
                            <div class="text-xs flex items-end justify-end mt-1 mb-5">
                              <span v-if="room.buildingId">ตึก {{ getBuildingName(room.buildingId) }}</span>
                              <span v-if="room.floor">, ชั้น {{ room.floor }}</span>
                            </div>

                            <div class="space-y-2 mt-auto relative z-20">
                              <!-- ปุ่มสำหรับ employee -->
                              <!-- ปุ่ม Check In และ Check Out -->
                              <div v-if="room.statusRoom !== 'กำลังทำความสะอาด'" class="flex space-x-2 mt-3">
                                <button v-if="room.statusRoom === 'ว่าง' && !isRoomInCheckInOrder(room._id)"
                                  @click="checkInRoom(room)"
                                  class="flex-1 bg-green-500 text-white text-xs py-2 px-3 rounded hover:bg-green-600 transition">
                                  Check In
                                </button>

                                <button v-if="room.statusRoom === 'ไม่ว่าง'" @click="checkOutRoom(room)"
                                  class="flex-1 bg-red-500 text-white text-xs py-2 px-3 rounded hover:bg-red-600 transition">
                                  Check Out
                                </button>
                              </div>

                              <!-- ปุ่มทำความสะอาดเสร็จแล้ว -->
                              <div v-if="room.statusRoom === 'กำลังทำความสะอาด'" class="mt-2">
                                <button @click="finishCleaning(room)"
                                  class="w-full bg-blue-500 text-white text-xs py-2 px-3 rounded hover:bg-blue-600 transition">
                                  ทำความสะอาดเสร็จแล้ว
                                </button>
                              </div>

                              <!-- ปุ่มลบออกจากรายการ Check-in สำหรับห้องที่อยู่ในรายการแล้ว -->
                              <div v-if="isRoomInCheckInOrder(room._id)" class="mt-2">
                                <button @click="removeRoomFromCheckIn(room._id)"
                                  class="w-full bg-orange-500 text-white text-xs py-2 px-3 rounded hover:bg-orange-600 transition">
                                  ลบออกจากรายการ
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- แสดงข้อความเมื่อไม่มีห้องในชั้นนี้ -->
                      <div
                        v-if="isFloorExpanded(selectedBuilding._id, floor.name) && getRoomsByBuildingAndFloor(selectedBuilding._id, floor.name).length === 0"
                        class="text-center py-8 text-gray-500">
                        <p>ไม่มีห้องในชั้นนี้</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- แสดงข้อความเมื่อยังไม่ได้เลือกตึก -->
                <div v-else-if="buildings.length > 0" class="text-center py-12">
                  <div class="text-gray-500 text-lg">
                    <p>กรุณาเลือกตึกเพื่อดูชั้นและห้อง</p>
                  </div>
                </div>
              </div>

              <!-- แสดงข้อความเมื่อไม่มีตึก -->
              <div v-else class="text-center py-12">
                <div class="text-gray-500 text-lg">
                  <p>ยังไม่มีตึก กรุณาติดต่อผู้ดูแลระบบ</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- Drawer - Fixed Position -->
        <div class="hidden xl:block">
          <div v-if="isDrawerVisible"
            class="w-full md:w-96 lg:w-[475px] bg-white shadow-xl border-l transition-all duration-300 h-screen flex flex-col fixed top-0 right-0 z-50">
            <div class="flex justify-between items-center py-4 px-6 border-b bg-white flex-shrink-0">
              <h2 class="text-lg font-semibold">Check-In Order</h2>
              <button @click="closeDrawer" class="text-gray-500 hover:text-gray-800">X</button>
            </div>
            <div class="flex-1 overflow-y-auto">
              <div class="p-4">
                <CheckInOrder @showPaymentModal="showPaymentModal" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </TemplateEmployee>


  <!-- วิธีการชำระเงิน -->
  <div v-if="showPaymentPopup" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] flex flex-col mx-4 overflow-y-auto">
      <div class="flex justify-between items-center p-4 border-b">
        <h2 class="text-lg font-bold">ชำระเงิน</h2>
        <button @click="closePaymentModal" class="text-xl font-bold hover:text-gray-600">x</button>
      </div>

      <div class="flex-1 p-4">
        <div class="flex flex-col justify-center items-center my-4">
          <label class="text-2xl font-bold">ชำระเงิน</label>
          <label class="text-sm text-gray-500">เลือกวิธีการชำระเงิน</label>
        </div>

        <!-- ข้อมูลลูกค้า TOSSAGUN -->
        <div class="border bg-amber-50 border-amber-500 rounded-md p-4 mx-6 my-4">
          <div>
            <label class="font-bold">ลูกค้าที่เป็นสมาชิกกับ TOSSAGUN</label>

            <div class="flex flex-col mt-2">
              <label class="text-sm text-stone-500">กรอกหมายเลขโทรศัพท์</label>
              <div class="flex w-full space-x-2 mt-1">
                <input v-model="tossagunPhone" type="text" class="border rounded-md p-2 flex-1"
                  placeholder="กรอกหมายเลขโทรศัพท์" />
                <button @click="checkTossagunPhone"
                  class="bg-blue-400 text-white rounded-md p-2 px-4 whitespace-nowrap hover:bg-blue-500">
                  ตรวจสอบ
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- รายการห้องพัก -->
        <div class="p-4 mx-6 mb-4">
          <div>
            <label class="font-bold">รายการห้องพักจำนวน {{ paymentData?.totalRooms || 0 }} ห้อง</label>

            <!-- แสดงรายการห้องแต่ละห้อง -->
            <div v-if="paymentData?.selectedRooms" class="space-y-3 mt-2">
              <div v-for="(room, index) in paymentData.selectedRooms" :key="room._id"
                class="flex flex-col px-4 py-2 rounded-md border bg-white">
                <div class="flex justify-end">
                  <label class="text-sm text-gray-500">รายการที่ {{ index + 1 }}</label>
                </div>
                <div>
                  <hr class="border border-gray-200" />
                </div>
                <div class="flex justify-between items-center mt-2">
                  <div class="flex-1">
                    <div class="text-lg font-semibold">
                      <label>หมายเลขห้อง {{ room.roomNumber }}</label>
                    </div>
                    <div class="flex flex-col text-sm text-stone-500 mt-2 space-y-1 px-4">
                      <label>ประเภทห้อง: {{ room.typeRoom?.mainName || room.typeRoom }} {{ room.typeRoom?.name || ''
                        }}</label>
                      <label>พัดลม/แอร์: {{ room.air || 'ไม่มีแอร์' }}</label>
                      <label>ค่ามัดจำ: {{ room.deposit?.toLocaleString() || 0 }} THB</label>
                      <label>ค่าเตียงเพิ่ม: {{ room.extraBedPrice?.toLocaleString() || 0 }} THB</label>
                      <label>ค่าเข้าพักก่อนเวลา: {{ room.earlyCheckInPrice?.toLocaleString() || 0 }} THB</label>
                    </div>
                  </div>

                  <div class="text-right">
                    <label class="text-lg font-bold">{{ (room.basePrice + (room.deposit || 0) + (room.extraBedPrice ||
                      0)
                      + (room.earlyCheckInPrice || 0))?.toLocaleString() || 0 }} THB</label>
                  </div>
                </div>
              </div>
            </div>

            <!-- สรุปราคา -->
            <div class="mt-4 p-4 bg-gray-50 rounded-md">
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span>ราคาห้องทั้งหมด:</span>
                  <span>{{ paymentData?.totalBasePrice?.toLocaleString() || 0 }} THB</span>
                </div>
                <div class="flex justify-between">
                  <span>ค่ามัดจำรวม:</span>
                  <span>{{ paymentData?.totalDeposit?.toLocaleString() || 0 }} THB</span>
                </div>
                <div class="flex justify-between">
                  <span>ค่าเตียงรวม:</span>
                  <span>{{ paymentData?.totalExtraBedPrice?.toLocaleString() || 0 }} THB</span>
                </div>
                <div class="flex justify-between">
                  <span>ค่าเข้าพักก่อนเวลารวม:</span>
                  <span>{{ paymentData?.totalEarlyCheckInPrice?.toLocaleString() || 0 }} THB</span>
                </div>
                <hr class="border border-gray-300">
                <div class="flex justify-between font-semibold">
                  <span>รวมยอด:</span>
                  <span>{{ paymentData?.subtotal?.toLocaleString() || 0 }} THB</span>
                </div>
                <div class="flex justify-between">
                  <span>ภาษี 7%:</span>
                  <span>{{ paymentData?.tax?.toLocaleString() || 0 }} THB</span>
                </div>
                <hr class="border border-gray-300">
                <div class="flex justify-between text-lg font-bold">
                  <span>ยอดรวมทั้งหมด:</span>
                  <span>{{ paymentData?.grandTotal?.toLocaleString() || 0 }} THB</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="p-4 mx-6">
          <hr class="border border-gray-200" />
        </div>

        <!-- วิธีการชำระเงิน -->
        <div class="p-4 mx-6 mb-4">
          <div>
            <label class="font-bold">เลือกวิธีการชำระเงิน</label>
          </div>
          <div class="flex justify-center space-x-4 mt-4">
            <div @click="selectPaymentMethod('cash')" :class="[
              'border rounded-md p-4 w-[180px] h-[100px] flex items-center justify-center cursor-pointer transition-all duration-300',
              selectedPaymentMethod === 'cash'
                ? 'border-green-600 bg-green-50'
                : 'border-stone-400 bg-stone-50 hover:bg-green-50 hover:border-green-600'
            ]">
              <label class="font-semibold">เงินสด</label>
            </div>
            <div @click="selectPaymentMethod('ewallet')" :class="[
              'border rounded-md p-4 w-[180px] h-[100px] flex items-center justify-center cursor-pointer transition-all duration-300',
              selectedPaymentMethod === 'ewallet'
                ? 'border-green-600 bg-green-50'
                : 'border-stone-400 bg-stone-50 hover:bg-green-50 hover:border-green-600'
            ]">
              <label class="font-semibold">E-Wallet</label>
            </div>
          </div>
        </div>

        <div class="p-4 mx-6">
          <hr class="border border-gray-200" />
        </div>

        <!-- ปุ่มชำระเงิน -->
        <div class="flex justify-end items-end px-6 mb-8">
          <button @click="processPayment" :disabled="!selectedPaymentMethod"
            class="text-lg font-bold bg-red-500 text-white rounded-md p-2 px-4 whitespace-nowrap hover:bg-red-600 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed">
            ชำระเงิน
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Tooltip from "@/components/element/Tooltip.vue";
import TemplateEmployee from "@/components/TemplateEmployee.vue";
import DatePicker from "@/components/element/DatePicker.vue";
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import Drawer from '@/components/element/Drawer.vue'
import CheckInOrder from '@/views/Partner/Employee/POS/CheckInOrder.vue'
import { useCheckInStore } from '@/stores/checkInStore';
import { useAuthStore } from '@/stores/auth';

const isDrawerVisible = ref(false)
const wasDrawerOpenBeforeResize = ref(false) // จำสถานะ drawer ก่อน resize

// Initialize stores
const checkInStore = useCheckInStore();
const authStore = useAuthStore();

// ฟังก์ชันตรวจสอบขนาดหน้าจอ
const checkScreenSize = () => {
  const isXlScreen = window.innerWidth >= 1280; // xl = 1280px

  if (!isXlScreen) {
    // หน้าจอเล็กกว่า xl
    if (isDrawerVisible.value) {
      wasDrawerOpenBeforeResize.value = true; // จำว่าเคยเปิดอยู่
      isDrawerVisible.value = false; // ปิด drawer
    }
  } else {
    // หน้าจอใหญ่กว่าหรือเท่ากับ xl
    if (wasDrawerOpenBeforeResize.value) {
      isDrawerVisible.value = true; // เปิด drawer กลับมา
      wasDrawerOpenBeforeResize.value = false; // รีเซ็ตสถานะ
    }
  }
};

// ฟังก์ชันจัดการ resize
const handleResize = () => {
  checkScreenSize();
};

// ฟังก์ชันปิด drawer (เมื่อผู้ใช้กดปุ่มปิด)
const closeDrawer = () => {
  isDrawerVisible.value = false;
  wasDrawerOpenBeforeResize.value = false; // รีเซ็ตสถานะเมื่อผู้ใช้ปิดเอง
};

// ฟังก์ชันเปิด drawer (เมื่อผู้ใช้กดปุ่มเปิด)
const openDrawer = () => {
  isDrawerVisible.value = true;
  wasDrawerOpenBeforeResize.value = false; // รีเซ็ตสถานะเมื่อผู้ใช้เปิดเอง
};

// Reactive variables
const tags = ref([]); // รายการแท็กทั้งหมด
const buildings = ref([]); // รายการตึกทั้งหมด
const rooms = ref([]); // รายการห้องทั้งหมด
const posSummary = ref({}); // สรุปข้อมูล POS
const loading = ref(false); // สถานะการโหลด
const statusEditable = ref(false); // สถานะการเปิด/ปิดการแสดงสถานะแบบ dropdown
const statusRoomEditable = ref(false); // สถานะการเปิด/ปิดการแสดงสถานะห้องแบบ dropdown
const expandedFloors = ref([]); // ชั้นที่ขยายแล้ว
const collapsedFloors = ref([]); // ชั้นที่ถูกซ่อนไว้
const isFirstLoad = ref(true); // สถานะการโหลดครั้งแรก
const selectedBuildingId = ref(''); // ตึกที่เลือก

// ตัวแปรสำหรับการค้นหาห้องว่าง
const selectedDateRange = ref(''); // ช่วงวันที่ที่เลือก
const dateRangeData = ref(null); // ข้อมูลวันที่เริ่มต้นและสิ้นสุด
const isSearching = ref(false); // สถานะการค้นหา
const searchResults = ref([]); // ผลการค้นหา
const searchSummary = ref({}); // สรุปผลการค้นหา
const searchCriteria = ref({}); // เกณฑ์การค้นหา

// ฟังก์ชันสำหรับคำนวณสีข้อความที่เหมาะสมกับพื้นหลัง
function getContrastColor(hexColor) {
  if (!hexColor) return '#000000';
  // แปลง hex เป็น RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  // คำนวณความสว่าง
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // ส่งคืนสีขาวหรือดำตามความสว่าง
  return brightness > 128 ? '#000000' : '#ffffff';
}

// ฟังก์ชันสำหรับแสดงสถานะห้อง
function getStatusText(status) {
  switch (status) {
    case 'ว่าง': return 'ว่าง';
    case 'ไม่ว่าง': return 'ไม่ว่าง';
    case 'กำลังทำความสะอาด': return 'กำลังทำความสะอาด';
    default: return status || 'ไม่ทราบ';
  }
}

// ฟังก์ชันสำหรับสี badge สถานะห้อง
function getStatusBadgeClass(status) {
  switch (status) {
    case 'ว่าง': return 'bg-green-500'; // ว่าง
    case 'ไม่ว่าง': return 'bg-red-500';   // ไม่ว่าง
    case 'กำลังทำความสะอาด': return 'bg-yellow-500'; // กำลังทำความสะอาด
    default: return 'bg-gray-500';
  }
}

// ฟังก์ชันสำหรับสี badge ประเภทห้อง
function getTypeBadgeClass(type) {
  // ถ้า type เป็น object ให้ใช้ name property
  const typeName = typeof type === 'object' && type !== null ? type.name : type;

  switch (typeName) {
    case 'Standard': return 'bg-blue-100 text-blue-800';
    case 'Deluxe': return 'bg-purple-100 text-purple-800';
    case 'Suite': return 'bg-yellow-100 text-yellow-800';
    case 'VIP': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

function getTagName(tagId) {
  if (!tagId) return '';
  const tag = tags.value.find(t => t._id === tagId);
  return tag ? tag.name : `Unknown Tag (${tagId})`;
}

function getTagColor(tagId) {
  if (!tagId) return '#888';
  const tag = tags.value.find(t => t._id === tagId);
  return tag ? tag.color : '#888';
}

// ฟังก์ชันนับจำนวนห้องที่เป็น SleepGunWeb
function getSleepGunCount() {
  return rooms.value.filter(room => room.status === 'SleepGunWeb').length;
}

// ฟังก์ชันอัปเดตสถานะห้อง
async function updateRoomStatus(roomId, field, value) {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('ไม่พบ token กรุณาเข้าสู่ระบบใหม่');
    }

    // กำหนด endpoint ตาม field type
    let endpoint;
    let requestBody;

    switch (field) {
      case 'status':
        endpoint = `/status`;
        requestBody = { status: value };
        break;
      case 'statusRoom':
        endpoint = `/status-room`;
        requestBody = { statusRoom: value };
        break;
      case 'statusPromotion':
        endpoint = `/status-promotion`;
        requestBody = { statusPromotion: value };
        break;
      default:
        throw new Error('Invalid field type');
    }

    const response = await fetch(`http://localhost:9999/HotelSleepGun/pos/rooms/${roomId}${endpoint}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    const result = await response.json();

    if (!response.ok) {
      // จัดการข้อผิดพลาดโควต้าเป็นพิเศษ
      if (result.message && result.message.includes('โควต้า')) {
        throw new Error(`⚠️ ${result.message}\n\nห้องที่เป็น SleepGunWeb: ${result.currentCount || 0}/${result.maxQuota || 5} ห้อง\n\nกรุณาเปลี่ยนห้องอื่นเป็น Walkin ก่อน`);
      }
      throw new Error(result.message || 'เกิดข้อผิดพลาดในการอัปเดตสถานะ');
    }

    console.log('✅ Room status updated successfully');

    // รีเฟรชข้อมูลห้องและสถิติ
    await loadRooms();
    await refreshPosData();

  } catch (error) {
    console.error('❌ Error updating room status:', error);
    alert(`เกิดข้อผิดพลาดในการอัปเดตสถานะ: ${error.message}`);
  }
}

// ฟังก์ชันโหลดข้อมูลห้อง
async function loadRooms() {
  try {
    loading.value = true;
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:9999/HotelSleepGun/pos/rooms', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();
    // ตรวจสอบว่า data เป็น array หรือมี data.data
    rooms.value = Array.isArray(data) ? data : (data.data || []);

  } catch (error) {
    console.error('❌ Error loading rooms:', error);
  } finally {
    loading.value = false;
  }
}

// ฟังก์ชันดึงข้อมูลสถิติ POS
async function getPOSStatistics() {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('ไม่พบ token กรุณาเข้าสู่ระบบใหม่');
    }

    const response = await fetch('http://localhost:9999/HotelSleepGun/pos/pos-summary', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'เกิดข้อผิดพลาดในการดึงข้อมูลสถิติ POS');
    }

    return result.data;
  } catch (error) {
    console.error('❌ Error fetching POS statistics:', error);
    throw error;
  }
}

// ฟังก์ชันดึงข้อมูลตึกทั้งหมด
async function getAllBuildings() {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('ไม่พบ token กรุณาเข้าสู่ระบบใหม่');
    }

    const response = await fetch('http://localhost:9999/HotelSleepGun/pos/buildings', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'เกิดข้อผิดพลาดในการดึงข้อมูลตึก');
    }

    return result.data;
  } catch (error) {
    console.error('❌ Error fetching buildings:', error);
    throw error;
  }
}

// ฟังก์ชันรีเฟรชข้อมูล POS
const refreshPosData = async () => {
  try {
    const posSummaryResult = await getPOSStatistics();

    // อัปเดตสถิติ
    if (posSummaryResult) {
      posSummary.value = {
        totalRoomCount: posSummaryResult.totalRoomCount || 0,
        totalRoomCountSleepGun: posSummaryResult.totalRoomCountSleepGun || 0,
        totalBuildingCount: posSummaryResult.totalBuildingCount || 0,
        totalFloorCount: posSummaryResult.totalFloorCount || 0,
        totalPosRecords: posSummaryResult.totalPosRecords || 0
      };
    }

    // รีเฟรชข้อมูลแท็กและตึก
    try {
      const token = localStorage.getItem('token');

      // โหลดข้อมูลแท็ก
      const tagsResponse = await fetch('http://localhost:9999/HotelSleepGun/pos/tags', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const tagsResult = await tagsResponse.json();
      if (tagsResponse.ok) {
        tags.value = tagsResult.data || [];
      }

      // โหลดข้อมูลตึก
      const buildingsResponse = await fetch('http://localhost:9999/HotelSleepGun/pos/buildings', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const buildingsResult = await buildingsResponse.json();
      if (buildingsResponse.ok) {
        buildings.value = buildingsResult.data || [];
      }
    } catch (error) {
      console.error('❌ Error refreshing tags/buildings:', error);
    }
  } catch (error) {
    console.error('❌ Error refreshing POS data:', error);
  }
};

// ฟังก์ชันสำหรับสลับการแสดง/ซ่อนชั้น
const toggleFloorExpanded = (buildingId, floorName) => {
  const key = `${buildingId}-${floorName}`;

  // ตรวจสอบว่าชั้นนี้ถูกซ่อนไว้หรือไม่
  const isCollapsed = collapsedFloors.value.includes(key);

  if (isCollapsed) {
    // ถ้าชั้นถูกซ่อนไว้ ให้แสดงชั้น
    const collapsedIndex = collapsedFloors.value.indexOf(key);
    collapsedFloors.value.splice(collapsedIndex, 1);
  } else {
    // ถ้าชั้นแสดงอยู่ ให้ซ่อนชั้น
    collapsedFloors.value.push(key);
  }
};

// ฟังก์ชันสำหรับตรวจสอบว่าชั้นขยายแล้วหรือไม่
const isFloorExpanded = (buildingId, floorName) => {
  const key = `${buildingId}-${floorName}`;

  // ถ้าเป็นการโหลดครั้งแรก ให้แสดงทุกชั้น
  if (isFirstLoad.value) {
    return true;
  }

  // ตรวจสอบว่าชั้นนี้ถูกซ่อนไว้หรือไม่
  return !collapsedFloors.value.includes(key);
};

// ฟังก์ชันสำหรับเลือกตึก
const selectBuilding = (buildingId) => {
  // ถ้ากดตึกเดิมซ้ำ ให้ปิดการแสดง
  if (selectedBuildingId.value === buildingId) {
    selectedBuildingId.value = null;
  } else {
    // ถ้ากดตึกใหม่ ให้แสดงตึกนั้น
    selectedBuildingId.value = buildingId;
  }
  // ไม่ต้องล้างข้อมูลชั้นที่ซ่อนไว้เมื่อเปลี่ยนตึก เพื่อให้จำสถานะได้
};

// Computed property สำหรับตึกที่เลือก
const selectedBuilding = computed(() => {
  return buildings.value.find(b => b._id === selectedBuildingId.value);
});

// ตัวแปรสำหรับเก็บประเภทการค้นหา
const searchType = ref(''); // 'available', 'checked-out', 'cleaning'

// Computed property สำหรับตรวจสอบว่ามีผลการค้นหาห้องว่างหรือไม่
const hasSearchResults = computed(() => {
  return searchResults.value && searchResults.value.length > 0;
});

// ตัวแปรสำหรับ popup การชำระเงิน
const showPaymentPopup = ref(false);
const paymentData = ref(null);
const selectedPaymentMethod = ref('');
const tossagunPhone = ref('');

// ฟังก์ชันสำหรับดึงห้องตามตึกและชั้น (รวมฟิลเตอร์ตามประเภทการค้นหา)
const getRoomsByBuildingAndFloor = (buildingId, floorName) => {
  let filteredRooms = rooms.value.filter(room => {
    let roomBuildingId;
    if (typeof room.buildingId === 'object' && room.buildingId !== null) {
      roomBuildingId = room.buildingId._id || room.buildingId;
    } else {
      roomBuildingId = room.buildingId;
    }
    const buildingMatch = String(roomBuildingId) === String(buildingId);
    const floorMatch = String(room.floor) === String(floorName);
    return buildingMatch && floorMatch;
  });

  // ถ้ามีการค้นหา ให้ฟิลเตอร์ตามประเภทการค้นหา
  if (hasSearchResults.value) {
    switch (searchType.value) {
      case 'available':
        filteredRooms = filteredRooms.filter(room => room.statusRoom === 'ว่าง');
        break;
      case 'checked-out':
        filteredRooms = filteredRooms.filter(room => room.statusRoom === 'ไม่ว่าง');
        break;
      case 'cleaning':
        filteredRooms = filteredRooms.filter(room => room.statusRoom === 'กำลังทำความสะอาด');
        break;
    }
  }

  return filteredRooms;
};

// ฟังก์ชันสำหรับนับจำนวนห้องในแต่ละชั้น (รวมฟิลเตอร์ตามประเภทการค้นหา)
const getRoomsInFloor = (buildingId, floorName) => {
  let filteredRooms = rooms.value.filter(room => {
    let roomBuildingId;
    if (typeof room.buildingId === 'object' && room.buildingId !== null) {
      roomBuildingId = room.buildingId._id || room.buildingId;
    } else {
      roomBuildingId = room.buildingId;
    }

    const buildingMatch = String(roomBuildingId) === String(buildingId);
    const floorMatch = room.floor === floorName;

    return buildingMatch && floorMatch;
  });

  // ถ้ามีการค้นหา ให้ฟิลเตอร์ตามประเภทการค้นหา
  if (hasSearchResults.value) {
    switch (searchType.value) {
      case 'available':
        filteredRooms = filteredRooms.filter(room => room.statusRoom === 'ว่าง');
        break;
      case 'checked-out':
        filteredRooms = filteredRooms.filter(room => room.statusRoom === 'ไม่ว่าง');
        break;
      case 'cleaning':
        filteredRooms = filteredRooms.filter(room => room.statusRoom === 'กำลังทำความสะอาด');
        break;
    }
  }

  return filteredRooms.length;
};

// ฟังก์ชันสำหรับนับจำนวนห้องทั้งหมดในตึกที่เลือก (รวมฟิลเตอร์ตามประเภทการค้นหา)
const getTotalRoomsInBuilding = (buildingId) => {
  let filteredRooms = rooms.value.filter(room => {
    let roomBuildingId;
    if (typeof room.buildingId === 'object' && room.buildingId !== null) {
      roomBuildingId = room.buildingId._id || room.buildingId;
    } else {
      roomBuildingId = room.buildingId;
    }
    return String(roomBuildingId) === String(buildingId);
  });

  // ถ้ามีการค้นหา ให้ฟิลเตอร์ตามประเภทการค้นหา
  if (hasSearchResults.value) {
    switch (searchType.value) {
      case 'available':
        filteredRooms = filteredRooms.filter(room => room.statusRoom === 'ว่าง');
        break;
      case 'checked-out':
        filteredRooms = filteredRooms.filter(room => room.statusRoom === 'ไม่ว่าง');
        break;
      case 'cleaning':
        filteredRooms = filteredRooms.filter(room => room.statusRoom === 'กำลังทำความสะอาด');
        break;
    }
  }

  return filteredRooms.length;
};

// ฟังก์ชันคำนวณจำนวนห้องว่างทั้งหมด
const getTotalAvailableRooms = () => {
  return rooms.value.filter(room => room.statusRoom === 'ว่าง').length;
};

// ฟังก์ชันคำนวณจำนวนห้องว่างในแต่ละตึก
const getAvailableRoomsInBuilding = (buildingId) => {
  return rooms.value.filter(room => {
    let roomBuildingId;
    if (typeof room.buildingId === 'object' && room.buildingId !== null) {
      roomBuildingId = room.buildingId._id || room.buildingId;
    } else {
      roomBuildingId = room.buildingId;
    }
    const buildingMatch = String(roomBuildingId) === String(buildingId);
    const isAvailable = room.statusRoom === 'ว่าง';
    return buildingMatch && isAvailable;
  }).length;
};

// ฟังก์ชันคำนวณจำนวนห้องว่างในแต่ละชั้น
const getAvailableRoomsInFloor = (buildingId, floorName) => {
  return rooms.value.filter(room => {
    let roomBuildingId;
    if (typeof room.buildingId === 'object' && room.buildingId !== null) {
      roomBuildingId = room.buildingId._id || room.buildingId;
    } else {
      roomBuildingId = room.buildingId;
    }
    const buildingMatch = String(roomBuildingId) === String(buildingId);
    const floorMatch = String(room.floor) === String(floorName);
    const isAvailable = room.statusRoom === 'ว่าง';
    return buildingMatch && floorMatch && isAvailable;
  }).length;
};

// ฟังก์ชันสำหรับดึงชื่อตึกจาก buildingId
const getBuildingName = (buildingId) => {
  if (!buildingId) return 'ไม่พบตึก';

  // ถ้า buildingId เป็น object ให้ใช้ _id
  let idToSearch;
  if (typeof buildingId === 'object' && buildingId !== null) {
    idToSearch = buildingId._id || buildingId;
  } else {
    idToSearch = buildingId;
  }

  const building = buildings.value.find(b => String(b._id) === String(idToSearch));
  return building ? building.nameBuilding : 'ไม่พบตึก';
};

// ฟังก์ชันเปิด/ปิดการแสดงสถานะแบบ dropdown
const openStatusEditablePopup = () => {
  statusEditable.value = !statusEditable.value;
};

// ฟังก์ชันเปิด/ปิดการแสดงสถานะห้องแบบ dropdown
const openStatusRoomEditablePopup = () => {
  statusRoomEditable.value = !statusRoomEditable.value;
};

// ฟังก์ชันจัดการเมื่อเลือกช่วงวันที่
const handleDateRangeSelected = (dateRange) => {
  dateRangeData.value = dateRange;
  console.log('📅 Date range selected:', dateRange);

  // ถ้าเป็นการตั้งค่าเริ่มต้น ให้ค้นหาห้องว่างอัตโนมัติ
  if (dateRange && isFirstLoad.value) {
    setTimeout(async () => {
      console.log('🔍 Auto-searching available rooms on first load...');
      await searchAvailableRooms();
    }, 200);
  }
};

// ฟังก์ชันค้นหาห้องว่างตามช่วงวันที่
const searchAvailableRooms = async () => {
  try {
    if (!dateRangeData.value) {
      alert('กรุณาเลือกช่วงวันที่ก่อน');
      return;
    }

    isSearching.value = true;
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('ไม่พบ token กรุณาเข้าสู่ระบบใหม่');
    }

    // ตรวจสอบว่าเป็นวันเดียวหรือหลายวัน
    const isSingleDay = dateRangeData.value.startDate === dateRangeData.value.endDate;

    console.log('🔍 Searching for:', isSingleDay ? 'single day' : 'date range', dateRangeData.value);

    const response = await fetch('http://localhost:9999/HotelSleepGun/pos/rooms/search-by-date', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        startDate: dateRangeData.value.startDate,
        endDate: dateRangeData.value.endDate
      })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'เกิดข้อผิดพลาดในการค้นหาห้องว่าง');
    }

    // อัปเดตผลการค้นหา
    searchResults.value = result.data.rooms;
    searchSummary.value = result.data.summary;
    searchCriteria.value = result.data.searchCriteria;
    searchType.value = 'available';

    console.log('✅ Search results:', result.data);

  } catch (error) {
    console.error('❌ Error searching available rooms:', error);
    alert(`เกิดข้อผิดพลาดในการค้นหาห้องว่าง: ${error.message}`);
  } finally {
    isSearching.value = false;
  }
};

// ฟังก์ชันค้นหาห้องที่ check-out (ห้องไม่ว่าง)
const searchCheckedOutRooms = async () => {
  try {
    if (!dateRangeData.value) {
      alert('กรุณาเลือกช่วงวันที่ก่อน');
      return;
    }

    isSearching.value = true;
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('ไม่พบ token กรุณาเข้าสู่ระบบใหม่');
    }

    const response = await fetch('http://localhost:9999/HotelSleepGun/pos/rooms/search-checked-out', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        startDate: dateRangeData.value.startDate,
        endDate: dateRangeData.value.endDate
      })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'เกิดข้อผิดพลาดในการค้นหาห้องที่ check-out');
    }

    // อัปเดตผลการค้นหา
    searchResults.value = result.data.rooms;
    searchSummary.value = result.data.summary;
    searchCriteria.value = result.data.searchCriteria;
    searchType.value = 'checked-out';

    console.log('✅ Checked out rooms search results:', result.data);

  } catch (error) {
    console.error('❌ Error searching checked out rooms:', error);
    alert(`เกิดข้อผิดพลาดในการค้นหาห้องที่ check-out: ${error.message}`);
  } finally {
    isSearching.value = false;
  }
};

// ฟังก์ชันค้นหาห้องกำลังทำความสะอาด
const searchCleaningRooms = async () => {
  try {
    if (!dateRangeData.value) {
      alert('กรุณาเลือกช่วงวันที่ก่อน');
      return;
    }

    isSearching.value = true;
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('ไม่พบ token กรุณาเข้าสู่ระบบใหม่');
    }

    const response = await fetch('http://localhost:9999/HotelSleepGun/pos/rooms/search-cleaning', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        startDate: dateRangeData.value.startDate,
        endDate: dateRangeData.value.endDate
      })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'เกิดข้อผิดพลาดในการค้นหาห้องกำลังทำความสะอาด');
    }

    // อัปเดตผลการค้นหา
    searchResults.value = result.data.rooms;
    searchSummary.value = result.data.summary;
    searchCriteria.value = result.data.searchCriteria;
    searchType.value = 'cleaning';

    console.log('✅ Cleaning rooms search results:', result.data);

  } catch (error) {
    console.error('❌ Error searching cleaning rooms:', error);
    alert(`เกิดข้อผิดพลาดในการค้นหาห้องกำลังทำความสะอาด: ${error.message}`);
  } finally {
    isSearching.value = false;
  }
};

// ฟังก์ชันล้างการค้นหา
const clearSearch = () => {
  // ล้างข้อมูลการค้นหา
  searchResults.value = [];
  searchSummary.value = {};
  searchCriteria.value = {};
  searchType.value = '';
  selectedDateRange.value = '';
  dateRangeData.value = null;

  console.log('✅ Search cleared successfully');
};

// ฟังก์ชันจัดรูปแบบวันที่เป็น dd-mm-yyyy
const formatDateForAlert = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

// ฟังก์ชันจัดรูปแบบช่วงวันที่
const formatDateRange = (startDate, endDate) => {
  if (!startDate || !endDate) return '';

  const start = new Date(startDate);
  const end = new Date(endDate);

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return `${formatDate(start)} - ${formatDate(end)}`;
};

// ฟังก์ชันตรวจสอบว่าห้องอยู่ในรายการ Check-in หรือไม่
const isRoomInCheckInOrder = (roomId) => {
  return checkInStore.selectedRooms.some(room => room._id === roomId);
};

// ฟังก์ชัน Check In
const checkInRoom = async (room) => {
  try {
    if (room.statusRoom !== 'ว่าง') {
      alert('ห้องนี้ไม่ว่าง ไม่สามารถ Check In ได้');
      return;
    }

    // เพิ่มห้องลงใน store
    const success = checkInStore.addRoom(room);
    if (!success) {
      alert('ห้องนี้ถูกเลือกไปแล้ว');
      return;
    }

    // ตั้งค่าข้อมูลพนักงานถ้ายังไม่ได้ตั้งค่า
    if (!checkInStore.employeeData.id) {
      const currentUser = authStore.user;
      checkInStore.setEmployeeData({
        id: currentUser.id,
        firstname: currentUser.fullName.split(' ')[0] || '',
        lastname: currentUser.fullName.split(' ').slice(1).join(' ') || '',
        employeeCode: currentUser.username || '',
        positionEmployee: 'พนักงานต้อนรับ'
      });
    }

    // เปิด drawer เพื่อแสดงข้อมูล Check-in
    openDrawer();

    alert(`เพิ่มห้อง ${room.roomNumber} ลงในรายการ Check-in แล้ว`);

  } catch (error) {
    console.error('❌ Error during check in:', error);
    alert(`เกิดข้อผิดพลาดในการ Check In: ${error.message}`);
  }
};

// ฟังก์ชันลบห้องออกจากรายการ Check-in
const removeRoomFromCheckIn = (roomId) => {
  try {
    const success = checkInStore.removeRoom(roomId);
    if (success) {
      alert('ลบห้องออกจากรายการ Check-in แล้ว');
    } else {
      alert('ไม่พบห้องในรายการ Check-in');
    }
  } catch (error) {
    console.error('❌ Error removing room from check-in:', error);
    alert(`เกิดข้อผิดพลาดในการลบห้อง: ${error.message}`);
  }
};

// ฟังก์ชัน Check Out
const checkOutRoom = async (room) => {
  try {
    if (room.statusRoom === 'ว่าง') {
      alert('ห้องนี้ว่างอยู่ ไม่สามารถ Check Out ได้');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('ไม่พบ token กรุณาเข้าสู่ระบบใหม่');
    }

    // อัปเดตสถานะห้องเป็น "กำลังทำความสะอาด"
    await updateRoomStatus(room._id, 'statusRoom', 'กำลังทำความสะอาด');

    alert(`Check Out ห้อง ${room.roomNumber} สำเร็จ`);

  } catch (error) {
    console.error('❌ Error during check out:', error);
    alert(`เกิดข้อผิดพลาดในการ Check Out: ${error.message}`);
  }
};

// ฟังก์ชันทำความสะอาดเสร็จแล้ว
const finishCleaning = async (room) => {
  try {
    if (room.statusRoom !== 'กำลังทำความสะอาด') {
      alert('ห้องนี้ไม่ได้อยู่ในสถานะกำลังทำความสะอาด');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('ไม่พบ token กรุณาเข้าสู่ระบบใหม่');
    }

    // อัปเดตสถานะห้องเป็น "ว่าง"
    await updateRoomStatus(room._id, 'statusRoom', 'ว่าง');

    alert(`ทำความสะอาดห้อง ${room.roomNumber} เสร็จแล้ว`);

  } catch (error) {
    console.error('❌ Error during finish cleaning:', error);
    alert(`เกิดข้อผิดพลาดในการอัปเดตสถานะ: ${error.message}`);
  }
};

// ฟังก์ชันแสดง popup การชำระเงิน
const showPaymentModal = (data) => {
  paymentData.value = data;
  showPaymentPopup.value = true;
  console.log('Payment data received:', data);
};

// ฟังก์ชันปิด popup การชำระเงิน
const closePaymentModal = () => {
  showPaymentPopup.value = false;
  paymentData.value = null;
  selectedPaymentMethod.value = '';
  tossagunPhone.value = '';
};

// ฟังก์ชันเลือกวิธีการชำระเงิน
const selectPaymentMethod = (method) => {
  selectedPaymentMethod.value = method;
};

// ฟังก์ชันตรวจสอบหมายเลขโทรศัพท์ TOSSAGUN
const checkTossagunPhone = () => {
  // TODO: เพิ่มการตรวจสอบหมายเลขโทรศัพท์กับ API
  console.log('Checking TOSSAGUN phone:', tossagunPhone.value);
  alert('ฟีเจอร์นี้จะเปิดใช้งานเร็วๆ นี้');
};

// ฟังก์ชันชำระเงิน
const processPayment = async () => {
  try {
    if (!selectedPaymentMethod.value) {
      alert('กรุณาเลือกวิธีการชำระเงิน');
      return;
    }

    // TODO: เพิ่มการประมวลผลการชำระเงิน
    console.log('Processing payment:', {
      method: selectedPaymentMethod.value,
      data: paymentData.value
    });

    alert('การชำระเงินสำเร็จ!');
    closePaymentModal();

  } catch (error) {
    console.error('Error processing payment:', error);
    alert(`เกิดข้อผิดพลาดในการชำระเงิน: ${error.message}`);
  }
};



// โหลดข้อมูลเมื่อ component ถูกสร้าง
onMounted(async () => {
  try {
    loading.value = true;
    console.log('🔄 Loading POS data on mount...');

    // เริ่มต้นข้อมูล Check-in Store
    checkInStore.initializeData();

    // โหลดข้อมูลสถิติ POS
    const posSummaryResult = await getPOSStatistics();
    if (posSummaryResult) {
      posSummary.value = {
        totalRoomCount: posSummaryResult.totalRoomCount || 0,
        totalRoomCountSleepGun: posSummaryResult.totalRoomCountSleepGun || 0,
        totalBuildingCount: posSummaryResult.totalBuildingCount || 0,
        totalFloorCount: posSummaryResult.totalFloorCount || 0,
        totalPosRecords: posSummaryResult.totalPosRecords || 0
      };
    }

    // โหลดข้อมูลแท็ก, ตึก, ห้อง
    const token = localStorage.getItem('token');

    // โหลดข้อมูลแท็ก
    const tagsResponse = await fetch('http://localhost:9999/HotelSleepGun/pos/tags', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    const tagsResult = await tagsResponse.json();
    if (tagsResponse.ok) {
      tags.value = tagsResult.data || [];
    }

    // โหลดข้อมูลตึก
    buildings.value = await getAllBuildings();

    // โหลดข้อมูลห้อง
    await loadRooms();

    // DatePicker จะตั้งค่าวันที่เริ่มต้นอัตโนมัติใน onMounted
    // และจะเรียก handleDateRangeSelected อัตโนมัติ

    // หลังจากโหลดข้อมูลเสร็จแล้ว ให้ตั้งค่า isFirstLoad เป็น false
    setTimeout(() => {
      isFirstLoad.value = false;
    }, 100);

    // ตรวจสอบขนาดหน้าจอเมื่อเริ่มต้น
    checkScreenSize();

    // เพิ่ม event listener สำหรับ resize
    window.addEventListener('resize', handleResize);

    // ตั้งค่าสถานะเริ่มต้น
    wasDrawerOpenBeforeResize.value = false;

  } catch (error) {
    console.error('❌ Error loading data:', error);
    if (error.message.includes('token') || error.message.includes('เข้าสู่ระบบ')) {
      alert('เซสชันหมดอายุ กรุณาเข้าสู่ระบบใหม่');
    } else {
      alert(`เกิดข้อผิดพลาดในการโหลดข้อมูล: ${error.message}`);
    }
  } finally {
    loading.value = false;
  }
});

// Cleanup เมื่อ component unmount
onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>
