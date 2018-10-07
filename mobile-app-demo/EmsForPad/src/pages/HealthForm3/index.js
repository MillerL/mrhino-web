import React, {Component} from 'react';
import { ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Button, InputItem, List, Radio, WhiteSpace } from 'antd-mobile-rn';
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

	render() {
		return (
			<View>
				<View style={{ padding: 10 }}>
					<Radio
						checked={this.state.part1Value === 1}
						onChange={(event: any) => {
							if (event.target.checked) {
								this.setState({ part1Value: 1 });
							}
						}}
						style={{ borderWidth: 1, borderColor: '#999', margin: 10 }}
					>
						Support
					</Radio>
					<WhiteSpace />
					<Radio
						checked={this.state.part1Value === 2}
						onChange={(event: any) => {
							if (event.target.checked) {
								this.setState({ part1Value: 2 });
							}
						}}
						style={{ borderWidth: 1, borderColor: '#999', margin: 10 }}
					/>
					<WhiteSpace />
				</View>

				<List style={{ marginTop: 12 }}>
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
						Use Ant Desgin Component
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
				</List>
			</View>
		);
	}
}
