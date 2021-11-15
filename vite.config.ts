import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  console.log(`当前处于 ${mode} 命令是 ${command}`);
  return {
    root: './examples',
    plugins: [createVuePlugin()]
  }
})
