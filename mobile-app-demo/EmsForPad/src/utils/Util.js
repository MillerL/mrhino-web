import React, {Component} from 'react';
import {Alert} from 'react-native';
import {ActivityIndicator} from 'antd-mobile-rn';
import axios from 'axios';
const qs = require('qs');
import globalData from '../config/globalData'

class Util extends React.Component {
	static showAlert(msg) {
		Alert.alert('提示', msg);
	}

	//同步本地数据
	static updateTotalProgress(){
		 //计算总数据量
		let page0 = 4;
		let page1 = Object.keys(globalData.userInfo.GeneralSymptoms[0]).length;
		let page2 = Object.keys(globalData.userInfo.lifeStyle[0]).length;

		console.log(page1,page2)
		let total = page0+page1+page2;

		//计算已经填写量
		let fillNum = 0;
		if(globalData.userInfo.Name!==''){
			fillNum +=1;
		}
		if(globalData.userInfo.IdCardNo!==''){
			fillNum +=1;
		}
		if(globalData.userInfo.symptom!==''){
			fillNum +=1;
		}
		if(globalData.userInfo.otherSymptom!==''){
			fillNum +=1;
		}
		for (x in globalData.userInfo.GeneralSymptoms[0]) {
			if(globalData.userInfo.GeneralSymptoms[0][x] !== '') fillNum +=1;
		}
		for (i in globalData.userInfo.lifeStyle[0]) {
			if(globalData.userInfo.lifeStyle[0][i] !== '') fillNum +=1;
		}


		console.log(fillNum,total,fillNum/total*100)
		return Math.floor(fillNum/total*100)
	}

}

module.exports = Util