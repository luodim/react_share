import React from 'react';
import ReactDOM from 'react-dom';
import Home from './pages/home/home.js'
import InfoEdit from './pages/edit/InfoEdit.js'
import Detail from './pages/detail/Detail.js'
import Splash from './pages/splash/Splash.js'
import Login from './pages/login/Login.js'
import Toast from './components/toast/Toast.js'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import { Helmet } from "react-helmet"
import { Provider as Store } from 'mobx-react'
import { stores } from './store/CommonStore.js'
import './index.css'

const headConfig = (
  <Helmet>
    <meta charSet="utf-8" />
    <title>ShareHub</title>
    <link rel="shortcut icon" href="/share_hub_logo.png" />
  </Helmet>)

const el = (
    <div className='application'>
      {headConfig}
      <Store store={stores}>
      <div className='app_container'>
	      <Router>
	        <Switch>
	          <Route exact path='/' component={Splash}/>
	          <Route path='/login' component={Login}/>
            <Route path='/edit' component={InfoEdit}/>
            <Route path='/home' component={Home}/>
            <Route path='/detail' component={Detail}/>
          </Switch>
        </Router>
      <Toast/>
      </div>
      </Store>
    </div>)

ReactDOM.render(el, document.getElementById('root'))

