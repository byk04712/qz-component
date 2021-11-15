import Vue from 'vue'

/**
* 保存
* @param  {Binnary} data
* @param  {String} filename 想要保存的文件名称
*/
function saveAs (data, filename) {
  if (window.navigator.msSaveOrOpenBlob) {
    navigator.msSaveBlob(data, filename)
  } else {
    const blob = new window.Blob([data])
    const link = document.createElement('a')
    const body = document.querySelector('body')

    link.href = window.URL.createObjectURL(blob)
    link.download = filename

    // fix Firefox
    link.style.display = 'none'
    body.appendChild(link)

    link.click()
    body.removeChild(link)

    window.URL.revokeObjectURL(link.href)
  }
}

/**
 * 文件下载
 * @param {Object} obj.url : 请求地址
 * @param {Object} obj.method : 请求方式，默认 get
 * @param {Object} obj.params : 附带传递参数， 默认
 * @param {Object} obj.filename : 下载的文件名，带文件后缀
 */
export default function (obj) {
  return new Promise((resolve, reject) => {
    const {
      url,
      method = 'post',
      params = {},
      filename = Date.now().toString()
    } = obj
    if (!url) {
      throw new Error('url不能为空')
    }
    Vue.prototype.$http[method](url, params, {
      responseType: 'blob'
    })
      .then((res) => {
        saveAs(res.data, filename)
        resolve(res)
      })
      .catch(reject)
  })
}
