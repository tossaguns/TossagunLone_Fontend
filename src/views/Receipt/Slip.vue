<template>
    <!--FIXME: ทำพิมพ์ กับบันทึก ออก-->
    <div class="mt-20 rounded-2xl shadow-2xl py-2 px-4 mx-auto w-[302px]">
        <div class="mt-10 mb-4 flex justify-center">
            <img :src="company.image" alt="Company Image" width="175" height="175" />
        </div>

        <div>
            <div class="font-bold text-2xl text-center mb-3">
                <h1>{{ company.name }}</h1>
            </div>

            <div class="flex space-x-3 justify-center">
                <p class="font-bold">สาขา </p>
                <p>{{ company.branch }}</p>
            </div>

            <div class="text-center">
                <p>{{ company.address }}</p>
            </div>

            <div class="mt-5 justify-center flex space-x-2 mb-1">
                <p class="font-bold">เลขที่ผู้เสียภาษี</p>
                <p>{{ company.numbertax }}</p>
            </div>

            <div class="flex justify-center space-x-2">
                <p class="font-bold">ติดต่อ</p>
                <p>{{ company.tel }}</p>
            </div>

            <div class="flex justify-center space-x-2">
                <p class="font-bold">เว็บไซต์</p>
                <p>{{ company.website }}</p>
            </div>
        </div>

        <hr class="border-t-2 border mt-3 mb-4" />

        <div class="mb-2">
            <p class="font-bold text-center">ใบกำกับภาษีเเบบย่อ/ใบเสร็จรับเงิน</p>
            <p class="text-xl text-center">{{ company.numberreceipt }}</p>
        </div>

        <hr class="border-t-2 border-dashed mt-1" />

        <div class="flex justify-between mt-1">
            <p class="font-bold">วันที่</p>
            <p>{{ company.date }}</p>
        </div>

        <hr class="border-t-2 border mt-3 mb-5" />

        <div>
            <div class="font-bold text-center text-xl mb-5">
                <p>รายการ</p>
            </div>

            <div class="flex justify-between">
                <div class="flex space-x-2 text-xl mb-2">
                    <p>{{ company.numberroom }}</p>
                    <p>{{ company.typeroom }}</p>
                </div>
                <div>
                    <p>{{ company.pricetex }}</p>
                </div>
            </div>

            <div>
                <p class="font-bold">รายละเอียด</p>
                <p>{{ company.detailroom }}</p>
            </div>
        </div>

        <hr class="border-t-2 border-dashed mt-1" />

        <div class="mb-6">
            <p>รวม {{ company.quantity }} รายการ</p>
        </div>

        <div class="w-full max-w-md ml-auto">
            <div class="flex justify-between">
                <p>ส่วนลดรวม</p>
                <p>{{ company.rebate }}</p>
            </div>

            <div class="flex justify-between">
                <p>ยอดรวมรายการยกเว้นภาษี</p>
                <p>{{ company.exemptiontax }}</p>
            </div>

            <div class="flex justify-between">
                <p>ราคาสุทธิที่เสียภาษี</p>
                <p>{{ company.pricetex }}</p>
            </div>

            <div class="flex justify-between">
                <p>ภาษีมูลค่าเพิ่ม 7%</p>
                <p>{{ company.vat }}</p>
            </div>

            <div class="flex justify-between">
                <p>มูลค่าทั้งหมด</p>
                <p class="underline underline-offset-8">{{ company.allprice }}</p>
            </div>

            <div class="flex justify-between mt-1">
                <p>ยอดรวมสุทธิ</p>
                <p class="border-b-4 border-black pb-1 leading-none inline-block">{{ company.Total }}</p>
            </div>
        </div>


        <div class="mt-10 text-center text-gray-500 text-sm">
            <p>VAT INCLUDED (จองที่พักกับ TOSSAGUN)</p>
        </div>

        <hr class="border-t-2 border-dashed mt-1 mb-4 border-black" />
    </div>

    <div class="mt-8 mb-6 flex justify-center space-x- print:hidden px-2 space-x-2">
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
            }
        };
    },
};
</script>


<style></style>
