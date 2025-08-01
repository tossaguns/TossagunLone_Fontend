<template>
  <TemplatePartner>
    <template #header>
      <label>จัดการ POS</label>
    </template>

    <template #content>
      <div class="p-4 max-w-[3000px] mx-auto">

        <label class="text-2xl font-bold">จัดการรายการห้องพัก</label>

        <div class="mb-4 mt-12 border rounded-md p-4 bg-stone-50">
          <div class="flex  justify-between items-center">
            <label class="font-bold">เเสดง Tag ที่มีอยู่</label>
            <div class="flex justify-end">
              <button
                class="bg-white text-blue-500 hover:bg-blue-50 md:px-4 px-2 py-2 rounded-md shadow font-bold md:text-md text-xs"
                @click="goToManageTag">จัดการ Tag</button>
            </div>
          </div>

          <div class="mt-6">
            <div class="flex flex-wrap gap-2 ">
              <div v-for="(tag, index) in tags" :key="index"
                class="px-2  text-white font-medium md:text-sm text-xs flex items-center space-x-2 rounded-full" :style="{
                  backgroundColor: tag.color,
                  border: `2px solid ${tag.color}`,
                  color: getContrastColor(tag.color)
                }">
                <span class="px-2">{{ tag.name }}</span>
              </div>
            </div>
            <div v-if="tags.length === 0" class="text-gray-500 text-sm italic">
              ยังไม่มีแท็กที่สร้างขึ้น
            </div>
            <div v-if="loading" class="text-blue-500 text-sm">
              กำลังโหลดข้อมูล...
            </div>
          </div>
        </div>



        <div class="mb-4 mt-20">
          <div class="flex justify-end space-x-2">
            <input type="text" placeholder="ค้นหาเลขห้อง/ชั้น/เเท็ก/..." class="border rounded-md p-2"></input>
            <button class="bg-blue-500 text-white px-4 py-2 rounded-md">ค้นหา</button>
          </div>

          <div class="flex flex-col lg:flex-row justify-between items-start mt-6">
            <div class="lg:w-1/2 space-y-2 flex flex-col lg:justify-end lg:items-end px-5">
              <div>
                <label>จำนวนตึกทั้งหมด : </label>
                <label>{{ posSummary.totalBuildingCount || 0 }}</label>
              </div>
              <div>
                <label>จำนวนห้องพักทั้งหมด : </label>
                <label>{{ posSummary.totalRoomCount || 0 }}</label>
              </div>
              <div>
                <label>โควต้าห้องพัก Sleep Gun :</label>
                <label>{{ posSummary.totalRoomCountSleepGun || 0 }}</label>
              </div>
            </div>

            <div class="lg:w-1/2 space-y-2 px-5">
              <div>
                <label>เเสดง<span class="font-bold px-2">สถานะ</span>ใน employee เป็น</label>
                <button class="ml-2 px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-xs"
                  @click="openStatusEditablePopup">{{ statusEditable ? 'Dropdown' : 'Text' }}</button>
              </div>
              <div>
                <label>เเสดง<span class="font-bold px-2">สถานะห้อง</span>ใน employee เป็น</label>
                <button class="ml-2 px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 text-xs"
                  @click="openStatusRoomEditablePopup">{{ statusRoomEditable ? 'Dropdown' : 'Text' }}</button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label class="text-stone-400">เเสดงพรีวิว POS</label>

          <!-- กดเลือกตึกในนี้ได้มั้ย -->
          <div class="md:border rounded-md md:p-4">
            <div class="grid grid-cols-2 md:flex md:flex-wrap gap-2">
              <div v-for="building in buildings" :key="building._id"
                class="md:w-fit border border-stone-300 rounded-md shadow">
                <button @click="selectBuilding(building._id)"
                  class="w-full md:w-[160px] h-full px-4 py-3 rounded-md font-bold transition-all duration-300" :class="[
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
              <!-- ปุ่มเพิ่มตึกใหม่ -->
              <div class="md:w-fit border-dashed border-2 border-stone-300 rounded-md py-3">
                <button @click="openDialog" class="w-full md:w-[160px] hover:bg-stone-50">+ เพิ่มจำนวนตึก</button>
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

                <!-- แสดงสถิติโควต้า SleepGun -->
                <div class="flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-lg border border-blue-200">
                  <span class="text-sm font-medium text-blue-800">SleepGun:</span>
                  <span :class="getSleepGunCount() >= 5 ? 'text-red-600 font-bold' : 'text-blue-600'">
                    {{ getSleepGunCount() }}/5 ห้อง
                  </span>
                  <span v-if="getSleepGunCount() >= 5" class="text-xs text-red-600">(เต็ม)</span>
                </div>
              </div>
            </div>



            <!-- ชั้นที่มีอยู่แล้ว -->
            <div v-if="selectedBuilding.floors && selectedBuilding.floors.length > 0" class="space-y-4">
              <div v-for="floor in selectedBuilding.floors" :key="floor.name"
                class="border rounded-lg p-4 bg-white shadow-sm">
                <!-- ชื่อชั้น -->
                <div class="flex items-center justify-between mb-4">
                  <!-- แสดงชื่อชั้นและปุ่มแก้ไข (เมื่อไม่ได้อยู่ในโหมดแก้ไข) -->
                  <div v-if="!isEditingFloor || editingFloorId !== `${selectedBuilding._id}-${floor.name}`"
                    class="space-x-4 w-1/3">
                    <label class="text-xl font-bold text-gray-800">{{ floor.name }}</label>
                    <button @click="startEditFloor(selectedBuilding._id, floor.name)"
                      class="rounded-lg shadow-md p-1 bg-gray-100 hover:bg-gray-50">
                      <img src="/imgHotel/edit.png" alt="edit" class="w-4 h-4">
                    </button>
                  </div>
                  <!-- แสดงส่วนการแก้ไขชื่อชั้น (เมื่ออยู่ในโหมดแก้ไข) -->
                  <div v-if="isEditingFloor && editingFloorId === `${selectedBuilding._id}-${floor.name}`"
                    class="space-x-4">
                    <input v-model="editingFloorName"
                      class="text-xl font-bold text-gray-800 border rounded-md py-2 px-4"
                      placeholder="ชื่อชั้นใหม่..." />
                    <button @click="cancelEditFloor" class="rounded-lg shadow-md p-1 text-red-500 hover:bg-gray-50">
                      ยกเลิก
                    </button>
                    <button @click="saveEditFloor(selectedBuilding._id, floor.name)"
                      class="rounded-lg shadow-md p-1 text-blue-500 hover:bg-gray-50">
                      ตกลง
                    </button>
                  </div>

                  <div class="w-1/3">
                    <span class="text-sm text-gray-600">จำนวนห้อง: {{ getRoomsInFloor(selectedBuilding._id, floor.name)
                      }} ห้อง</span>
                  </div>


                  <div class="flex space-x-2">
                    <button @click="toggleFloorExpanded(selectedBuilding._id, floor.name)"
                      class="text-blue-500 hover:text-blue-700 text-sm font-bold px-3 py-1 rounded hover:bg-blue-50">
                      {{ isFloorExpanded(selectedBuilding._id, floor.name) ? 'ซ่อนห้อง' : 'ดูห้อง' }}
                    </button>
                    <button @click="removeFloorFromBuilding(selectedBuilding._id, floor.name)"
                      class="text-red-500 hover:text-red-700 text-sm font-bold px-3 py-1 rounded hover:bg-red-50">
                      ลบชั้น
                    </button>
                  </div>
                </div>



                <!-- ห้องพักในชั้นนี้ -->
                <div
                  v-if="isFloorExpanded(selectedBuilding._id, floor.name) && getRoomsByBuildingAndFloor(selectedBuilding._id, floor.name).length > 0"
                  class="mb-4">

                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    <div v-for="room in getRoomsByBuildingAndFloor(selectedBuilding._id, floor.name)" :key="room._id"
                      class="border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white flex flex-col h-full">

                      <!-- รูปภาพห้อง -->
                      <div class="relative mb-3">
                        <img :src="room.images?.[0]?.preview || '/imgHotel/sea.jpg'" :alt="`ห้อง ${room.roomNumber}`"
                          class="w-full h-48 object-cover rounded-lg">

                        <!-- สถานะห้อง (Badge) -->
                        <div class="absolute top-2 right-2">
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
                          <h3 class="text-lg font-bold text-gray-800">ห้อง {{ room.roomNumber }}</h3>
                          <span :class="getTypeBadgeClass(room.typeRoom)" class="px-2 py-1 rounded text-xs font-medium">
                            {{ room.typeRoom?.mainName || room.typeRoom }}
                          </span>
                        </div>

                        <!-- ข้อมูลพื้นฐาน -->
                        <div class="text-sm text-gray-600 space-y-1">
                          <div class="flex items-center">
                            <span class="font-medium">ประเภท:</span>
                            <span class="ml-2">{{ room.typeRoom?.name || room.typeRoom }}, {{ room.air ||
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
                        </div>

                        <!-- แสดง เลือกเเท็กที่เเสดง -->
                        <div v-if="room.tag && room.tag.length > 0" class="flex flex-wrap gap-1 mt-2">
                          <span v-for="tagItem in room.tag" :key="tagItem._id || tagItem"
                            class="px-2 py-1 rounded-full text-xs text-white"
                            :style="{ backgroundColor: getTagColor(tagItem._id || tagItem), color: getContrastColor(getTagColor(tagItem._id || tagItem)) }">
                            {{ getTagName(tagItem._id || tagItem) }}
                          </span>
                        </div>


                        <!-- ลักษณะห้องพัก -->
                        <div v-if="room.typeRoomHotel && room.typeRoomHotel.length > 0" class="flex flex-wrap gap-1">
                          <span v-for="tag in room.typeRoomHotel" :key="tag._id"
                            class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {{ tag.name }}
                          </span>
                        </div>

                        <!-- ข้อมูลตึกและชั้น -->
                        <div class="text-xs text-gray-500">
                          <span v-if="room.buildingId">ตึก {{ getBuildingName(room.buildingId) }}</span>
                          <span v-if="room.floor">, ชั้น {{ room.floor }}</span>
                        </div>
                      </div>

                      <!-- ตัวเลือกการจัดการ -->
                      <div class="my-4">
                        <hr class="border border-gray-200" />
                      </div>

                      <div class="space-y-2 mt-auto">
                        <!-- สถานะห้อง -->
                        <div class="flex items-center space-x-2">
                          <label class="text-xs font-medium text-gray-700">สถานะห้อง:</label>
                          <select v-model="room.statusRoom"
                            @change="updateRoomStatus(room._id, 'statusRoom', $event.target.value)"
                            class="text-xs border rounded px-2 py-1 flex-1">
                            <option value="ว่าง">ว่าง</option>
                            <option value="ไม่ว่าง">ไม่ว่าง</option>
                            <option value="กำลังทำความสะอาด">กำลังทำความสะอาด</option>
                          </select>
                        </div>

                        <!-- สถานะการเข้าพัก -->
                        <div class="flex items-center space-x-2">
                          <label class="text-xs font-medium text-gray-700">สถานะ:</label>
                          <select v-model="room.status"
                            @change="updateRoomStatus(room._id, 'status', $event.target.value)"
                            class="text-xs border rounded px-2 py-1 flex-1"
                            :disabled="room.status !== 'SleepGunWeb' && getSleepGunCount() >= 5">
                            <option value="SleepGunWeb"
                              :disabled="room.status !== 'SleepGunWeb' && getSleepGunCount() >= 5">
                              SleepGunWeb {{ room.status !== 'SleepGunWeb' && getSleepGunCount() >= 5 ? '(โควต้าเต็ม)' :
                                '' }}
                            </option>
                            <option value="Walkin">Walkin</option>
                          </select>
                        </div>

                        <!-- แสดงข้อความแจ้งเตือนโควต้า -->
                        <div v-if="room.status !== 'SleepGunWeb' && getSleepGunCount() >= 5"
                          class="text-xs text-red-600 bg-red-50 p-2 rounded border border-red-200">
                          ⚠️ โควต้าห้อง SleepGun เต็มแล้ว (สูงสุด 5 ห้อง)
                          <br>กรุณาเปลี่ยนห้องอื่นเป็น Walkin ก่อน
                        </div>

                        <!-- สถานะโปรโมชั่น (แสดงเฉพาะเมื่อเป็น SleepGunWeb) -->
                        <div v-if="room.status === 'SleepGunWeb'" class="bg-gray-50 rounded p-2">
                          <div class="flex items-center space-x-2 mb-2">
                            <label class="text-xs font-medium text-gray-700">สถานะโปรโมชั่น:</label>
                            <select v-model="room.statusPromotion"
                              @change="updateRoomStatus(room._id, 'statusPromotion', $event.target.value)"
                              class="text-xs border rounded px-2 py-1 flex-1">
                              <option value="openPromotion">openPromotion</option>
                              <option value="closePromotion">closePromotion</option>
                            </select>
                          </div>

                          <!-- โปรโมชั่น (แสดงเฉพาะเมื่อเป็น SleepGunWeb เเล้วเปิด  openPromotion) -->
                          <div v-if="room.statusPromotion === 'openPromotion'" class="space-y-1">
                            <div class="flex items-center space-x-2">
                              <input type="radio" name="promotion" :id="`promotion-${room._id}`" class="text-xs">
                              <label :for="`promotion-${room._id}`" class="text-xs text-gray-600">
                                โปรโมชั่นที่ 1
                              </label>
                            </div>
                          </div>
                        </div>

                        <!-- ปุ่มทำความสะอาดเสร็จแล้ว -->
                        <div v-if="room.statusRoom === 'กำลังทำความสะอาด'" class="mt-2">
                          <button @click="finishCleaning(room)"
                            class="w-full bg-green-500 text-white text-xs py-2 px-3 rounded hover:bg-green-600 transition">
                            ทำความสะอาดเสร็จแล้ว
                          </button>
                        </div>

                        <!-- ปุ่มแก้ไข -->
                        <div class="flex space-x-2 mt-3">
                          <button @click="editRoom(room)"
                            class="flex-1 bg-blue-500 text-white text-xs py-2 px-3 rounded hover:bg-blue-600 transition">
                            แก้ไข
                          </button>
                          <button @click="deleteRoom(room._id)"
                            class="flex-1 bg-red-500 text-white text-xs py-2 px-3 rounded hover:bg-red-600 transition">
                            ลบ
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- ปุ่มสร้างห้องพักในชั้นนี้ -->
                  <div class="flex flex-wrap gap-2 mt-10">
                    <button @click="openAddRoomDialog(selectedBuilding._id, floor.name)"
                      class="xl:w-[305px] md:w-[225px] w-[160px] h-32 border-2 border-dashed border-stone-300 rounded-lg flex items-center justify-center text-3xl text-stone-400 hover:bg-stone-100 transition">
                      + <span class="text-base px-2">เพิ่มห้อง</span>
                    </button>
                  </div>
                </div>


                <!-- แสดงข้อความเมื่อไม่มีห้องในชั้นนี้ -->
                <div
                  v-if="isFloorExpanded(selectedBuilding._id, floor.name) && getRoomsByBuildingAndFloor(selectedBuilding._id, floor.name).length === 0"
                  class="text-center py-8 text-gray-500">
                  <p>ไม่มีห้องในชั้นนี้</p>

                  <!-- ปุ่มสร้างห้องพักในชั้นนี้ -->
                  <div class="flex flex-wrap gap-2">
                    <button @click="openAddRoomDialog(selectedBuilding._id, floor.name)"
                      class="xl:w-[305px] md:w-[225px] w-[160px] h-32 border-2 border-dashed border-stone-300 rounded-lg flex items-center justify-center text-3xl text-stone-400 hover:bg-stone-100 transition">
                      + <span class="text-base px-2">เพิ่มห้อง</span>
                    </button>
                  </div>
                </div>


              </div>
            </div>

            <!-- Input สำหรับเพิ่มชั้นใหม่ในตึกนี้ -->
            <div class="flex justify-start items-center space-x-2 mt-6 p-4 bg-white rounded-lg">
              <label class="text-stone-400 font-bold">เพิ่มชั้นใหม่: </label>
              <input v-model="newFloorName" type="text" class="border rounded-md p-2" placeholder="ชื่อชั้น..."
                @keyup.enter="addFloorToBuilding(selectedBuilding._id)" :disabled="savingFloor" />
              <button @click="addFloorToBuilding(selectedBuilding._id)"
                class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="savingFloor || !newFloorName.trim()">
                {{ savingFloor ? 'กำลังบันทึก...' : 'เพิ่มชั้น' }}
              </button>
            </div>

            <!-- ปุ่มลบและแก้ไขข้อมูลของตึกแต่ละตึกที่เลือก -->
            <div class="mt-6 flex justify-end space-x-2">
              <button class="text-red-500 hover:text-red-600 shadow-md px-4 py-2 rounded-lg"
                @click="handleDeleteBuilding(selectedBuilding)"
                :disabled="getTotalRoomsInBuilding(selectedBuilding._id) > 0"
                :title="getTotalRoomsInBuilding(selectedBuilding._id) > 0 ? 'ต้องลบห้องทั้งหมดก่อน' : ''">
                ลบตึกนี้
              </button>
              <button class="bg-amber-400 hover:bg-amber-500 text-white shadow-md px-4 py-2 rounded-lg"
                @click="handleEditBuilding(selectedBuilding)">
                แก้ไขข้อมูลตึก
              </button>
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
            <p>ยังไม่มีตึก กรุณาสร้างตึกก่อน</p>
          </div>
        </div>
      </div>

    </template>
  </TemplatePartner>

  <!-- เพิ่มห้อง -->
  <AddRoom v-if="addRoomDialogVisible" @room-saved="handleRoomSaved" @close="addRoomDialogVisible = false" />

  <!-- เพิ่มตึก -->
  <Dialog :modelValue="dialogVisible" @update:modelValue="dialogVisible = $event"
    :header="isEditBuilding ? 'แก้ไขข้อมูลตึก' : 'เพิ่มตึก'">
    <div class="p-4">
      <div class="flex justify-start items-center space-x-2">
        <label class="block  font-bold">ชื่อตึก :</label>
        <input type="text" class="border rounded-md p-2" placeholder="ชื่อตึก..." v-model="buildingName" />
      </div>

      <div class="flex justify-start items-center space-x-2 mt-4">
        <label class="block font-bold">เลือกสีข้อความ :</label>

        <ColorPicker v-model="textColor" />
      </div>

      <div class="flex justify-start items-center space-x-2 mt-4">
        <label class="block font-bold">เลือกสีพื้นหลัง :</label>
        <div class="flex justify-start items-center space-x-2">
          <input type="radio" id="color" name="backgroundType" value="color" v-model="backgroundType" class="border" />
          <label for="color">สี</label>
          <input type="radio" id="image" name="backgroundType" value="image" v-model="backgroundType" class="border" />
          <label for="image">รูปภาพ</label>
        </div>
      </div>

      <div>
        <!-- เลือกสี -->
        <div v-if="backgroundType === 'color'" class="border rounded-lg p-3 mt-4">
          <label>เลือกสี</label>
          <ColorPicker v-model="backgroundColor" />
          <div class="flex justify-center items-center mt-2">
            <label>โค้ดสี : {{ backgroundColor }}</label>
          </div>
        </div>

        <!-- เลือกรูปภาพ -->
        <div v-if="backgroundType === 'image'" class="border rounded-lg p-3 mt-4">
          <label>เลือกรูปภาพ</label>
          <div class="flex flex-col justify-center items-center mt-2">
            <input type="file" class="border rounded-md p-2" @change="handleImageUpload" accept="image/*" />
            <div class="text-xs text-gray-500 mt-1">รองรับไฟล์ JPG, PNG, GIF ขนาดไม่เกิน 5MB</div>
            <div v-if="backgroundImage" class="mt-2">
              <img :src="backgroundImage" alt="Preview" class="w-20 h-20 object-cover rounded border" />
            </div>
          </div>
        </div>
      </div>

      <!-- preview -->
      <div class="mt-4 border rounded-lg p-3">
        <label class="font-bold">Preview</label>

        <div class="flex justify-center items-center mt-2">
          <button class="px-12 py-6 rounded-xl text-xl font-bold" :style="previewStyle">
            {{ buildingName || 'ชื่อตึก' }}
          </button>
        </div>

      </div>

      <!-- ปุ่มบันทึกและยกเลิก -->
      <div class="flex justify-end space-x-3 mt-6 pt-4 border-t">
        <button @click="cancelDialog"
          class="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
          :disabled="savingBuilding">
          ยกเลิก
        </button>
        <button @click="saveBuilding"
          class="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="savingBuilding || !buildingName.trim()">
          {{ savingBuilding ? 'กำลังบันทึก...' : (isEditBuilding ? 'อัปเดต' : 'บันทึก') }}
        </button>
      </div>
    </div>
  </Dialog>

  <!-- เพิ่มห้อง -->
  <Dialog :modelValue="addRoomDialogVisible" @update:modelValue="addRoomDialogVisible = $event"
    :header="`เพิ่มห้อง - ตึก ${getBuildingName(selectedBuildingId)} / ${selectedFloor}`">
    <div class="p-4">
      <AddRoom @roomSaved="handleRoomSaved" :selectedFloor="selectedFloor" :selectedBuildingId="selectedBuildingId" />
    </div>
  </Dialog>

  <!-- แก้ไขห้อง -->
  <Dialog :modelValue="editRoomDialogVisible" @update:modelValue="editRoomDialogVisible = $event"
    :header="`แก้ไขห้อง - ${editRoomData?.roomData?.roomNumber || 'ห้อง'}`">
    <div class="p-4">
      <AddRoom @roomSaved="handleRoomSaved" :selectedFloor="editRoomData?.roomData?.floor || ''"
        :selectedBuildingId="editRoomData?.roomData?.buildingId || ''" :editRoomData="editRoomData"
        :isEditMode="true" />
    </div>
  </Dialog>

</template>

<script setup>
import TemplatePartner from "@/components/TemplatePartner.vue";
import AddRoom from "./AddRoom.vue";
import { useRouter } from "vue-router";
import { ref, onMounted, computed, nextTick } from 'vue';
import Dialog from "@/components/element/Dialog.vue";
import ColorPicker from "@/components/element/ColorPicker.vue";

const router = useRouter();
const tags = ref([]); // รายการแท็กทั้งหมด
const buildings = ref([]); // รายการตึกทั้งหมด
const rooms = ref([]); // รายการห้องทั้งหมด
const posData = ref([]); // รายการ POS ทั้งหมด
const posSummary = ref({}); // สรุปข้อมูล POS
const loading = ref(false); // สถานะการโหลด
const savedRoomData = ref(null); // ข้อมูลห้องที่บันทึกสำเร็จ
const savingBuilding = ref(false); // สถานะการบันทึกตึก
const statusEditable = ref(false); // สถานะการเปิด/ปิดการแสดงสถานะแบบ dropdown
const statusRoomEditable = ref(false); // สถานะการเปิด/ปิดการแสดงสถานะห้องแบบ dropdown
const dialogVisible = ref(false); // สถานะการเปิด/ปิด Dialog
const addRoomDialogVisible = ref(false); // สถานะการเปิด/ปิด Dialog เพิ่มห้อง
const editRoomDialogVisible = ref(false); // สถานะการเปิด/ปิด Dialog แก้ไขห้อง
const selectedFloor = ref(''); // ชั้นที่เลือกสำหรับสร้างห้อง
const editRoomData = ref(null); // ข้อมูลห้องที่ต้องการแก้ไข
const backgroundType = ref('color'); // ประเภทพื้นหลัง (color/image)
const selectedColor = ref('#FFBB00'); // สีที่เลือก
const floorDetail = ref(''); // รายละเอียดลำดับชั้น
const floorDetails = ref([]); // รายการลำดับชั้นที่บันทึกแล้ว
const floorCount = ref(0); // จำนวนชั้น
const savingFloorDetail = ref(false); // สถานะการบันทึกลำดับชั้น

// ตัวแปรใหม่สำหรับระบบตึก-ชั้น-ห้อง
const expandedBuildings = ref([]); // ตึกที่ขยายแล้ว
const expandedFloors = ref([]); // ชั้นที่ขยายแล้ว
const newFloorName = ref(''); // ชื่อชั้นใหม่
const savingFloor = ref(false); // สถานะการบันทึกชั้น
const selectedBuildingId = ref(''); // ตึกที่เลือกสำหรับสร้างห้อง

// ตัวแปรสำหรับการสร้างตึกใหม่
const buildingName = ref(''); // ชื่อตึก
const textColor = ref('#000000'); // สีข้อความ
const backgroundColor = ref('#FFBB00'); // สีพื้นหลัง
const backgroundImage = ref(''); // รูปภาพพื้นหลัง
const isEditBuilding = ref(false);
const editingBuildingId = ref(null);

// Reactive variables สำหรับการแก้ไขชื่อชั้น
const editingFloorName = ref('');
const editingFloorId = ref(null);
const isEditingFloor = ref(false);


// ฟังก์ชันสำหรับคำนวณสีข้อความที่เหมาะสมกับพื้นหลัง
function getContrastColor(hexColor) {
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

    console.log('🔍 Debug - Room ID:', roomId);
    console.log('🔍 Debug - Field:', field);
    console.log('🔍 Debug - Value:', value);
    console.log('🔍 Debug - Endpoint:', endpoint);
    console.log('🔍 Debug - Request Body:', requestBody);

    const response = await fetch(`http://localhost:9999/HotelSleepGun/pos/rooms/${roomId}${endpoint}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    const result = await response.json();
    console.log('🔍 Debug - Response status:', response.status);
    console.log('🔍 Debug - Response result:', result);

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

// ฟังก์ชันแก้ไขห้อง
function editRoom(room) {
  console.log('✏️ Edit room:', room);

  // เก็บข้อมูลห้องที่ต้องการแก้ไข
  editRoomData.value = {
    roomId: room._id,
    roomData: room,
    isEditMode: true
  };

  // เปิด Dialog แก้ไขห้อง
  editRoomDialogVisible.value = true;
}

// ฟังก์ชันลบห้อง
async function deleteRoom(roomId) {
  console.log('🗑️ Delete room:', roomId);

  if (!confirm('คุณแน่ใจหรือไม่ที่จะลบห้องนี้?')) {
    return;
  }

  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('ไม่พบ token กรุณาเข้าสู่ระบบใหม่');
    }

    const response = await fetch(`http://localhost:9999/HotelSleepGun/pos/rooms/${roomId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'เกิดข้อผิดพลาดในการลบห้อง');
    }

    alert('ลบห้องเรียบร้อยแล้ว');

    // รีเฟรชข้อมูลห้องและสถิติ
    await loadRooms();
    await refreshPosData();

  } catch (error) {
    console.error('❌ Error deleting room:', error);
    alert(`เกิดข้อผิดพลาดในการลบห้อง: ${error.message}`);
  }
}

// ฟังก์ชันทำความสะอาดเสร็จแล้ว
async function finishCleaning(room) {
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
}



// ฟังก์ชันดึงข้อมูล POS รวมทั้งหมด
async function getPOSData() {
  try {
    console.log('🔄 Fetching POS data from: http://localhost:9999/HotelSleepGun/pos/pos');

    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('ไม่พบ token กรุณาเข้าสู่ระบบใหม่');
    }

    const response = await fetch('http://localhost:9999/HotelSleepGun/pos/pos', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('📡 Response status:', response.status);
    const result = await response.json();
    console.log('✅ Response data:', result);

    if (!response.ok) {
      throw new Error(result.message || 'เกิดข้อผิดพลาดในการดึงข้อมูล POS');
    }

    console.log('📊 POS data fetched successfully:', result.data?.length || 0, 'records');
    return result.data;
  } catch (error) {
    console.error('❌ Error fetching POS data:', error);
    throw error;
  }
}

// ฟังก์ชันดึงข้อมูลตึกทั้งหมด
async function getAllBuildings() {
  try {
    console.log('🔄 Fetching buildings from: http://localhost:9999/HotelSleepGun/pos/buildings');

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

    console.log('📡 Response status:', response.status);
    const result = await response.json();
    console.log('✅ Response data:', result);

    if (!response.ok) {
      throw new Error(result.message || 'เกิดข้อผิดพลาดในการดึงข้อมูลตึก');
    }

    console.log('🏢 Buildings fetched successfully:', result.data?.length || 0, 'buildings');
    return result.data;
  } catch (error) {
    console.error('❌ Error fetching buildings:', error);
    throw error;
  }
}

// ฟังก์ชันดึงข้อมูลสถิติ POS
async function getPOSStatistics() {
  try {
    console.log('🔄 Fetching POS summary from: http://localhost:9999/HotelSleepGun/pos/pos-summary');

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

    console.log('📡 Response status:', response.status);
    const result = await response.json();
    console.log('✅ Response data:', result);

    if (!response.ok) {
      throw new Error(result.message || 'เกิดข้อผิดพลาดในการดึงข้อมูลสถิติ POS');
    }

    console.log('📊 POS statistics fetched successfully:', result.data);
    console.log('📊 POS summary details:', {
      totalBuildingCount: result.data?.totalBuildingCount,
      totalRoomCount: result.data?.totalRoomCount,
      totalRoomCountSleepGun: result.data?.totalRoomCountSleepGun,
      totalFloorCount: result.data?.totalFloorCount
    });
    return result.data;
  } catch (error) {
    console.error('❌ Error fetching POS statistics:', error);
    throw error;
  }
}

// โหลดข้อมูลแท็กและตึกเมื่อ component ถูกสร้าง
onMounted(async () => {
  try {
    loading.value = true;
    console.log('🔄 Loading POS data on mount...');

    // โหลดข้อมูล POS ทั้งหมด
    const posDataResult = await getPOSData();
    console.log('📦 Fetched POS data:', posDataResult);

    // โหลดข้อมูลสถิติ POS
    const posSummaryResult = await getPOSStatistics();
    console.log('📦 Fetched POS summary:', posSummaryResult);

    // ใช้ข้อมูลจาก POS data (ถ้ามี)
    if (posDataResult && posDataResult.length > 0) {
      const posItem = posDataResult[0];
      posData.value = posItem;

      // ใช้ข้อมูลแท็ก, ตึก, ห้อง จาก POS
      tags.value = posItem.tags || [];
      buildings.value = posItem.buildings || [];
      rooms.value = posItem.rooms || [];

      // โหลดข้อมูลลำดับชั้น
      if (posItem.floorDetail) {
        // แยกข้อมูลลำดับชั้นที่คั่นด้วยเครื่องหมายต่างๆ
        const floorDetailArray = posItem.floorDetail.split(/[,;|]/).map(item => item.trim()).filter(item => item);
        floorDetails.value = floorDetailArray;
        floorCount.value = floorDetailArray.length;
      }

      console.log('📦 POS data loaded:', {
        tags: tags.value.length,
        buildings: buildings.value.length,
        rooms: rooms.value.length,
        floorDetails: floorDetails.value.length
      });
    }

    // ใช้สถิติจาก POS summary
    if (posSummaryResult) {
      console.log('📊 Setting posSummary from API result:', posSummaryResult);
      posSummary.value = {
        totalRoomCount: posSummaryResult.totalRoomCount || 0,
        totalRoomCountSleepGun: posSummaryResult.totalRoomCountSleepGun || 0,
        totalBuildingCount: posSummaryResult.totalBuildingCount || 0,
        totalFloorCount: posSummaryResult.totalFloorCount || 0,
        totalPosRecords: posSummaryResult.totalPosRecords || 0
      };
      console.log('📊 Final posSummary value:', posSummary.value);
    } else {
      console.log('❌ No posSummaryResult received');
    }

    // ถ้าไม่มีข้อมูลใน POS ให้โหลดแยกกัน
    if (!posDataResult || posDataResult.length === 0) {
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
        console.log('🏷️ Tags API response:', tagsResult);
        if (tagsResponse.ok) {
          tags.value = tagsResult.data || [];
          console.log('✅ Tags loaded in loadData:', tags.value.length, 'tags');
          console.log('✅ Tags loaded successfully:', tags.value.length, 'tags');
        } else {
          console.error('❌ Failed to load tags:', tagsResult);
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

        // โหลดข้อมูลห้อง
        await loadRooms();
      } catch (error) {
        console.error('❌ Error loading tags/buildings/rooms:', error);
      }
    }

  } catch (error) {
    console.error('❌ Error loading data:', error);

    // Check if it's an authentication error
    if (error.message.includes('token') || error.message.includes('เข้าสู่ระบบ')) {
      alert('เซสชันหมดอายุ กรุณาเข้าสู่ระบบใหม่');
      // Redirect to login page
      router.push('/loginpartner');
    } else {
      alert(`เกิดข้อผิดพลาดในการโหลดข้อมูล: ${error.message}`);
    }
  } finally {
    loading.value = false;
  }
});

const goToManageTag = () => {
  router.push("/managetag");
};

// ฟังก์ชันเปิด Drawer (เก็บไว้เพื่อความเข้ากันได้)
const openDrawer = () => {
  console.log('🎯 Opening drawer...');
  console.log('📊 statusRoomEditable before:', statusRoomEditable.value);
  statusRoomEditable.value = true;
  console.log('📊 statusRoomEditable after:', statusRoomEditable.value);
};



const openDialog = () => {
  console.log('🎯 Opening dialog...');
  console.log('📊 dialogVisible before:', dialogVisible.value);
  dialogVisible.value = true;
  console.log('📊 dialogVisible after:', dialogVisible.value);
};

// ฟังก์ชันเปิด/ปิดการแสดงสถานะแบบ dropdown
const openStatusEditablePopup = () => {
  console.log('🔄 Toggling status editable...');
  statusEditable.value = !statusEditable.value;
  console.log('📊 statusEditable after:', statusEditable.value);
};

// ฟังก์ชันเปิด/ปิดการแสดงสถานะห้องแบบ dropdown
const openStatusRoomEditablePopup = () => {
  console.log('🔄 Toggling status room editable...');
  statusRoomEditable.value = !statusRoomEditable.value;
  console.log('📊 statusRoomEditable after:', statusRoomEditable.value);
};

// ฟังก์ชันเปิด Dialog เพิ่มห้อง (แบบเก่า - เก็บไว้เพื่อความเข้ากันได้)
const openAddRoomDialogOld = (floorName) => {
  console.log('🚪 Opening add room dialog (old):', floorName);
  selectedFloor.value = floorName;
  addRoomDialogVisible.value = true;
};

// ฟังก์ชันรับข้อมูลห้องที่บันทึกสำเร็จ
const handleRoomSaved = async (roomData) => {
  // ปิด Dialog ทั้งสองแบบ
  addRoomDialogVisible.value = false;
  editRoomDialogVisible.value = false;

  if (roomData) {
    // รอ backend sync แล้วโหลดข้อมูลห้องใหม่
    setTimeout(async () => {
      await loadRooms();
      // อัปเดตข้อมูลสถิติ POS
      await refreshPosData();

      // แสดง Swal alert แค่ตัวเดียว
      const Swal = (await import('sweetalert2')).default;
      Swal.fire({
        icon: 'success',
        title: editRoomData.value ? 'อัปเดตข้อมูลห้องสำเร็จ' : 'บันทึกข้อมูลห้องสำเร็จ',
        showConfirmButton: false,
        timer: 1200
      });

      // รีเซ็ตข้อมูลการแก้ไข
      editRoomData.value = null;
    }, 500);
  }
};

// ฟังก์ชันรีเฟรชข้อมูล POS
const refreshPosData = async () => {
  try {
    console.log('🔄 Refreshing POS data...');
    const posSummaryResult = await getPOSStatistics();

    console.log('📊 POS summary result:', posSummaryResult);

    // อัปเดตสถิติ
    if (posSummaryResult) {
      const oldSummary = { ...posSummary.value };
      posSummary.value = {
        totalRoomCount: posSummaryResult.totalRoomCount || 0,
        totalRoomCountSleepGun: posSummaryResult.totalRoomCountSleepGun || 0,
        totalBuildingCount: posSummaryResult.totalBuildingCount || 0,
        totalFloorCount: posSummaryResult.totalFloorCount || 0,
        totalPosRecords: posSummaryResult.totalPosRecords || 0
      };
      console.log('✅ Updated posSummary:', posSummary.value);
      console.log('📊 Summary changed from:', oldSummary, 'to:', posSummary.value);
    } else {
      console.log('❌ No posSummaryResult received');
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
        console.log('✅ Refreshed tags:', tags.value.length, 'tags');
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
        console.log('✅ Refreshed buildings:', buildings.value.length, 'buildings');
      }
    } catch (error) {
      console.error('❌ Error refreshing tags/buildings:', error);
    }
  } catch (error) {
    console.error('❌ Error refreshing POS data:', error);
  }
};

// Computed property สำหรับ preview style
const previewStyle = computed(() => {
  const style = {
    color: textColor.value,
  };

  if (backgroundType.value === 'color') {
    style.backgroundColor = backgroundColor.value;
  } else if (backgroundType.value === 'image' && backgroundImage.value) {
    style.backgroundImage = `url(${backgroundImage.value})`;
    style.backgroundSize = 'cover';
    style.backgroundPosition = 'center';
    // เพิ่มเงาดำเพื่อให้ข้อความชัดเจนขึ้นเมื่อใช้รูปภาพพื้นหลัง
    style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.8), -2px -2px 4px rgba(0, 0, 0, 0.8)';
    style.boxShadow = 'inset 0 0 100px rgba(0, 0, 0, 0.7), 0 0 10px rgba(0, 0, 0, 0.5)';
  }

  return style;
});

// ฟังก์ชันจัดการการอัปโหลดรูปภาพ
const handleImageUpload = (event) => {
  console.log('🖼️ Handling image upload...');
  const file = event.target.files[0];
  if (file) {
    console.log('🖼️ File selected:', file.name, 'Size:', file.size, 'Type:', file.type);
    // ตรวจสอบขนาดไฟล์ (ไม่เกิน 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      alert('ขนาดไฟล์ใหญ่เกินไป กรุณาเลือกไฟล์ที่มีขนาดไม่เกิน 5MB');
      event.target.value = ''; // รีเซ็ต input
      return;
    }

    // ตรวจสอบประเภทไฟล์
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      alert('กรุณาเลือกไฟล์รูปภาพเท่านั้น (JPG, PNG, GIF)');
      event.target.value = ''; // รีเซ็ต input
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      backgroundImage.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

// ฟังก์ชันเพิ่มลำดับชั้น
const addFloorDetail = async () => {
  console.log('🏢 Adding floor detail:', floorDetail.value);

  if (!floorDetail.value.trim()) {
    alert('กรุณากรอกรายละเอียดลำดับชั้น');
    return;
  }

  // ตรวจสอบว่ามีลำดับชั้นนี้อยู่แล้วหรือไม่
  if (floorDetails.value.includes(floorDetail.value.trim())) {
    alert('ลำดับชั้นนี้มีอยู่แล้ว');
    return;
  }

  savingFloorDetail.value = true;

  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('ไม่พบ token กรุณาเข้าสู่ระบบใหม่');
    }

    // เพิ่มลำดับชั้นใหม่ลงในรายการ
    const newFloorDetails = [...floorDetails.value, floorDetail.value.trim()];

    // สร้างข้อมูล POS ใหม่หรืออัปเดตข้อมูลที่มีอยู่
    const posData = {
      buildingCount: buildings.value.length || 0,
      floorCount: newFloorDetails.length,
      floorDetail: newFloorDetails.join(', '),
      roomCount: rooms.value.length || 0,
      roomCountSleepGun: rooms.value.filter(room => room.status === 'SleepGunWeb').length || 0,
      quotaRoomSleepGun: 5
    };

    // ตรวจสอบว่ามีข้อมูล POS อยู่แล้วหรือไม่
    let response;
    if (posData.value && posData.value._id) {
      // อัปเดตข้อมูล POS ที่มีอยู่
      response = await fetch(`http://localhost:9999/HotelSleepGun/pos/pos/${posData.value._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(posData),
      });
    } else {
      // สร้างข้อมูล POS ใหม่
      response = await fetch('http://localhost:9999/HotelSleepGun/pos/pos', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(posData),
      });
    }

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    }

    // อัปเดตรายการลำดับชั้น
    floorDetails.value = newFloorDetails;

    // รีเซ็ต input
    floorDetail.value = '';

    // อัปเดตจำนวนชั้น
    floorCount.value = floorDetails.value.length;

    // อัปเดตข้อมูล POS ใน local state
    if (result.data) {
      posData.value = result.data;
    }

    console.log('✅ Floor detail added successfully:', floorDetails.value);

  } catch (error) {
    console.error('❌ Error adding floor detail:', error);
    alert(`เกิดข้อผิดพลาดในการบันทึกข้อมูล: ${error.message}`);
  } finally {
    savingFloorDetail.value = false;
  }
};

// ฟังก์ชันดึงห้องพักตามชั้น
const getRoomsByFloor = (floorName) => {
  console.log('🏠 Getting rooms for floor:', floorName);
  const floorRooms = rooms.value.filter(room => room.floor === floorName);
  console.log('🏠 Rooms found for floor:', floorRooms.length);
  return floorRooms;
};

// ฟังก์ชันใหม่สำหรับดึงห้องตามตึกและชั้น
const getRoomsByBuildingAndFloor = (buildingId, floorName) => {
  return rooms.value.filter(room => {
    // ตรวจสอบ buildingId - อาจจะเป็น string หรือ object
    let roomBuildingId;
    if (typeof room.buildingId === 'object' && room.buildingId !== null) {
      roomBuildingId = room.buildingId._id || room.buildingId;
    } else {
      roomBuildingId = room.buildingId;
    }
    // เปรียบเทียบโดยใช้ String ครอบเสมอ
    const buildingMatch = String(roomBuildingId) === String(buildingId);
    const floorMatch = String(room.floor) === String(floorName);
    return buildingMatch && floorMatch;
  });
};

// ฟังก์ชันสำหรับสลับการแสดง/ซ่อนตึก
const toggleBuildingExpanded = (buildingId) => {
  console.log('🏢 Toggling building expanded:', buildingId);
  const index = expandedBuildings.value.indexOf(buildingId);
  if (index > -1) {
    expandedBuildings.value.splice(index, 1);
    console.log('🏢 Building collapsed');
  } else {
    expandedBuildings.value.push(buildingId);
    console.log('🏢 Building expanded');
  }
};

// ฟังก์ชันสำหรับสลับการแสดง/ซ่อนชั้น
const toggleFloorExpanded = (buildingId, floorName) => {
  console.log('🏢 Toggling floor expanded:', buildingId, floorName);
  const key = `${buildingId}-${floorName}`;
  const index = expandedFloors.value.indexOf(key);
  if (index > -1) {
    expandedFloors.value.splice(index, 1);
    console.log('🏢 Floor collapsed');
  } else {
    expandedFloors.value.push(key);
    console.log('🏢 Floor expanded');
  }
};

// ฟังก์ชันสำหรับตรวจสอบว่าชั้นขยายแล้วหรือไม่
const isFloorExpanded = (buildingId, floorName) => {
  const key = `${buildingId}-${floorName}`;
  const isExpanded = expandedFloors.value.includes(key);
  console.log('🏢 Floor expanded check:', buildingId, floorName, '=', isExpanded);
  return isExpanded;
};

// ฟังก์ชันสำหรับเพิ่มชั้นในตึก
const addFloorToBuilding = async (buildingId) => {
  console.log('🏢 Adding floor to building:', buildingId, 'Floor name:', newFloorName.value);

  if (!newFloorName.value.trim()) {
    alert('กรุณากรอกชื่อชั้น');
    return;
  }

  savingFloor.value = true;

  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('ไม่พบ token กรุณาเข้าสู่ระบบใหม่');
    }

    const response = await fetch(`http://localhost:9999/HotelSleepGun/pos/buildings/${buildingId}/floors`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newFloorName.value.trim(),
        description: ''
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'เกิดข้อผิดพลาดในการเพิ่มชั้น');
    }

    // อัปเดตข้อมูลตึกใน local state
    const buildingIndex = buildings.value.findIndex(b => b._id === buildingId);
    if (buildingIndex !== -1) {
      buildings.value[buildingIndex] = result.data;
    }

    // รีเซ็ต input
    newFloorName.value = '';

    // อัปเดตข้อมูลสถิติ POS
    await refreshPosData();

    console.log('✅ Floor added successfully to building:', buildingId);

  } catch (error) {
    console.error('❌ Error adding floor to building:', error);
    alert(`เกิดข้อผิดพลาดในการเพิ่มชั้น: ${error.message}`);
  } finally {
    savingFloor.value = false;
  }
};

// ฟังก์ชันสำหรับลบชั้นจากตึก
const removeFloorFromBuilding = async (buildingId, floorName) => {
  console.log('🏢 Removing floor from building:', buildingId, 'Floor name:', floorName);

  // Import SweetAlert
  const Swal = (await import('sweetalert2')).default;

  const result = await Swal.fire({
    title: 'ยืนยันการลบชั้น?',
    html: `คุณต้องการลบชั้น <strong>"${floorName}"</strong> หรือไม่?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'ลบชั้น',
    cancelButtonText: 'ยกเลิก',
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6'
  });

  if (!result.isConfirmed) return;

  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('ไม่พบ token กรุณาเข้าสู่ระบบใหม่');
    }

    const response = await fetch(`http://localhost:9999/HotelSleepGun/pos/buildings/${buildingId}/floors/${encodeURIComponent(floorName)}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'เกิดข้อผิดพลาดในการลบชั้น');
    }

    // อัปเดตข้อมูลตึกใน local state
    const buildingIndex = buildings.value.findIndex(b => b._id === buildingId);
    if (buildingIndex !== -1) {
      buildings.value[buildingIndex] = result.data;
    }

    // อัปเดตข้อมูลสถิติ POS
    await refreshPosData();

    await Swal.fire({
      icon: 'success',
      title: 'ลบชั้นสำเร็จ',
      text: `ชั้น "${floorName}" ถูกลบเรียบร้อยแล้ว`,
      showConfirmButton: false,
      timer: 1500
    });

    console.log('✅ Floor removed successfully from building:', buildingId);

  } catch (error) {
    console.error('❌ Error removing floor from building:', error);
    await Swal.fire({
      icon: 'error',
      title: 'เกิดข้อผิดพลาด',
      text: `เกิดข้อผิดพลาดในการลบชั้น: ${error.message}`,
      confirmButtonText: 'ตกลง'
    });
  }
};

// ฟังก์ชันลบลำดับชั้น (แบบเดิม - เก็บไว้เพื่อความเข้ากันได้)
const removeFloorDetail = async (index) => {
  console.log('🏢 Removing floor detail at index:', index);

  if (confirm('คุณต้องการลบลำดับชั้นนี้หรือไม่?')) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('ไม่พบ token กรุณาเข้าสู่ระบบใหม่');
      }

      // ลบลำดับชั้นออกจากรายการ
      const removedDetail = floorDetails.value.splice(index, 1)[0];

      // อัปเดตจำนวนชั้น
      floorCount.value = floorDetails.value.length;

      // อัปเดตข้อมูลในฐานข้อมูล
      const posData = {
        buildingCount: buildings.value.length || 0,
        floorCount: floorDetails.value.length,
        floorDetail: floorDetails.value.join(', '), // รวมรายการที่เหลือ
        roomCount: rooms.value.length || 0,
        roomCountSleepGun: rooms.value.filter(room => room.status === 'SleepGunWeb').length || 0,
        quotaRoomSleepGun: 5
      };

      let response;
      if (posData.value && posData.value._id) {
        // อัปเดตข้อมูล POS ที่มีอยู่
        response = await fetch(`http://localhost:9999/HotelSleepGun/pos/pos/${posData.value._id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(posData),
        });
      } else {
        // สร้างข้อมูล POS ใหม่
        response = await fetch('http://localhost:9999/HotelSleepGun/pos/pos', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(posData),
        });
      }

      if (!response.ok) {
        // ถ้าอัปเดตไม่สำเร็จ ให้คืนค่ากลับ
        floorDetails.value.splice(index, 0, removedDetail);
        floorCount.value = floorDetails.value.length;
        throw new Error('เกิดข้อผิดพลาดในการลบข้อมูล');
      }

      // อัปเดตข้อมูล POS ใน local state
      const result = await response.json();
      if (result.data) {
        posData.value = result.data;
      }

      console.log('✅ Floor detail removed successfully');

    } catch (error) {
      console.error('❌ Error removing floor detail:', error);
      alert(`เกิดข้อผิดพลาดในการลบข้อมูล: ${error.message}`);
    }
  }
};

// แก้ไขฟังก์ชัน openAddRoomDialog เพื่อรองรับ buildingId
const openAddRoomDialog = (buildingId, floorName) => {
  console.log('🚪 Opening add room dialog:', {
    buildingId: buildingId,
    floorName: floorName,
    selectedBuildingId: selectedBuildingId.value,
    selectedFloor: selectedFloor.value
  });

  selectedBuildingId.value = buildingId;
  selectedFloor.value = floorName;
  addRoomDialogVisible.value = true;
};

// ฟังก์ชันยกเลิกการสร้างตึก
const cancelDialog = () => {
  console.log('❌ Cancelling dialog...');
  dialogVisible.value = false;
  // รีเซ็ตค่าทั้งหมด
  buildingName.value = '';
  textColor.value = '#000000';
  backgroundColor.value = '#FFBB00';
  backgroundImage.value = '';
  backgroundType.value = 'color';
  isEditBuilding.value = false;
  editingBuildingId.value = null;
  console.log('✅ Dialog cancelled and reset');
};

// ฟังก์ชันบันทึกข้อมูลตึก
const saveBuilding = async () => {
  console.log('🏢 Saving building...');
  console.log('🏢 Building data:', {
    name: buildingName.value,
    textColor: textColor.value,
    backgroundColor: backgroundColor.value,
    backgroundType: backgroundType.value,
    backgroundImage: backgroundImage.value ? 'present' : 'none'
  });

  if (!buildingName.value.trim()) {
    alert('กรุณากรอกชื่อตึก');
    return;
  }

  // ตรวจสอบข้อมูลรูปภาพ
  if (backgroundType.value === 'image' && !backgroundImage.value) {
    alert('กรุณาเลือกรูปภาพพื้นหลัง');
    return;
  }

  savingBuilding.value = true;

  // แปลงข้อมูลให้ตรงกับ building schema
  const buildingData = {
    nameBuilding: buildingName.value,
    colorText: textColor.value,
    hascolorBG: backgroundType.value === 'color' ? 'colorBG' : 'imgBG',
    colorBG: backgroundType.value === 'color' ? backgroundColor.value : undefined,
    imgBG: backgroundType.value === 'image' ? backgroundImage.value : undefined,
  };

  console.log('💾 Saving building data:', {
    ...buildingData,
    imgBG: buildingData.imgBG ? 'present (base64)' : 'undefined'
  });

  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('ไม่พบ token กรุณาเข้าสู่ระบบใหม่');
    }

    let response, result;
    if (isEditBuilding.value && editingBuildingId.value) {
      // อัปเดต
      response = await fetch(`http://localhost:9999/HotelSleepGun/pos/buildings/${editingBuildingId.value}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(buildingData),
      });
    } else {
      // เพิ่มใหม่
      response = await fetch('http://localhost:9999/HotelSleepGun/pos/buildings', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(buildingData),
      });
    }
    result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    }

    alert(isEditBuilding.value ? 'อัปเดตข้อมูลตึกเรียบร้อยแล้ว' : 'บันทึกข้อมูลตึกเรียบร้อยแล้ว');
    cancelDialog();
    buildings.value = await getAllBuildings();
    // อัปเดตข้อมูลสถิติ POS
    await refreshPosData();
  } catch (error) {
    alert(`เกิดข้อผิดพลาดในการบันทึกข้อมูล: ${error.message}`);
  } finally {
    savingBuilding.value = false;
    isEditBuilding.value = false;
    editingBuildingId.value = null;
  }
};

// ฟังก์ชันสำหรับเลือกตึก
const selectBuilding = (buildingId) => {
  console.log('🏢 Selecting building:', buildingId);
  selectedBuildingId.value = buildingId;

  // Debug: ตรวจสอบข้อมูลตึกที่เลือก
  const selectedBuilding = buildings.value.find(b => b._id === buildingId);
  console.log('🏢 Selected building data:', selectedBuilding);

  // ล้างข้อมูลชั้นที่ขยายแล้วเมื่อเปลี่ยนตึก
  expandedFloors.value = [];
};

// Computed property สำหรับตึกที่เลือก
const selectedBuilding = computed(() => {
  const building = buildings.value.find(b => b._id === selectedBuildingId.value);
  console.log('🏢 Computed selectedBuilding:', {
    selectedBuildingId: selectedBuildingId.value,
    foundBuilding: building,
    totalBuildings: buildings.value.length
  });
  return building;
});

// ฟังก์ชันสำหรับนับจำนวนห้องทั้งหมดในตึกที่เลือก
const getTotalRoomsInBuilding = (buildingId) => {
  console.log('🏢 Counting rooms for buildingId:', buildingId);
  const buildingRooms = rooms.value.filter(room => {
    // ตรวจสอบ buildingId - อาจจะเป็น string หรือ object
    let roomBuildingId;
    if (typeof room.buildingId === 'object' && room.buildingId !== null) {
      roomBuildingId = room.buildingId._id || room.buildingId;
    } else {
      roomBuildingId = room.buildingId;
    }

    const match = String(roomBuildingId) === String(buildingId);
    if (match) {
      console.log(`✅ Room ${room.roomNumber} belongs to building ${buildingId}`);
    } else {
      console.log(`❌ Room ${room.roomNumber} (buildingId: ${roomBuildingId}) does not belong to building ${buildingId}`);
    }
    return match;
  });

  console.log(`🏢 Total rooms in building ${buildingId}:`, buildingRooms.length);
  return buildingRooms.length;
};

// ฟังก์ชันสำหรับนับจำนวนห้องในแต่ละชั้น
const getRoomsInFloor = (buildingId, floorName) => {
  console.log('🏢 Counting rooms for buildingId:', buildingId, 'floor:', floorName);
  const floorRooms = rooms.value.filter(room => {
    // ตรวจสอบ buildingId - อาจจะเป็น string หรือ object
    let roomBuildingId;
    if (typeof room.buildingId === 'object' && room.buildingId !== null) {
      roomBuildingId = room.buildingId._id || room.buildingId;
    } else {
      roomBuildingId = room.buildingId;
    }

    const buildingMatch = String(roomBuildingId) === String(buildingId);
    const floorMatch = room.floor === floorName;

    if (buildingMatch && floorMatch) {
      console.log(`✅ Room ${room.roomNumber} belongs to building ${buildingId}, floor ${floorName}`);
    }

    return buildingMatch && floorMatch;
  });

  console.log(`🏢 Total rooms in building ${buildingId}, floor ${floorName}:`, floorRooms.length);
  return floorRooms.length;
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

// Define emits
const emit = defineEmits(['room-saved', 'roomData']);

// ฟังก์ชันสำหรับบันทึกข้อมูลห้อง
const saveRoomData = async (roomData) => {
  console.log('💾 Saving room data:', roomData);

  try {
    // ตรวจสอบข้อมูลห้อง
    if (!roomData.roomNumber || !roomData.typeRoom) {
      throw new Error('กรุณากรอกข้อมูลห้องให้ครบถ้วน');
    }

    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('ไม่พบ token กรุณาเข้าสู่ระบบใหม่');
    }

    // เรียก API เพื่อบันทึกข้อมูลห้อง
    const response = await fetch('http://localhost:9999/HotelSleepGun/pos/rooms', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(roomData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'เกิดข้อผิดพลาดในการบันทึกข้อมูลห้อง');
    }

    alert('บันทึกข้อมูลห้องเรียบร้อยแล้ว');

    // Emit event to parent
    emit('room-saved', result.data);

    // ปิด Dialog
    addRoomDialogVisible.value = false;

    // รีเฟรชข้อมูลห้อง
    await loadRooms();

  } catch (error) {
    console.error('❌ Error saving room data:', error);
    alert(`เกิดข้อผิดพลาดในการบันทึกข้อมูลห้อง: ${error.message}`);
  }
};

// ฟังก์ชันสำหรับยกเลิกการเพิ่มห้อง
function handleCancel() {
  // รีเซ็ตค่าทั้งหมด
  selectedFloor.value = '';
  selectedBuildingId.value = '';
  addRoomDialogVisible.value = false;

  // Emit event to parent
  emit('room-saved', null);
}

// ฟังก์ชันสำหรับยืนยันการบันทึกห้อง
async function confirmSave() {
  try {
    // ตรวจสอบข้อมูลห้อง
    if (!roomData.roomNumber || !roomData.typeRoom) {
      throw new Error('กรุณากรอกข้อมูลห้องให้ครบถ้วน');
    }

    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('ไม่พบ token กรุณาเข้าสู่ระบบใหม่');
    }

    // เรียก API เพื่อบันทึกข้อมูลห้อง
    const response = await fetch('http://localhost:9999/HotelSleepGun/pos/rooms', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(roomData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'เกิดข้อผิดพลาดในการบันทึกข้อมูลห้อง');
    }

    alert('บันทึกข้อมูลห้องเรียบร้อยแล้ว');

    // Emit event to parent
    emit('room-saved', result.data);

    // ปิด Dialog
    addRoomDialogVisible.value = false;

    // รีเฟรชข้อมูลห้อง
    await loadRooms();

  } catch (error) {
    console.error('❌ Error saving room data:', error);
    alert(`เกิดข้อผิดพลาดในการบันทึกข้อมูลห้อง: ${error.message}`);
  }
}

// ฟังก์ชันแก้ไขข้อมูลตึก
function handleEditBuilding(building) {
  isEditBuilding.value = true;
  editingBuildingId.value = building._id;
  dialogVisible.value = true;
  // กรอกข้อมูลเดิมลงในฟอร์ม
  buildingName.value = building.nameBuilding;
  textColor.value = building.colorText;
  backgroundType.value = building.hascolorBG === 'imgBG' ? 'image' : 'color';
  backgroundColor.value = building.colorBG || '#FFBB00';
  backgroundImage.value = building.imgBG || '';
}

// ฟังก์ชันลบตึก
async function handleDeleteBuilding(building) {
  const totalRooms = getTotalRoomsInBuilding(building._id);
  const totalFloors = building.floors?.length || 0;

  // Import SweetAlert
  const Swal = (await import('sweetalert2')).default;

  // ตรวจสอบว่ามีห้องพักหรือชั้นอยู่หรือไม่
  if (totalRooms > 0 || totalFloors > 0) {
    let reasonText = '';

    if (totalRooms > 0 && totalFloors > 0) {
      reasonText = `
        <div class="text-left">
          <p class="mb-2"><strong>เหตุผล:</strong></p>
          <p class="mb-2">• ตึก "${building.nameBuilding}" มีห้องพักอยู่ ${totalRooms} ห้อง</p>
          <p class="mb-2">• ตึก "${building.nameBuilding}" มีชั้นอยู่ ${totalFloors} ชั้น</p>
          <p class="mb-2">• ต้องลบห้องทั้งหมดและชั้นทั้งหมดในตึกนี้ก่อนจึงจะลบตึกได้</p>
          <p class="text-sm text-gray-600 mt-3">กรุณาลบห้องและชั้นทั้งหมดก่อน</p>
        </div>
      `;
    } else if (totalRooms > 0) {
      reasonText = `
        <div class="text-left">
          <p class="mb-2"><strong>เหตุผล:</strong></p>
          <p class="mb-2">• ตึก "${building.nameBuilding}" มีห้องพักอยู่ ${totalRooms} ห้อง</p>
          <p class="mb-2">• ต้องลบห้องทั้งหมดในตึกนี้ก่อนจึงจะลบตึกได้</p>
          <p class="text-sm text-gray-600 mt-3">กรุณาไปที่หน้า "จัดการห้องพัก" เพื่อลบห้องทั้งหมดก่อน</p>
        </div>
      `;
    } else if (totalFloors > 0) {
      reasonText = `
        <div class="text-left">
          <p class="mb-2"><strong>เหตุผล:</strong></p>
          <p class="mb-2">• ตึก "${building.nameBuilding}" มีชั้นอยู่ ${totalFloors} ชั้น</p>
          <p class="mb-2">• ต้องลบชั้นทั้งหมดในตึกนี้ก่อนจึงจะลบตึกได้</p>
          <p class="text-sm text-gray-600 mt-3">กรุณาลบชั้นทั้งหมดก่อน</p>
        </div>
      `;
    }

    await Swal.fire({
      icon: 'warning',
      title: 'ไม่สามารถลบตึกได้',
      html: reasonText,
      confirmButtonText: 'เข้าใจแล้ว',
      confirmButtonColor: '#3085d6'
    });
    return;
  }

  const result = await Swal.fire({
    title: 'ยืนยันการลบตึก?',
    html: `คุณต้องการลบตึก <strong>"${building.nameBuilding}"</strong> หรือไม่?<br><br><span class="text-sm text-gray-600">การลบตึกจะลบชั้นทั้งหมดในตึกนี้ด้วย</span>`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'ลบตึก',
    cancelButtonText: 'ยกเลิก',
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6'
  });

  if (!result.isConfirmed) return;

  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:9999/HotelSleepGun/pos/buildings/${building._id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'เกิดข้อผิดพลาดในการลบตึก');

    await Swal.fire({
      icon: 'success',
      title: 'ลบตึกสำเร็จ',
      text: `ตึก "${building.nameBuilding}" ถูกลบเรียบร้อยแล้ว`,
      showConfirmButton: false,
      timer: 1500
    });

    // รีเฟรชข้อมูลตึกและสถิติ
    buildings.value = await getAllBuildings();
    await refreshPosData();
    // ถ้าตึกที่ลบคือ selectedBuilding ให้ reset
    if (selectedBuildingId.value === building._id) selectedBuildingId.value = '';
  } catch (error) {
    await Swal.fire({
      icon: 'error',
      title: 'เกิดข้อผิดพลาด',
      text: `เกิดข้อผิดพลาดในการลบตึก: ${error.message}`,
      confirmButtonText: 'ตกลง'
    });
  }
}

// ฟังก์ชันสำหรับการแก้ไขชื่อชั้น
function startEditFloor(buildingId, oldFloorName) {
  console.log('🏢 Starting to edit floor:', { buildingId, oldFloorName });
  isEditingFloor.value = true;
  editingFloorId.value = `${buildingId}-${oldFloorName}`;
  editingFloorName.value = oldFloorName;
}

function cancelEditFloor() {
  console.log('❌ Canceling floor edit');
  isEditingFloor.value = false;
  editingFloorId.value = null;
  editingFloorName.value = '';
}

async function saveEditFloor(buildingId, oldFloorName) {
  try {
    console.log('💾 Saving floor name edit:', { buildingId, oldFloorName, newName: editingFloorName.value });

    if (!editingFloorName.value.trim()) {
      // Import SweetAlert
      const Swal = (await import('sweetalert2')).default;
      await Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: 'กรุณากรอกชื่อชั้นใหม่',
        confirmButtonText: 'ตกลง'
      });
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('ไม่พบ token กรุณาเข้าสู่ระบบใหม่');
    }

    // Import SweetAlert
    const Swal = (await import('sweetalert2')).default;

    // เรียก API เพื่ออัปเดตชื่อชั้น
    const response = await fetch(`http://localhost:9999/HotelSleepGun/pos/buildings/${buildingId}/floors/${encodeURIComponent(oldFloorName)}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        newFloorName: editingFloorName.value.trim()
      })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'เกิดข้อผิดพลาดในการอัปเดตชื่อชั้น');
    }

    await Swal.fire({
      icon: 'success',
      title: 'อัปเดตชื่อชั้นสำเร็จ',
      text: `ชื่อชั้นถูกรีชื่อเป็น "${editingFloorName.value.trim()}" เรียบร้อยแล้ว`,
      showConfirmButton: false,
      timer: 1500
    });

    // รีเฟรชข้อมูลตึกและสถิติ
    buildings.value = await getAllBuildings();
    await refreshPosData();

    // ปิดโหมดแก้ไข
    cancelEditFloor();

  } catch (error) {
    console.error('❌ Error updating floor name:', error);
    const Swal = (await import('sweetalert2')).default;
    await Swal.fire({
      icon: 'error',
      title: 'เกิดข้อผิดพลาด',
      text: `เกิดข้อผิดพลาดในการอัปเดตชื่อชั้น: ${error.message}`,
      confirmButtonText: 'ตกลง'
    });
  }
}
</script>
