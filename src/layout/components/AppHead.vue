<!--
 * @Author: luozhi
 * @Date: 2022-12-09 16:22:11
 * @LastEditors: luozhi
 * @LastEditTime: 2022-12-12 10:52:37
 * @Descripttion: app标题
-->
<script setup lang="ts">
import { useUserStore } from "@/store/modules/user";
import { ChromeFilled } from "@element-plus/icons-vue";
const route = useRoute();
const router = useRouter();

const userStore = useUserStore();

const userName = computed(() => userStore.name);

const options = [
  {
    label: "退 出",
    key: "logout",
    // icon() {
    //   return h(NIcon, null, {
    //     default: () => h(LogOutOutline),
    //   });
    // },
  },
];

const handleSelect = (key: string | number) => {
  if (key === "logout") logout();
  hoverUser.value = false;
};

const logout = async () => {
  await userStore.logout();
  router.push(`/login?redirect=${route.fullPath}`);
};

const hoverUser = ref(false);

const goHome = () => {
  router.push({ name: "home" });
};
</script>
<template>
  <div class="app-head">
    <div class="app-head__title" @click="goHome">
      <svg-icon class="icon" name="vite" />
      <span class="text">Vue-Template</span>
    </div>
    <!-- <div
      class="app-head__user"
      :class="{ 'is-active': hoverUser }"
      @click="hoverUser = true"
    >
      <n-dropdown
        class="user-dropdown"
        :options="options"
        placement="bottom-start"
        trigger="click"
        @select="handleSelect"
        @clickoutside="hoverUser = false"
      >
        <div class="user-info">
          <n-icon size="18" color="#808695"> <PersonOutline /> </n-icon>
          <span class="ml-1">{{ userName }}</span>
        </div>
      </n-dropdown>
    </div> -->
  </div>
</template>

<style lang="scss" scoped>
.app-head {
  width: 100%;
  height: 60px;
  background: #304156;
  position: fixed;
  top: 0;
  z-index: 1002;
  padding: 0 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  &__title {
    width: 445px;
    height: 60px;
    display: flex;
    // justify-content: space-between;
    align-items: center;
    cursor: pointer;
    .icon {
      width: 29px;
      height: 30px;
    }
    .text {
      margin-left: 12px;
      font-size: 20px;
      font-family: SourceHanSansCN-Bold, SourceHanSansCN;
      font-weight: bold;
      color: #ffffff;
      line-height: 60px;
      letter-spacing: 1px;
    }
  }

  &__user {
    width: 88px;
    height: 34px;
    background: #2c527e;
    border-radius: 17px;
    color: #fff;
    // font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;

    .user-info {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
    .n-icon {
      color: #fff !important;
    }

    &:hover {
      background-color: #1575ff;
    }
  }
  .is-active {
    background-color: #1575ff;
  }
}
</style>
