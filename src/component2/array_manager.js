export default class arrayManager {
  constructor() {
  	this.nameMap = new Map()
  }

  getArrayByName(name) {
    if (!this.nameMap.has(name)) {
      this.nameMap.set(name, new Array())
    }
  	return this.nameMap.get(name)
  }

  convertToArray() {
    let array = new Array()
    this.nameMap.forEach((v, k) => {
      array.push(k)
      array = array.concat(v)
    })
    console.log(array)
    return array
  }

  getMap() {
  	return this.nameMap
  }
}