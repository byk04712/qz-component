<!--
 * @Author: 秦真
 * @Date: 2021-11-13 14:27:24
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-11-15 14:05:47
 * @Description: 
 * @FilePath: \admin-fronted\bgy-component\examples\src\Playground.vue
-->
<template>
  <a-space>
    
    {{ msg }}

    <bgy-throttle>
      <a-button type="primary" @click.native="onClick">节流按钮{{count}}</a-button>
    </bgy-throttle>

  </a-space>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  name: 'Playground',
  props: {
    msg: String
  },
  setup() {
    const count = ref(0);

    const onClick = () => {
      count.value++
    }
    
    return {
      count,
      onClick
    }
  },
})
</script>