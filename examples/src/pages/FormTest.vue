<!--
 * @Author: 秦真
 * @Date: 2022-02-14 14:58:12
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-02-16 10:33:24
 * @Description: 
 * @FilePath: \qz-component\examples\src\pages\FormTest.vue
-->
<template>
  <div>
    <qz-form v-bind="formConfig" v-model="formData"></qz-form>
  </div>
</template>

<script>
export default {
  name: 'FormTest',
  data() {
    const formData = {}
    const formConfig = {
      // labelCol: { span: 6 }, // 默认
      // wrapperCol: { span: 18 }, // 默认
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
          label: '长度限制文本',
          key: 'clientSecret',
          type: 'text',
          maxLength: 20,
          disabled: true,
          rules: [
            { required: true },
            {
              min: 6,
              max: 12,
            },
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
          label: '资源类型',
          key: 'resourceType',
          type: 'radio',
          mode: 'button',
          options: [
            { value: "MENU", label: "菜单" },
            { value: "BUTTON", label: "按钮" },
            { value: "API", label: "api" },
          ],
          rules: [
            { required: true },
          ],
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
          label: '行展示',
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
          rules: [
            { required: true },
          ],
        },
        {
          label: '月份开区间',
          begin: 'monthBeginStage',
          end: 'monthEndStage',
          type: 'month',
          range: true,
          stage: true,
          rules: [
            { required: true },
          ],
        },
        {
          label: '年',
          key: 'year',
          type: 'year',
          rules: [
            { required: true },
          ],
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
          label: '年开区间',
          begin: 'yearBeginStage',
          end: 'yearEndStage',
          type: 'year',
          range: true,
          stage: true,
          rules: [
            { required: true },
          ],
        },
        // {
        //   type: 'area',
        //   key: 'regio^city1',
        //   label: '省市',
        //   resourceConfig: {
        //     type: 'city',
        //     hasAll: true,
        //     allFormat: { label: '全部', value: '' },
        //   },
        //   rules: [
        //     { required: true },
        //   ],
        // },
        // {
        //   type: 'cascader', //级联组件
        //   key: 'cascader1',
        //   label: '级联组件',
        //   resourceConfig: {
        //     options: [
        //       {
        //         value: 'zhejiang',
        //         label: 'Zhejiang',
        //         children: [
        //           {
        //             value: 'hangzhou',
        //             label: 'Hangzhou',
        //           },
        //         ],
        //       },
        //     ],
        //   },
        //   rules: [
        //     { required: true },
        //   ],
        // },
        {
          label: '客户端的重定向URI',
          key: 'webServerRedirectUri',
          type: 'text',
        },
        {
          label: '密码框',
          key: 'pwd',
          type: 'password',
          // visibilityToggle: false,
          rules: [
            { required: true },
          ],
        },
        {
          label: '多行文本',
          key: 'textarea',
          type: 'textarea',
          // allowClear: false,
          maxLength: 10,
          rules: [
            { required: true },
          ],
          grow: 2
        },
        {
          label: '图标',
          key: 'icon',
          type: 'icon',
          // visibilityToggle: false,
          rules: [
            { required: true },
          ],
        },
      ]
    }

    return {
      formConfig,
      formData
    }
  }
}
</script>
