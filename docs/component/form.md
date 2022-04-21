# 表单 组件介绍

表单组件为你做了大部分事情，例如表单字段校验，使用者只需提供字段配置说明即可

## 代码演示


::: demo 代码中接口为在线 [fastmock](https://www.fastmock.site/) 数据
```vue
<template>
  <qz-form v-bind="formConfig" v-model="form" @submit="handleSubmit">
    <!-- 自定义按钮 -->
    <template #button="{ form }">
      <a-tag color="pink">字段有{{Object.keys(form).length}}个</a-tag>
    </template>
  </qz-form>
</template>

<script>
export default {
  data() {
    return {
      formConfig: {
        rowSize: 2, // 每行展示2个字段，默认为 1
        // 表单输入框字段配置
        formItem: [
          {
            label: '普通文本框',
            key: 'id',
            type: 'text',
            rules: [
              { required: true, whitespace: true },
            ],
          },
          {
            label: '下拉框',
            key: 'sel',
            type: 'select',
            options: [
              { label: '读', value: 'read' },
              { label: '写', value: 'write' },
              { label: '信任', value: 'trust' },
            ],
            rules: [
              { required: true, message: '自定义校验不通过时提示' },
            ],
          },
          {
            label: '按钮单选框',
            key: 'resourceType',
            type: 'radio',
            mode: 'button',
            options: [
              { label: '员工', value: 'employee' },
              { label: '老板', value: 'boss' }
            ],
            rules: [
              { required: true },
            ],
          },
          {
            label: '客户端',
            key: 'appId',
            type: 'select',
            // 下拉框选项来源于接口，做以下配置
            ajax: 'https://www.fastmock.site/mock/eb7f9e535c90fdde70880b7e088fca31/api/SELECT/client', // 接口地址
            ajaxMethod: 'get', // 请求方式，默认 post
            beforeSetOptions: ({ data }) => data.result.map(value => ({
              label: value,
              value,
            })), // 接口返回的数据进行加工成我们需要的
          },
          {
            label: '行展示',
            key: 'rowSize',
            type: 'number',
            min: 1, // 数字输入框最小值
            max: 3, // 数字输入框最大值
            rules: [
              { required: true },
            ],
            value: 2, // 默认值
          },
          {
            label: '金额数字框',
            key: 'accessTokenValidity',
            type: 'number',
            amount: 100, // 金额输入框
            precision: 2,
            min: 10, // 数字输入框最小值
            max: 99999, // 数字输入框最大值
            rules: [
              { required: true },
            ],
            value: 1999, // 默认值
          },
          {
            label: '性别',
            key: 'radio',
            type: 'radio',
            options: [
              { label: '男', value: 'man' },
              { label: '女', value: 'woman' },
            ],
            value: 'woman',
          },
          {
            label: '爱好',
            key: 'checkbox',
            type: 'checkbox',
            rules: [
              { required: true },
            ],
            options: [
              { label: '唱歌', value: 'sing' },
              { label: '看书', value: 'read' },
              { label: '旅游', value: 'trip' },
              { label: '篮球', value: 'basketball' },
              { label: '拍照', value: 'photo' },
              { label: '睡觉', value: 'sleep' },
            ],
            value: ['trip', 'sleep'],
          },
          {
            label: '日期',
            key: 'date',
            type: 'date',
            rules: [
              { required: true },
            ],
          },
          {
            label: '日期范围',
            begin: 'dateBegin',
            end: 'dateEnd',
            type: 'date',
            range: true,
            rules: [
              { required: true },
            ],
            // ranges: {
            //   今天: [moment(), moment()],
            //   最近一周: [moment().subtract(7, 'd'), moment()]
            // }
            // value: ['2020-10-22', '2020-11-12'], // 默认值
            // value: ['2020-10-22', ], // 只给开始时间默认值（闭区间只能给开始赋默认值）
            // value: [,'2020-11-12'], // 只给结束时间默认值（闭区间只能给开始赋默认值）
          },
          {
            label: '日期开区间',
            begin: 'dateBeginStage',
            end: 'dateEndStage',
            type: 'date',
            range: true,
            stage: true,
            rules: [
              { required: true },
            ],
            // value: ['2020-10-22', '2020-11-12'], // 默认值
            // value: ['2020-10-22', ], // 只给开始时间默认值（开区间可以单独给开始或结束赋默认值）
            // value: [,'2020-11-12'], // 只给结束时间默认值（开区间可以单独给开始或结束赋默认值）
          },
          {
            label: '月份',
            key: 'month',
            type: 'month',
            rules: [
              { required: true },
            ],
          },
          {
            label: '月份范围',
            begin: 'monthBegin',
            end: 'monthEnd',
            type: 'month',
            range: true,
          },
          {
            label: '月份开区间',
            begin: 'monthBeginStage',
            end: 'monthEndStage',
            type: 'month',
            range: true,
            stage: true,
          },
          {
            label: '年',
            key: 'year',
            type: 'year',
          },
          {
            label: '年范围',
            begin: 'yearBegin',
            end: 'yearEnd',
            type: 'year',
            range: true,
            rules: [
              { required: true },
            ],
          },
          {
            label: '密码框',
            key: 'pwd',
            type: 'password',
            // visibilityToggle: false,
            rules: [
              { required: true },
            ]
          },
          {
            label: '多行文本',
            key: 'textarea',
            type: 'textarea',
            // allowClear: false,
            maxLength: 10,
            rules: [
              { required: true },
            ]
          }
        ],
      },
      form: {},
    }
  },
  watch: {
    'form.rowSize'(val) {
      this.formConfig.rowSize = val
    }
  },
  methods: {
    handleSubmit(formData, stopLoading) {
      console.log('表单填写的值', formData);
      // 模拟调用接口
      setTimeout(() => {
        stopLoading(); // 停止提交按钮 loading 状态
        this.$message.success('模拟提交表单成功');
      }, 2000);
    }
  }
}
</script>
:::


## API

### Crud
|参数|说明|类型|可选值|默认值|
|:--|:---|:---|:---|:---|
|formItem|表单字段，详情说明见<a href="#formItem">下面</a>|array|-|[]|
|rowSize|每行展示的字段数（默认为1）|number|`1`, `2`, `3`, `4`|3|
|params|查询时额外传递给分页接口的参数|object|-|{}|
|value(v-model)|表单双向绑定值|object|-|{}|
|labelAlign|表单字段label 标签的文本对齐方式|string|`left`,`right`|right|
|submitable|是否展示提交按钮|boolean|-|true|
|submitText|“提交”按钮展示文案|string|-|提交|
|resetable|是否展示重置按钮|boolean|-|true|
|resetText|“重置”按钮展示文案|string|-|重置|
|beforeSubmitValidate|表单提交校验之前的自定义校验函数，返回boolean值，表示是否校验通过|function|-|-|
|afterSubmitValidate|表单提交校验之后的自定义校验函数，返回boolean值，表示是否校验通过|function|-|-|


### <a name="formItem">formItem</a> 查询字段配置，同 `crud` 组件的 [searchItem 配置](/component/crud/#searcItem)相同