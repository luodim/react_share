import React from 'react';
import ReactDOM from 'react-dom';
import Home from './pages/home/home.js'
import InfoEdit from './pages/edit/InfoEdit.js'
import Detail from './pages/detail/Detail.js'
import Splash from './pages/splash/Splash.js'
import Login from './pages/login/Login.js'
import Toast from './components/toast/Toast.js'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import { Provider as Store } from 'mobx-react'
import { stores } from './store/CommonStore.js'
import './index.css'

const el = (
  <Store store={stores}>
	  <Router>
	    <Switch>
	      <Route exact path='/' component={Splash}/>
	      <Route path='/login' component={Login}/>
        <Route path='/edit' component={InfoEdit}/>
        <Route path='/home' component={Home}/>
        <Route path='/detail' component={Detail}/>
      </Switch>
    </Router>
  </Store>)

ReactDOM.render(el, document.getElementById('root'))

