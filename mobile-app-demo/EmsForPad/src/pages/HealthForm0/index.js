import React, {Component} from 'react';
import {Text, View, Image, ViewStyle, StyleSheet} from 'react-native';
import {WhiteSpace, WingBlank, InputItem, Flex, List, Checkbox,Progress,Button} from 'antd-mobile-rn';
import view from '../../config/globalData';


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
			// checksArr:[]
			symptom: '', //症状
			percent: 40,

		};
		for (var i = 0; i < checkList.length; i++) {
			var objKey = 'checkStatus' + i;
			this.state[objKey] = false
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
							{/*<Checkbox style={styles.checkStyle}
							          checked={this.state.checkStatus0}
							          onChange={(event) => {
								          // var checkObj = checksArr[0].checkBox0;
								          this.setState({checkStatus0: event.target.checked}, function () {
									          //setState 不同步，所以取值必须写在回调里
								          });
							          }}
							>头痛</Checkbox>*/}
							{checkList.map((item,id)=>{
								return(
									<View key={id} style={{marginLeft:60,marginBottom:40}}>
										<Checkbox
										          // checked = {"this.state.checkStatus" + id}
										          checked = {this.state["checkStatus"+id]}
													// checked={false}
										          onChange = {(event) => {
											          // let checkObj = this.state["checkStatus"+id];
											          this.setState({["checkStatus"+id]: event.target.checked}, function () {
												          //setState 不同步，所以取值必须写在回调里
											          });
										          }}
										>{item.name}</Checkbox>
									</View>
								)
							})}
						</Flex>


					</WingBlank>

					{/*<CheckboxItem disabled>Option 3</CheckboxItem>
				<CheckboxItem disabled checked>
					Option 4
				</CheckboxItem>*/}
					<InputItem style={{marginLeft: 40, marginTop: 10}}
					           clear
					           value={this.state.symptom}
					           onChange={(value) => {
						           this.setState({
							           symptom: value,
						           });
					           }}
					           placeholder=""
					>
						其他
					</InputItem>

				</List>

				<Button type="primary" style={mystyles.fixedBtn}>同步</Button>
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
		width:80,
		height:80,
		borderRadius:100
	}
});
