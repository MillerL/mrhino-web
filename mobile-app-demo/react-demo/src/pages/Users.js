import React, {Component} from 'react';
import WhiteSpace from 'antd-mobile/lib/white-space';
import List from 'antd-mobile/lib/list';
// import { List } from 'antd-mobile/lib/list-view';
import userIcon from '../res/user-default.png';
import axios from 'axios'
import '../css/users.css';
import homeIcon from '../res/home-icon.png';
import {Link} from 'react-router-dom';
import ActivityIndicator from 'antd-mobile/lib/activity-indicator';
const GETINFO_URL = 'http://39.106.52.140:1337/Mesuaposttest';

const Item = List.Item;

class Users extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			disabled: false,
			animating:false,
			userListData:[]
			// userListData:this.props.userListData
		};
	}
	//初始化数据
	componentWillMount(){
		console.log('初始化数据');
		this.showOrCloseLoading(); //show loading
		axios.get(GETINFO_URL).then(response => {
			console.log(response);
			this.showOrCloseLoading(); //hide loading
			var data = response.data;
			console.log(data)
			this.setState({
				userListData:data
			})
			// return userListData;
		})
	}
	showOrCloseLoading = () => {
		this.setState({ animating: !this.state.animating });
	}

	gotoShowUserInfo = data =>() =>{
		var newData = JSON.stringify(data);
		var path = {
			pathname:'/UserInfo',
			query:newData,
		}
		this.props.history.push(path);
	}
	render() {

		return <div className="main">
			<header className="header">
				<Link to='/'>
					<img src={homeIcon} className="homeIcon"/>
				</Link>
				用户列表
			</header>

			<List renderHeader={() => ''}>
				{this.state.userListData.map((user,i) => <Item
					key={i}
					thumb={userIcon}
					arrow="horizontal"
					onClick={this.gotoShowUserInfo(user)}
				>{user.Name}</Item>)}
			</List>
		</div>
	}
}

export default Users;