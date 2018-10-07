import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';

export default self => (
	<View>
		<Text style={{ fontSize: 36 }}>home</Text>
		<Button
			title="goSTest"
			// 路由跳转
			onPress={() => self.navigation.navigate("Test")}
		/>
	</View>
);
