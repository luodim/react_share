import React from 'react'
import './SubmitBtn.css'

export default class SubmitBtn extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
  	return (<div className='submit_btn_outer'><input className='submit_btn' type='submit' value='Submit'/></div>)
  }
}