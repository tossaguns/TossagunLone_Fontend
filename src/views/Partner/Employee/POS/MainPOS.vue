<template>
  <TemplateEmployee>
    <template #header>
      <label>POS ห้องพัก</label>
    </template>
    <template #content>
      <div class="h-full flex">
        <!-- Main Content -->
        <div class="flex-1 h-full overflow-y-auto transition-all duration-300" :class="{
          'mr-0': !isDrawerVisible,
          'mr-1/4 xl:mr-1/4 lg:mr-1/3 md:mr-1/2': isDrawerVisible
        }">
          <div class="p-4 max-w-[3000px] mx-auto">
            <div>
              <label class="text-2xl font-bold">ระบบจัดการห้องพัก</label>

              <div class="flex justify-between items-center">
                <div class="flex justify-center items-center space-x-4 mt-8">
                  <div class="flex items-center space-x-2">
                    <label>เลือกวันที่ : </label>
                    <DatePicker v-model="selectedDateRange" @dateRangeSelected="handleDateRangeSelected" />
                  </div>

                  <button @click="searchAvailableRooms" :disabled="!selectedDateRange || isSearching"
                    class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed">
                    {{ isSearching ? 'กำลังค้นหา...' : 'ค้นหาห้องว่าง' }}
                  </button>
                  <button @click="clearSearch" :disabled="!hasSearchResults"
                    class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed">
                    ล้างการค้นหา
                  </button>
                </div>
                <!-- เดี๋ยวกลับมาปิด Drawer -->
                <div class="px-4">
                  <button @click="isDrawerVisible = true" class="px-4 py-2 bg-blue-500 text-white rounded">
                    เปิด Drawer
                  </button>
                </div>
              </div>

              <!-- แสดงผลการค้นหา -->
              <div v-if="searchResults && searchResults.length > 0" class="mt-6 p-4 bg-green-50 rounded-lg">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-lg font-bold text-blue-800">
                    ผลการค้นหาห้องว่าง ({{ searchSummary.availableRooms }} ห้อง)
                  </h3>
                  <div class="text-sm text-blue-600">
                    {{ formatDateRange(searchCriteria.startDate, searchCriteria.endDate) }}
                    ({{ searchCriteria.duration }} วัน)
                  </div>
                </div>

                <!-- แสดงห้องตามตึกและชั้น -->
                <div v-for="building in searchResults" :key="building.buildingId" class="mb-6">
                  <h4 class="font-bold text-xl mb-4 text-blue-900">{{ building.buildingName }}</h4>

                  <div v-for="floor in building.floors" :key="floor.floorName" class="mb-6">
                    <div class="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">ชั้น {{ floor.floorName }}</div>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      <div v-for="room in floor.rooms" :key="room._id"
                        class="border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full relative bg-white">

                        <!-- รูปภาพห้อง -->
                        <div class="relative mb-3">
                          <img :src="room.images?.[0]?.preview || '/imgHotel/sea.jpg'" :alt="`ห้อง ${room.roomNumber}`"
                            class="w-full h-48 object-cover rounded-lg">

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
                            <button v-if="room.statusRoom === 'ว่าง'" @click="checkInRoom(room)"
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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

                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
                                <button v-if="room.statusRoom === 'ว่าง'" @click="checkInRoom(room)"
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

        <!-- Drawer - Sticky Position within Flex -->
        <div v-if="isDrawerVisible"
          class="w-1/4 xl:w-1/4 lg:w-1/3 md:w-1/2 bg-white shadow-xl border-l transition-all duration-300 h-full flex flex-col sticky top-0 z-10">
          <div class="flex justify-between items-center p-4 border-b bg-white">
            <h2 class="text-lg font-semibold">Check-In Order</h2>
            <button @click="isDrawerVisible = false" class="text-gray-500 hover:text-gray-800">X</button>
          </div>
          <div class="flex-1 overflow-y-auto">
            <div class="p-4">
              <CheckInOrder />
            </div>
          </div>
        </div>
      </div>
    </template>
  </TemplateEmployee>
</template>

<script setup>
import Tooltip from "@/components/element/Tooltip.vue";
import TemplateEmployee from "@/components/TemplateEmployee.vue";
import DatePicker from "@/components/element/DatePicker.vue";
import { ref, onMounted, computed } from 'vue';
import Drawer from '@/components/element/Drawer.vue'
import CheckInOrder from '@/views/Partner/Employee/POS/CheckInOrder.vue'

const isDrawerVisible = ref(false)

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
  selectedBuildingId.value = buildingId;
  // ไม่ต้องล้างข้อมูลชั้นที่ซ่อนไว้เมื่อเปลี่ยนตึก เพื่อให้จำสถานะได้
};

// Computed property สำหรับตึกที่เลือก
const selectedBuilding = computed(() => {
  return buildings.value.find(b => b._id === selectedBuildingId.value);
});

// Computed property สำหรับตรวจสอบว่ามีผลการค้นหาหรือไม่
const hasSearchResults = computed(() => {
  return searchResults.value && searchResults.value.length > 0;
});

// ฟังก์ชันสำหรับนับจำนวนห้องทั้งหมดในตึกที่เลือก
const getTotalRoomsInBuilding = (buildingId) => {
  const buildingRooms = rooms.value.filter(room => {
    let roomBuildingId;
    if (typeof room.buildingId === 'object' && room.buildingId !== null) {
      roomBuildingId = room.buildingId._id || room.buildingId;
    } else {
      roomBuildingId = room.buildingId;
    }
    return String(roomBuildingId) === String(buildingId);
  });
  return buildingRooms.length;
};

// ฟังก์ชันสำหรับนับจำนวนห้องในแต่ละชั้น
const getRoomsInFloor = (buildingId, floorName) => {
  const floorRooms = rooms.value.filter(room => {
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
  return floorRooms.length;
};

// ฟังก์ชันใหม่สำหรับดึงห้องตามตึกและชั้น
const getRoomsByBuildingAndFloor = (buildingId, floorName) => {
  return rooms.value.filter(room => {
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

    console.log('✅ Search results:', result.data);
    alert(`พบห้องว่าง ${result.data.summary.availableRooms} ห้อง`);

  } catch (error) {
    console.error('❌ Error searching available rooms:', error);
    alert(`เกิดข้อผิดพลาดในการค้นหาห้องว่าง: ${error.message}`);
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
  selectedDateRange.value = '';
  dateRangeData.value = null;

  console.log('✅ Search cleared successfully');
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

// ฟังก์ชัน Check In
const checkInRoom = async (room) => {
  try {
    if (room.statusRoom !== 'ว่าง') {
      alert('ห้องนี้ไม่ว่าง ไม่สามารถ Check In ได้');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('ไม่พบ token กรุณาเข้าสู่ระบบใหม่');
    }

    // อัปเดตสถานะห้องเป็น "ไม่ว่าง"
    await updateRoomStatus(room._id, 'statusRoom', 'ไม่ว่าง');

    alert(`Check In ห้อง ${room.roomNumber} สำเร็จ`);

  } catch (error) {
    console.error('❌ Error during check in:', error);
    alert(`เกิดข้อผิดพลาดในการ Check In: ${error.message}`);
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

// โหลดข้อมูลเมื่อ component ถูกสร้าง
onMounted(async () => {
  try {
    loading.value = true;
    console.log('🔄 Loading POS data on mount...');

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

    // หลังจากโหลดข้อมูลเสร็จแล้ว ให้ตั้งค่า isFirstLoad เป็น false
    setTimeout(() => {
      isFirstLoad.value = false;
    }, 100);

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
</script>
