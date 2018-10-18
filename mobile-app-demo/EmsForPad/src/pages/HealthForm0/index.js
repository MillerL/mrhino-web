import React, {Component} from 'react';
import {Text, View, Image, ViewStyle, StyleSheet, Alert} from 'react-native';
import {WhiteSpace, WingBlank, InputItem, Flex, List, Checkbox,Progress,Button} from 'antd-mobile-rn';
// import view from '../../config/globalData';
import Server from '../../utils/Server';


const CheckboxItem = Checkbox.CheckboxItem;
const checkList = [
	{checkStatus: false, name: '无症状'}, {checkStatus: false, name: '头晕'}, {
		checkStatus: false,
		name: '头晕'
	}, {checkStatus: false, name: '心悸'},
	{checkStatus: false, name: '胸闷'}, {checkStatus: false, name: '胸痛'}, {
		checkStatus: false,
		name: '慢性咳嗽'
	}, {checkStatus: false, name: '咳痰'},
	{checkStatus: false, name: '呼吸困难'}, {checkStatus: false, name: '多饮'}, {
		checkStatus: false,
		name: '多尿'
	}, {checkStatus: false, name: '体重下降'},
	{checkStatus: false, name: '乏力'}, {checkStatus: false, name: '关节肿痛'}, {
		checkStatus: false,
		name: '视力模糊'
	}, {checkStatus: false, name: '手脚麻木'},
	{checkStatus: false, name: '尿急'}, {checkStatus: false, name: '尿痛便秘'}, {
		checkStatus: false,
		name: '便秘'
	}, {checkStatus: false, name: '腹泻'},
	{checkStatus: false, name: '恶心呕吐'}, {checkStatus: false, name: '眼花'}, {
		checkStatus: false,
		name: '耳鸣'
	}, {checkStatus: false, name: '乳房胀痛'}];

type Props = {};

function onChange(value: any) {
	console.log('changed', value);
}
export default class HealthForm0 extends React.Component<any, any> {
	static navigationOptions = {
		// 设置 title
		title: "首页"
	};

	constructor(props: any, context: any) {
		super(props, context);
		this.navigation = props.navigation;
		this.state = {
			checksArr:checkList, //多选的数组对象
			symptom: [], //症状
			otherSymptom:'', //其他症状
			percent: 40,

		};
		console.log(this.state)
	};
	onAdd = () => {
		let p = this.state.percent + 10;
		if (this.state.percent >= 100) {
			p = 0;
		}
		this.setState({ percent: p });
	}
	//同步数据
	syncData =()=>{
		var pageData = this.handleWithData();
		console.log(pageData)
		//判断是否输入为空
		if(pageData.length > 0){
			var pageString = pageData.join();
			console.log(pageString)
			var data = {
				symptom : pageString
			}
			Server.postHealthInfo(data,function (res) {
				console.log(res)
				Server.showAlert('同步成功');
			})
		}else {
			Server.showAlert('输入值为空');
		}
	}
	//处理数据
	handleWithData =()=>{
		//遍历数组找出勾选的项目
		if(this.state.checksArr.length > 0){
			for (var i =0; i < this.state.checksArr.length; i++) {
				var obj = this.state.checksArr[i];
				if(obj['checkStatus'] == true){
					//PUSH到预制数组
					this.state.symptom.push(obj.name)
				}
			}
		}
		//如果其他有输入，就push到症状里
		if(this.state.otherSymptom != ''){
			this.state.symptom.push(this.state.otherSymptom)
		}

		return this.state.symptom;

	}

	render() {
		const styles = {
			marginTop: 80,
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
		};
		return (
			<View style={{height:'100%'}}>
				<WhiteSpace />
				<View>
					<View style={{ marginRight: 10, height: 10, flex: 1 }}>
						<Progress percent={this.state.percent} style={{ height: 10}}/>
					</View>
					<Text style={{marginTop:10}}>填写进度 {this.state.percent}%</Text>
				</View>
				<Button
					style={{ width: 50, marginLeft: 10 }}
					type="ghost"
					size="small"
					onClick={this.onAdd}
				>
					(+-)10
				</Button>
				<WhiteSpace />
				{/*<Progress percent={5} />*/}

				<List style={{marginTop: 12}}>
					<Text style={{marginTop: 12, marginLeft: 20, marginBottom: 22, fontSize: 20}}>症状</Text>

					<WingBlank style={{marginBottom: 5}}>

						<Flex direction="row" wrap="wrap" style={{padding:20}}>
							{checkList.map((item,id)=>{
								return(
									<View key={id} style={{marginLeft:60,marginBottom:40}}>
										<Checkbox
										          // checked = {"this.state.checkStatus" + id}
										          checked = {this.state.checksArr[id]["checkStatus"]}
													// checked={false}
										          onChange = {(event) => {
											          let checkObjArr = this.state.checksArr;
											          checkObjArr[id]["checkStatus"] =  event.target.checked
											          this.setState({checksArr: checkObjArr}, function () {
												          //setState 不同步，所以取值必须写在回调里
												          console.log(this.state.checksArr)
											          });
										          }}
										>{item.name}</Checkbox>
									</View>
								)
							})}
						</Flex>


					</WingBlank>

					<InputItem style={{marginLeft: 40, marginTop: 10}}
					           clear
					           value={this.state.otherSymptom}
					           onChange={(value: any) => {
						           this.setState({
							           otherSymptom: value,
						           });
					           }}
					           placeholder=""
					>
						其他
					</InputItem>

				</List>

				<View style={mystyles.fixedBtn}>
					<Button type="primary" onClick={this.syncData}>同步</Button>
				</View>
			</View>
		);
	}
}

const mystyles = StyleSheet.create({
	checkStyle: {
		marginBottom: 30,
		marginTop: 30,
		marginLeft:30,
		padding:10
	},
	fixedBtn:{
		// marginTop:40,
		position:'absolute',
		bottom:30,
		right:30,
		width:120,
		height:80,
		borderRadius:100
	},
});
