TODO: กลับมาเเก้ไขด้วย ให้คำถามตรงกัน เเละทำเปลี่ยนภาษา

<template>
  <div class="pt-8 pb-5">
    <div class="flex flex-col md:flex-row md:justify-between text-stone-500 items-start">
      <div class="md:w-1/2 flex flex-col w-full lg:pl-24 md:pl-8 lg:pr-8 md:pr-2 text-xs px-8 h-full">
        <label class="text-base font-semibold">คำถามที่พบบ่อย</label>

        <div class="card">
          <Accordion>
            <AccordionPanel value="0">
              <AccordionHeader class="text-stone-500">Header I</AccordionHeader>
              <AccordionContent>
                <p class="m-0 text-stone-400">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                  et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo
                  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                  nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </AccordionContent>
            </AccordionPanel>
            <AccordionPanel value="1">
              <AccordionHeader class="text-stone-500">Header II</AccordionHeader>
              <AccordionContent>
                <p class="m-0 text-stone-400">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                  totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
                  dicta sunt explicabo. Nemo enim
                  ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
                  dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam
                  eius modi.
                </p>
              </AccordionContent>
            </AccordionPanel>
            <AccordionPanel value="2">
              <AccordionHeader class="text-stone-500">Header III</AccordionHeader>
              <AccordionContent>
                <p class="m-0 text-stone-400">
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum
                  deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non
                  provident, similique sunt in culpa
                  qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis
                  est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil
                  impedit quo minus.
                </p>
              </AccordionContent>
            </AccordionPanel>
          </Accordion>
        </div>
      </div>


      <div class="w-full md:w-1/2 md:pr-8 lg:pr-24 lg:pl-8 md:pl-2 px-8 mt-5">
        <div class="flex flex-col md:flex-row justify-center md:items-stretch gap-4">
          <div class="flex items-center gap-2 max-w-[260px] mx-auto">
            <div class="flex md:flex-col w-full md:space-y-2 space-x-2 md:space-x-0">
              <button class="bg-yellow-400 text-center py-2 l flex justify-center items-center rounded-xl px-3">
                <img src="/img/Product/phone.png" class="w-12">
              </button>
              <button class="bg-yellow-400 text-center py-2  flex justify-center items-center rounded-xl px-3">
                <img src="/img/Product/gps.png" class="w-12">
              </button>
            </div>

            <div class="flex md:flex-col w-full md:space-y-2 space-x-2 md:space-x-0">
              <button class="bg-yellow-400 text-center py-2 
                flex justify-center rounded-xl items-center px-3">
                <img src="/img/Product/facebook.png" class="w-12">
              </button>

              <button class="bg-yellow-400 text-center py-2 
                flex justify-center items-center rounded-xl px-3">
                <img src="/img/Product/line.png" class="w-12">
              </button>
            </div>
          </div>

          <div class="w-full md:w-1/2 flex items-center justify-center">
            <button @click="goToContactMassage"
              class="relative w-full md:h-[140px] h-[80px] border-2 border-yellow-400 rounded-br-3xl rounded-tl-3xl overflow-hidden flex items-end justify-center px-4 pb-4 bg-cover bg-center"
              style="background-image: url('/img/Bar/Tossagun.png');">
              <div class="absolute inset-0 bg-black bg-opacity-90"></div>
              <label
                class="relative z-10 bg-yellow-400 text-black font-bold px-4 py-2 rounded-full hover:bg-yellow-300 transition">
                ติดต่อเรา
              </label>
            </button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';

const router = useRouter()


function goToContactMassage() {
  router.push('/contactmasage')
}

</script>
<style></style>