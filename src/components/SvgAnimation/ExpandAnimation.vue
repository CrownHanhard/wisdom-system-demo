<template>
    <div>
        <svg :width="computedSize.width" :height="computedSize.height" version="1.1" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64" @click="changePath">
            <g>
                <path ref="expand" fill="none" stroke-width="5" stroke="#fff" :d="nowPath">
                </path>
            </g>
        </svg>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, computed, onMounted, withDefaults } from 'vue';
import { RemToPx } from '@/utils/util';
const props = withDefaults(defineProps<{
    size: {
        width: number
        height: number
    }
    isRight: boolean
}>(), {
    size: () => ({ width: 0.3, height: 0.3 }),
    isRight: false
})
let animationObj = reactive<{ [key: string]: string }>({
    from: 'M15.407061999999996,9.792208C15.407061999999996,9.792208,48.592939,31.887987,48.592939,31.887987C48.592939,31.887987,15.407061999999996,54.025974,15.407061999999996,54.025974',
    to: 'M48.592939,9.792208C48.592939,9.792208,15.407061999999996,31.887987,15.407061999999996,31.887987C15.407061999999996,31.887987,48.592939,54.025974,48.592939,54.025974'
})
const expand = ref();
const pathDefault = ref('from');
const nowPath = computed(() => {
    return animationObj[pathDefault.value]
})
const changePath = () => {
    pathDefault.value = pathDefault.value === 'from' ? 'to' : 'from'
}
const computedSize: { width: number, height: number } = reactive({
    width: 30,
    height: 30
})
onMounted(() => {
    computedSize.width = RemToPx(props.size.width)
    computedSize.height = RemToPx(props.size.height)
    pathDefault.value = !props.isRight ? 'to' : 'from'
})
</script>