import React from 'react'

export default class Test5 extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {isLogin : false}
  	this.loginHandler = this.loginHandler.bind(this)
  	this.logoutHandler = this.logoutHandler.bind(this)
  }

  render() {
  	return this.state.isLogin ? (<button onClick={this.logoutHandler}>Logout</button>)
  	: (<button onClick={this.loginHandler}>Login</button>)
  }

  changeState(isLogin) {
    this.setState(isLogin)
  }

  loginHandler() {
    alert('please login first')
    this.changeState({isLogin : true})
  }

  logoutHandler() {
    alert('do you want to logout?')
    this.changeState({isLogin : false})
  }
}