<template>
  <div>
    <el-dialog
      v-bind="$attrs"
      width="50%"
      destroy-on-close
      :fullscreen="true"
      custom-class="file-preview-dialog"
      :append-to-body="true"
    >
      <div v-if="fileUrl" class="url-container">
        <iframe :src="handleUrl" width="100%" height="100%" frameborder="0"></iframe>
      </div>

    </el-dialog>

  </div>
</template>
<script>
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'FilePreview',
  props: {
    fileUrl: {
      type: String,
      default: ''
    }
  },
  setup(props, ctx) {
    const handleUrl = computed(() => {
      // 这里地址使用的是鹿城OA的office365服务
      const dubanOffice365 = `https://dingdingducha.wenzhou.gov.cn/api/pdf/?ssl=1&n=1&furl=${props.fileUrl}`
      return dubanOffice365
    })
    return { handleUrl }
  }
})
</script>

<style lang='scss'>
.file-preview-dialog {
  .el-dialog__body {
    height: 100%;
    .url-container {
      height: 100%;
    }
  }
}
</style>
