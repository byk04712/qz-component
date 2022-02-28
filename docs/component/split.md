# Split 分割器组件



## 代码演示
::: demo
```vue
<template>
  <div>
    <div class="demo-split">
      <bgy-split v-model="split1" mode="horizontal">
        <div slot="left" class="demo-split-pane">Left Pane</div>
        <div slot="right" class="demo-split-pane">Right Pane</div>
      </bgy-split>
    </div>
    <br>
    <br>
    <div class="demo-split">
      <bgy-split v-model="split2" mode="vertical">
        <div slot="top" class="demo-split-pane">Top Pane</div>
        <div slot="bottom" class="demo-split-pane">Bottm Pane</div>
      </bgy-split>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      split1: 0.3,
      split2: 0.5,
    }
  },
}
</script>
<style>
.demo-split{
  height: 200px;
  border: 1px solid #dcdee2;
}
.demo-split-pane{
  padding: 10px;
}
</style>
```
:::



## API

### 属性
|参数|说明|类型|可选值|默认值|
|:--|:---|:---|:---|:---|
|value|面板位置，可以是 0~1 代表百分比，或具体数值的像素，可用 v-model 双向绑定|Number, String|-|0.5|
|mode|类型，可选值为 horizontal 或 vertical|String|-|horizontal|
|min|最小阈值|Number, String|-|40px|
|max|最大阈值|Number, String|-|40px|
|rowKey|表格行 key 的取值，参考 Antd 的 [table API](https://www.antdv.com/components/table-cn/#API)|string, function|-|id|
|params|查询时额外传递给分页接口的参数|object|-|{}|
|showOrder|表格是否展示序号列，如果为对象，则有如下属性：<br/>`align`：列对齐方式，默认`center`,<br/>`label`：列展示名称，默认展示`序号`,<br/>`fixed`：浮动方向，可选值`left`（默认），`right`,<br/>`width`：列宽度，默认`50px`|boolean, object|-|false|

### 事件

|事件名|说明|返回值|
|:--|:---|:---|
|on-move-start|拖拽开始|-|
|on-moving|拖拽中|event|
|on-move-end|拖拽结束|-|

### 插槽
|名称|说明|
|:--|:---|
|left|	mode 为 horizontal 时可用，左边面板|
|right|	mode 为 horizontal 时可用，右边面板|
|top|	mode 为 vertical 时可用，上边面板|
|bottom|	mode 为 vertical 时可用，下边面板|
|trigger|	自定义分割拖拽节点|
