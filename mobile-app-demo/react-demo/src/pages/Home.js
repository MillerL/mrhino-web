import React, {Component} from 'react';
import logo from '../res/MES-logo.svg';
import Flex from 'antd-mobile/lib/flex';
import WingBlank from 'antd-mobile/lib/wing-blank';
import WhiteSpace from 'antd-mobile/lib/white-space';
import Modal from 'antd-mobile/lib/modal';
import Button from 'antd-mobile/lib/button';
import InputItem from 'antd-mobile/lib/input-item';
import Toast from 'antd-mobile/lib/toast';
import ActivityIndicator from 'antd-mobile/lib/activity-indicator';
import '../css/App.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import '../utils/config';

// const GETINFO_URL = 'http://39.106.52.140:1337/Mesuattest?_limit=1&_start=0'; //测试用API
const defaultIp = 'http://192.168.1.221:23412'; //默认IP
const GETINFO_URL = '/httpServer/getHealthData';  //本地默认获取数据地址
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
			userInfo:{},

			hasError: false,
			ipAdress: ''   //IP地址
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
		// Modal.alert('父兄打算','大')
		this.showLoading();
		let ip = this.state.ipAdress;
		if (ip !== '') {
			if (/.*[\u4e00-\u9fa5]+.*$/.test(ip)) { //判断是否有汉字
				Toast.info('请输入有效的IP地址');
			}else {
				//按照用户输入IP进行请求
				getData('http://' + ip + GETINFO_URL);
			}
		} else {
			//如果没有输入，使用默认地址
			getData(defaultIp + GETINFO_URL);
		};

		//请求接口
		function getData(url) {
			axios.get(url).then(response => {
				Modal.alert('response',response);
				/*if(response.status == 200){
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

				}else {
					//返回错误
					this.setState({ animating: !this.state.animating }); //关闭loading
					this.showModal('modal1');
					console.log(response)
				}*/
			})
		}

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
	/*showModal2 = () => {
		console.log("showModal2")
		// e.preventDefault(); // 修复 Android 上点击穿透
		this.setState({
			modal1: true
		});
	}*/
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



	/*输入事件*/
	onErrorClick = () => {
		if (this.state.hasError) {
			Toast.info('请输入有效的IP地址');
		}
	}
	onChange = (value) => {
		/*if (value.replace(/[^\w\.\/]/ig,'')) {
			this.setState({
				hasError: true,
			});
		} else {
			this.setState({
				hasError: false,
			});
		}*/
		this.setState({
			ipAdress:value
		});
	}
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo"/>
					<h1 className="App-title">Welcome to MES</h1>
				</header>

				<div className='input-con'>
					<WhiteSpace size="lg"/>
					<InputItem
						clear
						placeholder = {defaultIp}
						error={this.state.hasError}
						onErrorClick={this.onErrorClick}
						onChange={this.onChange}
						value={this.state.ipAdress}
					>请输入IP</InputItem>
				</div>

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
					<Flex wrap="wrap"></Flex>
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
