<template>
  <div :style="[{ width: size.width + 'rem' }, { height: size.height + 'rem' }]">
    <svg xmlns="http://www.w3.org/2000/svg" :width="size.width + 'rem'" height="100%" version="1.1">
      <defs>
        <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" style="stop-color: pink; stop-opacity: 1" />
          <stop offset="100%" style="stop-color: #1cd; stop-opacity: 0.2" />
        </radialGradient>
      </defs>
      <symbol id="linePathSymbol">
        <path stroke-width="3" ref="path" fill="transparent" :d="path_content" />
        <path stroke-width="3" fill="transparent" :d="path_content1" />
        <path  stroke="#e7c80e" fill="transparent" :d="path_content2" />
        <path stroke="#e7c80e" fill="transparent" :d="path_content3" />
      </symbol>
      <g>
        <use xlink:href="#linePathSymbol" class="path"></use>
        <circle x="0" y="0" r="6" fill="url(#grad1)">
          <animateMotion :path="path_content" dur="5" begin="0s" fill="freeze" retate="auto" repeatDur="indefinite" />
        </circle>
        <circle x="0" y="0" r="6" fill="url(#grad1)">
          <animateMotion :path="path_content1" dur="5" begin="0s" fill="freeze" retate="auto" repeatDur="indefinite" />
        </circle>
      </g>
    </svg>
  </div>
</template>
  
<script setup lang="ts">
import { insertCSSStyleSheet, RemToPx } from "@/utils/util";
import { withDefaults, ref, onMounted } from "vue";
const props = withDefaults(
  defineProps<{
    // 边框尺寸
    size: { width: number; height: number };
  }>(),
  {
    size: () => ({
      width: 4,
      height: 3,
    }),
  }
);
const path_content = ref('M -10 20 H 1920 20 L 1920 20')
const path_content1 = ref('M -10 20 H 1920 20 L 1920 20')
const path_content2 = ref('M -10 20 H 1920 20 L 1920 20')
const path_content3 = ref('M -10 20 H 1920 20 L 1920 20')
const path = ref()

onMounted(() => {
  const _width = RemToPx(props.size.width)
  const styleSheet = document.styleSheets[0];
  path_content.value = `
  M ${_width / 2} 20
  H ${_width / 2.9} 
  V 12
  H ${_width / 4}
  V 8
  H ${_width / 6}
  V 4
  H 200
  `
  path_content1.value = `
  M ${_width / 2} 20
  H ${_width / 3 * 2} 
  V 12
  H ${_width / 4 * 3}
  V 8
  H ${_width / 6 * 5}
  V 4
  H ${_width - 100}
  `
  path_content2.value = `
  M ${_width / 2} 30
  H ${_width / 2.9} 
  V 24
  H ${_width / 4}
  V 18
  H 350
  `
  path_content3.value = `
  M ${_width / 2} 30
  H ${_width / 3 * 2} 
  V 24
  H ${_width / 4 * 3}
  V 18
  H ${_width - 350}
  `
  const length = path.value.getTotalLength();

  insertCSSStyleSheet(`
  @keyframes linePath{
  0%{
    stroke-dasharray:${length/3} ${length/3} ;
    stroke-dashoffset: ${length/3};
    stroke: #1199ff;
  }
  100%{
    stroke-dashoffset:0;
    stroke:#1cd
  }
}
  `, styleSheet)
});

</script>
  
<style scoped lang="scss">
.path {
  animation: linePath 15s linear infinite;
}
</style>