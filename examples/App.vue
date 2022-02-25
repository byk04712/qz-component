

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
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'

export default {
  name: 'App',
  data() {
    const componentList = [
      {
        name: 'CrudTest',
        component: () => import('./src/pages/CrudTest.vue')
      },
      {
        name: 'FormTest',
        component: () => import('./src/pages/FormTest.vue')
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
    return {
      componentList,
      current: componentList[0],
    }
  },
  computed: {
    locale() {
      return zh_CN
    }
  },
  methods: {
    onChange(name) {
      const cur = this.componentList.find(e => e.name === name)
      Object.assign(this.current, {
        component: cur.component,
      })
    }
  }
}
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
