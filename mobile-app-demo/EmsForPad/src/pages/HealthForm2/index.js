import React, {Component} from 'react';
import {ScrollView, Text, TouchableWithoutFeedback, View, StyleSheet} from 'react-native';
import {Button, Flex, WhiteSpace, WingBlank, Checkbox, List, InputItem, Radio} from 'antd-mobile-rn';
import Server from "../../utils/Server";
import globalData from '../../config/globalData';
import config from '../../config/config';
// import view from './view';
const RadioItem = Radio.RadioItem;
const CheckboxItem = Checkbox.CheckboxItem;


export default class HealthForm2 extends Component<Props> {
	constructor(props) {
		super(props);
		this.navigation = props.navigation;
		this.state = {
			foodHabitArr : config.configLifeStyle.foodHabit,

			lifeStyle: {
				trainRate: '',  //锻炼频率
				exerciseTimeByMin: '',  //锻炼时间/分钟
				exerciseTimeByYear: '',  //锻炼时间/年
				exerciseWay: '',  //锻炼方式
				foodHabit:'', //饮食习惯

				smokingStatus: '', //吸烟状况
				smokingNumsByDay: '', //日均几只烟
				startSmokingAge: '', //开始吸烟年龄
				stopSmokingAge: '', //戒烟年龄

				drinkingStatus: '',//喝酒状况
				drinkingByDay: '',//日饮酒量
				isOutAlcohol: '',//是否戒酒
				startDrinkingAge: '',//开始饮酒年龄
				isDrinkingThisYear: '',//近一年内是否曾醉酒

				odh: '',//职业病危害因素接触史
				poisonType: '',//毒物种类
			}
		}
	}

	//更新数据setstate
	setData = (key, newValue) => {
		this.state.lifeStyle[key] = newValue
		this.setState({lifeStyle: this.state.lifeStyle})
		console.log(this.state.lifeStyle)
	}

	//初始化数据
	componentWillMount() {
		let self = this;
		// self.syncData(); //初始化页面的时候同步数据
	}
//上传数据
	uploadData = () => {
		let self = this;
		var myData = self.state.GeneralSymptoms;

		let dataArr = [];
		dataArr.push(myData)
		console.log(dataArr);
		Server.postHealthInfo({GeneralSymptoms: dataArr}, function (res) {
			console.log(res)
			Server.showAlert('同步成功');
		})
	}
	render() {
		return (
			<View style={{flex: 1, height: '100%'}}>
				<ScrollView style={{flex: 1}} automaticallyAdjustContentInsets={false} showsHorizontalScrollIndicator={false}
				            showsVerticalScrollIndicator={false}>
					<List renderHeader={() => '体育锻炼'}>
						<Text style={{marginTop: 12, marginLeft: 14, marginBottom: 10}}>
							锻炼频率
						</Text>
						<Flex direction="row" justify="between" align='start' style={styles.flexStyle}>
							<Flex.Item style={styles.flexItemColumnStyle}>
								<RadioItem
									style={{fontSize: 40}}
									checked={this.state.lifeStyle.trainRate === 1}
									onChange={(event: any) => {
										if (event.target.checked) {
											this.setState({trainRate: 1});
										}
									}}
									style={{borderWidth: 1, borderColor: '#999', margin: 10}}
								>每天</RadioItem>
							</Flex.Item>
							<Flex.Item style={styles.flexItemColumnStyle}>
								<RadioItem
									checked={this.state.lifeStyle.trainRate === 2}
									onChange={(event: any) => {
										if (event.target.checked) {
											this.setState({trainRate: 2});
										}
									}}
									style={{borderWidth: 1, borderColor: '#999', margin: 10}}
								>每周一次以上</RadioItem>
							</Flex.Item>
							<Flex.Item style={styles.flexItemColumnStyle}>
								<RadioItem
									checked={this.state.lifeStyle.trainRate === 3}
									onChange={(event: any) => {
										if (event.target.checked) {
											this.setState({trainRate: 3});
										}
									}}
									style={{borderWidth: 1, borderColor: '#999', margin: 10}}
								>偶尔</RadioItem>
							</Flex.Item>
							<Flex.Item style={styles.flexItemColumnStyle}>
								<RadioItem
									checked={this.state.lifeStyle.trainRate === 4}
									onChange={(event: any) => {
										if (event.target.checked) {
											this.setState({trainRate: 4});
										}
									}}
									style={{borderWidth: 1, borderColor: '#999', margin: 10}}
								>不锻炼</RadioItem>
							</Flex.Item>
						</Flex>
						<Flex direction="row" justify="between">
							<Flex.Item style={styles.flexItemStyle}>
								<InputItem
									clear
									value={this.state.lifeStyle.exerciseTimeByMin}
									onChange={(value: any) => {
										this.setState({exerciseTimeByMin, value});
									}}
									extra="分钟"
									placeholder=""
									labelNumber={6}
								>
									每次锻炼时间
								</InputItem>
							</Flex.Item>
							<Flex.Item style={styles.flexItemStyle}>
								<InputItem
									clear
									value={this.state.lifeStyle.exerciseTimeByYear}
									onChange={(value: any) => {
										this.setState({exerciseTimeByYear, value});
									}}
									extra="年"
									placeholder=""
									labelNumber={6}
								>
									坚持锻炼时间
								</InputItem>
							</Flex.Item>
							<Flex.Item style={styles.flexItemStyle}>
								<InputItem

									clear
									value={this.state.lifeStyle.exerciseWay}
									onChange={(value: any) => {
										this.setState({exerciseWay, value});
									}}
									placeholder=""
								>
									锻炼方式
								</InputItem>
							</Flex.Item>

						</Flex>
					</List>

					<List renderHeader={() => '饮食习惯'}>
						<Flex direction="row" justify="between" align='start'>
							<Flex.Item style={{paddingBottom: 14}}>
								<CheckboxItem
									checked={this.state.lifeStyle.foodHabit0}
									onChange={(event: any) => {
										this.setState({foodHabit0: event.target.checked}, function () {
										});
									}}
								>
									荤素均衡
								</CheckboxItem>
							</Flex.Item>
							<Flex.Item style={{paddingBottom: 14}}>
								<CheckboxItem
									checked={this.state.lifeStyle.foodHabit1}
									onChange={(event: any) => {
										this.setState({foodHabit1: event.target.checked}, function () {
										});
									}}
								>
									荤食为主
								</CheckboxItem>
							</Flex.Item>
							<Flex.Item style={{paddingBottom: 14}}>
								<CheckboxItem
									checked={this.state.lifeStyle.foodHabit2}
									onChange={(event: any) => {
										this.setState({foodHabit2: event.target.checked}, function () {
										});
									}}
								>
									素食为主
								</CheckboxItem>
							</Flex.Item>
							<Flex.Item style={{paddingBottom: 14}}>
								<CheckboxItem
									checked={this.state.lifeStyle.foodHabit3}
									onChange={(event: any) => {
										this.setState({foodHabit3: event.target.checked}, function () {
										});
									}}
								>
									嗜盐
								</CheckboxItem>
							</Flex.Item>
							<Flex.Item style={{paddingBottom: 14}}>
								<CheckboxItem
									checked={this.state.lifeStyle.foodHabit4}
									onChange={(event: any) => {
										this.setState({foodHabit4: event.target.checked}, function () {
										});
									}}
								>
									嗜油
								</CheckboxItem>
							</Flex.Item>
							<Flex.Item style={{paddingBottom: 14}}>
								<CheckboxItem
									checked={this.state.lifeStyle.foodHabit5}
									onChange={(event: any) => {
										this.setState({foodHabit5: event.target.checked}, function () {
										});
									}}
								>
									嗜糖
								</CheckboxItem>
							</Flex.Item>
						</Flex>
					</List>

					<List renderHeader={() => '吸烟情况'}>
						<Text style={{marginTop: 12, marginLeft: 14, marginBottom: 10}}>
							吸烟状况
						</Text>
						<Flex direction="row" justify="between" align='start' style={styles.flexStyle}>
							<Flex.Item style={styles.flexItemColumnStyle}>
								<RadioItem style={{fontSize: 40}}
								           checked={this.state.lifeStyle.smokingStatus === 1}
								           onChange={(event: any) => {
									           if (event.target.checked) {
										           this.setState({smokingStatus: 1});
									           }
								           }}
								           style={styles.RadioItemStyle}
								>从不吸烟</RadioItem>
							</Flex.Item>
							<Flex.Item style={styles.flexItemColumnStyle}>
								<RadioItem
									checked={this.state.lifeStyle.smokingStatus === 2}
									onChange={(event: any) => {
										if (event.target.checked) {
											this.setState({smokingStatus: 2});
										}
									}}
									style={styles.RadioItemStyle}
								>已戒烟</RadioItem>
							</Flex.Item>
							<Flex.Item style={styles.flexItemColumnStyle}>
								<RadioItem
									checked={this.state.lifeStyle.smokingStatus === 3}
									onChange={(event: any) => {
										if (event.target.checked) {
											this.setState({smokingStatus: 3});
										}
									}}
									style={styles.RadioItemStyle}
								>吸烟</RadioItem>
							</Flex.Item>
						</Flex>
						<Flex direction="row" justify="between">
							<Flex.Item style={styles.flexItemStyle}>
								<InputItem
									clear
									type="number"
									value={this.state.lifeStyle.smokingNumsByDay}
									onChange={(value: any) => {
										this.setState({smokingNumsByDay, value});
									}}
									extra="支"
									placeholder=""
									labelNumber={6}
								>
									日吸烟量
								</InputItem>
							</Flex.Item>
							<Flex.Item style={styles.flexItemStyle}>
								<InputItem
									clear
									type="number"
									value={this.state.lifeStyle.startSmokingAge}
									onChange={(value: any) => {
										this.setState({startSmokingAge, value});
									}}
									extra="岁"
									placeholder=""
									labelNumber={6}
								>
									开始吸烟年龄
								</InputItem>
							</Flex.Item>
							<Flex.Item style={styles.flexItemStyle}>
								<InputItem
									type="number"
									clear
									value={this.state.lifeStyle.stopSmokingAge}
									onChange={(value: any) => {
										this.setState({stopSmokingAge, value});
									}}
									extra="岁"
									placeholder=""
								>
									戒烟年龄
								</InputItem>
							</Flex.Item>

						</Flex>
					</List>

					<List renderHeader={() => '饮酒情况'}>
						<Text style={{marginTop: 12, marginLeft: 14, marginBottom: 10}}>
							饮酒频率
						</Text>
						<Flex direction="row" justify="between" align='start' style={styles.flexStyle}>
							<Flex.Item style={styles.flexItemColumnStyle}>
								<RadioItem
									style={{fontSize: 40}}
									checked={this.state.lifeStyle.drinkingStatus === 1}
									onChange={(event: any) => {
										if (event.target.checked) {
											this.setState({drinkingStatus: 1});
										}
									}}
									style={styles.RadioItemStyle}
								>从不</RadioItem>
							</Flex.Item>
							<Flex.Item style={styles.flexItemColumnStyle}>
								<RadioItem
									checked={this.state.lifeStyle.drinkingStatus === 2}
									onChange={(event: any) => {
										if (event.target.checked) {
											this.setState({drinkingStatus: 2});
										}
									}}
									style={styles.RadioItemStyle}
								>偶尔</RadioItem>
							</Flex.Item>
							<Flex.Item style={styles.flexItemColumnStyle}>
								<RadioItem
									checked={this.state.lifeStyle.drinkingStatus === 3}
									onChange={(event: any) => {
										if (event.target.checked) {
											this.setState({drinkingStatus: 3});
										}
									}}
									style={styles.RadioItemStyle}
								>经常</RadioItem>
							</Flex.Item>
							<Flex.Item style={styles.flexItemColumnStyle}>
								<RadioItem
									checked={this.state.lifeStyle.drinkingStatus === 4}
									onChange={(event: any) => {
										if (event.target.checked) {
											this.setState({drinkingStatus: 4});
										}
									}}
									style={styles.RadioItemStyle}
								>每天</RadioItem>
							</Flex.Item>
						</Flex>
						<InputItem
							clear
							type="number"
							value={this.state.lifeStyle.drinkingByDay}
							onChange={(value: any) => {
								this.setState({drinkingByDay, value});
							}}
							extra="两"
							placeholder=""
							labelNumber={6}
						>
							日饮酒量
						</InputItem>
						<Text style={{marginTop: 12, marginLeft: 14, marginBottom: 10}}>
							是否戒酒
						</Text>
						<Flex direction="row" justify="between" align='start' style={styles.flexStyle}>
							<Flex.Item style={styles.flexItemColumnStyle}>
								<RadioItem
									style={{fontSize: 40}}
									checked={this.state.lifeStyle.isOutAlcohol === 1}
									onChange={(event: any) => {
										if (event.target.checked) {
											this.setState({isOutAlcohol: 1});
										}
									}}
									style={styles.RadioItemStyle}
								>未戒酒</RadioItem>
							</Flex.Item>
							<Flex.Item style={styles.flexItemColumnStyle}>
								<RadioItem
									checked={this.state.lifeStyle.isOutAlcohol === 2}
									onChange={(event: any) => {
										if (event.target.checked) {
											this.setState({isOutAlcohol: 2});
										}
									}}
									style={styles.RadioItemStyle}
								>已戒酒</RadioItem>
							</Flex.Item>

						</Flex>
						<Flex direction="row" justify="between">
							<Flex.Item style={styles.flexItemStyle}>
								<InputItem
									clear
									type="number"
									value={this.state.lifeStyle.startDrinkingAge}
									onChange={(value: any) => {
										this.setState({startDrinkingAge, value});
									}}
									extra="岁"
									placeholder=""
									labelNumber={6}
								>
									开始饮酒年龄
								</InputItem>
							</Flex.Item>
							<Flex.Item style={styles.flexItemStyle}>
								<Flex direction="row" justify="between">
									<Flex.Item style={styles.flexItemColumnStyle}>
										<Text style={{marginTop: 12, marginLeft: 14, marginBottom: 10}}>
											近一年内是否曾醉酒
										</Text>
									</Flex.Item>

									<Flex.Item style={styles.flexItemColumnStyle}>
										<RadioItem
											style={{fontSize: 40}}
											checked={this.state.lifeStyle.isDrinkingThisYear === 1}
											onChange={(event: any) => {
												if (event.target.checked) {
													this.setState({isDrinkingThisYear: 1});
												}
											}}
											style={styles.RadioItemStyle}
										>是</RadioItem>
									</Flex.Item>
									<Flex.Item style={styles.flexItemColumnStyle}>
										<RadioItem
											checked={this.state.lifeStyle.isDrinkingThisYear === 2}
											onChange={(event: any) => {
												if (event.target.checked) {
													this.setState({isDrinkingThisYear: 2});
												}
											}}
											style={styles.RadioItemStyle}
										>否</RadioItem>
									</Flex.Item>
								</Flex>
							</Flex.Item>


						</Flex>
					</List>

					<List renderHeader={() => '职业病危害因素接触史'} style={{paddingBottom: 40}}>
						<Flex direction="row" justify="between" align='start' style={styles.flexStyle}>
							<Flex.Item style={styles.flexItemColumnStyle}>
								<RadioItem
									style={{fontSize: 40}}
									checked={this.state.lifeStyle.odh === 1}
									onChange={(event: any) => {
										if (event.target.checked) {
											this.setState({odh: 1});
										}
									}}
									style={styles.RadioItemStyle}
								>无</RadioItem>
							</Flex.Item>
							<Flex.Item style={styles.flexItemColumnStyle}>
								<RadioItem
									checked={this.state.lifeStyle.odh === 2}
									onChange={(event: any) => {
										if (event.target.checked) {
											this.setState({odh: 2});
										}
									}}
									style={styles.RadioItemStyle}
								>有</RadioItem>
							</Flex.Item>
						</Flex>

						<Text style={{marginTop: 12, marginLeft: 14, marginBottom: 10}}>
							毒物种类
						</Text>

						<Flex direction="row" justify="between">
							<Flex.Item style={styles.flexItemColumnStyle}>
								<RadioItem
									checked={this.state.lifeStyle.poisonType === 1}
									onChange={(event: any) => {
										if (event.target.checked) {
											this.setState({poisonType: 1});
										}
									}}
									style={styles.RadioItemStyle}
								>粉尘</RadioItem>
							</Flex.Item>
							<Flex.Item style={styles.flexItemColumnStyle}>
								<RadioItem
									checked={this.state.lifeStyle.poisonType === 2}
									onChange={(event: any) => {
										if (event.target.checked) {
											this.setState({poisonType: 2});
										}
									}}
									style={styles.RadioItemStyle}
								>放射物质</RadioItem>
							</Flex.Item>
							<Flex.Item style={styles.flexItemColumnStyle}>
								<RadioItem
									checked={this.state.lifeStyle.poisonType === 3}
									onChange={(event: any) => {
										if (event.target.checked) {
											this.setState({poisonType: 3});
										}
									}}
									style={styles.RadioItemStyle}
								>物理因素</RadioItem>
							</Flex.Item>
							<Flex.Item style={styles.flexItemColumnStyle}>
								<RadioItem
									checked={this.state.lifeStyle.poisonType === 4}
									onChange={(event: any) => {
										if (event.target.checked) {
											this.setState({poisonType: 4});
										}
									}}
									style={styles.RadioItemStyle}
								>化学物质</RadioItem>
							</Flex.Item>
							<Flex.Item style={styles.flexItemColumnStyle}>
								<RadioItem
									checked={this.state.lifeStyle.poisonType === 5}
									onChange={(event: any) => {
										if (event.target.checked) {
											this.setState({poisonType: 5});
										}
									}}
									style={styles.RadioItemStyle}
								>其他</RadioItem>
							</Flex.Item>
						</Flex>
					</List>

				</ScrollView>

				<View style={mystyles.fixedBtn}>
					<Button type="primary" onClick={this.syncData}>同步</Button>
				</View>
			</View>


		);
	}
}

const styles = StyleSheet.create({
	RadioItemStyle: {
		borderWidth: 1, borderColor: '#999', margin: 10
	},
	flexStyle: {
		marginLeft: 6
	},
	flexItemColumnStyle: {
		// marginBottom:10,
		marginRight: 20
	},
	flexItemStyle: {
		paddingBottom: 5,
		marginRight: 100
	},
});
const mystyles = StyleSheet.create({
	fixedBtn: {
		position: 'absolute',
		bottom: 0,
		// alignSelf:'flex-end',
		right: 30,
		width: 120,
		height: 80,
		borderRadius: 100
	}
});
