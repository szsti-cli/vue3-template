/*
 * @Author: luozhi
 * @Date: 2022-10-20 15:22:44
 * @LastEditors: luozhi
 * @LastEditTime: 2022-11-07 10:28:51
 * @Descripttion: 基本路由
 */

export const baseRoutes: any = [
  {
    path: "/404",
    component: () => import("@/views/404/index.vue"),
    hidden: true,
  },

  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    hidden: true,
  },
  { path: "/:path(.*)*", redirect: "/404", hidden: true },
];
