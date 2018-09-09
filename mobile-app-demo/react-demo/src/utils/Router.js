import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Home from '../pages/Home';
import Users from '../pages/Users';
import UserInfo from '../pages/UserInfo';


const BasicRoute = () => (
	<HashRouter >
		<Switch>
			<Route exact path="/" component={Home}/>
			<Route exact path="/users" component={Users}/>
			<Route exact path="/userInfo" component={UserInfo}/>
		</Switch>
	</HashRouter>
);

export default BasicRoute;
