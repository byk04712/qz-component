/*
* @Author: 秦真
* @Date: 2021-11-10 23:56:35
* @LastEditors: Do not edit
* @LastEditTime: 2021-11-18 00:33:57
* @Description: 节流防抖
* @FilePath: /bgy-component/packages/throttle/index.js
*/
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
  name: 'BgyThrottle',

  abstract: true,

  props: {
    // 间隔时间
    time: {
      type: Number,
      default: 300
    },
    // 截流的事件
    events: {
      type: String,
      default: 'click'
    },
    // 是否防抖处理
    isDebounce: {
      type: Boolean,
      default: true
    },
    // 是否立即执行
    isImmediate: {
      type: Boolean,
      default: true
    }
  },

  created() {
    // 节流的事件名称，多个事件使用 , 分割
    this.eventKeys = this.events.split(',')
    this.throttledMap = new Map()
  },

  render() {
    const vnode = this.$slots.default[0] // 获取根元素
    this.eventKeys.forEach((evtName) => {
      const handler = vnode.data.on[evtName] // 获取处理事件
      if (this.throttledMap.has(evtName)) {
        vnode.data.on[evtName] = this.throttledMap.get(evtName)
      } else if (handler) {
        const throttleHandler = throttle(handler, this.time, this.isDebounce, vnode, this.isImmediate)
        this.throttledMap.set(evtName, throttleHandler)
        vnode.data.on[evtName] = throttleHandler
      }
    })
    return vnode
  }
}
