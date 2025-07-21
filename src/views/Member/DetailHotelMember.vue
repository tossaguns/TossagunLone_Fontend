<template>
  <div>
    <div class="sticky top-0 z-50">
      <Bar />
    </div>
    <div class="min-h-screen">
      <div class="max-w-7xl mx-auto text-stone-600">

        <div class="mt-8">
          <div class=" flex space-x-3 px-4">
            <img src="/images/icon/company_nav.png" class="w-8" />
            <label class="text-2xl font-bold text-black">{{ }}ชื่อที่พัก</label>
          </div>

          <div class="mb-6 mt-2 px-4">
            <hr class="border" />
          </div>

          <div class="flex flex-col lg:flex-row justify-between items-center space-x-4 px-4">
            <div>
              <Gallery />
            </div>

            <div class="lg:w-1/3 border rounded-lg w-full hidden lg:block">
              <div>
                <iframe class="w-full h-full rounded-t-lg" frameborder="0" style="border:0" loading="lazy"
                  allowfullscreen referrerpolicy="no-referrer-when-downgrade" :src="mapUrl"></iframe>
                <div class="flex justify-center mt-2 text-xs space-x-2">
                  <label>ละติจูด : {{ }} 1245.1574</label>
                  <label>ลองติจูด : {{ }} 15.149</label>
                </div>
              </div>

              <div class="px-6 py-7">
                <div>
                  <label>บ้านเลขที่ : <span class="font-bold">{{ }} 12/8</span></label>
                </div>
                <div>
                  <label>ตำบล : <span class="font-bold">{{ }} sujoikuol</span></label>
                </div>
                <div>
                  <label>อำเภอ : <span class="font-bold"> {{ }} dyujyrtiko</span></label>
                </div>
                <div>
                  <label>จังหวัด : <span class="font-bold">{{ }} dyjuk</span></label>
                </div>
                <div>
                  <label>รหัสไปรษณีย์ : <span class="font-bold">{{ }} 54878</span></label>
                </div>
              </div>

            </div>
          </div>

          <div class="md:px-8 px-4">
            <div class="mt-6">
              <label class="block mt-2 indent-8">{{
                }}ประเภทของห้องพักโรงแรมคือการจำแนกประเภทห้องพักที่มีให้บริการในโรงแรม การแบ่ง ‘ประเภท’
                ห้องพักจะช่วยให้แขกเข้าใจได้อย่างชัดเจนว่าพวกเขากำลังจองห้องพักลักษณะไหนในขณะวางแผนการท่องเที่ยว
                ประเภทห้องพักโรงแรมมีรูปแบบแตกต่างกันไปตามขนาด จำนวนและประเภทของเตียง สิ่งอำนวยความสะดวก
                และสิ่งที่แขกสามารถทำได้ภายในห้อง (เช่น ห้องที่อนุญาตให้สูบบุหรี่หรือไม่ให้สูบบุหรี่)
              </label>
            </div>

            <div class="mt-2">
              <label class="font-bold">เกี่ยวกับที่พัก</label>
              <div class="text-sm ">
                <label class="block indent-8">{{ }}ประเภทของห้องพักในโรงแรมมีบมบาทสำคัญในการตัดสินใจจองห้องพักของแขก
                  และแม้กระทั่งการตัดสินใจว่าจะจองหรือไม่
                  การเสนอห้องพักที่กลุ่มเป้าหมายของคุณต้องการจึงเป็นสิ่งสำคัญแต่ก็ควรมีตัวเลือกหลายรูปแบบสำหรับรองรับแขกคนอื่น
                  ๆ ด้วย ซึ่งจะช่วยเพิ่มอัตราการเข้าพักและรายได้ให้มากขึ้น</label>
              </div>
              <div>
                <!-- ใส่ไอคอนที่นี่ -->
              </div>
            </div>
            <div class="mt-2">
              <label class="font-bold">ทำเลที่ตั้ง</label>
              <div class="text-sm ">
                <label class="block indent-8">{{ }}โรงแรมสมัยใหม่มักจะรองรับแขกหลากหลายประเภท
                  ตั้งแต่คู่รักไปจนถึงครอบครัว
                  ลายเพื่อตอบสนองความต้องการของแขกที่แตกต่างกัน</label>
              </div>
              <div>
                <!-- ใส่ไอคอนที่นี่ -->
              </div>
            </div>
            <div class="mt-2">
              <label class="font-bold">สิ่งอำนวยความสะดวกภายในห้อง</label>
              <div class="text-sm ">
                <label class="block indent-8">{{ }}ห้องเดี่ยว ดับเบิ้ลรูม ห้องเตียงควีนไซซ์ ห้องสวีท?
                  ตัวเลือกประเภทของห้องพักที่สามารถมอบประสบการณ์การเข้าพักให้ตรงตามความต้องการของแขกยังมีมากกว่านี้อีก</label>
              </div>
              <div>
                <!-- ใส่ไอคอนที่นี่ -->
              </div>
            </div>
            <div class="mt-2">
              <label class="font-bold">การรองรับสัตวืเลี้ยง</label>
              <div class="text-sm ">
                <label class="block indent-8">{{ }}บล็อกนี้ เราจะพาคุณไปเจาะลึกประเภทของพักโรงแรมฉบับสมบูรณ์
                  เพื่อให้โรงแรมของคุณสามารถกำหนดและวางกลยุทธ์การขายห้องพักออนไลน์ให้ประสบความสำเร็จได้มากยิ่งขึ้น</label>
              </div>
              <div>
                <!-- ใส่ไอคอนที่นี่ -->
              </div>
            </div>
            <div class="mt-2">
              <label class="font-bold">มื้ออาหาร</label>
              <div class="text-sm ">
                <label class="block indent-8">{{ }}เป็นห้องขนาดใหญ่ที่เหมาะสำหรับแขก 4 คน และมักจะมีเตียงคู่ 2
                  เตียง</label>
              </div>
              <div>
                <!-- ใส่ไอคอนที่นี่ -->
              </div>
            </div>
          </div>

          <div class="px-8 mt-20">
            <div class="flex flex-col justify-center items-center">
              <label class="font-bold">ช่วงเวลาในการเข้าใช้บริการ</label>
              <div class="flex items-center">
                <div class="flex justify-center items-center flex-col md:px-6">
                  <div class="my-4">
                    <img src="/imgHotel/checkin.jpg" class="w-20 h-20 object-cover  rounded-full shadow-lg">
                  </div>
                  <label>เวลาเช็คอิน</label>
                  <label>{{ }} 14.00 - {{ }} 20.00</label>
                </div>

                <div class="w-px bg-gray-400 mx-4 my-4 self-stretch"></div>

                <div class="flex justify-center items-center flex-col md:px-6">
                  <div class="my-4">
                    <img src="/imgHotel/checkout.jpg" class="w-20 h-20 object-cover  rounded-full shadow-lg">
                  </div>
                  <label>เวลาเช็ค้าท์</label>
                  <label>{{ }} 9.00 - {{ }} 12.00</label>
                </div>

              </div>
            </div>
          </div>

          <div class="px-4 mt-20">
            <label class="px-4 text-xl font-bold">ห้องพัก</label>


            <div class="flex flex-col lg:flex-row justify-between border rounded-lg">
              <div class="w-3/4 flex flex-col md:flex-row justify-between items-center p-4 ">
                <div class="w-1/3">
                  <img src="/imgHotel/sea.jpg" class="w-[300px] h-[200px] object-cover rounded-md" />
                </div>

                <div class="w-2/3">
                  <label>ห้อง : {{ }} A024</label>
                </div>
              </div>

              <div class="w-1/4 flex flex-col justify-center items-center">
                <div>
                  <label>{{  }} 2500</label>
                </div>
                <div>
                  <label class="text-2xl font-bold ">{{  }} 2000</label>
                </div>
                <div>
                  <button class="bg-red-500 text-white py-2 px-4 rounded-lg">เพิ่มลงตะกร้า</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Bar from "@components/BarMember.vue";
import Footer from "@components/FooterLoneTossagun.vue";
import Gallery from "@components/element/Gallery.vue";
import { useRouter } from 'vue-router';
const router = useRouter();

const mapUrl =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.725152370527!2d100.52318681534138!3d13.736717401027756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2992e2dc0db0d%3A0x78e9f0aa1d401c6c!2z4LiB4Li44Lih4LiE4Lij4Li04Lip4Lix4LiU4Lij4Liw4Lia4Li54LiZ4LiiIOC4l-C4quC4suC4geC4seC4meC4suC4geC4peC4seC4lOC4hOC4meC4reC4mQ!5e0!3m2!1sth!2sth!4v1620278354921!5m2!1sth!2sth'

</script>
