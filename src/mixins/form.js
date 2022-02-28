/*
 * @Author: 秦真
 * @Date: 2021-11-08 10:17:55
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-02-28 22:44:18
 * @Description: 表单混入
 * @FilePath: \bgy-component\src\mixins\form.js
 */
import deepClone from 'lodash.clonedeep';


/**
 * 构造完整的 rule 项
 */
const buildRules = (item, rangeLabel = '') =>
  item.rules.map((rule) => {
    // 必填项
    if (rule.required) {
      rule.message = rule.message || `${item.label}${rangeLabel}为必填项`;
    }

    // 最大长度，最小长度都设置了
    if (rule.min && rule.max) {
      rule.message = rule.message || `${item.label}长度应在 ${rule.min} ~ ${rule.max} 个字符之间`;
    }
    // 设置了最小长度
    else if (rule.min) {
      rule.message = rule.message || `${item.label}长度至少为 ${rule.min} 个字符`;
    }
    // 设置了最大长度
    else if (rule.max) {
      rule.message = rule.message || `${item.label}长度最多为 ${rule.max} 个字符`;
    }

    // 校验触发的时机
    rule.trigger = rule.trigger || ['change', 'blur'];

    return rule;
  });


export default {
  methods: {

    /**
     * 初始化表单字段
     */
    initFormItem(formItem = []) {
      if (!(Array.isArray(formItem) && formItem.length)) {
        return;
      }

      formItem.forEach(item => {
        // type 默认为 text
        if (!item.type) {
          item.type = 'text';
        }

        // 占据位置
        if (isNaN(item.grow)) {
          item.grow = 1;
        } else {
          item.grow = Number(item.grow);
        }

        if (['text', 'textarea', 'password'].includes(item.type)) {
          // 默认长度
          const maxLengthMap = {
            text: 100,
            password: 50,
            textarea: 500,
          };
          // 如果是输入型字段，没有限制最大输入字符，则默认最长为100
          if (!Object.prototype.hasOwnProperty.call(item, 'maxLength')) {
            this.$set(item, 'maxLength', maxLengthMap[item.type]);
          }
        } else if (['select', 'radio', 'checkbox'].includes(item.type)) {
          // 如果是选项型字段，没有提供 options 选项，则默认 options 为 []
          if (!Object.prototype.hasOwnProperty.call(item, 'options')) {
            this.$set(item, 'options', []);
          }
        }
      });

    },

    /**
     * 初始化查询表单值
     */
    initFormData(formItem = [], formData = {}) {
      if (!(Array.isArray(formItem) && formItem.length)) {
        return {};
      }
      return formItem.reduce((acc, item) => {
        // 区间输入框， 默认值为数组类型， [起始字段默认值， 结束字段默认值]
        if (item.range) {
          const [beginVal, endVal] = item.value || [];
          this.$set(acc, item.begin, acc[item.begin] || beginVal);
          this.$set(acc, item.end, acc[item.end] || endVal);
        } else if (['area'].includes(item.type)) {
          // area 字段类型时， key值可以支持多个， 使用 ^ 分隔
          if (item.key.indexOf('^') > -1) {
            if (Array.isArray(item.value) && item.value.length) {
              item.value.forEach((val, idx) => {
                this.$set(acc, item.key.split('^')[idx], val);
              });
            }
            item.key.split('^').forEach(key => {
              if (acc[key] !== undefined) {
                this.$set(acc, key, acc[key]);
              }
            });
          } else {
            this.$set(acc, item.key, acc[item.key] || item.value);
          }
        } else if (['number'].includes(item.type) && typeof item.amount === 'number') {
          const scale = item.amount || 1; // 金额单位默认为元
          if (!isNaN(acc[item.key])) {
            this.$set(acc, item.key, acc[item.key] / scale);
          } else if (!isNaN(item.value)) {
            this.$set(acc, item.key, item.value / scale);
          }
        } else {
          this.$set(acc, item.key, acc[item.key] || item.value);
        }
        return acc;
      }, { ...formData });
    },

    /**
     * 表单提交后的数据转换
     */
    translateFormData(formItem = [], formData = {}) {
      return formItem.reduce((acc, item) => {
        // 数字类型的输入框
        if (item.type === 'number') {
          // 金额框
          if (typeof item.amount === 'number' && typeof formData[item.key] === 'number') {
            acc[item.key] = formData[item.key] * item.amount;
          }
        }
        return acc;
      }, { ...formData });
    },

    /**
     * 初始化表单校验规则
     */
    initRules(formItem = []) {
      if (!(Array.isArray(formItem) && formItem.length)) {
        return {};
      }

      const rules = {};
      formItem
        .filter(e => Array.isArray(e.rules) && e.rules.length)
        .forEach(item => {
          // 如果是区间输入框
          if (item.range) {
            rules[item.begin] = buildRules(deepClone(item), '起始');
            rules[item.end] = buildRules(deepClone(item), '结束');
          } else {
            rules[item.key] = buildRules(item);
          }
        });
      return rules;
    },

  },
}
