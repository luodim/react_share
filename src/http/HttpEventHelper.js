import 'whatwg-fetch'
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only'
import {
  LOGIN_REQ,
  UPLOAD_REQ,
  HOME_REQ,
  TASK_REQ,
  TASK_ADD_REQ,
  TASK_DEL_REQ,
  TASK_UPDATE_REQ,
  USER_INFO_REQ,
  INVITATION_CODE_UPDATE,
  CONTRIBUTION_LIST_REQ,
  TARGET_INFO_UPDATE,
  DEL_TARGET_INFO,
  GET_LIKE_NUM
} from '../Constant.js'
import Utils from '../helper/Utils.js'
import HttpCache from './HttpCache.js'

export default class HttpEventHelper {

  // 登录验证接口
  loginVerify(invitationCode, fingerCode) {
    console.log(`invitation code is ${invitationCode}`)
    let params = `invitation_code=${invitationCode}&finger_code=${fingerCode}`
    return this.handleNewReq(LOGIN_REQ, 'POST', params, 'application/x-www-form-urlencoded')
  }

  // 编辑上传接口
  uploadInfo(event, eventName, iptObj) {
    let formData = new FormData()
    Object.keys(iptObj).map((k) => {
      formData.append(k, iptObj[k])
    })
    this.handleReq(UPLOAD_REQ, 'POST', formData, 'multipart/form-data', event, eventName)
  }

  // 获取首页tab数据
  getHomeData(userId, event, eventName, sinceId = -1, num = 20) {
    let params = `since_id=${sinceId}&page_num=${num}&user_id=${userId}`
    // 分页缓存判断较为特殊，缓存只在页面重新加载
    let needReq = !this.checkCache(event, eventName) || sinceId !== -1
    if (needReq) {
      this.handleReq(HOME_REQ, 'POST', params, 'application/x-www-form-urlencoded', event, eventName, true, true)
    } else { // 获取缓存数据
      let data = HttpCache.getPageData(eventName)
      event.emit(eventName, data)
    }
  }

  // 获取任务列表
  getTaskData(userId, event, eventName) {
    let params = `user_id=${userId}`
    let needReq = !this.checkCache(event, eventName)
    console.log(`need request? : ${needReq}`)
    if (needReq) {
      this.handleReq(TASK_REQ, 'POST', params, 'application/x-www-form-urlencoded', event, eventName, true)
    } else {
      let data = HttpCache.getPageData(eventName)
      event.emit(eventName, data)
    }
  }

  // 添加删除任务
  addDelTaskState(state, userId, unionId, event, eventName, index) {
    let params = `user_id=${userId}&union_id=${unionId}`
    let api = state ? TASK_ADD_REQ : TASK_DEL_REQ
    this.changeLikeCache(state, index)
    this.handleReq(api, 'POST', params, 'application/x-www-form-urlencoded', event, eventName)
  }

  // 更新任务列表选中状态
  updateTaskState(userId, unionId, checkState, event, eventName) {
    let params = `user_id=${userId}&union_id=${unionId}&check_state=${checkState}`
    this.handleReq(TASK_UPDATE_REQ, 'POST', params, 'application/x-www-form-urlencoded', event, eventName)
  }

  // 验证用户是否处于登录状态
  verifyUserIdExist(url) {
    let id = Utils.getUserId()
    return (id && id !== '') || url === LOGIN_REQ
  }

  // 获取用户信息
  getUserInfo(userId, event, eventName) {
    let params = `user_id=${userId}`
    this.handleReq(USER_INFO_REQ, 'POST', params, 'application/x-www-form-urlencoded', event, eventName)
  }

  // 更新邀请码
  updateInvitationCode(userId, event, eventName) {
    let params = `user_id=${userId}`
    this.handleReq(INVITATION_CODE_UPDATE, 'POST', params, 'application/x-www-form-urlencoded', event, eventName)
  }

  // 获取历史贡献信息列表
  getContributionList(userId, event, eventName) {
    let params = `user_id=${userId}`
    this.handleReq(CONTRIBUTION_LIST_REQ, 'POST', params, 'application/x-www-form-urlencoded', event, eventName)
  }

  // 更新目标信息
  updateTargetInfo(event, eventName, iptObj, unionId) {
    let formData = new FormData()
    Object.keys(iptObj).map(k => {
      formData.append(k, iptObj[k])
    })
    formData.append('union_id', unionId)
    this.handleReq(TARGET_INFO_UPDATE, 'POST', formData, 'multipart/form-data', event, eventName)
  }

  // 删除目标信息
  delTargetInfo(unionId, event, eventName) {
    let params = `union_id=${unionId}`
    this.handleReq(DEL_TARGET_INFO, 'POST', params, 'application/x-www-form-urlencoded', event, eventName)
  }

  // 获取该unionId被添加的数量
  getLikeNum(unionId, event, eventName) {
    let params = `union_id=${unionId}`
    this.handleReq(GET_LIKE_NUM, 'POST', params, 'application/x-www-form-urlencoded', event, eventName)
  }

  handleNewReq(url, method, params, contentType, needSaveCache = false, isPageReq = false) {
    return new Promise(resolve => {
      if (this.verifyUserIdExist(url)) {
        // this.setReqTimeout(event, eventName)
        let setObj = params instanceof FormData ? {
          method: method,
          body: params,
          signal: window.AbortController.signal
        } : {
          method: method,
          body: params,
          headers: {
            'Content-Type': contentType
          },
          signal: window.AbortController.signal
        }
        fetch(url, setObj).then(response => {
          response.json().then(json => {
            resolve(json)
            // this.clearReqTimeout()
            console.log(json)
            // this.saveCache(needSaveCache, isPageReq, eventName, json)
          })
        }).catch(err => {
          // this.setReqError(event, eventName)
          console.log(`error is ${err}`)
        })
      } else {
        // this.setRedirect(event, eventName)
        console.log('can not execute http req')
      }
    })
  }

  // 发出请求及响应
  handleReq(url, method, params, contentType, event, eventName, needSaveCache = false, isPageReq = false) {
    if (this.verifyUserIdExist(url)) {
      this.setReqTimeout(event, eventName)
      let setObj = params instanceof FormData ? {
        method: method,
        body: params,
        signal: window.AbortController.signal
      } : {
        method: method,
        body: params,
        headers: {
          'Content-Type': contentType
        },
        signal: window.AbortController.signal
      }
      fetch(url, setObj).then(response => {
        response.json().then(json => {
          this.clearReqTimeout()
          event.emit(eventName, json)
          console.log(json)
          this.saveCache(needSaveCache, isPageReq, eventName, json)
        })
      }).catch(err => {
        this.setReqError(event, eventName)
        console.log(`error is ${err}`)
      })
    } else {
      this.setRedirect(event, eventName)
      console.log('can not execute http req')
    }
  }

  // 清除请求超时定时器
  clearReqTimeout() {
    clearTimeout(this.timer)
  }

  // 检查缓存是否存在
  checkCache(event, eventName) {
    let data = HttpCache.getPageData(eventName)
    return data && data.data && data.data.length > 0
  }

  // 改变喜欢状态缓存
  changeLikeCache(state, index) {
    let data = HttpCache.getPageData('reqHomeDataCB')
    if (data && data.data && data.data[index]) {
      data.data[index]['id'] = state ? -1 : null
      HttpCache.savaPageData('reqHomeDataCB', data)
    }
  }

  /*
  存储缓存
  needSaveCache:是否需要存储缓存
  isPageReq:是否是分页请求
  eventName:存储时作为key
  data:数据
  */
  saveCache(needSaveCache, isPageReq, eventName, data) {
    if (needSaveCache) { // 此次请求需要缓存数据
      if (isPageReq) { // 是分页请求
        // 先读取已有缓存
        let result = HttpCache.getPageData(eventName)
        if (result && result.data.length > 0) { // 有数据，合并数据
          let newData = result.data.concat(data.data)
          data.data = newData
        }
      }
      HttpCache.savaPageData(eventName, data)
    }
  }

  // 设置重定向响应
  setRedirect(event, eventName) {
    let json = {
      "message": "登录失效",
      "status": "300",
      "data": [],
      "timestamp": new Date().getTime()
    }
    window.AbortController.abort
    event.emit(eventName, json)
  }

  // 设置请求错误
  setReqError(event, eventName) {
    let json = {
      "message": "请求错误，请重试",
      "status": "400",
      "data": [],
      "timestamp": new Date().getTime()
    }
    window.AbortController.abort
    event.emit(eventName, json)
  }

  // 设置请求超时
  setReqTimeout(event, eventName) {
    this.timer = setTimeout(() => {
      let json = {
        "message": "请求超时，请重试",
        "status": "400",
        "data": [],
        "timestamp": new Date().getTime()
      }
      window.AbortController.abort
      event.emit(eventName, json)
    }, 5000)
  }
}