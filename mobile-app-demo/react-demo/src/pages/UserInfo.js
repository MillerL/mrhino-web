import React, {Component} from 'react';
import WhiteSpace from 'antd-mobile/lib/white-space';
import List from 'antd-mobile/lib/list';
// import { List } from 'antd-mobile/lib/list-view';
import userIcon from '../res/user-default.png';
import axios from 'axios'
import {Link} from 'react-router-dom';
import ActivityIndicator from 'antd-mobile/lib/activity-indicator';
const GETINFO_URL = 'http://39.106.52.140:1337/Mesuaposttest';

const Item = List.Item;

class UserInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userData:{} //用户信息
		};
		/*this.userData = {
			// Message:'',
			// ResultCode:-1,
			// Name:'',
			// Gender:'',
			// DoctorName:'',
			// InstrumentName:'',
			// ItemList:'',
			// CheckDate:'',
			// IdCardNo:''
		}*/
	}
	//初始化数据
	componentWillMount(){
		let data = this.props.location.query;
		console.log(data);
		if(typeof data !== 'undefined'){
			let newData = JSON.parse(data);
			console.log(newData);
			this.setState({
				userData:newData
			})
		}
		// let {id,name,age} = data;
	}
	showOrCloseLoading = () => {
		this.setState({ animating: !this.state.animating });
	}
	render() {

		return <div className="main">
			<List renderHeader={() => '用户信息'}>
				打算
			</List>
		</div>
	}
}

export default UserInfo;