# CRUD 组件介绍

crud 封装了常见的 **C**reate **R**etrieve **U**pdate **D**elete 操作。
对于中后台系统而言，表格和表单形式的页面出现最为频繁，且页面相似度较高，如何减少重复性的开发工作，提高开发效率，降低缺陷显得尤为重要，CRUD组件因此孕育而生

### 代码演示
::: demo
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
        // 搜索字段
        searchItem: [
          {
            label: '颜色',
            type: 'text'
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
            dataIndex: 'title',
            title: '标题',
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
            width: 120
          },
          {
            dataIndex: 'date',
            title: '日期',
            width: 120
          },
          {
            dataIndex: 'slogo',
            title: '标语',
            width: 120
          },
          {
            dataIndex: 'intro',
            title: '简介',
            width: 120,
            ellipsis: true,
          },
        ]
      }
    }
  }
}
</script>
```
:::