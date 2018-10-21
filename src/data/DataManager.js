import { http } from './HttpDataManager.js'
import { cookie } from './CookieDataManager.js'

/*
数据请求管理类，一切类型的数据请求通过此类进行代理
*/
const DataManager = class DataManager {
  reqData(reqName, reqType, params = {}) {
    let result
    switch (reqType) {
      case TYPE_HTTP:
        result = this.getHttpReq(params, reqName)
        break
      case TYPE_LOCAL:
        break
      case TYPE_SESSION:
        break
      case TYPE_DATABASE:
        break
      case TYPE_COOKIE:
        result = this.getCookieReq(reqName)
        break
      default:
        break
    }
    return result
  }

  setData(params, dataName, setType = TYPE_LOCAL) {
    switch (setType) {
      case TYPE_LOCAL:
        break
      case TYPE_SESSION:
        break
      case TYPE_DATABASE:
        break
      case TYPE_COOKIE:
        this.setCookieData(params, dataName)
        break
      default:
        break
    }
  }

  getHttpReq(params, reqName) {
    return http.dispatchReq(params, reqName)
  }

  getLocalReq(params, reqName) {
    // todo
  }

  getSessionReq(params, reqName) {
    // todo
  }

  getDatabaseReq(params, reqName) {
    // todo
  }

  getCookieReq(reqName) {
    return cookie.getCookieData(reqName)
  }

  setCookieData(params, dataName) {
    cookie.setCookieData(params, dataName)
  }
}

const dataManager = new DataManager()
// type const
const TYPE_HTTP = 'http'
const TYPE_LOCAL = 'local'
const TYPE_DATABASE = 'database'
const TYPE_SESSION = 'session'
const TYPE_COOKIE = 'cookie'

export {
  dataManager,
  TYPE_HTTP,
  TYPE_LOCAL,
  TYPE_DATABASE,
  TYPE_SESSION,
  TYPE_COOKIE
}