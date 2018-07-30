import React from 'react'
import ReactDOM from 'react-dom'
import MappingTable from './MappingTable.js'
import ParseHelper from './ParseHelper.js'

export default class RouterHelper {
	constructor() {
	  this.routerArray = []
	}

	static getInstance() {
	  if (!this.instance) {
	    this.instance = new RouterHelper()
	  }
	  return this.instance
	}

    routeTo(uri) {
      let pageId = ParseHelper.parseUri(uri)
      this.pushToArray(this.getElementById(pageId))
    }

    backTo(uri) {
      if (uri) { // 传入uri参数则根据uri参数发生back跳转
        //todo
      } else { // 不传入任何参数默认返回上一个page
        this.popFromArray()
        this.popFromArray()
      }
    }

    pushToArray(obj) {
      this.replaceContent(obj)
      this.routerArray.push(obj)
    }

    popFromArray() {
      this.routerArray.pop()
      let el = this.routerArray[this.routerArray.length - 1]
      this.replaceContent(el)
    }

    replaceContent(el) {
      ReactDOM.render(el, document.getElementById('root'))
    }

    getElementById(pageId) {
      const el = MappingTable.getInstance().getElementById(pageId)
      const map = MappingTable.getInstance().getAttrMapById(pageId)
      if (map) {
        map.forEach((v, k) => {
          console.log(`v is ${v}, k is ${k}`)
          // el.setAttribute(k, v)
        })
      }
      return el
    }

}