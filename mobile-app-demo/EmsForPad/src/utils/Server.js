import React, {Component} from 'react';
import {Alert} from 'react-native';
import {ActivityIndicator} from 'antd-mobile-rn';
import axios from 'axios';


const BASE_URL = 'http://39.106.52.140:1337/Mesuat';
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
}

module.exports = Server