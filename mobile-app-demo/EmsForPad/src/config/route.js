// 引入依赖
import React from "react";
import {StackNavigator} from "react-navigation";

// 引入页面组件
import HomeTab from "../pages/HomeTab";
import BasicForm from "../pages/BasicForm";
import HealthForm from "../pages/HealthForm";
import Home from "../pages/Home";
import Test from "../pages/Test";

// 配置路由
const AppNavigator = StackNavigator({
	HomeTab: {
		screen: HomeTab,
		navigationOptions: {
			header:null
			/*headerTitle: '个人基本信息表',
			headerStyle:{
				height:35
			},
			headerTitleStyle:{
				fontSize:14,
				color:'#666',
			}*/
		}
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
	HealthForm: {
		screen: HealthForm
	},
	Home: {
		screen: Home
	},
	Test: {
		screen: Test
	}
});

export default () => <AppNavigator/>;
