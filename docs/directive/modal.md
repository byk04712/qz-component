# v-modal 指令

v-modal 指令仅应用于 a-modal 组件上，多数情况下弹窗应设置为可拖动，已提升用户体验。

### 代码演示

::: demo
```vue
<template>
  <div>
    <a-modal
      :visible="visible1"
      v-modal.drag
      title="弹窗"
      ok-text="确认"
      cancel-text="取消"
      width="600px"
      @ok="visible1 = false"
      @cancel="visible1 = false"
    >
      <h1>我是弹窗内容</h1>
    </a-modal>
    <a-modal
      :visible="visible2"
      v-modal.fullscreen
      title="弹窗"
      ok-text="确认"
      cancel-text="取消"
      width="600px"
      @ok="visible2 = false"
      @cancel="visible2 = false"
    >
      <h1>我是弹窗内容</h1>
    </a-modal>
    <a-button type="primary" @click="visible1 = true">弹出可拖动弹窗</a-button>
    <a-button type="primary" @click="visible2 = true">弹出全屏弹窗</a-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible1: false,
      visible2: false
    }
  }
}
</script>
```
:::

::: tip
如果 `v-modal` 指令同时设置了 `.drag` 和 `.fullscreen` 则只响应 `.fullscreen`，因为全屏弹窗下不允许拖拽
:::