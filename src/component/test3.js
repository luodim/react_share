import React from 'react'

export default class Test3 extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {date: new Date()}
  }

  componentDidMount() {
    this.timer = setInterval(() => this.update(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  update() {
  	this.setState({date: new Date()})
  }

  render() {
  	return <div>
  	  	     <p>current time is {this.state.date.toLocaleTimeString()}</p>
  	  	   </div>
  }
}