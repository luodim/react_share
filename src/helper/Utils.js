import Fingerprint2 from 'fingerprintjs2'

export default class Utils {
  // 生成event对象
  static buildEvents() {
     let events = require('events')
     return new events.EventEmitter()
  }

  // 获取设备指纹
  static getDevFingerCode(e, ev) {
  	new Fingerprint2().get(function(result, components) {
      console.log(`result is ${result}`) // a hash, representing your device fingerprint
      e.emit(ev, result)
    })
  }

  // 查询cookie获取userId
  static getUserId() {
    if (document.cookie.length > 0) {
      let startIndex = document.cookie.indexOf('userId')
      let endIndex
      if (startIndex !== -1) {
        startIndex = startIndex + ('userId=').length
        endIndex = document.cookie.indexOf(';', startIndex)
        endIndex = endIndex === -1 ? document.cookie.length : endIndex
        // console.log(`start index is ${startIndex}, cookie is ${document.cookie}`)
        return document.cookie.substring(startIndex, endIndex)
      }
    }
    return ''
  }

  static copyCtrl(window, canCopy) {
    if (window) {
      window.document.onselectstart = () => {return canCopy}
      window.document.oncontextmenu = () => {return canCopy}
    }
  }

  static saveState(window, pageId, value=0, key='scrollPos') {
    if (window) {
      window.localStorage.setItem(`${pageId}-${key}`, value.toString())
    }
  }

  // 处理页面状态恢复（是否恢复取决于是否从别的页面返回）
  static handleRestoreState(window, pageId, action, delayParam=500, key='scrollPos') {
    if (action == 'POP') { // 说明是从上一个页面返回而非正常路由过来
      let value = window.localStorage.getItem(`${pageId}-${key}`)
      value = value ? parseFloat(value) : 0
      window.setTimeout(() => {window.scrollTo(0, -value)}, delayParam)
    }
  }
}