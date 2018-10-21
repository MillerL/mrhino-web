import React, {Component} from 'react';
import {ScrollView, Text, TouchableWithoutFeedback, View, StyleSheet} from 'react-native';
import {Button, Flex, WhiteSpace, WingBlank, Checkbox, List, InputItem, Radio,Progress} from 'antd-mobile-rn';
import Server from "../../utils/Server";
import globalData from '../../config/globalData';
import config from '../../config/config';
import Util from '../../utils/Util';
// import view from './view';
const RadioItem = Radio.RadioItem;
const CheckboxItem = Checkbox.CheckboxItem;


export default class HealthForm2 extends Component<Props> {
	constructor(props) {
		super(props);
		this.navigation = props.navigation;
		this.state = {
			percent: 0,
			foodHabitArr : config.configLifeStyle.foodHabit,
			foodHabitCheckedArr:[], //选中的饮食习惯

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
		self.syncData(); //初始化页面的时候同步数据
	}
	//同步数据
	syncData = () => {
		console.log('同步数据')
		let self = this;
		let lifeStyle = globalData.userInfo.lifeStyle[0];
		lifeStyle.trainRate = fintIndexInData(config.configLifeStyle.trainRate, lifeStyle.trainRate)
		lifeStyle.smokingStatus = fintIndexInData(config.configLifeStyle.smokingStatus, lifeStyle.smokingStatus)
		lifeStyle.drinkingStatus = fintIndexInData(config.configLifeStyle.drinkingStatus, lifeStyle.drinkingStatus)
		lifeStyle.isOutAlcohol = fintIndexInData(config.configLifeStyle.isOutAlcohol, lifeStyle.isOutAlcohol)
		lifeStyle.odh = fintIndexInData(config.configLifeStyle.odh, lifeStyle.odh)
		lifeStyle.poisonType = fintIndexInData(config.configLifeStyle.poisonType, lifeStyle.poisonType)
		this.setState({lifeStyle: lifeStyle});

		//单选字符串转数字
		let foodHabit = lifeStyle.foodHabit;
		console.log(foodHabit);

		//设置饮食习惯
		if(foodHabit !== ''){
			//字符串转数据-循环匹配
			let foodHabitArr = foodHabit.split(',');
			for (let i = 0; i < foodHabitArr.length; i++) {
				let name = foodHabitArr[i];
				for (let j = 0; j < config.configLifeStyle.foodHabit.length; j++) {
					let obj = config.configLifeStyle.foodHabit[j];
					if(name == obj.name){
						obj.checkStatus = true;
					}
				}
			}
			self.setState({foodHabitArr:config.configLifeStyle.foodHabit});
		}

		function fintIndexInData(arr, value) {
			if (value != '') {
				for (let i = 0; i < arr.length; i++) {
					let obj = arr[i];
					if (obj == value) {
						let index = i.toString();
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
		let myData = self.state.lifeStyle;

		self.handleWithData();
		let foodHabitArr = self.state.foodHabitCheckedArr;

		//处理多选--饮食习惯
		if(foodHabitArr.length > 0 ){
			let foodHabitString = foodHabitArr.join();
			console.log(foodHabitString)
			myData.foodHabit = foodHabitString;
		};
		myData.trainRate = config.configLifeStyle.trainRate[parseInt(myData.trainRate)]
		myData.smokingStatus = config.configLifeStyle.smokingStatus[parseInt(myData.smokingStatus)]
		myData.drinkingStatus = config.configLifeStyle.drinkingStatus[parseInt(myData.drinkingStatus)]
		myData.isOutAlcohol = config.configLifeStyle.isOutAlcohol[parseInt(myData.isOutAlcohol)]
		myData.odh = config.configLifeStyle.odh[parseInt(myData.odh)]
		myData.poisonType = config.configLifeStyle.poisonType[parseInt(myData.poisonType)]

		let dataArr = [];
		dataArr.push(myData)
		console.log(dataArr);
		Server.postHealthInfo({lifeStyle: dataArr}, function (res) {
			console.log(res)
			Server.showAlert('同步成功');

			let data = res.data;
			Server.syncGlobalData(data); //同步global数据
			//同步进度条
			self.setState({ percent: globalData.inputProgress });
		})
	}
	//处理数据
	handleWithData =()=>{
		//遍历数组找出勾选的项目
		let self = this;
		let checksArr = self.state.foodHabitArr;
		if(checksArr.length > 0){
			for (let i =0; i < checksArr.length; i++) {
				let obj = checksArr[i];
				if(obj.checkStatus == true){
					//PUSH到预制数组
					self.state.foodHabitCheckedArr.push(obj.name)
				}
			}
		}
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
					<List renderHeader={() => '体育锻炼'}>
						<Text style={{marginTop: 12, marginLeft: 14, marginBottom: 10}}>
							锻炼频率
						</Text>
						<Flex direction="row" justify="between" align='start' style={styles.flexStyle}>
							<Flex.Item style={styles.flexItemColumnStyle}>
								<RadioItem
									style={{fontSize: 40}}
									checked={this.state.lifeStyle.trainRate === '0'}
									onChange={(event: any) => {
										if (event.target.checked) {
											this.setData('trainRate', '0');
										}
									}}
									style={{borderWidth: 1, borderColor: '#999', margin: 10}}
								>每天</RadioItem>
							</Flex.Item>
							<Flex.Item style={styles.flexItemColumnStyle}>
								<RadioItem
									checked={this.state.lifeStyle.trainRate === '1'}
									onChange={(event: any) => {
										if (event.target.checked) {
											this.setData('trainRate', '1');
										}
									}}
									style={{borderWidth: 1, borderColor: '#999', margin: 10}}
								>每周一次以上</RadioItem>
							</Flex.Item>
							<Flex.Item style={styles.flexItemColumnStyle}>
								<RadioItem
									checked={this.state.lifeStyle.trainRate === '2'}
									onChange={(event: any) => {
										if (event.target.checked) {
											this.setData('trainRate', '2');
										}
									}}
									style={{borderWidth: 1, borderColor: '#999', margin: 10}}
								>偶尔</RadioItem>
							</Flex.Item>
							<Flex.Item style={styles.flexItemColumnStyle}>
								<RadioItem
									checked={this.state.lifeStyle.trainRate === '3'}
									onChange={(event: any) => {
										if (event.target.checked) {
											this.setData('trainRate', '3');
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
										this.setData('exerciseTimeByMin', value);
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
										this.setData('exerciseTimeByYear', value);
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
										this.setData('exerciseWay', value);
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

								{config.configLifeStyle.foodHabit.map((item,id)=>{
									return(
										<CheckboxItem key={id}
											checked={this.state.foodHabitArr[id]["checkStatus"]}
											onChange={(event: any) => {
												let objfoodHabitArr = this.state.foodHabitArr;
												objfoodHabitArr[id]["checkStatus"] =  event.target.checked;
												this.setData({foodHabitArr: objfoodHabitArr}, function () {
												});
											}}
										>
											{item.name}
										</CheckboxItem>
									)
								})}

							{/*	<CheckboxItem
									checked={this.state.lifeStyle.foodHabit0}
									onChange={(event: any) => {
										this.setData({foodHabit0: event.target.checked}, function () {
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
										this.setData({foodHabit1: event.target.checked}, function () {
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
										this.setData({foodHabit2: event.target.checked}, function () {
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
										this.setData({foodHabit3: event.target.checked}, function () {
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
										this.setData({foodHabit4: event.target.checked}, function () {
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
										this.setData({foodHabit5: event.target.checked}, function () {
										});
									}}
								>
									嗜糖
								</CheckboxItem>*/}
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
								           checked={this.state.lifeStyle.smokingStatus === '0'}
								           onChange={(event: any) => {
									           if (event.target.checked) {
										           this.setData('smokingStatus', '0');
									           }
								           }}
								           style={styles.RadioItemStyle}
								>从不吸烟</RadioItem>
							</Flex.Item>
							<Flex.Item style={styles.flexItemColumnStyle}>
								<RadioItem
									checked={this.state.lifeStyle.smokingStatus === '1'}
									onChange={(event: any) => {
										if (event.target.checked) {
											this.setData('smokingStatus', '1');
										}
									}}
									style={styles.RadioItemStyle}
								>已戒烟</RadioItem>
							</Flex.Item>
							<Flex.Item style={styles.flexItemColumnStyle}>
								<RadioItem
									checked={this.state.lifeStyle.smokingStatus === '2'}
									onChange={(event: any) => {
										if (event.target.checked) {
											this.setData('smokingStatus', '2');
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
										this.setData('smokingNumsByDay', value);
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
										this.setData('startSmokingAge', value);
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
										this.setData('stopSmokingAge', value);
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
									checked={this.state.lifeStyle.drinkingStatus === '0'}
									onChange={(event: any) => {
										if (event.target.checked) {
											this.setData('drinkingStatus', '0');
										}
									}}
									style={styles.RadioItemStyle}
								>从不</RadioItem>
							</Flex.Item>
							<Flex.Item style={styles.flexItemColumnStyle}>
								<RadioItem
									checked={this.state.lifeStyle.drinkingStatus === '1'}
									onChange={(event: any) => {
										if (event.target.checked) {
											this.setData('drinkingStatus', '1');
										}
									}}
									style={styles.RadioItemStyle}
								>偶尔</RadioItem>
							</Flex.Item>
							<Flex.Item style={styles.flexItemColumnStyle}>
								<RadioItem
									checked={this.state.lifeStyle.drinkingStatus === '2'}
									onChange={(event: any) => {
										if (event.target.checked) {
											this.setData('drinkingStatus', '2');
										}
									}}
									style={styles.RadioItemStyle}
								>经常</RadioItem>
							</Flex.Item>
							<Flex.Item style={styles.flexItemColumnStyle}>
								<RadioItem
									checked={this.state.lifeStyle.drinkingStatus === '3'}
									onChange={(event: any) => {
										if (event.target.checked) {
											this.setData('drinkingStatus', '3');
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
								this.setData('drinkingByDay', value);
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
									checked={this.state.lifeStyle.isOutAlcohol === '0'}
									onChange={(event: any) => {
										if (event.target.checked) {
											this.setData('isOutAlcohol', '0');
										}
									}}
									style={styles.RadioItemStyle}
								>未戒酒</RadioItem>
							</Flex.Item>
							<Flex.Item style={styles.flexItemColumnStyle}>
								<RadioItem
									checked={this.state.lifeStyle.isOutAlcohol === '1'}
									onChange={(event: any) => {
										if (event.target.checked) {
											this.setData('isOutAlcohol', '1');
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
										this.setData('startDrinkingAge', value);
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
											checked={this.state.lifeStyle.isDrinkingThisYear === '0'}
											onChange={(event: any) => {
												if (event.target.checked) {
													this.setData('isDrinkingThisYear','0');
												}
											}}
											style={styles.RadioItemStyle}
										>是</RadioItem>
									</Flex.Item>
									<Flex.Item style={styles.flexItemColumnStyle}>
										<RadioItem
											checked={this.state.lifeStyle.isDrinkingThisYear === '1'}
											onChange={(event: any) => {
												if (event.target.checked) {
													this.setData('isDrinkingThisYear','1');
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
									checked={this.state.lifeStyle.odh === '0'}
									onChange={(event: any) => {
										if (event.target.checked) {
											this.setData('odh', '0');
										}
									}}
									style={styles.RadioItemStyle}
								>无</RadioItem>
							</Flex.Item>
							<Flex.Item style={styles.flexItemColumnStyle}>
								<RadioItem
									checked={this.state.lifeStyle.odh === '1'}
									onChange={(event: any) => {
										if (event.target.checked) {
											this.setData('odh', '1');
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
									checked={this.state.lifeStyle.poisonType === '0'}
									onChange={(event: any) => {
										if (event.target.checked) {
											this.setData('poisonType', '0');
										}
									}}
									style={styles.RadioItemStyle}
								>粉尘</RadioItem>
							</Flex.Item>
							<Flex.Item style={styles.flexItemColumnStyle}>
								<RadioItem
									checked={this.state.lifeStyle.poisonType === '1'}
									onChange={(event: any) => {
										if (event.target.checked) {
											this.setData('poisonType', '1');
										}
									}}
									style={styles.RadioItemStyle}
								>放射物质</RadioItem>
							</Flex.Item>
							<Flex.Item style={styles.flexItemColumnStyle}>
								<RadioItem
									checked={this.state.lifeStyle.poisonType === '2'}
									onChange={(event: any) => {
										if (event.target.checked) {
											this.setData('poisonType', '2');
										}
									}}
									style={styles.RadioItemStyle}
								>物理因素</RadioItem>
							</Flex.Item>
							<Flex.Item style={styles.flexItemColumnStyle}>
								<RadioItem
									checked={this.state.lifeStyle.poisonType === '3'}
									onChange={(event: any) => {
										if (event.target.checked) {
											this.setData('poisonType', '3');
										}
									}}
									style={styles.RadioItemStyle}
								>化学物质</RadioItem>
							</Flex.Item>
							<Flex.Item style={styles.flexItemColumnStyle}>
								<RadioItem
									checked={this.state.lifeStyle.poisonType === '4'}
									onChange={(event: any) => {
										if (event.target.checked) {
											this.setData('poisonType', '4');
										}
									}}
									style={styles.RadioItemStyle}
								>其他</RadioItem>
							</Flex.Item>
						</Flex>
					</List>

				</ScrollView>

				<View style={mystyles.fixedBtn}>
					<Button type="primary" onClick={this.uploadData}>同步</Button>
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
