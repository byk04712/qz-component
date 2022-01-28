<!--
 * @Author: 秦真
 * @Date: 2022-01-26 17:02:22
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-01-28 11:11:52
 * @Description: 
 * @FilePath: \bgy-component\examples\src\pages\CrudTest.vue
-->
<template>
  <div>
    <bgy-crud v-bind="crudConfig"></bgy-crud>
  </div>
</template>

<script>
import { defineComponent, reactive } from '@vue/composition-api'

export default defineComponent({
  name: 'CrudTest',
  setup() {
    const crudConfig = reactive({
      requestUrl: 'channel/v1/interfaceLog/pageList',
      tableColumn: []
    })
    return {
      crudConfig
    }
  }
})
</script>
