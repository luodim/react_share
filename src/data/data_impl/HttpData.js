import { http } from '../HttpDataManager.js'

// req url name
let isTest = false
const HTTP = isTest ? 'http://127.0.0.1:21654/api/' : 'http://54.238.237.51/api/'
const LOGIN_REQ = `login`
const HOME_REQ = `home`
const TASK_REQ = `task`
const TASK_UPDATE_REQ = `task-update`
const TASK_DEL_REQ = `task-del`
const TASK_ADD_REQ = `task-add`
const UPLOAD_REQ = `upload-data`
const USER_INFO_REQ = `user-info`
const INVITATION_CODE_UPDATE_REQ = `invitation-code-update`
const CONTRIBUTION_LIST_REQ = `contribution-list`
const TARGET_INFO_UPDATE_REQ = `target-update`
const DEL_TARGET_INFO_REQ = `target-del`
const GET_LIKE_NUM_REQ = `get-like-num`

/*http请求业务逻辑*/
class HttpData {
  getHttpReqResult(params, reqName) {
  	let result
    switch (reqName) {
      case LOGIN_REQ:
      result = this.loginVerify(params)
      break
      default:
      break
    }
    return result
  }

  // 组装params
  buildParams(params) {
    let param = ''
    Object.keys(params).map(result => param +=`${result}=${params[result]}&`)
    return param.substring(0, param.length - 1)
  }

  // 登录验证接口
  loginVerify(params) {
  	return http.handleReq(`${HTTP}${LOGIN_REQ}`, 'POST', this.buildParams(params), 'application/x-www-form-urlencoded')
  }
}

const httpData = new HttpData()
export { httpData, LOGIN_REQ }