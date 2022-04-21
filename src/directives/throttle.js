/*
 * @Author: 秦真
 * @Date: 2021-11-15 22:55:24
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-02-28 15:29:05
 * @Description: 事件防抖指令
 * @FilePath: \qz-component\src\directives\throttle.js
 */
// import { throttle } from '../util/throttle'
import { message } from 'ant-design-vue'

const throttle = (fn, duration = 50, isDebounce, ctx, immediate) => {
  let timer
  let counter = 0
  let lastCall = 0
  return (...args) => {
    if (isDebounce) {
      if (timer) clearTimeout(timer)

      if (immediate) {
        const doNow = !timer
        timer = setTimeout(() => {
          timer = null
        }, duration)
        if (doNow) {
          counter = 0
          fn.apply(ctx, args)
        } else {
          // 超过3次给予提示信息
          if (counter > 3) {
            message.warn('操作过于频繁')
            counter = 0
          } else {
            counter++
          }
        }
      }
    } else {
      const now = new Date().getTime()
      if (now - lastCall < duration) return

      lastCall = now
      fn.apply(ctx, args)
    }
  }
}

export default {
  bind (el, binding, vnode) {
    const {
      arg = 600, // 间隔时间
      value, // 事件函数
      modifiers // 修饰符(事件名作为修饰符,例如 click, dblclick, mousemove 等等)
    } = binding

    if (isNaN(arg)) {
      console.error('间隔时间参数只能为数字')
      return
    }

    let events = Reflect.ownKeys(modifiers)

    // 没有修饰符时,默认为 click
    if (!events.length) {
      events = ['click']
    }

    if (!value) {
      console.log('没有处理函数')
      return
    }

    events.forEach((eventName) => {
      const handlerFunction = throttle(value, Number(arg), true, vnode, true)

      el.addEventListener(eventName, handlerFunction)
    })
  }
}
