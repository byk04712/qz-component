

<template>
  <a-config-provider :locale="locale">
    <div>
        <a-tabs @change="onChange">
          <a-tab-pane v-for="comp in componentList" :key="comp.name" :tab="comp.name"></a-tab-pane>
        </a-tabs>

        <!-- 组件 -->
        <component :is="current.component"></component>
    </div>
  </a-config-provider>
</template>

<script>
import { defineComponent, reactive } from '@vue/composition-api'
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'

export default defineComponent({
  name: 'App',
  setup() {

    const componentList = [
      {
        name: 'FormTest',
        component: () => import('./src/pages/FormTest.vue')
      },
      {
        name: 'CrudTest',
        component: () => import('./src/pages/CrudTest.vue')
      },
      {
        name: 'Playground',
        component: () => import('./src/pages/Playground.vue')
      },
      {
        name: 'ThrottleTest',
        component: () => import('./src/pages/ThrottleTest.vue')
      },
    ]

    const current = reactive({ ...componentList[0] })

    const onChange = (name) => {
      const cur = componentList.find(e => e.name === name)
      Object.assign(current, {
        name,
        component: cur.component,
      })
    }

    return {
      locale: zh_CN,
      componentList,
      current,
      onChange
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
