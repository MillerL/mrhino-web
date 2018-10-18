import React, {Component} from 'react';
import {Alert} from 'react-native';
import {ActivityIndicator} from 'antd-mobile-rn';
import axios from 'axios';
const qs = require('qs');
import globalData from '../config/globalData'

//POST
const getTokenUrl = 'https://aip.baidubce.com/oauth/2.0/token'; //获取token的链接
const apiUrlId = 'https://aip.baidubce.com/rest/2.0/ocr/v1/idcard';
const apiKey = 'a1jhOF0tGckqmMRSA7vgIGfP'; //应用的API Key
const secretKey = '2GfouEv4wtCQrK7KyYPH7Qjba2AS7Ap8'; //应用的Secret Key

const access_token = '24.941aaf01268249b4557185f0179af7aa.2592000.1542273356.282335-14441275';//要获取的Access Token；
const expires_in = '';//Access Token的有效期(秒为单位，一般为1个月)；


class BaiduOcrServer extends React.Component {
	//post 获取 token
	static getNewToken(callback) {
		const data = {
			grant_type: 'client_credentials',
			client_id: apiKey,
			client_secret: secretKey
		}
		axios.post(getTokenUrl, data)
			.then(function (response) {
				callback(response)
			})
			.catch(function (error) {
				// console.log(error);
				Alert.alert('提示', error);
			});
	}

	// POST ocr 获取身份证信息
	static getIdInfoByOcr(image, callback) {
		var myData = {
			id_card_side: 'front',
			image: image
		}
		var dataEnCode = qs.stringify(myData);
		// console.log(dataEnCode)
		axios({
			method: 'post',
			url: apiUrlId + '?access_token=' + access_token,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: dataEnCode// 直接传递内容
		})
			.then(function (response) {
				console.log(response);
				var data = response.data;
				if(data.image_status !== 'normal'){
						Alert.alert('提示', data.image_status);
				}else {
						let words_result = data.words_result;
						let idNumber = words_result['公民身份号码']['words'];
						let name = words_result['姓名']['words'];
						console.log(idNumber,name);
					  callback(idNumber,name);
				}
			})
			.catch(function (error) {
				// console.log(error);
				Alert.alert('提示', error);
				//如果Token过期，这里写重新获取token.

			});
	}

}

module.exports = BaiduOcrServer