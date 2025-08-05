<template>
  <div class="flex items-center text-xs space-x-2 mr-6">
    <div>
      <select v-model="font" @change="applyFont" class="border p-1 rounded text-stone-500">
        <option value="noto-thai">Noto Sans Thai</option>
        <option value="prompt-regular">Prompt</option>
        <option value="itim-regular">Itim</option>
        <option value="mitr-regular">Mitr</option>
        <option value="league-spartan">League Spartan</option>
      </select>
    </div>

    <div>
      <select v-model="lang" @change="changeLang" class="border p-1 rounded text-stone-500">
        <option value="th">TH (ไทย)</option>
        <option value="en">English</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { ref } from "vue";


const { locale } = useI18n()

const font = ref(localStorage.getItem('font') || 'prompt-regular')
const lang = ref(localStorage.getItem('lang') || 'th')

const applyFont = () => {

  document.body.classList.remove('noto-thai', 'prompt-regular', 'itim-regular', 'mitr-regular', 'league-spartan')
  document.body.classList.add(font.value)
  localStorage.setItem('font', font.value)
}

const changeLang = () => {
  locale.value = lang.value
  localStorage.setItem('lang', lang.value)
}

applyFont()
changeLang()

</script>
