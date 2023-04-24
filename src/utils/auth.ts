/*
 * @Author: luozhi
 * @Date: 2022-09-11 15:47:16
 * @LastEditors: luozhi
 * @LastEditTime: 2022-11-07 10:35:02
 * @Descripttion: token模块
 */
import Cookies from "js-cookie";

const TokenKey = "vue3_admin_token";
const Userkey = "auth_id";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token: string) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function getUserId() {
  return Cookies.get(Userkey);
}

export function setUserId(id: string) {
  return Cookies.set(Userkey, id);
}

export function removeUserId(id?: string) {
  return Cookies.remove(TokenKey);
}
