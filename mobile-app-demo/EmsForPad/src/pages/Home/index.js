import React, {Component} from 'react';
import {Text, View, Image, StyleSheet, TouchableHighlight, Alert} from 'react-native';
import PopupDialog, {DialogTitle} from 'react-native-popup-dialog';
import {ActivityIndicator, Card, WhiteSpace, WingBlank, InputItem, Flex, List, Checkbox, Button} from 'antd-mobile-rn';
import Spinner from 'react-native-loading-spinner-overlay';
import Server from '../../utils/Server';
import BaiduOcrServer from '../../utils/BaiduOcrServer';
import globalData from '../../config/globalData';
import UserList from "../UserList";
// import CameraButton from "../../utils/CameraButton";
import ImagePicker from 'react-native-image-picker';
import config from '../../config/config';
import Storage from '../../utils/DeviceStorage';


export default class Home extends Component {
	// 自定义当前页面路由配置，后面介绍的TabNavigator也使用这个对象中的属性
	static navigationOptions = {
		// 设置 title
		title: "首页"
	};

	constructor(props) {
		super(props);
		this.navigation = props.navigation;
		this.state = {
			ipAddress: '', //设备IP
			// token:'',  //设备Token
			spinner: false, //LOADING
			idNum: '', //身份ID
			Name: '',//用户姓名
			animating: false,
		}
	}

	//显示浮层
	showPopupLayer = () => {
		this.popupDialog.show();
	}
	//显示设置浮层
	showSetPopup = () => {
		this.setPopup.show();
	}
	//点击用户卡片
	gotoUserCase = () => {
		let self = this;
		if (self.state.idNum !== '') {
			//点击进入编辑用户健康档案
			self.setState({spinner: true});//显示LOADING
			//获取用户信息
			Server.getUserInfoById(self.state.idNum, function (res) {
				self.setState({spinner: false});//关闭LOADING
				let data = res.data;
				Server.syncGlobalData(data[0]); //同步用户数据到本地
				self.props.navigation.navigate('HomeTab');//跳转填写健康档案
			})
		} else {
			//用户为空
		}
	}
	//识别身份证
	openCamera = () => {
		let self = this;
		console.log('打开摄像')
		//通过获取设备相册图片
		ImagePicker.showImagePicker(config.image_picker_options, (response) => {
			if (response.didCancel) {
				console.log('User cancelled image picker');
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			} else if (response.customButton) {
				console.log('User tapped custom button: ', response.customButton);
			} else {
				var image = response.data;  //base64 data 并且encode
				self.setState({spinner: true});//显示LOADING
				//获取图片上面的文字
				BaiduOcrServer.getIdInfoByOcr(image, function (carId, name) {
					self.setState({idNum: carId, Name: name, spinner: false})
				})
			}

		})

	}
	//创建新用户
	creatNewUser = () => {
		let self = this;
		let cardId = self.state.idNum;
		let Name = self.state.Name;
		console.log('cardId=' + cardId);
		console.log('Name=' + Name);
		if (cardId != '') {
			//然后通过身份证ID获取设备信息
			self.setState({spinner: true});//显示LOADING
			let ipAddress = self.state.ipAddress;
			console.log(cardId, ipAddress);
			Server.getUserHealthInfoById(cardId, ipAddress, function (res) {
				self.setState({spinner: false});//关闭LOADING
				//获取数据成功,把获取到的设备数据存到 globalData
				let data = res.data;
				if (data.ResultCode != 0) {
					//异常
					self.popupDialog.dismiss();
					Alert.alert('提示', data.Message,
						[{text: 'OK', onPress: () => addNewUserNoEquimentData(cardId, Name)}], {cancelable: false});
				} else {
					globalData.userHealthInfoFromEquenment.push(data);
					self.popupDialog.dismiss();
					Alert.alert('提示', '获取设备数据成功',
						[{text: 'OK', onPress: () => addNewUserWithEquimentData(cardId, Name, data)}], {cancelable: false});
				}
			}, function (error) {
				/*网络有问题*/
				self.setState({spinner: false});//关闭LOADING
				//获取失败 --没有用户信息
				this.popupDialog.dismiss();
				Alert.alert('提示', '无法获取设备数据',
					[{text: 'OK', onPress: () => addNewUserNoEquimentData(cardId, Name)}], {cancelable: false});
			})
		} else {
			//输入值为空
			Server.showAlert('Id不能为空');
		}

		//没有设备数据的请求
		function addNewUserNoEquimentData(cardId, Name) {
			//先判断数据库里是否有该用户
			Server.getUserInfoById(cardId, function (res) {
				console.log(res)
				var data = res.data;
				if (data.length > 0) {
					//该用户存在 --获取用户数据--同步数据到本地
					console.log('有用户数据');
					Server.syncGlobalData(data[0]);
					globalData.currentDataId = data[0].id;
					self.props.navigation.navigate('HomeTab');//跳转填写健康档案
				} else {
					//该用户不存在-创建用户
					//创建新用户
					console.log('addNewUser')
					self.setState({spinner: true});//显示LOADING
					Server.postNewUser(cardId, Name, function (res) {
						console.log(res);
						self.setState({spinner: false});//关闭LOADING
						//拿到数据ID
						let id = res.data.id;
						globalData.currentDataId = id;
						globalData.userInfo.Name = Name;
						globalData.userInfo.IdCardNo = cardId;
						self.props.navigation.navigate('HomeTab');//跳转填写健康档案

					})
				}
				;

			})
		}

		//有设备数据的请求
		function addNewUserWithEquimentData(cardId, Name, equimentData) {
			//先判断数据库里是否有该用户
			Server.getUserInfoById(cardId, function (res) {
				console.log(res)
				var data = res.data;
				if (data.length > 0) {
					//该用户存在 --获取用户数据--同步数据到本地
					console.log('有用户数据');
					Server.syncGlobalData(data[0]);
					globalData.currentDataId = data[0].id;
					globalData.userInfo.Name = Name;
					globalData.userInfo.IdCardNo = cardId;
					self.props.navigation.navigate('HomeTab');//跳转填写健康档案
				} else {
					//该用户不存在-创建用户
					//创建新用户
					console.log('addNewUser')
					self.setState({spinner: true});//显示LOADING
					Server.postNewUserWithEquimentData(cardId, Name, equimentData, function (res) {
						console.log(res);
						self.setState({spinner: false});//关闭LOADING
						//拿到数据ID
						let id = res.data.id;
						globalData.currentDataId = id;
						globalData.userInfo.Name = Name;
						globalData.userInfo.IdCardNo = cardId;
						console.log(res);
						console.log(globalData)
						self.props.navigation.navigate('HomeTab');//跳转填写健康档案

					})
				}
				;

			})
		}
	}

	/*设置IP地址*/
	setIpAddress = () => {
		let self = this;
		self.setPopup.dismiss();
		//存到本地
		Storage.get('ipAddress').then((value) => {
			if(value){
				console.log('有IP='+value)
				Storage.update('ipAddress', self.state.ipAddress)
			}else {
				console.log('没有IP='+value)
				Storage.save('ipAddress', self.state.ipAddress)
			}
		});

	}

	//初始化
	componentWillMount() {
		let self = this;
		//取本地数据 IP
		Storage.get('ipAddress').then((value) => {
			if(value){
				console.log(value)
				self.setState({ipAddress: value})
			}
		});

		self.setState({
			idNum: globalData.userInfo.IdCardNo,
			Name: globalData.userInfo.Name
		})

	}

	render() {
		return (
			<View style={{height: '100%'}}>

				<View style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					paddingTop: 180,
					paddingLeft: 300,
					paddingRight: 300,
				}}>
					<WingBlank size="lg">
						<TouchableHighlight onPress={this.gotoUserCase}>
							<Card>
								<Card.Header
									title="用户"
									thumbStyle={{width: 30, height: 30}}
									thumb="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAELElEQVRYR7XXV6xmcxQF8N/oos1E96IEQ5QQNYPoZEQJordgIiJEJ6IFURO9BTNEl0wkeo3yoDwoEd2DLhi9Ez1rsr+b736+c86Vy05uJnfuPv//OnuvvfY6E4w95sdU7IGVsBiWwJ/4on7exJ24H7+M5egJY0haHOdgHwTE53gBn+ETzFlAlsIGWAQ/4yacWvmN17QBmAsn4iT8gfPxAF5qAT0vdsBBVa0fcRYuxO/DnmsCMAn3YQpuxrFdbzLk8LVwZgF6Btvj68G8YQBWxKNYErsXkDF0qjFlJ9xWLdsS7/RnDgIIsZ7HHFXC18Zzc9+zq1f7Qth1i7Cz/9wPIAR7CqthPbzyH13eO2YNPIe81MZF1FEAzivShe0p2f8Re+NW5K6QewRA5vl93FNz3nV5JiQkWxvLVH9vwfddD+JubIPlMKvXgmtrzkPAzHZTJD/IT6h578/7AZfh9KaRq+TJeB0zcEgOnAff4Ooat7aXSGv2wlu4BA/j3Rqxw4q4maBt8VfLQWnDzpgYAJHXCEyI8XTLQ7k4AKYjl/02JDcVOKK4dEHLWWlBwG8XAHnz3RDJbUOdqYjEblj6P+z8jO+zWKXO+7UBROQ7Uj4zAJ6sg1OJpshovoqw+PYOou1ZOVvgiZbcBzFfAKSfkcoDW5J3LPauimy8tgjJkpN9cENLYv42JQCyMNK72XPZEJvjcaw5BoFK+d/AfshoNsW54UsAfIsrcHJL8gK1SI7HpR0V6JF1HbzYknt2D0CkMfp/QMfBeZtUIpL6VUNuSJh2ZqdEU9rixkh+KvBQaUFI0xZZKJmE7IuthzieuXEVptUWndlx3mOZpgC4vAgTD9A0NjEZmf9IdiIVCIniGRLp+zFl1fJ79n604o4GEBnD7+I1AqBHsIxhqjEY+yLlinyGqHkwDidrtT9SnaNrN1yJBXEoIvODsVV5jqkBkJ/of4zkwQOZmyKlegS7DJQ9IxnTkphVzO89vkJdkIWTEc7Z/ZFW5cUm9ZZR3uhILI8PKzPMzzy/V1Ua6ukaSpz/XrSmYKFqzZeVG9C5I6Z1Wg9AZPht3IX9K/EUnFEGpUt8mnBkZcdBR2fSnsQ1pRGp0qf9jugoXIRdS/U+KF3PnhhPhD+R55B8o+LZcbg4h/YDCDNjuVfGaeVa0r97x3M7Mt7hUex5JuVlbFJWfxSA3BN3E9+WfxNBHa8wnog+xKzEd8QRRyFHzhxmy1OBqNnEYn5s2ngi5b++xnd9pLUj0fRhEoLEMm1WvUpL8hb/JuIXYz5jPkLEfFOG6KOi69swQpKtlQh744jiC+Lvh0W+C8Ob6Ek0JHEdDm9S2S4AOSCHhjyZkoXxU833RyVg+W5cGsuWW4pjzoqPcYkitn1L/oOEbSXOh0veKoYzX8ERlOyGbMDYq4+r1HE6PZfV2bK/Af3j5fqbtw09AAAAAElFTkSuQmCC"
									extra=">"
								/>
								<Card.Body>
									<View style={{height: 30, marginTop: 14}}>
										<Text style={{marginLeft: 16}}>{this.state.Name}</Text>
									</View>
								</Card.Body>
								<Card.Footer style={{marginBottom: 14}} content="IdCardNo" extra={this.state.idNum}/>
							</Card>
						</TouchableHighlight>

					</WingBlank>
					<WhiteSpace size="lg"/>

					<WingBlank style={{marginTop: 40}}>
						<WhiteSpace/>
						<Button type="primary" onClick={this.showPopupLayer}>读取个人健康档案</Button>
						<WhiteSpace/>
						<WhiteSpace/>
						<Button type="primary" onClick={() => this.props.navigation.navigate('UserList')}>用户列表</Button>
						<WhiteSpace/>
						<WhiteSpace/>
						{/*<Button type="primary" onClick={() => this.props.navigation.navigate('HomeTab')}>编辑当前用户信息</Button>*/}
						{/*<Button type="primary" onClick={this.openCamera}>打开摄像头</Button>*/}
						{/*<CameraButton photos={[]}/>*/}
						<WhiteSpace/>
						{/*<Button  disabled style={{marginTop:10}}>个人基本信息表</Button>*/}
						<WhiteSpace/>
					</WingBlank>
				</View>

				{/*右下角按钮*/}
				<View style={styles.setIcon}>
					<TouchableHighlight onPress={this.showSetPopup}>
						<Image style={{width: '100%', height: '100%'}} source={require('../../assets/info.png')}/>
					</TouchableHighlight>
				</View>

				<PopupDialog width={0.4} height={300} dialogTitle={<DialogTitle title="创建用户"/>} ref={(popupDialog) => {
					this.popupDialog = popupDialog;
				}}>
					<View style={{
						padding: 30,
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center'
					}}>
						<TouchableHighlight onPress={this.openCamera}>
							<Image style={styles.iconBase} source={require('../../assets/camera.png')}/>
						</TouchableHighlight>

						<InputItem
							clear
							type='number'
							labelNumber={6}
							value={this.state.idNum}
							onChange={(value: any) => {
								this.setState({
									idNum: value,
								});
							}}
							placeholder="请输入身份证号码"
						>
							ID
						</InputItem>
						<WhiteSpace/>
						<Button style={{marginTop: 20}} type="primary" onClick={this.creatNewUser}>读取设备信息</Button>
					</View>
				</PopupDialog>

				{/*	//设置浮层*/}
				<PopupDialog width={0.4} height={300} dialogTitle={<DialogTitle title="设置"/>} ref={(setPopup) => {
					this.setPopup = setPopup;
				}}>
					<View style={{
						padding: 30,
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center'
					}}>
						<InputItem
							clear
							labelNumber={6}
							value={this.state.ipAddress}
							onChange={(value: any) => {
								this.setState({
									ipAddress: value,
								});
							}}
							placeholder="http://192.168.199.176"
						>
							设备IP
						</InputItem>
						<WhiteSpace/>
						<Button style={{marginTop: 20}} type="primary" onClick={this.setIpAddress}>确定</Button>
					</View>
				</PopupDialog>

				<Spinner
					visible={this.state.spinner}
					textContent={'Loading...'}
					textStyle={styles.spinnerTextStyle}
				/>
			</View>


		);
	}
}

var styles = StyleSheet.create({
	spinnerTextStyle: {
		color: '#FFF'
	},
	iconBase: {
		width: 60,
		height: 60,
		marginBottom: 20
	},
	setIcon: {
		position: 'absolute',
		bottom: 30,
		right: 30,
		width: 60,
		height: 60,
		zIndex: 999
	}
})