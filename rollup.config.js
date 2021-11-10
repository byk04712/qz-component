/*
 * @Author: 秦真
 * @Date: 2021-11-10 15:59:17
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-11-10 17:36:49
 * @Description: 
 * @FilePath: \admin-fronted\bgy-component\rollup.config.js
 */
import babel from '@rollup/plugin-babel'
import json from '@rollup/plugin-json'
import vuePlugin from 'rollup-plugin-vue'

const es = {
  input: './src/index.js',
  output: {
    file: 'dist/index.es.js',
    name: 'BgyComponent',
    format: 'es',
    globals: {
      vue: 'Vue',
      compositionApi: 'VueCompositionAPI',
    }
  },
  external: ['compositionApi', 'vue'],
  plugins: [
    babel(),
    json(),
    vuePlugin({ css: true, })
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
      '@vue/composition-api': 'VueCompositionAPI',
    }
  },
  external: ['@vue/composition-api', 'vue'],
  plugins: [
    babel(),
    json(),
    vuePlugin({ css: true, })
  ]
};



import { terser } from 'rollup-plugin-terser';

const minEs = {
  input: './src/index.js',
  output: {
    file: 'dist/index.umd.js',
    name: 'BgyComponent',
    format: 'umd',
    globals: {
      vue: 'Vue',
      '@vue/composition-api': 'VueCompositionAPI',
    }
  },
  external: ['@vue/composition-api', 'vue'],
  plugins: [
    babel(),
    json(),
    vuePlugin({ css: true, }),
    terser(),
  ],
};


const cjs = {
  input: './src/index.js',
  output: {
    file: 'dist/index.cjs.js',
    name: 'BgyComponent',
    format: 'cjs',
    globals: {
      vue: 'Vue',
      compositionApi: 'VueCompositionAPI',
    }
  },
  external: ['compositionApi', 'vue'],
  plugins: [
    babel(),
    json(),
    vuePlugin({ css: true, }),
  ],
};

export default [es, iife, minEs, cjs];
