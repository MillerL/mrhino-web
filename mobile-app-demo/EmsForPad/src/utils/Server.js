import React, {Component} from 'react';
import {Alert} from 'react-native';
import {ActivityIndicator} from 'antd-mobile-rn';
import axios from 'axios';
import globalData from '../config/globalData'


const BASE_URL = 'http://39.106.52.140:1337/Mesuat/';
const MACHINE_URL = 'http://192.168.1.221:23412/httpServer/getHealthData';


class Server extends React.Component {
	static showAlert(msg){
		Alert.alert('提示', msg);
	}
	//post 创建新用户请求
	static  postNewUser(cardId, callback) {
		var data= {
			IdCardNo:cardId
		}
		axios.post( BASE_URL, data)
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
	static  getUserList(callback) {
		axios.get( BASE_URL)
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
	static  getUserInfo(id,callback) {
		console.log(BASE_URL + id)
		axios.get( BASE_URL + id)
			.then(function (response) {
				// console.log(response);
				callback(response)
			})
			.catch(function (error) {
				// console.log(error);
				Alert.alert('提示', error);
			});
	}

	//put 个人健康档案
	static  postHealthInfo(data, callback) {
		let uid = globalData.currentId;
		console.log(BASE_URL + uid);
		axios.put( BASE_URL + uid, data)
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