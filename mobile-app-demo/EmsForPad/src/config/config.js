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


	//一般症状
	configData : {
        agedLiveStatus:['满意','基本满意','说不清楚','不太满意','不满意'],
        agedSelfCareStatus:['可自理（0~3分）','轻度依赖（4~8分）','中度依赖（9~18分）','不能自理（≥19分）'],
        agedCognitive:['粗筛阴性','粗筛阳性'],
        agedEmotionStatus:['粗筛阴性','粗筛阳性']
    }

};

module.exports = config

