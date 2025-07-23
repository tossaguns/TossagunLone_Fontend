<template>
    <div class="noto-sans-thai-uniquifier w-[794px] h-[1123px] mx-auto mt-10 mb-10 py-5 px-5 shadow-2xl">

        <div class="px-20 flex justify-between mt-4 mb-3">
            <img :src="company.image" alt="Company Image" width="85" height="80" />
            <div class="mt-4">
                <h1 class="text-3xl font-bold">ใบกำกับภาษีอย่างย่อ</h1>
                <p class="text-center">ต้นฉบับ(เอกสารออกเป็นชุด)</p>
            </div>
        </div>

        <hr class="border" />

        <div class="text-xs">
            <div class="mt-3 flex justify-between">
                <div class="flex flex-col w-1/2 pl-3">
                    <div>
                        <p class="font-bold ">บริษัท :</p>

                        <div class="pl-3">
                            <div>
                                <p>{{ company.name }}</p>
                            </div>
                            <div class="flex space-x-2">
                                <p>สาขา</p>
                                <p>{{ company.branch }}</p>
                            </div>
                            <div>
                                <p>{{ company.address }}</p>
                            </div>
                            <div class="flex space-x-2">
                                <p class="font-bold">เลขที่ผู้เสียภาษี : </p>
                                <p>{{ company.numbertax }}</p>
                            </div>
                            <div class="flex space-x-2">
                                <p class="font-bold">ติดต่อ : </p>
                                <p>{{ company.tel }}</p>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="w-1/2 flex flex-col pl-4">
                    <div>
                        <div class="flex justify-between">
                            <p class="w-1/2 pl-5 font-bold">เลขที่</p>
                            <p class="w-1/2">{{ company.number }}</p>
                        </div>
                        <div class="flex justify-between">
                            <p class="w-1/2 pl-5 font-bold">วันที่</p>
                            <p class="w-1/2">{{ company.date }}</p>
                        </div>
                        <div class="flex justify-between">
                            <p class="w-1/2 pl-5 font-bold">เครดิต</p>
                            <p class="w-1/2">{{ company.credit }}</p>
                        </div>
                        <div class="flex justify-between">
                            <p class="w-1/2 pl-5 font-bold">ครบกำหนด</p>
                            <p class="w-1/2">{{ company.due }}</p>
                        </div>
                        <div class="flex justify-between">
                            <p class="w-1/2 pl-5 font-bold">ผู้ออกใบกำเสร็จ</p>
                            <p class="w-1/2">{{ company.employee }}</p>
                        </div>
                        <div class="flex justify-between">
                            <p class="w-1/2 pl-5 font-bold">อ้างอิง</p>
                            <p class="w-1/2">{{ company.refer }}</p>
                        </div>
                    </div>

                    <hr class="border my-2" />

                    <div>
                        <div class="flex justify-between">
                            <p class="w-1/2 pl-5 font-bold">หัวข้อ</p>
                            <p class="w-1/2">{{ company.topic }}</p>
                        </div>
                    </div>

                </div>
            </div>


            <hr class="border mt-2 mb-3" />


            <div>
                <div class="flex w-full border-2 py-2 font-bold mb-2">
                    <div class="flex flex-col items-center w-[80px]">ลำดับ</div>
                    <div class="flex flex-col w-[100px] pl-2">เลขที่ห้อง</div>
                    <div class="flex flex-col w-[350px]">ประเภทห้อง</div>
                    <div class="flex flex-col items-center w-[100px]">ราคาต่อห้อง</div>
                    <div class="flex flex-col items-center w-[80px]">ส่วนลด</div>
                    <div class="flex flex-col items-center w-[100px]">มูลค่า</div>
                </div>


                <div v-for="(item, index) in rooms" :key="item.id" class="flex w-full mt-1">
                    <div class="flex flex-col items-center w-[80px]">{{ index + 1 }}</div>
                    <div class="flex flex-col w-[80px] break-words whitespace-normal pl-3">{{ item.numberroom }}</div>
                    <div class="flex flex-col w-[350px]">{{ item.typeroom }}</div>
                    <div class="flex flex-col items-center w-[100px]">{{ item.price }}</div>
                    <div class="flex flex-col items-center w-[80px]">{{ item.discount }}</div>
                    <div class="flex flex-col items-center w-[100px]">{{ item.value }}</div>
                </div>
            </div>

            <hr class="border mt-5" />


            <div class="flex justify-between mb-3">
                <div class="flex flex-col w-1/2">
                </div>

                <div class="flex flex-col w-1/2 px-3 mt-3">
                    <div class="flex justify-between">
                        <p>รวมเป็นเงิน</p>
                        <p>{{}}บาท</p>
                    </div>
                    <div class="flex justify-between">
                        <p>ส่วนลด</p>
                        <p>{{}}บาท</p>
                    </div>
                    <div class="flex justify-between">
                        <p>จำนวนเงินหลังหักส่วนลด</p>
                        <p>{{}}บาท</p>
                    </div>

                    <div class="flex justify-between mt-3">
                        <p>จำนวนเงินรวมภาษีมูลค่าเพิ่ม</p>
                        <p>{{}}บาท</p>
                    </div>
                </div>
            </div>

            <hr class="border mt-2 " />

            <div>
                <div class="flex justify-between">
                    <div class="flex flex-col w-1/2">
                    </div>

                    <div class="flex flex-col w-1/2">
                        <div class="mt-20 flex justify-center">
                            <img :src="company.signature" alt="Company Image" width="85" height="80" />
                        </div>
                    </div>

                </div>

                <div class="flex justify-between">
                    <div class="flex flex-col w-1/2">
                        <div>
                            <p class="text-center mb-2">ลงชื่อ.............................................ผู้รับสินค้า
                            </p>
                            <p class="text-center">(..................................................)</p>
                        </div>
                    </div>

                    <div class="flex flex-col w-1/2">
                        <div>
                            <p class="text-center mb-2">ลงชื่อ.............................................ผู้รับเงิน
                            </p>
                            <p class="text-center">( {{ company.sellername }} )</p>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    </div>

    <div class="mt-4 mb-6 flex justify-center space-x-2 print:hidden px-2">
        <button
            class="bg-lime-600 px-4 py-2 rounded-lg shadow-lg text-lg text-white font-bold hover:bg-lime-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            บันทึก
        </button>
        <button
            class="bg-blue-600 px-4 py-2 rounded-lg shadow-lg text-lg text-white font-bold hover:bg-blue-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            พิมพ์
        </button>
        <button
            class="bg-red-600 px-4 py-2 rounded-lg shadow-lg text-lg text-white font-bold hover:bg-red-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            ออก
        </button>
    </div>
</template>

<script>
export default {
    name: "CompanyDisplay",
    data() {
        return {
            company: {
                image: "/ImgTossagun/LINE_ALBUM_5.jpg",
                signature: "/ImgTossagun/welcom.jpg",
                ownername: "นายวาทิน มีนาบางวัน",
                sellername: "นางสาว มานี วันนี้นะ",
                name: "บริษัท โกลด์ ลักซ์ จำกัด",
                branch: "สำนักงานใหญ่ บางนา",
                address: "1/586 หมู่ 12 ตำบลบางนา อำเภอบางนา จังหวัดกรุงเทพฯ 10260",
                numbertax: "0105551234567",
                tel: "02-123-4567",
                website: "www.goldluxhotel.com",
                numberreceipt: "INV20250521001",
                date: "21 พฤษภาคม 2025",
                numberroom: "ห้อง 101",
                typeroom: "ห้องเดี่ยว",
                detailroom: "พร้อมวิวทะเลและสิ่งอำนวยความสะดวกครบครัน",
                quantity: 1,
                pricetex: "1,284.00",
                rebate: "0.00",
                exemptiontax: "0.00",
                price: "1,200.00",
                vat: "84.00",
                allprice: "1,284.00",
                Total: "1,284.00",

                addresscustomer: "6/54 หมู่ 12 ตำบลบางนา อำเภอบางนา จังหวัดกรุงเทพฯ 10260",
                numbertexcustomer: "54861154451",

                number: "004577",
                credit: "30 วัน",
                due: "29 พฤษภาคม 2025",
                employee: "นางสาวสมหญิง จริงใจ",
                refer: "GO0004586",

                topic: "เช่าห้องพัก",
                namecustomer: "นายสุขขี นิรันด์",
                telcustomer: "0459684444",
                emailcustomer: "t8yueid@gmail.com",
            },
            rooms: [
                {
                    id: 1,
                    numberroom: "A102",
                    typeroom: "ห้องพักวิวทะเล พร้อมระเบียงส่วนตัว",
                    price: 500,
                    discount: "10%",
                    value: 900,
                },
                {
                    id: 2,
                    numberroom: "S203",
                    typeroom: "ห้องพักวิวทะเล พร้อมระเบียงส่วนตัว",
                    price: 750,
                    discount: "5%",
                    value: 712.5,
                },
                {
                    id: 3,
                    numberroom: "S200",
                    typeroom: "ห้องสวีทสุดหรู พร้อมบริการรูมเซอร์วิส",
                    price: 1500,
                    discount: "0%",
                    value: 1500,
                },
            ],
        };
    },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@100..900&display=swap');

.noto-sans-thai-uniquifier {
    font-family: "Noto Sans Thai", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
    font-variation-settings: "wdth" 100;
}
</style>