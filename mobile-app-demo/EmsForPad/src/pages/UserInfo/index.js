import React, {Component} from 'react';
import {Text, View, Image, ScrollView, ViewStyle, StyleSheet, Alert} from 'react-native';
import {Accordion,WhiteSpace, WingBlank, InputItem, Flex, List,Checkbox,Progress,Button} from 'antd-mobile-rn';
import Server from '../../utils/Server'
import globalData from '../../config/globalData'
import axios from "axios/index";
const Item = List.Item;
const Brief = Item.Brief;

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
			symptom:''
		};
	};
	//初始化数据
	componentWillMount(){
		let self = this;
		console.log('currentCheckUserId' + globalData.currentCheckUserId);
		Server.getUserInfoById(globalData.currentCheckUserId,function (res) {
			var data = res.data;
			console.log(data)
			self.setState({
				Name:data.Name,
				IdCardNo:data.IdCardNo,
				GeneralSymptoms: data.GeneralSymptoms[0],
				symptom:data.symptom
			})
		})
	}
	render() {
		return (
			<View style={{ flex: 1 ,height:'100%'}}>
				<ScrollView style={{ flex: 1}} automaticallyAdjustContentInsets={false} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
					<List renderHeader={() => '用户信息'} >
					</List>
					<Accordion onChange={this.onChange} defaultActiveKey="2">
						<Accordion.Panel header="ID">
							<List>
								<List.Item>{this.state.IdCardNo}</List.Item>
							</List>
						</Accordion.Panel>
						<Accordion.Panel header="姓名">
							<List>
								<List.Item>{this.state.Name}</List.Item>
							</List>
						</Accordion.Panel>
						<Accordion.Panel header="症状">
							<List>
								<List.Item>{this.state.symptom}</List.Item>
							</List>
						</Accordion.Panel>
					</Accordion>
					<List renderHeader={() => '一般症状'} >
						<Item extra={this.state.GeneralSymptoms.HeightM} multipleLine>身高</Item>
						<Item extra={this.state.GeneralSymptoms.NibpAver} multipleLine>血压</Item>
						<Item extra={this.state.GeneralSymptoms.Temp} multipleLine>体温</Item>
						<Item extra={this.state.GeneralSymptoms.PR} multipleLine>脉率</Item>
						<Item extra={this.state.GeneralSymptoms.Weight} multipleLine>体重</Item>
						<Item extra={this.state.GeneralSymptoms.waistline} multipleLine>腰围</Item>
						<Item extra={this.state.GeneralSymptoms.agedLiveStatus} multipleLine>老年人生活状态自我评估</Item>
						<Item extra={this.state.GeneralSymptoms.agedSelfCareStatus} multipleLine>老年人生活自理能力自我评估</Item>
						<Item extra={this.state.GeneralSymptoms.agedCognitive} multipleLine>老年人认知功能</Item>
						<Item extra={this.state.GeneralSymptoms.agedEmotionStatus} multipleLine>老年人情感状态</Item>
					</List>
				</ScrollView>



			</View>
		);
		// console.log('渲染'+userListArr)

	}
}
