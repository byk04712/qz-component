# 表格组件

表格组件和 Crud 组件类似，没有 searchItem 配置, 表格可以传入 tableData 属性，表示数据由使用者提供，不通过接口获取


### 代码演示
#### 示例1
::: demo 接口为在线 [fastmock](https://www.fastmock.site/) 数据，每次都将生成不同Mock数据
```vue
<template>
  <bgy-table v-bind="tableConfig"></bgy-table>
</template>
<script>
export default {
  data() {
    return {
      tableConfig: {
        // 分页接口
        requestUrl: 'https://www.fastmock.site/mock/eb7f9e535c90fdde70880b7e088fca31/api/employee/pagination',
        // 是否显示序号，默认 false
        showOrder: true,
        // 数据列
        tableColumn: [
          {
            dataIndex: 'color',
            title: '颜色',
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
            width: 200
          },
          {
            dataIndex: 'slogo',
            title: '座右铭',
            width: 200,
            ellipsis: true
          },
          {
            dataIndex: 'date',
            title: '日期',
            width: 180
          },
        ]
      }
    }
  }
}
</script>
```
:::


#### 示例2
::: demo
```vue
<template>
  <bgy-table v-bind="tableConfig"></bgy-table>
</template>
<script>
export default {
  data() {
    return {
      tableConfig: {
        pagination: false, // 不进行分页
        // 数据列
        tableColumn: [
          {
            dataIndex: 'color',
            title: '颜色',
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
            width: 200
          },
          {
            dataIndex: 'slogo',
            title: '座右铭',
            width: 200,
            ellipsis: true
          },
          {
            dataIndex: 'date',
            title: '日期',
            width: 180
          },
        ],
        tableData: [
          {
            "id": 1,
            "color": "#d5f279",
            "title": "Kqjv Xdqr Dghthmffdd Svtosog",
            "name": "顾艳",
            "age": 92,
            "email": "b.mvpifyvh@svme.py",
            "address": "华东",
            "date": "1995-11-29 01:07:35",
            "slogo": "县界力军实好至示没容证克快间行反局等",
            "intro": "组做身然点进周院或增长入相命农向和口意对全革音车般团到个局快家交来层存根用而山候见音之建江活专族全公集在几必拉交并深究样业其业斗图高目十第没今看车团技张来西展领据调维八线采论难二设么当并七分层我制西老验发才所对治于许直电价队器办中术构火率他规再还参。"
          },
          {
            "id": 2,
            "color": "#eb79f2",
            "title": "Lapdmqqw Dmzp Aiombyte Tetkeh Esdlogrx Ofzxahwab",
            "name": "胡洋",
            "age": 25,
            "email": "m.hznmsca@zypcrvb.cc",
            "address": "西北",
            "date": "1985-08-05 09:51:03",
            "slogo": "铁问府中铁军教计类也接代共他强传",
            "intro": "都理大京因省他始新系变适石影思了当族真展儿收选越没如情两存区比提里来容么又华见收安酸走广个切三长米低应石取式思价四而文离场受火革值必原省求存白细此中起图争太研离几济理酸日市却机同效会形感器大温高利干用至确满最线格切际厂何型织一王该术克适大目战革质持国通物备产数被眼者手清单。"
          },
          {
            "id": 3,
            "color": "#79f2c8",
            "title": "Abhnmnm Kmjm Rkohjldq Hwbyq Xtwoefpc Ksisyweh Pecaiugyj",
            "name": "张静",
            "age": 95,
            "email": "c.hfpguc@hoo.hu",
            "address": "华中",
            "date": "2018-12-16 06:06:33",
            "slogo": "油它特位道增生关己能精等受教素十老何叫来研",
            "intro": "府发由及切更生立验因样低究点观调一许质真象收果而保好美于市有质化解力国来不青支因住志确通准过主毛力容然量都也矿对世力增行支集果她面工商百小权表万正活打过这开使断分低离求界写她入界又周但。"
          }
        ]
      }
    }
  }
}
</script>
```
:::


## API

### Crud
|参数|说明|类型|可选值|默认值|
|:--|:---|:---|:---|:---|
|requestUrl|分页接口地址|string|-|-|
|tableColumn|表格展示数据列，[配置参考](https://www.antdv.com/components/table-cn/#Column)|array|-|[]|
|tableData|表格数据|array|-|[]|
|rowSize|每行展示的查询字段数（因内部做了响应式处理，通常不设置此值）|number|`1`, `2`, `3`, `4`|3|
|autoSearch|进入页面是否自动执行查询|boolean|-|false|
|rowKey|表格行 key 的取值，参考 Antd 的 [table API](https://www.antdv.com/components/table-cn/#API)|string, function|-|id|
|params|查询时额外传递给分页接口的参数|object|-|{}|
|showOrder|表格是否展示序号列，如果为对象，则有如下属性：<br/>`align`：列对齐方式，默认`center`,<br/>`label`：列展示名称，默认展示`序号`,<br/>`fixed`：浮动方向，可选值`left`（默认），`right`,<br/>`width`：列宽度，默认`50px`|boolean, object|-|false|
|resetOnSearch|重置按钮点击后是否调用分页接口查询|boolean|-|true|



### tableColumn 额外提供的属性

|参数|说明|类型|可选值|默认值|
|:--|:---|:---|:---|:---|
|show|是否展示此字段，为`false`时不展示该字段|boolean|-|true|