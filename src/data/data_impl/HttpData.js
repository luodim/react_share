import {
  http
} from '../HttpDataManager.js'

// req url name
let isTest = true
const HTTP = isTest ? 'http://127.0.0.1:21654/api/' /*'http://192.168.31.173:21654/api/'*/: 'http://54.238.237.51/api/'
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
      case TASK_ADD_REQ:
        result = this.addTask(params)
        break
      case TASK_DEL_REQ:
        result = this.delTask(params)
        break
      case TASK_UPDATE_REQ:
        result = this.updateTaskState(params)
        break
      case HOME_REQ:
        result = this.getHomeData(params)
        break
      case TASK_REQ:
        result = this.getTaskData(params)
        break
      case TASK_UPDATE_REQ:
        result = this.updateTaskCheckState(params)
        break
      case USER_INFO_REQ:
        result = this.getUserInfo(params)
        break
      case CONTRIBUTION_LIST_REQ:
        result = this.getContributionList(params)
        break
      case INVITATION_CODE_UPDATE_REQ:
        result = this.updateInvitationCode(params)
        break
      case DEL_TARGET_INFO_REQ:
        result = this.delTargetInfo(params)
      default:
        break
    }
    return result
  }

  // 组装params
  buildParams(params) {
    let param = ''
    Object.keys(params).map(result => param += `${result}=${params[result]}&`)
    return param.substring(0, param.length - 1)
  }

  // 登录验证接口
  loginVerify(params) {
    return http.handleReq(LOGIN_REQ, 'POST', this.buildParams(params), 'application/x-www-form-urlencoded')
  }

  // 更新任务列表选中状态
  updateTaskState(params) {
    return http.handleReq(TASK_UPDATE_REQ, 'POST', this.buildParams(params), 'application/x-www-form-urlencoded')
  }

  // 添加到喜爱列表
  addTask(params) {
    return http.handleReq(TASK_ADD_REQ, 'POST', this.buildParams(params), 'application/x-www-form-urlencoded')
  }

  // 从喜爱列表删除
  delTask(params) {
    return http.handleReq(TASK_DEL_REQ, 'POST', this.buildParams(params), 'application/x-www-form-urlencoded')
  }

  // 获取首页数据
  getHomeData(params) {
    let flag = params.hasOwnProperty('page_num')
    if (!flag) params['page_num'] = 20 // 不存在page_num属性则设置默认分页请求数量为20
    let result = http.checkCache(HOME_REQ)
    if (result && result !== '' && params['since_id'] == -1) { // 存在缓存
      console.log('use cache')
      return JSON.parse(result)
    } else {
      console.log('no cache')
      return http.handleReq(HOME_REQ, 'POST', this.buildParams(params), 'application/x-www-form-urlencoded', true, true)
    }
  }

  // 获取任务列表
  getTaskData(params) {
    let result = http.checkCache(TASK_REQ)
    if (result && result !== '') {
      console.log('use cache')
      return JSON.parse(result)
    } else {
      console.log('no cache')
      return http.handleReq(TASK_REQ, 'POST', this.buildParams(params), 'application/x-www-form-urlencoded', true)
    }
  }

  // 更新任务选中状态
  updateTaskCheckState(params) {
    return http.handleReq(TASK_UPDATE_REQ, 'POST', this.buildParams(params), 'application/x-www-form-urlencoded')
  }

  // 获取用户信息
  getUserInfo(params) {
    let result = http.checkCache(USER_INFO_REQ)
    if (result && result !== '') {
      console.log('use cache')
      return JSON.parse(result)
    } else {
      console.log('no cache')
      return http.handleReq(USER_INFO_REQ, 'POST', this.buildParams(params), 'application/x-www-form-urlencoded', true)
    }
  }

  // 获取已提交的信息列表
  getContributionList(params) {
    let result = http.checkCache(CONTRIBUTION_LIST_REQ)
    if (result && result !== '') {
      console.log('use cache')
      return JSON.parse(result)
    } else {
      console.log('no cache')
      return http.handleReq(CONTRIBUTION_LIST_REQ, 'POST', this.buildParams(params), 'application/x-www-form-urlencoded', true)
    }
  }

  // 更新邀请码
  updateInvitationCode(params) {
    return http.handleReq(INVITATION_CODE_UPDATE_REQ, 'POST', this.buildParams(params), 'application/x-www-form-urlencoded')
  }

  // 删除目标信息
  delTargetInfo(params) {
    return http.handleReq(DEL_TARGET_INFO_REQ, 'POST', this.buildParams(params), 'application/x-www-form-urlencoded')
  }

}

const httpData = new HttpData()
export {
  httpData,
  HTTP,
  LOGIN_REQ,
  TASK_ADD_REQ,
  TASK_DEL_REQ,
  TASK_UPDATE_REQ,
  HOME_REQ,
  TASK_REQ,
  USER_INFO_REQ,
  CONTRIBUTION_LIST_REQ,
  INVITATION_CODE_UPDATE_REQ,
  DEL_TARGET_INFO_REQ,
}