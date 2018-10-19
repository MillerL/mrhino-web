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
	}

};

module.exports = config

