/*
 * @Author: luozhi
 * @Date: 2022-12-09 16:07:22
 * @LastEditors: luozhi
 * @LastEditTime: 2022-12-09 16:07:22
 * @Descripttion: 
 */
// @ts-nocheck
import request from "@/utils/request";

export function login(data) {
  return request({
    url: "/login",
    method: "post",
    data,
  });
}

export function logout(data) {
  return request({
    url: "/logout",
    method: "post",
    data,
  });
}

export function getInfo() {
  return request({
    url: "/getInfo",
    method: "GET",
  });
}

// 获取验证码
export function getCodeImg() {
  return request({
    url: "/captchaImage",
    headers: {
      isToken: false,
    },
    method: "get",
    timeout: 20000,
  });
}
