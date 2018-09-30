import React from 'react';
import ReactDOM from 'react-dom';
import Home from './pages/home/home.js'
import InfoEdit from './pages/edit/InfoEdit.js'
import Detail from './pages/detail/Detail.js'
import Splash from './pages/splash/Splash.js'
import Login from './pages/login/Login.js'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import { createStore, combineReducers} from 'redux'
import { Provider } from 'react-redux'
import { rootReducer } from './reducers/IndicatorReducer.js'
import './index.css'

const store = createStore(rootReducer)

const el = (
    <Provider store={store}>
	  <Router>
	    <Switch>
	      <Route exact path='/' component={Splash}/>
	      <Route path='/login' component={Login}/>
          <Route path='/edit' component={InfoEdit}/>
          <Route path='/home' component={Home}/>
          <Route path='/detail' component={Detail}/>
        </Switch>
      </Router>
    </Provider>)

ReactDOM.render(el, document.getElementById('root'))

