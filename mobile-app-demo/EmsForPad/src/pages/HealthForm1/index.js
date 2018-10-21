import React, {Component} from 'react';
import {ScrollView, Text, TouchableWithoutFeedback, View, StyleSheet} from 'react-native';
import {Button, Flex, WhiteSpace, WingBlank, List, InputItem, Radio, Progress} from 'antd-mobile-rn';
import Server from "../../utils/Server";
import globalData from '../../config/globalData';
import config from '../../config/config';
import Util from "../../utils/Util";
// import view from './view';
const RadioItem = Radio.RadioItem;


export default class HealthForm1 extends Component<Props> {
	constructor(props) {
		super(props);
		this.navigation = props.navigation;
		this.state = {
			percent: 0,
			GeneralSymptoms: {
				Temp: '',//体温
				PR: '',//脉率
				Resp: '', //呼吸频率
				NibpAver: '',//血压（平均压）
				Height: '',//身高
				Weight: '',//体重
				waistline: '',//腰围
				bmi: '',//体质指数

				agedLiveStatus: '',//老年人生活状态自我评估
				agedSelfCareStatus: '', //老年人生活自理能力自我评估
				agedCognitive: '', //老年人认知功能
				agedEmotionStatus: '', //老年人情感状态

				intelligenceScore: '',//智力得分
				emotionScore: '',//抑郁评分得分
			},
		}
	}

	//同步数据
	syncData = () => {
		let self = this;
		let GeneralSymptoms = globalData.userInfo.GeneralSymptoms[0];
		GeneralSymptoms.agedLiveStatus = fintIndexInData(config.configData.agedLiveStatus, GeneralSymptoms.agedLiveStatus)
		GeneralSymptoms.agedSelfCareStatus = fintIndexInData(config.configData.agedSelfCareStatus, GeneralSymptoms.agedSelfCareStatus)
		GeneralSymptoms.agedCognitive = fintIndexInData(config.configData.agedCognitive, GeneralSymptoms.agedCognitive)
		GeneralSymptoms.agedEmotionStatus = fintIndexInData(config.configData.agedEmotionStatus, GeneralSymptoms.agedEmotionStatus)

		console.log(GeneralSymptoms);
		self.setState({GeneralSymptoms: GeneralSymptoms})

		function fintIndexInData(arr, value) {
			if (value != '') {
				for (var i = 0; i < arr.length; i++) {
					var obj = arr[i];
					if (obj == value) {
						var index = i.toString();
						return index
					}
				}
			}
		}
		//同步进度条
		self.setState({ percent: globalData.inputProgress });
	}
	//上传数据
	uploadData = () => {
		let self = this;
		var myData = self.state.GeneralSymptoms;
		//手动修改单选的值
		if (myData.agedLiveStatus != '') {
			var index = parseInt(myData.agedLiveStatus);
			myData.agedLiveStatus = config.configData.agedLiveStatus[index]//老年人生活状态自我评估
		}
		if (myData.agedSelfCareStatus != '') {
			var index = parseInt(myData.agedSelfCareStatus);
			myData.agedSelfCareStatus = config.configData.agedSelfCareStatus[index]//老年人生活自理能力自我评估
		}
		if (myData.agedCognitive != '') {
			var index = parseInt(myData.agedCognitive);
			myData.agedCognitive = config.configData.agedCognitive[index]//老年人认知功能
		}
		if (myData.agedEmotionStatus != '') {
			var index = parseInt(myData.agedEmotionStatus);
			myData.agedEmotionStatus = config.configData.agedEmotionStatus[index]//老年人情感状态]
		}

		let dataArr = [];
		dataArr.push(myData)
		console.log(dataArr);
		Server.postHealthInfo({GeneralSymptoms: dataArr}, function (res) {
			console.log(res)
			Server.showAlert('同步成功');
			let data = res.data;
			Server.syncGlobalData(data); //同步global数据
			//同步进度条
			self.setState({ percent: globalData.inputProgress });
		})
	}

	//更新数据setstate
	setData = (key, newValue) => {
		this.state.GeneralSymptoms[key] = newValue
		this.setState({GeneralSymptoms: this.state.GeneralSymptoms})
		console.log(this.state.GeneralSymptoms)
	}

  //初始化数据
	componentWillMount() {
		let self = this;
		self.syncData(); //初始化页面的时候同步数据
	}

	render() {
		return (
			<View style={{flex: 1, height: '100%'}}>
				<WhiteSpace />
				<View>
					<View style={{ marginRight: 10, height: 10, flex: 1 }}>
						<Progress percent={this.state.percent} style={{ height: 10}}/>
					</View>
					<Text style={{marginTop:10}}>填写进度 {this.state.percent}%</Text>
				</View>
				<WhiteSpace />

				<ScrollView style={{flex: 1}} automaticallyAdjustContentInsets={false} showsHorizontalScrollIndicator={false}
				            showsVerticalScrollIndicator={false}>
					<List renderHeader={() => '一般'} style={mystyles.flexStyle}>
						<Flex direction="row" justify="between" style={mystyles.flexStyle}>
							<Flex.Item style={mystyles.flexItemStyle}>
								<InputItem
									clear
									value={this.state.GeneralSymptoms.Temp}
									extra="℃"
									onChange={(value: any) => {
										this.setData('Temp', value);
									}}
									placeholder=""
								>
									体温
								</InputItem>
							</Flex.Item>
							<Flex.Item style={mystyles.flexItemStyle}>
								<InputItem
									clear
									value={this.state.GeneralSymptoms.PR}
									extra="次/分钟"
									onChange={(value: any) => {
										// this.setState({PR: value});
										this.setData('PR', value);
									}}
									placeholder=""
								>
									脉率
								</InputItem>
							</Flex.Item>
							<Flex.Item style={mystyles.flexItemStyle}>
								<InputItem
									clear
									value={this.state.GeneralSymptoms.Resp}
									onChange={(value: any) => {
										// this.setState({Resp: value});
										this.setData('Resp', value);
									}}
									extra="次/分钟"
									placeholder=""
								>
									呼吸频率
								</InputItem>
							</Flex.Item>
						</Flex>
						<Flex direction="row" justify="between">
							<Flex.Item style={mystyles.flexItemStyle}>
								<InputItem
									clear
									value={this.state.GeneralSymptoms.NibpAver}
									onChange={(value: any) => {
										// this.setState({NibpAver: value});
										this.setData('NibpAver', value);
									}}
									extra="mmHg"
									placeholder=""
								>
									血压
								</InputItem>
							</Flex.Item>
							<Flex.Item style={mystyles.flexItemStyle}>
								<InputItem
									clear
									value={this.state.GeneralSymptoms.Height}
									onChange={(value: any) => {
										// this.setState({HeightM: value});
										this.setData('Height', value);
									}}
									extra="CM"
									placeholder=""
								>
									身高
								</InputItem>
							</Flex.Item>
							<Flex.Item style={mystyles.flexItemStyle}>
								<InputItem
									clear
									value={this.state.GeneralSymptoms.Weight}
									onChange={(value: any) => {
										// this.setState({Weight: value});
										this.setData('Weight', value);
									}}
									extra="kg"
									placeholder=""
								>
									体重
								</InputItem>
							</Flex.Item>
						</Flex>
						<Flex direction="row" justify="between">
							<Flex.Item style={mystyles.flexItemStyle}>
								<InputItem
									clear
									value={this.state.GeneralSymptoms.waistline}
									onChange={(value: any) => {
										// this.setState({waistline: value});
										this.setData('waistline', value);
									}}
									extra="mmHg"
									placeholder=""
								>
									腰围
								</InputItem>
							</Flex.Item>
							<Flex.Item style={mystyles.flexItemStyle}>
								<InputItem
									clear
									value={this.state.GeneralSymptoms.bmi}
									onChange={(value: any) => {
										// this.setState({bmi: value});
										this.setData('bmi', value);
									}}
									extra="Kg/m2"
									placeholder=""
								>
									体质指数
								</InputItem>
							</Flex.Item>
							<Flex.Item style={mystyles.flexItemStyle}>

							</Flex.Item>
						</Flex>
					</List>


					<Flex direction="row" justify="between" align='start' style={mystyles.flexStyle}>
						<Flex.Item style={mystyles.flexItemColumnStyle}>
							<List renderHeader={() => '老年人健康状态自我评估*'}>
								<RadioItem
									checked={this.state.GeneralSymptoms.agedLiveStatus === '0'}
									onChange={(event: any) => {
										if (event.target.checked) {
											// this.setState({ agedLiveStatus: 0 });
											this.setData('agedLiveStatus', '0');
										}
									}}
								>
									满意
								</RadioItem>
								<RadioItem
									checked={this.state.GeneralSymptoms.agedLiveStatus === '1'}
									onChange={(event: any) => {
										if (event.target.checked) {
											// this.setState({ agedLiveStatus: 1 });
											this.setData('agedLiveStatus', '1');
										}
									}}
								>
									基本满意
								</RadioItem>
								<RadioItem
									checked={this.state.GeneralSymptoms.agedLiveStatus === '2'}
									onChange={(event: any) => {
										if (event.target.checked) {
											// this.setState({ agedLiveStatus: 2 });
											this.setData('agedLiveStatus', '2');
										}
									}}
								>
									说不清楚
								</RadioItem>
								<RadioItem
									checked={this.state.GeneralSymptoms.agedLiveStatus === '3'}
									onChange={(event: any) => {
										if (event.target.checked) {
											// this.setState({ agedLiveStatus: 3 });
											this.setData('agedLiveStatus', '3');
										}
									}}
								>
									不太满意
								</RadioItem>
								<RadioItem
									checked={this.state.GeneralSymptoms.agedLiveStatus === '4'}
									onChange={(event: any) => {
										if (event.target.checked) {
											// this.setState({ agedLiveStatus: 4 });
											this.setData('agedLiveStatus', '4');
										}
									}}
								>
									不满意
								</RadioItem>
							</List>
						</Flex.Item>
						<Flex.Item style={mystyles.flexItemColumnStyle}>
							<List renderHeader={() => '老年人生活自理能力自我评估*'}>
								<RadioItem
									checked={this.state.GeneralSymptoms.agedSelfCareStatus === '0'}
									onChange={(event: any) => {
										if (event.target.checked) {
											// this.setState({ agedSelfCareStatus: 0 });
											this.setData('agedSelfCareStatus', '0');
										}
									}}
								>
									可自理（0～3分）
								</RadioItem>
								<RadioItem
									checked={this.state.GeneralSymptoms.agedSelfCareStatus === '1'}
									onChange={(event: any) => {
										if (event.target.checked) {
											// this.setState({ agedSelfCareStatus: 1 });
											this.setData('agedSelfCareStatus', '1');
										}
									}}
								>
									轻度依赖（4～8分）
								</RadioItem>
								<RadioItem
									checked={this.state.GeneralSymptoms.agedSelfCareStatus === '2'}
									onChange={(event: any) => {
										if (event.target.checked) {
											// this.setState({ agedSelfCareStatus: 2 });
											this.setData('agedSelfCareStatus', '2');
										}
									}}
								>
									中度依赖（9～18分)
								</RadioItem>
								<RadioItem
									checked={this.state.GeneralSymptoms.agedSelfCareStatus === '3'}
									onChange={(event: any) => {
										if (event.target.checked) {
											// this.setState({ agedSelfCareStatus: 3 });
											this.setData('agedSelfCareStatus', '3');
										}
									}}
								>
									不能自理（≥19分）
								</RadioItem>
							</List>
						</Flex.Item>
						<Flex.Item style={mystyles.flexItemColumnStyle}>
							<List renderHeader={() => '老年人认知功能*'}>
								<RadioItem
									checked={this.state.GeneralSymptoms.agedCognitive === '0'}
									onChange={(event: any) => {
										if (event.target.checked) {
											// this.setState({ agedCognitive: 0 });
											this.setData('agedCognitive', '0');
										}
									}}
								>
									粗筛阴性
								</RadioItem>
								<RadioItem
									checked={this.state.GeneralSymptoms.agedCognitive === '1'}
									onChange={(event: any) => {
										if (event.target.checked) {
											// this.setState({ agedCognitive: 1 });
											this.setData('agedCognitive', '1');
										}
									}}
								>
									粗筛阳性
								</RadioItem>
								<InputItem
									clear
									type="number"
									value={this.state.intelligenceScore}
									onChange={(value: any) => {
										this.setData({'intelligenceScore': value});
									}}
									placeholder="简易智力状态检查"
								>
									总分
								</InputItem>
							</List>
						</Flex.Item>
						<Flex.Item style={mystyles.flexItemColumnStyle}>
							<List renderHeader={() => '老年人情感状态*'}>
								<RadioItem
									checked={this.state.GeneralSymptoms.agedEmotionStatus === '0'}
									onChange={(event: any) => {
										if (event.target.checked) {
											// this.setState({ agedEmotionStatus: 0 });
											this.setData('agedEmotionStatus', '0');
										}
									}}
								>
									粗筛阴性
								</RadioItem>
								<RadioItem
									checked={this.state.GeneralSymptoms.agedEmotionStatus === '1'}
									onChange={(event: any) => {
										if (event.target.checked) {
											// this.setState({ agedEmotionStatus: 1 });
											this.setData('agedEmotionStatus', '1');
										}
									}}
								>
									粗筛阳性
								</RadioItem>
								<InputItem
									clear
									type="number"
									value={this.state.emotionScore}
									onChange={(value: any) => {
										this.setState({
											emotionScore: value,
										});
									}}
									placeholder="老年人抑郁评分检查"
								>
									总分
								</InputItem>
							</List>
						</Flex.Item>
					</Flex>

				</ScrollView>

				<View style={mystyles.fixedBtn}>
					<Button type="primary" onClick={this.uploadData}>同步</Button>
				</View>
			</View>


		);
	}
}

const mystyles = StyleSheet.create({
	flexStyle: {
		marginBottom: 15
	},
	flexItemColumnStyle: {
		// marginBottom:10,
		marginRight: 20
	},
	flexItemStyle: {
		paddingBottom: 5,
		marginRight: 100
	},
	fixedBtn: {
		position: 'absolute',
		bottom: 0,
		right: 30,
		width: 120,
		height: 80,
		borderRadius: 100
	}
});
