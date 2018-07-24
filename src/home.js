import React from 'react'
import Masonry from './masonry/masonry.js'
import FloatButton from './float_button/float-button.js'
import NavigationBar from './navigation_bar/navigation-bar.js'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
    this.state = {page: this.getPage('gallery'), scrollV: 0}
  }

  getPage(pageId) {
  	return pageId === 'gallery' ? (<Masonry scrollCtrl={(value) => this.scrollCtrl(value)}/>) : (<p>hahaha</p>)
  }

  changePage(pageId) {
    this.setState({page: this.getPage(pageId)})
  }

  test() {
    console.log('test is run')
  }

  scrollCtrl(value) {
    this.setState({page: this.getPage('gallery'), scrollV: value})
  }

  render() {
    return (
    	<div>
    	  <NavigationBar scrollValue={this.state.scrollV}/>
    	  <div className='page_container'><div className='add'></div>{this.state.page}</div>
    	  <FloatButton clickHandle={() => this.test()}/>
    	</div>)
  }
}