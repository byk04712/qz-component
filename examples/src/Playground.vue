<!--
 * @Author: 秦真
 * @Date: 2021-11-13 14:27:24
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-11-15 23:30:02
 * @Description: 
 * @FilePath: /bgy-component/examples/src/Playground.vue
-->
<template>
  <a-space>
    
    {{ msg }}

    <div @dblclick="log('dblclick 666')" @mousemove="log('mousemove')">666</div>

    <bgy-throttle>
      <a-button type="primary" @click.native="onClick">按钮防抖{{count}}</a-button>
    </bgy-throttle>

    <a-button
      type="primary"
      v-throttle="1000"
      @click.native="onClick"
    >按钮防抖{{count}}</a-button>

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

    const log = info => {
      console.log(info)
    }
    
    return {
      count,
      log,
      onClick
    }
  },
})
</script>