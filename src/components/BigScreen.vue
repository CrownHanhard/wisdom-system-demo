<template>
  <div id="bigScreen">
    <Header class="head"></Header>
    <div class="left-container" ref="left">
      <div class="cursor-icon" @click="packUp('left')">
        <ExpandAnimation :is-right="false" />

      </div>
      <div class="total-person">
        <titleContent title="入园人数" :size="{ width: 5, height: .3 }" style="margin-left: .2rem;" />
        <div class="echart-content">
          <div class="animate-content">
            <div class="echart-tags">实时人数</div>
            <SvgIcon class-name="rotate-svg" iconClass="circleRotation" />
          </div>
          <div class="number-content">
            <div v-for="item in 6">
              <div class="number-item">
                {{ item }}
              </div>
            </div>
            <div class="total-tags">访客人数：10人</div>
          </div>
        </div>
        <div style="width: 3rem; height:2rem;margin: .1rem auto;" id="chart-container"></div>
      </div>

      <div class="total-power">
        <titleContent title="能耗统计" :size="{ width: 5, height: .3 }" style="margin-left: .2rem;" />
        <div style="width: 4rem; height:3rem;margin: .1rem auto;" id="power-container"></div>
      </div>
    </div>
    <div class="right-container" ref="right">
      <div class="cursor-icon" @click="packUp('right')">
        <ExpandAnimation :is-right="true" />
      </div>
      <div class="total-person">
        <div class="event-bg">
          <EventBox :size="{ width: 6, height: 4 }" :is_rem="true" />
        </div>
        <titleContent title="入园人数" :size="{ width: 5, height: .3 }" style="margin-left: .2rem;" />
        <div class="echart-content">
          <div class="animate-content">
            <div class="echart-tags">实时人数</div>
            <SvgIcon class-name="rotate-svg" iconClass="circleRotation" />
          </div>
          <div class="number-content">
            <div v-for="item in 6">
              <div class="number-item">
                {{ item }}
              </div>
            </div>
            <div class="total-tags">访客人数：10人</div>
          </div>
        </div>
        <div style="width: 3rem; height:2rem;margin: .1rem auto;" id="chart-container-r"></div>
      </div>

      <div class="total-power">
        <div class="event-bg">
          <EventBox :size="{ width: 6, height: 4 }" :is_rem="true" />
        </div>
        <titleContent title="能耗统计" :size="{ width: 5, height: .3 }" style="margin-left: .2rem;" />
        <div style="width: 4rem; height:3rem;margin: .1rem auto;" id="power-container-r"></div>
      </div>
    </div>
    <div ref="model" class="model" v-if="true">
      <fc-underline-btn @click="showFloor1" style="width: .8rem; height:.4rem;">
        展开一层
      </fc-underline-btn>
      <fc-underline-btn @click="showFloor2" style="width: .8rem; height:.4rem;">
        展开二层
      </fc-underline-btn>
      <fc-underline-btn @click="showAll" style="width: .8rem; height:.4rem;">
        全部展开
      </fc-underline-btn>
      <fc-underline-btn @click="showWall" style="width: .8rem; height:.4rem;">
        显示外层
      </fc-underline-btn>

    </div>
  </div>
</template>
  
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import camera from '@/three/camera';
import gsap from 'gsap'
//  头部
import Header from './layout/Header.vue';
// 中间左侧区域
import titleContent from '@/components/SvgAnimation/titleContent.vue';
import SvgIcon from '@/icons/SvgIcon.vue';
import { Chart } from '@antv/g2';
import eventHub from '@/utils/eventHub';
import EventBox from './SvgAnimation/EventBox.vue';
import ExpandAnimation from './SvgAnimation/ExpandAnimation.vue';
// 准备数据

const left = ref()
const right = ref()
const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];
const eventContent = ref('')
const model = ref()
const isShowModel = ref(false)
eventHub.on('spriteClick', (data) => {
  eventContent.value = data.event.type
  isShowModel.value = true
  data.css3DEle.visible = true
  // TODO gsap 动画

})
const showWall = () => {
  camera.position.set(0, 150, 400);
  eventHub.emit("showWall");
  camera.updateMatrix()
};

const showFloor1 = () => {
  camera.position.set(100, 100, 100);
  camera.updateMatrix()
  eventHub.emit("showFloor1");
};

const showFloor2 = () => {
  camera.position.set(100, 200, 100);
  camera.updateMatrix()
  eventHub.emit("showFloor2");
};
const showAll = () => {
  camera.position.set(0, 150, 400);
  camera.updateMatrix()
  eventHub.emit("showAll");
};
onMounted(() => {
  // showAll()

  // 初始化图表实例
  const chart = new Chart({
    container: 'chart-container',
    autoFit: true,
    width: 300,
    height: 200
  });

  // 声明可视化
  chart
    .interval() // 创建一个 Interval 标记
    .data(data) // 绑定数据
    .encode('x', 'genre') // 编码 x 通道
    .encode('y', 'sold') //编码 y 通道
    .encode('color', '#1cd')
    .axis('y', {
      labelStroke: '#1cd'
    }).axis('x', {
      labelStroke: '#1cd'
    });

  // 渲染可视化
  chart.render();
  // 2
  const chart1 = new Chart({
    container: 'power-container',
    autoFit: true,
    width: 400,
    height: 300,
    paddingLeft: 50,
  });
  // 声明可视化
  chart1
    .interval() // 创建一个 Interval 标记
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
      format: 'csv',
    })
    .transform({ type: 'sortX', by: 'y', reverse: true, slice: 6 })
    .transform({ type: 'dodgeX' })
    .encode('x', 'state')
    .encode('y', 'population')
    .encode('color', 'age')
    .axis('y', { labelFormatter: '~s', labelStroke: '#1cd' })
    .axis('x', {
      labelStroke: '#1cd',
      titleStroke: '#1cd'
    }).legend('color', {
      itemLabelFill: '#fff',
      titleStroke: '#fff'
    });

  // 渲染可视化
  chart1.render();

  const chart2 = new Chart({
    container: 'chart-container-r',
    autoFit: true,
    width: 300,
    height: 200
  });
  chart2
    .interval() // 创建一个 Interval 标记
    .data(data) // 绑定数据
    .encode('x', 'genre') // 编码 x 通道
    .encode('y', 'sold') //编码 y 通道
    .encode('color', '#1cd')
    .axis('y', {
      labelStroke: '#1cd'
    }).axis('x', {
      labelStroke: '#1cd'
    });

  // 渲染可视化
  chart2.render();
  // 2
  const chart3 = new Chart({
    container: 'power-container-r',
    autoFit: true,
    width: 400,
    height: 300,
    paddingLeft: 50,
  });
  // 声明可视化
  chart3
    .interval() // 创建一个 Interval 标记
    .data({
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/bmw-prod/f129b517-158d-41a9-83a3-3294d639b39e.csv',
      format: 'csv',
    })
    .transform({ type: 'sortX', by: 'y', reverse: true, slice: 6 })
    .transform({ type: 'dodgeX' })
    .encode('x', 'state')
    .encode('y', 'population')
    .encode('color', 'age')
    .axis('y', { labelFormatter: '~s', labelStroke: '#1cd' })
    .axis('x', {
      labelStroke: '#1cd',
      titleStroke: '#1cd'
    }).legend('color', {
      itemLabelFill: '#fff',
      titleStroke: '#fff'
    });

  // 渲染可视化
  chart3.render();

})

let leftSwitch = ref(false)
let rightSwitch = ref(false)
const packUp = (str: string) => {
  if (str === 'left') {
    gsap.to(left.value, {
      left: leftSwitch.value ? '0' : '-4.8rem',
      duration: 3,
      ease: leftSwitch.value ? 'expo' : 'back',
      repeat: 0
    })
    gsap.to(left.value, {
      opacity: leftSwitch.value ? '1' : 0.5,
      duration: 3,
      ease: leftSwitch.value ? 'expo' : 'back',
      repeat: 0
    })
    leftSwitch.value = !leftSwitch.value
  } else {
    gsap.to(right.value, {
      right: rightSwitch.value ? '0' : '-4.8rem',
      duration: 3,
      ease: rightSwitch.value ? 'expo' : 'back',
      repeat: 0
    })
    gsap.to(right.value, {
      opacity: rightSwitch.value ? '1' : 0.5,
      duration: 3,
      ease: rightSwitch.value ? 'expo' : 'back',
      repeat: 0
    })
    rightSwitch.value = !rightSwitch.value
  }
}
</script>
<style scoped lang="scss">
#bigScreen {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 101;
  left: 0;
  top: 0;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  // background: $basic-color;
  overflow: hidden;

  .cursor-icon {
    width: .3rem;
    height: .3rem;
    position: absolute;
    top: 47%;
    color: red;
    cursor: pointer;
  }

  .head {
    width: 100vw;
    height: 1rem;
    background: $basic-color;
    display: flex;
    flex-direction: row;
  }

  .left-container,
  .right-container {

    position: fixed;
    top: 1rem;
    left: 0;
    width: 5rem;
    height: calc(100vh - 1rem);
    background: $basic-color-opacity;
    padding: .2rem;
    pointer-events: all;

    .cursor-icon {
      right: 0
    }

    .total-person {
      position: relative;
      padding-top: .1rem;

      .echart-content {
        padding-left: .2rem;
        width: 100%;
        height: 1rem;
        position: relative;
        display: flex;

        .animate-content {
          position: relative;
          min-width: 1rem;
          width: 1rem;
          height: 1rem;

          .echart-tags {
            position: absolute;
            color: #fff;
            font-size: 12px;
            top: 50%;
            left: 50%;
            margin-left: -0.23rem;
            margin-top: -.1rem;

          }

          .rotate-svg {
            width: 1rem;
            height: 1rem;
          }
        }


        .number-content {
          margin-top: .08rem;
          width: 3rem;
          flex: 1;
          background: url('@/assets/bg/number_bg.png');
          background-repeat: no-repeat;
          background-size: contain;
          padding-left: .3rem;
          padding-right: .2rem;
          display: flex;
          justify-content: space-around;
          position: relative;

          .number-item {
            width: .3rem;
            height: .5rem;
            line-height: .5rem;
            margin-top: .12rem;
            text-align: center;
            background-color: #133a61;
            border: 1px solid $basic-text-color;
            color: #fff;
            font-size: .20rem;

          }

          .total-tags {
            position: absolute;
            bottom: -.3rem;
            right: .1rem;
            color: $basic-text-color
          }
        }
      }
    }

    .total-power {
      position: relative;
      margin-top: .5rem;
      padding-top: .1rem;
    }

  }

  .right-container {
    position: fixed;
    top: 1rem;
    left: auto;
    right: 0;
    width: 5rem;
    height: calc(100vh - 1rem);
    background: $basic-color-opacity;
    padding: .2rem;
    pointer-events: all;

    .cursor-icon {
      left: 0 !important
    }
  }

  .model {
    position: absolute;
    bottom: 0;
    left: 50%;
    display: flex;
    width: 1rem;
    height: 2rem;
    z-index: 102;
    pointer-events: all;

    .model_bg {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}

.event-bg {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
  