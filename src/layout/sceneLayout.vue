<template>
  <div>
    <!-- <navTop /> -->
    <div :class="viewClass">
      <!-- 子模块左右菜单 -->
      <!-- <div v-if="viewClass==='submodule-container'" class="submodule-menu submodule-left"></div> -->
      <router-view />
      <!-- <div v-if="viewClass==='submodule-container'" class="submodule-menu submodule-right"></div> -->

    </div>
  </div>
</template>
<script lang='ts'>
import { computed, defineComponent, unref } from 'vue'
import { useRoute } from 'vue-router'
import navTop from './header/index.vue'
export default defineComponent({
  components: {
    navTop
  },
  setup() {
    const router = useRoute()
    console.log(unref(router), '55')
    const viewClass = computed(() => {
      if (router.meta.title === '首页') {
        return 'portal-index-container'
      } else {
        return 'submodule-container'
      }
    })
    return {
      viewClass, router
    }
  }
})
</script>

<style lang='scss' scoped>
.submodule-container {
  // display: flex;
}
.submodule-menu {
  // position: absolute;
  width: 200px;
  background: #1492ff;
  position: relative;
}
.submodule-left {
  margin-left: auto;
  margin-right: 20px;
  &::before {
    content: '';
    width: 20px;
    position: absolute;
    right: -20px;
    height: 100%;
    background: linear-gradient(to bottom, #6bbaff 0%, #ffffff 25%, #ffffff);
  }
}
.submodule-right {
  margin-right: auto;
  margin-left: 20px;
  &::before {
    content: '';
    width: 20px;
    position: absolute;
    left: -20px;
    height: 100%;
    background: linear-gradient(to bottom, #6bbaff 0%, #ffffff 25%, #ffffff);
  }
}
</style>

