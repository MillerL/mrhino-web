const globalData = {
	// total: 34,
	// current: 0,
	currentDataId: '5bc07e2c63794f42a5926463',  //默认当前用户数据ID
	currentCheckUserId: '',  //当前查看的用户身份ID
	// currentUserId: '',  //当前用户身份ID
	inputProgress: {
		total: 40, //总进度
		currentProgress: 0,  //当前填写进度
		percent: '' //百分比
	},

	userHealthInfoFromEquenment: [],   //通过设备获取的信息被push到这个数组里

	/*通过Pad输入获取的数据*/
	userInfo: {
		Name: '',//用户姓名
		IdCardNo: '',//用户身份证ID
		symptom: '', //症状
		otherSymptom: '', //其他症状
		GeneralSymptoms: [
			{
				Temp: '',//体温
				PR: '',//脉率
				Resp: '', //呼吸频率
				NibpAver: '',//血压（平均压）
				Height: '',//身高
				Weight: '',//体重
				waistline: '',//腰围
				bmi: '',//体质指数
				agedLiveStatus: 0,//老年人生活状态自我评估
				agedSelfCareStatus: 0, //老年人生活自理能力自我评估
				agedCognitive: 0, //老年人认知功能
				agedEmotionStatus: 0, //老年人情感状态
				// intelligenceScore: '',//智力得分
				// emotionScore: '',//抑郁评分得分
			}]
	}

};

export default globalData;