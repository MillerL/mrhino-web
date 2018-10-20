import React, {Component} from 'react';
import {Text, View, Image, ScrollView, ViewStyle, StyleSheet, Alert} from 'react-native';
import {Accordion,WhiteSpace, WingBlank, InputItem, Flex, List,Checkbox,Progress,Button} from 'antd-mobile-rn';
import Server from '../../utils/Server'
import globalData from '../../config/globalData'
import axios from "axios/index";
import config from "../../config/config";
const Item = List.Item;
const Brief = Item.Brief;

let generalSymptomsArr =[]
let lifeStyleArr =[]

export default class UserInfo extends Component{
	static navigationOptions = {
		// 设置 title
		title: "首页"
	};
	onChange = (key: string) => {
		console.log(key);
	}
	constructor(props) {
		super(props);
		this.navigation = props.navigation;
		this.state = {
			IdCardNo:'',
			GeneralSymptoms:[],
			symptom:'',
			otherSymptom:'',
			lifeStyle:[]
		};
	};
	//初始化数据
	componentWillMount(){
		let self = this;
		console.log('currentCheckUserId' + globalData.currentCheckUserId);
		Server.getUserInfoById(globalData.currentCheckUserId,function (res) {
			var data = res.data[0];
			console.log(data)

			if(data.GeneralSymptoms){
				generalSymptomsArr = self.dealWithObjData(data.GeneralSymptoms[0],config.GeneralSymptomsString)
			}
			if(data.lifeStyle){
				lifeStyleArr = self.dealWithObjData(data.lifeStyle[0],config.lifeStyleString)
			}
			console.log(generalSymptomsArr)
			console.log(lifeStyleArr)
			self.setState({
				Name:data.Name,
				IdCardNo:data.IdCardNo,
				symptom:data.symptom || '',
				otherSymptom:data.otherSymptom || '',
				GeneralSymptoms: generalSymptomsArr,
				lifeStyle :lifeStyleArr
			})
		})
	}

	dealWithObjData = (obj,stringArr)=>{
		let newArr = [];
		for(i in obj){
			let mykey = stringArr[i];
			let newObj ={
				name:mykey,
				value:obj[i]
			}
			newArr.push(newObj);
		}
		return newArr;
	}
	render() {
		return (
			<View style={{ flex: 1 ,height:'100%'}}>
				<ScrollView style={{ flex: 1}} automaticallyAdjustContentInsets={false} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
					<List renderHeader={() => '用户信息'} >
						<Item extra={this.state.Name} multipleLine>姓名</Item>
						<Item extra={this.state.IdCardNo} multipleLine>ID</Item>
						<Item extra={this.state.symptom} multipleLine>症状</Item>
						<Item extra={this.state.otherSymptom} multipleLine>其他</Item>
					</List>

					<List renderHeader={() => '一般症状'} >
						{
							this.state.GeneralSymptoms.map((item,id)=>{
							return(
								<Item key={id} extra={item.value} multipleLine>{item.name}</Item>
							)
						})}
					</List>
					<List renderHeader={() => '生活方式'} >
						{
							this.state.lifeStyle.map((item,id)=>{
								return(
									<Item key={id} extra={item.value} multipleLine>{item.name}</Item>
								)
							})}
					</List>
				</ScrollView>



			</View>
		);
		// console.log('渲染'+userListArr)

	}
}
