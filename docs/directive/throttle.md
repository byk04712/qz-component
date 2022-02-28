# v-throttle 指令

v-throttle 事件节流指令，通常用于触发事件类，例如按钮组件。

### 代码演示

::: demo
```vue
<template>
  <a-space>
    <a-button type="primary" v-throttle.click="handleClick">疯狂快速点击</a-button>

    <!-- 设置节流时间3000ms，默认600ms -->
    <a-button type="primary" v-throttle:3000.click="handleClick">疯狂快速点击</a-button>

    <!-- 多事件同时节流 -->
    <div style="width:300px;height:100px;background:gray;text-align:center;" v-throttle:1000.click.mousemove="handleClick">鼠标快速滑动</div>
  </a-space>
</template>
<script>
export default {
  methods: {
    handleClick() {
      this.$message.info(`此刻: ${new Date().toLocaleTimeString()}`)
    }
  }
}
</script>
```
