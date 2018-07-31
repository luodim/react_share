import React from 'react';
import ReactDOM from 'react-dom';
import MappingTable from './helper/router/MappingTable.js'
import RouterHelper from './helper/router/RouterHelper.js'
// import { Router, Route, Link, IndexRoute } from 'react-router'

import Home from './home/home.js'
import InfoEdit from './info_edit/InfoEdit.js'
import Detail from './detail/Detail.js'
import './index.css'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"

const splash = () => (<div>Hello Share</div>)

// const el = (
// 	<Router>
// 	  <div>
//        <Route path='/edit' component={InfoEdit}/>
//        <Route path='/home' component={Home}/>
//        <Route path='/detail' component={Detail}/>
//       </div>
//     </Router>)

const el = (
	<Router>
	  <Switch>
	    <Route exact path='/' render={props => (<div>Hello Share</div>)}/>
        <Route path='/edit' component={InfoEdit}/>
        <Route path='/home' component={Home}/>
        <Route path='/detail' component={Detail}/>
      </Switch>
    </Router>)

ReactDOM.render(el, document.getElementById('root'))

