import React from 'react'
import Title from './goods_title.js'
import Item from './goods_item.js'
import arrayManager from './array_manager.js'

export default class ResultTable extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
    this.maps = new arrayManager()
  }

  render() {
  	for (let goods of this.props.goodsList) {
	    this.maps.getArrayByName(goods.category).push(goods)
  	}
    let items = this.maps.convertToArray().map(v => {
      if (typeof v === 'string') {
        return (<li key={v}><Title name={v}/></li>)
      } else {
        return (<li key={v.name}><Item goodName={v.name} goodsPrice={v.price}/></li>)
      }
    })
    console.log(`items is ${items}`)
    return (
      <ul>{items}</ul>)
  }
}