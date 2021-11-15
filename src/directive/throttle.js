/*
 * @Author: 秦真
 * @Date: 2021-11-15 22:55:24
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-11-16 00:31:02
 * @Description: 事件防抖指令
 * @FilePath: /bgy-component/src/directive/throttle.js
 */
import { throttle } from '../util/throttle'

export default {
  // 当被绑定的元素插入到 DOM 中时
  bind: function (el, binding, vnode) {
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
    console.log('bind', value, events, el, binding, vnode)

    const throttleEventHandlerMap = new Map<String, Function>();
    
    events.forEach((eventName) => {
      if (!vnode?.data?.on) {
        return
      }
      
      const eventHandler = vnode.data.on[eventName]
      if (!throttleEventHandlerMap.has(eventName)) {
        throttleEventHandlerMap.set(eventName, throttle(250, eventHandler))
      }
      if (vnode.data.on) {
        vnode.data.on[eventName] = throttleEventHandlerMap.get(eventName)
      }
    })
  },
  inserted: function () {
    console.log('inserted')
  },
  update: function () {
    console.log('update')
  },
  componentUpdated: function () {
    console.log('componentUpdated')
  },
  unbind: function () {
    console.log('unbind')
  }
}
