<!--
 * @Author: 秦真
 * @Date: 2022-01-18 10:07:50
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-02-16 10:28:57
 * @Description: 防抖
 * @FilePath: \bgy-component\examples\src\pages\ThrottleTest.vue
-->

<template>
  <div>
    <div @dblclick="log('dblclick 666')" @mousemove="log('mousemove')">666</div>
    <br/>
    <bgy-throttle>
      <a-button type="primary" @click.native="onClickA">抽象组件防抖{{count}}</a-button>
    </bgy-throttle>
    <br/><br/>
    <a-button
      type="primary"
      v-throttle.click="onClickA"
    >指令防抖{{count}}</a-button>

  </div>
</template>

<script>
import { message } from 'ant-design-vue'

export default {
  name: 'Playground',
  data() {
    return {
      count: 0
    }
  },
  methods: {
    onClickA() {
      message.info(count.value)
      count++
    },
    onClickB() {
      this.count--
    },
    log(info) {
      console.log(info)
    }
  }
}
</script>