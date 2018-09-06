import React from 'react'
import './InfoEdit.css'
import TitleBar from '../../components/title_bar/TitleBar.js'
import EditArea from '../../components/edit_area/EditArea.js'
import ImgUpload from '../../components/img_upload/ImgUpload.js'
import SubmitBtn from '../../components/submit-btn/SubmitBtn.js'

export default class InfoEdit extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
  	return (
  		<form action='http://www.google.com' method='post' className='info_edit_page'>
  		  <TitleBar title='Edit'/>
		    <EditArea/>
        <ImgUpload/>
        <SubmitBtn/>
  		</form>)
  }
}