export default class MappingTable {
  constructor() {
    this.table = new Map()
    this.attrMap = new Map()
  }

  static getInstance() {
    if (!this.instance) {
	    this.instance = new MappingTable()
	  }
	  return this.instance
  }

  addToTable(id, el) {
    this.table.set(id, el)
  }

  getElementById(id) {
    return this.table.get(id)
  }

  addToAttrMap(id, v) {
    this.attrMap.set(id, v)
    console.log(`total attrMap is ${this.attrMap}`)
  }

  getAttrMapById(id) {
    return this.attrMap.get(id)
  }

}