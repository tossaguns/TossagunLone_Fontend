<template>
  <div class="bg-stone-700">
    <div
      class="flex flex-col lg:flex-row lg:justify-between lg:items-stretch py-8 justify-center items-center text-white lg:px-12">
      <div class="lg:w-4/12 flex flex-col justify-center items-center px-4 md:px-0">
        <div class="mb-4">
          <img src="/img/Bar/Tossagun.png" class="w-10" />
        </div>
        <div class="flex justify-center items-center space-x-2">
          <label class="text-xs font-bold text-center">DIGITAL NEW GENRATION CO.,LTD</label>
        </div>
        <div class="text-stone-400 flex flex-col items-center mt-2 text-xxs">
          <label>{{ t('CompanyDetailFooter') }}</label>
          <label>Digital System To Grocery Store</label>
        </div>
      </div>

      <div
        class="md:w-8/12 mt-12 lg:mt-0 w-full md:pl-8 md:px-0 px-8 flex flex-col md:flex-row md:justify-between items-stretch text-xxs">

        <div class="w-full flex flex-col items-center md:items-start">
          <label class="font-bold">{{ t('Company')}}</label>
          <div class="flex flex-col items-start md:mt-4 mt-2 md:space-x-0 w-full md:pr-4">
            <button class="text-stone-400 hover:text-stone-50 flex justify-between items-center w-full">
              <span class="text-left">{{ t('About')}}</span>
              <span class="text-right">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="white" class="w-2 h-2 text-white">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 18.75 18.75 5.25M6 5.25h12.75V18" />
                </svg>
              </span>
            </button>
            <hr class="border border-stone-600 w-full mb-1" />
            <button class="text-stone-400 hover:text-stone-50  flex justify-between items-center w-full">
              <span class="text-left">{{ t('News')}}</span>
              <span class="text-right">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="white" class="w-2 h-2 text-white">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 18.75 18.75 5.25M6 5.25h12.75V18" />
                </svg>
              </span>
            </button>
            <hr class="border border-stone-600 w-full mb-1" />
            <button class="text-stone-400 hover:text-stone-50  flex justify-between items-center w-full">
              <span class="text-left">{{ t('GropCompany')}}</span>
              <span class="text-right">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="white" class="w-2 h-2 text-white">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 18.75 18.75 5.25M6 5.25h12.75V18" />
                </svg>
              </span>
            </button>
            <hr class="border border-stone-600 w-full mb-1" />
            <button class="text-stone-400 hover:text-stone-50  flex justify-between items-center w-full">
              <span class="text-left">{{ t('Collaboration')}}</span>
              <span class="text-right">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="white" class="w-2 h-2 text-white">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 18.75 18.75 5.25M6 5.25h12.75V18" />
                </svg>
              </span>
            </button>
            <hr class="border border-stone-600 w-full mb-1" />
          </div>
        </div>

        <div class="w-full flex flex-col items-center md:items-start mt-8 md:mt-0">
          <label class="font-bold">{{ t('SelectHotel') }}</label>
          <div class="flex flex-col items-start md:mt-4 mt-2 md:space-x-0 w-full md:pr-4">
            <button @click="goToTypeHotel"
              class="text-stone-400 hover:text-stone-50  flex justify-between items-center w-full">
              <span class="text-left">{{ t('TypeHotel') }}</span>
              <span class="text-right">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="white" class="w-2 h-2 text-white">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 18.75 18.75 5.25M6 5.25h12.75V18" />
                </svg>
              </span>
            </button>
            <hr class="border border-stone-600 w-full mb-1" />
            <button @click="goToProvinceHotel"
              class="text-stone-400 hover:text-stone-50  flex justify-between items-center w-full">
              <span class="text-left">{{t('ProvinceHotel')}}</span>
              <span class="text-right">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="white" class="w-2 h-2 text-white">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 18.75 18.75 5.25M6 5.25h12.75V18" />
                </svg>
              </span>
            </button>
            <hr class="border border-stone-600 w-full mb-1" />
            <button class="text-stone-400 hover:text-stone-50  flex justify-between items-center w-full">
              <span class="text-left">{{ t('PromotionHotel')}}</span>
              <span class="text-right">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="white" class="w-2 h-2 text-white">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 18.75 18.75 5.25M6 5.25h12.75V18" />
                </svg>
              </span>
            </button>
            <hr class="border border-stone-600 w-full mb-1" />
            <button class="text-stone-400 hover:text-stone-50  flex justify-between items-center w-full">
              <span class="text-left">{{ t('Recommend')}}</span>
              <span class="text-right">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="white" class="w-2 h-2 text-white">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 18.75 18.75 5.25M6 5.25h12.75V18" />
                </svg>
              </span>
            </button>
            <hr class="border border-stone-600 w-full mb-1" />
          </div>
        </div>

        <div class="w-full flex flex-col items-center md:items-start mt-8 md:mt-0">
          <label class="font-bold">{{ t('Policies') }}</label>
          <div class="flex flex-col items-start md:mt-4 mt-2 md:space-x-0 w-full md:pr-4">
            <button class="text-stone-400 hover:text-stone-50 flex justify-between items-center w-full">
              <span class="text-left">{{ t('TermsConditions') }}</span>
              <span class="text-right">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="white" class="w-2 h-2 text-white">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 18.75 18.75 5.25M6 5.25h12.75V18" />
                </svg>
              </span>
            </button>
            <hr class="border border-stone-600 w-full mb-1" />
            <button class="text-stone-400 hover:text-stone-50  flex justify-between items-center w-full">
              <span class="text-left">{{ t('PrivacyPolicy')}}</span>
              <span class="text-right">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="white" class="w-2 h-2 text-white">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 18.75 18.75 5.25M6 5.25h12.75V18" />
                </svg>
              </span>
            </button>
            <hr class="border border-stone-600 w-full mb-1" />
            <button class="text-stone-400 hover:text-stone-50  flex justify-between items-center w-full">
              <span class="text-left">{{ t('Cookies') }}</span>
              <span class="text-right">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="white" class="w-2 h-2 text-white">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 18.75 18.75 5.25M6 5.25h12.75V18" />
                </svg>
              </span>
            </button>
            <hr class="border border-stone-600 w-full mb-1" />
            <button class="text-stone-400 hover:text-stone-50  flex justify-between items-center w-full">
              <span class="text-left">{{ t('DataExport')}}</span>
              <span class="text-right">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="white" class="w-2 h-2 text-white">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 18.75 18.75 5.25M6 5.25h12.75V18" />
                </svg>
              </span>
            </button>
            <hr class="border border-stone-600 w-full mb-1" />
            <button class="text-stone-400 hover:text-stone-50  flex justify-between items-center w-full">
              <span class="text-left">{{ t('ServiceAgreement') }}</span>
              <span class="text-right">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="white" class="w-2 h-2 text-white">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 18.75 18.75 5.25M6 5.25h12.75V18" />
                </svg>
              </span>
            </button>
            <hr class="border border-stone-600 w-full mb-1" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()

function goToHouse() {
  window.open('/mainhouse', '_blank')
}

function goToCar() {
  window.open('/maincar', '_blank')
}
</script>
<style></style>