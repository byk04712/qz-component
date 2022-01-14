<!--
 * @Author: 秦真
 * @Date: 2021-11-13 14:27:24
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-01-14 17:50:00
 * @Description: 
 * @FilePath: \bgy-component\examples\src\Playground.vue
-->
<template>
  <div>
    
    {{ msg }}

    <div @dblclick="log('dblclick 666')" @mousemove="log('mousemove')">666</div>
    <br/>
    <bgy-throttle>
      <a-button type="primary" @click.native="onClickA">抽象组件防抖A{{count}}</a-button>
    </bgy-throttle>
    <bgy-throttle>
      <a-button type="primary" @click.native="onClickB">抽象组件防抖B{{count}}</a-button>
    </bgy-throttle>
    <br/><br/>
    <a-button
      type="primary"
      v-throttle.click="onClickA"
    >指令防抖{{count}}</a-button>

  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'
import { message } from 'ant-design-vue'

export default defineComponent({
  name: 'Playground',
  props: {
    msg: String
  },
  setup() {
    const count = ref(0);

    const onClickA = () => {
      message.info(count.value)
      count.value++
    }
    const onClickB = () => {
      count.value--
    }

    const log = info => {
      console.log(info)
    }
    
    return {
      count,
      log,
      onClickA,
      onClickB
    }
  },
})
</script>