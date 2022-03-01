/*
 * @Author: 秦真
 * @Date: 2022-02-28 23:20:33
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-03-01 09:01:44
 * @Description: 工具类函数
 * @FilePath: \bgy-component\src\util\utils.js
 */

/**
 * 深拷贝
 */
export function deepClone (obj) {
  let objCloned
  if (Array.isArray(obj)) {
    objCloned = []
    for (let i = 0; i < obj.length; i++) {
      objCloned[i] = deepClone(obj[i])
    }
  } else if (typeof obj === 'object' && obj !== null) {
    objCloned = {}
    Object.getOwnPropertyNames(obj).forEach(item => {
      objCloned[item] = deepClone(obj[item])
    })
  } else {
    objCloned = obj
  }
  return objCloned
}
