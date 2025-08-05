<!-- components/MyTooltip.vue -->
<!-- FIXME: เเก้ไข Tiptop ตอนนี้ tiptop เเสดงออกนอกกรอบหน้าเว็บ เมื่ออยู่ชิดขอบ -->
<template>
  <div ref="containerRef" class="relative inline-block" @mouseenter="showTooltip" @mouseleave="hideTooltip">
    <!-- element ที่ใช้ trigger -->
    <slot name="trigger" />

    <!-- tooltip content -->
    <div v-if="show" ref="tooltipRef" class="absolute z-50  w-[250px]" :style="tooltipStyle">
      <slot name="content">
        {{ value }}
      </slot>
      <div class="absolute w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent" :style="arrowStyle" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'

const props = defineProps({
  value: String,
  position: {
    type: String,
    default: 'bottom', // top, bottom, left, right
  },
})

const show = ref(false)
const tooltipRef = ref(null)
const containerRef = ref(null)
const calculatedPosition = ref('bottom')
const tooltipStyle = ref({})

// ฟังก์ชันคำนวณตำแหน่งที่เหมาะสม
const calculatePosition = () => {
  if (!tooltipRef.value || !containerRef.value) return

  const tooltip = tooltipRef.value
  const container = containerRef.value
  const viewport = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  const containerRect = container.getBoundingClientRect()
  const tooltipRect = tooltip.getBoundingClientRect()

  // คำนวณพื้นที่ว่างในแต่ละทิศทาง
  const space = {
    top: containerRect.top,
    bottom: viewport.height - containerRect.bottom,
    left: containerRect.left,
    right: viewport.width - containerRect.right
  }

  // กำหนดลำดับความสำคัญของตำแหน่ง
  const positions = ['bottom', 'top', 'right', 'left']

  // หาตำแหน่งที่เหมาะสมที่สุด
  for (const pos of positions) {
    if (pos === 'bottom' && space.bottom >= tooltipRect.height + 10) {
      calculatedPosition.value = 'bottom'
      setTooltipStyle(pos, containerRect, tooltipRect, viewport)
      return
    }
    if (pos === 'top' && space.top >= tooltipRect.height + 10) {
      calculatedPosition.value = 'top'
      setTooltipStyle(pos, containerRect, tooltipRect, viewport)
      return
    }
    if (pos === 'right' && space.right >= tooltipRect.width + 10) {
      calculatedPosition.value = 'right'
      setTooltipStyle(pos, containerRect, tooltipRect, viewport)
      return
    }
    if (pos === 'left' && space.left >= tooltipRect.width + 10) {
      calculatedPosition.value = 'left'
      setTooltipStyle(pos, containerRect, tooltipRect, viewport)
      return
    }
  }

  // ถ้าไม่มีพื้นที่เพียงพอ ให้ใช้ตำแหน่งที่มีพื้นที่มากที่สุด
  const maxSpace = Math.max(space.top, space.bottom, space.left, space.right)
  if (maxSpace === space.bottom) {
    calculatedPosition.value = 'bottom'
    setTooltipStyle('bottom', containerRect, tooltipRect, viewport)
  } else if (maxSpace === space.top) {
    calculatedPosition.value = 'top'
    setTooltipStyle('top', containerRect, tooltipRect, viewport)
  } else if (maxSpace === space.right) {
    calculatedPosition.value = 'right'
    setTooltipStyle('right', containerRect, tooltipRect, viewport)
  } else {
    calculatedPosition.value = 'left'
    setTooltipStyle('left', containerRect, tooltipRect, viewport)
  }
}

// ฟังก์ชันตั้งค่าสไตล์ tooltip
const setTooltipStyle = (position, containerRect, tooltipRect, viewport) => {
  const margin = 8
  const maxWidth = 400 // เพิ่มความกว้างสูงสุด
  const maxHeight = 300 // เพิ่มความสูงสูงสุด

  let style = {
    maxWidth: `${maxWidth}px`,
    maxHeight: `${maxHeight}px`,
    minWidth: '200px', // เพิ่มความกว้างขั้นต่ำ
    wordWrap: 'break-word',
    whiteSpace: 'normal',
    overflow: 'visible', // เปลี่ยนจาก hidden เป็น visible
    lineHeight: '1.4', // เพิ่ม line height
    textAlign: 'left' // จัดข้อความชิดซ้าย
  }

  switch (position) {
    case 'top':
      style = {
        ...style,
        bottom: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        marginBottom: `${margin}px`
      }
      break
    case 'left':
      style = {
        ...style,
        right: '100%',
        top: '50%',
        transform: 'translateY(-50%)',
        marginRight: `${margin}px`,
        maxWidth: '300px' // ลดความกว้างสำหรับ left/right
      }
      break
    case 'right':
      style = {
        ...style,
        left: '100%',
        top: '50%',
        transform: 'translateY(-50%)',
        marginLeft: `${margin}px`,
        maxWidth: '300px' // ลดความกว้างสำหรับ left/right
      }
      break
    default: // bottom
      style = {
        ...style,
        top: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        marginTop: `${margin}px`
      }
  }

  // ปรับตำแหน่งให้อยู่ในขอบเขตหน้าจอ
  const adjustedStyle = adjustPosition(style, position, containerRect, tooltipRect, viewport)
  tooltipStyle.value = adjustedStyle
}

// ฟังก์ชันปรับตำแหน่งให้อยู่ในขอบเขตหน้าจอ
const adjustPosition = (style, position, containerRect, tooltipRect, viewport) => {
  const margin = 8
  const adjustedStyle = { ...style }

  // คำนวณตำแหน่งที่คาดหวัง
  let expectedLeft = 0
  let expectedTop = 0

  switch (position) {
    case 'top':
      expectedLeft = containerRect.left + (containerRect.width / 2) - (tooltipRect.width / 2)
      expectedTop = containerRect.top - tooltipRect.height - margin
      break
    case 'bottom':
      expectedLeft = containerRect.left + (containerRect.width / 2) - (tooltipRect.width / 2)
      expectedTop = containerRect.bottom + margin
      break
    case 'left':
      expectedLeft = containerRect.left - tooltipRect.width - margin
      expectedTop = containerRect.top + (containerRect.height / 2) - (tooltipRect.height / 2)
      break
    case 'right':
      expectedLeft = containerRect.right + margin
      expectedTop = containerRect.top + (containerRect.height / 2) - (tooltipRect.height / 2)
      break
  }

  // ปรับตำแหน่งถ้าออกนอกจอ
  if (expectedLeft < margin) {
    adjustedStyle.left = `${margin}px`
    adjustedStyle.transform = 'none'
  } else if (expectedLeft + tooltipRect.width > viewport.width - margin) {
    adjustedStyle.left = `${viewport.width - tooltipRect.width - margin}px`
    adjustedStyle.transform = 'none'
  }

  if (expectedTop < margin) {
    adjustedStyle.top = `${margin}px`
    adjustedStyle.transform = 'none'
  } else if (expectedTop + tooltipRect.height > viewport.height - margin) {
    adjustedStyle.top = `${viewport.height - tooltipRect.height - margin}px`
    adjustedStyle.transform = 'none'
  }

  return adjustedStyle
}

const showTooltip = async () => {
  show.value = true
  await nextTick()
  calculatePosition()
}

const hideTooltip = () => {
  show.value = false
}

const arrowStyle = computed(() => {
  const color = '#ffffff' // เปลี่ยนเป็นสีขาวเพื่อให้เข้ากับ background
  const position = calculatedPosition.value

  switch (position) {
    case 'top':
      return {
        top: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        borderTopColor: color,
      }
    case 'left':
      return {
        right: '-8px',
        top: '50%',
        transform: 'translateY(-50%) rotate(-90deg)',
        borderTopColor: color,
      }
    case 'right':
      return {
        left: '-8px',
        top: '50%',
        transform: 'translateY(-50%) rotate(90deg)',
        borderTopColor: color,
      }
    default: // bottom
      return {
        bottom: '100%',
        left: '50%',
        transform: 'translateX(-50%) rotate(180deg)',
        borderTopColor: color,
      }
  }
})

// เพิ่ม event listener สำหรับการ resize หน้าจอ
const handleResize = () => {
  if (show.value) {
    calculatePosition()
  }
}

// เพิ่ม event listener เมื่อ component ถูก mount
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  window.addEventListener('resize', handleResize)
  window.addEventListener('scroll', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('scroll', handleResize)
})
</script>
