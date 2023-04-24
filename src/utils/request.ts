/*
 * @Author: luozhi
 * @Date: 2022-09-11 17:09:00
 * @LastEditors: luozhi
 * @LastEditTime: 2022-12-09 16:41:43
 * @Descripttion: 封装 Axios
 */
import axios, { Axios, AxiosResponse, AxiosRequestConfig } from "axios";
import { ElMessageBox, ElMessage } from "element-plus";
import { getToken } from "@/utils/auth";
import { useUserStore } from "@/store/modules/user";

declare module "axios" {
  interface AxiosResponse<T = any> {
    errorinfo: null;
    //... 这里追加你的参数
    code: number;
    rows?: Object | Array<T>;
    msg?: string;
  }
  export function create(config?: AxiosRequestConfig): AxiosInstance;
}

// create an axios instance
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config: any) => {
    // do something before request is sent
    const userStore = useUserStore();
    if (userStore.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers["Auth-Token"] = getToken();
      config.headers["Authorization"] = "Bearer " + getToken();
    }
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response: any) => {
    const res = response.data;

    // 二进制数据则直接返回
    if (
      response.request.responseType === "blob" ||
      response.request.responseType === "arraybuffer"
    ) {
      return res;
    }

    const userStore = useUserStore();

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      if (res.msg && !res.msg.includes("认证失败")) {
        ElMessage({
          message: res.msg || "Error",
          type: "error",
          duration: 5 * 1000,
        });
      }

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (
        res.code === 401 ||
        res.code === 508 ||
        res.code === 512 ||
        res.code === 514
      ) {
        // to re-login
        ElMessageBox.confirm(
          "You have been logged out, you can cancel to stay on this page, or log in again",
          "Confirm logout",
          {
            confirmButtonText: "Re-Login",
            cancelButtonText: "Cancel",
            type: "warning",
          }
        ).then(() => {
          userStore.resetToken().then(() => {
            location.reload();
          });
        });
      }
      return Promise.reject(new Error(res.msg || "Error"));
    } else {
      return res;
    }
  },
  (error) => {
    console.log("err" + error); // for debug
    ElMessage({
      message:error.msg,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default service;
