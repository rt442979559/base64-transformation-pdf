
const getters = {
  testData: state => state.index.data,
  userInfo: state => state.user.userInfo,
  accessToken: state => state.portal.accessToken,
}
export default getters
