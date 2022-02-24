<template><h1 id="快速上手" tabindex="-1"><a class="header-anchor" href="#快速上手" aria-hidden="true">#</a> 快速上手</h1>
<h2 id="前置依赖" tabindex="-1"><a class="header-anchor" href="#前置依赖" aria-hidden="true">#</a> 前置依赖</h2>
<ul>
<li><a href="https://www.antdv.com" target="_blank" rel="noopener noreferrer">Ant Design Vue v1.7.8+<ExternalLinkIcon/></a></li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>由于本组件基于 ant-design-vue 封装，所以在安装本组件之前需要先安装 ant-design-vue@1.7.8+ 版本</p>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> ant-design-vue@1.7.8 --save
</code></pre></div></div>
<!-- 
## 私有Npm库
本组件未公开发版到 [Npm](https://www.npmjs.com/) 库中，而是发布在 [内网Npm](http://10.15.107.221:8081/#browse/search/npm/) 库中，因此在安装之前需要设置 npm 镜像，推荐使用 NRM 方式管理镜像源。

:::: code-group
::: code-group-item NRM
```bash:no-line-numbers
# 全局安装 nrm，如果已安装请忽略
npm install nrm --global

# 添加镜像源 bgy
nrm add bgy http://10.15.107.221:8081/repository/npm-public/

# 列出已有镜像源
nrm ls

# 切换到镜像源地址为上面添加的 bgy 地址
nrm use bgy
```
:::
::: code-group-item NPM
```bash:no-line-numbers
# 设置镜像源地址
npm config set http://10.15.107.221:8081/repository/npm-public/
```
:::
::: code-group-item YARN
```bash:no-line-numbers
# 设置镜像源地址
yarn config set registry http://10.15.107.221:8081/repository/npm-public/
```
:::
::::
 -->
<h2 id="手动安装" tabindex="-1"><a class="header-anchor" href="#手动安装" aria-hidden="true">#</a> 手动安装</h2>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token comment"># --registry 指向指定镜像源地址进行安装</span>
<span class="token function">npm</span> <span class="token function">install</span> bgy-component --save --registry http://10.15.107.221:8081/repository/npm-public/
</code></pre></div><h2 id="完整引入" tabindex="-1"><a class="header-anchor" href="#完整引入" aria-hidden="true">#</a> 完整引入</h2>
<CodeGroup>
<CodeGroupItem title="main.js">
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

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div></CodeGroupItem>
</CodeGroup>
</template>
