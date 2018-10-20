import React, {Component} from 'react';
import { ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Button, InputItem, List, Radio, WhiteSpace } from 'antd-mobile-rn';
import Server from '../../utils/Server';
// import view from './view';
const RadioItem = Radio.RadioItem;

export default class HealthForm3 extends Component<Props> {
	constructor(props) {
		super(props);
		this.navigation = props.navigation;
		this.state = {
			part1Value: 1,
			part2Value: 1,
		};
	}

  //初始化数据
	componentDidMount() {
		let self = this;
		Server.showAlert('敬请期待');
	}
	render() {
		return (
			<View>
				{/*<WhiteSpace>
					敬请期待
					<Text style={{fontSize:24,color:'#333',textAlign:'center'}}>敬请期待</Text>
				</WhiteSpace>*/}

				{/*<List style={{ marginTop: 12 }}>
					<Text style={{ marginTop: 12 }}>
						Form radio, radio in general list.
					</Text>
					<RadioItem
						checked={this.state.part2Value === 1}
						onChange={(event: any) => {
							if (event.target.checked) {
								this.setState({ part2Value: 1 });
							}
						}}
					>
						Use Ant D大
					</RadioItem>
					<RadioItem
						checked={this.state.part2Value === 2}
						onChange={(event: any) => {
							if (event.target.checked) {
								this.setState({ part2Value: 2 });
							}
						}}
					>
						Use Ant Desgin Component
					</RadioItem>
					<RadioItem disabled>Set disabled</RadioItem>
					<RadioItem disabled checked>
						Set disabled
					</RadioItem>
				</List>*/}
			</View>
		);
	}
}
