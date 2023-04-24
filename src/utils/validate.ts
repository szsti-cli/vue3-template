/*
 * @Author: luozhi
 * @Date: 2022-07-24 17:22:18
 * @LastEditors: luozhi
 * @LastEditTime: 2022-11-08 09:25:32
 * @Descripttion:
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str: string) {
  const valid_map = ["admin", "editor"];
  return valid_map.indexOf(str.trim()) >= 0;
}
