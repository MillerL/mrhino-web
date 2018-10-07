import React, {Component} from 'react';
import {Platform, StyleSheet, Text, Image} from 'react-native';
import view from './view';

export default class HealthForm2 extends Component {
	// 自定义当前页面路由配置，后面介绍的TabNavigator也使用这个对象中的属性
	static navigationOptions = {
		// 设置 title
		title: "健康体检表"
	};
	constructor(props) {
		super(props);
		this.navigation = props.navigation;
	}

	render() {
		return view(this);
	}
}
