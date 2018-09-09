import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { HashRouter,BrowserRouter, Route, Link } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import Users from './pages/Users';
import Router from './utils/Router';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render( <Router/>, document.getElementById('root'));
registerServiceWorker();

/*ReactDOM.render((
	<HashRouter>
		<div>
			<Route path="/" component={Home}></Route>
			<Route path="/users" component={Users}>
				{/!*<Route path="/user/:userId" component={Users}/>*!/}
			</Route>
		</div>
	</HashRouter>
), document.getElementById('root'));
registerServiceWorker();*/
/*
React.render((
	<Router>
		<Route path="/" component={App}>
			{/!*<Route path="about" component={About}/>*!/}
			<Route path="users" component={Users}>
				{/!*<Route path="/user/:userId" component={Users}/>*!/}
			</Route>
			{/!*<Route path="*" component={NoMatch}/>*!/}
		</Route>
	</Router>
), document.getElementById('root'))
*/
