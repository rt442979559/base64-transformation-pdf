// 初始化加载  数字字典 等功能
export const initSystem = async function(handler) {
  await Promise.all([
    console.log('系统初始化')
    // store.dispatch('router/getModulesTree'),
    // store.dispatch('dict/setDicts')
  ])

  // store.dispatch('component/initTargetSelectData')

  if (handler) { handler() }
}
