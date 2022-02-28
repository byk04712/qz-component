# CRUD 组件介绍

crud 封装了常见的 **C**reate **R**etrieve **U**pdate **D**elete 操作。
对于中后台系统而言，表格和表单形式的页面出现最为频繁，且页面相似度较高，如何减少重复性的开发工作，提高开发效率，降低缺陷显得尤为重要，CRUD组件因此孕育而生

### 代码演示
::: demo 接口为在线 [fastmock](https://www.fastmock.site/) 数据，每次都将生成不同Mock数据
```vue
<template>
  <bgy-crud v-bind="crudConfig"></bgy-crud>
</template>
<script>
export default {
  data() {
    return {
      crudConfig: {
        // 分页接口
        requestUrl: 'https://www.fastmock.site/mock/eb7f9e535c90fdde70880b7e088fca31/api/employee/pagination',
        // 是否显示序号，默认 false
        showOrder: true,
        // 搜索字段
        searchItem: [
          {
            key: 'name',
            label: '姓名',
            type: 'text'
          },
          {
            key: 'age',
            label: '年龄段',
            type: 'select',
            options: [
              { label: '18 以下', value: '< 18' },
              { label: '18 ~ 40 之间', value: '18-40' },
              { label: '40 以上', value: '> 40' }
            ]
          },
        ],
        // 数据列
        tableColumn: [
          {
            dataIndex: 'color',
            title: '颜色',
            width: 120
          },
          {
            dataIndex: 'name',
            title: '姓名',
            width: 120
          },
          {
            dataIndex: 'age',
            title: '年龄',
            width: 120
          },
          {
            dataIndex: 'email',
            title: '邮箱地址',
            width: 200
          },
          {
            dataIndex: 'slogo',
            title: '座右铭',
            width: 200,
            ellipsis: true
          },
          {
            dataIndex: 'date',
            title: '日期',
            width: 180
          },
        ]
      }
    }
  }
}
</script>
```
:::


## API

### Crud
|参数|说明|类型|可选值|默认值|
|:--|:---|:---|:---|:---|
|requestUrl|分页接口地址|string|-|-|
|searchItem|表格查询字段，详情说明见<a href="#searchItem">下面</a>|array|-|[]|
|tableColumn|表格展示数据列，[配置参考](https://www.antdv.com/components/table-cn/#Column)|array|-|[]|
|rowSize|每行展示的查询字段数（因内部做了响应式处理，通常不设置此值）|number|`1`, `2`, `3`, `4`|3|
|autoSearch|进入页面是否自动执行查询|boolean|-|false|
|rowKey|表格行 key 的取值，参考 Antd 的 [table API](https://www.antdv.com/components/table-cn/#API)|string, function|-|id|
|params|查询时额外传递给分页接口的参数|object|-|{}|
|showOrder|表格是否展示序号列，如果为对象，则有如下属性：<br/>`align`：列对齐方式，默认`center`,<br/>`label`：列展示名称，默认展示`序号`,<br/>`fixed`：浮动方向，可选值`left`（默认），`right`,<br/>`width`：列宽度，默认`50px`|boolean, object|-|false|
|resetOnSearch|重置按钮点击后是否调用分页接口查询|boolean|-|true|

### <a name="searchItem">searchItem</a>查询字段配置
|参数|说明|类型|可选值|默认值|
|:--|:---|:---|:---|:---|
|type|字段类型|string|`select`, `date`, `month`, `year`, `area`, `cascader`, `slot`,|text|
|key|查询时传给后端的参数名。如果 `type` 为 `slot` 时，同时也用于命名插槽的名称 |string|-|-| 引申： <br/>当 `key`的值带有 `^` 字符时，并且value的类型为 Array,会进行对key进行以`^`分割组合 <br/> 如 key:`a^b^c` value:[ 1, 2, 3] 则请求参数由{ a^b^c: [ 1, 2, 3] } => { a:1, b:2, c:3 }, 常用在type: area || cascader
|label|展示的标签名|string|-|-|
|value|字段默认值|any|-|-|
|allowClear|输入框是否展示清除图标|boolean|-|true|
|range|是否为区间范围字段,范围区间只支持 `type` 为 `date`， `month`， `year`|boolean|-|false|
|stage|是否为开区间（开始/结束字段可为空），默认是闭区间。仅在 `range` 为 `true` 时有效|boolean|-|false|
|separator|区间字段之间的分隔符号。仅在 `range` 为 `true` 时有效|string|-|~|
|begin|区间类型起始字段查询时传给后端的参数名。仅在 `range` 为 `true` 时有效|string|-|-|
|end|区间类型结束字段查询时传给后端的参数名。仅在 `range` 为 `true` 时有效|string|-|-|
|show|是否展示此字段，为`false`时不展示该字段|boolean|-|true|
|format|展示格式化，仅在 `type` 为 `date`，`month`， `year` 时有效|string|-|当 `type` 为 `date`时 默认 `YYYY-MM-DD`<br/>当 `type` 为 `moth`时 默认 `YYYY-MM`<br/>当 `type` 为 `year`时 默认 `YYYY`|
|valueFormat|值格式化，仅在 `type` 为 `date`，`month`， `year` 时有效|string|-|当 `type` 为 `date`时 默认 `YYYY-MM-DD`<br/>当 `type` 为 `moth`时 默认 `YYYY-MM`<br/>当 `type` 为 `year`时 默认 `YYYY`|
|maxLength|最大可输入长度|number|-|100|
|resourceConfig|设置组件自身属性对象集合，暂时仅支持type:`area`|`cascader`|object|-|-| 注意：由于双向数据绑定关系，默认值不在该对象下设置，提升放在到value里设置 <br/>
`area` [resourceConfig使用](./areaCascader.md)<br/>`cascader` [resourceConfig使用](https://1x.antdv.com/components/cascader-cn/#API)
|valueParse|查询字段值解析，用于解析或修改查询字段值|function(value, item, searchFormData) 返回解析后的值|-|-|



### tableColumn 额外提供的属性

|参数|说明|类型|可选值|默认值|
|:--|:---|:---|:---|:---|
|show|是否展示此字段，为`false`时不展示该字段|boolean|-|true|