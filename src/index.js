import React from 'react';
import ReactDOM from 'react-dom';
import Home from './home/home.js'
import InfoEdit from './info_edit/InfoEdit.js'
import Detail from './detail/Detail.js'
import Splash from './splash/Splash.js'
import Login from './login/Login.js'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import './index.css'

const el = (
	<Router>
	  <Switch>
	    <Route exact path='/' component={Splash}/>
	    <Route path='/login' component={Login}/>
        <Route path='/edit' component={InfoEdit}/>
        <Route path='/home' component={Home}/>
        <Route path='/detail' component={Detail}/>
      </Switch>
    </Router>)

ReactDOM.render(el, document.getElementById('root'))

