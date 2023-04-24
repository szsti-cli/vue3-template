/*
 * @Author: luozhi
 * @Date: 2021-10-09 11:36:58
 * @LastEditors: luozhi
 * @LastEditTime: 2022-11-07 15:36:40
 * @Description: userStore
 */
import { defineStore } from "pinia";
import { login, logout, getInfo } from "@/api/user";
import {
  getToken,
  setToken,
  removeToken,
  getUserId,
  setUserId,
  removeUserId,
} from "@/utils/auth";
import { resetRouter } from "@/router";
import { encrypt, decrypt } from "@/utils/jsencrypt";

export const useUserStore = defineStore({
  id: "userStore",
  state: () => ({
    token: getToken(),
    name: "",
    avatar: "",
  }),
  getters: {},
  actions: {
    // user login
    async login(userInfo: any) {
      const { username, password, code, uuid } = userInfo;
      return new Promise((resolve, reject) => {
        const params = {
          username: encrypt(username.trim()),
          password: encrypt(password.trim()),
          code: code,
          uuid: uuid,
        };
        login(params)
          .then((response: any) => {
            const { token } = response;
            // this.token = data.token;
            this.$patch({
              // id: Id,
              token: token,
            });
            setToken(token);
            // setUserId(data.Id);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // get user info
    getInfo() {
      return new Promise((resolve, reject) => {
        getInfo()
          .then((response: any) => {
            const { user } = response;

            if (!user) {
              return reject("Verification failed, please Login again.");
            }

            const { userName, avatar } = user;

            this.$patch({
              // id: Id,
              name: userName,
              avatar: avatar,
            });
            resolve(user);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // user logout
    logout() {
      return new Promise<void>((resolve, reject) => {
        logout(this.token)
          .then(() => {
            removeToken(); // must remove  token  first
            // removeUserId();
            resetRouter();
            this.$reset(); // 重置store
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // remove token
    resetToken() {
      return new Promise<void>((resolve) => {
        removeToken(); // must remove  token  first
        // removeUserId();
        this.$reset(); // 重置store
        console.info("执行了resetToken");
        resolve();
      });
    },
  },
});
