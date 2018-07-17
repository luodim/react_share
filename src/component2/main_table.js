/*
main table
	- search bar
	- result table
		- sport table
			- football
			- baseball
			- basketball
		- electronic
			- iPod touch
			- iPhone5
			- Nexus
*/

import React from 'react'
import SearchBar from './search_bar.js'
import ResultTable from './result_table.js'

export default class MainTable extends React.Component {
  constructor(props) {
    super(props)
    this.testData = [
  	  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
      {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  	  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  	  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  	  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  	  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
	];
  }

  render() {
  	return (
  	  <div>
  	  	<SearchBar hint='Search...'/>
  	  	<ResultTable goodsList={this.testData}/>
  	  </div>
  	)
  }

}