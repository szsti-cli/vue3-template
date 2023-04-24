/*
 * @Author: luozhi
 * @Date: 2022-12-09 16:10:38
 * @LastEditors: luozhi
 * @LastEditTime: 2022-12-09 16:19:31
 * @Descripttion:
 */
import { createRouter, createWebHashHistory } from "vue-router";

import { baseRoutes } from "./modules/base";
import { constantRoutes } from "./modules/constant";

const constantRouter = baseRoutes.concat(constantRoutes);

const router: any = createRouter({
  history: createWebHashHistory(),
  routes: constantRouter,
});

export function resetRouter() {
  const newRouter: any = createRouter({
    history: createWebHashHistory(""),
    routes: constantRouter,
    strict: true,
    scrollBehavior: () => ({ left: 0, top: 0 }),
  });
  router.matcher = newRouter.matcher; // reset router
}

export default router;
