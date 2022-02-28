# item-range 范围区间组件


Crud 组件查询字段，Form 组件字段均使用到了 [Item](/component/item.html), 和 ItemRange

### 示例

::: demo
```vue
<template>
  <div>
    <bgy-item-range :props="props1" v-model="value1"></bgy-item-range>
    <bgy-item-range :props="props2" v-model="value2"></bgy-item-range>
  </div>
</template>
<script>
export default {
  data() {
    return {
      props1: {
        begin: 'monthBegin',
        end: 'monthEnd',
        type: 'month',
        range: true
      },
      value1: [],

      props2: {
        begin: 'dateBeginStage',
        end: 'dateEndStage',
        type: 'date',
        range: true,
        stage: true
      },
      value2: []
    }
  }
}
</script>
```
:::

### API
|参数|说明|类型|可选值|默认值|
|:--|:---|:---|:---|:---|
|type|字段类型|string|`select`, `date`, `month`, `year`, `area`, `cascader`, `slot`,|text|
|key|查询时传给后端的参数名。如果 `type` 为 `slot` 时，同时也用于命名插槽的名称 |string|-|-| 引申： <br/>当 `key`的值带有 `^` 字符时，并且value的类型为 Array,会进行对key进行以`^`分割组合 <br/> 如 key:`a^b^c` value:[ 1, 2, 3] 则请求参数由{ a^b^c: [ 1, 2, 3] } => { a:1, b:2, c:3 }, 常用在type: area || cascader
|value|字段默认值|any|-|-|
|allowClear|输入框是否展示清除图标|boolean|-|true|
|show|是否展示此字段，为`false`时不展示该字段|boolean|-|true|
|format|展示格式化，仅在 `type` 为 `date`，`month`， `year` 时有效|string|-|当 `type` 为 `date`时 默认 `YYYY-MM-DD`<br/>当 `type` 为 `moth`时 默认 `YYYY-MM`<br/>当 `type` 为 `year`时 默认 `YYYY`|
|valueFormat|值格式化，仅在 `type` 为 `date`，`month`， `year` 时有效|string|-|当 `type` 为 `date`时 默认 `YYYY-MM-DD`<br/>当 `type` 为 `moth`时 默认 `YYYY-MM`<br/>当 `type` 为 `year`时 默认 `YYYY`|
|maxLength|最大可输入长度|number|-|100|
|stage|是否为开区间（开始/结束字段可为空），默认是闭区间。仅在 `range` 为 `true` 时有效|boolean|-|false|
|separator|区间字段之间的分隔符号。仅在 `range` 为 `true` 时有效|string|-|~|
|begin|区间类型起始字段查询时传给后端的参数名。仅在 `range` 为 `true` 时有效|string|-|-|
|end|区间类型结束字段查询时传给后端的参数名。仅在 `range` 为 `true` 时有效|string|-|-|