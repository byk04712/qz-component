/*
 * @Author: 秦真
 * @Date: 2021-11-15 22:55:24
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-11-18 23:49:06
 * @Description: 事件防抖指令
 * @FilePath: /bgy-component/src/directive/throttle.js
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

export default function (el, binding, vnode) {
  const {
    // 间隔时间(单位毫秒)
    value = 300,
    // 修饰符(事件名作为修饰符,例如 click, dblclick, mousemove 等等)
    modifiers
  } = binding
  
  let events = Reflect.ownKeys(modifiers)

  // 没有修饰符时,默认为 click
  if (!events.length) {
    events = ['click'];
  }
  console.log('指令', binding)

  events.forEach((eventName) => {
    // if (!vnode?.data?.on) {
    //   return
    // }
    // const eventHandler = throttle(value, el.click) // vnode.data.on[eventName];
    // el.click = () => {
    //   console.log('哈哈')
    // };
    // el.click = undefined
    console.log('-->', el[eventName])
    // const handler = () => console.log(666)//vnode.data.on[eventName]
    // if (throttledMap.has(eventName)) {
    //   console.log('存在');
    //   // vnode.data.on[eventName] = throttledMap.get(eventName)
    // } else {
    //   console.log('不存在')
      const throttleHandler = throttle(() => el[eventName], value, true, vnode, true)
      // vnode.data.on[eventName] = throttleHandler
    // }
    // el[eventName] = throttleHandler
    el[eventName] = () => {
      console.log('9999')
    }
  })
}
