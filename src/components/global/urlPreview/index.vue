<template>
  <div>
    <el-dialog
      v-bind="$attrs"
      width="50%"
      destroy-on-close
      :fullscreen="true"
      custom-class="web-full-dialog"
    >
      <div class="url-container">
        <div class="button_wapper" @click.stop="$emit('back')">
          <span class="button"><i class="el-icon-arrow-left"></i> 返回</span>
        </div>
        <iframe v-if="url" :src="url" class="iframe-container" width="100%" height="100%" frameborder="0"></iframe>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { useStore } from 'vuex'
import { defineComponent, computed } from 'vue'
/**
 * 浙政钉应用内打开,全屏显示,不使用window.open
 */
export default defineComponent({
  name: 'UrlPreview',
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const myTest = () => {
      window.top.postMessage('test')
    }

    const store = useStore()
    const btnShow = computed(() => {
      return store.getters.backButtonShow
    })

    return {
      btnShow, myTest
    }
  }
})
</script>
<style lang='scss'>
.web-full-dialog {
  z-index: 10;
  .el-dialog__body {
    height: 100%;
    padding: 0;
    .url-container {
      position: relative;
      height: 100%;
    }
  }
  .el-dialog__header{
    display: none;
  }
  .button_wapper{
    position: fixed;
    display: block;
    margin: 25px 0;
    .button{
      cursor: pointer;
      padding: 5px 16px 5px 5px;
      color: #fff;
      font-size: 16px;
      background: #048bf6;
      border-top-right-radius: 14px;
      border-bottom-right-radius: 14px;
    }
  }
}
</style>
