/*
 * @Author: 秦真
 * @Date: 2021-11-15 23:55:28
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-11-16 00:18:46
 * @Description: 节流防抖
 * @FilePath: /qz-component/src/util/throttle.js
 */
export function throttle (
  delay, // 延时的时间,单位毫秒
  noTrailing, // 如果为 true, callback 将在每次 delay 之后执行,为 false 将在 delay 之后执行
  callback, // 回掉函数
  debounceMode // 如果为 true, 则在此先执行, 否则之后再执行
) {
  let timeoutID
  let cancelled = false
  let lastExec = 0

  // 清除已存在的定时任务
  function clearExistingTimeout () {
    if (timeoutID) {
      clearTimeout(timeoutID)
    }
  }

  // 取消下次执行
  function cancel () {
    clearExistingTimeout()
    cancelled = true
  }

  // noTrailing 默认是 false
  if (typeof noTrailing !== 'boolean') {
    debounceMode = callback
    callback = noTrailing
    noTrailing = undefined
  }

  function wrapper (...args) {
    const self = this
    const elapsed = Date.now() - lastExec

    if (cancelled) {
      return
    }

    function exec () {
      lastExec = Date.now()
      callback.apply(self, args)
    }

    function clear () {
      timeoutID = undefined
    }

    if (debounceMode && !timeoutID) {
      exec()
    }

    clearExistingTimeout()

    if (debounceMode === undefined && elapsed > delay) {
      exec()
    } else if (noTrailing !== true) {
      timeoutID = setTimeout(
        debounceMode ? clear : exec,
        debounceMode === undefined ? delay - elapsed : delay
      )
    }
  }

  wrapper.cancel = cancel

  return wrapper
}

export function debounce (delay, atBegin, callback) {
  return callback === undefined ? throttle(delay, atBegin, false) : throttle(delay, callback, atBegin !== false)
}
