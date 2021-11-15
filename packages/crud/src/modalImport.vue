<!--
 * @Author: 秦真
 * @Date: 2021-09-18 16:15:38
 * @LastEditors: Do not edit
 * @LastEditTime: 2021-11-15 13:09:48
 * @Description: 弹窗导入
 * @FilePath: \admin-fronted\bgy-component\packages\crud\src\modalImport.vue
-->
<template>
  <a-modal
    :visible="visible"
    v-modal.drag
    :keyboard="false"
    :maskClosable="false"
    title="批量导入信息"
    ok-text="确认"
    cancel-text="取消"
    width="600px"
    class="modal-import"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-spin :spinning="importing" class="modal-import-content">
      <div class="tip">请确保导入的数据与模版的数据项一致</div>
      <div class="template">
        <div class="template-left">
          选择上传文件
          <a-upload v-bind="fileUpload">
            <a-button type="primary" icon="upload" ghost>选择文件</a-button>
            <!-- <a-button type="primary" icon="upload" ghost @click.stop="handleImport">选择文件</a-button> -->
          </a-upload>
        </div>
        <!-- 提供了template配置才展示下载模版按钮 -->
        <throttle v-if="config.template">
          <a-button
            type="link"
            :loading="donwloadLoading"
            @click.native="handleDownTemp"
          >下载模版</a-button>
        </throttle>
      </div>
    </a-spin>
    <!-- 文件上传 -->
    <!--
    <a-upload
      v-show="false"
      v-bind="fileUpload"
      @change="handleUploadChange"
    >
      <a-button ref="uploadBtn" type="primary" ghost></a-button>
    </a-upload>
     -->
  </a-modal>
</template>

<script>
import download from '@/src/util/download';
import Throttle from '@/packages/throttle';

export default {
  name: 'ModalImport',

  components: {
    Throttle,
  },

  props: {
    visible: Boolean,

    // 导入的配置
    config: {
      type: Object,
      default: () => ({}),
      validator(val) {
        // url 属性必须存在
        return 'url' in val;
      },
    }
  },

  data() {
    const {
      accept = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
      multiple = false,
    } = this.config;
    return {
      // 文件上传
      fileUpload: {
        accept, // 可接受的上传文件类型
        multiple, // 是否多文件上传
        // showUploadList: false,
        // beforeUpload: () => false,
        customRequest: this.customRequest,
        fileList: [],
        remove: this.removeFileItem
      },
      fileData: {},
      // 下载中
      donwloadLoading: false,
      // 文件导入中
      importing: false,
    };
  },

  methods: {
    removeFileItem(file) {
      //找到当前文件所在列表的索引
      const index = this.fileUpload.fileList.indexOf(file);
      if (index >= 0) {
        //从列表中移除该文件
        this.fileUpload.fileList.splice(index, 1);
        return true;
      }
      return false;
    },
    
    // 自定义上传
    customRequest(params) {
      this.fileData = params;
      //初始化文件信息
      const fileInfo = {
        uid: params.file.uid,
        name: params.file.name,
        status: 'done',
        response: '',
        url: '',
      };
      //放入上传列表中，以便于显示上传进度
      this.fileUpload.fileList.push(fileInfo);
    },
    
    // handleUploadChange(obj) {
    //   const { fileList } = obj;
    //   const formData = new FormData();
    //   fileList.forEach(file => {
    //     formData.append('file', file.originFileObj);
    //   });
    //   this.importing = true;
    //   this.$http.post(this.config.url, formData, {
    //     headers: {
    //       'Content-Type': 'application/x-www-form-urlencoded',
    //     }
    //   })
    //     .then(() => {
    //       this.$message.success('批量导入成功');
    //     })
    //     .finally(() => {
    //       this.importing = false;
    //     });
    // },

    handleOk() {
      // this.handleCancel();
      this.importing = true;
      const formData = new FormData();
      formData.append('file', this.fileData.file);
      this.$http.post(this.config.url, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      })
        .then((res) => {
          this.$message.success('批量导入成功');
          this.$emit('import-success', res);
          this.handleCancel();
        })
        .finally(() => {
          this.importing = false;
        });
    },

    handleCancel() {
      this.$emit('update:visible', false);
    },

    // handleImport() {
    //   this.$refs.uploadBtn.$el.click();
    // },

    // 模版下载
    handleDownTemp() {
      // 模版配置
      const { template } = this.config;
      if (!template) {
        return;
      }

      const {
        url,        // 模版下载地址
        filename,   // 下载后的文件名，带文件后缀名
        params,     // 传递给接口的参数
      } = template;
      this.donwloadLoading = true;
      return new Promise((resolve, reject) => {
        download({
          url,
          filename,
          params,
        })
          .then(resolve)
          .catch(reject)
          .finally(() => {
            this.donwloadLoading = false;
          });
      });
    },
  },
}
</script>
