# CRUD 组件介绍

crud 封装了常见的 **C**reate **R**etrieve **U**pdate **D**elete 操作。
对于中后台系统而言，表格和表单形式的页面出现最为频繁，且页面相似度较高，如何减少重复性的开发工作，提高开发效率，降低缺陷显得尤为重要，CRUD组件因此孕育而生

### 代码演示
::: demo 此处放置代码示例的描述信息，支持 `Markdown` 语法，**描述信息只支持单行**
```vue
<template>
  <div>
    <h1 @click="count++">哈哈{{ count }}</h1>
  </div>
</template>
<script>
export default {
  data() {
    return {
      count: 0
    }
  }
}
</script>
```
:::