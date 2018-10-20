import React, {Component} from 'react';
import { ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Button, InputItem, List } from 'antd-mobile-rn';
import Server from "../../utils/Server";
// import view from './view';


export default class HealthForm1 extends Component<Props> {
	constructor(props) {
		super(props);
		this.navigation = props.navigation;
		this.state = {

		};
	}
//初始化数据
	componentDidMount() {
		let self = this;
		Server.showAlert('敬请期待');
	}
	render() {
		return (
			<ScrollView
				style={{ flex: 1 }}
				automaticallyAdjustContentInsets={false}
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
			>
			</ScrollView>
		);
	}
}
