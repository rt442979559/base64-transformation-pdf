import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
/**
 * 引入 element-plus
 */
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import '@/styles/global.scss' // 引入全局样式

const app = createApp(App)

app.use(store)
app.use(router)

app.use(ElementPlus)

import { initGlobalComponents } from '@/components' // 自定义全局公共组件
initGlobalComponents(app)

app.mount('#app')
