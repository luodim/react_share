import React from 'react'
import './InfoEdit.css'
import TitleBar from '../../components/title_bar/TitleBar.js'
import EditArea from '../../components/edit_area/EditArea.js'
import ImgUpload from '../../components/img_upload/ImgUpload.js'
import SubmitBtn from '../../components/submit-btn/SubmitBtn.js'
import HttpEventHelper from '../../http/HttpEventHelper.js'
import Utils from '../../helper/Utils.js'
import {withRouter} from 'react-router-dom'
import {dataURL2Blob} from '../../helper/ImgHelper.js'
import Loading from '../../components/loading/Loading.js'

class InfoEdit extends React.Component {
  constructor(props) {
    super(props)
    this.infoMap = new Map()
    this.state = {isLoading: false}
  }

  handleSubmit() {
    if (this.verifyValid(this.infoMap)) {
      let userId = Utils.getUserId()
      // 将url转为blob
      let imgUrl = this.infoMap.get('img_res')
      this.infoMap.set('img_res', dataURL2Blob(imgUrl))
      if (userId && userId !== '') { // user id存在，执行上传
        this.infoMap.set('contributor', userId)
        let http = new HttpEventHelper()
        let event = Utils.buildEvents()
        let eventName = 'uploadReqCB'
        event.on(eventName, result => {
          this.setState({isLoading: false})
          let status = result.status
          if (status === '200') { //上传成功跳转到首页
            this.props.history.push({pathname: '/home'})
          } else { // 上传失败
            // todo 提示上传失败
          }
        })
        http.uploadInfo(event, eventName, this.infoMap)
        this.setState({isLoading: true})
      } else { // user id不存在，跳转到登录页面重新登录
        this.props.history.push({pathname: '/login'})
      }
    } else {
      // todo 提示
      console.log('please fill at least 1 item')
    }
  }

  // 输入有效性验证，至少填写一项
  verifyValid(map) {
    for (let item of map.entries()) {
      if (item[1] && item[1] !== '') return true
    }
    return false
  }

  handleTextEdit(content, name) {
    this.infoMap.set(name, content)
  }

  handleImgEdit(content) {
    this.infoMap.set('img_res', content)
  }

  render() {
  	return (
      <div>
        <TitleBar title='Edit'/>
  		  <form id='edit_upload' className='info_edit_page' onSubmit={() => this.handleSubmit()} target='nm_iframe'>
		      <EditArea textIptCB={(content, type) => {this.handleTextEdit(content, type)}}/>
          <ImgUpload handleImgCB={(e) => this.handleImgEdit(e)}/>
          <SubmitBtn/>
  		  </form>
        <iframe name="nm_iframe" id='emptyframe'></iframe>
        <Loading isLoading={this.state.isLoading}/>
      </div>
    )
  }
}

export default withRouter(InfoEdit)