/*
 * @Author: Do not edit
 * @Date: 2021-09-09 14:21:31
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-02-28 14:43:30
 * @Description:
 * @FilePath: \bgy-component\src\mixins\selection.js
 */
export default {
  methods: {
    async getOptions (info, args) {
      // 字段类型必须是以下当中的一种
      if (!['select', 'checkbox', 'radio'].includes(info.type)) {
        return
      }

      // 如果已提供 options 则不处理
      if (Array.isArray(info.options) && info.options.length) {
        return
      }

      // 没有 options 属性，则添加 options 属性
      if (!Object.prototype.hasOwnProperty.call(info, 'options')) {
        this.$set(info, 'options', [])
      }

      // 如果提供了 ajax 属性，则调用 ajax 获取下拉框数据
      if (info.ajax) {
        await this.$http[info.ajaxMethod || 'post'](info.ajax, {
          ...info.params,
          ...args
        })
          .then((res) => {
            let options = res.data.obj || []
            // 设置选项前进行预处理
            if (typeof info.beforeSetOptions === 'function') {
              options = info.beforeSetOptions(res) || []
            }
            info.options = options
          })
      } else if (info.fastCode) {
        console.warn('fastCode方式需与后端约定接口规则，例如获取性别的： /basic/common/emun/gender ')
        info.options = [
          { label: 'fastCode方式待实现', value: 'fastCode方式待实现' }
        ]
      }
    }
  }
}
