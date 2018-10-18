import React, {Component} from 'react';
import {Text, View, Image, ScrollView, ViewStyle, StyleSheet, Alert} from 'react-native';
import {WhiteSpace, WingBlank, InputItem, Flex, List, Checkbox,Progress,Button} from 'antd-mobile-rn';
import Server from '../../utils/Server'
import globalData from '../../config/globalData';
import axios from "axios/index";
import UserInfo from "../UserInfo";
const Item = List.Item;


export default class UserList extends Component{
	static navigationOptions = {
		// 设置 title
		title: "首页"
	};

	constructor(props) {
		super(props);
		this.navigation = props.navigation;
		this.state = {
			userList:[]
		};
	};
	//初始化数据
	componentWillMount(){
		let self = this;
		console.log('初始化数据');
		Server.getUserList(function (res) {
			console.log(res)
			var dataObj = res.data;
			console.log(dataObj)
			// this.state.userList = dataObj;
			self.setState({
				userList: dataObj
			})
		})
	}
	//通过用户身份证信息查询数据
	showUserInfo(IdCardNo){
		console.log(IdCardNo)
		globalData.currentCheckUserId = IdCardNo; //把身份证存储到 待查看的身份信息
		this.props.navigation.navigate('UserInfo')
	}

	render() {
		if(this.state.userList.length === 0){
			return (
				<View style={{ flex: 1 ,height:'100%'}}>
					<ScrollView style={{ flex: 1}} automaticallyAdjustContentInsets={false} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
						<List renderHeader={() => '用户列表'} >

						</List>
					</ScrollView>
				</View>
			)
		}else {
			return (
				<View style={{ flex: 1 ,height:'100%'}}>
					<ScrollView style={{ flex: 1}} automaticallyAdjustContentInsets={false} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
						<List renderHeader={() => '用户列表'} >

							{
							this.state.userList.map((item,id)=>{
							return(
								<View key={id}>
									<Item onClick={() => this.showUserInfo(item.IdCardNo)} thumb="https://os.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png" arrow="horizontal">
										{item.Name}
									</Item>
								</View>
							)
						})}
						</List>
					</ScrollView>

				</View>
			);
		}
		// console.log('渲染'+userListArr)

	}
}
