<!-- TODO -->
<template>
  <div :id="my_id + '_btn'" class="button" :style="{ width: size.width + 'rem', height: size.height + 'rem' }">
    <svg :viewBox="`0 0 ${computedSize.width} ${computedSize.height}`" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <rect class="shape" :style="{
        fill: 'transparent',
        'stroke-width': '4px',
        stroke: '#1199ff',
        'stroke-dasharray': `${computedSize.width + computedSize.height} ${computedSize.width + computedSize.height}`,
        'stroke-dashoffset': `-${computedSize.width + computedSize.height}`
      }" :height="computedSize.height" :width="computedSize.width"></rect>
    </svg>
    <div class="hover-text" :style="{ width: size.width + 'rem', 'line-height': size.height + 'rem' }">{{ title }}</div>
  </div>
</template>
<script setup lang="ts">
import { withDefaults, onMounted, reactive } from 'vue';
import { RemToPx, insertCSSStyleSheet } from '@/utils/util'
const props = withDefaults(defineProps<{
  title: string
  size: { width: number, height: number }
}>(), {
  title: '监控',
  size: () => ({
    width: 3.2,
    height: 0.6
  })
})
const computedSize = reactive<{
  width: number
  height: number
}>({
  width: 0,
  height: 0
})
const my_id = 'my_Button' + Math.floor(Math.random() * 99 + 100)
onMounted(() => {
  computedSize.width = RemToPx(props.size.width)
  computedSize.height = RemToPx(props.size.height)
  const styleSheet = document.styleSheets[0];

  insertCSSStyleSheet(
    `
  @keyframes ${my_id}_ani {
  0% {
    stroke-dasharray: ${computedSize.height} ${computedSize.width};
    stroke-dashoffset: ${computedSize.width};
    stroke-width: 4px;
  }
  100% {
    stroke-dasharray: ${(computedSize.width + computedSize.height) * 2};
    stroke-dashoffset: 0;
    stroke-width: 6px;
  }
}`,
    styleSheet
  );
});
</script>
<style scoped>
.button {

  position: relative;
  pointer-events: all;
}

.hover-text {
  position: absolute;
  top: 0;
  color: #1199ff;
  text-align: center;
  cursor: pointer;
  letter-spacing: 2px;
}

.button:hover .hover-text {
  transition: 0.5s;
  color: rgb(161, 164, 138);
}

.button:hover .shape {
  animation: ani 0.5s linear forwards;
}
</style>