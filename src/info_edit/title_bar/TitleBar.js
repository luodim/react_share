import React from 'react'
import './TitleBar.css'

export default class TitleBar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
  	return (<div className='title_bar'>{this.props.title || 'Title Bar'}</div>)
  }
}