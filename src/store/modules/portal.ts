
import { getToken, setToken } from '@/utils/auth'
const state = {
  accessToken: getToken()
}
const mutations = {
  SET_ACCESSTOKEN: (state, data) => {
    state.accessToken = data
  }
}
const actions = {
  setAccessToken: ({ commit }, data) => {
    setToken(data)
    commit('SET_ACCESSTOKEN', data)
  }
}
export default {
  namespaced: true,
  state,
  actions,
  mutations
}
