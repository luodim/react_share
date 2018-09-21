import React from 'react'
import {Item} from './IndicatorItem.js'
import './Indicator.css'

export default class Indicator extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
  	let el = this.props.list.map((v, index) => <Item key={v} text={v} index={index}/>)
  	return (<div className='indicator_outer'>{el}</div>)
  }
}