import { resolve } from 'path';
import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  console.log(`当前处于 ${mode} 命令是 ${command}`);
  return {
    root: './examples',
    // base: './',
    // publicDir: './',
    plugins: [createVuePlugin()],
    resolve: {
      alias: {
        main: resolve(__dirname, './src'),
        packages: resolve(__dirname, './packages')
      }
      /*
      // vite官网配置说明https://cn.vitejs.dev/config/#resolve-extensions
      // vite 不再默认支持忽略.vue扩展名, 是因为 “设计如此”, 参考github上相关 issue 中尤雨溪的回答
      // https://github.com/vitejs/vite/issues/178#issuecomment-630138450
      extensions: ['.js', '.ts', '.vue', '.json']
      */
    }
  }
})
