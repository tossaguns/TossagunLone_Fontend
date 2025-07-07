<template>
  <div class="bg-white">
    <div class="max-w-5xl mx-auto md:px-6 mt-5 md:text-lg text-sm">
      <div class="relative overflow-hidden h-48 md:h-72">
        <div ref="carouselRef" class="flex will-change-transform carousel-touch" :style="transformStyle"
          @transitionend="onTransitionEnd">
          <img v-for="(img, index) in images" :key="index" :src="img"
            class="w-full flex-shrink-0 h-48 md:h-72 object-cover md:rounded-xl bg-gray-200" alt="แบนเนอร์" />
        </div>

        <!-- จุดวงกลม -->
        <div
          class="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30 bg-white/50 rounded-full px-3 py-1">
          <button v-for="(img, idx) in images" :key="idx" @click="setCurrentIndex(idx)" :class="[
            'md:w-[6px] md:h-[6px] w-[4px] h-[4px] rounded-full md:my-1 transition-colors duration-200',
            currentIndex === idx ? 'bg-green-800' : 'bg-white',
          ]" :aria-label="`ไปยังรูปภาพ ${idx + 1}`" />
        </div>
      </div>

      <!-- เมนูแนวนอน -->
      <div ref="stickyContainer" class="mt-4 sticky top-0 z-50 bg-white/70 backdrop-blur-md">
        <div ref="menuBar"
          class="flex py-2 font-bold md:justify-center overflow-x-auto whitespace-nowrap gap-2 scrollbar-hide min-w-0 cursor-grab active:cursor-grabbing select-none relative px-2"
          @mousedown="startDrag" @mousemove="onDrag" @mouseup="stopDrag" @mouseleave="stopDrag"
          @touchstart.passive="startDrag" @touchmove.passive="onDrag" @touchend="stopDrag">

          <div v-for="(menu, idx) in menus" :key="idx" class="relative inline-block min-w-max"
            @mouseenter="onMouseEnter(idx)" @mouseleave="onMouseLeave(idx)">
            <button :ref="(el) => setMenuButtonRef(idx, el)" :class="[
              'rounded-full px-4 py-1 inline-block min-w-max shadow-md text-white text-sm transition-all duration-200',
              idx === activeIndex
                ? 'bg-green-900 transform scale-105'
                : 'bg-gradient-to-r from-green-700 to-green-500 hover:from-green-900 hover:to-green-900 hover:scale-105',
            ]" @click="onMenuClick(idx, menu)" type="button" aria-haspopup="true"
              :aria-expanded="dropdownOpen[idx] ? 'true' : 'false'">
              {{ menu.label }}
            </button>

            <teleport to="body" v-if="menu.dropdown && menu.dropdown.length > 0">
              <transition name="fade-scale">
                <div v-if="dropdownOpen[idx]"
                  class="w-48 rounded-md shadow-lg z-50 border border-gray-200 bg-white/90 backdrop-blur-md"
                  :style="dropdownPositions[idx]" @mouseenter="onDropdownMouseEnter(idx)"
                  @mouseleave="onDropdownMouseLeave(idx)">
                  <ul class="py-1">
                    <li v-for="(item, i) in menu.dropdown || []" :key="i"
                      class="px-4 py-2 hover:bg-green-700 hover:text-white cursor-pointer text-gray-800 transition-colors duration-150 text-sm"
                      @click="onDropdownItemClick(idx, i)">
                      {{ item }}
                    </li>
                  </ul>
                </div>
              </transition>
            </teleport>
          </div>
        </div>
      </div>

      <!-- เนื้อหาแต่ละ Section -->
      <div class="mt-5 relative z-0">
        <div ref="mainRef" id="main-section">
          <Main />
        </div>
        <div ref="aboutRef" id="about-section">
          <About />
        </div>
        <div ref="bsoRef" id="bso-section">
          <BSO />
        </div>
        <div ref="bsRef" id="bs-section">
          <BS />
        </div>
        <div ref="productRef" id="product-section">
          <Product />
        </div>
        <div ref="newsRef" id="news-section">
          <News />
        </div>
        <div ref="contactRef" id="contact-section">
          <Contact />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, nextTick, onMounted, onBeforeUnmount, computed } from "vue";

import Main from "../tt/all/main.vue";
import About from "../tt/all/about.vue";
import BSO from "../tt/all/businessopportunity.vue";
import BS from "../tt/all/businessperson.vue";
import Product from "../tt/all/product.vue";
import News from "../tt/all/news.vue";
import Contact from "../tt/all/contact.vue";

// ข้อมูล
const images = [
  '/icon1/rice.jpg',
  '/graphics/bg_main1.jpg',
  '/icon1/rice2.jpg'
];

const menus = [
  { label: "หน้าหลัก", dropdown: [] },
  {
    label: "เกี่ยวกับเรา",
    dropdown: [
      "ผู้ก่อตั้ง",
      "นโยบายบริษัท",
      "โครงสร้างธุรกิจพันธุ์หมื่นให้",
      "ขยายคลังสินค้าบริษัท",
    ],
  },
  {
    label: "โอกาสทางธุรกิจ",
    dropdown: [
      "แผนธุรกิจ",
      "เริ่มต้นธุรกิจ",
      "ตำบลในฝัน",
      "กฎระเบียบข้อบังคับ",
      "กองทุน",
      "สิทธิประโยชน์สมาชิก",
    ],
  },
  {
    label: "นักธุรกิจ/ผู้นำตำบลในฝัน",
    dropdown: [
      "สาขาตำบลในฝัน",
      "ข้อตกลง/PDPA",
      "กฎระเบียบว่าด้วยตลาดออนไลน์",
      "ปฏิทินกิจกรรม",
      "โปรโมชั่นสำหรับนักธุรกิจ",
      "คู่มือบรรยาย",
    ],
  },
  { label: "สินค้า", dropdown: ["ช่วยเหลือสังคม", "ทั่วไป", "สมัครนำสินค้าเข้าจำหน่าย"] },
  {
    label: "ข่าวสารและกิจกรรม",
    dropdown: ["โปรโมชั่น", "ตารางการประชุม", "ข่าวสาร", "บทความ", "กิจกรรมเพื่อสังคม"],
  },
  { label: "ติดต่อเรา", dropdown: [] },
];

// Refs
const mainRef = ref(null);
const aboutRef = ref(null);
const bsoRef = ref(null);
const bsRef = ref(null);
const productRef = ref(null);
const newsRef = ref(null);
const contactRef = ref(null);
const stickyContainer = ref(null);
const carouselRef = ref(null);
const menuBar = ref(null);

// Reactive state
const activeIndex = ref(0);
const currentIndex = ref(0);
const menuButtonRefs = reactive({});
const dropdownPositions = reactive({});
const dropdownOpen = reactive({});

// Carousel state - แก้ไขการจัดการ touch events
const dragging = ref(false);
const dragOffsetX = ref(0);
const touchStartX = ref(0);
const touchStartY = ref(0);
const touchStartTime = ref(0);
const isCarouselTouching = ref(false);

// Internal state
let autoSlideTimer = null;
let isDown = false;
let startX = 0;
let scrollLeft = 0;
let isDragging = false;
let currentOpenDropdown = null;
let hoverTimeouts = new Map();

// Computed
const transformStyle = computed(() => {
  const translateX = -currentIndex.value * 100 + (dragging.value ? (dragOffsetX.value / (carouselRef.value?.offsetWidth || 1)) * 100 : 0);
  return {
    transform: `translateX(${translateX}%)`,
    transition: dragging.value ? 'none' : 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
  };
});

// Utility functions
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Helper functions
function setMenuButtonRef(idx, el) {
  if (el) {
    menuButtonRefs[idx] = el;
  }
}

function setCurrentIndex(idx) {
  currentIndex.value = idx;
  stopAutoSlide();
  startAutoSlideAfterDelay();
}

function startAutoSlide() {
  stopAutoSlide();
  autoSlideTimer = setInterval(() => {
    if (!isCarouselTouching.value) {
      currentIndex.value = (currentIndex.value + 1) % images.length;
    }
  }, 4000);
}

function stopAutoSlide() {
  if (autoSlideTimer) {
    clearInterval(autoSlideTimer);
    autoSlideTimer = null;
  }
}

function startAutoSlideAfterDelay() {
  stopAutoSlide();
  setTimeout(() => {
    if (!isCarouselTouching.value) {
      startAutoSlide();
    }
  }, 3000);
}

function clearAllHoverTimeouts() {
  hoverTimeouts.forEach((timeout) => clearTimeout(timeout));
  hoverTimeouts.clear();
}

function closeAllDropdowns() {
  Object.keys(dropdownOpen).forEach((key) => {
    dropdownOpen[key] = false;
  });
  currentOpenDropdown = null;
}

function calculateDropdownPosition(idx) {
  const btn = menuButtonRefs[idx];
  if (!btn) return;

  const rect = btn.getBoundingClientRect();
  const dropdownWidth = 192;
  const viewportWidth = window.innerWidth;
  const padding = 10;

  let left = rect.left;

  if (left + dropdownWidth > viewportWidth - padding) {
    left = viewportWidth - dropdownWidth - padding;
  }
  if (left < padding) {
    left = padding;
  }

  dropdownPositions[idx] = {
    position: 'fixed',
    top: `${rect.bottom + 6}px`,
    left: `${left}px`,
    zIndex: 9999
  };
}

function openDropdown(idx) {
  dropdownOpen[idx] = true;
  nextTick(() => {
    calculateDropdownPosition(idx);
  });
}

// Smooth scroll with optimizations
function smoothScrollToSection(index) {
  activeIndex.value = index;

  const sections = [
    mainRef.value,
    aboutRef.value,
    bsoRef.value,
    bsRef.value,
    productRef.value,
    newsRef.value,
    contactRef.value,
  ];

  closeAllDropdowns();

  if (index === 0) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  } else if (sections[index]) {
    requestAnimationFrame(() => {
      const targetElement = sections[index];
      const stickyHeight = stickyContainer.value?.offsetHeight || 0;
      const elementTop = targetElement.offsetTop;
      const scrollPosition = Math.max(0, elementTop - stickyHeight +280);

      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });
    });
  }
}

const throttledScrollToSection = throttle(smoothScrollToSection, 100);

// แก้ไข Touch events สำหรับ carousel
function onTouchStart(e) {
  if (e.touches.length > 1) return;

  const touch = e.touches[0];
  touchStartX.value = touch.clientX;
  touchStartY.value = touch.clientY;
  touchStartTime.value = Date.now();
  isCarouselTouching.value = true;

  stopAutoSlide();
  dragging.value = false;
  dragOffsetX.value = 0;
}


function onTouchMove(e) {
  if (!isCarouselTouching.value || e.touches.length > 1) return;

  const touch = e.touches[0];
  const deltaX = touch.clientX - touchStartX.value;
  const deltaY = touch.clientY - touchStartY.value;

  const isHorizontal = Math.abs(deltaX) > Math.abs(deltaY);

  if (isHorizontal) {
    e.preventDefault();
    dragging.value = true;
    const maxDrag = carouselRef.value?.offsetWidth || 0;
    dragOffsetX.value = Math.max(-maxDrag, Math.min(maxDrag, deltaX));
  }
}

function onTouchEnd(e) {
  if (!isCarouselTouching.value) return;

  const width = carouselRef.value?.offsetWidth || 1;
  const dragDistance = dragOffsetX.value;
  const threshold = width * 0.15;

  if (dragging.value) {
    if (dragDistance < -threshold && currentIndex.value < images.length - 1) {
      currentIndex.value++;
    } else if (dragDistance > threshold && currentIndex.value > 0) {
      currentIndex.value--;
    }
  }

  isCarouselTouching.value = false;
  dragging.value = false;
  startAutoSlideAfterDelay();
}

function onTransitionEnd() {
  dragOffsetX.value = 0;
}

onMounted(() => {
  document.addEventListener("click", onClickOutside);
  window.addEventListener("resize", handleResize);

  // เพิ่ม touch event listeners แยกต่างหาก
  if (carouselRef.value) {
    carouselRef.value.addEventListener('touchstart', onTouchStart, { passive: false });
    carouselRef.value.addEventListener('touchmove', onTouchMove, { passive: false });
    carouselRef.value.addEventListener('touchend', onTouchEnd, { passive: false });
  }

  startAutoSlide();
});

onBeforeUnmount(() => {
  document.removeEventListener("click", onClickOutside);
  window.removeEventListener("resize", handleResize);

  // ลบ touch event listeners
  if (carouselRef.value) {
    carouselRef.value.removeEventListener('touchstart', onTouchStart);
    carouselRef.value.removeEventListener('touchmove', onTouchMove);
    carouselRef.value.removeEventListener('touchend', onTouchEnd);
  }

  stopAutoSlide();
  clearAllHoverTimeouts();
});

function onMouseEnter(idx) {
  if (window.innerWidth < 768) return;

  const menu = menus[idx];
  if (!menu.dropdown || menu.dropdown.length === 0) return;

  clearAllHoverTimeouts();

  if (currentOpenDropdown !== null && currentOpenDropdown !== idx) {
    dropdownOpen[currentOpenDropdown] = false;
  }

  const timeout = setTimeout(() => {
    currentOpenDropdown = idx;
    openDropdown(idx);
  }, 100);

  hoverTimeouts.set(`enter-${idx}`, timeout);
}

function onMouseLeave(idx) {
  if (window.innerWidth < 768) return;

  const timeout = setTimeout(() => {
    if (dropdownOpen[idx]) {
      dropdownOpen[idx] = false;
      if (currentOpenDropdown === idx) {
        currentOpenDropdown = null;
      }
    }
  }, 200);

  hoverTimeouts.set(`leave-${idx}`, timeout);
}

function onDropdownMouseEnter(idx) {
  const leaveTimeout = hoverTimeouts.get(`leave-${idx}`);
  if (leaveTimeout) {
    clearTimeout(leaveTimeout);
    hoverTimeouts.delete(`leave-${idx}`);
  }
}

function onDropdownMouseLeave(idx) {
  if (window.innerWidth < 768) return;

  dropdownOpen[idx] = false;
  if (currentOpenDropdown === idx) {
    currentOpenDropdown = null;
  }
}

// Menu click handler
function onMenuClick(idx, menu) {
  if (window.innerWidth < 768) {
    const wasOpen = dropdownOpen[idx];
    closeAllDropdowns();

    if (menu.dropdown && menu.dropdown.length > 0) {
      if (!wasOpen) {
        openDropdown(idx);
      } else {
        throttledScrollToSection(idx);
      }
    } else {
      throttledScrollToSection(idx);
    }
  } else {
    throttledScrollToSection(idx);
  }
}

// Dropdown item click
function onDropdownItemClick(menuIdx, itemIdx) {
  const menuLabel = menus[menuIdx].label;
  const itemLabel = menus[menuIdx].dropdown[itemIdx];

  console.log(`เลือก "${itemLabel}" ในเมนู "${menuLabel}"`);

  dropdownOpen[menuIdx] = false;
  if (currentOpenDropdown === menuIdx) {
    currentOpenDropdown = null;
  }
}

// Drag functionality for menu
function startDrag(e) {
  isDown = true;
  if (menuBar.value) {
    const clientX = e.touches ? e.touches[0].clientX : e.pageX;
    startX = clientX - menuBar.value.offsetLeft;
    scrollLeft = menuBar.value.scrollLeft;
  }
}

function onDrag(e) {
  if (!isDown || !menuBar.value) return;
  e.preventDefault();

  const clientX = e.touches ? e.touches[0].clientX : e.pageX;
  const x = clientX - menuBar.value.offsetLeft;
  const walk = (x - startX) * 1.5;
  menuBar.value.scrollLeft = scrollLeft - walk;
}

function stopDrag() {
  isDown = false;
}

// Click outside handler
function onClickOutside(e) {
  const isMenuClick = menuBar.value?.contains(e.target);
  const isDropdownClick = Object.values(menuButtonRefs)
    .filter(Boolean)
    .some((el) => el.contains(e.target));

  if (!isMenuClick && !isDropdownClick) {
    closeAllDropdowns();
  }
}

// Resize handler
const handleResize = debounce(() => {
  if (window.innerWidth < 768) {
    closeAllDropdowns();
  }
}, 250);

// Lifecycle hooks
onMounted(() => {
  document.addEventListener("click", onClickOutside);
  window.addEventListener("resize", handleResize);
  startAutoSlide();
});

onBeforeUnmount(() => {
  document.removeEventListener("click", onClickOutside);
  window.removeEventListener("resize", handleResize);
  stopAutoSlide();
  clearAllHoverTimeouts();
});
</script>

<style scoped>
.carousel-touch {
  touch-action: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-overflow-scrolling: touch;
}

.carousel-touch img {
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
  pointer-events: none;
  -webkit-touch-callout: none;
}

/* เพิ่มสำหรับ Safari */
.carousel-touch {
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
}

.will-change-transform {
  will-change: transform;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
}

/* ป้องกันการ zoom ใน Safari */
.carousel-touch,
.carousel-touch * {
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  text-size-adjust: 100%;
}

/* CSS อื่นๆ ที่มีอยู่เดิม... */
.fade-scale-enter-active {
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-scale-leave-active {
  transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-scale-enter-from {
  opacity: 0;
  transform: scale(0.95) translateY(-8px);
}

.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(-4px);
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.backdrop-blur-md {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.carousel-container {
  contain: layout style paint;
}

.dropdown-menu {
  contain: layout style paint;
  backface-visibility: hidden;
  transform: translateZ(0);
}

button {
  contain: layout style;
  backface-visibility: hidden;
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>