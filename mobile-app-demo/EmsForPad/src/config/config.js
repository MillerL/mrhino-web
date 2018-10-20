const config = {
	//image-picker 配置
	image_picker_options:{
		title: '拍照',
		// customButtons: [{ name: 'fb', title: 'Choose Photo' }],
		mediaType: 'photo',//'photo', 'video', or 'mixed' on iOS, 'photo' or 'video' on Android
		// maxWidth:2000,
		// maxHeight:1200,
		quality: 0.6, //0 to 1, photos only
		storageOptions: {
			skipBackup: false,
			path: 'images',
		},
	},
  //症状
	checkList : [
		{checkStatus: false, name: '无症状'}, {checkStatus: false, name: '头晕'}, {
			checkStatus: false,
			name: '头晕'
		}, {checkStatus: false, name: '心悸'},
		{checkStatus: false, name: '胸闷'}, {checkStatus: false, name: '胸痛'}, {
			checkStatus: false,
			name: '慢性咳嗽'
		}, {checkStatus: false, name: '咳痰'},
		{checkStatus: false, name: '呼吸困难'}, {checkStatus: false, name: '多饮'}, {
			checkStatus: false,
			name: '多尿'
		}, {checkStatus: false, name: '体重下降'},
		{checkStatus: false, name: '乏力'}, {checkStatus: false, name: '关节肿痛'}, {
			checkStatus: false,
			name: '视力模糊'
		}, {checkStatus: false, name: '手脚麻木'},
		{checkStatus: false, name: '尿急'}, {checkStatus: false, name: '尿痛便秘'}, {
			checkStatus: false,
			name: '便秘'
		}, {checkStatus: false, name: '腹泻'},
		{checkStatus: false, name: '恶心呕吐'}, {checkStatus: false, name: '眼花'}, {
			checkStatus: false,
			name: '耳鸣'
		}, {checkStatus: false, name: '乳房胀痛'}],

	//一般症状
	configData : {
        agedLiveStatus:['满意','基本满意','说不清楚','不太满意','不满意'],
        agedSelfCareStatus:['可自理（0~3分）','轻度依赖（4~8分）','中度依赖（9~18分）','不能自理（≥19分）'],
        agedCognitive:['粗筛阴性','粗筛阳性'],
        agedEmotionStatus:['粗筛阴性','粗筛阳性']
    },

	//生活方式
	configLifeStyle: {
		trainRate: ['每天', '每周一次以上', '偶尔', '不锻炼'],
		foodHabit: [
			{checkStatus: false, name: '荤素均衡'}, {checkStatus: false, name: '荤食为主'}, {checkStatus: false, name: '素食为主'},
			{checkStatus: false, name: '嗜盐'}, {checkStatus: false, name: '嗜油'}, {checkStatus: false, name: '嗜糖'}],
		smokingStatus:['从不吸烟', '已戒烟', '吸烟'],
		drinkingStatus:['从不', '偶尔', '经常','每天'],
		isOutAlcohol:['未戒酒', '已戒酒'],
		odh:['无', '有'], //职业病家庭史
		poisonType:['粉尘', '放射物质','物理因素', '化学物质','其他']
	},


	//显示数据--字段名字
	GeneralSymptomsString: {
		'Temp': '体温',//体温
		'PR': '脉率',//脉率
		'Resp': '呼吸频率', //呼吸频率
		'NibpAver': '血压（平均压）',//血压（平均压）
		'Height': '身高',//身高
		'Weight': '体重',//体重
		'waistline': '腰围',//腰围
		'bmi': '体质指数',//体质指数
		'agedLiveStatus': '老年人生活状态自我评估',//老年人生活状态自我评估
		'agedSelfCareStatus': '老年人生活自理能力自我评估', //老年人生活自理能力自我评估
		'agedCognitive': '老年人认知功能', //老年人认知功能
		'agedEmotionStatus': '老年人情感状态', //老年人情感状态
		'intelligenceScore': '智力得分',//智力得分
		'emotionScore': '抑郁评分得分',//抑郁评分得分
	},
	lifeStyleString: {  //生活方式
		'trainRate': '锻炼频率',  //锻炼频率

		'exerciseTimeByMin': '锻炼时间/分钟',  //锻炼时间/分钟
		'exerciseTimeByYear': '锻炼时间/年',  //锻炼时间/年
		'exerciseWay': '锻炼方式',  //锻炼方式
		'foodHabit':'饮食习惯', //饮食习惯

		'smokingStatus': '吸烟状况', //吸烟状况
		'smokingNumsByDay': '日均几只烟', //日均几只烟
		'startSmokingAge': '开始吸烟年龄', //开始吸烟年龄
		'stopSmokingAge': '戒烟年龄', //戒烟年龄

		'drinkingStatus': '喝酒状况',//喝酒状况
		'drinkingByDay': '日饮酒量',//日饮酒量
		'isOutAlcohol': '是否戒酒',//是否戒酒
		'startDrinkingAge': '开始饮酒年龄',//开始饮酒年龄
		'isDrinkingThisYear': '近一年内是否曾醉酒',//近一年内是否曾醉酒

		'odh': '职业病危害因素接触史',//职业病危害因素接触史
		'poisonType': '毒物种类',//毒物种类
	}
};

module.exports = config

