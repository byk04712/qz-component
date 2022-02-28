# amount 金额格式化展示过滤器

用于格式化展示金额，默认保留小数点后2位

## 演示
::: demo
```vue
<template>
  <a-space direction="vertical">
    <div>{{ 123456 | amount }}</div>

    <!-- 保留小数点后5位 -->
    <div>{{ 3.141592627 | amount(5) }}</div>

    <div>{{ '432.1' | amount }}</div>
  </a-space>
</template>
```
:::