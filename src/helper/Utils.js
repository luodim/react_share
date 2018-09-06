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
}