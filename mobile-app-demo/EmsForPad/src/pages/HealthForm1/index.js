import React, {Component} from 'react';
import { ScrollView, Text, TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import { Button, Flex, WhiteSpace, WingBlank,List,InputItem, Radio } from 'antd-mobile-rn';
// import view from './view';
const RadioItem = Radio.RadioItem;


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
			waistline:'',//腰围
			bmi:'',//体质指数

			part1Value: 1,
			part2Value: 1,
		}
	}

	render() {
		return (
			<ScrollView style={{ flex: 1 }} automaticallyAdjustContentInsets={false} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
				<List renderHeader={() => '一般'} style={styles.flexStyle}>
					<Flex direction="row" justify="between" style={styles.flexStyle}>
						<Flex.Item style={styles.flexItemStyle}>
							<InputItem
								clear
								// onErrorPress={() => alert('clicked me')}
								value={this.state.Temp}
								onChange={(value: any) => {
									this.setState({Temp,value});
								}}
								extra="℃"
								placeholder=""
							>
								体温
							</InputItem>
						</Flex.Item>
						<Flex.Item style={styles.flexItemStyle}>
							<InputItem
								clear
								value={this.state.PR}
								onChange={(value: any) => {
									this.setState({PR,value});
								}}
								extra="次/分钟"
								placeholder=""
							>
								脉率
							</InputItem>
						</Flex.Item>
						<Flex.Item style={styles.flexItemStyle}>
							<InputItem
								clear
								value={this.state.Resp}
								onChange={(value: any) => {
									this.setState({Resp,value});
								}}
								extra="次/分钟"
								placeholder=""
							>
								呼吸频率
							</InputItem>
						</Flex.Item>
					</Flex>
					<Flex direction="row" justify="between">
						<Flex.Item style={styles.flexItemStyle}>
							<InputItem
								clear
								value={this.state.NibpAver}
								onChange={(value: any) => {
									this.setState({NibpAver,value});
								}}
								extra="mmHg"
								placeholder=""
							>
								血压
							</InputItem>
						</Flex.Item>
						<Flex.Item style={styles.flexItemStyle}>
							<InputItem
								clear
								value={this.state.Height}
								onChange={(value: any) => {
									this.setState({Height,value});
								}}
								extra="CM"
								placeholder=""
							>
								身高
							</InputItem>
						</Flex.Item>
						<Flex.Item style={styles.flexItemStyle}>
							<InputItem
								clear
								value={this.state.Weight}
								onChange={(value: any) => {
									this.setState({Weight,value});
								}}
								extra="kg"
								placeholder=""
							>
								体重
							</InputItem>
						</Flex.Item>
					</Flex>
					<Flex direction="row" justify="between">
						<Flex.Item style={styles.flexItemStyle}>
							<InputItem
								clear
								value={this.state.waistline}
								onChange={(value: any) => {
									this.setState({waistline,value});
								}}
								extra="mmHg"
								placeholder=""
							>
								腰围
							</InputItem>
						</Flex.Item>
						<Flex.Item style={styles.flexItemStyle}>
							<InputItem
								clear
								value={this.state.bmi}
								onChange={(value: any) => {
									this.setState({bmi,value});
								}}
								extra="Kg/m2"
								placeholder=""
							>
								体质指数
							</InputItem>
						</Flex.Item>
						<Flex.Item style={styles.flexItemStyle}>

						</Flex.Item>
					</Flex>
				</List>


				<Flex direction="row" justify="between" align='start' style={styles.flexStyle}>
					<Flex.Item style={styles.flexItemColumnStyle}>
						<List renderHeader={() => '老年人健康状态自我评估*'}>
							<RadioItem
								checked={this.state.part2Value === 1}
								onChange={(event: any) => {
									if (event.target.checked) {
										this.setState({ part2Value: 1 });
									}
								}}
							>
								满意
							</RadioItem>
							<RadioItem
								checked={this.state.part2Value === 2}
								onChange={(event: any) => {
									if (event.target.checked) {
										this.setState({ part2Value: 2 });
									}
								}}
							>
								基本满意
							</RadioItem>
							<RadioItem
								checked={this.state.part2Value === 2}
								onChange={(event: any) => {
									if (event.target.checked) {
										this.setState({ part2Value: 2 });
									}
								}}
							>
								说不清楚
							</RadioItem>
							<RadioItem
								checked={this.state.part2Value === 2}
								onChange={(event: any) => {
									if (event.target.checked) {
										this.setState({ part2Value: 2 });
									}
								}}
							>
								不太满意
							</RadioItem>
							<RadioItem
								checked={this.state.part2Value === 2}
								onChange={(event: any) => {
									if (event.target.checked) {
										this.setState({ part2Value: 2 });
									}
								}}
							>
								不满意
							</RadioItem>
						</List>
					</Flex.Item>
					<Flex.Item style={styles.flexItemColumnStyle}>
						<List renderHeader={() => '老年人生活自理能力自我评估*'}>
							<RadioItem
								checked={this.state.part2Value === 1}
								onChange={(event: any) => {
									if (event.target.checked) {
										this.setState({ part2Value: 1 });
									}
								}}
							>
								可自理（0～3分）
							</RadioItem>
							<RadioItem
								checked={this.state.part2Value === 2}
								onChange={(event: any) => {
									if (event.target.checked) {
										this.setState({ part2Value: 2 });
									}
								}}
							>
								轻度依赖（4～8分）
							</RadioItem>
							<RadioItem
								checked={this.state.part2Value === 2}
								onChange={(event: any) => {
									if (event.target.checked) {
										this.setState({ part2Value: 2 });
									}
								}}
							>
								中度依赖（9～18分)
							</RadioItem>
							<RadioItem
								checked={this.state.part2Value === 2}
								onChange={(event: any) => {
									if (event.target.checked) {
										this.setState({ part2Value: 2 });
									}
								}}
							>
								不能自理（≥19分）
							</RadioItem>
						</List>
					</Flex.Item>
					<Flex.Item style={styles.flexItemColumnStyle}>
						<List renderHeader={() => '老年人认知功能*'}>
							<RadioItem
								checked={this.state.part2Value === 1}
								onChange={(event: any) => {
									if (event.target.checked) {
										this.setState({ part2Value: 1 });
									}
								}}
							>
								粗筛阴性
							</RadioItem>
							<RadioItem
								checked={this.state.part2Value === 2}
								onChange={(event: any) => {
									if (event.target.checked) {
										this.setState({ part2Value: 2 });
									}
								}}
							>
								粗筛阳性
							</RadioItem>
							<InputItem
								clear
								type="number"
								value={this.state.number}
								onChange={(value: any) => {
									this.setState({
										number: value,
									});
								}}
								placeholder="简易智力状态检查"
							>
								总分
							</InputItem>
						</List>
					</Flex.Item>
					<Flex.Item style={styles.flexItemColumnStyle}>
						<List renderHeader={() => '老年人情感状态*'}>
							<RadioItem
								checked={this.state.part2Value === 1}
								onChange={(event: any) => {
									if (event.target.checked) {
										this.setState({ part2Value: 1 });
									}
								}}
							>
								粗筛阴性
							</RadioItem>
							<RadioItem
								checked={this.state.part2Value === 2}
								onChange={(event: any) => {
									if (event.target.checked) {
										this.setState({ part2Value: 2 });
									}
								}}
							>
								粗筛阳性
							</RadioItem>
							<InputItem
								clear
								type="number"
								value={this.state.number}
								onChange={(value: any) => {
									this.setState({
										number: value,
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
		);
	}
}

const styles = StyleSheet.create({
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
});
