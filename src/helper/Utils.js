import Fingerprint2 from 'fingerprintjs2'
import HttpCache from '../http/HttpCache.js'

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

  // 页面刷新时缓存数据的处理
  static handlePageRefresh(id) {
    if (id === 'home') {
      localStorage.removeItem(`target-scrollPos`)
      localStorage.removeItem(`taskList-scrollPos`)
      // todo
      HttpCache.clearPageDataById('reqHomeDataCB')
      HttpCache.clearPageDataById('reqTaskDataCB')
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

  // 处理页面状态恢复（是否恢复取决于是否从别的页面返回）
  static handleRestoreState(window, pageId, action, delayParam = 500, key = 'scrollPos') {
    if (action === 'POP') { // 说明是从上一个页面返回而非正常路由过来
      let value = window.localStorage.getItem(`${pageId}-${key}`)
      value = value ? parseFloat(value) : 0
      window.setTimeout(() => {
        window.scrollTo(0, -value)
      }, delayParam)
    }
  }

  // 当页面是加载后调用此方法，action判断此页面是否是从别的页面路由过来的
  static handlePageRoute(id, action) {
    if (id === 'home') {
      if (action === 'PUSH') { // 清除缓存数据
        localStorage.removeItem(`target-scrollPos`)
        localStorage.removeItem(`taskList-scrollPos`)
        HttpCache.clearPageDataById('reqHomeDataCB')
        HttpCache.clearPageDataById('reqTaskDataCB')
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

}