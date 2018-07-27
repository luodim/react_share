import React from 'react'
import './InfoEdit.css'
import TitleBar from './title_bar/TitleBar.js'
import EditCard from './edit_card/EditCard.js'

export default class InfoEdit extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
  	return (
  		<div className='info_edit_page'>
  		  <TitleBar/>
		    <EditCard/>
  		</div>)
  }
}