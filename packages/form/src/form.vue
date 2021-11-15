<!--
 * @Author: 秦真
 * @Date: 2021-10-28 14:53:57
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-11-15 13:04:39
 * @Description: 表单
 * @FilePath: \admin-fronted\bgy-component\packages\form\src\form.vue
-->
<template>
  <div class="bgy-form">
    <a-form-model
      ref="ruleForm"
      :model="formData"
      :label-align="labelAlign"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      :rules="currentRules"
      layout="horizontal"
    >
      <a-row type="flex" align="middle">
        <a-col
          v-for="(item, i) of showFormItem"
          :key="item.key"
          :span="span"
        >
          <!-- 自定义字段 -->
          <template v-if="item.type === 'slot'">

            <!-- 如果提供了 label -->
            <a-form-model-item
              v-if="item.label"
              :ref="item.key"
              :label="item.label"
              :prop="item.key"
              auto-link
              :colon="item.colon !== false"
            >
              <slot
                v-if="$slots[item.key] || $scopedSlots[item.key]"
                :name="item.key"
                :form="formData"
                :item="item"
                :index="i"
              ></slot>
            </a-form-model-item>
            <template v-else>
              <slot
                v-if="$slots[item.key] || $scopedSlots[item.key]"
                :name="item.key"
                :form="formData"
                :item="item"
                :index="i"
              ></slot>
            </template>
          </template>

          <!-- 区间输入框字段 -->
          <bgy-item-range
            v-else-if="item.range"
            :props="item"
            v-model="formData"
            @rangeChange="handleRangeChange"
          >
          </bgy-item-range>

          <!-- 非区间输入框字段 -->
          <a-form-model-item
            v-else
            :ref="item.key"
            :label="item.label"
            :prop="item.key"
            auto-link
            :colon="item.colon !== false"
          >
            <bgy-item
              :props="item"
              :label-col="labelCol"
              v-model="formData[item.key]"
            >
            </bgy-item>
          </a-form-model-item>
        </a-col>

        <!-- 提交表单栏 -->
        <a-col
          v-if="buttonVisible"
          :span="24 - footerOffset"
          :offset="footerOffset"
          :style="`text-align:${rowSize > 1 ? 'right' : 'left'};`"
        >
          <a-space>
            <slot
              name="button"
              :form="formData"
            ></slot>
            <a-button
              v-if="submitable"
              type="primary"
              :loading="isSubmiting"
              @click="debounceSubmit">{{ submitText }}</a-button>
            <a-button
              v-if="resetable"
              @click="handleReset">{{ resetText }}</a-button>
          </a-space>
        </a-col>
      </a-row>
    </a-form-model>
  </div>
</template>

<script>
import { debounce } from 'throttle-debounce';
import BgyItem from '@/packages/item';
import BgyItemRange from '@/packages/item-range';
import SelectionMixin from '@/src/mixins/selection';
import FormMixin from '@/src/mixins/form';

export default {
  name: 'BgyForm',

  mixins: [SelectionMixin, FormMixin],

  components: {
    BgyItem,
    BgyItemRange,
  },

  props: {
    // a-form-model 的 labelCol 属性
    labelCol: {
      type: Object,
      default: () => ({
        span: 6,
      }),
    },
    // a-form-model 的 wrapperCol 属性
    wrapperCol: {
      type: Object,
      default: () => ({
        span: 18,
      }),
    },
    // 表单字段
    formItem: {
      type: Array,
      require: true,
      default: () => [],
    },
    // v-model
    value: {
      type: Object,
      default: () => ({}),
    },
    // 表单是否禁用
    disabled: Boolean,
    // 每行展示字段数量
    rowSize: {
      type: Number,
      default: 1,
      validator(value) {
        return [1, 2, 3, 4].includes(value);
      },
    },
    // label 标签的文本对齐方式
    labelAlign: {
      type: String,
      default: 'right',
      validator(val) {
        return ['left', 'right'].includes(val);
      },
    },
    // 是否展示提交按钮
    submitable: {
      type: Boolean,
      default: true,
    },
    // 是否展示重置按钮
    resetable: {
      type: Boolean,
      default: true,
    },
    // 提交按钮文字
    submitText: {
      type: String,
      default: '提交',
    },
    // 重置按钮文字
    resetText: {
      type: String,
      default: '重置',
    },
    // 表单提交校验之前的自定义校验函数
    beforeSubmitValidate: Function,
    // 表单提交校验之后的自定义校验函数
    afterSubmitValidate: Function,
  },

  data() {
    return {
      // 表单数据
      formData: this.value,
      // 表单校验规则
      currentRules: {},
      // 是否提交中
      isSubmiting: false,
    };
  },

  computed: {
    // a-col span属性
    span() {
      return 24 / this.rowSize;
    },

    // 提交栏的 a-col offset 属性
    footerOffset() {
      return this.rowSize > 1 ? 0 : this.labelCol.span;
    },

    // 按钮操作栏是否展示
    buttonVisible() {
      return !!(this.$slots.button || this.$scopedSlots.button || this.submitable || this.resetable);
    },

    // show 为 false 则不展示
    showFormItem() {
      return this.formItem.filter(e => e.show !== false);
    },
  },

  watch: {
    formData: {
      deep: true,
      handler(val) {
        this.$emit('change', val);
        this.$emit('input', val);
      },
    },
    value: {
      deep: true,
      handler(val) {
        this.formData = val;
      },
    },
  },

  created() {
    this.initForm();
    this.debounceSubmit = debounce(300, () => {
      this.handleSubmit();
    });
  },

  methods: {
    // 初始化表单字段
    initForm() {
      try {
        // 初始化计算属性
        this.initComputed();
      } catch (e) {
        console.error('初始化计算属性出现异常', e);
      }

      // 初始化表单字段
      this.initFormItem(this.formItem);

      // 初始化表单数据
      const formData = this.initFormData(this.formItem);
      this.formData = {
        ...formData,
        ...this.formData,
      };

      // 初始化下拉框数据
      this.initSelectOptions();

      // 初始化校验规则
      if (!this.disabled) {
        this.currentRules = this.initRules(this.formItem);
      }
    },

    // 初始化字段的 computed 计算属性，字段可配置简单的计算表达式 '${form.a} * ${form.b}'
    initComputed() {
      this.formItem.forEach((source, _) => {
        // 如果有（目前用不到，待完善）
        if (source.computed) {
        }
      });
    },

    // 初始化下拉框选项
    initSelectOptions() {
      this.formItem
        .filter(({ ajax }) => ajax) // 获取所有带 ajax 的选项
        .forEach(item => {
          this.getOptions(item); // ajax 请求获取下拉框选项值
        });

      Promise.all(
        this.formItem
          .filter(({ fastCode }) => fastCode) // 获取所有带 fastCode 的选项
          .map(item => this.getOptions(item)) // 请求通用获取下拉框选项值
      )
        .finally(() => {
        });
    },

    // 提交按钮事件
    async handleSubmit() {
      // 如果提供了自定义校验函数，则提交前执行自定义校验函数
      if (typeof this.beforeSubmitValidate === 'function') {
        const beforeValidate = await this.beforeSubmitValidate(this.formData);
        // 如果返回为 false，则禁止提交
        if (!beforeValidate) {
          return;
        }
      }

      this.$refs.ruleForm.validate(async (valid, faildFields) => {
        // 表单校验通过
        if (valid) {
          // 如果提供了自定义校验函数，则提交验证通过后执行自定义校验函数
          if (typeof this.afterSubmitValidate === 'function') {
            const afterValidate = await this.afterSubmitValidate(this.formData);
            // 如果返回为 false，则禁止提交
            if (!afterValidate) {
              return;
            }
          }

          // 进行表单提交
          this.isSubmiting = true;
          // 往外抛 submit 事件
          this.$emit('submit', this.formData, this.stopLoading);
        } else {
          // 校验失败，往外抛事件
          this.$emit('validateError', faildFields);
        }
      });      
    },

    stopLoading() {
      this.isSubmiting = false;
    },

    // 重置按钮事件
    handleReset() {
      this.$refs.ruleForm.resetFields();
    },

    // 区间输入框 change 事件
    handleRangeChange(value, field, propertyKey) {
      this.$refs.ruleForm.validateField(field[propertyKey], callback => {
        if (value) {
          callback();
        }
      });
    },

  },
};
</script>
