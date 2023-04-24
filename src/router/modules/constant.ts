/*
 * @Author: luozhi
 * @Date: 2022-10-20 15:34:48
 * @LastEditors: luozhi
 * @LastEditTime: 2022-12-09 17:18:59
 * @Descripttion: 页面路由
 */

/* Layout */
export const Layout = () => import("@/layout/index.vue");
// export const LayoutBlank = () => import("@/layout/LayoutBlank.vue");

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    name: "home",
    meta: { title: "首页", icon: "HomeIcon" },
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("@/views/home/index.vue"),
      },
    ],
  },
];
