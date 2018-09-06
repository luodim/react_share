import React from 'react'
import ReactDOM from 'react-dom'
import icon from '../../asset/border-color.png'
import './float-button.css'
import { Link } from "react-router-dom"

export default class FloatButton extends React.Component {

  shouldComponentUpdate(newProps, newState) {
    return Object.keys(newProps).length > 0
  }

  render() {
    const el = (<div className='float_btn'><img className='float_icon' src={icon}/></div>)
  	return (<Link to='/edit'>{el}</Link>)
  }

}