

<template>
  <div>
    <playground :msg="msg" />
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import Playground from './src/Playground.vue'

export default defineComponent({
  name: 'App',
  components: {
    Playground
  },
  setup() {
    return {
      msg: 'Hello Vue 3 + TypeScript + Vite'
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
