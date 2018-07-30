import React from 'react';
import ReactDOM from 'react-dom';
import MappingTable from './helper/router/MappingTable.js'
import RouterHelper from './helper/router/RouterHelper.js'
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router'

import Home from './home/home.js'
import InfoEdit from './info_edit/InfoEdit.js'
import Detail from './detail/Detail.js'
import './index.css'

const table = MappingTable.getInstance()
table.addToTable('home', <Home/>)
table.addToTable('edit', (<InfoEdit/>))
table.addToTable('detail', (<Detail/>))

RouterHelper.getInstance().routeTo('home')

// const Home = React.createClass({
//   render() {
//   	return <Home/>
//   }
// })

// const Edit = React.createClass({
//   render() {
//   	return <InfoEdit/>
//   }
// })

// const Detail = React.createClass({
//   render() {
//   	return <Detail/>
//   }
// })

// React.render(
// 	<Router history={hashHistory}>
//       <Route path="/home" component={Home}/>
//       <Route path="/edit" component={Edit}/>
//       <Route path="/detail" component={Detail}/>
// 	</Router>)

