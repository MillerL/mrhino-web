import React, {Component} from 'react';
import { ScrollView, Text, TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import { Button, Flex, WhiteSpace, WingBlank,List,InputItem, Radio } from 'antd-mobile-rn';
import Server from "../../utils/Server";
// import view from './view';
const RadioItem = Radio.RadioItem;
const configData = {
	agedLiveStatus:['满意','基本满意','说不清楚','不太满意','不满意'],
	agedSelfCareStatus:['可自理（0~3分）','轻度依赖（4~8分）','中度依赖（9~18分）','不能自理（≥19分）'],
	agedCognitive:['粗筛阴性','粗筛阳性'],
	agedEmotionStatus:['粗筛阴性','粗筛阳性']
}


export default class HealthForm1 extends Component<Props> {
	constructor(props) {
		super(props);
		this.navigation = props.navigation;
		this.state ={
			Temp:'',//体温
			PR:'',//脉率
			Resp:'', //呼吸频率
			NibpAver:'',//血压（平均压）
			Height:'',//身高
			Weight:'',//体重
			waistline: '',//腰围
			bmi: '',//体质指数

			agedLiveStatus: 0,//老年人生活状态自我评估
			agedSelfCareStatus: 0, //老年人生活自理能力自我评估
			agedCognitive: 0, //老年人认知功能
			agedEmotionStatus: 0, //老年人情感状态

			intelligenceScore: '',//智力得分
			emotionScore: '',//抑郁评分得分

		}
	}
	//同步数据
	syncData =()=>{
		//处理数据
		var data  = [{
			Temp:this.state.Temp,//体温
			PR:this.state.PR,//脉率
			Resp:this.state.Resp, //呼吸频率
			NibpAver:this.state.NibpAver,//血压（平均压）
			HeightM:this.state.Height,//身高
			Weight:this.state.Weight,//体重
			waistline: this.state.waistline,//腰围
			bmi: this.state.bmi,//体质指数
			agedLiveStatus: configData.agedLiveStatus[this.state.agedLiveStatus],//老年人生活状态自我评估
			agedSelfCareStatus: configData.agedSelfCareStatus[this.state.agedSelfCareStatus], //老年人生活自理能力自我评估
			agedCognitive: configData.agedCognitive[this.state.agedCognitive], //老年人认知功能
			agedEmotionStatus: configData.agedEmotionStatus[this.state.agedEmotionStatus], //老年人情感状态]
		}]
		console.log(data);
		Server.postHealthInfo({GeneralSymptoms:data},function (res) {
			console.log(res)
			Server.showAlert('同步成功');
		})
	}

	render() {
		return (
			<View style={{ flex: 1 ,height:'100%'}}>
				<ScrollView style={{ flex: 1}} automaticallyAdjustContentInsets={false} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
					<List renderHeader={() => '一般'} style={mystyles.flexStyle}>
						<Flex direction="row" justify="between" style={mystyles.flexStyle}>
							<Flex.Item style={mystyles.flexItemStyle}>
								<InputItem
									clear
									value={this.state.Temp}
									extra="℃"
									onChange={(value: any) => {
										this.setState({Temp: value});
									}}
									placeholder=""
								>
									体温
								</InputItem>
							</Flex.Item>
							<Flex.Item style={mystyles.flexItemStyle}>
								<InputItem
									clear
									value={this.state.PR}
									extra="次/分钟"
									onChange={(value: any) => {
										this.setState({PR: value});
									}}
									placeholder=""
								>
									脉率
								</InputItem>
							</Flex.Item>
							<Flex.Item style={mystyles.flexItemStyle}>
								<InputItem
									clear
									value={this.state.Resp}
									onChange={(value: any) => {
										this.setState({Resp: value});
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
									value={this.state.NibpAver}
									onChange={(value: any) => {
										this.setState({NibpAver: value});
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
									value={this.state.HeightM}
									onChange={(value: any) => {
										this.setState({HeightM: value});
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
									value={this.state.Weight}
									onChange={(value: any) => {
										this.setState({Weight: value});
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
									value={this.state.waistline}
									onChange={(value: any) => {
										this.setState({waistline: value});
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
									value={this.state.bmi}
									onChange={(value: any) => {
										this.setState({bmi: value});
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
									checked={this.state.agedLiveStatus === 0}
									onChange={(event: any) => {
										if (event.target.checked) {
											this.setState({ agedLiveStatus: 0 });
										}
									}}
								>
									满意
								</RadioItem>
								<RadioItem
									checked={this.state.agedLiveStatus === 1}
									onChange={(event: any) => {
										if (event.target.checked) {
											this.setState({ agedLiveStatus: 1 });
										}
									}}
								>
									基本满意
								</RadioItem>
								<RadioItem
									checked={this.state.agedLiveStatus === 2}
									onChange={(event: any) => {
										if (event.target.checked) {
											this.setState({ agedLiveStatus: 2 });
										}
									}}
								>
									说不清楚
								</RadioItem>
								<RadioItem
									checked={this.state.agedLiveStatus === 3}
									onChange={(event: any) => {
										if (event.target.checked) {
											this.setState({ agedLiveStatus: 3 });
										}
									}}
								>
									不太满意
								</RadioItem>
								<RadioItem
									checked={this.state.agedLiveStatus === 4}
									onChange={(event: any) => {
										if (event.target.checked) {
											this.setState({ agedLiveStatus: 4 });
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
									checked={this.state.agedSelfCareStatus === 0}
									onChange={(event: any) => {
										if (event.target.checked) {
											this.setState({ agedSelfCareStatus: 0 });
										}
									}}
								>
									可自理（0～3分）
								</RadioItem>
								<RadioItem
									checked={this.state.agedSelfCareStatus === 1}
									onChange={(event: any) => {
										if (event.target.checked) {
											this.setState({ agedSelfCareStatus: 1 });
										}
									}}
								>
									轻度依赖（4～8分）
								</RadioItem>
								<RadioItem
									checked={this.state.agedSelfCareStatus === 2}
									onChange={(event: any) => {
										if (event.target.checked) {
											this.setState({ agedSelfCareStatus: 2 });
										}
									}}
								>
									中度依赖（9～18分)
								</RadioItem>
								<RadioItem
									checked={this.state.agedSelfCareStatus === 3}
									onChange={(event: any) => {
										if (event.target.checked) {
											this.setState({ agedSelfCareStatus: 3 });
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
									checked={this.state.agedCognitive === 0}
									onChange={(event: any) => {
										if (event.target.checked) {
											this.setState({ agedCognitive: 0 });
										}
									}}
								>
									粗筛阴性
								</RadioItem>
								<RadioItem
									checked={this.state.agedCognitive === 1}
									onChange={(event: any) => {
										if (event.target.checked) {
											this.setState({ agedCognitive: 1 });
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
										this.setState({
											intelligenceScore: value,
										});
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
									checked={this.state.agedEmotionStatus === 0}
									onChange={(event: any) => {
										if (event.target.checked) {
											this.setState({ agedEmotionStatus: 0 });
										}
									}}
								>
									粗筛阴性
								</RadioItem>
								<RadioItem
									checked={this.state.agedEmotionStatus === 1}
									onChange={(event: any) => {
										if (event.target.checked) {
											this.setState({ agedEmotionStatus: 1 });
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
					<Button type="primary" onClick={this.syncData}>同步</Button>
				</View>
			</View>


		);
	}
}

const mystyles = StyleSheet.create({
	flexStyle:{
		marginBottom:15
	},
	flexItemColumnStyle:{
		// marginBottom:10,
		marginRight:20
	},
	flexItemStyle: {
		paddingBottom: 5,
		marginRight:100
	},
	fixedBtn:{
		position:'absolute',
		bottom:0,
		right:30,
		width:120,
		height:80,
		borderRadius:100
	}
});
