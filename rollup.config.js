// 可以使用未被浏览器和 Node.js 支持的将来版本的 JavaScript 特性
import babel from '@rollup/plugin-babel'
// 告诉 Rollup 如何查找外部模块
import resolve from '@rollup/plugin-node-resolve'
// Rollup 可以从 JSON 文件中读取数据
import json from '@rollup/plugin-json'
import vuePlugin from 'rollup-plugin-vue'
// 用来将 CommonJS 转换成 ES2015 模块的
import commomjs from 'rollup-plugin-commonjs'
// 代码压缩插件
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

const argv = require('minimist')(process.argv.slice(2))

// rollup -c --dev 开发环境包
const isDev = argv.dev || false

const input = 'src/index.js'
const name = 'BgyComponent'
const external = ['vue', 'ant-design-vue', 'moment', 'axios', 'throttle-debounce', 'core-js']
const plugins = [
  resolve(),
  commomjs(),
  babel({
    babelHelpers: 'bundled',
    exclude: 'node_modules/**',
    extensions: ['.ts', '.js']
  }),
  json(),
  vuePlugin({ css: true })
]
const banner = `/*!
 * ${pkg.name} v${pkg.version}
 * @Author: ${pkg.author}
 * @Date: ${new Date().toUTCString()}
 * @License MIT
 */`

// 非开发模式下进行代码压缩处理，减少打包体积
if (!isDev) {
  plugins.push(terser())
}



// esm – 将软件包保存为 ES 模块文件，在现代浏览器中可以通过 <script type=module> 标签引入
const esm = {
  input,
  output: {
    file: 'dist/index.esm-bundler.js',
    name,
    format: 'esm',
    banner
  },
  // 指出应将哪些模块视为外部模块，不会与你的库打包在一起
  external,
  plugins
}

// iife – 一个自动执行的功能，适合作为<script>标签。（如果要为应用程序创建一个捆绑包，您可能想要使用它，因为它会使文件大小变小。）
const iife = {
  input,
  output: {
    file: 'dist/index.global.js',
    name,
    format: 'iife',
    exports: 'named',
    // 全局模块 Object 形式的 id: name 键值对，用于umd/iife包
    globals: {
      vue: 'Vue',
      'ant-design-vue': 'antd',
      moment: 'moment',
      axios: 'axios',
      'throttle-debounce': 'throttle-debounce'
    },
    banner
  },
  // 指出应将哪些模块视为外部模块，不会与你的库打包在一起
  external,
  plugins
}

// umd – 通用模块定义，以amd，cjs 和 iife 为一体
const umd = {
  input,
  output: {
    file: 'dist/index.umd.js',
    name,
    format: 'umd',
    exports: 'named',
    // 全局模块 Object 形式的 id: name 键值对，用于umd/iife包
    globals: {
      vue: 'Vue',
      'ant-design-vue': 'antd',
      moment: 'moment',
      axios: 'axios',
      'throttle-debounce': 'throttle-debounce'
    },
    banner
  },
  // 指出应将哪些模块视为外部模块，不会与你的库打包在一起
  external,
  plugins
}

// cjs – CommonJS，适用于 Node 和 Browserify/Webpack
const cjs = {
  input,
  output: {
    file: 'dist/index.cjs.js',
    name,
    format: 'cjs',
    exports: 'named',
    banner
  },
  // 指出应将哪些模块视为外部模块，不会与你的库打包在一起
  external,
  plugins
}

// amd – 异步模块定义，用于像RequireJS这样的模块加载器
const amd = {
  input,
  output: {
    file: 'dist/index.amd.js',
    name,
    format: 'amd',
    exports: 'named',
    banner
  },
  // 指出应将哪些模块视为外部模块，不会与你的库打包在一起
  external,
  plugins
}

// system - SystemJS 加载器格式
const system = {
  input,
  output: {
    file: 'dist/index.system.js',
    name,
    format: 'system',
    banner
  },
  // 指出应将哪些模块视为外部模块，不会与你的库打包在一起
  external,
  plugins
}

export default [
  esm,
  iife,
  umd,
  cjs,
  amd,
  system
]
