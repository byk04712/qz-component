<!--
 * @Author: 秦真
 * @Date: 2021-10-25 17:20:38
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-11-15 11:12:36
 * @Description: 区间范围
 * @FilePath: \admin-fronted\bgy-component\packages\item-range\src\item-range.vue
-->
<template>
  <div class="bgy-item-range">

    <!-- 开区间（起始或结束可以为空） -->
    <a-form-model-item
      v-if="props.stage"
      :label="displayLabel"
      :colon="props.colon !== false"
      :required="(props.rules || []).some(e => e.required)"
      :auto-link="false"
      class="bgy-item-range--stage"
    >
      <a-row type="flex">
        <!-- 起始字段 -->
        <a-col :span="11">
          <a-form-model-item
            :ref="props.begin"
            :prop="props.begin"
            :class="props.begin"
            auto-link
          >
            <!-- 日期范围输入框 -->
            <a-date-picker
              v-if="props.type === 'date'"
              v-model="beginModelValue"
              :placeholder="placeholder[0]"
              :format="format"
              :value-format="valueFormat"
              :show-time="showBeginTime"
              :allow-clear="allowClear"
              :disabled-date="disabledBeginDate"
              :disabled-time="disabledBeginDateTime"
            />
            <!-- 月份范围输入框 -->
            <a-month-picker
              v-else-if="props.type === 'month'"
              v-model="beginModelValue"
              :placeholder="placeholder[0]"
              :format="format"
              :value-format="valueFormat"
              :allow-clear="allowClear"
              :disabled-date="disabledBeginDate"
            />
            <!-- 年份范围输入框 -->
            <a-date-picker
              v-else-if="props.type === 'year'"
              v-model="beginModelValue"
              :placeholder="placeholder[0]"
              :format="format"
              :value-format="valueFormat"
              :show-time="showBeginTime"
              :allow-clear="allowClear"
              :disabled-date="disabledBeginDate"
              mode="year"
              @panelChange="handleBeginPanelChange"
            />
          </a-form-model-item>
        </a-col>
        <!-- 分隔符 -->
        <a-col :span="2" class="seperator">{{ separator }}</a-col>
        <!-- 结束字段 -->
        <a-col :span="11">
          <a-form-model-item
            :ref="props.end"
            :prop="props.end"
            :class="props.end"
            auto-link
          >
            <!-- 日期范围输入框 -->
            <a-date-picker
              v-if="props.type === 'date'"
              v-model="endModelValue"
              :placeholder="placeholder[1]"
              :format="format"
              :value-format="valueFormat"
              :show-time="showEndTime"
              :allow-clear="allowClear"
              :disabled-date="disabledEndDate"
              :disabled-time="disabledEndDateTime"
            />
            <!-- 月份范围输入框 -->
            <a-month-picker
              v-else-if="props.type === 'month'"
              v-model="endModelValue"
              :placeholder="placeholder[1]"
              :format="format"
              :value-format="valueFormat"
              :allow-clear="allowClear"
              :disabled-date="disabledEndDate"
            />
            <!-- 年份范围输入框 -->
            <a-date-picker
              v-else-if="props.type === 'year'"
              v-model="endModelValue"
              :placeholder="placeholder[1]"
              :format="format"
              :value-format="valueFormat"
              :show-time="showEndTime"
              :allow-clear="allowClear"
              :disabled-date="disabledEndDate"
              mode="year"
              @panelChange="handleEndPanelChange"
            />
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model-item>

    <!-- 闭区间 -->
    <template v-else>
      <a-form-model-item
        :label="displayLabel"
        :colon="props.colon !== false"
        :ref="props.begin"
        :class="props.begin"
        :prop="props.begin"
      >
        <!-- 日期范围输入框 -->
        <a-range-picker
          v-if="props.type === 'date'"
          v-model="rangeModelValue"
          :placeholder="placeholder"
          :format="format"
          :value-format="valueFormat"
          :show-time="showTime"
          :allow-clear="allowClear"
          :separator="separator"
          @change="handleChange"
        />

        <!-- 月份/年份范围输入框 -->
        <a-range-picker
          v-else-if="['month', 'year'].includes(props.type)"
          v-model="rangeModelValue"
          :placeholder="placeholder"
          :format="format"
          :value-format="valueFormat"
          :allow-clear="allowClear"
          :separator="separator"
          :mode="[props.type, props.type]"
          @panelChange="handlePanelChange"
        />
      </a-form-model-item>
      <!-- 因区间字段是两个字段，所以需要对应两个 form-item，用于表单重置等 -->
      <a-form-model-item
        v-show="false"
        :ref="props.end"
        :prop="props.end"
      >
      </a-form-model-item>
    </template>
  </div>
</template>

<script>
import moment from 'moment';

function getOrderArray(n) {
  return Array(n).fill().map((_, i) => i);
}

export default {
  name: 'BgyItemRange',

  props: {
    // item 的配置属性
    props: {
      type: Object,
      default: () => ({}),
    },

    // a-col 的 span
    labelCol: {
      type: Object,
      default: () => ({}),
    },

    // v-model
    value: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {};
  },

  computed: {
    // 展示的 label
    displayLabel() {
      if (!this.props.label) return undefined;
      return this.props.label;
    },

    // 分隔符
    separator() {
      return this.props.separator || '~';
    },

    // 是否允许清除
    allowClear() {
      return this.props.allowClear !== false;
    },

    // 输入框提示信息
    placeholder() {
      const [beginPlaceholder, endPlaceholder] = this.props.placeholder || [];
      if (this.props.type === 'date') {
        return [
          beginPlaceholder || '开始时间',
          endPlaceholder || '结束时间'
        ];
      }
      if (this.props.type === 'month') {
        return [
          beginPlaceholder || '开始月份',
          endPlaceholder || '结束月份'
        ];
      }  
      if (this.props.type === 'year') {
        return [
          beginPlaceholder || '开始年份',
          endPlaceholder || '结束年份'
        ];
      }      
      return [];
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
      // 日期范围输入框
      if (this.props.type === 'date') {
        return this.props.valueFormat || 'YYYY-MM-DD';
      }
      // 月份范围输入框
      if (this.props.type === 'month') {
        return this.props.valueFormat || 'YYYY-MM';
      }
      // 月份范围输入框
      if (this.props.type === 'year') {
        return this.props.valueFormat || 'YYYY';
      }
      return this.props.valueFormat;
    },

    // 是否增加时间选择功能，如果为 true，则开始时间默认为：00:00:00
    showBeginTime() {
      if (this.props.showTime !== null && typeof this.props.showTime === 'object') {
        return this.props.showTime;
      }
      if (this.props.showTime === true) {
        return { defaultValue: moment('00:00:00', 'HH:mm:ss') };
      }
      return false;
    },

    // 是否增加时间选择功能，如果为 true，则结束时间默认为：23:59:59
    showEndTime() {
      if (this.props.showTime !== null && typeof this.props.showTime === 'object') {
        return this.props.showTime;
      }
      if (this.props.showTime === true) {
        return { defaultValue: moment('23:59:59', 'HH:mm:ss') };
      }
      return false;
    },

    // 是否增加时间选择功能，如果为 true，则开始时间默认为：00:00:00 结束时间默认为：23:59:59
    showTime() {
      if (this.props.showTime !== null && typeof this.props.showTime === 'object') {
        return this.props.showTime;
      }
      if (this.props.showTime === true) {
        return { defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')] };
      }
      return false;
    },

    // 起始值绑定的 v-model
    beginModelValue: {
      // 清除缓存
      cache: false,
      // 取值 getter 操作
      get() {
        const val = this.value[this.props.begin];
        return (!val || moment.isMoment(val)) ? val : moment(val, this.valueFormat);
      },
      // 赋值 setter 操作
      set(val) {
        this.value[this.props.begin] = moment.isMoment(val) ? val.format(this.valueFormat) : val;
        this.$emit('input', this.value);
        this.$forceUpdate();
      },
    },

    // 结束值绑定的 v-model
    endModelValue: {
      // 清除缓存
      cache: false,
      // 取值 getter 操作
      get() {
        const val = this.value[this.props.end];
        return (!val || moment.isMoment(val)) ? val : moment(val, this.valueFormat);
      },
      // 赋值 setter 操作
      set(val) {
        this.value[this.props.end] = moment.isMoment(val) ? val.format(this.valueFormat) : val;
        this.$emit('input', this.value);
        this.$forceUpdate();
      },
    },

    // 范围输入框绑定的 v-model
    rangeModelValue: {
      // 清除缓存
      cache: false,
      // 取值 getter 操作
      get() {
        const [beginVal, endVal] = [this.value[this.props.begin], this.value[this.props.end]];
        const beginMomentVal = beginVal ? moment(beginVal, this.valueFormat) : undefined;
        const endMomentVal = endVal ? moment(endVal, this.valueFormat) : undefined;
        return [beginMomentVal, endMomentVal].filter(e => e);
      },
      // 赋值 setter 操作
      set([beginVal, endVal]) {
        this.value[this.props.begin] = moment.isMoment(beginVal) ? beginVal.format(this.valueFormat) : beginVal;
        this.value[this.props.end] = moment.isMoment(endVal) ? endVal.format(this.valueFormat) : endVal;;
        this.$emit('input', this.value);
        // 此处调用 this.$forceUpdate 配合 cache: false，解决修改 begin 和 end 值时页面不更新问题，不更新原因是vue2对于数组是浅监听
        this.$forceUpdate();
      },
    },
  },

  methods: {
    // 开始日期限制范围
    disabledBeginDate(beginVal) {
      let endVal = this.value[this.props.end];
      if (!beginVal || !endVal) {
        return false;
      }
      endVal = moment(endVal, this.valueFormat);
      return beginVal.valueOf() > endVal.valueOf();
    },

    // 结束日期限制范围
    disabledEndDate(endVal) {
      let beginVal = this.value[this.props.begin];
      if (!beginVal || !endVal) {
        return false;
      }
      beginVal = moment(beginVal, this.valueFormat);
      return beginVal.valueOf() > endVal.valueOf();
    },

    // 开始时间限制范围
    disabledBeginDateTime(beginVal) {
      let endVal = this.value[this.props.end];
      if (beginVal && endVal) {
        endVal = moment(endVal, this.valueFormat);
        // 如果日期是同一天
        if (beginVal.isSame(endVal, 'day')) {
          const ret = {
            disabledHours: () => getOrderArray(24).splice(endVal.hour() + 1),
            disabledMinutes: () => [],
            disabledSeconds: () => [],
          }
          // 如果是同一天同一小时
          if (beginVal.isSame(endVal, 'hour')) {
            ret.disabledMinutes = () => getOrderArray(60).splice(endVal.minute() + 1);
          }
          // 如果是同一天同一小时同一分钟
          if (beginVal.isSame(endVal, 'minute')) {
            ret.disabledSeconds = () => getOrderArray(60).splice(endVal.second());
          }
          return ret;
        }
      }
      // 不受限
      return {
        disabledHours: () => [],
        disabledMinutes: () => [],
        disabledSeconds: () => [],
      };
    },

    // 结束时间限制范围
    disabledEndDateTime(endVal) {
      let beginVal = this.value[this.props.begin];
      if (beginVal && endVal) {
        beginVal = moment(beginVal, this.valueFormat);
        // 如果日期是同一天
        if (beginVal.isSame(endVal, 'day')) {
          const ret = {
            disabledHours: () => getOrderArray(24).splice(0, beginVal.hour()),
            disabledMinutes: () => [],
            disabledSeconds: () => [],
          }
          // 如果是同一天同一小时
          if (beginVal.isSame(endVal, 'hour')) {
            ret.disabledMinutes = () => getOrderArray(60).splice(0, beginVal.minute());
          }
          // 如果是同一天同一小时同一分钟
          if (beginVal.isSame(endVal, 'minute')) {
            ret.disabledSeconds = () => getOrderArray(60).splice(0, beginVal.second());
          }
          return ret;
        }
      }
      // 不受限
      return {
        disabledHours: () => [],
        disabledMinutes: () => [],
        disabledSeconds: () => [],
      };
    },

    // 范围变更时调用
    handlePanelChange(value) {
      this.rangeModelValue = value;
      this.$emit('change', value, this.props);
    },

    // 起始时间变更时调用
    handleBeginPanelChange(value) {
      this.beginModelValue = value;
      this.$emit('rangeChange', value, this.props, 'begin');
    },

    // 结束时间变更时调用
    handleEndPanelChange(value) {
      this.endModelValue = value;
      this.$emit('rangeChange', value, this.props, 'end');
    },

    // 处理 change 事件
    handleChange(value) {
      this.$emit('change', value, this.props);
    },

  },

}
</script>
