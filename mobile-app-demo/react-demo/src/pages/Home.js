import React, {Component} from 'react';
import logo from '../res/MES-logo.svg';
import Flex from 'antd-mobile/lib/flex';
import WingBlank from 'antd-mobile/lib/wing-blank';
import WhiteSpace from 'antd-mobile/lib/white-space';
import Modal from 'antd-mobile/lib/modal';
import Button from 'antd-mobile/lib/button';
import ActivityIndicator from 'antd-mobile/lib/activity-indicator';
import '../css/App.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import '../utils/config';

const GETINFO_URL = 'http://39.106.52.140:1337/Mesuattest?_limit=1&_start=0';
const POSTINFO_URL = 'http://39.106.52.140:1337/Mesuaposttest';

function closest(el, selector) {
	const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
	while (el) {
		if (matchesSelector.call(el, selector)) {
			return el;
		}
		el = el.parentElement;
	}
	return null;
}

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal1: false, //popup
			animating: false, //loaidng
			userInfo:{}
		};
		this.gotoUsers = this.gotoUsers.bind(this);
		this.clickGetRequest = this.clickGetRequest.bind(this)
	}

	//跳转页面
	gotoUsers() {
		this.props.history.push('/users')
	}
	//获取信息
	clickGetRequest(){
		this.showLoading();
		axios.get(GETINFO_URL).then(response => {

			if(response.status == 200){
				let data = response.data[0];
				console.log(data);
				let newData = {
					Message:data.Message,
					ResultCode:data.ResultCode,
					Name:data.Name,
					Gender:data.Gender,
					DoctorName:data.DoctorName,
					InstrumentName:data.InstrumentName,
					ItemList:data.ItemList,
					CheckDate:data.CheckDate,
					IdCardNo:data.IdCardNo
				}
				console.log(newData)
				this.setState({userInfo:newData});
				//拿到数据随即POST到Mesuaposttest
				axios(POSTINFO_URL,{
					method: 'POST',
					data : newData,
					headers: {
						// 'Authorization': `bearer ${token}`,
						'Content-Type': 'application/json'
					}
				}).then(response => {
					this.setState({ animating: !this.state.animating }); //关闭loading
					this.showModal2();
					console.log(response)
				})

			}
		})
	}
	showLoading = () => {
		this.setState({ animating: !this.state.animating });
		/*this.closeTimer = setTimeout(() => {
			this.setState({ animating: !this.state.animating });
		}, 1000);*/
	}
	showModal = key => () => {
		console.log("showModal")
		// e.preventDefault(); // 修复 Android 上点击穿透
		this.setState({
			[key]: true,
		});
	}
	showModal2 = () => {
		console.log("showModal2")
		// e.preventDefault(); // 修复 Android 上点击穿透
		this.setState({
			modal1: true
		});
	}
	onClose = key => () => {
		this.setState({
			[key]: false,
		});
	}
	onWrapTouchStart = (e) => {
		// fix touch to scroll background page on iOS
		if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
			return;
		}
		const pNode = closest(e.target, '.am-modal-content');
		if (!pNode) {
			e.preventDefault();
		}
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo"/>
					<h1 className="App-title">Welcome to MES</h1>
				</header>
				<div className="flex-container">
					{/*<div className="sub-title">Basic</div>*/}
					<WhiteSpace size="lg"/>
					<Flex>
						<Flex.Item>
							<Button onClick={this.clickGetRequest} type="primary">更新数据</Button>
						</Flex.Item>
					</Flex>
					<WhiteSpace size="lg"/>
					<Flex>
						<Flex.Item>
							<Button onClick={this.gotoUsers}>查看信息</Button>
							{/*<Button onClick={this.showModal('modal1')}>查看信息</Button>*/}
							{/*<Button onClick={this.showToast}>查看信息</Button>*/}

						</Flex.Item>
					</Flex>
					{/*<WhiteSpace size="lg" />*/}

					{/*<div className="sub-title">Wrap</div>*/}
					<Flex wrap="wrap">
					</Flex>

				</div>

				<div className="toast-example">
					<ActivityIndicator
						toast
						text="Loading..."
						animating={this.state.animating}
					/>
				</div>

				<Modal
					visible={this.state.modal1}
					transparent
					maskClosable={false}
					onClose={this.onClose('modal1')}
					title="成功！"
					footer={[{
						text: '确定', onPress: () => {
							console.log('确定');
							this.onClose('modal1')();
						}
					}]}
					wrapProps={{onTouchStart: this.onWrapTouchStart}}
				>
					<div>
						<div className="sub-title">数据更新完成</div>
					</div>
				</Modal>
			</div>
		);
	}
}

export default Home;
