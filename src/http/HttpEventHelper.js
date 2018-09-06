import 'whatwg-fetch'
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only'
import {LOGIN_REQ} from '../Constant.js'

export default class HttpEventHelper {
  loginVerify(invitationCode, fingerCode, event, eventName) {
    let params = `invitation_code=${invitationCode}&finger_code=${fingerCode}`
  	this.handleReq(LOGIN_REQ, 'POST', params, 'application/x-www-form-urlencoded', event, eventName)
  }

  uploadInfo() {
    
  }

  handleReq(url, method, params, contentType, event, eventName) {
    this.setReqTimeout(event, eventName)
    fetch(url, {
      method: method,
      body: params,
      headers: {
        'Content-Type': contentType
      },
      signal: window.AbortController.signal
    }).then(response => {
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

  clearReqTimeout() {
    clearTimeout(this.timer)
  }

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