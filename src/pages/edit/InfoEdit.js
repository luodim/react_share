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
    this.handleSetData()
    this.infoMap = new Map()
    this.iptObj = {}
    Utils.copyCtrl(window, true)
  }

  // 处理传递过来的数据
  handleSetData() {
    let info = this.props.location.state
    this.state = {data:info, isLoading: false, isSubmit: false}
  }

  handleSubmit() {
    if (this.verifyValid()) {
      this.setState({isSubmit: true})
      let userId = Utils.getUserId()
      // 将url转为blob
      let imgUrl = this.iptObj['img_res']
      if (imgUrl) {
        if (this.state.data && this.stata.data.data) {
          if (this.state.data.data.img_res !== imgUrl) {

          }
        }
        this.iptObj['img_res'] = dataURL2Blob(imgUrl)
      }
      if (userId && userId !== '') { // user id存在，执行上传
        this.iptObj['contributor'] = userId
        let http = new HttpEventHelper()
        let event = Utils.buildEvents()
        let eventName = this.state.data ? 'updateTargetInfoReqCB' : 'uploadReqCB'
        event.on(eventName, result => {
          this.setState({isLoading: false, isSubmit:false})
          let status = result.status
          if (status === '200') { //上传成功跳转到首页
            this.props.history.push({pathname: '/home/home'})
          } else { // 上传失败
            // todo 提示上传失败
          }
        })
        this.state.data ? http.updateTargetInfo(event, eventName, this.iptObj, this.state.data.data.union_id) : http.uploadInfo(event, eventName, this.iptObj)
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
  verifyValid() {
    let data = this.iptObj
    if (Object.keys(data).length > 0) {
      if (this.state.data) { // 重新编辑，存在已有数据的情况
        let tempObj = {}
        Object.assign(tempObj, this.state.data.data, this.iptObj)
        let name = tempObj['name']
        let code = tempObj['code']
        let location = tempObj['location']
        let comment = tempObj['comment']
        let img = tempObj['img_res']
        if ((name && name !== '') || (code && code !== '') || (location && location !== '')
          || (comment && comment !== '') || (img && img !== '')) return true
      } else {
        for (let p in data) {
          if (data[p] && data[p] !== '') return true
        }
      }
    }
    return false
  }

  handleTextEdit(content, name) {
    this.iptObj[name] = content
  }

  handleImgEdit(content) {
    this.iptObj['img_res'] = content
  }

  render() {
  	return (
      <div>
        <TitleBar title='Edit'/>
  		  <form id='edit_upload' className='info_edit_page' onSubmit={() => this.handleSubmit()} target='nm_iframe' noValidate="novalidate">
		      <EditArea data={this.state.data} textIptCB={(content, type) => {this.handleTextEdit(content, type)}} isSubmit={this.state.isSubmit}/>
          <ImgUpload data={this.state.data} handleImgCB={(e) => this.handleImgEdit(e)}/>
          <SubmitBtn/>
  		  </form>
        <iframe name="nm_iframe" id='emptyframe'></iframe>
        <Loading isLoading={this.state.isLoading}/>
      </div>
    )
  }
}

export default withRouter(InfoEdit)