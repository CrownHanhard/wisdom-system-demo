<template>
  <div>
    <BigScreen />
    <DashBoard />
  </div>
</template>
<script setup lang="ts">
import BigScreen from "@/components/BigScreen.vue";
import DashBoard from "@/components/DashBoard.vue";
</script>
<style  lang="scss">
.elementContent {
  background-color: $basic-text-color;
  box-shadow: 0px 0px 12px  $basic-text-color;
  border: 1px solid  $basic-text-color;
  padding: 20px;
  color: #efefef;

  h1 {
    font-size: 20px;
    font-weight: bold;
    margin: 15px 0;
    color: #efefef;
  }
}
</style>