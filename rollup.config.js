/*
 * @Author: 秦真
 * @Date: 2021-11-10 15:59:17
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-02-16 10:23:51
 * @Description:
 * @FilePath: \bgy-component\rollup.config.js
 */
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import vuePlugin from 'rollup-plugin-vue'
import commomjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser'

const es = {
  input: './src/index.js',
  output: {
    file: 'dist/index.esm.js',
    name: 'BgyComponent',
    format: 'es',
    globals: {
      vue: 'Vue',
      'ant-design-vue': 'antd',
      moment: 'moment'
    }
  },
  external: ['vue', 'ant-design-vue', 'moment'],
  plugins: [
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
}

const iife = {
  input: './src/index.js',
  output: {
    file: 'dist/index.iife.js',
    name: 'BgyComponent',
    format: 'iife',
    globals: {
      vue: 'Vue',
      'ant-design-vue': 'antd',
      moment: 'moment'
    }
  },
  external: ['vue', 'ant-design-vue', 'moment'],
  plugins: [
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
}

const umd = {
  input: './src/index.js',
  output: {
    file: 'dist/index.umd.js',
    name: 'BgyComponent',
    format: 'umd',
    globals: {
      vue: 'Vue',
      'ant-design-vue': 'antd',
      moment: 'moment'
    }
  },
  external: ['vue', 'ant-design-vue', 'moment'],
  plugins: [
    resolve(),
    commomjs(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      extensions: ['.ts', '.js']
    }),
    json(),
    vuePlugin({ css: true }),
    terser()
  ]
}

const cjs = {
  input: './src/index.js',
  output: {
    file: 'dist/index.cjs.js',
    name: 'BgyComponent',
    format: 'cjs',
    globals: {
      vue: 'Vue',
      compositionApi: 'VueCompositionAPI',
      'ant-design-vue': 'antd',
      moment: 'moment'
    }
  },
  external: ['vue', 'ant-design-vue', 'moment'],
  plugins: [
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
}

export default [es, iife, umd, cjs]
