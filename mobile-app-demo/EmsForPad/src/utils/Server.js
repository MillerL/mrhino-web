import React, {Component} from 'react';
import {Alert} from 'react-native';
import {ActivityIndicator} from 'antd-mobile-rn';
import axios from 'axios';
const qs = require('qs');
import globalData from '../config/globalData'
import Util from '../utils/Util'


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

	//post 获取用户信息
	static getUserInfoById(cardId, callback) {
		console.log('cardId'+cardId)
		axios.get(BASE_URL + '?IdCardNo=' +cardId)
			.then(function (response) {
				console.log(response)
				callback(response)
			})
			.catch(function (error) {
				Alert.alert('提示', error);
			});
	}
	//post 创建新用户请求
	static postNewUser(cardId, Name, callback) {
		var data = {
			IdCardNo: cardId,
			Name:Name
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

	/*//get 拉取用户信息
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
	}*/

	//put 更新个人健康档案
	static postHealthInfo(data, callback) {
		let uid = globalData.currentDataId;
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

	//同步本地数据
	static syncGlobalData(data){
		globalData.userInfo.Name = data.Name;
		globalData.userInfo.IdCardNo = data.IdCardNo;
		if(data.symptom){
			globalData.userInfo.symptom = data.symptom;
		}
		if(data.otherSymptom){
			globalData.userInfo.otherSymptom = data.otherSymptom;
		}
		if(data.GeneralSymptoms){
			globalData.userInfo.GeneralSymptoms = data.GeneralSymptoms;
		}
		if(data.lifeStyle){
			globalData.userInfo.lifeStyle = data.lifeStyle;
		}

		// console.log('与服务器下载同步数据' + globalData.userInfo)

		console.log('进度' + Util.updateTotalProgress())
		globalData.inputProgress = Util.updateTotalProgress();
	}
	//同步设备数据到本地
	static syncEquipmentToGlobalData(data){
		var ItemList = data.ItemList;
		let generalSymptoms= globalData.userInfo.GeneralSymptoms[0];
		for (var i = 0; i < ItemList.length; i++) {
			var obj = ItemList[i];
			if(obj['ItemCode'] == 'Height'){  //身高
				generalSymptoms.Height = obj['ReportValue']
			}
			if(obj['ItemCode'] == 'Weight'){ //身高
				generalSymptoms.Weight = obj['ReportValue']
			}
			if(obj['ItemCode'] == 'Temp'){ //体温
				generalSymptoms.Temp = obj['ReportValue']
			}
			if(obj['ItemCode'] == 'NibpAver'){ //平均压
				generalSymptoms.NibpAver = obj['ReportValue']
			}
			if(obj['ItemCode'] == 'HR'){ //心率
				generalSymptoms.HR = obj['ReportValue']
			}
			if(obj['ItemCode'] == 'PR'){ //脉率
				generalSymptoms.PR = obj['ReportValue']
			}
			if(obj['ItemCode'] == 'Resp'){ //呼吸率
				generalSymptoms.Resp = obj['ReportValue']
			}
		}
	}
}

module.exports = Server