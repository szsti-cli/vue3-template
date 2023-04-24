/*
 * @Author: luozhi
 * @Date: 2022-11-08 14:15:20
 * @LastEditors: luozhi
 * @LastEditTime: 2022-11-21 10:17:08
 * @Descripttion: 工具函数
 */

/**
 * @param str
 * @returns 去除html标签后的字符串
 */
export function delHtmlTag(str: string) {
  return str.replace(/<[^>]+>/g, "");
}

/**
 * @desc 禁选有子集的父级
 * @param data
 * @returns TreeItem[]
 */
type TreeItem = {
  // id: number;
  // name: string;
  // childrens?: TreeItem[] | null;
  // disabled?: boolean;
  // count?: number;
  code: string; //编码
  name: string; //名称
  id: number | null;
  grade: number;
  orderNum?: number; //排序
  parentId?: number; //父级id
  childrens?: TreeItem[] | null;
  disabled?: boolean;
  count?: number;
};

export function formatTreeDisabled(data: TreeItem[]) {
  data.forEach((v: TreeItem) => {
    if (v.childrens && v.childrens.length > 0) {
      v.disabled = true;
      v.childrens = formatTreeDisabled(v.childrens);
    } else {
      v.childrens = null;
    }
  });
  return data;
}

/**
 * @desc 过滤子集为空
 * @param data
 * @returns TreeItem[]
 */

// 过滤为空的集合
export function filterTreeEmpty(data: TreeItem[]) {
  data.forEach((v: TreeItem) => {
    if (!v.childrens || v.childrens.length === 0) {
      v.childrens = null;
    } else {
      v.childrens = filterTreeEmpty(v.childrens);
    }
  });
  return data;
}

/**
 * @desc 根据条件 筛选tree
 * @param data //筛选数据
 * @param name //筛选值
 * @returns TreeItem[]
 */

// export function filterTree(data: TreeItem[], name: string) {
//   const result: TreeItem[] = [];
//   data.forEach((v: TreeItem) => {
//     if (v.name.includes(name)) {
//       result.push(v);
//     }

//     if (v.childrens && v.childrens.length) {
//       const res = filterTree(v.childrens, name);

//       if (res && res.length) {
//         // 重新组合
//         result.push({
//           ...v,
//           childrens: res,
//         });
//       }
//     }
//   });

//   return result;
// }

export function filterTree(
  list: TreeItem[],
  val: string,
  key: string = "name",
  childKey: string = "childrens"
): TreeItem[] {
  const result: TreeItem[] = [];
  list.forEach((v: any) => {
    if (v[key] && v[key].includes(val)) {
      result.push(v);
    }

    if (v[childKey] && v[childKey].length) {
      const res = filterTree(v[childKey], val, key, childKey);

      if (res && res.length) {
        // 重新组合
        const item = { ...v };
        item[childKey] = res;
        result.push(item);
      }
    }
  });
  return result;
}
