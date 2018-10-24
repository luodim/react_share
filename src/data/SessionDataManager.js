import Utils from '../helper/Utils.js'

class SessionDataManager {
  setData(params, dataName) {
  	let isObjType = Utils.isObjType(params)
  	if (isObjType) { // 参数类型为对象， 转化为string后存入
      sessionStorage.setItem(dataName, JSON.stringify(params))
  	} else { // 参数非对象
      sessionStorage.setItem(dataName, params)
  	}
  }

  getData(reqName) {
    return sessionStorage.getItem(reqName)
  }

  removeData(key) {
    sessionStorage.removeItem(key)
  }

  clearData() {
  	sessionStorage.clear()
  }
}

const session = new SessionDataManager()
export { session }