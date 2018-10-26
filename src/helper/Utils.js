import Fingerprint2 from 'fingerprintjs2'
import HttpCache from '../http/HttpCache.js'
import {
  dataManager,
  TYPE_SESSION
} from '../data/DataManager.js'
import {
  TASK_ADD_REQ,
  TASK_DEL_REQ,
  HOME_REQ,
  TASK_REQ,
  USER_INFO_REQ,
  CONTRIBUTION_LIST_REQ
} from '../data/data_impl/HttpData.js'

export default class Utils {
  // 生成event对象
  static buildEvents() {
    let events = require('events')
    return new events.EventEmitter()
  }

  // 获取设备指纹
  static getDevFingerCode() {
    return new Promise(resolve => {
      new Fingerprint2().get((result, components) => {
        resolve(result)
      })
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
        return document.cookie.substring(startIndex, endIndex)
      }
    }
    return ''
  }

  // 设置当前页面能否被右键唤出菜单
  static copyCtrl(window, canCopy) {
    if (window) {
      window.document.onselectstart = () => {
        return canCopy
      }
      window.document.oncontextmenu = () => {
        return canCopy
      }
    }
  }

  static saveDisplayType(type) {
    window.localStorage.setItem(`display-type`, type)
  }

  static getDisplayType() {
    let type = window.localStorage.getItem(`display-type`)
    return type = type ? type : 'double'
  }

  // 保存位置状态
  static saveState(window, pageId, value = 0, key = 'scrollPos') {
    if (window) {
      window.localStorage.setItem(`${pageId}-${key}`, value.toString())
    }
  }

  // 缓存清除控制
  static cacheClearControl(id, action, forceClear = false) {
    if (action === 'PUSH' || forceClear) { // 清除缓存数据
      let removeList = []
      switch (id) {
        case 'target':
          removeList.push(HOME_REQ)
          break
        case 'task':
          removeList.push(TASK_REQ)
          break
        case 'account':
          removeList.push(USER_INFO_REQ)
          removeList.push(CONTRIBUTION_LIST_REQ)
          break
        default:
          break
      }
      removeList.push('homePagePosition')
      for (let name of removeList) {
        dataManager.removeData(name, TYPE_SESSION)
      }
    }
  }

  // 获取可滚动高度
  static getScrollHeight(document) {　　
    let bodyScrollHeight = 0,
      documentScrollHeight = 0　　
    if (document.body) {　　　　
      bodyScrollHeight = document.body.scrollHeight　　
    }　　
    if (document.documentElement) {　　　　
      documentScrollHeight = document.documentElement.scrollHeight　　
    }
    return (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
  }

  // 获取滚动距离
  static getScrollTop(document) {
    let bodyScrollTop = 0
    let documentScrollTop = 0
    if (document.body) {　　　　
      bodyScrollTop = document.body.scrollTop;　　
    }　　
    if (document.documentElement) {　　　　
      documentScrollTop = document.documentElement.scrollTop;　　
    }
    return bodyScrollTop - documentScrollTop > 0 ? bodyScrollTop : documentScrollTop
  }

  static safeSetState(ctx, isMounted, obj) {
    if (isMounted) ctx.setState({
      obj
    })
  }

  // 获取窗口高度
  static getWindowHeight(document) {　
    let windowHeight = 0　　
    if (document.compatMode === 'CSS1Compat') {　　　　
      windowHeight = document.documentElement.clientHeight　　
    } else {　　　　
      windowHeight = document.body.clientHeight　
    }　　
    return windowHeight
  }

  // 判断是否到达底部
  static isInBottom(document) {
    let scrollTop = this.getScrollTop(document)
    let scrollHeight = this.getScrollHeight(document)
    let windowHeight = this.getWindowHeight(document)
    // console.log(`scroll top is ${scrollTop}, scrollHeight is ${scrollHeight}, window height is ${windowHeight}`)
    return scrollTop + windowHeight >= scrollHeight - 100
  }

  // 纯字符串键map转对象
  static strMapToObj(strMap) {
    let obj = Object.create(null)
    for (let [k, v] of strMap) {
      obj[k] = v
    }
    return obj
  }

  // 对象转map
  static objToStrMap(obj) {
    let strMap = new Map()
    for (let k of Object.keys(obj)) {
      strMap.set(k, obj[k])
    }
    return strMap
  }

  static covertTimeStamp(timestamp) {
    let endIndex = timestamp.indexOf('T')
    return timestamp.substring(0, endIndex)
  }

  // 传入的参数是否为object类型
  static isObjType(obj) {
    if (typeof obj === 'object') {
      return obj.length === undefined
    }
    return false
  }

}