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
      let startIndex = document.cookie.indexOf('userId') + ('userId=').length
      let endIndex
      if (startIndex !== -1) {
        endIndex = document.cookie.indexOf(';', startIndex)
        endIndex = endIndex === -1 ? document.cookie.length : endIndex
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
}