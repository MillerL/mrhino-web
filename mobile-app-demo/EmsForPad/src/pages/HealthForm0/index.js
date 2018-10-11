import React, {Component} from 'react';
import {Text, View, Image,ViewStyle} from 'react-native';
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
			text: '', //其他 文本
			percent: 40,
		};
		for (var i = 0; i < checkList.length; i++) {
			var objKey = 'checkStatus' + i;
			this.state[objKey] = false
		}
		;
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
			<View>
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
						<Flex direction="row" justify="around" wrap="wrap">
							<Flex.Item style={{paddingBottom: 14}}>
								<CheckboxItem
									checked={this.state.checkStatus0}
									onChange={(event: any) => {
										// var checkObj = checksArr[0].checkBox0;
										this.setState({checkStatus0: event.target.checked}, function () {
											//setState 不同步，所以取值必须写在回调里
										});
									}}
								>
									无症状
								</CheckboxItem>
							</Flex.Item>
							<Flex.Item style={{paddingBottom: 14}}>
								<CheckboxItem>头痛</CheckboxItem>
							</Flex.Item>
							<Flex.Item style={{paddingBottom: 14}}>
								<CheckboxItem>心悸</CheckboxItem>
							</Flex.Item>
							<Flex.Item style={{paddingBottom: 14}}>
								<CheckboxItem>胸闷</CheckboxItem>
							</Flex.Item>
							<Flex.Item style={{paddingBottom: 14}}>
								<CheckboxItem>胸痛</CheckboxItem>
							</Flex.Item>
							<Flex.Item style={{paddingBottom: 14}}>
								<CheckboxItem>慢性咳嗽</CheckboxItem>
							</Flex.Item>
						</Flex>
						<Flex direction="row" justify="around" wrap="wrap">
							<Flex.Item style={{paddingBottom: 14}}>
								<CheckboxItem>咳痰</CheckboxItem>
							</Flex.Item>
							<Flex.Item style={{paddingBottom: 14}}>
								<CheckboxItem>呼吸困难</CheckboxItem>
							</Flex.Item>
							<Flex.Item style={{paddingBottom: 14}}>
								<CheckboxItem>多饮</CheckboxItem>
							</Flex.Item>
							<Flex.Item style={{paddingBottom: 14}}>
								<CheckboxItem>多尿</CheckboxItem>
							</Flex.Item>
							<Flex.Item style={{paddingBottom: 14}}>
								<CheckboxItem>体重下降</CheckboxItem>
							</Flex.Item>
							<Flex.Item style={{paddingBottom: 14}}>
								<CheckboxItem>乏力</CheckboxItem>
							</Flex.Item>

						</Flex>
						<Flex direction="row" justify="around">
							<Flex.Item style={{paddingBottom: 14}}>
								<CheckboxItem>关节肿痛</CheckboxItem>
							</Flex.Item>
							<Flex.Item style={{paddingBottom: 14}}>
								<CheckboxItem>视力模糊</CheckboxItem>
							</Flex.Item>
							<Flex.Item style={{paddingBottom: 14}}>
								<CheckboxItem>手脚麻木</CheckboxItem>
							</Flex.Item>
							<Flex.Item style={{paddingBottom: 14}}>
								<CheckboxItem>视力模糊</CheckboxItem>
							</Flex.Item>
							<Flex.Item style={{paddingBottom: 14}}>
								<CheckboxItem>尿急</CheckboxItem>
							</Flex.Item>
							<Flex.Item style={{paddingBottom: 14}}>
								<CheckboxItem>尿痛便秘</CheckboxItem>
							</Flex.Item>
						</Flex>
						<Flex direction="row" justify="around">
							<Flex.Item style={{paddingBottom: 14}}>
								<CheckboxItem>便秘</CheckboxItem>
							</Flex.Item>
							<Flex.Item style={{paddingBottom: 14}}>
								<CheckboxItem>腹泻</CheckboxItem>
							</Flex.Item>
							<Flex.Item style={{paddingBottom: 14}}>
								<CheckboxItem>恶心呕吐</CheckboxItem>
							</Flex.Item>
							<Flex.Item style={{paddingBottom: 14}}>
								<CheckboxItem>眼花</CheckboxItem>
							</Flex.Item>
							<Flex.Item style={{paddingBottom: 14}}>
								<CheckboxItem>耳鸣</CheckboxItem>
							</Flex.Item>
							<Flex.Item style={{paddingBottom: 14}}>
								<CheckboxItem>乳房胀痛</CheckboxItem>
							</Flex.Item>
						</Flex>

					</WingBlank>

					{/*<CheckboxItem disabled>Option 3</CheckboxItem>
				<CheckboxItem disabled checked>
					Option 4
				</CheckboxItem>*/}
					<InputItem style={{marginLeft: 40, marginTop: 10}}
					           clear
					           value={this.state.text}
					           onChange={(value: any) => {
						           this.setState({
							           text: value,
						           });
					           }}
					           placeholder=""
					>
						其他
					</InputItem>

				</List>
			</View>
		);
	}
}
