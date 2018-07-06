import React from 'react'
import Test from './test.js'
export default class Test2 extends React.Component {
  render() {
  	return <div>
  		     <Test name='test1'/>
  		     <Test name='test2'/>
  		     <Test name='test3'/>
  		   </div>
  }
}