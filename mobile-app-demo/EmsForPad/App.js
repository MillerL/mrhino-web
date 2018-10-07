import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Route from './src/config/route';
// import Button from 'antd-mobile-rn/lib/button';

type Props = {};
export default class App extends Component<Props> {
	constructor(props) {
		super(props);
	}
	render() {
		/*return (
			<View style={styles.container}>
				{/!*<Text style={styles.welcome}>Welcome to React Native!</Text>*!/}
				{/!*<Text style={styles.instructions}>sdadas</Text>*!/}
				<Text>Welcome to React Native!</Text>
				<Text>好你骂你</Text>
			</View>
		);*/
		return <Route />;
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
});


/*
import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Route from './src/config/route';
type Props = {};

export default class App extends Component<Props> {
	constructor(props) {
		super(props);
	}

	render() {
		// 渲染页面
		// return <Route />;
		<View>
			<Text>Welcome to React Native!</Text>
			<Text>好你骂你</Text>
		</View>
	}
}
*/
