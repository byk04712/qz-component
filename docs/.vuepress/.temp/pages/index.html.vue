<template><h3 id="引入简单" tabindex="-1"><a class="header-anchor" href="#引入简单" aria-hidden="true">#</a> 引入简单</h3>
<div class="language-v ext-v line-numbers-mode"><pre v-pre class="language-v"><code><span class="token keyword">import</span> Vue from <span class="token string quoted-string">'vue'</span>
<span class="token keyword">import</span> App from <span class="token string quoted-string">'./App.vue'</span>
<span class="token keyword">import</span> Antd from <span class="token string quoted-string">'ant-design-vue'</span>
<span class="token keyword">import</span> BgyComponent from <span class="token string quoted-string">'bgy-component'</span>
<span class="token comment">// 1. 导入 ant-design-vue 样式文件</span>
<span class="token keyword">import</span> <span class="token string quoted-string">'ant-design-vue/dist/antd.css'</span>
<span class="token comment">// 2. 导入 bgy-component 样式文件</span>
<span class="token keyword">import</span> <span class="token string quoted-string">'bgy-component/dist/index.css'</span>

Vue<span class="token punctuation">.</span>config<span class="token punctuation">.</span>productionTip <span class="token operator">=</span> <span class="token boolean">false</span>

<span class="token comment">// bgy-component 基于 ant-design-vue，必须 use 它</span>
Vue<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>Antd<span class="token punctuation">)</span>
Vue<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>BgyComponent<span class="token punctuation">)</span>

new <span class="token function">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
  render<span class="token punctuation">:</span> function <span class="token punctuation">(</span>h<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token function">h</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span>$<span class="token function">mount</span><span class="token punctuation">(</span><span class="token string quoted-string">'#app'</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div></template>
