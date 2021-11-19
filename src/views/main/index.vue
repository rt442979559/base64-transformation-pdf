<template>
  <div class="container">
    <div style="margin-bottom:35vh;">
      <h1 style="color:#666;margin-bottom:5vh;"> <center>base64 转 PDF 工具</center> </h1>
      <div>
        <el-input v-model="inputValue" clearable style="width:60vw;margin-right:20px" placeholder="请输入base64编码">
          <template #append>
            <el-button icon="el-icon-download" @click="changePdf">下载PDF文件</el-button>
          </template>
        </el-input>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      inputValue: '',
      result: ''
    }
  },
  methods: {
    changePdf() {
      if (this.inputValue === '') {
        return this.$message.warning('内容不能为空')
      }
      const URL = this.dataURLtoBlob(this.inputValue)
      var reader = new FileReader()
      reader.readAsDataURL(URL)
      reader.onload = function(e) {
        // 兼容IE
        if (window.navigator.msSaveOrOpenBlob) {
          var bstr = atob(e.target.result.split(',')[1])
          var n = bstr.length
          var u8arr = new Uint8Array(n)
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n)
          }
          var blob = new Blob([u8arr])
          window.navigator.msSaveOrOpenBlob(blob, '文件.pdf')
        } else {
          // 转换完成，创建一个a标签用于下载
          const a = document.createElement('a')
          a.download = '文件.pdf'
          a.href = e.target.result
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
        }
      }
    },
    // *base64 转 blob
    dataURLtoBlob(data) {
      var bstr = atob(data)
      var n = bstr.length
      var u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new Blob([u8arr], { type: 'pdf' })
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
