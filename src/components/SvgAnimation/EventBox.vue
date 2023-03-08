<template>
  <div id="event-box" :style="[{ width: size.width + 'rem' }, { height: size.height + 'rem' }]">
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" version="1.1" class="svg_bg">
      <defs>
        <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" style="stop-color: rgb(255, 255, 255); stop-opacity: 1" />
          <stop offset="100%" style="stop-color: rgb(255, 255, 255); stop-opacity: 0.2" />
        </radialGradient>
        <filter id="f3" x="-110%" y="-110%" width="220%" height="220%">
          <feOffset result="offOut" in="SourceGraphic" dx="0" dy="0"></feOffset>
          <feGaussianBlur result="blurOut" in="offOut" stdDeviation="0"></feGaussianBlur>
          <feBlend in="SourceGraphic" in2="blurOut" mode="multiply"></feBlend>
        </filter>
      </defs>

      <mask>
        <path class="path1" :d="path_current" fill="transparent" stroke="white" stroke-width="2" />
      </mask>

      <path class="path1" id="my_id" :d="path_current" fill="transparent" stroke="#1cd" filter="url(#f3)"
        stroke-linecap="round" stroke-width="2" />
      <g>
        <circle x="0" y="0" r="6" fill="url(#grad1)">
          <animateMotion :path="path_current" dur="6" begin="0s" fill="freeze" retate="auto" repeatDur="indefinite" />
        </circle>
      </g>
      >
    </svg>

    <div class="front">
      <!-- --{{path_current}} -->
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, ref, onMounted, nextTick } from "vue";
import { RemToPx } from '@/utils/util'
const rl = ref(140); //右下角宽度
const cc = ref(10); //角
const padding = ref(1); //边距
let ratio = 1; //rem比例
let path_current = ref("M0 10 L10 0");
const props = withDefaults(
  defineProps<{
    // 边框尺寸
    size: { width: number; height: number };
    is_rem: boolean;
  }>(),
  {
    size: () => ({
      width: 4,
      height: 3.2,
    }),
    is_rem: false,
  }
);

const init_path = () => {
  let ww, hh;
  ww = props.size.width * ratio - padding.value * 2; //宽度
  hh = props.size.height * ratio - padding.value * 2; //高度
  let _path = `
            M 0 ${cc.value}
            L ${cc.value} 0
            L ${ww - cc.value} 0
            L ${ww} ${cc.value}

            v ${hh - cc.value * 3}    
            L ${ww - cc.value} ${hh - cc.value}
            h ${-rl.value}
            L ${ww - rl.value - cc.value * 2} ${hh}

            L ${cc.value} ${hh}
            L 0 ${hh - cc.value}
            L 0 ${cc.value}`;
  path_current.value = _path;
};

onMounted(() => {
  if (props.is_rem) {
    nextTick(() => {
      ratio = RemToPx(props.size.width) / props.size.width;
      init_path();
    });
  } else {
    init_path();
  }
});
</script>

<style>
#my_id {
  stroke-dasharray: 5%, 5%;
  stroke-dashoffset: 0;
  animation: move 2s linear infinite;
}

@keyframes move {
  0% {
    stroke-dasharray: 0, 7%;
  }

  100% {
    stroke-dasharray: 7%, 0;
  }
}

.front {
  position: absolute;
  top: .1rem;
  left: 50%;
  margin-left: -1rem;
}
</style>