<!--
 * @Author: 秦真
 * @Date: 2022-01-26 17:02:22
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-02-16 10:29:19
 * @Description: 
 * @FilePath: \qz-component\examples\src\pages\CrudTest.vue
-->
<template>
  <div>
    <qz-crud v-bind="crudConfig"></qz-crud>
  </div>
</template>

<script>
export default {
  name: 'CrudTest',
  data() {
    const crudConfig = {
      // 分页接口
      requestUrl: 'basic/basic/contract/pageList',
      // 搜索字段
      searchItem: [
        {
          label: '颜色',
          type: 'text'
        },
      ],
      // 数据列
      tableColumn: [
        {
          dataIndex: 'color',
          title: '颜色',
          width: 120
        },
        {
          dataIndex: 'title',
          title: '标题',
          width: 120
        },
        {
          dataIndex: 'name',
          title: '姓名',
          width: 120
        },
        {
          dataIndex: 'age',
          title: '年龄',
          width: 120
        },
        {
          dataIndex: 'email',
          title: '邮箱地址',
          width: 120
        },
        {
          dataIndex: 'area',
          title: '区域',
          width: 120
        },
        {
          dataIndex: 'time',
          title: '时间',
          width: 120
        },
        {
          dataIndex: 'date1',
          title: '日期1',
          width: 120
        },
        {
          dataIndex: 'date2',
          title: '日期2',
          width: 120
        },
        {
          dataIndex: 'date',
          title: '日期',
          width: 120
        },
        {
          dataIndex: 'dateTime',
          title: '日期时间',
          width: 120
        },
        {
          dataIndex: 'now',
          title: '当前时间',
          width: 120
        },
        {
          dataIndex: 'url',
          title: 'URL',
          width: 120
        },
        {
          dataIndex: 'slogo',
          title: '标语',
          width: 120
        },
        {
          dataIndex: 'intro',
          title: '简介',
          width: 120,
          ellipsis: true,
        },
        {
          dataIndex: 'city',
          title: '城市',
          width: 120
        },
        {
          dataIndex: 'district',
          title: '区域',
          width: 120
        },
        {
          dataIndex: 'province',
          title: '省份',
          width: 120
        },
        {
          dataIndex: 'country',
          title: '国家',
          width: 120
        },
        {
          dataIndex: 'job',
          title: '职业',
          width: 120
        },
        {
          dataIndex: 'salary',
          title: '薪资',
          width: 120
        },
        {
          dataIndex: 'phone',
          title: '手机号',
          width: 120
        },
        {
          dataIndex: 'gender',
          title: '性别',
          width: 120
        }
      ]
    }
    return {
      crudConfig
    }
  }
}
</script>
