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


//image-picker 配置
const options = {
	title: '拍照',
	// customButtons: [{ name: 'fb', title: 'Choose Photo' }],
	mediaType: 'photo',//'photo', 'video', or 'mixed' on iOS, 'photo' or 'video' on Android
	// maxWidth:2000,
	// maxHeight:1200,
	quality: 0.6, //0 to 1, photos only
	storageOptions: {
		skipBackup: true,
		path: 'images',
	},
};

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
			spinner: false, //LOADING
			idNum: '', //身份ID
			Name:'',//用户姓名
			animating: false,
		}
	}

	//显示浮层
	showPopupLayer = () => {
		this.popupDialog.show();
	}

	//显示关闭loading
	showOrCloseLoading = () => {
		this.setState({animating: !this.state.animating});
	}

	openCamera = () => {
		let self = this;
		console.log('打开摄像')
		//通过获取设备相册图片
		ImagePicker.launchImageLibrary(options, (response) => {
			// console.log(response)
			var image = response.data;  //base64 data 并且encode
			var fileSize = response.fileSize; //文件体积

			//显示LOADING
			
			//获取图片上面的文字
			BaiduOcrServer.getIdInfoByOcr(image, function (carId,name) {
				self.setState({idNum:carId})
				self.setState({Name:name})
			})
		});
		/*ImagePicker.launchCamera(options, (response) => {
			// Same code as in above section!
			console.log(response)
			var data = response.data;
		});*/
	}
	//创建新用户
	creatNewUser = () =>{
		let self = this;
		let cardId = this.state.idNum;
		if (cardId != '') {
			//然后通过身份证ID获取设备信息
			Server.getUserHealthInfoById(cardId,function (data) {
				//获取数据成功,把获取到的设备数据存到 globalData
				globalData.userHealthInfoFromEquenment.push(data);
				addNewUser(cardId);
			},function (error) {
				//获取失败 --没有用户信息
					Alert.alert('提示', '没有和设备在一个局域网，无法获取设备数据',
					[{text: 'OK', onPress: () => addNewUser(cardId)}], { cancelable: false });
			})
		} else {
			//输入值为空
			Server.showAlert('输入值为空');
		}

		function addNewUser(cardId) {
			console.log('addNewUser')
			//先判断数据库里是否有该用户
			/*Server.getUserInfoById(cardId,function (res) {
				var data = res.data;
				if(data.length > 0){
					//该用户存在 --获取用户数据


				}else {
					//该用户不存在-创建用户
					//创建新用户
					Server.postNewUser(cardId, function (res) {
						console.log(res);
						//拿到数据ID
						let id = res.data.id;
						globalData.currentId = id;
						self.props.navigation.navigate('HomeTab');//跳转填写健康档案
					})
				}
			})
*/
		}
	}

	render() {
		return (
			<View style={{
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				paddingTop: 80,
				paddingLeft: 300,
				paddingRight: 300
			}}>
				<WingBlank size="lg">
					<Card>
						<Card.Header
							title="用户"
							thumbStyle={{width: 30, height: 30}}
							thumb="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAELElEQVRYR7XXV6xmcxQF8N/oos1E96IEQ5QQNYPoZEQJordgIiJEJ6IFURO9BTNEl0wkeo3yoDwoEd2DLhi9Ez1rsr+b736+c86Vy05uJnfuPv//OnuvvfY6E4w95sdU7IGVsBiWwJ/4on7exJ24H7+M5egJY0haHOdgHwTE53gBn+ETzFlAlsIGWAQ/4yacWvmN17QBmAsn4iT8gfPxAF5qAT0vdsBBVa0fcRYuxO/DnmsCMAn3YQpuxrFdbzLk8LVwZgF6Btvj68G8YQBWxKNYErsXkDF0qjFlJ9xWLdsS7/RnDgIIsZ7HHFXC18Zzc9+zq1f7Qth1i7Cz/9wPIAR7CqthPbzyH13eO2YNPIe81MZF1FEAzivShe0p2f8Re+NW5K6QewRA5vl93FNz3nV5JiQkWxvLVH9vwfddD+JubIPlMKvXgmtrzkPAzHZTJD/IT6h578/7AZfh9KaRq+TJeB0zcEgOnAff4Ooat7aXSGv2wlu4BA/j3Rqxw4q4maBt8VfLQWnDzpgYAJHXCEyI8XTLQ7k4AKYjl/02JDcVOKK4dEHLWWlBwG8XAHnz3RDJbUOdqYjEblj6P+z8jO+zWKXO+7UBROQ7Uj4zAJ6sg1OJpshovoqw+PYOou1ZOVvgiZbcBzFfAKSfkcoDW5J3LPauimy8tgjJkpN9cENLYv42JQCyMNK72XPZEJvjcaw5BoFK+d/AfshoNsW54UsAfIsrcHJL8gK1SI7HpR0V6JF1HbzYknt2D0CkMfp/QMfBeZtUIpL6VUNuSJh2ZqdEU9rixkh+KvBQaUFI0xZZKJmE7IuthzieuXEVptUWndlx3mOZpgC4vAgTD9A0NjEZmf9IdiIVCIniGRLp+zFl1fJ79n604o4GEBnD7+I1AqBHsIxhqjEY+yLlinyGqHkwDidrtT9SnaNrN1yJBXEoIvODsVV5jqkBkJ/of4zkwQOZmyKlegS7DJQ9IxnTkphVzO89vkJdkIWTEc7Z/ZFW5cUm9ZZR3uhILI8PKzPMzzy/V1Ua6ukaSpz/XrSmYKFqzZeVG9C5I6Z1Wg9AZPht3IX9K/EUnFEGpUt8mnBkZcdBR2fSnsQ1pRGp0qf9jugoXIRdS/U+KF3PnhhPhD+R55B8o+LZcbg4h/YDCDNjuVfGaeVa0r97x3M7Mt7hUex5JuVlbFJWfxSA3BN3E9+WfxNBHa8wnog+xKzEd8QRRyFHzhxmy1OBqNnEYn5s2ngi5b++xnd9pLUj0fRhEoLEMm1WvUpL8hb/JuIXYz5jPkLEfFOG6KOi69swQpKtlQh744jiC+Lvh0W+C8Ob6Ek0JHEdDm9S2S4AOSCHhjyZkoXxU833RyVg+W5cGsuWW4pjzoqPcYkitn1L/oOEbSXOh0veKoYzX8ERlOyGbMDYq4+r1HE6PZfV2bK/Af3j5fqbtw09AAAAAElFTkSuQmCC"
							extra=""
						/>
						<Card.Body>
							<View style={{height: 30, marginTop: 14}}>
								<Text style={{marginLeft: 16}}>{this.state.userName}</Text>
							</View>
						</Card.Body>
						<Card.Footer style={{marginBottom: 14}}
						             content="IdCardNo"
						             extra={this.state.idNum}
						/>
					</Card>
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


				<PopupDialog width={0.4} dialogTitle={<DialogTitle title="创建用户"/>} ref={(popupDialog) => {
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
						<Button style={{marginTop: 20}} type="primary" onClick={this.creatNewUser}>读取个人健康档案</Button>

						{/*<ActivityIndicator text="Loading..." />*/}

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
	}
})