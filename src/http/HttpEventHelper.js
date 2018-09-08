import 'whatwg-fetch'
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only'
import {LOGIN_REQ, UPLOAD_REQ} from '../Constant.js'

export default class HttpEventHelper {

  // 登录验证接口
  loginVerify(invitationCode, fingerCode, event, eventName) {
    console.log(`invitation code is ${invitationCode}`)
    let params = `invitation_code=${invitationCode}&finger_code=${fingerCode}`
  	this.handleReq(LOGIN_REQ, 'POST', params, 'application/x-www-form-urlencoded', event, eventName)
  }

  // 编辑上传接口
  uploadInfo(event, eventName, map) {
    if (map) {
      let formData = new FormData()
      for (let item of map.entries()) {
        console.log(item[0], item[1])
        formData.append(item[0], item[1])
      }
      this.handleReq(UPLOAD_REQ, 'POST', formData, 'multipart/form-data', event, eventName)
    }
  }

  // 发出请求及响应
  handleReq(url, method, params, contentType, event, eventName) {
    this.setReqTimeout(event, eventName)
    console.log(params instanceof FormData)
    let setObj = params instanceof FormData ? {method: method, body:params, signal: window.AbortController.signal}
    : {method: method, body: params, headers: {'Content-Type': contentType},signal: window.AbortController.signal}
    fetch(url, setObj).then(response => {
      response.json().then(json => {
        if (event) {
          this.clearReqTimeout()
          event.emit(eventName, json)
          console.log(`response is ${JSON.stringify(json)}`)
        }
      })
    }).catch(err => {
      this.setReqError(event, eventName)
      console.log(`error is ${err}`)
    })
  }

  // 清除请求超时定时器
  clearReqTimeout() {
    clearTimeout(this.timer)
  }

  // 设置请求错误
  setReqError(event, eventName) {
    let json = {
      "message":"请求错误，请重试",
      "status":"400",
      "data":[],
      "timestamp":new Date().getTime()
    }
    window.AbortController.abort
    event.emit(eventName, json)
  }

  // 设置请求超时
  setReqTimeout(event, eventName) {
    this.timer = setTimeout(() => {
      let json = {
        "message":"请求超时，请重试",
        "status":"400",
        "data":[],
        "timestamp":new Date().getTime()
      }
      window.AbortController.abort
      event.emit(eventName, json)
    }, 5000)
  }
}