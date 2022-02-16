<!--
 * @Author: 秦真
 * @Date: 2021-10-25 16:45:06
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-02-16 11:43:19
 * @Description: 输入项
 * @FilePath: \bgy-component\packages\item\src\item.vue
-->
<template>
  <div class="bgy-item">
    <!-- 下拉选项框 -->
    <a-select
      v-if="props.type === 'select'"
      v-model="modelValue"
      :placeholder="placeholder"
      :allow-clear="allowClear"
      :mode="props.mode"
      :disabled="disabled"
      @change="handleChange"
    >
      <a-select-option
        v-for="item of props.options"
        :key="item.value"
        :value="item.value"
      >
        {{ item.label }}
      </a-select-option>
    </a-select>

    <!-- 日期选择框 -->
    <a-date-picker
      v-else-if="props.type === 'date'"
      v-model="modelValue"
      :placeholder="placeholder"
      :format="format"
      :value-format="valueFormat"
      :allow-clear="allowClear"
      :disabled="disabled"
      @blur="handleBlur"
      @change="handleChange"
    />

    <!-- 月份选择框 -->
    <a-month-picker
      v-else-if="props.type === 'month'"
      v-model="modelValue"
      :placeholder="placeholder"
      :format="format"
      :value-format="valueFormat"
      :allow-clear="allowClear"
      :disabled="disabled"
      @blur="handleBlur"
      @change="handleChange"
    />

    <!-- 年份选择框 -->
    <a-date-picker
      v-else-if="props.type === 'year'"
      v-model="modelValue"
      :placeholder="placeholder"
      :format="format"
      :value-format="valueFormat"
      :allow-clear="allowClear"
      mode="year"
      :disabled="disabled"
      @panelChange="handlePanelChange"
      @change="handleChange"
    />

    <!-- 省市区级联选择框 -->
    <area-cascader
      v-else-if="props.type === 'area'"
      v-bind="props.resourceConfig"
      :placeholder="placeholder"
      v-model="modelValue"
    />

    <!-- 级联选择框 -->
    <a-cascader
      v-else-if="props.type === 'cascader'"
      v-bind="props.resourceConfig"
      :placeholder="placeholder"
      v-model="modelValue"
    />

    <!-- 数字输入框 -->
    <a-input-number
      v-else-if="props.type === 'number'"
      v-model="modelValue"
      :min="props.min"
      :max="props.max"
      :formatter="formatter"
      :parser="parser"
      :precision="props.precision"
      :decimal-separator="props.decimalSeparator"
      :step="props.step"
      :disabled="disabled"
      @change="handleChange"
    />

    <!-- 单选框 -->
    <a-radio-group
      v-else-if="props.type === 'radio'"
      v-model="modelValue"
      button-style="solid"
      :disabled="disabled"
      @change="handleChange"
    >
      <template v-if="props.mode === 'button'">
        <a-radio-button
          v-for="item of props.options"
          :key="item.value"
          :value="item.value"
          :disabled="item.disabled"
        >
          {{ item.label }}
        </a-radio-button>
      </template>
      <a-radio
        v-else
        v-for="item of props.options"
        :key="item.value"
        :value="item.value"
        :disabled="item.disabled"
      >
        {{ item.label }}
      </a-radio>
    </a-radio-group>

    <!-- 复选框 -->
    <a-checkbox-group
      v-else-if="props.type === 'checkbox'"
      v-model="modelValue"
      :options="props.options"
      :disabled="disabled"
      @change="handleChange"
    />

    <!-- 开关 -->
    <a-switch
      v-else-if="props.type === 'switch'"
      v-model="modelValue"
      :checked-children="props.checkedChildren"
      :un-checked-children="props.unCheckedChildren"
      :disabled="disabled"
    />

    <!-- 多行文本输入框 -->
    <a-textarea
      v-else-if="props.type === 'textarea'"
      v-model="modelValue"
      :allow-clear="allowClear"
      :placeholder="placeholder"
      :max-length="maxLength"
      :auto-size="props.autoSize || { minRows: 1, maxRows: 4 }"
      :disabled="disabled"
      @blur="handleBlur($event.target.value)"
      @change="handleChange($event.target.value)"
    />

    <!-- 密码输入框 -->
    <a-input-password
      v-else-if="props.type === 'password'"
      v-model="modelValue"
      :allow-clear="allowClear"
      :placeholder="placeholder"
      :max-length="maxLength"
      :visibility-toggle="props.visibilityToggle"
      :disabled="disabled"
      @blur="handleBlur($event.target.value)"
      @change="handleChange($event.target.value)"
    />

    <!-- 文本输入框(默认项) -->
    <a-input
      v-else
      :allow-clear="allowClear"
      :placeholder="placeholder"
      v-model="modelValue"
      :max-length="maxLength"
      :disabled="disabled"
      @blur="handleBlur($event.target.value)"
      @change="handleChange($event.target.value)"
    >
      <a-tooltip v-if="props.tooltip" slot="suffix" :title="props.tooltip">
        <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
      </a-tooltip>
    </a-input>

  </div>
</template>

<script>
import moment from 'moment';
// import AreaCascader from '@/components/cascader/areaCascader.vue';

export default {
  name: 'BgyItem',

  props: {
    // item 的配置属性
    props: {
      type: Object,
      default: () => ({}),
    },

    // v-model
    value: [String, Number, Array, Object, Boolean],
  },

  data() {
    return {};
  },

  // components: { AreaCascader },

  computed: {
    // 字段绑定的 v-model
    modelValue: {
      get() {
        const val = this.value;
        if (['date', 'month', 'year'].includes(this.props.type)) {
          return !val || moment.isMoment(val) ? val : moment(val, this.valueFormat);
        }
        return this.value;
      },
      set(value) {
        let val = value;
        if (['date', 'month', 'year'].includes(this.props.type)) {
          val = moment.isMoment(val) ? val.format(this.valueFormat) : val;
        }
        this.$emit('input', val);
      }
    },

    // placeholder 提示
    placeholder() {
      if (this.props.placeholder) {
        return this.props.placeholder;
      }
      if (['select', 'radio', 'date', 'month', 'year', 'area', 'cascader'].includes(this.props.type)) {
        return `请选择${this.props.label}`;
      }
      if (this.props.placeholder === false) {
        return
      }
      return `请输入${this.props.label}`;
    },

    // 是否允许清除
    allowClear() {
      return this.props.allowClear !== false;
    },

    // 展示格式化
    format() {
      // 日期范围输入框
      if (this.props.type === 'date') {
        return this.props.format || 'YYYY-MM-DD';
      }
      // 月份范围输入框
      if (this.props.type === 'month') {
        return this.props.format || 'YYYY-MM';
      }
      // 年份范围输入框
      if (this.props.type === 'year') {
        return this.props.format || 'YYYY';
      }
      return this.props.format;
    },

    // value 格式化
    valueFormat() {
      if (this.props.type === 'date') {
        return this.props.valueFormat || 'YYYY-MM-DD';
      }
      if (this.props.type === 'month') {
        return this.props.valueFormat || 'YYYY-MM';
      }
      if (this.props.type === 'year') {
        return this.props.valueFormat || 'YYYY';
      }
      return this.props.valueFormat;
    },

    // 最大长度
    maxLength() {
      return this.props.maxLength || 100;
    },

    // 是否禁用状态
    disabled() {
      return this.props.disabled === true;
    },

    // 数字输入框的 formatter 属性
    formatter() {
      return (value) => {
        if (typeof this.props.formatter === 'function') {
          return this.props.formatter(value);
        } else if (this.props.amount) { // 金额类型的数字输入框
          return `￥ `+(`${value}`.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1').replace(/\B(?=(\d{3})+(?!\d))/g, ','))
        }
        return value;
      };
    },

    // 数字输入框的 parser 属性
    parser() {
      return (value) => {
        if (typeof this.props.parser === 'function') {
          return this.props.parser(value);
        } else if (this.props.amount) { // 金额类型的数字输入框
          return value.replace(/\￥\s?|(,*)/g, '');
        }
        return value;
      };
    },

  },

  methods: {
    // 年份选择框选择事件
    handlePanelChange(value) {
      this.modelValue = value;
      this.$emit('change', value, this.props);
    },

    // 处理 blur 事件
    handleBlur(value) {
      this.$emit('blur', value, this.props);
    },

    // 处理 change 事件
    handleChange(value) {
      this.$emit('change', value, this.props);
    },
  },
}
</script>
