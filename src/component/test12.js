import React from 'react'

export default class Test12 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {res: 'https://keyassets.timeincuk.net/inspirewp/live/wp-content/uploads/sites/11/2017/06/Genius-900-Tuned_SCOTT-Sports_bike_Close-Up_2018_22-e1517576991890.jpg'}
  }

  render() {
    return (
    	<div className='container'>
    	  <img src={this.state.res}/>
    	</div>
    	)
  }
}