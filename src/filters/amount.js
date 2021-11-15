/*
 * @Author: 秦真
 * @Date: 2021-11-10 09:32:38
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-11-10 14:49:21
 * @Description: 金额格式化，舍掉的小数会进行四舍五入处理
 * @FilePath: \admin-fronted\src\filters\amount.js
 */
export default function (value, precision = 2) {
  const options = {
    style: 'currency',
    currency: 'CNY',
    minimumFractionDigits: precision
  };
  if (!isNaN(value)) {
    return Number(value).toLocaleString('zh-CN', options);
  }
  return value;
}
