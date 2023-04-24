<!--
 * @Author: luozhi
 * @Date: 2022-12-09 16:05:28
 * @LastEditors: luozhi
 * @LastEditTime: 2022-12-12 10:11:45
 * @Descripttion: login page
-->

<script lang="ts" setup>
import { useUserStore } from "@/store/modules/user";
import { ElMessage } from "element-plus";
import { User, Lock, Promotion } from "@element-plus/icons-vue";
// import { ResultEnum } from "@/enums/httpEnum";
// import { PageEnum } from "@/enums/pageEnum";
import { websiteConfig } from "@/config/website.config";
import { getCodeImg } from "@/api/user";

const userStore = useUserStore();

const router = useRouter();
const route = useRoute();

interface FormState {
  username: string;
  password: string;
  uuid: string | null;
  code: string | null;
}

const formRef = ref();
const loading = ref(false);
const autoLogin = ref(true);
// const LOGIN_NAME = PageEnum.BASE_LOGIN_NAME;
const codeUrl = ref("");

const loginForm = reactive({
  uuid: null,
  username: "admin",
  password: "Szsti@2022",
  code: null,
  isCaptcha: true,
});

const rules = {
  username: { required: true, message: "请输入用户名", trigger: "blur" },
  password: { required: true, message: "请输入密码", trigger: "blur" },
  code: { required: true, message: "请输入验证码", trigger: "blur" },
};

const getCode = () => {
  getCodeImg().then((res: any) => {
    console.info(res, "getCodeImg");
    loginForm.isCaptcha =
      res.captchaEnabled === undefined ? true : res.captchaEnabled;
    if (loginForm.isCaptcha) {
      codeUrl.value = "data:image/gif;base64," + res.img;
      loginForm.uuid = res.uuid;
    }
  });
};

const handleSubmit = (e: any) => {
  e.preventDefault();
  formRef.value.validate(async (errors: any) => {
    if (!errors) {
      const { username, password, uuid, code } = loginForm;
      ElMessage.info("登录中...");
      loading.value = true;

      const params: FormState = {
        username,
        password,
        uuid,
        code,
      };

      try {
        const { code, msg }: any = await userStore.login(params);
        ElMessage.closeAll();
        if (code === 200) {
          const toPath = decodeURIComponent(
            (route.query?.redirect || "/") as string
          );
          ElMessage.success("登录成功，即将进入系统");
          router.replace(toPath);
          // if (route.name === LOGIN_NAME) {
          //   router.replace("/");
          // } else router.replace(toPath);
        } else {
          ElMessage.info(msg || "登录失败");
        }
      } finally {
        loading.value = false;
      }
    } else {
      ElMessage.error("请填写完整信息，并且进行验证码校验");
    }
  });
};

onMounted(() => {
  getCode();
});
</script>
<template>
  <div class="view-account">
    <div class="view-account-header"></div>
    <div class="view-account-container">
      <div class="view-account-top">
        <div class="view-account-top-title">{{ websiteConfig.title }}</div>
      </div>
      <div class="view-account-form">
        <el-form
          ref="formRef"
          label-placement="left"
          size="large"
          :model="loginForm"
          :rules="rules"
        >
          <el-form-item path="username">
            <el-input
              v-model="loginForm.username"
              placeholder="请输入用户名"
              :prefix-icon="User"
            >
            </el-input>
          </el-form-item>
          <el-form-item path="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              show-password
              placeholder="请输入密码"
              :prefix-icon="Lock"
            >
            </el-input>
          </el-form-item>
          <el-form-item v-if="loginForm.isCaptcha" path="code">
            <div class="flex justify-between">
              <el-input
                v-model="loginForm.code"
                placeholder="请输入验证码"
                style="width: 302px"
                :prefix-icon="Promotion"
              >
              </el-input>
              <img
                :src="codeUrl"
                @click="getCode"
                class="w-[100px] h-[38px] ml-1"
              />
            </div>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              type="primary"
              size="large"
              class="w-full"
              @click="handleSubmit"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.view-account {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;

  &-container {
    flex: 1;
    padding: 232px 12px;
    max-width: 484px;
    min-width: 420px;
    margin: 0 auto;
  }

  &-top {
    padding: 32px 0;
    text-align: center;

    &-desc {
      font-size: 14px;
      color: #808695;
    }
    &-title {
      font-size: 36px;
      font-weight: bold;
      color: #637381;
      line-height: 40px;
      letter-spacing: 1px;
    }
  }

  &-other {
    width: 100%;
  }

  .default-color {
    color: #515a6e;

    .ant-checkbox-wrapper {
      color: #515a6e;
    }
  }
}

@media (min-width: 768px) {
  .view-account {
    background-image: url("../../assets/images/login.svg");
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: 100%;
  }

  .page-account-container {
    padding: 32px 0 24px 0;
  }
}
</style>
