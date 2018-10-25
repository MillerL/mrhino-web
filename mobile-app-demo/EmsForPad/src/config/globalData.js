const globalData = {
	// total: 34,
	// current: 0,
	currentDataId: '',  //当前用户数据ID
	currentCheckUserId: '',  //当前查看的用户身份ID
	// currentUserId: '',  //当前用户身份ID
	inputProgress: 0, //当前填写进度

	userHealthInfoFromEquenment: [],   //通过设备获取的信息被push到这个数组里

	/*通过Pad输入获取的数据*/
	userInfo: {
		Name: '',//用户姓名
		IdCardNo: '',//用户身份证ID
		symptom: '', //症状
		otherSymptom: '', //其他症状
		GeneralSymptoms: [  //一般症状
			{
				Temp: '',//体温
				PR: '',//脉率
				Resp: '', //呼吸频率
				NibpAver: '',//血压（平均压）
				Height: '',//身高
				Weight: '',//体重
				waistline: '',//腰围
				bmi: '',//体质指数
				agedLiveStatus: '',//老年人生活状态自我评估
				agedSelfCareStatus: '', //老年人生活自理能力自我评估
				agedCognitive: '', //老年人认知功能
				agedEmotionStatus: '', //老年人情感状态
				intelligenceScore: '',//智力得分
				emotionScore: '',//抑郁评分得分
			}],
		lifeStyle: [{  //生活方式
			trainRate: '',  //锻炼频率

			exerciseTimeByMin: '',  //锻炼时间/分钟
			exerciseTimeByYear: '',  //锻炼时间/年
			exerciseWay: '',  //锻炼方式
			foodHabit:'', //饮食习惯

			smokingStatus: '', //吸烟状况
			smokingNumsByDay: '', //日均几只烟
			startSmokingAge: '', //开始吸烟年龄
			stopSmokingAge: '', //戒烟年龄

			drinkingStatus: '',//喝酒状况
			drinkingByDay: '',//日饮酒量
			isOutAlcohol: '',//是否戒酒
			startDrinkingAge: '',//开始饮酒年龄
			isDrinkingThisYear: '',//近一年内是否曾醉酒

			odh: '',//职业病危害因素接触史
			poisonType: '',//毒物种类
		}]
	}

};

export default globalData;