// 引入依赖
import React from "react";
import {StackNavigator} from "react-navigation";

// 引入页面组件
import HomeTab from "../pages/HomeTab";
import BasicForm from "../pages/BasicForm";
import HealthForm from "../pages/HealthForm";
import UserList from "../pages/UserList";
import UserInfo from "../pages/UserInfo";
import Home from "../pages/Home";
import Test from "../pages/Test";

// 配置路由
const AppNavigator = StackNavigator({
	Home: {
		screen: Home
	},
	HomeTab: {
		screen: HomeTab
	},
	BasicForm: {
		screen: BasicForm,
		navigationOptions: {
			headerTitle: '健康体检表',
			headerStyle:{
				height:35
			},
			headerTitleStyle:{
				fontSize:14,
				color:'#666',
			}
		}
	},
	UserList:{
		screen: UserList
	},
	UserInfo:{
		screen: UserInfo
	},
	HealthForm: {
		screen: HealthForm
	},
	Test: {
		screen: Test
	}
});

export default () => <AppNavigator/>;
