<!--
 * @Author: luozhi
 * @Date: 2022-11-14 17:11:06
 * @LastEditors: luozhi
 * @LastEditTime: 2022-11-14 17:11:06
 * @Descripttion: 
-->
<template>
  <svg class="icon" aria-hidden="true">
      <use :xlink:href="symbolId"/>
  </svg>
</template>

<script setup lang="ts">
const {prefix='icon',name,color='#333'} =defineProps<{prefix?:string,name:string,color?:string}>()
const symbolId = computed(() => `#${prefix}-${name}`)
</script>