<!--
 * @Author: 秦真
 * @Date: 2021-11-13 14:27:24
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-11-15 09:39:39
 * @Description: 
 * @FilePath: \admin-fronted\bgy-component\examples\src\Playground.vue
-->
<template>
  <a-space>
    
    {{ msg }}

    <bgy-throttle>
      <a-button type="primary" @click.native="onClick">节流按钮{{count}}</a-button>
    </bgy-throttle>

    <bgy-form></bgy-form>

  </a-space>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { message } from 'ant-design-vue'

export default defineComponent({
  name: 'Playground',
  props: {
    msg: String
  },
  setup() {

    const onClick = () => {
      message.info(String(Math.random()))
    }
    
    return {
      count: 1230,
      onClick
    }
  },
})
</script>