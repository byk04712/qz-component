/*
 * @Author: 秦真
 * @Date: 2022-02-28 23:20:33
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-03-09 12:29:53
 * @Description: 工具类函数
 * @FilePath: \bgy-component\src\util\utils.js
 */

/**
 * 深拷贝
 */
export function deepClone (obj) {
  let objCloned
  if (typeof obj === 'object' && obj !== null) {
    objCloned = Array.isArray(obj) ? [] : {}
    for(let key in obj) {
      objCloned[key] = deepClone(obj[key])
    }
  } else {
    objCloned = obj
  }
  return objCloned
}
