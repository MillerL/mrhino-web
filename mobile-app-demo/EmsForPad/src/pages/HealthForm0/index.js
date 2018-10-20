import React, {Component} from 'react';
import {Text, View, Image, ViewStyle, StyleSheet, Alert,TouchableHighlight} from 'react-native';
import {WhiteSpace, WingBlank, InputItem, Flex, List, Checkbox,Progress,Button,TextareaItem} from 'antd-mobile-rn';
// import view from '../../config/globalData';
import Server from '../../utils/Server';
import globalData from '../../config/globalData';
import BaiduOcrServer from "../../utils/BaiduOcrServer";
import ImagePicker from "react-native-image-picker";
import config from '../../config/config';
import Util from '../../utils/Util';

type Props = {};

export default class HealthForm0 extends React.Component<any, any> {
	static navigationOptions = {title: "首页"};

	constructor(props: any, context: any) {
		super(props, context);
		this.navigation = props.navigation;
		this.state = {
			checksArr:config.checkList, //多选的数组对象
			symptomArray: [], //症状数组
			symptom: '', //症状
			otherSymptom:'', //其他症状
			percent: 0,  //整体进度
		};
		console.log(this.state)
	};

	//同步数据
	syncData =() =>{
		console.log('同步数据')
		let self = this;
		var symptom = globalData.userInfo.symptom;
		var otherSymptom= globalData.userInfo.otherSymptom;
		if(symptom !== ''){
			//字符串转数据-循环匹配
			var symptomArr = symptom.split(',');
			for (var i = 0; i < symptomArr.length; i++) {
				var name = symptomArr[i];
				for (var j = 0; j < config.checkList.length; j++) {
					var obj = config.checkList[j];
					if(name == obj.name){
						obj.checkStatus = true;
					}
				}
			}
			self.setState({checksArr:config.checkList});
		}
		if(otherSymptom !== ''){
			self.setState({otherSymptom:otherSymptom});
		}
		//同步进度条
		this.setState({ percent: globalData.inputProgress });
	}
	//上传数据
	uploadData =()=>{
		let self = this;
		self.handleWithData();
		//判断是否输入为空
		let sArray = self.state.symptomArray;
		let otherSymptom = self.state.otherSymptom;

		if(sArray.length > 0 || otherSymptom!==''){
			var pageString = sArray.join();
			console.log(pageString)
			var data = {
				symptom : pageString,
				otherSymptom:otherSymptom
			}
			console.log(data)
			Server.postHealthInfo(data,function (res) {
				console.log(res)
				Server.showAlert('同步成功');
				let data=res.data;
				Server.syncGlobalData(data); //同步global数据
				//同步进度条
				this.setState({ percent: globalData.inputProgress });
			})
		}else {
			Server.showAlert('输入值为空');
		}
	}
	//处理数据
	handleWithData =()=>{
		//遍历数组找出勾选的项目
		let self = this;
		let checksArr = self.state.checksArr;
		if(checksArr.length > 0){
			for (var i =0; i < checksArr.length; i++) {
				var obj = checksArr[i];
				if(obj.checkStatus == true){
					//PUSH到预制数组
					self.state.symptomArray.push(obj.name)
				}
			}
		}
	}

	//OCR获取文字信息
	openCamera = () => {
		let self = this;
		console.log('打开摄像')
		//通过获取设备相册图片
		ImagePicker.showImagePicker(config.image_picker_options, (response) => {
			// console.log(response)
			var image = response.data;  //base64 data 并且encode
			self.setState({spinner: true});//显示LOADING
			//获取图片上面的文字
			BaiduOcrServer.getTextInfoByOcr(image, function (words) {
				console.log(words)
				let wordsArr =[];
				if(words.length >0){
					for (var i = 0; i < words.length; i++) {
						var obj = words[i];
						wordsArr.push(obj.words +',')
					}
				}
				let wordStr = wordsArr.join();
				self.setState({otherSymptom: wordStr})  //识别其他症状
			})
		});
		/*ImagePicker.launchCamera(options, (response) => {
			// Same code as in above section!
			console.log(response)
			var data = response.data;
		});*/
	}

	//渲染之前初始化数据
	componentWillMount(){
		let self = this;
		// console.log('currentCheckUserId' + globalData.currentCheckUserId);
		self.syncData(); //同步
	}
	render() {
		const styles = {
			marginTop: 80,
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
		};
		return (
			<View style={{height:'100%'}}>
				<WhiteSpace />
				<View>
					<View style={{ marginRight: 10, height: 10, flex: 1 }}>
						<Progress percent={this.state.percent} style={{ height: 10}}/>
					</View>
					<Text style={{marginTop:10}}>填写进度 {this.state.percent}%</Text>
				</View>
				<WhiteSpace />
				{/*<Progress percent={5} />*/}

				<List style={{marginTop: 12}}>
					<Text style={{marginTop: 12, marginLeft: 20, marginBottom: 22, fontSize: 20}}>症状</Text>

					<WingBlank style={{marginBottom: 5}}>

						<Flex direction="row" wrap="wrap" style={{padding:20}}>
							{config.checkList.map((item,id)=>{
								return(
									<View key={id} style={{marginLeft:60,marginBottom:40}}>
										<Checkbox
										          // checked = {"this.state.checkStatus" + id}
										          checked = {this.state.checksArr[id]["checkStatus"]}
													// checked={false}
										          onChange = {(event) => {
											          let checkObjArr = this.state.checksArr;
											          checkObjArr[id]["checkStatus"] =  event.target.checked
											          this.setState({checksArr: checkObjArr}, function () {
												          //setState 不同步，所以取值必须写在回调里
												          console.log(this.state.checksArr)
											          });
										          }}
										>{item.name}</Checkbox>
									</View>
								)
							})}
						</Flex>

					</WingBlank>

					<Flex direction='row' justify='start' align='start'>
						<Text style={{marginTop: 12, marginLeft: 14, marginBottom: 10}}>
							其他
						</Text>
						<TouchableHighlight onPress={this.openCamera}>
							<Image style={mystyles.iconBase} source={require('../../assets/camera.png')}/>
						</TouchableHighlight>
					</Flex>
					<WingBlank>
						<TextareaItem
							rows={4}  value={this.state.otherSymptom}
							onChange={(value: any) => {
								this.setState({
									otherSymptom: value,
								});
							}}
							placeholder="" autoHeight style={{ paddingVertical: 5 }} />
					</WingBlank>
				</List>

				<View style={mystyles.fixedBtn}>
					<Button type="primary" onClick={this.uploadData}>同步</Button>
				</View>
			</View>
		);
	}
}

const mystyles = StyleSheet.create({
	iconBase: {
		width: 30,
		height: 30,
		marginLeft:40
	},
	checkStyle: {
		marginBottom: 30,
		marginTop: 30,
		marginLeft:30,
		padding:10
	},
	fixedBtn:{
		// marginTop:40,
		position:'absolute',
		bottom:30,
		right:30,
		width:120,
		height:80,
		borderRadius:100
	},
});
