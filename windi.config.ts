/*
 * @Author: luozhi
 * @Date: 2022-12-09 15:56:04
 * @LastEditors: luozhi
 * @LastEditTime: 2022-12-09 15:56:05
 * @Descripttion: 
 */
/*
 * @Author: luozhi
 * @Date: 2022-10-24 15:00:37
 * @LastEditors: luozhi
 * @LastEditTime: 2022-10-24 15:00:37
 * @Descripttion: 
 */

import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  attributify: true,
  safelist: [
    range(20).map((i) => `row-span-${i} col-span-${i}  grid-cols-${i}`), //row-span-1-10  col-span-1-10
  ],
  theme: {
    extend: {
      colors: {
        // 主色
        primary: "#1c90dc",
        // 选中主色
        "primary-active": "#31b4f5",
        // 背景色
        background: "#020b26",
      },
    },
  },
});

function range(size, startAt = 1) {
  return Array.from(Array(size).keys()).map((i) => i + startAt);
}