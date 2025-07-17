<template>
  <!-- <div>
    <div class="px-10 mt-8">

      <div>
        <div class="flex items-center mb-8">
          <div class="flex-grow border-t border-gray-300"></div>
          <span class="mx-4 text-gray-500 font-medium">ข้อมูลส่วนบุคคล</span>
          <div class="flex-grow border-t border-gray-300"></div>
        </div>




        <div>
          <div>
            <div class="mb-5">
              <div :ref="el => { if (inputRefs.value) inputRefs.value.firstname = el }">
                <FloatInput v-model="formData.firstname" id="firstname" label="ชื่อ (firstname)"
                  :class="highlightField === 'firstname' ? 'ring-2 ring-red-400 rounded-md animate-shake' : ''" />
                <p v-if="errors.firstname" class="text-red-500 text-xs pl-2">{{ errors.firstname }}</p>
              </div>
            </div>

            <div class="mb-5">
              <div :ref="el => { if (inputRefs.value) inputRefs.value.lastname = el }">
                <FloatInput v-model="formData.lastname" id="lastname" label="นามสกุล (lastname)"
                  :class="highlightField === 'lastname' ? 'ring-2 ring-red-400 rounded-md animate-shake' : ''" />
                <p v-if="errors.lastname" class="text-red-500 text-xs pl-2">{{ errors.lastname }}</p>
              </div>
            </div>

            <div class="mb-5">
              <div :ref="el => { if (inputRefs.value) inputRefs.value.sex = el }">
                <Dropdown v-model="formData.sex" id="sex" label="เพศ (sex)" :options="[
                  { value: 'male', label: 'เพศชาย' },
                  { value: 'female', label: 'เพศหญิง' }
                ]" placeholder="เลือกเพศ"
                  :class="highlightField === 'sex' ? 'ring-2 ring-red-400 rounded-md animate-shake' : ''" />
                <p v-if="errors.sex" class="text-red-500 text-xs pl-2">{{ errors.sex }}</p>
              </div>
            </div>

            <div class="mb-5">
              <div :ref="el => { if (inputRefs.value) inputRefs.value.email = el }">
                <FloatInput v-model="formData.email" id="email" label="อีเมล (Email)" placeholder="aaaa123@gmail.com"
                  :class="highlightField === 'email' ? 'ring-2 ring-red-400 rounded-md animate-shake' : ''" />
                <p v-if="errors.email" class="text-red-500 text-xs pl-2">{{ errors.email }}</p>
              </div>
            </div>

            <div class="mb-5">
              <div :ref="el => { if (inputRefs.value) inputRefs.value.phone = el }">
                <FloatInput v-model="formData.phone" id="phone" label="เบอร์โทร (Phone)" placeholder="0xx-xxxxxxx"
                  :class="highlightField === 'phone' ? 'ring-2 ring-red-400 rounded-md animate-shake' : ''" />
                <p v-if="errors.phone" class="text-red-500 text-xs pl-2">{{ errors.phone }}</p>
              </div>
            </div>

            <div class="mb-5">
              <div :ref="el => { if (inputRefs.value) inputRefs.value.idenNumber = el }">
                <FloatInput v-model="formData.idenNumber" id="idenNumber" label="เลขบัตรประชาชน (IDcard number)"
                  placeholder="xxx-xxxxxxx-xx-x"
                  :class="highlightField === 'idenNumber' ? 'ring-2 ring-red-400 rounded-md animate-shake' : ''" />
                <p v-if="errors.idenNumber" class="text-red-500 text-xs pl-2">{{ errors.idenNumber }}</p>
              </div>
            </div>

            <div class="flex justify-center flex-col items-center mb-4"
              :ref="el => { if (inputRefs.value) inputRefs.value.imageIden = el }">
              <div class="flex space-x-1 mb-2">
                <p class="pl-3 text-center">รูปเลขบัตรประชาชน
                  <br />
                  <span>(Image IDcard number) </span>
                </p>
                <p class="text-red-600">*</p>
              </div>
              <input type="file" id="input-imageIden" @change="handleFile($event, 'imageIden')" accept="image/*"
                class="hidden" />

              <div class="relative w-40 h-40">
                <label v-if="!previewIden" for="input-imageIden"
                  class="w-full h-full flex items-center justify-center border-2 border-dashed border-gray-400 rounded cursor-pointer hover:border-yellow-500">
                  <span class="text-4xl text-gray-400 hover:text-yellow-500">+</span>
                </label>

                <div v-if="previewIden" class="w-full h-full rounded overflow-hidden relative">
                  <img :src="previewIden" class="object-cover w-full h-full" />
                  <button @click="removeImageIden"
                    class="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-red-500 hover:text-white transition">
                    ❌
                  </button>
                </div>
              </div>
              <p v-if="errors.imageIden" class="text-red-500 text-xs pl-2">{{ errors.imageIden }}</p>
            </div>

            <div class="mb-5">
              <div :ref="el => { if (inputRefs.value) inputRefs.value.visaNumber = el }">
                <FloatInput v-model="formData.visaNumber" id="visaNumber" label="เลขวีซ่า (Visa number)"
                  :class="highlightField === 'visaNumber' ? 'ring-2 ring-red-400 rounded-md animate-shake' : ''" />
                <p v-if="errors.visaNumber" class="text-red-500 text-xs pl-2">{{ errors.visaNumber }}</p>
              </div>
            </div>

            <div class="flex justify-center flex-col items-center mb-4"
              :ref="el => { if (inputRefs.value) inputRefs.value.imageVisa = el }">
              <div class="flex space-x-1 mb-2">
                <p class="pl-3 text-center">รูปวีซ่า
                  <br />
                  <span>(Image Visa number) </span>
                </p>
                <p class="text-red-600">*</p>
              </div>
              <input type="file" id="input-imageVisa" @change="handleFile($event, 'imageVisa')" accept="image/*"
                class="hidden" />

              <div class="relative w-40 h-40">
                <label v-if="!previewVisa" for="input-imageVisa"
                  class="w-full h-full flex items-center justify-center border-2 border-dashed border-gray-400 rounded cursor-pointer hover:border-yellow-500">
                  <span class="text-4xl text-gray-400 hover:text-yellow-500">+</span>
                </label>

                <div v-if="previewVisa" class="w-full h-full rounded overflow-hidden relative">
                  <img :src="previewVisa" class="object-cover w-full h-full" />
                  <button @click="removeImageVisa"
                    class="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-red-500 hover:text-white transition">
                    ❌
                  </button>
                </div>
              </div>
              <p v-if="errors.imageVisa" class="text-red-500 text-xs pl-2">{{ errors.imageVisa }}</p>
            </div>

            <div class="flex flex-col mt-32">
              <div class="flex items-center mb-4">
                <div class="flex-grow border-t border-gray-300"></div>
                <span class="mx-4 text-gray-500 font-medium">ข้อมูลบริษัท</span>
                <div class="flex-grow border-t border-gray-300"></div>
              </div>

              <div class="mb-6">
                <div :ref="el => { if (inputRefs.value) inputRefs.value.hotelType = el }">
                  <label class="font-bold">เลือกประเภทห้องของโรงแรม:</label>
                  <div v-for="type in hotelTypes" :key="type._id" class="mt-2 pl-4">
                    <label>
                      <input type="radio" :value="type._id" v-model="formData.hotelType" name="hotelType" />
                      {{ type.name }}
                    </label>
                  </div>
                  <p v-if="errors.hotelType" class="text-red-500 text-xs pl-2">{{ errors.hotelType }}</p>
                </div>
              </div>

              <div class="mb-5">
                <div :ref="el => { if (inputRefs.value) inputRefs.value.hotelName = el }">
                  <FloatInput v-model="formData.hotelName" id="hotelName" label="ชื่อที่พัก (RestName)"
                    placeholder="ชื่อโรงเเรม/อพาตร์ทเม้นท์/บ้านพัก/..."
                    :class="highlightField === 'hotelName' ? 'ring-2 ring-red-400 rounded-md animate-shake' : ''" />
                  <p v-if="errors.hotelName" class="text-red-500 text-xs pl-2">{{ errors.hotelName }}</p>
                </div>
              </div>

              <div class="mb-5">
                <div :ref="el => { if (inputRefs.value) inputRefs.value.companyName = el }">
                  <FloatInput v-model="formData.companyName" id="companyName" label="ชื่อบริษัท (CompanyName)"
                    placeholder="ชื่อบริษัท"
                    :class="highlightField === 'companyName' ? 'ring-2 ring-red-400 rounded-md animate-shake' : ''" />
                  <p v-if="errors.companyName" class="text-red-500 text-xs pl-2">{{ errors.companyName }}</p>
                </div>
              </div>

              <div class="flex justify-center flex-col items-center mb-4"
                :ref="el => { if (inputRefs.value) inputRefs.value.imagehotelOurdoor = el }">
                <div class="flex space-x-1 mb-2">
                  <p class="pl-3 text-center">รูปที่พักด้านนอก
                    <br />
                    <span>(Image Rest Outdoor) </span>
                  </p>
                  <p class="text-red-600">*</p>
                </div>

                <input type="file" id="input-imagehotelOurdoor" @change="handleFile($event, 'imagehotelOurdoor')"
                  accept="image/*" class="hidden" />
                <div class="relative w-40 h-40">
                  <label v-if="!previewLogo" for="input-imagehotelOurdoor"
                    class="w-full h-full flex items-center justify-center border-2 border-dashed border-gray-400 rounded cursor-pointer hover:border-yellow-500">
                    <span class="text-4xl text-gray-400 hover:text-yellow-500">+</span>
                  </label>

                  <div v-if="previewLogo" class="w-full h-full rounded overflow-hidden relative">
                    <img :src="previewLogo" class="object-cover w-full h-full" />
                    <button @click="removeimagehotelOurdoor"
                      class="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-red-500 hover:text-white transition">
                      ❌
                    </button>
                  </div>
                </div>
                <p v-if="errors.imagehotelOurdoor" class="text-red-500 text-xs pl-2">{{ errors.imagehotelOurdoor }}</p>
              </div>

              <div class="flex justify-center flex-col items-center mb-4"
                :ref="el => { if (inputRefs.value) inputRefs.value.businessLicense = el }">
                <div class="flex space-x-1 mb-2">
                  <p class="pl-3 text-center">ใบอนุญาติประกอบธุรกิจ
                    <br />
                    <span>(Business license) </span>
                  </p>
                </div>
                <input type="file" id="input-businessLicense" @change="handleFile($event, 'businessLicense')"
                  accept="application/pdf" class="hidden" />

                <div class="relative w-60 h-40">
                  <label v-if="!selectedPdf" for="input-businessLicense"
                    class="w-full h-full flex items-center justify-center border-2 border-dashed border-gray-400 rounded cursor-pointer hover:border-yellow-500">
                    <span class="text-center text-gray-500 hover:text-yellow-500">
                      <div class="text-4xl">+</div>
                      <div class="text-sm mt-1">อัปโหลดไฟล์ PDF</div>
                    </span>
                  </label>

                  <div v-else
                    class="w-full h-full flex flex-col justify-center items-center bg-gray-100 rounded p-3 relative">
                    <p class="text-sm text-gray-700 break-words text-center">{{ selectedPdf.name }}</p>
                    <button @click="removePdf"
                      class="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-red-500 hover:text-white transition">
                      ❌
                    </button>
                  </div>
                </div>
                <p v-if="errors.businessLicense" class="text-red-500 text-xs pl-2">{{ errors.businessLicense }}</p>
              </div>
            </div>

            <div class="flex items-center mb-8 mt-32">
              <div class="flex-grow border-t border-gray-300"></div>
              <span class="mx-4 text-gray-500 font-medium">ที่ตั้งที่พัก</span>
              <div class="flex-grow border-t border-gray-300"></div>
            </div>

            <div class="mb-5">
              <div :ref="el => { if (inputRefs.value) inputRefs.value.address = el }">
                <FloatInput v-model="formData.address" id="address" label="บ้านเลขที่ (Address)"
                  placeholder="บ้านเลขที่"
                  :class="highlightField === 'address' ? 'ring-2 ring-red-400 rounded-md animate-shake' : ''" />
                <p v-if="errors.address" class="text-red-500 text-xs pl-2">{{ errors.address }}</p>
              </div>
            </div>

            <div class="mb-5">
              <div :ref="el => { if (inputRefs.value) inputRefs.value.province = el }">
                <FloatInput v-model="formData.province" id="province" label="จังหวัด (Province)" placeholder="จังหวัด"
                  readonly
                  :class="highlightField === 'province' ? 'ring-2 ring-red-400 rounded-md animate-shake' : ''" />
                <p v-if="errors.province" class="text-red-500 text-xs pl-2">{{ errors.province }}</p>
              </div>
            </div>

            <div class="mb-5">
              <div :ref="el => { if (inputRefs.value) inputRefs.value.district = el }">
                <FloatInput v-model="formData.district" id="district" label="อำเภอ (District)" placeholder="อำเภอ"
                  readonly
                  :class="highlightField === 'district' ? 'ring-2 ring-red-400 rounded-md animate-shake' : ''" />
                <p v-if="errors.district" class="text-red-500 text-xs pl-2">{{ errors.district }}</p>
              </div>
            </div>
            <div class="mb-5">
              <div :ref="el => { if (inputRefs.value) inputRefs.value.subdistrict = el }">
                <FloatInput v-model="formData.subdistrict" id="subdistrict" label="ตำบล (Subdistrict)"
                  placeholder="ตำบล" readonly
                  :class="highlightField === 'subdistrict' ? 'ring-2 ring-red-400 rounded-md animate-shake' : ''" />
                <p v-if="errors.subdistrict" class="text-red-500 text-xs pl-2">{{ errors.subdistrict }}</p>
              </div>
            </div>
            <div class="mb-5">
              <div :ref="el => { if (inputRefs.value) inputRefs.value.postcode = el }">
                <FloatInput v-model="formData.postcode" id="postcode" label="รหัสไปรษณีย์ (PostNumber)"
                  placeholder="รหัสไปรษณีย์" readonly
                  :class="highlightField === 'postcode' ? 'ring-2 ring-red-400 rounded-md animate-shake' : ''" />
                <p v-if="errors.postcode" class="text-red-500 text-xs pl-2">{{ errors.postcode }}</p>
              </div>
            </div>

            <div class="mb-5">
              <div :ref="el => { if (inputRefs.value) inputRefs.value.latitude = el }">
                <FloatInput v-model="latitude" id="latitude" label="Latitude (ละติจูด)" placeholder="เช่น 13.7563"
                  :class="highlightField === 'latitude' ? 'ring-2 ring-red-400 rounded-md animate-shake' : ''" />
                <p v-if="errors.latitude" class="text-red-500 text-xs pl-2">{{ errors.latitude }}</p>
              </div>
            </div>
            <div class="mb-5">
              <div :ref="el => { if (inputRefs.value) inputRefs.value.longitude = el }">
                <FloatInput v-model="longitude" id="longitude" label="Longitude (ลองจิจูด)" placeholder="เช่น 100.5018"
                  :class="highlightField === 'longitude' ? 'ring-2 ring-red-400 rounded-md animate-shake' : ''" />
                <p v-if="errors.longitude" class="text-red-500 text-xs pl-2">{{ errors.longitude }}</p>
              </div>
            </div>

            <div>
              <div class="relative mt-8">
                <div class="relative">
                  <div class="mb-5">
                    <div :ref="el => { if (inputRefs.value) inputRefs.value.username = el }">
                      <FloatInput v-model="formData.username" id="username" label="UserName" placeholder="Username"
                        :class="highlightField === 'username' ? 'ring-2 ring-red-400 rounded-md animate-shake' : ''" />
                      <p v-if="errors.username" class="text-red-500 text-xs pl-2">{{ errors.username }}</p>
                    </div>
                  </div>

                  <div class="mb-5">
                    <div :ref="el => { if (inputRefs.value) inputRefs.value.password = el }">
                      <div class="relative">
                        <FloatInput v-model="formData.password" id="password" label="Password" placeholder="Password"
                          :type="showPassword ? 'text' : 'password'"
                          :class="highlightField === 'password' ? 'ring-2 ring-red-400 rounded-md animate-shake' : ''" />
                        <button type="button" @click="togglePassword"
                          class="absolute inset-y-0 right-0 top-0 flex items-center px-3 text-gray-500 z-10">
                          <span v-if="showPassword">🙉</span>
                          <span v-else>🙈</span>
                        </button>
                        <p v-if="errors.password" class="text-red-500 text-xs pl-2">{{ errors.password }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>


    <div class="flex justify-center mt-10">
      <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" @click="showModal = true">
        อ่านรายละเอียดเเละข้อกำหนด
      </button>

      <Modal v-model="showModal" header="รายละเอียด">
        <div>
          <p>นี่คือเนื้อหาภายใน modal ที่เรียกจากแม่</p>
          <p>สามารถใส่อะไรก็ได้ตรงนี้ เช่น ฟอร์ม รูปภาพ
            tttttttttttttttttttttttttttttttttttttttttttttuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuหรือข้อความยาวhtttttttttttttttttttttttttttttttttttttttttttttttttttuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu
          </p>
        </div>
      </Modal>
    </div>

    <div class="flex justify-center items-center mb-12 mt-20 space-x-2">
      <ButtonCancel @confirm="handleCancel" />
      <ButtonReset @confirm="handleReset" />
      <ButtonSave @confirm="handleSave" />
    </div>
  </div> -->
  <div class="px-10 mt-8">
    <div>
      <div class="flex justify-center my-8">
        <button
          class="bg-amber-400 py-4 px-4 rounded-2xl shadow-lg font-bold hover:bg-amber-500 hover:text-white transition">
          อ่านข้อตกลงการเป็นพาทเนอร์ได้ที่นี่!<br />
          <span class="text-sm text-stone-500">Read the partnership agreement here!</span>
        </button>
      </div>
      <div class="flex flex-col">
        <div class="flex items-center mb-8">
          <div class="flex-grow border-t border-gray-300"></div>
          <span class="mx-4 text-gray-500 font-medium">ข้อมูลส่วนบุคคล</span>
          <div class="flex-grow border-t border-gray-300"></div>
        </div>

        <div class="mb-5">
          <div class="flex space-x-1 my-1">
            <p class="pl-3">ชื่อ (firstname)</p><!--firstname-->
            <p class="text-red-600">*</p>
          </div>
          <input v-model="formData.firstname" class="w-full py-2 border rounded-md px-3" placeholder="ชื่อ" />
        </div>

        <div class="mb-5">
          <div class="flex space-x-1  my-1">
            <p class="pl-3">นามสกุล (lastname)</p>
            <p class="text-red-600">*</p>
          </div>
          <input v-model="formData.lastname" class="w-full py-2 border rounded-md px-3" placeholder="นามสกุล" />
        </div>

        <div class="mb-5">
          <div class="flex space-x-1  my-1">
            <p class="pl-3">เพศ (sex)</p><!--sex-->
            <p class="text-red-600">*</p>
          </div>
          <select v-model="sex" class="w-full py-2 border rounded-md px-3">
            <option value="" disabled selected>เลือกเพศ</option>
            <option value="male">เพศชาย</option>
            <option value="female">เพศหญิง</option>
          </select>
        </div>
        <div class="mb-5">
          <div class="flex space-x-1  my-1">
            <p class="pl-3">อีเมล (Email)</p><!--email-->
            <p class="text-red-600">*</p>
          </div>
          <input v-model="formData.email" class="w-full py-2 border rounded-md px-3" placeholder="aaaa123@gmail.com" />
        </div>
        <div class="mb-5">
          <div class="flex space-x-1 my-1">
            <p class="pl-3">เบอร์โทร (Phone)</p><!--phone-->
            <p class="text-red-600">*</p>
          </div>
          <input v-model="formData.phone" class="w-full py-2 border rounded-md px-3" placeholder="0xx-xxxxxxx" />
        </div>

        <div class="mb-5">
          <div class="flex space-x-1  my-1">
            <p class="pl-3">เลขบัตรประชาชน
              <br />
              <span>(IDcard number) </span>
            </p><!--idenNumber-->
            <p class="text-red-600">*</p>
          </div>
          <input v-model="formData.idenNumber" class="w-full py-2 border rounded-md px-3"
            placeholder="xxx-xxxxxxx-xx-x" />
        </div>

        <div class="flex justify-center flex-col items-center mb-4">
          <div class="flex space-x-1 mb-2">
            <p class="pl-3 text-center">รูปเลขบัตรประชาชน
              <br />
              <span>(Image IDcard number) </span>
            </p><!--imageIden-->
            <p class="text-red-600">*</p>
          </div>
          <input type="file" id="input-imageIden" @change="handleFile($event, 'imageIden')" accept="image/*"
            class="hidden" />

          <div class="relative w-40 h-40">
            <label v-if="!previewIden" for="input-imageIden"
              class="w-full h-full flex items-center justify-center border-2 border-dashed border-gray-400 rounded cursor-pointer hover:border-yellow-500">
              <span class="text-4xl text-gray-400 hover:text-yellow-500">+</span>
            </label>

            <div v-if="previewIden" class="w-full h-full rounded overflow-hidden relative">
              <img :src="previewIden" class="object-cover w-full h-full" />
              <button @click="removeImageIden"
                class="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-red-500 hover:text-white transition">
                ❌
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="mb-5">
        <div class="flex space-x-1  my-1">
          <p class="pl-3">เลขวีซ่า
            <br />
            <span>(
              Visa number) </span>
          </p><!--visaNumber-->
          <p class="text-red-600">*</p>
        </div>
        <input v-model="formData.visaNumber" class="w-full py-2 border rounded-md px-3" />
      </div>


      <div class="flex justify-center flex-col items-center mb-4">
        <div class="flex space-x-1 mb-2">
          <p class="pl-3 text-center">รูปวีซ่า
            <br />
            <span>(Image Visa number) </span>
          </p><!--imageVisa-->
          <p class="text-red-600">*</p>
        </div>
        <input type="file" id="input-imageVisa" @change="handleFile($event, 'imageVisa')" accept="image/*"
          class="hidden" />

        <div class="relative w-40 h-40">
          <label v-if="!previewVisa" for="input-imageVisa"
            class="w-full h-full flex items-center justify-center border-2 border-dashed border-gray-400 rounded cursor-pointer hover:border-yellow-500">
            <span class="text-4xl text-gray-400 hover:text-yellow-500">+</span>
          </label>

          <div v-if="previewVisa" class="w-full h-full rounded overflow-hidden relative">
            <img :src="previewVisa" class="object-cover w-full h-full" />
            <button @click="removeImageVisa"
              class="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-red-500 hover:text-white transition">
              ❌
            </button>
          </div>
        </div>
      </div>


      <div class="flex flex-col mt-32">
        <div class="flex items-center mb-4">
          <div class="flex-grow border-t border-gray-300"></div>
          <span class="mx-4 text-gray-500 font-medium">ข้อมูลบริษัท</span>
          <div class="flex-grow border-t border-gray-300"></div>
        </div>

        <div class="mb-6">
          <label class="font-bold">เลือกประเภทห้องของโรงแรม:</label>
          <div v-for="type in hotelTypes" :key="type._id" class="mt-2 pl-4">
            <label>
              <input type="radio" :value="type._id" v-model="selectedHotelType" name="hotelType" />
              {{ type.name }}
            </label>
          </div>
        </div>

        <div class="mb-5">
          <div class="flex space-x-1  my-1">
            <p class="pl-3">ชื่อที่พัก (RestName)</p><!--hotelName-->
            <p class="text-red-600">*</p>
          </div>
          <input v-model="formData.hotelName" class="w-full py-2 border rounded-md px-3"
            placeholder="ชื่อโรงเเรม/อพาตร์ทเม้นท์/บ้านพัก/..." />
        </div>
        <div class="mb-5">
          <div class="flex space-x-1  my-1">
            <p class="pl-3">ชื่อบริษัท (CompanyName)</p><!--companyName-->
            <p class="text-red-600">*</p>
          </div>
          <input v-model="formData.companyName" class="w-full py-2 border rounded-md px-3" placeholder="ชื่อบริษัท" />
        </div>

        <div class="flex justify-center flex-col items-center mb-4">
          <div class="flex space-x-1 mb-2">
            <p class="pl-3 text-center">รูปที่พักด้านนอก
              <br />
              <span>(Image Rest Outdoor) </span>
            </p><!--imagehotelOurdoor-->
            <p class="text-red-600">*</p>
          </div>

          <input type="file" id="input-imagehotelOurdoor" @change="handleFile($event, 'imagehotelOurdoor')"
            accept="image/*" class="hidden" />
          <div class="relative w-40 h-40">
            <label v-if="!previewLogo" for="input-imagehotelOurdoor"
              class="w-full h-full flex items-center justify-center border-2 border-dashed border-gray-400 rounded cursor-pointer hover:border-yellow-500">
              <span class="text-4xl text-gray-400 hover:text-yellow-500">+</span>
            </label>

            <div v-if="previewLogo" class="w-full h-full rounded overflow-hidden relative">
              <img :src="previewLogo" class="object-cover w-full h-full" />
              <button @click="removeimagehotelOurdoor"
                class="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-red-500 hover:text-white transition">
                ❌
              </button>
            </div>
          </div>

        </div>

        <div class="flex justify-center flex-col items-center mb-4">
          <div class="flex space-x-1 mb-2">
            <p class="pl-3 text-center">ใบอนุญาติประกอบธุรกิจ
              <br />
              <span>(Business license) </span>
            </p><!--businessLicense-->
          </div>
          <!-- ช่อง input file ซ่อน -->
          <input type="file" id="input-businessLicense" @change="handleFile($event, 'businessLicense')"
            accept="application/pdf" class="hidden" />

          <div class="relative w-60 h-40">
            <label v-if="!selectedPdf" for="input-businessLicense"
              class="w-full h-full flex items-center justify-center border-2 border-dashed border-gray-400 rounded cursor-pointer hover:border-yellow-500">
              <span class="text-center text-gray-500 hover:text-yellow-500">
                <div class="text-4xl">+</div>
                <div class="text-sm mt-1">อัปโหลดไฟล์ PDF</div>
              </span>
            </label>

            <div v-else
              class="w-full h-full flex flex-col justify-center items-center bg-gray-100 rounded p-3 relative">
              <p class="text-sm text-gray-700 break-words text-center">{{ selectedPdf.name }}
              </p>
              <button @click="removePdf"
                class="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-red-500 hover:text-white transition">
                ❌
              </button>
            </div>
          </div>

        </div>

      </div>


      <div class="flex items-center mb-8  mt-32">
        <div class="flex-grow border-t border-gray-300"></div>
        <span class="mx-4 text-gray-500 font-medium">ที่ตั้งที่พัก</span>
        <div class="flex-grow border-t border-gray-300"></div>
      </div>
      <div class="mb-5">
        <div class="flex space-x-1  my-1">
          <p class="pl-3">บ้านเลขที่ (Address)</p><!--address-->
          <p class="text-red-600">*</p>
        </div>
        <input v-model="address" class="w-full py-2 border rounded-md px-3" placeholder="บ้นเลขที่" />
      </div>
      <div class="mb-5">
        <div class="flex space-x-1  my-1">
          <p class="pl-3">ตำบล (Subdistrict)</p><!--subdistrict-->
          <p class="text-red-600">*</p>
        </div>
        <input v-model="subdistrict" class="w-full py-2 border rounded-md px-3" placeholder="ตำบล" />
      </div>
      <div class="mb-5">
        <div class="flex space-x-1  my-1">
          <p class="pl-3">อำเภอ (District)</p>
          <p class="text-red-600">*</p><!--district-->
        </div>
        <input v-model="district" class="w-full py-2 border rounded-md px-3" placeholder="อำเภอ" />
      </div>
      <div class="mb-5">
        <div class="flex space-x-1  my-1">
          <p class="pl-3">จังหวัด (Province)</p><!--province-->
          <p class="text-red-600">*</p>
        </div>
        <input v-model="province" class="w-full py-2 border rounded-md px-3" placeholder="จังหวัด" />
      </div>
      <div class="mb-5">
        <div class="flex space-x-1  my-1">
          <p class="pl-3">รหัสไปรษณีย์ (PostNumber)</p><!--postcode-->
          <p class="text-red-600">*</p>
        </div>
        <input v-model="postcode" class="w-full py-2 border rounded-md px-3" placeholder="รหัสไปรษณีย์" />
      </div>


      <div>
        <div id="map" style="height: 400px;"></div>
        <div class="text-xs flex justify-center space-x-4">
          <p>Latitude: {{ latitude }}</p>
          <p>Longitude: {{ longitude }}</p>
        </div>
      </div>
    </div>

    <div>
      <div class="relative mt-8">
        <div class="relative">
          <p class="my-1">UserName</p><!--username-->
          <input v-model="username" placeholder="Username" class="border w-full py-2 px-3 mb-4 rounded-md" />
          <p class="my-1">Password</p><!--password-->
          <div class="relative w-full mb-4 ">
            <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="Password"
              class="border w-full py-2 px-3 pr-10 rounded-md" />
            <button type="button" @click="togglePassword"
              class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
              <span v-if="showPassword">🙉</span>
              <span v-else>🙈</span>
            </button>
          </div>

        </div>
      </div>
    </div>

    <div class="flex justify-center space-x-3 mt-20">
      <button @click="submitForm"
        class="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-500">สมัครสมาชิกพาร์ทเนอร์</button>
      <button class="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-500">กลับหน้าหลัก</button>
    </div>
  </div>




</template>
<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

function navigateToLoginPartner() {
  router.push('/loginpartner')
}

// ======= ฟอร์มข้อมูลหลัก (reactive) =======
const formData = reactive({
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  idenNumber: '',
  visaNumber: '',
  hotelName: '',
  companyName: '',
  hotelType: ''
})

const sex = ref('')
const address = ref('')
const subdistrict = ref('')
const district = ref('')
const province = ref('')
const postcode = ref('')
const username = ref('')
const password = ref('')
const showPassword = ref(false)
const selectedHotelType = ref(null)
const hotelTypes = ref([])



// ======= toggle password =======
const togglePassword = () => {
  showPassword.value = !showPassword.value
}

// ======= ไฟล์รูปและเอกสาร (reactive + preview) =======
const imageFiles = reactive({
  imageIden: null,
  imageVisa: null,
  imagehotelOurdoor: null,
  businessLicense: null
})

const previewIden = ref(null)
const previewVisa = ref(null)
const previewLogo = ref(null)
const selectedPdf = ref(null)


const submitForm = async () => {
  try {
    const formDataToSend = new FormData()
    formDataToSend.append('firstname', formData.firstname)
    formDataToSend.append('lastname', formData.lastname)
    formDataToSend.append('email', formData.email)
    formDataToSend.append('phone', formData.phone)
    formDataToSend.append('idenNumber', formData.idenNumber)
    formDataToSend.append('visaNumber', formData.visaNumber)
    formDataToSend.append('hotelName', formData.hotelName)
    formDataToSend.append('companyName', formData.companyName)

    formDataToSend.append('sex', sex.value)
    formDataToSend.append('hotelLatitude', latitude.value)
    formDataToSend.append('hotelLongitude', longitude.value)
    formDataToSend.append('hotelType', selectedHotelType.value)

    if (imageFiles.imagehotelOurdoor) formDataToSend.append('imagehotelOurdoor', imageFiles.imagehotelOurdoor)
    if (imageFiles.imageIden) formDataToSend.append('imageIden', imageFiles.imageIden)
    if (imageFiles.imageVisa) formDataToSend.append('imageVisa', imageFiles.imageVisa)
    if (imageFiles.businessLicense) formDataToSend.append('pdfLegalDocument', imageFiles.businessLicense)


    const response = await fetch('http://localhost:9999/HotelSleepGun/partner/register', {
      method: 'POST',
      body: formDataToSend,
    })

    if (!response.ok) {
      throw new Error('Failed to submit form')
    }

    const result = await response.json()
    console.log('Response:', result)
    alert('ลงทะเบียนสำเร็จ!')

  } catch (error) {
    console.error(error)
    alert('เกิดข้อผิดพลาดในการส่งข้อมูล')
  }
}

// ======= ฟังก์ชันอัปโหลดไฟล์และแสดงพรีวิว =======
const handleFile = (event, type) => {
  const file = event.target.files[0]
  if (!file) return

  imageFiles[type] = file

  if (type === 'businessLicense') {
    selectedPdf.value = file
  } else {
    const reader = new FileReader()
    reader.onload = e => {
      if (type === 'imageIden') previewIden.value = e.target.result
      if (type === 'imageVisa') previewVisa.value = e.target.result
      if (type === 'imagehotelOurdoor') previewLogo.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}



// ======= ฟังก์ชันลบรูปและเอกสาร =======
const removeImageIden = () => {
  imageFiles.imageIden = null
  previewIden.value = null
}

const removeImageVisa = () => {
  imageFiles.imageVisa = null
  previewVisa.value = null
}

const removeimagehotelOurdoor = () => {
  imageFiles.imagehotelOurdoor = null
  previewLogo.value = null
}

const removePdf = () => {
  imageFiles.businessLicense = null
  selectedPdf.value = null
}

// ======= latitude, longitude =======
const latitude = ref(null)
const longitude = ref(null)


// ======= โหลด Google Map และจับตำแหน่ง =======
onMounted(async () => {
  fetchHotelTypes();

  const defaultLat = 13.7563
  const defaultLng = 100.5018

  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: defaultLat, lng: defaultLng },
    zoom: 13
  })

  let marker = new google.maps.Marker({
    position: { lat: defaultLat, lng: defaultLng },
    map: map,
    draggable: true
  })

  latitude.value = defaultLat
  longitude.value = defaultLng

  marker.addListener('dragend', (e) => {
    latitude.value = e.latLng.lat()
    longitude.value = e.latLng.lng()
  })
})

async function fetchHotelTypes() {
  try {
    const res = await axios.get("http://localhost:9999/HotelSleepGun/typeHotel/getAll");
    console.log('hotelTypes data:', res.data);
    hotelTypes.value = res.data;
  } catch (error) {
    console.error(error);
  }
}



// import Modal from "@/components/element/Dialog.vue";
// import { ref, reactive, onMounted } from 'vue'
// import { useRouter } from 'vue-router'
// import axios from 'axios'

// import FloatInput from '@/components/element/FloatInput.vue'
// import FloatInputTextarea from '@/components/element/FloatInputTextarea.vue'
// import InputNumber from "@/components/element/InputNumber.vue";
// import Dropdown from "@/components/element/Dropdown.vue";
// import ButtonSave from "@/components/element/ButtonSave.vue";
// import ButtonReset from "@/components/element/ButtonReset.vue";
// import ButtonCancel from "@/components/element/ButtonCancel.vue";

// import { watch } from 'vue'
// import { nextTick } from 'vue'

// const inputRefs = ref({})
// const showModal = ref(false);

// const router = useRouter()

// function navigateToLoginPartner() {
//   router.push('/loginpartner')
// }

// // ======= ฟอร์มข้อมูลหลัก (reactive) =======
// const formData = reactive({
//   firstname: '',
//   lastname: '',
//   email: '',
//   phone: '',
//   idenNumber: '',
//   visaNumber: '',
//   hotelName: '',
//   companyName: '',
//   hotelType: '',
//   sex: '',
//   address: '',
//   subdistrict: '',
//   district: '',
//   province: '',
//   postcode: '',
//   username: '',
//   password: '',
// })

// const errors = ref({
//   firstname: '',
//   lastname: '',
//   email: '',
//   phone: '',
//   idenNumber: '',
//   visaNumber: '',
//   hotelName: '',
//   companyName: '',
//   hotelType: '',
//   sex: '',
//   address: '',
//   subdistrict: '',
//   district: '',
//   province: '',
//   postcode: '',
//   username: '',
//   password: '',
//   imageIden: '',
//   imageVisa: '',
//   imagehotelOurdoor: '',
//   businessLicense: '',
// })

// const hotelTypes = ref([])

// const highlightField = ref('')

// function scrollToFirstErrorWithAnimation() {
//   const firstErrorKey = Object.keys(errors.value).find((key) => errors.value[key])
//   const el = inputRefs.value[firstErrorKey]
//   if (el && el.$el) {
//     el.$el.scrollIntoView({ behavior: 'smooth', block: 'center' })
//   } else if (el && el.scrollIntoView) {
//     el.scrollIntoView({ behavior: 'smooth', block: 'center' })
//   }
//   if (firstErrorKey) {
//     highlightField.value = firstErrorKey
//     setTimeout(() => {
//       highlightField.value = ''
//     }, 1000)
//   }
// }

// function handleSave() {
//   const isValid = validateForm()
//   if (!isValid) {
//     scrollToFirstErrorWithAnimation()
//     return
//   }

//   showConfirmSave.value = true
// }

// function handleReset() {
//   Object.keys(formData).forEach(key => formData[key] = '')
//   Object.keys(errors).forEach(key => errors[key] = '')
//   highlightField.value = ''
//   previewIden.value = null
//   previewVisa.value = null
//   previewLogo.value = null
//   selectedPdf.value = null
//   Object.keys(imageFiles).forEach(key => imageFiles[key] = null)
// }

// function handleCancel() {
//   router.back()
// }

// const showConfirmSave = ref(false)
// function confirmSave() {
//   console.log('✅ บันทึกสำเร็จ! ส่ง API ได้เลย')
//   console.log({ ...formData })
//   showConfirmSave.value = false
// }

// function validateForm() {
//   let isValid = true
//   Object.keys(errors).forEach(key => errors[key] = '')
//   if (!formData.firstname.trim()) {
//     errors.firstname = 'กรุณากรอกชื่อ'
//     isValid = false
//   }
//   if (!formData.lastname.trim()) {
//     errors.lastname = 'กรุณากรอกนามสกุล'
//     isValid = false
//   }
//   if (!formData.sex) {
//     errors.sex = 'กรุณาเลือกเพศ'
//     isValid = false
//   }
//   if (!formData.email.trim()) {
//     errors.email = 'กรุณากรอกอีเมล'
//     isValid = false
//   }
//   if (!formData.phone.trim()) {
//     errors.phone = 'กรุณากรอกเบอร์โทร'
//     isValid = false
//   }
//   if (!formData.idenNumber.trim()) {
//     errors.idenNumber = 'กรุณากรอกเลขบัตรประชาชน'
//     isValid = false
//   }
//   if (!formData.visaNumber.trim()) {
//     errors.visaNumber = 'กรุณากรอกเลขวีซ่า'
//     isValid = false
//   }
//   if (!formData.hotelName.trim()) {
//     errors.hotelName = 'กรุณากรอกชื่อที่พัก'
//     isValid = false
//   }
//   if (!formData.companyName.trim()) {
//     errors.companyName = 'กรุณากรอกชื่อบริษัท'
//     isValid = false
//   }
//   if (!formData.hotelType) {
//     errors.hotelType = 'กรุณาเลือกประเภทห้องของโรงแรม'
//     isValid = false
//   }
//   if (!formData.address.trim()) {
//     errors.address = 'กรุณากรอกที่อยู่'
//     isValid = false
//   }
//   if (!formData.subdistrict.trim()) {
//     errors.subdistrict = 'กรุณากรอกตำบล'
//     isValid = false
//   }
//   if (!formData.district.trim()) {
//     errors.district = 'กรุณากรอกอำเภอ'
//     isValid = false
//   }
//   if (!formData.province.trim()) {
//     errors.province = 'กรุณากรอกจังหวัด'
//     isValid = false
//   }
//   if (!formData.postcode.trim()) {
//     errors.postcode = 'กรุณากรอกรหัสไปรษณีย์'
//     isValid = false
//   }
//   if (!formData.username.trim()) {
//     errors.username = 'กรุณากรอกชื่อผู้ใช้'
//     isValid = false
//   }
//   if (!formData.password.trim()) {
//     errors.password = 'กรุณากรอกรหัสผ่าน'
//     isValid = false
//   }
//   if (!imageFiles.imageIden) {
//     errors.imageIden = 'กรุณาอัปโหลดรูปบัตรประชาชน'
//     isValid = false
//   }
//   if (!imageFiles.imageVisa) {
//     errors.imageVisa = 'กรุณาอัปโหลดรูปวีซ่า'
//     isValid = false
//   }
//   if (!imageFiles.imagehotelOurdoor) {
//     errors.imagehotelOurdoor = 'กรุณาอัปโหลดรูปที่พักด้านนอก'
//     isValid = false
//   }
//   if (!imageFiles.businessLicense) {
//     errors.businessLicense = 'กรุณาอัปโหลดใบอนุญาตประกอบธุรกิจ'
//     isValid = false
//   }
//   if (!latitude.value || isNaN(Number(latitude.value))) {
//     errors.latitude = 'กรุณากรอกละติจูด (ตัวเลข)'
//     isValid = false
//   }
//   if (!longitude.value || isNaN(Number(longitude.value))) {
//     errors.longitude = 'กรุณากรอกลองจิจูด (ตัวเลข)'
//     isValid = false
//   }
//   return isValid
// }



// // ======= toggle password =======
// const showPassword = ref(false)
// const togglePassword = () => {
//   showPassword.value = !showPassword.value
// }

// // ======= ไฟล์รูปและเอกสาร (reactive + preview) =======
// const imageFiles = reactive({
//   imageIden: null,
//   imageVisa: null,
//   imagehotelOurdoor: null,
//   businessLicense: null
// })

// const previewIden = ref(null)
// const previewVisa = ref(null)
// const previewLogo = ref(null)
// const selectedPdf = ref(null)


// const submitForm = async () => {
//   if (!validateForm()) {
//     const firstErrorKey = Object.keys(errors).find(key => errors[key])
//     highlightField.value = firstErrorKey
//     setTimeout(() => { highlightField.value = '' }, 1000)
//     return
//   }
//   try {
//     const formDataToSend = new FormData()
//     Object.keys(formData).forEach(key => formDataToSend.append(key, formData[key]))
//     formDataToSend.append('hotelLatitude', latitude.value)
//     formDataToSend.append('hotelLongitude', longitude.value)
//     if (imageFiles.imagehotelOurdoor) formDataToSend.append('imagehotelOurdoor', imageFiles.imagehotelOurdoor)
//     if (imageFiles.imageIden) formDataToSend.append('imageIden', imageFiles.imageIden)
//     if (imageFiles.imageVisa) formDataToSend.append('imageVisa', imageFiles.imageVisa)
//     if (imageFiles.businessLicense) formDataToSend.append('pdfLegalDocument', imageFiles.businessLicense)
//     const response = await fetch('http://localhost:9999/HotelSleepGun/partner/register', {
//       method: 'POST',
//       body: formDataToSend,
//     })
//     if (!response.ok) {
//       throw new Error('Failed to submit form')
//     }
//     const result = await response.json()
//     alert('ลงทะเบียนสำเร็จ!')
//   } catch (error) {
//     alert('เกิดข้อผิดพลาดในการส่งข้อมูล')
//   }
// }

// // ======= ฟังก์ชันอัปโหลดไฟล์และแสดงพรีวิว =======
// const handleFile = (event, type) => {
//   const file = event.target.files[0]
//   if (!file) return

//   imageFiles[type] = file

//   if (type === 'businessLicense') {
//     selectedPdf.value = file
//   } else {
//     const reader = new FileReader()
//     reader.onload = e => {
//       if (type === 'imageIden') previewIden.value = e.target.result
//       if (type === 'imageVisa') previewVisa.value = e.target.result
//       if (type === 'imagehotelOurdoor') previewLogo.value = e.target.result
//     }
//     reader.readAsDataURL(file)
//   }
// }



// // ======= ฟังก์ชันลบรูปและเอกสาร =======
// const removeImageIden = () => {
//   imageFiles.imageIden = null
//   previewIden.value = null
// }

// const removeImageVisa = () => {
//   imageFiles.imageVisa = null
//   previewVisa.value = null
// }

// const removeimagehotelOurdoor = () => {
//   imageFiles.imagehotelOurdoor = null
//   previewLogo.value = null
// }

// const removePdf = () => {
//   imageFiles.businessLicense = null
//   selectedPdf.value = null
// }

// // ======= latitude, longitude =======
// const latitude = ref('')
// const longitude = ref('')


// // ======= (ลบ Google Map ออกทั้งหมด) =======
// // ======= โหลด Google Map และจับตำแหน่ง =======
// async function fetchHotelTypes() {
//   try {
//     const res = await axios.get("http://localhost:9999/HotelSleepGun/typeHotel/getAll");
//     console.log('hotelTypes data:', res.data);
//     hotelTypes.value = res.data;
//   } catch (error) {
//     console.error(error);
//   }
// }

// const provinceOptions = ref([])
// const districtOptions = ref([])
// const subdistrictOptions = ref([])
// async function fetchProvinces() {
//   try {
//     console.log('--- เริ่ม fetchProvinces ---');
//     const res = await axios.get('http://localhost:9999/HotelSleepGun/provinceData/provinces');
//     console.log('API response:', res.data);
//     provinceOptions.value = res.data.map(p => ({ value: String(p.id), label: p.name }))
//     console.log('provinceOptions after map:', provinceOptions.value);
//   } catch (err) {
//     console.error('fetchProvinces error:', err);
//   }
// }
// async function fetchDistricts(provinceId) {
//   if (!provinceId) { districtOptions.value = []; return }
//   const res = await axios.get('http://localhost:9999/HotelSleepGun/provinceData/amphures', { params: { provinceId } })
//   districtOptions.value = res.data.map(d => ({ value: d.id, label: d.name }))
// }
// async function fetchSubdistricts(districtId) {
//   if (!districtId) { subdistrictOptions.value = []; return }
//   const res = await axios.get('http://localhost:9999/HotelSleepGun/provinceData/tambons', { params: { amphureId: districtId } })
//   subdistrictOptions.value = res.data.map(s => ({ value: s.id, label: s.name, zip: s.zip_code }))
// }
// function onProvinceChange(val) {
//   console.log('เลือกจังหวัด:', val);
//   formData.district = ''
//   formData.subdistrict = ''
//   formData.postcode = ''
//   fetchDistricts(val)
//   districtOptions.value = []
//   subdistrictOptions.value = []
// }
// function onDistrictChange(val) {
//   formData.subdistrict = ''
//   formData.postcode = ''
//   fetchSubdistricts(val)
//   subdistrictOptions.value = []
// }
// function onSubdistrictChange(val) {
//   const sub = subdistrictOptions.value.find(s => s.value === val)
//   formData.postcode = sub ? sub.zip : ''
// }
// onMounted(() => {
//   console.log('onMounted: เรียก fetchProvinces');
//   fetchProvinces();
//   setTimeout(() => {
//     console.log('provinceOptions after fetch (timeout):', provinceOptions.value);
//   }, 2000);
// })

/*
function loadGoogleMapsScript() {
    return new Promise((resolve, reject) => {
        if (window.google && window.google.maps) {
            resolve(window.google)
            return
        }
        const script = document.createElement('script')
        script.src = 'https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places'
        script.async = true
        script.defer = true
        script.onload = () => resolve(window.google)
        script.onerror = () => reject(new Error('Google Maps script load error'))
        document.head.appendChild(script)
    })
}
*/
</script>




<style>
#map {
  width: 100%;
  height: 400px;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cfcfcf;
  border-radius: 4px;
}

.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background-color: #a8a8a8;
}
</style>
