import React from 'react'
import {withRouter} from 'react-router-dom'
import HttpEventHelper from '../../http/HttpEventHelper.js'
import Utils from '../../helper/Utils.js'
import TitleBar from '../../components/title_bar/TitleBar.js'
import './Account.css'

class Account extends React.Component {
  constructor(props) {
    super(props)
    this.state ={FingerCode: '', InvitationCode: '', InvitationCodeRelated: ''}
    Utils.copyCtrl(window, true)
  }

  componentDidMount() {
    let http = new HttpEventHelper()
    let userId = Utils.getUserId()
    let event = Utils.buildEvents()
    let eventName = 'getUserInfoCB'
    event.on(eventName, result => {
      if (result.status === '200') {
      	let data = result.data[0]
	    this.setState({FingerCode: data.finger_code, InvitationCode: data.invitation_code, InvitationCodeRelated:data.invitation_code_related})
      } else if (result.status === '300') {
      	this.props.history.push({pathname: '/login'})
      }
    })
    http.getUserInfo(userId, event, eventName)
  }

  render() {
  	return (
  		<div className='account_outer'>
  		  <TitleBar title='Account'/>
		  <p className='fc'>Finger code is: <br/>{this.state.FingerCode}</p>
		  <p>Invitation code is: <br/>{this.state.InvitationCode}</p>
		  <p>Invitation code related is: <br/>{this.state.InvitationCodeRelated}</p>
  		</div>)
  }
}

export default withRouter(Account)