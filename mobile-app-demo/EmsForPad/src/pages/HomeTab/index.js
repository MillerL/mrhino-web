// 引入页面组件
import React , {Component} from "react";
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import BasicForm from "../../pages/BasicForm";
import HealthForm0 from "../../pages/HealthForm0";
import HealthForm1 from "../../pages/HealthForm1";
import HealthForm2 from "../../pages/HealthForm2";
import HealthForm3 from "../../pages/HealthForm3";
import HealthForm4 from "../../pages/HealthForm4";
import {TabNavigator, createBottomTabNavigator} from 'react-navigation';
// import CustomHeader from '../../config/CustomHeader'

export default class HomeTab extends Component {
	static navigationOptions = {
		// 设置 title
		title: "首页"
	};
	constructor(props) {
		super(props);
		this.navigation = props.navigation;
	}
	render() {
		return (
			<BottomTabNavigator />
		);
	}
}

const BottomTabNavigator = createBottomTabNavigator(
	{
		HealthForm0: {
			screen: HealthForm0,
			navigationOptions: {
				tabBarLabel: "症状",
				tabBarIcon: ({ focused }) => {
					// 根据是否选中，显示不同图片
					const icon = focused
						? require('../../assets/images/tab_0_active.png')
						: require('../../assets/images/tab_0.png');
					return <Image source={icon} style={{ height: 20, width: 20 }} />;
				},
				header: props => <CustomHeader {...props} />
				// header: null,
				// headerLeft: null
			},
		},
		HealthForm1: {
			screen: HealthForm1,
			navigationOptions: {
				tabBarLabel: "一般症状",
				tabBarIcon: ({ focused }) => {
					const icon = focused
						? require('../../assets/images/tab_1_active.png')
						: require('../../assets/images/tab_1.png');
					return <Image source={icon} style={{ height: 20, width: 20 }} />;
				},
				header: null,
				headerLeft: null
			}
		},
		HealthForm2: {
			screen: HealthForm2,
			navigationOptions: {
				tabBarLabel: "生活方式",
				tabBarIcon: ({ focused }) => {
					const icon = focused
						? require('../../assets/images/tab_2_active.png')
						: require('../../assets/images/tab_2.png');
					return <Image source={icon} style={{ height: 20, width: 20 }} />;
				},
				header: null,
				headerLeft: null
			}
		},
		HealthForm3: {
			screen: HealthForm3,
			navigationOptions: {
				tabBarLabel: "查体",
				tabBarIcon: ({ focused }) => {
					const icon = focused
						? require('../../assets/images/tab_3_active.png')
						: require('../../assets/images/tab_3.png');
					return <Image source={icon} style={{ height: 20, width: 20 }} />;
				},
				header: null,
				headerLeft: null
			}
		},
		HealthForm4: {
			screen: HealthForm4,
			navigationOptions: {
				tabBarLabel: "辅助检查",
				tabBarIcon: ({ focused }) => {
					const icon = focused
						? require('../../assets/images/tab_4_active.png')
						: require('../../assets/images/tab_4.png');
					return <Image source={icon} style={{ height: 20, width: 20 }} />;
				},
				header: null,
				headerLeft: null
			}
		}
	},

	{
		// 初始化哪个界面为显示的第一个界面，如果不配置，默认使用RouteConfigs中的第一个页面当做根界面
		initialRouteName: "HealthForm0",
		lazy: true,
		tabBarOptions: {
			inactiveTintColor: "#8F8F8F",
			activeTintColor: "#2279ed",
			labelStyle: {
				fontSize: 11
			}
		},
		navigationOptions: {
			headerStyle: {
				backgroundColor: "transparent"
			},
			headerTitleStyle: {
				fontWeight: "bold",
				color: "#fff",
				zIndex: 1,
				fontSize: 18,
				lineHeight: 23,
				fontFamily: "CircularStd-Bold"
			},
			headerTintColor: "#fff",
			animationEnabled: true
		}

	}
);

const styles = StyleSheet.create({
	tabBarIconStyle: {
		width: 30,
		height: 30,
	},
});
