import React from 'react';
import ReactDOM from 'react-dom';
import Home from './pages/home/home.js'
import InfoEdit from './pages/edit/InfoEdit.js'
import Detail from './pages/detail/Detail.js'
import Splash from './pages/splash/Splash.js'
import Login from './pages/login/Login.js'
import Account from './pages/account/Account.js'
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
        <Route path='/account' component={Account}/>
      </Switch>
    </Router>)

ReactDOM.render(el, document.getElementById('root'))

