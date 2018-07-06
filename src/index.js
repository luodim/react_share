import React from 'react';
import ReactDOM from 'react-dom';
import Test from './component/test.js'
import Test2 from './component/test2.js'
import Test3 from './component/test3.js'
import Test4 from './component/test4.js'
import Test5 from './component/test5.js'
import Test6 from './component/test6.js'
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

ReactDOM.render(
    <h1>Hello, World!</h1>,
    document.getElementById('root')
  );

function getName(id) {
  return (id === 1) ? 'hahaha' : 'hehehe'
}

const element = (<p>Hellow {getName(1)}</p>)

ReactDOM.render(element, document.getElementById('root'))

function change() {
  const el = (
  	<div>
  	  <Test name='test'/>
  	  <Test2/>
  	  <Test3/>
  	  <Test4/>
  	  <Test5/>
  	  <Test6/>
  	</div>
  )
  ReactDOM.render(el, document.getElementById('root'))
}

setInterval(() => {change()}, 1000)

