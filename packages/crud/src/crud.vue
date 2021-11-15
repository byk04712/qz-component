<!--
 * @Author: Do not edit
 * @Date: 2021-09-09 11:07:25
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-11-15 14:16:55
 * @Description: CRUD 组件
 * @FilePath: \admin-fronted\bgy-component\packages\crud\src\crud.vue
-->
<template>
  <div class="bgy-crud">
    <!-- 表单搜索区域 -->
    <a-card
      v-if="showSearchFormItem.length"
      :bordered="false"
      size="small"
      title=""
      class="bgy-crud-search"
    >
      <!-- 搜索表单 -->
      <a-form-model
        ref="searchRuleForm"
        :label-col="labelCol"
        :label-align="labelAlign"
        :model="searchFormData"
        :rules="searchFormRules"
        @submit="handleSearch"
        layout="horizontal"
      >
        <template v-for="(item, i) in showSearchFormItem">
          <!-- 自定义搜索字段 -->
          <template v-if="item.type === 'slot'">
            <a-form-model-item
              :key="item.key"
              :label-col="item.labelCol || labelCol"
              :label-align="item.labelAlign || labelAlign"
              :colon="item.colon !== false"
              :prop="item.key"
              :class="item.key"
              :ref="item.key"
              :style="getColStyle(item, i)"
            >
              <!-- 是否提供了 [item.key]-label 插槽 -->
              <template v-if="$slots[`${item.key}-label`] || $scopedSlots[`${item.key}-label`]" #label>
                <slot
                  :name="`${item.key}-label`"
                  :form="searchFormData"
                  :item="item"
                  :index="i"
                ></slot>
              </template>
              <!-- 是否提供了 label 属性 -->
              <template v-else-if="item.label" #label>{{ item.label }}</template>
              <!-- 内容 -->
              <slot
                v-if="$slots[item.key] || $scopedSlots[item.key]"
                :name="item.key"
                :form="searchFormData"
                :item="item"
                :index="i"
              ></slot>
            </a-form-model-item>
          </template>

          <!-- 区间输入框字段 -->
          <bgy-item-range
            v-else-if="item.range"
            :key="item.begin"
            :style="getColStyle(item, i)"
            :props="item"
            v-model="searchFormData"
          >
          </bgy-item-range>

          <!-- 非区间输入框字段 -->
          <a-form-model-item
            v-else
            :key="item.key"
            :label="item.label"
            :label-col="item.labelCol || labelCol"
            :label-align="item.labelAlign || labelAlign"
            :colon="item.colon !== false"
            :prop="item.key"
            :class="item.key"
            :ref="item.key"
            :style="getColStyle(item, i)"
          >
            <bgy-item
              :props="item"
              :label-col="labelCol || labelCol"
              v-model="searchFormData[item.key]"
            >
            </bgy-item>
          </a-form-model-item>
        </template>

        <a-form-model-item class="bgy-crud-search--action" :style="`width:${widthPercent}%;`">
          <a-space>
            <a-button html-type="submit" type="primary">搜索</a-button>
            <a-button @click="handleReset">重置</a-button>
            <a-button type="link" @click="toggleExpaned" v-if="searchMoreVisible">
              {{ expanded ? '收起' : '展开' }}
              <a-icon :type="expanded ? 'up' : 'down'" />
            </a-button>
          </a-space>
        </a-form-model-item>
      </a-form-model>
    </a-card>

    <!-- 表格数据区域 -->
    <a-card
      :bordered="false"
      size="small"
      title=""
      class="bgy-crud-view"
    >
      <!-- 操作栏目 -->
      <a-space v-if="actionVisible" align="center" class="bgy-crud-action">
        <!-- 操作栏左边 -->
        <div class="bgy-crud-action--left">
          <slot name="actionLeft"></slot>
        </div>
        <!-- 操作栏右边 -->
        <a-space class="bgy-crud-action--right">
          <throttle
            v-for="(item, i) of actionButtonList"
            :key="i"
          >
            <a-button
              v-bind="item"
              @click.native="handleActionClick(item)"
            >
              {{ item.label }}
            </a-button>
          </throttle>
        </a-space>
      </a-space>
      <!-- 数据展示 -->
      <a-table
        :data-source="tableData"
        :loading="tableLoading"
        :pagination="pagination"
        :row-key="rowKey"
        :custom-row="customRow"
        :row-selection="rowSelection"
        :row-class-name="rowClassName"
        :show-header="showHeader"
        ref="table"
        size="small"
        :scroll="scroll"
      >
        <!-- 序号列 -->
        <a-table-column
          v-if="showOrder"
          :align="showOrder.align || 'center'"
          :customRender="(_, __, i) => i + 1"
          :title="showOrder.label || '序号'"
          :fixed="showOrder.fixed || 'left'"
          :width="showOrder.width || '50px'"
        >
        </a-table-column>
        <!-- 业务字段列 -->
        <a-table-column
          :key="item.key"
          v-bind="item"
          v-for="item of showTableColumn"
        >
          <template slot-scope="text, record, index, column">
            <!-- 如果有自定义列 -->
            <template v-if="item.scopedSlots && item.scopedSlots.customRender">
              <template v-for="slotName of tableColumnSlots">
                <template v-if="item.scopedSlots.customRender === slotName">
                  <slot
                    :column="column"
                    :index="index"
                    :name="slotName"
                    :record="record"
                    :text="text"
                  ></slot>
                </template>
              </template>
            </template>
            <!-- 如果amount 为 true，则进行金额格式化，如果为数字，则数字用于被除数(表示金额单位，例如100表示以分为单位，默认单位是元) -->
            <template v-else-if="item.amount && text != null">
              {{ (typeof item.amount === 'number' ? ((text || 0) / item.amount) : text) | amount }}
            </template>
            <a-tooltip v-else-if="item.ellipsis" placement="topLeft" :title="text">
              {{ text }}
            </a-tooltip>
            <template v-else>
              {{ text }}
            </template>
          </template>
        </a-table-column>
      </a-table>
    </a-card>

    <!-- 导入弹窗 -->
    <modal-import
      v-if="importModalVisible"
      :visible.sync="importModalVisible"
      :config="importConfig"
      @import-success="handleImportSuccess"
    >
    </modal-import>
  </div>
</template>

<script>
import { debounce } from 'throttle-debounce';
import Throttle from '@/packages/throttle';
import BgyItem from '@/packages/item/index';
import BgyItemRange from '@/packages/item-range';
import download from '@/src/util/download';
import SelectionMixin from '@/src/mixins/selection';
import FormMixin from '@/src/mixins/form';
import ModalImport from './modalImport.vue';

const [
  ACTION_ADD,
  ACTION_DELETE,
  ACTION_IMPORT,
  ACTION_EXPORT,
] = [
  Symbol('add'),
  Symbol('delete'),
  Symbol('import'),
  Symbol('export'),
];
const ACTIONS = [
  ACTION_ADD,
  ACTION_DELETE,
  ACTION_IMPORT,
  ACTION_EXPORT,
];
const actionButtonMap = new Map([
  [ACTION_ADD, {
    key: ACTION_ADD,
    label: '新增',
    type: 'primary',
    ghost: true,
    // icon: 'plus',
  }],
  [ACTION_DELETE, {
    key: ACTION_DELETE,
    label: '批量删除',
    type: 'primary',
    ghost: true,
    // icon: 'delete',
  }],
  [ACTION_IMPORT, {
    key: ACTION_IMPORT,
    label: '批量导入',
    type: 'primary',
    ghost: true,
    // icon: 'upload',
  }],
  [ACTION_EXPORT, {
    key: ACTION_EXPORT,
    label: '导出',
    type: 'primary',
    ghost: true,
    // icon: 'download',
  }],
]);
const actionButtonKeys = [...actionButtonMap.keys()].map(e => e.description);

export default {
  name: 'BgyCrud',

  mixins: [SelectionMixin, FormMixin],

  components: {
    Throttle,
    ModalImport,
    BgyItem,
    BgyItemRange,
  },

  props: {
    // 查询表单项字段
    searchItem: {
      type: Array,
      default: () => [],
    },

    // 每行展示搜索字段数量
    rowSize: {
      type: Number,
      default: 3,
      validator(value) {
        return [1, 2, 3, 4].includes(value);
      },
    },

    // 默认展示2行，超出自动折叠
    defaultRows: {
      type: Number,
      default: 2,
    },

    // 数据栏操作按钮
    actionList: {
      type: Array,
      default: () => [],
      validator(value) {
        return value.every(e => {
          // 如果元素是字符串，则判断字符串是否在内置的操作中
          if (typeof e === 'string') {
            return actionButtonKeys.includes(e);
          }
          // 否则元素必须为对象，且不能为空对象
          return Object.prototype.toString.call({}).slice(8, -1) === 'Object' && Object.keys(e).length;
        });
      },
    },

    // 数据表列
    tableColumn: {
      type: Array,
      default: () => [],
      required: true,
    },

    // 是否自动查询
    autoSearch: {
      type: Boolean,
      default: true,
    },

    // 数据行主键
    rowKey: {
      type: [String, Function],
      default: 'id',
    },

    // 请求接口地址
    requestUrl: {
      type: String,
      required: true,
    },

    // 请求时的参数
    params: {
      type: Object,
      default: () => ({}),
    },

    // 是否显示表头
    showHeader: {
      type: Boolean,
      default: true,
    },

    // 数据表格是否展示序号列
    showOrder: {
      type: [Boolean, Object],
      default: false,
      validator(value) {
        // 如果是 Boolean 类型，则通过
        if (typeof value === 'boolean') {
          return true;
        }
        const keys = Object.keys(value);
        // 类型为 Object 必须包含以下属性
        // label 自定义展示名字，默认为 '序号'
        return keys.length && ['label'].every(prop => keys.includes(prop));
      },
    },

    // 批量导入配置
    importConfig: {
      type: Object,
      default: () => ({}),
    },

    // 导出配置
    exportConfig: {
      type: Object,
      validator(val) {
        // 如果 exportConfig 不为空时 url 属性必须存在
        if (val) {
          return 'url' in val;
        }
        return true;
      },
    },

    // 搜索重置按钮点击后调用查询
    resetOnSearch: {
      type: Boolean,
      default: true,
    },

    // 搜素表单 label 标签的文本对齐方式
    labelAlign: {
      type: String,
      default: 'right',
      validator(val) {
        return ['left', 'right'].includes(val);
      },
    },

    // 设置行属性
    customRow: Function,

    // 选择功能的配置
    rowSelection: Object,

    // 设置表格行的类名
    rowClassName: Function,

    // a-table 的 scroll 属性
    scroll: {
      type: Object,
      default: () => ({
        x: '100%',
        y: '100%',
      }),
    },
  },

  data() {
    return {
      // 查询表单数据
      searchFormData: {},

      // 查询表单校验规则
      searchFormRules: {},

      // 表格展示数据
      tableData: [],

      // 表格加载状态
      tableLoading: false,

      // ant-design 表格分页对象
      pager: {
        current: 1,   // 当前页
        pages: 0,     // 总页数
        pageSize: 10, // 每页展示数量
        total: 0,     // 总记录数
      },

      // 搜索是否展开
      expanded: false,

      // 批量导入弹窗
      importModalVisible: false,
    };
  },

  computed: {
    /**
     * 查询字段占比百分比
     */
    widthPercent() {
      return (100 / this.rowSize).toFixed(2);
    },

    /**
     * 动态设置 a-col 的样式
     */
    getColStyle() {
      return (item, i) => {
        const wPercent = this.widthPercent * (item.grow || 1);
        return {
          flex: `0 0 ${wPercent}%`,
          maxWidth: `${wPercent}%`,
          // 1. 展开状态为否
          // 2. 字段超出折叠数量
          // 3. 当前字段在超出的范围中
          height: !this.expanded && this.searchMoreVisible && i > this.expendedSize - 1 ? '0' : '54px',
        };
      };
    },

    /**
     * a-form-model 的 label-col 属性
     */
    labelCol() {
      return { md: 0, lg: 10, xl: 8, xxl: 6 };
    },

    /**
     * 所有展示的搜索条件字段
     */
    showSearchFormItem() {
      return this.searchItem.filter(e => e.show !== false);
    },

    /**
     * 所有展示的表格字段
     */
    showTableColumn() {
      return this.tableColumn.filter(e => e.show !== false);
    },

    /**
     * 是否展示更多搜索字段
     */
    searchMoreVisible() {
      return this.showSearchFormItem.length > this.expendedSize;
    },

    /**
     * 展开的字段个数
     */
    expendedSize() {
      let size = this.rowSize * this.defaultRows;
      let growTotal = 0;
      this.searchItem
        .some((e, index) => {
          growTotal += e.grow;
          if (growTotal > size) {
            size = index;
            return true;
          }
          return false;
        });
      return size;
    },

    /**
     * 传给 pagination 的分页对象
     */
    pagination() {
      return {
        ...this.pager,
        size: 'middle',
        pageSizeOptions: ['10', '20', '30', '40'],
        // showTotal: total => `第${pageRange}条，共 ${total} 条`,
        showTotal: total => `共 ${total} 条`,
        showSizeChanger: true,
        showQuickJumper: true,
        onChange: this.handlePageChange,
        onShowSizeChange: this.handlePageChange,
      };
    },

    /**
     * 表格列的 scopedSlots 自定义列插槽
     */
    tableColumnSlots() {
      return this.tableColumn
        .filter(({ scopedSlots }) => scopedSlots && scopedSlots.customRender)
        .map(({ scopedSlots }) => scopedSlots.customRender);
    },

    /**
     * 表格上方的操作栏是否展示
     */
    actionVisible() {
      return this.$slots.actionLeft
        || this.$scopedSlots.actionLeft
        || !!this.actionList.filter(e => e.show !== false).length;
    },


    /**
     * 表格上方的操作按钮
     */
    actionButtonList() {
      return this.actionList
        .filter(e => e.show !== false) // 过滤掉设置为 false 的操作按钮
        .map(button => {
          // 如果是内置的按钮
          if (typeof button === 'string') {
            const idx = actionButtonKeys.indexOf(button);
            button = actionButtonMap.get(ACTIONS[idx]);
          } else {
            button.key = button.key || String(Math.round(Math.random() * 10000000));
          }
          return button;
        });
    },
  },

  watch: {
    /**
     * 监听URL变化
     */
    requestUrl() {
      if (this.autoSearch) {
        this.getTableData();
      }
    },

    /**
     * 深度监听 params 变化
     */
    params: {
      deep: true,
      handler() {
        this.getTableData();
      },
    },
    
  },

  created() {
    this.initFormItem(this.searchItem);
    this.initFormData(this.searchItem, this.searchFormData);
    this.initSelectOptions();
    // 初始化校验规则
    this.searchFormRules = this.initRules(this.searchItem);
  },

  mounted() {
    this.debounceGetTableHeight = debounce(300, () => {
      this.dynamicSetTableHeight();
    });

    /**
     * 监听 table 宽高改变 重新布局
     * 包括 display: none 引起的布局变化
     */
    window.addEventListener('resize', this.debounceGetTableHeight);

    // 初始化调用设置 table 布局
    this.debounceGetTableHeight();

    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('resize', this.debounceGetTableHeight);
    });
  },

  methods: {
    /**
     * 动态设置表格高度
     */
    dynamicSetTableHeight() {
      // const tableEl = this.$refs.table.$el;

      // const searchHeight = this.$el.querySelector('.bgy-crud-search')?.clientHeight || 0;
      // const actionHeight = this.$el.querySelector('.bgy-crud-action')?.clientHeight || 0;
      // const tableHeaderHeight = tableEl.querySelector('.ant-table-thead')?.clientHeight || 0;
      // const paginationHeight = tableEl.querySelector('.ant-table-pagination')?.clientHeight || 0;

      // if (tableEl) {
      //   const height = this.$el.clientHeight - searchHeight - actionHeight - tableHeaderHeight - paginationHeight;
// console.log(`计算后的高=${height}
// 浏览器窗口可见高度=${document.body.clientHeight}
// crud高=${this.$el.clientHeight}
// 搜索栏高度=${searchHeight}
// 操作栏高度=${actionHeight}
// 表格头高度=${tableHeaderHeight}
// 分页栏高度=${paginationHeight}
// `);

        // 高度自适应问题待完善
        // tableEl.querySelector('.ant-table').style.height = `${height}px`;
        // this.scroll.y = height - paginationHeight;

        // 解决浮动列高度与内容高度错位问题
        // const fixedHeader = Array.from(document.querySelectorAll('.bgy-crud-view .ant-table .ant-table-fixed-left .ant-table-thead, .bgy-crud-view .ant-table .ant-table-fixed-right .ant-table-thead'));
        // const headerHeight = document.querySelector('.bgy-crud-view .ant-table .ant-table-thead').clientHeight;
        // fixedHeader.forEach(item => {
        //   item.style.height = `${headerHeight}px`;
        // });
      // }
    },

    /**
     * 初始化下拉框选项
     */
    initSelectOptions() {
      this.searchItem
        .filter(({ ajax }) => ajax) // 获取所有带 ajax 的选项
        .forEach(item => {
          this.getOptions(item); // ajax 请求获取下拉框选项值
        });

      Promise.all(
        this.searchItem
          .filter(({ fastCode }) => fastCode) // 获取所有带 fastCode 的选项
          .map(item => this.getOptions(item)) // 请求通用获取下拉框选项值
      )
        .finally(() => {
          if (this.autoSearch) {
            this.getTableData();
          }
        });
    },

    /**
     * 实际搜索的值
     */
    realSearchFormData() {
      //删除key影响this.searchFormData 使用深拷贝
      const searchFormData = JSON.parse(JSON.stringify(this.searchFormData))
      return this.searchItem.reduce((acc, item) => {
        // 多选时
        if (['select', 'radio', 'checkbox'].includes(item.type) && item.mode === 'multiple') {
          if (Array.isArray(this.searchFormData[item.key]) && this.searchFormData[item.key].length) {
            acc[item.key] = this.searchFormData[item.key];
          }
        } else if (![undefined, null].includes(this.searchFormData[item.key])) { // 值不为 undefined， null
          // 省市选择框时
          if (item.type === 'area') {
            // value为数组类型，key带'^'字符
            if(item.key.indexOf('^') !== -1) {
              const values = this.searchFormData[item.key]; // 给定的默认值为数组时
              if (Array.isArray(values) && values.length) {
                item.key.split('^').forEach((key, idx) => {
                  if(values[idx]){
                    acc[key] = values[idx];
                  }
                });
              }
            } 
          } else {
            acc[item.key] = this.searchFormData[item.key];
            // 如果值为 '' 时，则从 searchFormData 中 delete 掉
            const value = this.searchFormData[item.key];
            if (value === '') {
              delete acc[item.key];
            }
          }
        }
        // 请求接口前对数据进行解析
        if (typeof item.valueParse === 'function') {
          acc[item.key] = item.valueParse(acc[item.key], item, acc);
        }
        return acc;
      }, searchFormData);
    },

    /**
     * 获取表格数据
     */
    getTableData() {
      this.tableLoading = true;
      // this.tableData = [];

      const { current, pageSize: size } = this.pager;
      const requestParams = {
        current,
        size,
        query: {
          ...this.realSearchFormData(),
          ...this.params,
        },
      };

      this.$http
        .post(this.requestUrl, requestParams)
        .then(res => {
          const {
            records = [],
            current,
            size: pageSize,
            total,
          } = res.data?.obj || {};
          Object.assign(this.pager, {
            current,
            pageSize,
            total,
          });
          this.tableData = records;
          this.$emit('data-change', this.tableData, requestParams);
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },

    /**
     * 页码变换
     */
    handlePageChange(current, pageSize) {
      Object.assign(this.pager, {
        current,
        pageSize,
      });
      this.getTableData();
    },

    /**
     * 搜索
     */
    handleSearch(e) {
      e.preventDefault();
      this.pager.current = 1;
      this.$refs.searchRuleForm.validate((valid) => {
        if (valid) {
          this.getTableData();
        }
      });
    },

    /**
     * 搜索栏重置
     */
    handleReset() {
      this.searchFormData = this.initFormData(this.searchItem);
      this.$emit('reset-search', this.searchFormData);
      // 重置后立马调用查询
      if (this.resetOnSearch) {
        this.getTableData();
      }
    },

    /**
     * 搜索栏展示/收起
     */
    toggleExpaned() {
      this.expanded = !this.expanded;
    },

    /**
     * 表格操作栏，按钮点击事件
     */
    handleActionClick(button) {
      // 内置的按钮，内部处理
      if (actionButtonMap.has(button.key)) {
        switch (button.key) {
          case ACTION_ADD:
            console.log('内置处理新增');
            break;
          case ACTION_IMPORT:
            this.importModalVisible = !this.importModalVisible;
            break;
          case ACTION_DELETE:
            console.log('内置处理删除');
            break;
          case ACTION_EXPORT:
            this.handleExport();
            break;
        }
      }
      this.$emit('action-click', button);
    },

    /**
     * 导出功能
     */
    handleExport() {
      const {
        url, // 导出的接口
        withSearchParams = true, // 导出时 是否带上查询条件
        withPagination = false, // 导出时 是否带上查询条件
        filename = `${Date.now()}.xlsx`,
      } = this.exportConfig || {};

      const config = {
        url,
        filename
      };

      // 带上分页
      if (withPagination) {
        const { current, pageSize: size } = this.pager;
        config.params = {
          current,
          size,
        }
      }

      // 带上查询条件
      if (withSearchParams) {
        config.params = {
          ...this.realSearchFormData(),
          ...this.params,
        };
      }
      download(config)
        .then((res) => {
          this.$temit('export-success', res);
        });
    },

    /**
     * 文件导入成功触发
     */
    handleImportSuccess(res) {
      this.$emit('import-success', res);
      this.getTableData();
    },
  },
};
</script>
