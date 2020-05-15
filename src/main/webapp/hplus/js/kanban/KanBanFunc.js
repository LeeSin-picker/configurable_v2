/**
 * Created by liumingyang on 2017/12/13.
 */

var KanBanFunc = {
	//----------------------------------------------------------------保证 页面高度为100%；
	KanBanResize:function(){
		$('body').height($(window).height());
		// $('body').width($(window).width());
		$(window).resize(function () {
			$('body').height($(window).height());
			// $('body').width($(window).width());
		});
	},

	//----------------------------------------------------------------头部、logo、标题、温度、湿度等----------------ajax
	CreateHeaderMessage: function () {

		//---------------------------------logo
		var imgLogoStr = '';
		var imgLogoSrc =initLocation+'img/kanban/TATAlogo.png';
		imgLogoStr = "<img src='"+ imgLogoSrc+"' alt='logo图片'/>";
		 $(".logo").html(imgLogoStr);

		//--------------------------------生产线的标题
		var lineName = "可配置可视化看板";
		$('.titleLineName').html(lineName);

		//--------------------------------温度、湿度等
		var rightTopStr = "";
		var nowTime = KanBanFunc.ShowTime();
		rightTopStr = "<li class='rig timeTop'>"+nowTime+"</li>"
			// + "<li class='rig temperature'>温度：30.6℃</li>"
			// + "<li class='rig opeMode'>运行模式：自动生产</li>"
			// + "<li class='rig humidity'>湿度：50%</li>"
		$(".rightTop").html(rightTopStr);
	},
	CreateHeaderMessage2: function () {

		//---------------------------------logo
		var imgLogoStr = '';
		var imgLogoSrc =initLocation+'img/kanban/TATAlogo.png';
		imgLogoStr = "<img src='"+ imgLogoSrc+"' alt='logo图片'/>";
		 $(".logo").html(imgLogoStr);

		//--------------------------------生产线的标题
		var lineName = "宿州工厂码架自动化生产一线";
		$('.titleLineName').html(lineName);

		//--------------------------------温度、湿度等
		var rightTopStr = "";
		var nowTime = KanBanFunc.ShowTime2();
		rightTopStr = "<li class='rig timeTop'>"+nowTime+"</li>"
			// + "<li class='rig temperature'>温度：30.6℃</li>"
			// + "<li class='rig opeMode'>运行模式：自动生产</li>"
			// + "<li class='rig humidity'>湿度：50%</li>"
		$(".rightTop").html(rightTopStr);
	},

	//----------------------------------------------------------------警告信息---------------------ajax
	CreateWarnMessage: function () {
		var newsWarnStr = "";
//for(var i=0;i<len;i++){
//	newsWarnStr += "<dt class='lef'>"+warnArr[i]+"</dt>"
//}

var newsWarnStr = '';
$.ajax({
	url: 'showDeviceAlarm',
	async: false, //同步请求，返回后整个函数才返回
	type: 'post',
	data: {

	},
	dataType: 'json',
	success: function(data) {
		var data = data.dataRows;
		for(var i=0;i<data.length;i++){
			newsWarnStr += "<dt class='lef dtLeft'>"+data[i].faultCodeName+"：</dt>"
							+ "<dd class='lef'> 设备号："+data[i].deviceNo+"， 设备名称："+data[i].deviceName+"， 故障原因："+data[i].faultCause+"；</dd>"
		}
	},
	error: function() {}
});
		// newsWarnStr = "<dt class='lef'>设备异常:</dt>"
		// 	+ "<dd class='lef'>OP10工站设备异常</dd>"
		// 	+ "<dt class='lef'>设备异常:</dt>"
		// 	+ "<dd class='lef'>OP20工站设备异常</dd>"
		// 	+ "<dt class='lef'>设备异常:</dt>"
		// 	+ "<dd class='lef'>OP30工站设备异常</dd>"
		// 	+ "<dt class='lef'>设备异常:</dt>"
		// 	+ "<dd class='lef'>OP40工站设备异常</dd>"
		// 	+ "<dt class='lef'>设备异常:</dt>"
		// 	+ "<dd class='lef'>OP50工站设备异常</dd>"
		// 	+ "<dt class='lef'>设备异常:</dt>"
		// 	+ "<dd class='lef'>OP60工站设备异常</dd>"
		// 	+ "<dt class='lef'>设备异常</dt>"
		// 	+ "<dd class='lef'>OP70工站设备异常</dd>"
		// 	+ "<dt class='lef'>设备异常:</dt>"
		// 	+ "<dd class='lef'>OP80工站设备异常</dd>"
		// 	+ "<dt class='lef'>设备异常:</dt>"
		// 	+ "<dd class='lef'>OP90工站设备异常</dd>"
		// 	+ "<dt class='lef'>设备异常:</dt>"
		// 	+ "<dd class='lef'>OP100工站设备异常</dd>"
		$("#newsWarn").append(newsWarnStr);
	},


	//-----------------------------------------------------------------警告信息滚动-----需run.com.js
	CrateRunWarnMessage: function () {
		var _scroll = {
			delay: 1000,
			easing: 'linear',
			items: 1,
			//------------------------控制速度
			duration: 0.02,
			timeoutDuration: 0,
			pauseOnHover: 'immediate'
		};
		if($("#newsWarn dt").length>1){
			$('#newsWarn').carouFredSel({
				width: 1000,
				align: false,
				items: {
					width: 'variable',
					height: 35,
					visible: 1
				},
				scroll: _scroll
			});
			//	set carousels to be 100% wide
			$('.caroufredsel_wrapper').css('width', '100%');
		}
		// $('#newsWarn').carouFredSel({
		// 	width: 1000,
		// 	align: false,
		// 	items: {
		// 		width: 'variable',
		// 		height: 35,
		// 		visible: 1
		// 	},
		// 	scroll: _scroll
		// });
		// //	set carousels to be 100% wide
		// $('.caroufredsel_wrapper').css('width', '100%');

		//	set a large width on the last DD so the ticker won't show the first item at the end
//				$('#ticker-2 dd:last').width(2000);
	},
	ShowTime:function(){
		var ShowTimeStr='0';
		$.ajax({
			url: 'gainSysTime',
				type: 'post',
				data: {
				
				},
				async: false,
				dataType: 'json',
				success: function(data) {
					ShowTimeStr = data.sysTime;
					
				},
				error:function(){

				}
		})
		return ShowTimeStr;
	},
	ShowTime2:function(){
		var ShowTimeStr='0';
		$.ajax({
			url: 'message/gainSysTime',
				type: 'post',
				data: {
				
				},
				async: false,
				dataType: 'json',
				success: function(data) {
					ShowTimeStr = data.sysTime;
					
				},
				error:function(){

				}
		})
		return ShowTimeStr;
	},
	//-------------------------------------lmy---------------------------开始轮播表格--------------------ajax
	StartSwiper: function () {
		//-------------保证浏览器最大化最小化切换时“swiper-slide” div的宽度自适应
		$(window).resize(function () {
			$('.swiper-slide').width($(".swiper-container").width());
		});
		var mySwiper = new Swiper('.swiper-container', {
			// direction: 'vertical',
			loop: true,

			// 如果需要分页器
			pagination: '.swiper-pagination',
			paginationClickable: true,
			// 如果需要前进后退按钮
			nextButton: '.swiper-button-next',
			prevButton: '.swiper-button-prev',
			autoplay: 6000

			// 如果需要滚动条
			// scrollbar: '.swiper-scrollbar',
		});
	}


};