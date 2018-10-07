import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {WhiteSpace, WingBlank, InputItem, List, Button } from 'antd-mobile-rn';
// import view from './view';

type Props = {};
export default class BasicForm extends Component<Props>{
	constructor(props) {
		super(props);
		this.navigation = props.navigation;
		this.state = {
			value: '',
			value1: '',
			value2: '',
			value3: '',
			value4: '',
			labelnum1: '',
			labelnum2: '',
			labelnum3: '',
			text: '',
			bankCard: '',
			phone: '',
			password: '',
			number: '',
		};
	}

	render() {
		return (
			<ScrollView style={{ flex: 1 }}
			            automaticallyAdjustContentInsets={false}
			            showsHorizontalScrollIndicator={false}
			            showsVerticalScrollIndicator={false}>
				<List renderHeader={() => '个人基本信息表'}>
					<InputItem
						defaultValue="xx"
						clear
						placeholder="自动获取光标">
						标题
					</InputItem>
				</List>
				<List renderHeader={() => '固定标签字数'}>
					<InputItem
						clear
						value={this.state.labelnum1}
						onChange={(value: any) => {
							this.setState({
								labelnum1: value,
							});
						}}
						labelNumber={9}
						placeholder="请填写姓名"
					>
						姓名
					</InputItem>
					<InputItem
						clear
						error
						value={this.state.text}
						onChange={(value: any) => {
							this.setState({
								text: value,
							});
						}}
						placeholder="text"
					>
						文本输入
					</InputItem>
					<InputItem
						clear
						type="phone"
						value={this.state.phone}
						onChange={(value: any) => {
							this.setState({
								phone: value,
							});
						}}
						placeholder="phone"
					>
						手机号
					</InputItem>
					<InputItem
						clear
						type="password"
						value={this.state.password}
						onChange={(value: any) => {
							this.setState({
								password: value,
							});
						}}
						placeholder="password"
					>
						密码
					</InputItem>
					<InputItem
						clear
						type="number"
						value={this.state.number}
						onChange={(value: any) => {
							this.setState({
								number: value,
							});
						}}
						placeholder="number"
					>
						数字
					</InputItem>
				</List>

			</ScrollView>
		);
	}
}
