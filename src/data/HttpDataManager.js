import {
  httpData,
  HTTP
} from './data_impl/HttpData'
import {
  dataManager,
  TYPE_SESSION
} from './DataManager.js'

/*
http数据请求管理类，不包含业务逻辑，只包含核心http请求方法，可复用
*/
const HttpDataManager = class HttpDataManager {

  /*
  根据请求名reqName分发请求
  */
  dispatchReq(params, reqName) {
    return httpData.getHttpReqResult(params, reqName)
  }

  /*
  处理请求
  url:请求url
  method:请求方法
  params:请求参数
  contentType:请求内容类型
  needSaveCache:是否需要存储缓存
  isPageReq:是否是分页请求
  */
  handleReq(api, method, params, contentType, needSaveCache = false, isPageReq = false) {
    let url = `${HTTP}${api}`
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

    return new Promise(resolve => {
      fetch(url, setObj)
        .then(response => {
          response.json().then(json => {
            resolve(json)
            this.saveCache(needSaveCache, isPageReq, api, json)
            console.log(json)
          })
        })
        .catch(err => {
          // todo
        })
    })

  }

  /*
  存储缓存
  needSaveCache:是否需要存储缓存
  isPageReq:是否是分页请求
  eventName:存储时作为key
  data:数据
  */
  saveCache(needSaveCache, isPageReq, dataName, data) {
    if (needSaveCache) { // 此次请求需要缓存数据
      let newData = Object.assign({}, data)
      if (isPageReq) { // 是分页请求
        // 先读取已有缓存
        let result = JSON.parse(dataManager.reqData(dataName, TYPE_SESSION))
        if (result && result.data.length > 0) { // 有数据，合并数据
          newData.data = result.data.concat(data.data)
        }
      }
      dataManager.setData(newData, dataName, TYPE_SESSION)
      console.log(`save cache---`)
    }
  }

  // 查看缓存
  checkCache(dataName) {
    return dataManager.reqData(dataName, TYPE_SESSION)
  }

  // 设置重定向响应
  setRedirect(event, eventName) {
    let json = {
      "message": "登录失效",
      "status": "300",
      "data": [],
      "timestamp": new Date().getTime()
    }
  }

  // 设置请求错误
  setReqError(event, eventName) {
    let json = {
      "message": "请求错误，请重试",
      "status": "400",
      "data": [],
      "timestamp": new Date().getTime()
    }
  }

}

const http = new HttpDataManager()

export {
  http
}