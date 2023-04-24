<!--
 * @Author: luozhi
 * @Date: 2022-12-09 16:20:32
 * @LastEditors: luozhi
 * @LastEditTime: 2022-12-09 17:14:03
 * @Descripttion: layout
-->
<script lang="ts" setup>
import { AppMain, AppHead } from "./components";
</script>

<template>
  <div class="app-wrapper">
    <AppHead />
    <AppMain />
  </div>
</template>

<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
