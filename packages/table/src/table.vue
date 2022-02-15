<!--
 * @Author: 秦真
 * @Date: 2021-10-28 17:48:32
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-02-15 09:51:40
 * @Description: 数据表格
 * @FilePath: \bgy-component\packages\table\src\table.vue
-->
<template>
  <div class="bgy-table" :class="{ 'bgy-table--title': title }">
    <a-table
      :data-source="dataSource"
      :loading="tableLoading"
      :pagination="page"
      :row-key="rowKey"
      :custom-row="customRow"
      :row-selection="rowSelection"
      :row-class-name="rowClassName"
      :show-header="showHeader"
      ref="table"
      size="small"
      :scroll="scroll"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <!-- 表格标题 -->
      <div v-if="title" slot="title">{{ title }}</div>

      <template
        :slot="expandedRowRenderVisible ? 'expandedRowRender' : '___'"
        slot-scope="record, index, indent, expanded">
        <slot name="expandedRowRender" :record="record" :index="index" :indent="indent" :expanded="expanded" />
      </template>

      <!-- 序号列 -->
      <a-table-column
        v-if="showOrder"
        :align="showOrder.align || 'center'"
        :customRender="(_, __, i) => i + 1"
        :title="showOrder.label || '序号'"
        :fixed="showOrder.fixed || false"
        :width="showOrder.width || '50px'"
      >
      </a-table-column>
      <!-- 业务字段列 -->
      <a-table-column
        :key="item.key"
        v-bind="item"
        v-for="item of showTableColumn"
        :align="item.amount ? 'right' : item.align"
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
  </div>
</template>

<script>
export default {
  name: 'BgyTable',

  props: {
    // 请求接口地址获取数据，优先级高于 tableData
    requestUrl: String,
    // 请求接口地址方法
    ajaxMethod: String,

    // 数据表列
    tableColumn: {
      type: Array,
      default: () => [],
    },

    // 表数据，如果提供了 requestUrl，则此属性无效
    tableData: {
      type: Array,
      default: () => [],
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
    },

    // 分页器，如果为 false 则表示不分页，每页展示数则为 9999
    pagination: {
      type: [Boolean, Object],
      default: () => ({}),
    },

    // 数据行主键
    rowKey: {
      type: [String, Function],
      default: 'id',
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

    // 表格标题
    title: String,

    // params 参数变更时，是否自动重新发起请求 
    deepParams: {
      type: Boolean,
      default: true,
    }
  },

  data() {
    return {
      // 表格加载状态
      tableLoading: false,
      // 表格数据
      dataSource: [],
      // ant-design 表格分页对象
      pager: {
        current: 1,   // 当前页
        pages: 0,     // 总页数
        pageSize: 10, // 每页展示数量
        total: 0,     // 总记录数
      },
    };
  },

  computed: {
    /**
     * 是否展示 expandedRowRender
     */
    expandedRowRenderVisible() {
      return Boolean(this.$slots.expandedRowRender || this.$scopedSlots.expandedRowRender);
    },
    page() {
      // 如果不分页
      if (this.pagination === false) {
        return false;
      }

      return Object.assign({}, this.pager, {
        size: 'middle',
        pageSizeOptions: ['10', '20', '30', '40'],
        showTotal: total => `共 ${total} 条`,
        showSizeChanger: true,
        showQuickJumper: true,
        onChange: this.handlePageChange,
        onShowSizeChange: this.handlePageChange,
      }, this.pagination);
    },

    // 每页展示数量
    pageSize() {
      return this.pagination === false ? 9999 : this.pager.pageSize;
    },

    // 表格列的 scopedSlots 自定义列插槽
    tableColumnSlots() {
      return this.tableColumn
        .filter(({ scopedSlots }) => scopedSlots && scopedSlots.customRender)
        .map(({ scopedSlots }) => scopedSlots.customRender);
    },

    // 所有展示的表格字段
    showTableColumn() {
      return this.tableColumn.filter(e => e.show !== false);
    },
  },

  watch: {
    tableData: {
      immediate: true,
      handler(val) {
        if (!this.requestUrl) {
          this.dataSource = val;
        }
      },
    },
    params: {
      deep: true,
      handler() {
        if (this.deepParams) {
          this.getTableData();
        }
      },
    },
  },

  created() {
    this.getTableData();
  },

  methods: {

    // 页码切换
    handlePageChange(current, pageSize) {
      Object.assign(this.pager, {
        current,
        pageSize,
      });
      this.getTableData();
    },

    // 查询数据
    getTableData() {
      if (!this.requestUrl) {
        this.dataSource = this.tableData;
        return;
      }

      this.tableLoading = true;
      // this.dataSource = [];

      const { current } = this.pager;
      const requestParams = {
        current,
        size: this.pageSize,
        query: {
          ...this.params,
        },
      };

      this.$http[this.ajaxMethod || 'post'](this.requestUrl, requestParams)
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
          this.dataSource = records;
          this.$emit('data-change', this.dataSource, requestParams);
        })
        .finally(() => {
          this.tableLoading = false;
        });
    }
  },
};
</script>
