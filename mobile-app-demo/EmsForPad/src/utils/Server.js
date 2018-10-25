import React, {Component} from 'react';
import {Alert} from 'react-native';
import {ActivityIndicator} from 'antd-mobile-rn';
import axios from 'axios';
const qs = require('qs');
import globalData from '../config/globalData'
import Util from '../utils/Util'
import config from "../config/config";


const BASE_URL = 'http://39.106.52.140:1337/Mesuat/';  //服务器API链接
const Equipment_ipAddress = 'http://192.168.199.176'; //本地设备API链接，需用本地网络
const Equipment_extra = ':23412/httpServer/getHealthData';
const Equipment_token = 'fawehdty7319isbs'; //设备固定token,

class Server extends React.Component {
	static showAlert(msg) {
		Alert.alert('提示', msg);
	}

	//拿到已经获取到的身份证ID去请求设备数据
	static getUserHealthInfoById(cardId, ipAddress, callback, callbackError) {
		console.log('取到的身份证ID去请求设备数据')
		let mydata = {
			Token: Equipment_token,
			IdCardNo: cardId
		};
		let options = {
			method: 'POST',
			headers: {'content-type': 'application/x-www-form-urlencoded'},
			data: mydata,
			url: Equipment_ipAddress + Equipment_extra,
		};
		if(ipAddress != ''){
			options.url = ipAddress + Equipment_extra;
		}

		console.log(options)
		axios(options).then((response) => {
				console.log(response);
				callback(response);

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
	//post 创建新用户请求 ++ 设备数据
	static postNewUserWithEquimentData(cardId, Name, equimentData, callback) {
		//先把设备数据同步到 global data
		Server.syncEquipmentToGlobalData(equimentData);
		let generalSymptoms= globalData.userInfo.GeneralSymptoms;
		var data = {
			IdCardNo: cardId,
			Name:Name,
			GeneralSymptoms:generalSymptoms
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
		axios.get(BASE_URL +'?_limit=40&_sort=createdAt:desc')
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
		}else {
			globalData.userInfo.symptom = '';
		}
		if(data.otherSymptom){
			globalData.userInfo.otherSymptom = data.otherSymptom;
		}else {
			globalData.userInfo.otherSymptom = '';
		}
		if(data.GeneralSymptoms){
			globalData.userInfo.GeneralSymptoms = data.GeneralSymptoms;
		}else {
			cleanData(globalData.userInfo.GeneralSymptoms);
		}
		if(data.lifeStyle){
			globalData.userInfo.lifeStyle = data.lifeStyle;
		}else {
			cleanData(globalData.userInfo.lifeStyle);
		}

		for (var j = 0; j < config.configLifeStyle.foodHabit.length; j++) {
			var obj = config.configLifeStyle.foodHabit[j];
			obj.checkStatus = false
		}
		for (var j = 0; j < config.checkList.length; j++) {
			var obj = config.checkList[j];
			obj.checkStatus = false
		}

		function cleanData(arr) {
			var data = arr[0];
			for(let j in data){
				data[j] = ''
			}
		}

		// console.log('与服务器下载同步数据' + globalData.userInfo)
		//如果有设备数据，则同步到 global data 里
		if(globalData.userHealthInfoFromEquenment.length > 0){
			Server.syncEquipmentToGlobalData(globalData.userHealthInfoFromEquenment[0]);
		}

		console.log('进度' + Util.updateTotalProgress())
		globalData.inputProgress = Util.updateTotalProgress();
		console.log(globalData)
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
		console.log(generalSymptoms)
		console.log(globalData.userInfo.GeneralSymptoms[0])
	}
}

module.exports = Server