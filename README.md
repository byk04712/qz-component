# Vue2.x + Vite2.x + TypeScript 基于 Ant Design for Vue 封装通用组件库

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
### 目录结构
```
├── build # 编译脚本
├── dist # 打包后的代码
├── docs # 文档目录
├── coverage # 覆盖率报告（暂无）
├── examples # 代码范例
├── node_modules
├── packages # 组件代码
├── scripts # 脚本 发布、提交信息检查
├── src # 通⽤代码
├── test # 测试（暂无）
└── types # TS类型定义
```

## Git Commit 规范

- 内容规范
```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```
⼤致分为三个部分(使⽤空⾏分割):
1. 标题⾏: 必填, 描述主要修改类型和内容
2. 主题内容: 描述为什么修改, 做了什么样的修改, 以及开发的思路等等
3. ⻚脚注释: 可以写注释，BUG 号链接

- type: commit 的类型
  - feat: 新功能、新特性
  - fix: 修改 bug
  - perf: 更改代码，以提⾼性能
  - refactor: 代码重构（重构，在不影响代码内部⾏为、功能下的代码修改）
  - docs: ⽂档修改
  - style: 代码格式修改, 注意不是 css 修改（例如分号修改）
  - test: 测试⽤例新增、修改
  - build: 影响项⽬构建或依赖项修改
  - revert: 恢复上⼀次提交
  - ci: 持续集成相关⽂件修改
  - chore: 其他修改（不在上述类型中的修改）
  - release: 发布新版本
  - workflow: ⼯作流相关⽂件修改

1. scope: commit 影响的范围, ⽐如: route, component, utils, build...
2. subject: commit 的概述
3. body: commit 具体修改内容, 可以分为多⾏.
4. footer: ⼀些备注, 通常是 BREAKING CHANGE 或修复的 bug 的链接.

#### 示例

##### fix（修复BUG）

如果修复的这个BUG只影响当前修改的⽂件，可不加范围。如果影响的范围⽐较⼤，要加上范围描述。

例如这次 BUG 修复影响到全局，可以加个 global。如果影响的是某个⽬录或某个功能，可以加上该⽬录
的路径，或者对应的功能名称。

```
// 示例1
fix(global):修复checkbox不能复选的问题
// 示例2 下⾯圆括号⾥的 common 为通⽤管理的名称
fix(common): 修复字体过⼩的BUG，将通⽤管理下所有⻚⾯的默认字体⼤⼩修改为 14px
// 示例3
fix: value.length -> values.length
```

##### feat（添加新功能或新⻚⾯）

```
feat: 添加⽹站主⻚静态⻚⾯
这是⼀个示例，假设对点检任务静态⻚⾯进⾏了⼀些描述。
这⾥是备注，可以是放BUG链接或者⼀些重要性的东⻄。
```

##### chore（其他修改）

chore 的中⽂翻译为⽇常事务、例⾏⼯作，顾名思义，即不在其他 commit 类型中的修改，都可以⽤
chore 表示。

```
chore: 将表格中的查看详情改为详情
```

其他类型的 commit 和上⾯三个示例差不多，就不说了。