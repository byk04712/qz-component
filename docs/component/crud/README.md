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