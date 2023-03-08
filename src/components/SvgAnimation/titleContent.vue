<template>
    <div>
        <div class="title">{{ title }}</div>
        <textLine :size="{ width: 5, height: 0.3 }" />
    </div>
</template>
<script setup lang="ts">
import textLine from '@/components/SvgAnimation/textLine.vue';
import { withDefaults } from 'vue';
const props = withDefaults(defineProps<{
    title: string
    size: { width: number, height: number }
}>(), {
    title: '标题',
    size: () => ({ width: 3, height: .3 })
})
</script>
<style scoped lang="scss">
.title {
    color: $basic-text-color;
    font-size: 0.15rem;
    font-weight: bold;
}
</style>