export default class HttpCache {

  /*
  保存页面数据
  dataId:页面数据id
  data:数据
  */
  static savaPageData(dataId, data) {
    window.localStorage.setItem(dataId, JSON.stringify(data))
  }

  /*
  获取页面数据
  dataId:页面数据id
  */
  static getPageData(dataId) {
    return JSON.parse(window.localStorage.getItem(dataId))
  }

  /*
  根据id删除对应页面数据
  dataId:页面数据id
  */
  static clearPageDataById(dataId) {
    window.localStorage.removeItem(dataId)
  }
}