import React, {Component} from 'react';
import {Text, View, Image, ScrollView, ViewStyle, StyleSheet} from 'react-native';
import {WhiteSpace, WingBlank, InputItem, Flex, List, Checkbox,Progress,Button} from 'antd-mobile-rn';


export default class UserList extends React.Component<any, any> {
	static navigationOptions = {
		// 设置 title
		title: "首页"
	};

	constructor(props: any, context: any) {
		super(props, context);
		this.navigation = props.navigation;
		this.state = {

		};

	};


	render() {

		return (
			<View style={{height:'100%'}}>
				<WhiteSpace />

			</View>
		);
	}
}

const mystyles = StyleSheet.create({

});
