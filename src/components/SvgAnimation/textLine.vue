<template>
    <div :style="{ height: computedSize.height + 'px' }">
        <svg :width="computedSize.width + 'px'" :height="computedSize.height + 'px'">
            <rect x="0" y="15.5" :width="computedSize.width" height="1" fill="#00CED1">
                <animate attributeName="width" from="0" :to="computedSize.width" dur="7s" calcMode="spline" keyTimes="0;1"
                    keySplines=".42,0,.58,1" repeatCount="indefinite"></animate>
            </rect>
            <rect x="0" y="15.5" width="1" height="1" fill="#FAD400">
                <animate attributeName="x" from="0" :to="computedSize.width" dur="7s" calcMode="spline" keyTimes="0;1"
                    keySplines="0.42,0,0.58,1" repeatCount="indefinite"></animate>
            </rect>
        </svg>
    </div>
</template>
<script setup lang="ts">
import { withDefaults, reactive, onMounted } from 'vue';
import { RemToPx } from '@/utils/util';
const props = withDefaults(defineProps<{
    size: { width: number, height: number }
}>(), {
    size: () => ({ width: 3, height: 0.1 })
})
const computedSize: { width: number, height: number } = reactive({
    width: 320,
    height: 30
})
onMounted(() => {
    computedSize.width = RemToPx(props.size.width)
    computedSize.height = RemToPx(props.size.height)
})
</script>