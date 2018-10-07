import React, {Component} from 'react';
import {Text, View,Image} from 'react-native';
import {WhiteSpace, WingBlank, InputItem, List, Button, Checkbox } from 'antd-mobile-rn';
const AgreeItem = Checkbox.AgreeItem;
const CheckboxItem = Checkbox.CheckboxItem;

export default self => (
	<View>
		<View style={{ padding: 10 }}>
			<Checkbox
				checked={this.state.checkBox1}
				style={{ tintColor: '#f00' }}
				onChange={(event: any) => {
					this.setState({ checkBox1: event.target.checked });
				}}
			/>
			<WhiteSpace />
			<Checkbox>Checkbox</Checkbox>
			<WhiteSpace />
			<Checkbox checked disabled />
			<WhiteSpace />
			<Checkbox disabled />
		</View>

		<WhiteSpace />
		<AgreeItem>
			Agree agreement agreement agreement agreement agreement agreement
			agreement
		</AgreeItem>
		<WhiteSpace />
		<AgreeItem
			checked={this.state.agreeItem1}
			checkboxStyle={{ tintColor: '#f00' }}
			onChange={(event: any) => {
				this.setState({ agreeItem1: event.target.checked });
			}}
		>
			Agree agreement
		</AgreeItem>
		<WhiteSpace />
		<AgreeItem disabled>Not selected. Not editable</AgreeItem>
		<WhiteSpace />
		<AgreeItem checked disabled>
			Force selected. Not editable
		</AgreeItem>

		<List style={{ marginTop: 12 }}>
			<Text style={{ marginTop: 12 }}>Multiple options</Text>
			<CheckboxItem
				checked={this.state.checkboxItem1}
				onChange={(event: any) => {
					this.setState({ checkboxItem1: event.target.checked });
				}}
			>
				Option 1
			</CheckboxItem>
			<CheckboxItem>Option 2</CheckboxItem>
			<CheckboxItem disabled>Option 3</CheckboxItem>
			<CheckboxItem disabled checked>
				Option 4
			</CheckboxItem>
		</List>
	</View>
);
