import React, {Component} from 'react';
import {Alert} from 'react-native';
import {ActivityIndicator} from 'antd-mobile-rn';
import axios from 'axios';
const qs = require('qs');
import globalData from '../config/globalData'


const BASE_URL = 'http://39.106.52.140:1337/Mesuat/';  //服务器API链接
const Equipment_URL = 'http://192.168.1.221:23412/httpServer/getHealthData'; //本地设备API链接，需用本地网络
const Equipment_token = 'fawehdty7319isbs'; //设备固定token,

class Server extends React.Component {
	static showAlert(msg) {
		Alert.alert('提示', msg);
	}

	//拿到已经获取到的身份证ID去请求设备数据
	static getUserHealthInfoById(cardId, callback, callbackError) {
		var mydata = qs.stringify({
			Token: Equipment_token,
			IdCardNo: cardId
		});
		/*const options = {
			method: 'POST',
			headers: {'content-type': 'application/x-www-form-urlencoded'},
			data: mydata,
			Equipment_URL,
		};*/
		axios.post(Equipment_URL,mydata).then((response) => {
				// var string = JSON.stringify(response);
				console.log(response);
				callback(response);
				/*var ResultCode = response.ResultCode;
				if (ResultCode !== 0) {
					//结果代码。0：请求成功；其它：异常
				} else {

				}
				callback();*/
				/*if (response.status == 200) {
						let data = response.data[0];
						console.log(data);
						let newData = {
								Message: data.Message,
								ResultCode: data.ResultCode,
								Name: data.Name,
								Gender: data.Gender,
								DoctorName: data.DoctorName,
								InstrumentName: data.InstrumentName,
								ItemList: data.ItemList,
								CheckDate: data.CheckDate,
								IdCardNo: data.IdCardNo
						}
						console.log(newData)
						this.setState({userInfo: newData});
						//拿到数据随即POST到Mesuaposttest
						axios(POSTINFO_URL, {
								method: 'POST',
								data: newData,
								headers: {
										// 'Authorization': `bearer ${token}`,
										'Content-Type': 'application/json'
								}
						}).then(response => {

								this.showModal2();
								console.log(response)
						})

				} else {
						//返回错误
						this.showModal('modal1');
						console.log(response)
				}*/
			},
			(error) => {
				console.log(error)
				//没有本地网络
				// var string = JSON.stringify(error);
				callbackError(error)
			})
	}

	//post 创建新用户请求
	static postNewUser(cardId, callback) {
		var data = {
			IdCardNo: cardId
		}
		axios.post(BASE_URL, data)
			.then(function (response) {
				// console.log(response);
				callback(response)
			})
			.catch(function (error) {
				// console.log(error);
				Alert.alert('提示', error);
			});
	}

	//get 拉取用户列表
	static getUserList(callback) {
		axios.get(BASE_URL)
			.then(function (response) {
				// console.log(response);
				callback(response)
			})
			.catch(function (error) {
				// console.log(error);
				Alert.alert('提示', error);
			});
	}

	//get 拉取用户信息
	static getUserInfo(id, callback) {
		console.log(BASE_URL + id)
		axios.get(BASE_URL + id)
			.then(function (response) {
				// console.log(response);
				callback(response)
			})
			.catch(function (error) {
				// console.log(error);
				Alert.alert('提示', error);
			});
	}

	//put 更新个人健康档案
	static postHealthInfo(data, callback) {
		let uid = globalData.currentId;
		console.log(BASE_URL + uid);
		axios.put(BASE_URL + uid, data)
			.then(function (response) {
				// console.log(response);
				callback(response)
			})
			.catch(function (error) {
				// console.log(error);
				Alert.alert('提示', error);
			});
	}

}

module.exports = Server