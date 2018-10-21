class CookieDataManager {

  /*
  设置cookie过期时间
  expire:从当前时间计算多久后过期，单位ms
  */
  setCookieData(params, dataName) {
    let exp = new Date();
    let expire = params['expire'] && params['expire'] > 0 ? params['expire'] : 60 * 1000 * 60 * 24 * 3
    let data = params['data']
    exp.setTime(exp.getTime() + expire); //过期时间1年 60 * 1000 * 60 * 24 * 365
    document.cookie = `${dataName}=${data};expires=${exp.toGMTString()}`
  }

  /*根据dataName 获取cookie数据*/
  getCookieData(dataName) {
    if (document.cookie.length > 0) {
      let startIndex = document.cookie.indexOf(`${dataName}`)
      let endIndex
      if (startIndex !== -1) {
        startIndex = startIndex + (`${dataName}=`).length
        endIndex = document.cookie.indexOf(';', startIndex)
        endIndex = endIndex === -1 ? document.cookie.length : endIndex
        return document.cookie.substring(startIndex, endIndex)
      }
    }
    return ''
  }
}

const cookie = new CookieDataManager()
export { cookie }