import React, {Component} from 'react';
import Card from 'antd-mobile/lib/card';
import WhiteSpace from 'antd-mobile/lib/white-space';
import WingBlank from 'antd-mobile/lib/wing-blank';
import List from 'antd-mobile/lib/list';
import Accordion from 'antd-mobile/lib/accordion';
// import { List } from 'antd-mobile/lib/list-view';
import userIcon from '../res/user-icon.png';
import '../css/userInfo.css';
import homeIcon from '../res/home-icon.png';
import axios from 'axios'
import {Link} from 'react-router-dom';
import ActivityIndicator from 'antd-mobile/lib/activity-indicator';

const GETINFO_URL = 'http://39.106.52.140:1337/Mesuaposttest';

const Item = List.Item;

class UserInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userData: {} //用户信息
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
	componentWillMount() {
		let data = this.props.location.query;
		console.log(data);
		if (typeof data !== 'undefined') {
			let newData = JSON.parse(data);
			console.log(newData);
			this.setState({
				userData: newData
			})
		}
		// let {id,name,age} = data;
	}

	showOrCloseLoading = () => {
		this.setState({animating: !this.state.animating});
	}
	onChange = (key) => {
		// console.log(key);
	}

	render() {

		return <div className="main">
			<header className="header">
				<Link to='/'>
					<img src={homeIcon} className="homeIcon"/>
				</Link>
				用户信息
			</header>

			<WingBlank size="lg">
				<WhiteSpace size="lg"/>
				<Card>
					<Card.Header
						title={this.state.userData.Name}
						thumb={userIcon}
						extra={<span>{this.state.userData.Gender}</span>}
					/>
					<Card.Body>
						<div>医生:{this.state.userData.DoctorName}</div>
					</Card.Body>
					<Card.Footer content="IdCardNo" extra={<div>{this.state.userData.IdCardNo}</div>}/>
				</Card>

				<div style={{marginTop: 10, marginBottom: 10}}>

					{
						this.state.userData.ItemList.map((info, i) =>
							<Accordion key={i} defaultActiveKey="1" className="my-accordion" onChange={this.onChange}>
								<Accordion.Panel header={info.ItemName}
								                 className="pad">{info.ReportValue}</Accordion.Panel>
							</Accordion>
						)
					}

					{/*<Accordion defaultActiveKey="0" className="my-accordion" onChange={this.onChange}>
						<Accordion.Panel header="Title 2" className="pad">this is panel content2 or other</Accordion.Panel>
					</Accordion>*/}
				</div>

				<WhiteSpace size="lg"/>
			</WingBlank>
		</div>
	}
}


export default UserInfo;

