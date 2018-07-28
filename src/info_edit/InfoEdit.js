import React from 'react'
import './InfoEdit.css'
import TitleBar from './title_bar/TitleBar.js'
import EditArea from './edit_area/EditArea.js'

export default class InfoEdit extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
  	return (
  		<div className='info_edit_page'>
  		  <TitleBar/>
		    <EditArea/>
  		</div>)
  }
}