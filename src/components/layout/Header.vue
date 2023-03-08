<template>
    <div class="head">
        <div class="logo">
            <ObeLogo />
        </div>
        <div class="left-button">
            <div>
                <fc-underline-btn style="width: .8rem; height:.4rem;">
                    能耗看板
                </fc-underline-btn>
            </div>
            <div>
                <fc-underline-btn style="width: 1.2rem; height:.4rem">
                    实时通行看板
                </fc-underline-btn>
            </div>
            <div>
                <fc-underline-btn style="width: 1.2rem; height:.4rem">
                    实时报警看板
                </fc-underline-btn>
            </div>
        </div>
        <div class="center-intro">
            <div>
                智慧园区综合态势
            </div>
        </div>
        <div class="right-button">
            <div>
                <fc-underline-btn style="width: 1.2rem; height:.4rem;">
                    设备状态看板
                </fc-underline-btn>
            </div>
            <div>
                <fc-underline-btn style="width: 1.2rem; height:.4rem">
                    营业额看板
                </fc-underline-btn>
            </div>
            <div>
                {{ time }}
            </div>
        </div>
        <div class="svg-line">
            <LineAnimate :size="{ width: 19.2, height: .5 }" />
        </div>
    </div>
</template>
<script setup lang="ts">
import ObeLogo from '@/components/SvgAnimation/ObeLogo.vue';
import LineAnimate from '@/components/SvgAnimation/LineAnimate.vue';
import { parseTime } from '@/utils/util'
import { ref, onMounted } from 'vue';
const timer = ref()
const time = ref()
onMounted(() => {
    if (!timer.value) {
        timer.value = setInterval(() => {
            time.value = parseTime(new Date().getTime(), '')
        }, 12)
    }
})

</script>
<style scoped lang="scss">
.head {
    .logo {
        width: 3rem;
        height: .6rem;

        div {
            width: 100%;
            height: 100%;
        }
    }

    .left-button {
        display: flex;
        width: 4rem;
        height: 100%;
        font-size: 14px;

        div {
            margin: .1rem;
            pointer-events: all;

            &:nth-child(2) {
                margin-top: .14rem;
            }

            &:nth-child(3) {
                margin-top: .18rem;
            }
        }
    }

    .center-intro {
        width: 6rem;
        line-height: .6rem;
        text-align: center;
        color: $basic-text-color;
        font-size: 28px;

        div {
            width: 3rem;
            margin: 0.1rem 0 0.1rem 1.2rem;
            height: .6rem;
            border: 1px $basic-text-color solid;
        }
    }

    .right-button {
        display: flex;
        width: 6rem;
        height: 100%;
        font-size: 14px;

        div {
            margin: .1rem;
            margin-top: .18rem;
            pointer-events: all;

            &:nth-child(2) {
                margin-top: .14rem;
            }

            &:nth-child(3) {
                margin-top: .1rem;
                width: 2rem;
                height: .4rem;
                color: $basic-text-color;
                line-height: .4rem;
            }
        }
    }

    .svg-line {
        position: absolute;
        width: 100vw;
        top: .6rem;
        left: 0;
    }
}
</style>