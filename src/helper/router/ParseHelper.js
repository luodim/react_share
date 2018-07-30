import MappingTable from './MappingTable.js'
export default class ParseHelper {
  constructor() {
  }

  static parseUri(uri) {
      // 此demo简化uri格式，只有pageid号
      let attrMap = new Map()
      let pageId
      if (uri) {
        let array_1 = uri.split('?')
        if (array_1.length > 0) pageId = array_1[0]
        if (array_1.length > 1) {
          let array_2 = array_1[1].split('&')
          let array_3 = []
          if (array_2.length > 0) {
            for (let i = 0; i < array_2.length; i++) {
              array_3 = array_2[i].split('=')
              if (array_3.length > 0) {
                attrMap.set(array_3[0], array_3[1])
                console.log(`attr map is ${attrMap}`)
                MappingTable.getInstance().addToAttrMap(pageId, attrMap)
              }
            }
          }
        }
      }
      return pageId
    }
}