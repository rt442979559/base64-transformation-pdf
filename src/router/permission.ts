import { ElMessage } from 'element-plus'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import store from '@/store'
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { initSystem } from '@/utils/system'

NProgress.configure({ showSpinner: false }) // 页面加载进度条开关

const whiteList = ['/login', '/adminLogin'] // 路由白名单

/** 流程说明：
 * 1、判断token 不存在，跳登录页
 * 2、存在 判断vuex中的用户信息，不存在调用接口判断服务端是否登录，不存在util.js拦截axios响应跳转登录页
 * 3、用户服务端已登录，设置用户信息 加载路由、字典数据到vuex, next
 * 4、其他场景不赘述
*/
export async function beforeEach(to, from, next) {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)
  next()
  NProgress.done()
  // determine whether the user has logged in
  // const hasToken = getToken()
  // if (hasToken) {
  //   if (to.path === '/login') {
  //     // if is logged in, redirect to the home page
  //     next({ path: '/' })
  //     NProgress.done()
  //   } else {
  //     console.log('用户信息判断')
  //     initSystem(() => {})
  //     next()
  //     // const userInfo = store.state.user.userInfo
  //     // if (userInfo === null || userInfo === undefined || JSON.stringify(userInfo) === '{}') {
  //     //   // 获取用户信息
  //     //   await store.dispatch('user/getInfo')
  //     //     .catch(async error => {
  //     //       await store.dispatch('user/logout')
  //     //       Message.error(error)
  //     //       next({ path: '/' })
  //     //       NProgress.done()
  //     //     })
  //     //   initSystem(() => {
  //     //     next({
  //     //       path: to.path,
  //     //       query: to.query
  //     //     })
  //     //   })
  //     // } else {
  //     //   next()
  //     // }
  //   }
  // } else {
  //   /* has no token*/
  //   if (whiteList.indexOf(to.path) !== -1) {
  //     // in the free login whitelist, go directly
  //     next()
  //   } else {
  //     // other pages that do not have permission to access are redirected to the login page.
  //     next(`/login`)
  //     NProgress.done()
  //   }
  // }
}

export function afterEach() {
  // finish progress bar
  NProgress.done()
}
