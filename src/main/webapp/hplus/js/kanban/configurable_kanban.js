//创建echarts的容器
function createDiv(num) {
	var div = $("<div>");
	div.attr("id", "ect" + num);
	div.attr("index", "" + num);
	$(".container").append(div);
}
//创建加载图片的容器
function imageDiv(ajaxUrl, index, whType, width, height, clientX, clientY) {
	var div = $("<div>");
	div.attr("id", "ect" + index);
	div.attr("index", "" + index);
	div.append("<img src='' width=100% height=100% >");
	var imgUrl = '/imageUrl/' + ajaxUrl;
	div.find('img').eq(0).attr('src', imgUrl);
	$(".container").append(div);
	div.css("position", "absolute");
	if (whType == 'percent') {
		div.css("width", width + "%");
		div.css("height", height + "%");
	} else if (whType == 'pixel') {
		div.css("width", width + "px");
		div.css("height", height + "px");
	}
	div.css("left", clientX + "%");
	div.css("top", clientY + "%");
	div.css("border", 'red');
}
//创建jqgrid的容器
function createTable(index, whType, width, height, clientX, clientY) {
	var div = $("<div>");
	var pageDiv = $("<div>");
	var table = $("<table>");
	div.attr("id", "ect" + index);
	div.attr("index", "" + index);
	table.attr("id", "table" + index);
	pageDiv.attr('id', "table_page" + index)
	$(".container").append(div);
	div.append(table);
	div.append(pageDiv);
	/*设置div的大小和位置-fzy*/
	$("#ect" + index).css("position", "absolute");
	if (whType == 'percent') {
		$("#ect" + index).css("width", width + "%");
		$("#ect" + index).css("height", height + "%");
	} else if (whType == 'pixel') {
		$("#ect" + index).css("width", width + "px");
		$("#ect" + index).css("height", height + "px");
	}
	$("#ect" + index).css("left", clientX + "%");
	$("#ect" + index).css("top", clientY + "%");
	$("#ect" + index).css("background", '#0C1622');
	/*$("#ect" + num).css("border", '1px solid red');*/
}
/*获取图片相关的数据-fzy*/
function imageCreate(ajaxUrl, timer, index, whType, width, height, clientX, clientY) {
	/*清除定时器*/
	if (timer < 60) {
		timer = 60
	}
	console.log(11111111111111111111111111111111)
	imageDiv(ajaxUrl, index, whType, width, height, clientX, clientY);
	clearInterval(timer1);
	var timer1 = setInterval(function () {
		var imgUrl = '/imageUrl/' + ajaxUrl + '?t=' + Math.random();
		$("#ect" + index).find('img').eq(0).attr('src', imgUrl);
	}, timer * 1000);
}

/*获取表格相关数据-fzy*/
function jqTableCreate(namespace, method, params, timer, tableCaptionInfor, tableColWidth, ajaxUrl, index, width, height, clientX, clientY, whType, echartsTitle, dataInputType) {
	/*清除定时器*/
	if (timer < 60) {
		timer = 60
	}
	clearInterval(timer2);
	createTable(index, whType, width, height, clientX, clientY);
	if (dataInputType == 'webService') {
		jqgridCreate2(namespace, method, params, ajaxUrl, tableColWidth, tableCaptionInfor, "table" + index, 'table_page' + index, index, echartsTitle);
	} else {
		jqgridCreate(params, ajaxUrl, tableColWidth, tableCaptionInfor, "table" + index, 'table_page' + index, index, echartsTitle);
	}
	resizeFunc("#table" + index, '#ect' + index);
	/*设置定时器*/
	if (timer) {
		var timer2 = setInterval(function () {
			$("#table" + index).trigger("reloadGrid");
		}, timer * 1000);
	} else {
		var timer2 = setInterval(function () {
			$("#table" + index).trigger("reloadGrid");
		}, 60000);
	}
}
//jqgrid表格(http请求)
function jqgridCreate(params, ajaxUrl, tableColWidth, tableCaptionInfor, tableId, pageId, index, echartsTitle) {
	var colNames = [];
	var colModel = [];
	var stringTable1 = tableCaptionInfor.split(',');
	var tableWidthArr = tableColWidth.split(':');
	for (var i = 0; i < stringTable1.length; i++) {
		var stringTable2 = stringTable1[i].split(':');
		var objKey = stringTable2[0];
		var objValue = stringTable2[1];
		colNames.push(objKey);
		var colModelItem = {
			name: objValue,
			index: objValue,
			editable: true,
			edittype: 'text',
			editrules: {
				required: false,
				custom: true,
				custom_func: [true, ""]
			},
			width: tableWidthArr[i],
			hidden: false,
			frozen: true
		};
		colModel.push(colModelItem);
	}
	if (params) {
		/*正则校验'&'是否存在*/
		var reg = /&/;
		if (reg.test(params)) {
			var curPageInput = params.split('&')[0].split('curPage:')[1];
			var pageSizeInput = params.split('&')[1].split('pageSize:')[1];
		}
	} else {
		var curPageInput = 1;
		var pageSizeInput = 5;
		params = 'curPage:1' + ',pageSize:5';
	}

	$.jgrid.defaults.styleUI = "Bootstrap";
	$("#" + tableId).jqGrid({
		url: commonIp + '/httpResult',
		postData: {
			'url': ajaxUrl,
			'params': params
		},
		datatype: "json",
		caption: echartsTitle,
		loadtext: "Loading...", //默认值：Loading...
		loadError: showError, //如果请求服务器失败则调用此方法showError;  位于js/jqGrid/grid.js
		/* 	colNames: ['主键ID', '批号', '订单主键', '状态','排产失败原因','木方厚度','门扇厚度','封边条编码','雕刻时长','掏洞时长','是否CNC排序','填充板长','填充板宽','填充板厚','填充板中心X坐标','填充板中心Y坐标','旋转角度','Order1','Order2','Order3','Order4','Order5',
			'Order6','Order7','预留字段2','预留字段3','预留字段4','扩展参数2','扩展参数3','创建时间','创建人','修改时间','修改人','排序','是否启用','备注'], */
		//colNames: ['产线id', '编号', '名称','占比', '计划总数', '已完成','未完成','当前节拍','要求节拍'],
		//中车列表假数据-fzy
		colNames: colNames,
		colModel: colModel,
		loadComplete: function () {

			var re_records = $("#" + tableId).getGridParam('records');
			if (re_records < 5) {
				for (var i = re_records; i < 5; i++) {
					$("#" + tableId).jqGrid("addRowData", (i + 1), {
						"产线id": "",
						"门型编号": "",
						"门型名称": "",
						"占比": "",
						"计划总数": "",
						"已完成": "",
						"未完成": "",
						"当前节拍": "",
						"要求节拍": ""
					}, "");
				}
			}
			/*屏蔽二线数据新增固定行高*/
			var grid = $("#" + tableId);
			var ids = grid.getDataIDs();
			var parentHeight = ($("#ect" + index).height() - $('.ui-jqgrid-hdiv').height() - $('#' + pageId).height() - $('.ui-jqgrid-caption').height()) / pageSizeInput;
			for (var i = 0; i < ids.length; i++) {
				grid.setRowData(ids[i], false, {
					height: parentHeight
				}); //设置成你要设定的固定行高
			}
		},
		gridComplete: function () {
			var ids = $("#" + tableId).getDataIDs();
			for (var i = 0; i < ids.length; i++) {
				var rowData = $("#" + tableId).getRowData(ids[i]);
				if (rowData.BdbSyncflag == 1) { //如果天数等于0，则背景色置灰显示
					$('#' + ids[i]).find("td").addClass("SelectBG");
				}
			}

			//---lmy----设置td宽度
			var parent_column = $("#ect" + index);
			// parent_column.width(parent_column.width()*2)
			$("#" + tableId).jqGrid('setGridWidth', parent_column.width());


		},
		onPaging: function (pageBtn) {
			var records = $("#" + tableId).getGridParam('records'); //获取返回的记录数
			var page = $("#" + tableId).getGridParam('page'); //获取返回的当前页
			var rowNum = $("#" + tableId).getGridParam('rowNum'); //获取显示配置记录数量
			var total = Math.ceil(records / rowNum); //
			$("#" + tableId).getGridParam('total'); //获取总页数         
			var newurl = "<%=request.getContextPath()%>/httpResult?url=" + ajaxUrl + '&params=curPage:';
			if (pageBtn === "next" && page < total) {
				page = parseInt(page) + 1;
				var postPage = 'curPage:' + page + ',pageSize:' + pageSizeInput;
				$("#" + tableId).jqGrid("setGridParam", {
					postData: {
						'url': ajaxUrl,
						'params': postPage
					}
				});
			}
			if (pageBtn === "prev" && page > 1) {
				page = parseInt(page) - 1;
				var postPage = 'curPage:' + page + ',pageSize:' + pageSizeInput;
				$("#" + tableId).jqGrid("setGridParam", {
					postData: {
						'url': ajaxUrl,
						'params': postPage
					}
				});
			}
			if (pageBtn === "last") {
				page = total;
				var postPage = 'curPage:' + page + ',pageSize:' + pageSizeInput;
				$("#" + tableId).jqGrid("setGridParam", {
					postData: {
						'url': ajaxUrl,
						'params': postPage
					}
				});
			}
			if (pageBtn === "first") {
				page = 1;
				var postPage = 'curPage:' + page + ',pageSize:' + pageSizeInput;
				$("#" + tableId).jqGrid("setGridParam", {
					postData: {
						'url': ajaxUrl,
						'params': postPage
					}
				});
			}
		},
		//onSelectRow:onSelectRowProcess,     //选中行时处理事件        //对新增编辑操作的控制，已放到编辑表单 beforeInitData事件中！！！
		jsonReader: {
			root: "dataRows", // 数据行（默认为：rows）
			page: "curPage", // 当前页
			total: "totalPages", // 总页数
			records: "totalRecords", // 总记录数
			repeatitems: false // 设置成false，在后台设置值的时候，可以乱序。且并非每个值都得设
		},
		prmNames: {
			rows: "pageSize",
			page: "curPage",
			//sort:"obu_id",
			//  id:'BdbPid',
			//order:"asc",
			editoper: 'edit',
			addoper: 'add',
			deloper: 'del',
			search: 'search',
			sort: "sidx", // 表示用于排序的列名的参数名称

			order: "sord", // 表示采用的排序方式的参数名称

			//search:"_search", // 表示是否是搜索请求的参数名称

			nd: "nd", // 表示已经发送请求的次数的参数名称

		},
		// footerrow: true,//分页上添加一行，用于显示统计信息
		height: "auto",
		// pginput:false,//输入框
		// pgbuttons: true,
		autowidth: false,
		hoverrows: false, //鼠标经过行时hover样式，true，增加hover状态。
		altRows: false, //是否隔行换色，
		altclass: 'even', //隔行换色的class。
		shrinkToFit: true,
		viewrecords: false,
		rowNum: pageSizeInput,
		//		rowList: [10, 20, 30],
		pager: "#" + pageId,
		add: true,
		edit: true,
		addtext: "Add",
		edittext: "Edit",
		multiselect: false, //----------lmy------------select选择框
		hidegrid: false,
	});
}
//jqgrid表格(webService请求)
function jqgridCreate2(namespace, method, params, ajaxUrl, tableColWidth, tableCaptionInfor, tableId, pageId, index, echartsTitle) {
	var colNames = [];
	var colModel = [];
	var stringTable1 = tableCaptionInfor.split(',');
	var tableWidthArr = tableColWidth.split(':');
	for (var i = 0; i < stringTable1.length; i++) {
		var stringTable2 = stringTable1[i].split(':');
		var objKey = stringTable2[0];
		var objValue = stringTable2[1];
		colNames.push(objKey);
		var colModelItem = {
			name: objValue,
			index: objValue,
			editable: true,
			edittype: 'text',
			editrules: {
				required: false,
				custom: true,
				custom_func: [true, ""]
			},
			width: tableWidthArr[i],
			hidden: false,
			frozen: true
		};
		colModel.push(colModelItem);
	}
	if (params) {
		var paramsFirst = params.split(',')[0];
		var paramsSecond = params.split(',')[1];
		var paramsThird = params.split(',')[2];
	} else {
		var paramsFirst = 4;
		var paramsSecond = 1;
		var paramsThird = 2;
		params = '4,1,2';
	}

	$.jgrid.defaults.styleUI = "Bootstrap";
	$("#" + tableId).jqGrid({
		url: commonIp + '/PeizhiKanban/showWebService',
		postData: {
			'url': ajaxUrl,
			'namespace': namespace,
			'method': method,
			'params': params
		},
		datatype: "json",
		caption: echartsTitle,
		loadtext: "Loading...", //默认值：Loading...
		loadError: showError, //如果请求服务器失败则调用此方法showError;  位于js/jqGrid/grid.js
		/* 	colNames: ['主键ID', '批号', '订单主键', '状态','排产失败原因','木方厚度','门扇厚度','封边条编码','雕刻时长','掏洞时长','是否CNC排序','填充板长','填充板宽','填充板厚','填充板中心X坐标','填充板中心Y坐标','旋转角度','Order1','Order2','Order3','Order4','Order5',
			'Order6','Order7','预留字段2','预留字段3','预留字段4','扩展参数2','扩展参数3','创建时间','创建人','修改时间','修改人','排序','是否启用','备注'], */
		//colNames: ['产线id', '编号', '名称','占比', '计划总数', '已完成','未完成','当前节拍','要求节拍'],
		//中车列表假数据-fzy
		colNames: colNames,
		colModel: colModel,
		loadComplete: function () {

			var re_records = $("#" + tableId).getGridParam('records');
			if (re_records < 5) {
				for (var i = re_records; i < 5; i++) {
					$("#" + tableId).jqGrid("addRowData", (i + 1), {
						"产线id": "",
						"门型编号": "",
						"门型名称": "",
						"占比": "",
						"计划总数": "",
						"已完成": "",
						"未完成": "",
						"当前节拍": "",
						"要求节拍": ""
					}, "");
				}
			}
			/*屏蔽二线数据新增固定行高*/
			var grid = $("#" + tableId);
			var ids = grid.getDataIDs();
			var parentHeight = ($("#ect" + index).height() - $('.ui-jqgrid-hdiv').height() - $('#' + pageId).height() - $('.ui-jqgrid-caption').height()) / paramsThird;
			for (var i = 0; i < ids.length; i++) {
				grid.setRowData(ids[i], false, {
					height: parentHeight
				}); //设置成你要设定的固定行高
			}
		},
		gridComplete: function () {
			var ids = $("#" + tableId).getDataIDs();
			for (var i = 0; i < ids.length; i++) {
				var rowData = $("#" + tableId).getRowData(ids[i]);
				if (rowData.BdbSyncflag == 1) { //如果天数等于0，则背景色置灰显示
					$('#' + ids[i]).find("td").addClass("SelectBG");
				}
			}

			//---lmy----设置td宽度
			var parent_column = $("#ect" + index);
			// parent_column.width(parent_column.width()*2)
			$("#" + tableId).jqGrid('setGridWidth', parent_column.width());


		},
		onPaging: function (pageBtn) {
			var records = $("#" + tableId).getGridParam('records'); //获取返回的记录数
			var page = $("#" + tableId).getGridParam('page'); //获取返回的当前页
			var rowNum = $("#" + tableId).getGridParam('rowNum'); //获取显示配置记录数量
			var total = Math.ceil(records / rowNum); //
			$("#" + tableId).getGridParam('total'); //获取总页数         
			if (pageBtn === "next" && page < total) {
				page = parseInt(page) + 1;
				var postPage = paramsFirst + ',' + page + ',' + paramsThird;
				$("#" + tableId).jqGrid("setGridParam", {
					postData: {
						'url': ajaxUrl,
						'namespace': namespace,
						'method': method,
						'params': postPage
					}
				});
			}
			if (pageBtn === "prev" && page > 1) {
				page = parseInt(page) - 1;
				var postPage = paramsFirst + ',' + page + ',' + paramsThird;
				$("#" + tableId).jqGrid("setGridParam", {
					postData: {
						'url': ajaxUrl,
						'namespace': namespace,
						'method': method,
						'params': postPage
					}
				});
			}
			if (pageBtn === "last") {
				page = total;
				var postPage = paramsFirst + ',' + page + ',' + paramsThird;
				$("#" + tableId).jqGrid("setGridParam", {
					postData: {
						'url': ajaxUrl,
						'namespace': namespace,
						'method': method,
						'params': postPage
					}
				});
			}
			if (pageBtn === "first") {
				page = 1;
				var postPage = paramsFirst + ',' + page + ',' + paramsThird;
				$("#" + tableId).jqGrid("setGridParam", {
					postData: {
						'url': ajaxUrl,
						'namespace': namespace,
						'method': method,
						'params': postPage
					}
				});
			}
		},
		//onSelectRow:onSelectRowProcess,     //选中行时处理事件        //对新增编辑操作的控制，已放到编辑表单 beforeInitData事件中！！！
		jsonReader: {
			root: "dataRows", // 数据行（默认为：rows）
			page: "curPage", // 当前页
			total: "totalPages", // 总页数
			records: "totalRecords", // 总记录数
			repeatitems: false // 设置成false，在后台设置值的时候，可以乱序。且并非每个值都得设
		},
		prmNames: {
			rows: "pageSize",
			page: "curPage",
			//sort:"obu_id",
			//  id:'BdbPid',
			//order:"asc",
			editoper: 'edit',
			addoper: 'add',
			deloper: 'del',
			search: 'search',
			sort: "sidx", // 表示用于排序的列名的参数名称

			order: "sord", // 表示采用的排序方式的参数名称

			//search:"_search", // 表示是否是搜索请求的参数名称

			nd: "nd", // 表示已经发送请求的次数的参数名称

		},
		// footerrow: true,//分页上添加一行，用于显示统计信息
		height: "auto",
		// pginput:false,//输入框
		// pgbuttons: true,
		autowidth: false,
		hoverrows: false, //鼠标经过行时hover样式，true，增加hover状态。
		altRows: false, //是否隔行换色，
		altclass: 'even', //隔行换色的class。
		shrinkToFit: true,
		viewrecords: false,
		rowNum: paramsThird,
		//		rowList: [10, 20, 30],
		pager: "#" + pageId,
		add: true,
		edit: true,
		addtext: "Add",
		edittext: "Edit",
		multiselect: false, //----------lmy------------select选择框
		hidegrid: false,
	});
}
//---------------jqgrid-------自适应宽度------------------
function resizeFunc(tableId, parentId) {
	$(window).on('resize.jqGrid', function () {
		//重新抓父容器新的width
		let parent_dom = $(parentId);
		$(tableId).jqGrid('setGridWidth', parent_dom.width());
		$(tableId).trigger('reloadGrid');
	});
	/*对div监听resize,对jqgrid表格重新渲染*/
	var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
	var target = document.querySelector('.partRight');
	var observer = new MutationObserver(function (mutations) {
		mutations.forEach(function (mutation) {
			$(tableId).trigger('reloadGrid');
		});
	});
	var config = {
		attributes: true,
		childList: true,
		characterData: true
	}
	observer.observe(target, config);
}
//柱状图
function echartsBar(legendArr, id, xData, yData, echartsTitle, echartsBaseLine, echartsColor) {
	/*//获取实例容器
	var dom = document.getElementById(id);
	//获取 dom 容器上的实例
	var existInstance = echarts.getInstanceByDom(dom);
	if (existInstance){
	    //如果已实例化，则销毁实例
	    if (true)
	        echarts.dispose(existInstance);
	}
	var myChart = echarts.init(dom);*/
	var myChart = echarts.init(document.getElementById(id));
	var option = {
		title: {
			text: echartsTitle,
			textStyle: {
				fontWeight: 'normal',
				color: '#fff', //--lmy--标题颜色
				fontSize: '121%'
			},
			left: 'center'
		},
		legend: {
			data: legendArr,
			x: 'center',
			y: '20',
			/*backgroundColor: 'green',*/
			/*borderColor:'green',*/
			textStyle: { //图例文字的样式
				color: '#fff',
				fontSize: 16
			}
		},
		grid: {
			x: '8%',
			y: '30%',
			x2: '8%',
			y2: '15%',

		},
		backgroundColor: '#0C1622',
		tooltip: {},
		/*legend: {
		    data: ['销量']
		},*/
		xAxis: {
			data: xData,
			axisLabel: {
				rotate: 20,
				textStyle: {
					color: '#fff', //坐标值得具体的颜色
					fontSize: '70%'
				}
			},
			axisLine: {
				lineStyle: {
					type: 'solid',
					color: "#fff",
					width: 2
				}
			}
		},
		yAxis: {
			axisLabel: {
				textStyle: {
					color: '#fff', //坐标值得具体的颜色
					fontSize: '70%'
				},
				show: true,
				interval: 'auto'
			},
			axisLine: {
				lineStyle: {
					type: 'solid',
					color: "#fff",
					width: 2
				}
			}
		},
		series: [{
			/*name: '销量',*/
			type: 'bar',
			name: legendArr[0],
			data: yData,
			markLine: {
				itemStyle: {
					normal: {
						lineStyle: {
							type: 'dashed',
							color: 'red'
						},
						label: {
							show: true,
							position: 'end'
						}
					}
				},
				data: [{
						yAxis: echartsBaseLine,
						name: '标准值'
					}
					/*,
					                   {
					                       yAxis: 2,
					                       name: '70002'
					                   }*/
				]
			},
			itemStyle: {
				normal: {
					color: echartsColor
				}
			}
		}]
	};
	myChart.setOption(option);
	// echarts自适应
	$(window).resize(function () {
		myChart.resize();
	});
	/*调用div监听重渲染函数*/
	echartsRender('.partRight', myChart);
}
//y轴显示百分比的柱状图
function echartsBar2(legendArr, id, xData, yData, echartsTitle, echartsBaseLine, echartsColor) {
	var myChart = echarts.init(document.getElementById(id));
	var option = {
		title: {
			text: echartsTitle,
			textStyle: {
				fontWeight: 'normal',
				color: '#fff', //--lmy--标题颜色
				fontSize: '121%'
			},
			left: 'center'
		},
		legend: {
			data: legendArr,
			x: 'center',
			y: '20',
			/*backgroundColor: 'green',*/
			/*borderColor:'green',*/
			textStyle: { //图例文字的样式
				color: '#fff',
				fontSize: 16
			}
		},
		grid: {
			x: '8%',
			y: '30%',
			x2: '8%',
			y2: '15%',

		},
		backgroundColor: '#0C1622',
		tooltip: {},
		/*legend: {
		    data: ['销量']
		},*/
		xAxis: {
			data: xData,
			axisLabel: {
				rotate: 30,
				textStyle: {
					color: '#fff', //坐标值得具体的颜色
					fontSize: '70%'
				}
			},
			axisLine: {
				lineStyle: {
					type: 'solid',
					color: "#fff",
					width: 2
				}
			}
		},
		yAxis: {
			axisLabel: {
				textStyle: {
					color: '#fff', //坐标值得具体的颜色
					fontSize: '70%'
				},
				show: true,
				interval: 'auto',
				formatter: '{value} %'
			},
			axisLine: {
				lineStyle: {
					type: 'solid',
					color: "#fff",
					width: 2
				}
			}
		},
		series: [{
			/*name: '销量',*/
			type: 'bar',
			name: legendArr[0],
			data: yData,
			markLine: {
				itemStyle: {
					normal: {
						lineStyle: {
							type: 'dashed',
							color: 'red'
						},
						label: {
							show: true,
							position: 'end'
						}
					}
				},
				data: [{
					name: '平均值',
					/*type: 'average'*/
					yAxis: echartsBaseLine
				}]
			},
			itemStyle: {
				//通常情况下：
				normal: {
					//每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
					color: echartsColor
				}
			}
		}]
	};
	myChart.setOption(option);
	// echarts自适应
	$(window).resize(function () {
		myChart.resize();
	});
	/*调用div监听重渲染函数*/
	echartsRender('.partRight', myChart);
}
//横向柱状图(单柱形)
function horizontalBar(legendArr, id, xData, yData, echartsTitle, echartsBaseLine, echartsColor) {
	var myChart = echarts.init(document.getElementById(id));
	var option = {
		backgroundColor: '#0C1622',
		title: {
			text: echartsTitle,
			textStyle: {
				fontWeight: 'normal',
				color: '#fff', //--lmy--标题颜色
				fontSize: '121%'
			},
			left: 'center'
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		legend: {
			data: legendArr,
			x: 'center',
			y: '20',
			/*backgroundColor: 'green',*/
			/*borderColor:'green',*/
			textStyle: { //图例文字的样式
				color: '#fff',
				fontSize: 16
			}
		},
		grid: {
			x: '8%',
			y: '30%',
			x2: '8%',
			y2: '15%',

		},
		xAxis: {
			type: 'value',
			boundaryGap: [0, 0.01],
			axisLabel: {
				textStyle: {
					color: '#fff', //坐标值得具体的颜色
					fontSize: '70%'
				}
			},
			axisLine: {
				lineStyle: {
					type: 'solid',
					color: "#fff",
					width: 2
				}
			}
		},
		yAxis: {
			type: 'category',
			data: xData,
			axisLabel: {
				textStyle: {
					color: '#fff', //坐标值得具体的颜色
					fontSize: '70%'
				}
			},
			axisLine: {
				lineStyle: {
					type: 'solid',
					color: "#fff",
					width: 2
				}
			}
		},
		series: [{
			name: legendArr[0],
			type: 'bar',
			itemStyle: {
				normal: {
					color: '#72E8EA'
				}
			},
			data: yData,
			markLine: {
				itemStyle: {
					normal: {
						lineStyle: {
							type: 'dashed',
							color: 'red'
						},
						label: {
							show: true,
							position: 'end'
						}
					}
				},
				data: [{
					name: '基准线',
					/*type: 'average'*/
					xAxis: echartsBaseLine
				}]
			},
		}]
	};
	myChart.setOption(option);
	// echarts自适应
	$(window).resize(function () {
		myChart.resize();
	});
	/*调用div监听重渲染函数*/
	echartsRender('.partRight', myChart);
}
//横向柱状图(单柱形%)
function horizontalBar2(legendArr, id, xData, yData, echartsTitle, echartsBaseLine, echartsColor) {
	var myChart = echarts.init(document.getElementById(id));
	var option = {
		backgroundColor: '#0C1622',
		title: {
			text: echartsTitle,
			textStyle: {
				fontWeight: 'normal',
				color: '#fff', //--lmy--标题颜色
				fontSize: '121%'
			},
			left: 'center'
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		legend: {
			data: legendArr,
			x: 'center',
			y: '20',
			/*backgroundColor: 'green',*/
			/*borderColor:'green',*/
			textStyle: { //图例文字的样式
				color: '#fff',
				fontSize: 16
			}
		},
		grid: {
			x: '8%',
			y: '30%',
			x2: '8%',
			y2: '15%',

		},
		xAxis: {
			type: 'value',
			boundaryGap: [0, 0.01],
			axisLabel: {
				textStyle: {
					color: '#fff', //坐标值得具体的颜色
					fontSize: '70%'
				},
				show: true,
				interval: 'auto',
				formatter: '{value} %'
			},
			axisLine: {
				lineStyle: {
					type: 'solid',
					color: "#fff",
					width: 2
				}
			}
		},
		yAxis: {
			type: 'category',
			data: xData,
			axisLabel: {
				textStyle: {
					color: '#fff', //坐标值得具体的颜色
					fontSize: '70%'
				}
			},
			axisLine: {
				lineStyle: {
					type: 'solid',
					color: "#fff",
					width: 2
				}
			}
		},
		series: [{
			name: legendArr[0],
			type: 'bar',
			itemStyle: {
				normal: {
					color: '#72E8EA'
				}
			},
			data: yData,
			markLine: {
				itemStyle: {
					normal: {
						lineStyle: {
							type: 'dashed',
							color: 'red'
						},
						label: {
							show: true,
							position: 'end'
						}
					}
				},
				data: [{
					name: '基准线',
					/*type: 'average'*/
					xAxis: echartsBaseLine
				}]
			},
		}]
	};
	myChart.setOption(option);
	// echarts自适应
	$(window).resize(function () {
		myChart.resize();
	});
	/*调用div监听重渲染函数*/
	echartsRender('.partRight', myChart);
}
//单折线图
function echartsLine(legendArr, id, xData, yData, echartsTitle, echartsBaseLine, echartsColor) {
	var myChart = echarts.init(document.getElementById(id));
	var option = {
		title: {
			text: echartsTitle,
			textStyle: {
				fontWeight: 'normal',
				color: '#fff', //--lmy--标题颜色
				fontSize: '121%'
			},
			left: 'center'
		},
		legend: {
			data: legendArr,
			x: 'center',
			y: '20',
			/*backgroundColor: 'green',*/
			/*borderColor:'green',*/
			textStyle: { //图例文字的样式
				color: '#fff',
				fontSize: 16
			}
		},
		grid: {
			x: '8%',
			y: '30%',
			x2: '8%',
			y2: '15%',

		},
		tooltip: {
			trigger: 'axis',
			/*axis坐标轴触发*/
		},
		backgroundColor: '#0C1622',
		xAxis: {
			type: 'category',
			/*name:'公斤',*/
			nameLocation: 'end',
			data: xData,
			axisLabel: {
				rotate: 30,
				textStyle: {
					color: '#fff', //坐标值得具体的颜色
					fontSize: '70%'
				}
			},
			axisLine: {
				lineStyle: {
					type: 'solid',
					color: "#fff",
					width: 2
				}
			}
		},
		yAxis: {
			type: 'value',
			/*name:'公斤',*/
			nameLocation: 'end',
			nameTextStyle: {
				color: 'red',
				align: 'center'
			},
			axisLabel: {
				textStyle: {
					color: '#fff', //坐标值得具体的颜色
					fontSize: '70%'
				}
			},
			axisLine: {
				lineStyle: {
					type: 'solid',
					color: "#fff",
					width: 2
				}
			}
		},
		series: [{
			data: yData,
			name: legendArr[0],
			type: 'line',
			/*itemStyle : { normal: {label : {show: true}}},*/
			markLine: {
				itemStyle: {
					normal: {
						lineStyle: {
							type: 'dashed',
							color: 'red'
						},
						label: {
							show: true,
							position: 'end'
						}
					}
				},
				data: [{
					name: '平均值',
					/*type: 'average'*/
					yAxis: echartsBaseLine
				}]
			},
			itemStyle: {
				//通常情况下：
				normal: {
					//每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
					color: echartsColor
				}
			}
		}]

	};
	myChart.setOption(option);
	// echarts自适应
	$(window).resize(function () {
		myChart.resize();
	});
	/*调用div监听重渲染函数*/
	echartsRender('.partRight', myChart);
}
//单折线图(%)
function echartsLine2(legendArr, id, xData, yData, echartsTitle, echartsBaseLine, echartsColor) {
	var myChart = echarts.init(document.getElementById(id));
	var option = {
		title: {
			text: echartsTitle,
			textStyle: {
				fontWeight: 'normal',
				color: '#fff', //--lmy--标题颜色
				fontSize: '121%'
			},
			left: 'center'
		},
		legend: {
			data: legendArr,
			x: 'center',
			y: '20',
			/*backgroundColor: 'green',*/
			/*borderColor:'green',*/
			textStyle: { //图例文字的样式
				color: '#fff',
				fontSize: 16
			}
		},
		grid: {
			x: '8%',
			y: '30%',
			x2: '8%',
			y2: '15%',

		},
		tooltip: {
			trigger: 'axis',
			/*axis坐标轴触发*/
		},
		backgroundColor: '#0C1622',
		xAxis: {
			type: 'category',
			data: xData,
			axisLabel: {
				rotate: 30,
				textStyle: {
					color: '#fff', //坐标值得具体的颜色
					fontSize: '70%'
				}
			},
			axisLine: {
				lineStyle: {
					type: 'solid',
					color: "#fff",
					width: 2
				}
			}
		},
		yAxis: {
			type: 'value',
			axisLabel: {
				textStyle: {
					color: '#fff', //坐标值得具体的颜色
					fontSize: '70%'
				},
				show: true,
				interval: 'auto',
				formatter: '{value} %'
			},
			axisLine: {
				lineStyle: {
					type: 'solid',
					color: "#fff",
					width: 2
				}
			}
		},
		series: [{
			data: yData,
			name: legendArr[0],
			type: 'line',
			/*itemStyle : { normal: {label : {show: true}}},*/
			markLine: {
				itemStyle: {
					normal: {
						lineStyle: {
							type: 'dashed',
							color: 'red'
						},
						label: {
							show: true,
							position: 'end'
						}
					}
				},
				data: [{
					name: '平均值',
					/*type: 'average'*/
					yAxis: echartsBaseLine
				}]
			},
			itemStyle: {
				//通常情况下：
				normal: {
					//每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
					color: echartsColor
				}
			}
		}]

	};
	myChart.setOption(option);
	// echarts自适应
	$(window).resize(function () {
		myChart.resize();
	});
	/*调用div监听重渲染函数*/
	echartsRender('.partRight', myChart);
}
//双折线图
function echartsLine3(legendArr, id, xData, yData, yData2, echartsTitle, echartsBaseLine, echartsColor) {
	var myChart = echarts.init(document.getElementById(id));
	var option = {
		title: {
			text: echartsTitle,
			textStyle: {
				fontWeight: 'normal',
				color: '#fff', //--lmy--标题颜色
				fontSize: '121%'
			},
			left: 'center'
		},
		legend: {
			data: legendArr,
			x: 'center',
			y: '20',
			/*backgroundColor: 'green',*/
			/*borderColor:'green',*/
			textStyle: { //图例文字的样式
				color: '#fff',
				fontSize: 16
			}
		},
		grid: {
			x: '8%',
			y: '30%',
			x2: '8%',
			y2: '15%',

		},
		tooltip: {
			trigger: 'axis',
			/*axis坐标轴触发*/
		},
		backgroundColor: '#0C1622',
		xAxis: {
			type: 'category',
			data: xData,
			axisLabel: {
				rotate: 30,
				textStyle: {
					color: '#fff', //坐标值得具体的颜色
					fontSize: '70%'
				}
			},
			axisLine: {
				lineStyle: {
					type: 'solid',
					color: "#fff",
					width: 2
				}
			}
		},
		yAxis: {
			type: 'value',
			axisLabel: {
				textStyle: {
					color: '#fff', //坐标值得具体的颜色
					fontSize: '70%'
				}
			},
			axisLine: {
				lineStyle: {
					type: 'solid',
					color: "#fff",
					width: 2
				}
			}
		},
		series: [{
				data: yData,
				name: legendArr[0],
				type: 'line',
				/*itemStyle : { normal: {label : {show: true}}},*/
				markLine: {
					itemStyle: {
						normal: {
							lineStyle: {
								type: 'dashed',
								color: 'red'
							},
							label: {
								show: true,
								position: 'end'
							}
						}
					},
					data: [{
						name: '平均值',
						/*type: 'average'*/
						yAxis: echartsBaseLine
					}]
				},
				itemStyle: {
					//通常情况下：
					normal: {
						//每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
						color: echartsColor[0]
					}
				}
			},
			{
				data: yData2,
				name: legendArr[1],
				type: 'line',
				/*itemStyle : { normal: {label : {show: true}}},*/
				markLine: {
					itemStyle: {
						normal: {
							lineStyle: {
								type: 'dashed',
								color: 'red'
							},
							label: {
								show: true,
								position: 'end'
							}
						}
					},
					data: [{
						name: '平均值',
						/*type: 'average'*/
						yAxis: echartsBaseLine
					}]
				},
				itemStyle: {
					//通常情况下：
					normal: {
						//每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
						color: echartsColor[1]
					}
				}
			}
		]

	};
	myChart.setOption(option);
	// echarts自适应
	$(window).resize(function () {
		myChart.resize();
	});
	/*调用div监听重渲染函数*/
	echartsRender('.partRight', myChart);
}
//双折线图(%)
function echartsLine4(legendArr, id, xData, yData, yData2, echartsTitle, echartsBaseLine, echartsColor) {
	var myChart = echarts.init(document.getElementById(id));
	var option = {
		title: {
			text: echartsTitle,
			textStyle: {
				fontWeight: 'normal',
				color: '#fff', //--lmy--标题颜色
				fontSize: '121%'
			},
			left: 'center'
		},
		legend: {
			data: legendArr,
			x: 'center',
			y: '20',
			/*backgroundColor: 'green',*/
			/*borderColor:'green',*/
			textStyle: { //图例文字的样式
				color: '#fff',
				fontSize: 16
			}
		},
		grid: {
			x: '8%',
			y: '30%',
			x2: '8%',
			y2: '15%',

		},
		tooltip: {
			trigger: 'axis',
			/*axis坐标轴触发*/
		},
		backgroundColor: '#0C1622',
		xAxis: {
			type: 'category',
			data: xData,
			axisLabel: {
				rotate: 30,
				textStyle: {
					color: '#fff', //坐标值得具体的颜色
					fontSize: '70%'
				},
				show: true,
				interval: 'auto'
			},
			axisLine: {
				lineStyle: {
					type: 'solid',
					color: "#fff",
					width: 2
				}
			}
		},
		yAxis: {
			type: 'value',
			axisLabel: {
				textStyle: {
					color: '#fff', //坐标值得具体的颜色
					fontSize: '70%'
				},
				formatter: '{value} %'
			},
			axisLine: {
				lineStyle: {
					type: 'solid',
					color: "#fff",
					width: 2
				}
			}
		},
		series: [{
				data: yData,
				name: legendArr[0],
				type: 'line',
				/*itemStyle : { normal: {label : {show: true}}},*/
				markLine: {
					itemStyle: {
						normal: {
							lineStyle: {
								type: 'dashed',
								color: 'red'
							},
							label: {
								show: true,
								position: 'end'
							}
						}
					},
					data: [{
						name: '平均值',
						/*type: 'average'*/
						yAxis: echartsBaseLine
					}]
				},
				itemStyle: {
					//通常情况下：
					normal: {
						//每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
						color: echartsColor[0]
					}
				}
			},
			{
				data: yData2,
				name: legendArr[1],
				type: 'line',
				/*itemStyle : { normal: {label : {show: true}}},*/
				markLine: {
					itemStyle: {
						normal: {
							lineStyle: {
								type: 'dashed',
								color: 'red'
							},
							label: {
								show: true,
								position: 'end'
							}
						}
					},
					data: [{
						name: '平均值',
						/*type: 'average'*/
						yAxis: echartsBaseLine
					}]
				},
				itemStyle: {
					//通常情况下：
					normal: {
						//每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
						color: echartsColor[1]
					}
				}
			}
		]

	};
	myChart.setOption(option);
	// echarts自适应
	$(window).resize(function () {
		myChart.resize();
	});
	/*调用div监听重渲染函数*/
	echartsRender('.partRight', myChart);
}
//扇形图
function echartsPie(legendArr, id, xData, yData, echartsTitle, echartsColor) {
	var dataArr = [];
	if (xData && yData) {
		$.each(xData, function (index, item) {
			var dataObj = {};
			dataObj.name = xData[index];
			dataObj.value = yData[index];
			dataArr.push(dataObj);
		});
	}
	//获取实例容器
	var myChart = echarts.init(document.getElementById(id));
	var option = {
		title: {
			text: echartsTitle,
			/*            subtext: '纯属虚构',*/
			x: 'center',
			textStyle: {
				fontWeight: 'normal', //-----标题颜色
				color: '#fff',
				fontSize: '121%'
			}
		},
		legend: {
			data: ['title1', 'title2'],
			textStyle: { //图例文字的样式
				color: '#fff',
				fontSize: 16
			}
		},
		grid: {
			x: '8%',
			y: '8%',
			x2: '8%',
			y2: '15%'
		},
		backgroundColor: '#0C1622',
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		color: echartsColor
			/*[
				'#00ff66','#87CEEB', '#E8E83E', '#ff5809', '#69edfc', '#0066ff','#CC66FF','#33FF99','#990066','#0033FF','#3399FF','#330033','#CC00FF','#99FFFF','#3333CC','#00FF66','#9933FF','#99CC00'
				,'#9999FF', '#990066', '#00FF99', '#0066CC', '#003333', '#003300','#33FF00','#0099CC','#9900FF','#3366FF','#3300CC','#FF3300','#CC9933','#66CC99','#FF6600','#6666CC','#FF00CC','#CC66FF'
				,'#C23531', '#E8E83E', '#00ff66', '#ff5809', '#69edfc', '#0066ff','#CC66FF','#33FF99','#990066','#0033FF','#3399FF','#330033','#CC00FF','#99FFFF','#3333CC','#00FF66','#9933FF','#99CC00'
				,'#9999FF', '#990066', '#00FF99', '#0066CC', '#003333', '#003300','#33FF00','#0099CC','#9900FF','#3366FF','#3300CC','#FF3300','#CC9933','#66CC99','#FF6600','#6666CC','#FF00CC','#CC66FF'
			,	'#C23531', '#E8E83E', '#00ff66', '#ff5809', '#69edfc', '#0066ff','#CC66FF','#33FF99','#990066','#0033FF','#3399FF','#330033','#CC00FF','#99FFFF','#3333CC','#00FF66','#9933FF','#99CC00'
				,'#9999FF', '#990066', '#00FF99', '#0066CC', '#003333', '#003300','#33FF00','#0099CC','#9900FF','#3366FF','#3300CC','#FF3300','#CC9933','#66CC99','#FF6600','#6666CC','#FF00CC','#CC66FF'
				,'#C23531', '#E8E83E', '#00ff66', '#ff5809', '#69edfc', '#0066ff','#CC66FF','#33FF99','#990066','#0033FF','#3399FF','#330033','#CC00FF','#99FFFF','#3333CC','#00FF66','#9933FF','#99CC00'
				,'#9999FF', '#990066', '#00FF99', '#0066CC', '#003333', '#003300','#33FF00','#0099CC','#9900FF','#3366FF','#3300CC','#FF3300','#CC9933','#66CC99','#FF6600','#6666CC','#FF00CC','#CC66FF'
				,'#C23531', '#E8E83E', '#00ff66', '#ff5809', '#69edfc', '#0066ff','#CC66FF','#33FF99','#990066','#0033FF','#3399FF','#330033','#CC00FF','#99FFFF','#3333CC','#00FF66','#9933FF','#99CC00'
				,'#9999FF', '#990066', '#00FF99', '#0066CC', '#003333', '#003300','#33FF00','#0099CC','#9900FF','#3366FF','#3300CC','#FF3300','#CC9933','#66CC99','#FF6600','#6666CC','#FF00CC','#CC66FF'
			]*/
			,
		/*legend: {
		    orient: 'vertical',
		    left: 'left',
		    data: xData,
		    textStyle: {
		        fontWeight: 'normal', //-----标题颜色
		        color: '#fff',
		        fontSize: '121%'
		      }
		},*/
		series: [{
			name: '访问来源',
			type: 'pie',
			radius: '55%',
			center: ['50%', '60%'],
			data: dataArr,
			itemStyle: {
				emphasis: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			}
		}]
	};
	myChart.setOption(option);
	// echarts自适应
	$(window).resize(function () {
		myChart.resize();
	});
	/*调用div监听重渲染函数*/
	echartsRender('.partRight', myChart);
}
//扇形图测试啊--------假数据-------------test--------------------fzy-----------------
function echartsPieTest(legendArr, id, xData, yData, echartsTitle, echartsColor) {
	var dataArr = [];
	if (xData && yData) {
		$.each(xData, function (index, item) {
			var dataObj = {};
			dataObj.name = xData[index];
			dataObj.value = yData[index];
			dataArr.push(dataObj);
		});
	}
	//获取实例容器
	var myChart = echarts.init(document.getElementById(id));
	var option = {
		title: {
			text: echartsTitle,
			/*            subtext: '纯属虚构',*/
			x: 'center',
			textStyle: {
				fontWeight: 'normal', //-----标题颜色
				color: '#fff',
				fontSize: '121%'
			}
		},
		legend: {
			data: ['title1', 'title2'],
			textStyle: { //图例文字的样式
				color: '#fff',
				fontSize: 16
			}
		},
		grid: {
			x: '8%',
			y: '8%',
			x2: '8%',
			y2: '15%'
		},
		backgroundColor: '#0C1622',
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		color: echartsColor
			/*[
				'#00ff66','#87CEEB', '#E8E83E', '#ff5809', '#69edfc', '#0066ff','#CC66FF','#33FF99','#990066','#0033FF','#3399FF','#330033','#CC00FF','#99FFFF','#3333CC','#00FF66','#9933FF','#99CC00'
				,'#9999FF', '#990066', '#00FF99', '#0066CC', '#003333', '#003300','#33FF00','#0099CC','#9900FF','#3366FF','#3300CC','#FF3300','#CC9933','#66CC99','#FF6600','#6666CC','#FF00CC','#CC66FF'
				,'#C23531', '#E8E83E', '#00ff66', '#ff5809', '#69edfc', '#0066ff','#CC66FF','#33FF99','#990066','#0033FF','#3399FF','#330033','#CC00FF','#99FFFF','#3333CC','#00FF66','#9933FF','#99CC00'
				,'#9999FF', '#990066', '#00FF99', '#0066CC', '#003333', '#003300','#33FF00','#0099CC','#9900FF','#3366FF','#3300CC','#FF3300','#CC9933','#66CC99','#FF6600','#6666CC','#FF00CC','#CC66FF'
			,	'#C23531', '#E8E83E', '#00ff66', '#ff5809', '#69edfc', '#0066ff','#CC66FF','#33FF99','#990066','#0033FF','#3399FF','#330033','#CC00FF','#99FFFF','#3333CC','#00FF66','#9933FF','#99CC00'
				,'#9999FF', '#990066', '#00FF99', '#0066CC', '#003333', '#003300','#33FF00','#0099CC','#9900FF','#3366FF','#3300CC','#FF3300','#CC9933','#66CC99','#FF6600','#6666CC','#FF00CC','#CC66FF'
				,'#C23531', '#E8E83E', '#00ff66', '#ff5809', '#69edfc', '#0066ff','#CC66FF','#33FF99','#990066','#0033FF','#3399FF','#330033','#CC00FF','#99FFFF','#3333CC','#00FF66','#9933FF','#99CC00'
				,'#9999FF', '#990066', '#00FF99', '#0066CC', '#003333', '#003300','#33FF00','#0099CC','#9900FF','#3366FF','#3300CC','#FF3300','#CC9933','#66CC99','#FF6600','#6666CC','#FF00CC','#CC66FF'
				,'#C23531', '#E8E83E', '#00ff66', '#ff5809', '#69edfc', '#0066ff','#CC66FF','#33FF99','#990066','#0033FF','#3399FF','#330033','#CC00FF','#99FFFF','#3333CC','#00FF66','#9933FF','#99CC00'
				,'#9999FF', '#990066', '#00FF99', '#0066CC', '#003333', '#003300','#33FF00','#0099CC','#9900FF','#3366FF','#3300CC','#FF3300','#CC9933','#66CC99','#FF6600','#6666CC','#FF00CC','#CC66FF'
			]*/
			,
		/*legend: {
		    orient: 'vertical',
		    left: 'left',
		    data: xData,
		    textStyle: {
		        fontWeight: 'normal', //-----标题颜色
		        color: '#fff',
		        fontSize: '121%'
		      }
		},*/
		series: [{
			name: '访问来源',
			type: 'pie',
			radius: '55%',
			center: ['50%', '60%'],
			data: dataArr,
			itemStyle: {
				emphasis: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			}
		}]
	};
	myChart.setOption(option);
	// echarts自适应
	$(window).resize(function () {
		myChart.resize();
	});
	/*调用div监听重渲染函数*/
	echartsRender('.partRight', myChart);
}
/*仪表盘*/
function echartsSpeed(legendArr, id, xData, yData, echartsTitle, echartsColor) {
	var dataArr = [];
	if (xData && yData) {
		$.each(xData, function (index, item) {
			var dataObj = {};
			dataObj.name = xData[index];
			dataObj.value = yData[index];
			dataArr.push(dataObj);
		});
	}
	//获取实例容器
	var myChart = echarts.init(document.getElementById(id));
	var option = {
		title: {
			text: echartsTitle,
			textStyle: {
				fontWeight: 'normal',
				color: '#fff', //--lmy--标题颜色
				fontSize: '121%'
			},
			left: 'center'
		},
		backgroundColor: '#0C1622',
		tooltip: {
			formatter: "{a} <br/>{b} : {c}%"
		},
		series: [{
			name: '业务指标',
			type: 'gauge',
			title: {
				textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
					fontWeight: 'bolder',
					fontSize: '100%',
					fontStyle: 'italic',
					color: '#ccc',
					shadowColor: '#fff', //默认透明
					shadowBlur: 10
				}
			},
			detail: {
				formatter: '{value}%',
				textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
					fontWeight: 'bolder',
					color: '#ccc',
					fontSize: '120%'
				}
			},
			data: dataArr
		}]
	};

	myChart.setOption(option);
	// echarts自适应
	$(window).resize(function () {
		myChart.resize();
	});
	/*调用div监听重渲染函数*/
	echartsRender('.partRight', myChart);
}
//柏拉图
function echartsPlato(legendArr, id, xData, yData, yData2, echartsTitle, echartsBaseLine, echartsColor) {
	var myChart = echarts.init(document.getElementById(id));
	var option = {
		title: {
			text: echartsTitle,
			/*            subtext: '纯属虚构',*/
			x: 'center',
			textStyle: {
				fontWeight: 'normal', //-----标题颜色
				color: '#fff',
				fontSize: '121%'
			}
		},
		grid: {
			x: '8%',
			y: '30%',
			x2: '8%',
			y2: '15%',

		},
		/*tooltip: {
    	        trigger: 'axis',
    	        axisPointer: {
    	            type: 'cross',
    	            crossStyle: {
    	                color: '#999'
    	            }
    	        }
    	    },*/
		tooltip: {
			trigger: 'axis',
			/*axis坐标轴触发*/
		},
		backgroundColor: '#0C1622',
		/*toolbox: {
		    feature: {
		        dataView: {show: true, readOnly: false},
		        magicType: {show: true, type: ['line', 'bar']},
		        restore: {show: true},
		        saveAsImage: {show: true}
		    }
		},*/
		legend: {
			data: legendArr,
			x: 'center',
			y: '20',
			/*backgroundColor: 'green',*/
			/*borderColor:'green',*/
			textStyle: { //图例文字的样式
				color: '#fff',
				fontSize: 16
			}
		},
		xAxis: [{
			type: 'category',
			data: xData,
			axisPointer: {
				type: 'shadow'
			},
			axisLabel: {
				rotate: 30,
				textStyle: {
					color: '#fff', //坐标值得具体的颜色
					fontSize: '70%'
				}
				/*,
				    	                show: true,  
				    	                interval: 'auto',  
				    	                formatter: '{value} %'*/
			},
			axisLine: {
				lineStyle: {
					type: 'solid',
					color: "#fff",
					width: 2
				}
			}
		}],
		yAxis: [{
				type: 'value',
				name: '数量',
				axisLabel: {
					textStyle: {
						color: '#fff', //坐标值得具体的颜色
						fontSize: '70%'
					},
					formatter: '{value} '
				},
				axisLine: {
					lineStyle: {
						type: 'solid',
						color: "#fff",
						width: 2
					}
				}
			},
			{
				type: 'value',
				name: '总数',
				/*min: 0,
				max: 25,
				interval: 5,*/
				axisLabel: {
					textStyle: {
						color: '#fff', //坐标值得具体的颜色
						fontSize: '70%'
					},
					formatter: '{value}'
				},
				axisLine: {
					lineStyle: {
						type: 'solid',
						color: "#fff",
						width: 2
					}
				}
			}
		],
		series: [{
				name: legendArr[0],
				type: 'bar',
				data: yData,
				itemStyle: {
					normal: {
						color: echartsColor[0]
					}
				}
			},
			{
				name: legendArr[1],
				type: 'line',
				yAxisIndex: 1,
				data: yData2,
				itemStyle: {
					normal: {
						color: echartsColor[1]
					}
				}
			}
		]
	};
	myChart.setOption(option);
	// echarts自适应
	$(window).resize(function () {
		myChart.resize();
	});
	/*调用div监听重渲染函数*/
	echartsRender('.partRight', myChart);
}
/*环形图*/
function echartsRing(legendArr, id, xData, yData, echartsTitle, ringColorArr) {
	//参数设置
	var point = yData[0]; //获得的分数，限定：(0,totalPoint)
	var totalPoint = 100; //总分 假设100
	var angleOpen = 79.2; //开口角度：
	var angleHide = 1.5; //两段之间的间隔
	var setBorderWidth = 4; //图表宽度
	//算法设定：
	var anglePoint = (360 - angleOpen - angleHide) * point / totalPoint;
	var angleTotalPoint = (360 - angleOpen - angleHide) * (1 - point / totalPoint);
	var dataDispose = [{
			value: anglePoint,
			name: point,
			cursor: 'default',
			zlevel: 2,
			label: {
				show: true,
				position: 'center',
				formatter: [
					'{a|' + point + '%}',
					'{b|' + legendArr[0] + '}'
				].join('\n'),
				rich: {
					a: {
						fontSize: '150%', //设置分数显示的字号
						color: 'white', //设置分数显示的颜色
						fontWeight: 'normal', //设置分数显示的样式 'normal' 'bold' 'bolder' 'lighter'
					},
					b: {
						color: '#eaae4f',
						fontSize: '150%', //设置文字的字号
						height: 40, //设置文字的高度
					},
				}
			},
			itemStyle: {
				normal: {
					color: ringColorArr,
					borderWidth: setBorderWidth, //描边线宽
					borderColor: ringColorArr, //图形的描边颜色
				},
				emphasis: {
					color: ringColorArr,
					borderColor: ringColorArr,
					borderWidth: setBorderWidth,
				},
			}
		}, { //不可修改
			value: angleHide,
			cursor: 'default',
			itemStyle: {
				label: {
					show: false,
				},
				labelLine: {
					show: false,
				},
				color: 'rgba(0, 0, 0, 0)',
				borderColor: 'rgba(0, 0, 0, 0)',
				borderWidth: 0,
			}
		}, {
			value: angleTotalPoint,
			name: '底色',
			cursor: 'default',
			itemStyle: {
				normal: {
					color: 'white',
					borderWidth: setBorderWidth, //描边线宽
					borderColor: 'white', //图形的描边颜色
				},
				zlevel: -1,
				legendHoverLink: false,
				emphasis: {
					color: '#d9f0e1',
					borderColor: '#d9f0e1',
					borderWidth: setBorderWidth,
				}
			}
		},
		{ //不可修改
			value: angleOpen,
			cursor: 'default',
			itemStyle: {
				label: {
					show: false,
				},
				labelLine: {
					show: false,
				},
				color: 'rgba(0, 0, 0, 0)',
				borderColor: 'rgba(0, 0, 0, 0)',
				borderWidth: 0,
			}
		}
	];
	var myChart = echarts.init(document.getElementById(id));
	var option = {
		title: {
			text: echartsTitle,
			x: 'center',
			textStyle: {
				fontWeight: 'normal', //-----标题颜色
				color: '#fff',
				fontSize: '121%'
			}
		},
		backgroundColor: '#0C1622',
		series: [{
			name: '体检信息-底',
			type: 'pie',
			radius: ['69.5%', '70%'], //饼图的内外半径
			center: ['50%', '50%'], //圆心坐标
			avoidLabelOverlap: false, //是否启用防止标签重叠策略  默认true
			startAngle: 270 - angleOpen / 2, //起始角度，支持范围[0, 360]。   默认90
			legendHoverLink: false, //是否启用图例 hover 时的联动高亮   默认true
			hoverAnimation: false, //是否开启 hover 在扇区上的放大动画效果  默认true
			clockwise: true, //饼图的扇区是否是顺时针排布   默认true
			label: {
				show: false,
			},
			emphasis: {
				color: '#d9f0e1',
				borderColor: '#d9f0e1',
				borderWidth: 5,
			},
			data: dataDispose //重点在这里
		}]
	};
	myChart.setOption(option);
	// echarts自适应
	$(window).resize(function () {
		myChart.resize();
	});
	/*调用div监听重渲染函数*/
	echartsRender('.partRight', myChart);
}
/*文本渲染函数*/
function textRender(textData, id, dataColor, echartsTitle) {
	/*清空dom*/
	console.log(dataColor)
	$(id).empty();
	/*var htmlTop = "<div class='textTop'>" + echartsTitle + "</div>"
	$(id).append(htmlTop);*/
	var htmlBottom = "<div class='textBottom'>" + textData + "</div>"
	$(id).append(htmlBottom);
	$(id).find('.textBottom').eq(0).css('color', dataColor);
	$(id).css('background', '#0C1622');
	$(id).css('z-index', 101);
}
//内嵌网站

//根据传入的div的id修改div的图表width,height,x轴,y轴
function echartsCreate(legendTitle, yListForm, namespace, method, params, timer, tableCaptionInfor, tableColWidth, echartsBaseLine, echartsColor, ajaxUrl, index, echartsClass, width, height, clientX, clientY, kanbanData, dataInputType, whType, echartsTitle, echartsShowType) {
	/*清理定时器*/
	if (timer < 60) {
		timer = 60
	}
	clearInterval(timer1);
	/*创建div并设置相应的位置及大小信息*/
	createDiv(index);
	$("#ect" + index).css("position", "absolute");
	if (whType == 'percent') {
		$("#ect" + index).css("width", width + "%");
		$("#ect" + index).css("height", height + "%");
	} else if (whType == 'pixel') {
		$("#ect" + index).css("width", width + "px");
		$("#ect" + index).css("height", height + "px");
	}
	$("#ect" + index).css("left", clientX + "%");
	$("#ect" + index).css("top", clientY + "%");
	/*对拿到的图表类型进行判断，为echarts类型或者jqgrid表格发送ajax请求*/
	if (echartsClass == 'bar' || echartsClass == 'horizontalBar' || echartsClass == 'line' || echartsClass == 'doubleLine' || echartsClass == 'pie' || echartsClass == 'speedPan' || echartsClass == 'plato' || echartsClass == 'text' || echartsClass == 'ring') {
		/*初始化echarts的x轴和y轴数据数组*/
		var paramsObj = '';
		if (params) {
			paramsObj = params;
		}
		/*判断dataInputType是httpClient还是webService*/
		if (dataInputType == 'webService') {
			webServiceAjax(legendTitle, yListForm, namespace, method, ajaxUrl, paramsObj, echartsClass, echartsTitle, index, echartsBaseLine, echartsColor);
			/*设置定时器*/
			if (timer) {
				var timer1 = setInterval(function () {
					webServiceAjax(legendTitle, yListForm, namespace, method, ajaxUrl, paramsObj, echartsClass, echartsTitle, index, echartsBaseLine, echartsColor);
				}, timer * 1000);
			} else {
				var timer1 = setInterval(function () {
					webServiceAjax(legendTitle, yListForm, namespace, method, ajaxUrl, paramsObj, echartsClass, echartsTitle, index, echartsBaseLine, echartsColor);
				}, 60000);
			}
		} else {
			/*发送ajax请求获取x轴和y轴的数值----封装函数*/
			ajaxUpdata(legendTitle, yListForm, ajaxUrl, paramsObj, echartsClass, echartsTitle, index, echartsBaseLine, echartsColor);
			/*设置定时器*/
			if (timer) {
				var timer1 = setInterval(function () {
					ajaxUpdata(legendTitle, yListForm, ajaxUrl, paramsObj, echartsClass, echartsTitle, index, echartsBaseLine, echartsColor);
				}, timer * 1000);
			} else {
				var timer1 = setInterval(function () {
					ajaxUpdata(legendTitle, yListForm, ajaxUrl, paramsObj, echartsClass, echartsTitle, index, echartsBaseLine, echartsColor);
				}, 60000);
			}
		}

	} else if (echartsClass == 'insertUrl') {
		console.log('url' + ajaxUrl)
		//内嵌网站
		$("#ect" + index).css('border', '1px solid #ccc');
		$("#ect" + index).css('padding-bottom', '20px');
		$("#ect" + index).html('<iframe id="ifra" name="ifra" width="100%" height="99%"  frameborder="0" border="0" marginwidth="0" marginheight="0"  src=""></iframe>');
		$('#ifra').attr('src', ajaxUrl);
	} else {
		/*$("#ect" + index).css('border','1px solid #ccc');*/
		$("#ect" + index).css('overflow', 'auto');
		$("#ect" + index).css('z-index', 102);
		/*$("#ect" + index).css('background','#0C1622');*/
		$("#ect" + index).html(ajaxUrl);
	}
}

//选中实现拖拽函数
function selected(div, arr, controlState) {
	if (controlState == 'none') {
		$(".container").on("click", div, function (e) {
			$(this).toggleClass("selected");
			if ($(this).hasClass('selected')) {
				// 点击编辑模式先渲染表格
				var idNum = $(this).attr("index");
				for (var i = 0; i < arr.length; i++) {
					if (arr && idNum == arr[i].vbChart.vcCode) {
						/*判断图表类型，如果是notice，screenyMin=3*/
						if (arr[i].vbChart.vcChartType == 'notice') {
							/*获取标题的高度*/
							var screenyMin = 0;
						} else {
							/*获取标题的高度*/
							var screenyMin = $(".header").height();
						}
						/*判断VCDataType是否为空，为空即为notice*/
						if (arr[i].vbChart.vcDataType) {
							/*选中图形控制面板显示图形编辑页面*/
							$('.nav-tabs li').removeClass('active');
							$('.nav-tabs li a').attr('aria-expanded', 'false');
							$('.nav-tabs li:nth-child(2)').addClass('active');
							$('.nav-tabs li:nth-child(2) a').attr('aria-expanded', 'true');
							$('.tab-content .tab-pane').removeClass('active');
							$('.tab-content .tab-pane').removeClass('in');
							$('.tab-content .tab-pane:nth-child(2)').addClass('active');
							$('.tab-content .tab-pane:nth-child(2)').addClass('in');
							$('#dataEditSelect').val(arr[i].vbChart.vcDataType);
							if (arr[i].vbChart.vcDataType == 'innerUrl') {
								$('#sqlEditInput').css('display', 'block');
								$('#textEditInput').css('display', 'none');
								$('#wsEditInput').css('display', 'none');
								$('#imgEditUrl').css('display', 'none');
								$('#sqlEditInput').val(arr[i].vbChart.vcData);
							} else if (arr[i].vbChart.vcDataType == 'httpClient') {
								$('#sqlEditInput').css('display', 'none');
								$('#textEditInput').css('display', 'block');
								$('#wsEditInput').css('display', 'none');
								$('#imgEditUrl').css('display', 'none');
								var urlStr = arr[i].vbChart.vcData;
								var paramsStr = arr[i].vbChart.vcParams;
								var textString = "url:" + urlStr + "\n" + "params:" + paramsStr;
								$('#textEditInput').val(textString);
							} else if (arr[i].vbChart.vcDataType == 'webService') {
								$('#sqlEditInput').css('display', 'none');
								$('#textEditInput').css('display', 'none');
								$('#wsEditInput').css('display', 'block');
								$('#imgEditUrl').css('display', 'none');
								var urlStr = arr[i].vbChart.vcData;
								var paramsStr = arr[i].vbChart.vcParams;
								var namespaceStr = arr[i].vbChart.vcNamespace;
								var methodStr = arr[i].vbChart.vcMethod;
								var textString = "url:" + urlStr + "\n" + 'namespace:' + namespaceStr + '\n' + 'method:' + methodStr + '\n' + "params:" + paramsStr;
								$('#wsEditInput').val(textString);
							} else if (arr[i].vbChart.vcDataType == 'imgImport') {
								$('#sqlEditInput').css('display', 'none');
								$('#textEditInput').css('display', 'none');
								$('#wsEditInput').css('display', 'none');
								$('#imgEditUrl').css('display', 'block');
								$('#imgEditUrl').val(arr[i].vbChart.vcData);
								//隐藏不必要的输入项
								$('.echartsColorDivEdit').css('display', 'none');
								/*隐藏表格列宽输入框*/
								$('.colWidthDivEdit').css('display', 'none');
								/*隐藏表头字段输入框*/
								$('.captionSignDivEdit').css('display', 'none');
								/*隐藏图表标题*/
								$('.eeTitleDiv').css('display', 'none');
								/*隐藏柱形(折线)标题*/
								$('.legendTitleDivEdit').css('display', 'none');
								/*隐藏y轴数据格式选项*/
								$('.yListEditDiv').css('display', 'none');
							}
							/*根据whType确定宽高的单位*/
							if (arr[i].vbChart.vcWhType == 'percent') {
								$('#ewheType').val('percent');
								$('#widthLabel').html('宽度(%):');
								$('#heightLabel').html('高度(%):');
							} else if (arr[i].vbChart.vcWhType == 'pixel') {
								$('#ewheType').val('pixel');
								$('#widthLabel').html('宽度(px):');
								$('#heightLabel').html('高度(px):');
							}
							$('#eeTitle').val(arr[i].vbChart.vcTitle);
							$('#createTime').val(arr[i].vbChart.vcCreateTime);
							$("#primaryKey").val(arr[i].vbChart.vcID);
							$("#num").val(arr[i].vbChart.vcCode);
							/*数据刷新时间*/
							$('#timerEdit').val(arr[i].vbChart.vcTimer);
							$("#editEcharts").val(arr[i].vbChart.vcChartType);
							/*根据图表选择的类型显示相对应的输入框*/
							var echartsType = arr[i].vbChart.vcChartType;
							if (arr[i].vbChart.vcDataType == 'imgImport') {
								/*显示图形颜色和基准线输入框*/
								$('.echartsColorDivEdit').css('display', 'none');
								/*隐藏表格列宽输入框*/
								$('.colWidthDivEdit').css('display', 'none');
								/*隐藏表头字段输入框*/
								$('.captionSignDivEdit').css('display', 'none');
								/*隐藏图表标题*/
								$('.eeTitleDiv').css('display', 'none');
								/*隐藏柱形(折线)标题*/
								$('.legendTitleDivEdit').css('display', 'none');
								/*隐藏y轴数据格式选项*/
								$('.yListEditDiv').css('display', 'none');
								//隐藏刷新时间
								$('.timerDivEdit').css('display', 'none');
							} else if (echartsType == 'bar' || echartsType == 'horizontalBar' || echartsType == 'line' || echartsType == 'doubleLine' || echartsType == 'pie' || echartsType == 'speedPan' || echartsType == 'plato' || echartsType == 'text' || echartsType == 'ring') {
								/*根据获取的vcLineTitle设置柱形(折线)的标题*/
								var vcLineTitle = arr[i].vbChart.vcLineTitle;
								/*根据获取的vcPercent设置y轴数据格式的值*/
								var vcPercent = arr[i].vbChart.vcPercent;
								/*扇形或者环形隐藏y轴数据格式*/
								if (echartsType == 'pie' || echartsType == 'speedPan' || echartsType == 'ring') {
									/*隐藏y轴数据格式选项*/
									$('.yListEditDiv').css('display', 'none')
									/*隐藏基准线*/
									$('.baseLineLabelEdit').css('display', 'none');
									$('#baseLineEdit').css('display', 'none');
									/*显示柱形(折线)标题*/
									$('.legendTitleDivEdit').css('display', 'block');
									$('#legendTitleEdit').val(vcLineTitle);
								} else if (echartsType == 'text') {
									/*隐藏y轴数据格式选项*/
									$('.yListEditDiv').css('display', 'none');
									/*隐藏基准线*/
									$('.baseLineLabelEdit').css('display', 'none');
									$('#baseLineEdit').css('display', 'none');
									/*隐藏柱形(折线)标题*/
									$('.legendTitleDivEdit').css('display', 'none');
								} else {
									/*显示y轴数据格式选项*/
									$('.yListEditDiv').css('display', 'block')
									/*显示基准线*/
									$('.baseLineLabelEdit').css('display', 'inline-block');
									$('#baseLineEdit').css('display', 'inline-block');
									$('#baseLineEdit').val(arr[i].vbChart.vcExParam2);
									if (vcPercent) {
										if (vcPercent == 'normal') {
											$('#yListEdit').val('normal');
										} else {
											$('#yListEdit').val('percent');
										}
									} else {
										$('#yListEdit').val('normal');
									}
									/*显示柱形(折线)标题*/
									$('.legendTitleDivEdit').css('display', 'block');
									$('#legendTitleEdit').val(vcLineTitle);
								}
								/*显示图形颜色输入框*/
								$('.echartsColorDivEdit').css('display', 'block');
								/*隐藏表格列宽输入框*/
								$('.colWidthDivEdit').css('display', 'none');
								/*隐藏表头字段输入框*/
								$('.captionSignDivEdit').css('display', 'none');
								/*颜色*/
								$('#echartsColorEdit').val(arr[i].vbChart.vcExParam1);
								/*显示图表标题*/
								$('.eeTitleDiv').css('display', 'block');
							} else if (echartsType == 'jqTable') {
								/*隐藏图形颜色和基准线输入框*/
								$('.echartsColorDivEdit').css('display', 'none');
								/*显示表格列宽输入框*/
								$('.colWidthDivEdit').css('display', 'block');
								$('#colWidthEdit').val(arr[i].vbChart.vcExParam3);
								/*显示表头字段输入框*/
								$('.captionSignDivEdit').css('display', 'block');
								$('#captionSignInputEdit').val(arr[i].vbChart.vcExParam4)
								/*显示图表标题*/
								$('.eeTitleDiv').css('display', 'block');
								/*隐藏柱形(折线)标题*/
								$('.legendTitleDivEdit').css('display', 'none');
								/*隐藏y轴数据格式选项*/
								$('.yListEditDiv').css('display', 'none');
							} else {
								/*显示图形颜色和基准线输入框*/
								$('.echartsColorDivEdit').css('display', 'none');
								/*隐藏表格列宽输入框*/
								$('.colWidthDivEdit').css('display', 'none');
								/*隐藏表头字段输入框*/
								$('.captionSignDivEdit').css('display', 'none');
								/*隐藏图表标题*/
								$('.eeTitleDiv').css('display', 'none');
								/*隐藏柱形(折线)标题*/
								$('.legendTitleDivEdit').css('display', 'none');
								/*隐藏y轴数据格式选项*/
								$('.yListEditDiv').css('display', 'none');
							}
							$("#width").val(arr[i].vbChart.vcWidth);
							$("#height").val(arr[i].vbChart.vcHeight);
							$("#clientX").val(arr[i].vbChart.vcXaxis);
							$("#clientY").val(arr[i].vbChart.vcYaxis);
						} else {
							/*当编辑的是notice的情况时，编辑框的值*/
							/*选中提示框控制面板显示提示框编辑页面*/
							$('.nav-tabs li').removeClass('active');
							$('.nav-tabs li a').attr('aria-expanded', 'false');
							$('.nav-tabs li:nth-child(4)').addClass('active');
							$('.nav-tabs li:nth-child(4) a').attr('aria-expanded', 'true');
							$('.tab-content .tab-pane').removeClass('active');
							$('.tab-content .tab-pane').removeClass('in');
							$('.tab-content .tab-pane:nth-child(4)').addClass('active');
							$('.tab-content .tab-pane:nth-child(4)').addClass('in');
							/*根据whType确定宽高的单位*/
							if (arr[i].vbChart.vcWhType == 'percent') {
								$('#nwheType').val('percent');
								$('#neWidthLabel').html('宽度(%):');
								$('#neHeightLabel').html('高度(%):');
							} else if (arr[i].vbChart.vcWhType == 'pixel') {
								$('#nwheType').val('pixel');
								$('#neWidthLabel').html('宽度(px):');
								$('#neHeightLabel').html('高度(px):');
							}
							editor[1].html(arr[i].vbChart.vcData);
							$('#noticeEditTime').val(arr[i].vbChart.vcCreateTime);
							$('#noticeEditKey').val(arr[i].vbChart.vcID);
							$('#noticeEditNum').val(arr[i].vbChart.vcCode);
							$('#noticeEditWidth').val(arr[i].vbChart.vcWidth);
							$('#noticeEditHeight').val(arr[i].vbChart.vcHeight);
							$('#nEditClientX').val(arr[i].vbChart.vcXaxis);
							$('#nEditClientY').val(arr[i].vbChart.vcYaxis);
						}
					}
				}
				$(this).css("border", "1px solid red");
				$(this).css("z-index", 1000);
				mouseStartX = e.clientX;
				mouseStartY = e.clientY;
				divStartX = $(div).offset().left;
				divStartY = $(div).offset().top;
				$(".container").on("mousemove", div, function (e) {
					screenX = $('.partLeft').width() - $(div).outerWidth(true) - $(".container").width() * 0.01;
					screenY = $('.partLeft').height() - $(div).outerHeight(true) - $(".container").width() * 0.01;
					mouseEndX = e.clientX;
					mouseEndY = e.clientY;
					distanceX = mouseEndX - mouseStartX;
					distanceY = mouseEndY - mouseStartY;
					divEndX = divStartX + distanceX;
					divEndY = divStartY + distanceY;
					if (divEndX > 10 && divEndX < screenX) {
						$(this).css("left", divEndX + "px");
					} else if (divEndX >= screenX) {
						$(this).css("left", screenX + "px");
					} else {
						$(this).css("left", 10 + "px");
					}
					if (divEndY > screenyMin && divEndY < screenY) {
						$(this).css("top", divEndY + "px");
					} else if (divEndY >= screenY) {
						$(this).css("top", screenY + "px");
					} else {
						$(this).css("top", screenyMin + "px");
					}
					//下拉框里的x，y随动
					for (var i = 0; i < arr.length; i++) {
						if (arr[i].vbChart.vcChartType != 'notice') {
							var k = arr[i].vbChart.vcChartType;
							var j = arr[i].vbChart.vcCode;
							if ($(this).attr("index") == j) {
								$("#num").val(j);
								$("#editEcharts").val(k);
								$("#clientX").val($(this).css("left").split("px")[0] / $(".container").width() * 100);
								$("#clientY").val($(this).css("top").split("px")[0] / $(".container").height() * 100);
							}
						} else {
							var j = arr[i].vbChart.vcCode;
							if ($(this).attr("index") == j) {
								$("#nEditClientX").val($(this).css("left").split("px")[0] / $(".container").width() * 100);
								$("#nEditClientY").val($(this).css("top").split("px")[0] / $(".container").height() * 100);
							}
						}

					}
				});
			} else {
				mouseStartX = 0;
				mouseStartY = 0;
				distanceX = 0;
				distanceY = 0;
				mouseEndX = 0;
				mouseEndY = 0;
				divStartX = 0;
				divStartY = 0;
				divEndX = 0;
				divEndY = 0;
				// $(".controlBoard").removeClass('show')
				$(".container").off("mousemove", div);
				$(this).css("border", "1px solid #ccc");
				$(this).css("z-index", 100); //z-index的值不能设置的太小，太小会导致绑定的事件触犯不了
			}
		});
	} else {
		$(".container").off("click", div);
		return;
	}

}

function UpdateTime() {
	var n = 1;
	setInterval(function () {
		n++;
		KanBanFunc.CreateHeaderMessage();
		if (n % 60 == 0) {
			/*EquipDetailFunc.CreateEcharts();
			var plineIDARR = EquipDetailFunc.GetLineId();*/
			// //-------------------------------------lmy--------------------开始轮播
			// EquipDetailFunc.StartSwiper();
			//--------------------------------lmy-----------------------------------------刷新设备状态列表
			$("#firstLineTakTab").trigger("reloadGrid");
			$("#secondLineTakTab").trigger("reloadGrid");
			//--------------------------------lmy-----------------------------------------刷新设备异常列表
			$("#eqAnoTaSwip").trigger("reloadGrid");
		}

	}, 1000); // 重复执行 showtime()函数 间隔 1秒
}
/*定时器发送ajax，刷新数据*/
function ajaxUpdata(legendTitle, yListForm, ajaxUrl, paramsObj, echartsClass, echartsTitle, index, echartsBaseLine, echartsColor) {
	$.ajax({
		url: commonIp + '/httpResult',
		type: 'POST',
		dataType: 'json',
		data: {
			'url': ajaxUrl,
			'params': paramsObj
		},
		async: true,
		success: function (res) {
			if (res) {
				var xData = [];
				var yData = [];
				if (legendTitle) {
					var legendArr = legendTitle.split(',');
				} else {
					var legendArr = [];
				}

				/*双折线*/
				if (echartsClass == 'doubleLine' || echartsClass == 'plato') {
					var yData2 = [];
					var dataRows1 = res.dataRows1;
					var dataRows2 = res.dataRows2;
					/*获取第一条线数据*/
					for (var j = 0; j < dataRows1.length; j++) {
						var x = dataRows1[j].xValue;
						var y = dataRows1[j].yValue;
						xData.push(x);
						yData.push(y);
					}
					/*获取第二条线数据*/
					for (var k = 0; k < dataRows2.length; k++) {
						var y2 = dataRows2[k].yValue;
						yData2.push(y2);
					}
				} else {
					if (res.dataRows) {
						var dataRows = res.dataRows;
						for (var j = 0; j < dataRows.length; j++) {
							var x = dataRows[j].xValue;
							var y = dataRows[j].yValue;
							xData.push(x);
							yData.push(y);
						}
					}
				}
				/*根据图表类型创建相应的图形*/
				if (echartsClass == "bar") {
					var barColor = echartsColor;
					if (!barColor) {
						barColor = '#C23631';
					}
					if (yListForm == 'percent') {
						echartsBar2(legendArr, "ect" + index, xData, yData, echartsTitle, echartsBaseLine, barColor);
					} else {
						echartsBar(legendArr, "ect" + index, xData, yData, echartsTitle, echartsBaseLine, barColor);
					}
					/*$("#ect" + index).css('border','1px solid #ccc');*/
				} else if (echartsClass == 'horizontalBar') {
					var barColor = echartsColor;
					if (!barColor) {
						barColor = '#C23631';
					}
					if (yListForm == 'percent') {
						horizontalBar2(legendArr, "ect" + index, xData, yData, echartsTitle, echartsBaseLine, barColor);
					} else {
						horizontalBar(legendArr, "ect" + index, xData, yData, echartsTitle, echartsBaseLine, barColor);
					}
				} else if (echartsClass == "line") {
					var lineColor = echartsColor;
					if (!lineColor) {
						lineColor = '#C23631';
					}
					if (yListForm == 'percent') {
						echartsLine2(legendArr, "ect" + index, xData, yData, echartsTitle, echartsBaseLine, lineColor);
					} else {
						echartsLine(legendArr, "ect" + index, xData, yData, echartsTitle, echartsBaseLine, lineColor);
					}
					/*$("#ect" + index).css('border','1px solid #ccc');*/
				} else if (echartsClass == 'doubleLine') {
					var lineColor = echartsColor;
					var lineColorArr = lineColor.split(',');
					if (!lineColor || lineColorArr.length < 2) {
						lineColorArr = ['#C23631', 'green'];
					}
					if (yListForm == 'percent') {
						echartsLine4(legendArr, "ect" + index, xData, yData, yData2, echartsTitle, echartsBaseLine, lineColorArr);
					} else {
						echartsLine3(legendArr, "ect" + index, xData, yData, yData2, echartsTitle, echartsBaseLine, lineColorArr);
					}
				} else if (echartsClass == "pie") {
					/*扇形图color格式为数组形式,设置默认颜色*/
					var pieColor = echartsColor;
					var pieColorArr = pieColor.split(',');
					var pieColorLength = pieColorArr.length;
					if (!pieColor || pieColorLength < xData.length) {
						pieColorArr = [
							'#00ff66', '#87CEEB', '#E8E83E', '#ff5809', '#69edfc', '#0066ff', '#CC66FF', '#33FF99', '#990066', '#0033FF', '#3399FF', '#330033', '#CC00FF', '#99FFFF', '#3333CC', '#00FF66', '#9933FF', '#99CC00', '#9999FF', '#990066', '#00FF99', '#0066CC', '#003333', '#003300', '#33FF00', '#0099CC', '#9900FF', '#3366FF', '#3300CC', '#FF3300', '#CC9933', '#66CC99', '#FF6600', '#6666CC', '#FF00CC', '#CC66FF', '#C23531', '#E8E83E', '#00ff66', '#ff5809', '#69edfc', '#0066ff', '#CC66FF', '#33FF99', '#990066', '#0033FF', '#3399FF', '#330033', '#CC00FF', '#99FFFF', '#3333CC', '#00FF66', '#9933FF', '#99CC00', '#9999FF', '#990066', '#00FF99', '#0066CC', '#003333', '#003300', '#33FF00', '#0099CC', '#9900FF', '#3366FF', '#3300CC', '#FF3300', '#CC9933', '#66CC99', '#FF6600', '#6666CC', '#FF00CC', '#CC66FF', '#C23531', '#E8E83E', '#00ff66', '#ff5809', '#69edfc', '#0066ff', '#CC66FF', '#33FF99', '#990066', '#0033FF', '#3399FF', '#330033', '#CC00FF', '#99FFFF', '#3333CC', '#00FF66', '#9933FF', '#99CC00', '#9999FF', '#990066', '#00FF99', '#0066CC', '#003333', '#003300', '#33FF00', '#0099CC', '#9900FF', '#3366FF', '#3300CC', '#FF3300', '#CC9933', '#66CC99', '#FF6600', '#6666CC', '#FF00CC', '#CC66FF', '#C23531', '#E8E83E', '#00ff66', '#ff5809', '#69edfc', '#0066ff', '#CC66FF', '#33FF99', '#990066', '#0033FF', '#3399FF', '#330033', '#CC00FF', '#99FFFF', '#3333CC', '#00FF66', '#9933FF', '#99CC00', '#9999FF', '#990066', '#00FF99', '#0066CC', '#003333', '#003300', '#33FF00', '#0099CC', '#9900FF', '#3366FF', '#3300CC', '#FF3300', '#CC9933', '#66CC99', '#FF6600', '#6666CC', '#FF00CC', '#CC66FF', '#C23531', '#E8E83E', '#00ff66', '#ff5809', '#69edfc', '#0066ff', '#CC66FF', '#33FF99', '#990066', '#0033FF', '#3399FF', '#330033', '#CC00FF', '#99FFFF', '#3333CC', '#00FF66', '#9933FF', '#99CC00', '#9999FF', '#990066', '#00FF99', '#0066CC', '#003333', '#003300', '#33FF00', '#0099CC', '#9900FF', '#3366FF', '#3300CC', '#FF3300', '#CC9933', '#66CC99', '#FF6600', '#6666CC', '#FF00CC', '#CC66FF'
						];
					}
					echartsPieTest(legendArr, "ect" + index, xData, yData, echartsTitle, pieColorArr);
					/*$("#ect" + index).css('border','1px solid #ccc');*/
				} else if (echartsClass == "speedPan") {
					/*扇形图color格式为数组形式,设置默认颜色*/
					var ringColor = echartsColor;
					var ringColorArr = ringColor.split(',');
					var ringColorLength = ringColorArr.length;
					if (!ringColor || ringColorLength < xData.length) {
						ringColorArr = [
							'#00ff66', '#87CEEB', '#E8E83E', '#ff5809', '#69edfc', '#0066ff', '#CC66FF', '#33FF99', '#990066', '#0033FF', '#3399FF', '#330033', '#CC00FF', '#99FFFF', '#3333CC', '#00FF66', '#9933FF', '#99CC00', '#9999FF', '#990066', '#00FF99', '#0066CC', '#003333', '#003300', '#33FF00', '#0099CC', '#9900FF', '#3366FF', '#3300CC', '#FF3300', '#CC9933', '#66CC99', '#FF6600', '#6666CC', '#FF00CC', '#CC66FF', '#C23531', '#E8E83E', '#00ff66', '#ff5809', '#69edfc', '#0066ff', '#CC66FF', '#33FF99', '#990066', '#0033FF', '#3399FF', '#330033', '#CC00FF', '#99FFFF', '#3333CC', '#00FF66', '#9933FF', '#99CC00', '#9999FF', '#990066', '#00FF99', '#0066CC', '#003333', '#003300', '#33FF00', '#0099CC', '#9900FF', '#3366FF', '#3300CC', '#FF3300', '#CC9933', '#66CC99', '#FF6600', '#6666CC', '#FF00CC', '#CC66FF', '#C23531', '#E8E83E', '#00ff66', '#ff5809', '#69edfc', '#0066ff', '#CC66FF', '#33FF99', '#990066', '#0033FF', '#3399FF', '#330033', '#CC00FF', '#99FFFF', '#3333CC', '#00FF66', '#9933FF', '#99CC00', '#9999FF', '#990066', '#00FF99', '#0066CC', '#003333', '#003300', '#33FF00', '#0099CC', '#9900FF', '#3366FF', '#3300CC', '#FF3300', '#CC9933', '#66CC99', '#FF6600', '#6666CC', '#FF00CC', '#CC66FF', '#C23531', '#E8E83E', '#00ff66', '#ff5809', '#69edfc', '#0066ff', '#CC66FF', '#33FF99', '#990066', '#0033FF', '#3399FF', '#330033', '#CC00FF', '#99FFFF', '#3333CC', '#00FF66', '#9933FF', '#99CC00', '#9999FF', '#990066', '#00FF99', '#0066CC', '#003333', '#003300', '#33FF00', '#0099CC', '#9900FF', '#3366FF', '#3300CC', '#FF3300', '#CC9933', '#66CC99', '#FF6600', '#6666CC', '#FF00CC', '#CC66FF', '#C23531', '#E8E83E', '#00ff66', '#ff5809', '#69edfc', '#0066ff', '#CC66FF', '#33FF99', '#990066', '#0033FF', '#3399FF', '#330033', '#CC00FF', '#99FFFF', '#3333CC', '#00FF66', '#9933FF', '#99CC00', '#9999FF', '#990066', '#00FF99', '#0066CC', '#003333', '#003300', '#33FF00', '#0099CC', '#9900FF', '#3366FF', '#3300CC', '#FF3300', '#CC9933', '#66CC99', '#FF6600', '#6666CC', '#FF00CC', '#CC66FF'
						];
					}
					echartsSpeed(legendArr, "ect" + index, xData, yData, echartsTitle, ringColorArr);
				} else if (echartsClass == "plato") {
					var platoColor = echartsColor;
					var platoColorArr = platoColor.split(',');
					var platoColorLength = platoColorArr.length;
					if (!platoColor) {
						platoColorArr = [
							'#00ff66', '#87CEEB', '#E8E83E', '#ff5809', '#69edfc', '#0066ff', '#CC66FF', '#33FF99', '#990066', '#0033FF', '#3399FF', '#330033', '#CC00FF', '#99FFFF', '#3333CC', '#00FF66', '#9933FF', '#99CC00', '#9999FF', '#990066', '#00FF99', '#0066CC', '#003333', '#003300', '#33FF00', '#0099CC', '#9900FF', '#3366FF', '#3300CC', '#FF3300', '#CC9933', '#66CC99', '#FF6600', '#6666CC', '#FF00CC', '#CC66FF', '#C23531', '#E8E83E', '#00ff66', '#ff5809', '#69edfc', '#0066ff', '#CC66FF', '#33FF99', '#990066', '#0033FF', '#3399FF', '#330033', '#CC00FF', '#99FFFF', '#3333CC', '#00FF66', '#9933FF', '#99CC00', '#9999FF', '#990066', '#00FF99', '#0066CC', '#003333', '#003300', '#33FF00', '#0099CC', '#9900FF', '#3366FF', '#3300CC', '#FF3300', '#CC9933', '#66CC99', '#FF6600', '#6666CC', '#FF00CC', '#CC66FF', '#C23531', '#E8E83E', '#00ff66', '#ff5809', '#69edfc', '#0066ff', '#CC66FF', '#33FF99', '#990066', '#0033FF', '#3399FF', '#330033', '#CC00FF', '#99FFFF', '#3333CC', '#00FF66', '#9933FF', '#99CC00', '#9999FF', '#990066', '#00FF99', '#0066CC', '#003333', '#003300', '#33FF00', '#0099CC', '#9900FF', '#3366FF', '#3300CC', '#FF3300', '#CC9933', '#66CC99', '#FF6600', '#6666CC', '#FF00CC', '#CC66FF', '#C23531', '#E8E83E', '#00ff66', '#ff5809', '#69edfc', '#0066ff', '#CC66FF', '#33FF99', '#990066', '#0033FF', '#3399FF', '#330033', '#CC00FF', '#99FFFF', '#3333CC', '#00FF66', '#9933FF', '#99CC00', '#9999FF', '#990066', '#00FF99', '#0066CC', '#003333', '#003300', '#33FF00', '#0099CC', '#9900FF', '#3366FF', '#3300CC', '#FF3300', '#CC9933', '#66CC99', '#FF6600', '#6666CC', '#FF00CC', '#CC66FF', '#C23531', '#E8E83E', '#00ff66', '#ff5809', '#69edfc', '#0066ff', '#CC66FF', '#33FF99', '#990066', '#0033FF', '#3399FF', '#330033', '#CC00FF', '#99FFFF', '#3333CC', '#00FF66', '#9933FF', '#99CC00', '#9999FF', '#990066', '#00FF99', '#0066CC', '#003333', '#003300', '#33FF00', '#0099CC', '#9900FF', '#3366FF', '#3300CC', '#FF3300', '#CC9933', '#66CC99', '#FF6600', '#6666CC', '#FF00CC', '#CC66FF'
						];
					}
					echartsPlato(legendArr, "ect" + index, xData, yData, yData2, echartsTitle, echartsBaseLine, platoColorArr);
				} else if (echartsClass == 'text') {
					var dataColor = echartsColor;
					if (!dataColor) {
						dataColor = '#74FFE5';
					}
					var textData = '';
					textData = Object.values(res.dataRows)[0];
					textRender(textData, "#ect" + index, dataColor, echartsTitle);
				} else if (echartsClass == 'ring') {
					/*扇形图color格式为数组形式,设置默认颜色*/
					var ringColor = echartsColor;
					if (!ringColor) {
						ringColor = '#72E8EA';
					}
					console.log(ringColor)
					echartsRing(legendArr, "ect" + index, xData, yData, echartsTitle, ringColor);
				}
			}
		}
	});
}
/*webService接口请求ajax*/
function webServiceAjax(legendTitle, yListForm, namespace, method, ajaxUrl, paramsObj, echartsClass, echartsTitle, index, echartsBaseLine, echartsColor) {
	$.ajax({
		url: commonIp + '/PeizhiKanban/showWebService',
		type: 'POST',
		dataType: 'json',
		data: {
			'url': ajaxUrl,
			'namespace': namespace,
			'method': method,
			'params': paramsObj
		},
		async: true,
		success: function (res) {
			if (res) {
				var xData = [];
				var yData = [];
				if (legendTitle) {
					var legendArr = legendTitle.split(',');
				} else {
					var legendArr = [];
				}
				var dataRows = res;
				for (var j = 0; j < dataRows.length; j++) {
					var x = dataRows[j].xValue;
					var y = dataRows[j].yValue;
					xData.push(x);
					yData.push(y);
				}
				/*根据图表类型创建相应的图形*/
				if (echartsClass == "bar") {
					var barColor = echartsColor;
					if (!barColor) {
						barColor = '#C23631';
					}
					if (yListForm == 'percent') {
						echartsBar2(legendArr, "ect" + index, xData, yData, echartsTitle, echartsBaseLine, barColor);
					} else {
						echartsBar(legendArr, "ect" + index, xData, yData, echartsTitle, echartsBaseLine, barColor);
					}
					$("#ect" + index).css('border', '1px solid #ccc');
				} else if (echartsClass == "line") {
					var lineColor = echartsColor;
					if (!lineColor) {
						lineColor = '#C23631';
					}
					if (yListForm == 'percent') {
						echartsLine2(legendArr, "ect" + index, xData, yData, echartsTitle, echartsBaseLine, lineColor);
					} else {
						echartsLine(legendArr, "ect" + index, xData, yData, echartsTitle, echartsBaseLine, lineColor);
					}
					$("#ect" + index).css('border', '1px solid #ccc');
				} else if (echartsClass == "pie") {
					/*扇形图color格式为数组形式,设置默认颜色*/
					var pieColor = echartsColor;
					var pieColorArr = pieColor.split(',');
					var pieColorLength = pieColorArr.length;
					if (!pieColor || pieColorLength < xData.length) {
						pieColorArr = [
							'#00ff66', '#87CEEB', '#E8E83E', '#ff5809', '#69edfc', '#0066ff', '#CC66FF', '#33FF99', '#990066', '#0033FF', '#3399FF', '#330033', '#CC00FF', '#99FFFF', '#3333CC', '#00FF66', '#9933FF', '#99CC00', '#9999FF', '#990066', '#00FF99', '#0066CC', '#003333', '#003300', '#33FF00', '#0099CC', '#9900FF', '#3366FF', '#3300CC', '#FF3300', '#CC9933', '#66CC99', '#FF6600', '#6666CC', '#FF00CC', '#CC66FF', '#C23531', '#E8E83E', '#00ff66', '#ff5809', '#69edfc', '#0066ff', '#CC66FF', '#33FF99', '#990066', '#0033FF', '#3399FF', '#330033', '#CC00FF', '#99FFFF', '#3333CC', '#00FF66', '#9933FF', '#99CC00', '#9999FF', '#990066', '#00FF99', '#0066CC', '#003333', '#003300', '#33FF00', '#0099CC', '#9900FF', '#3366FF', '#3300CC', '#FF3300', '#CC9933', '#66CC99', '#FF6600', '#6666CC', '#FF00CC', '#CC66FF', '#C23531', '#E8E83E', '#00ff66', '#ff5809', '#69edfc', '#0066ff', '#CC66FF', '#33FF99', '#990066', '#0033FF', '#3399FF', '#330033', '#CC00FF', '#99FFFF', '#3333CC', '#00FF66', '#9933FF', '#99CC00', '#9999FF', '#990066', '#00FF99', '#0066CC', '#003333', '#003300', '#33FF00', '#0099CC', '#9900FF', '#3366FF', '#3300CC', '#FF3300', '#CC9933', '#66CC99', '#FF6600', '#6666CC', '#FF00CC', '#CC66FF', '#C23531', '#E8E83E', '#00ff66', '#ff5809', '#69edfc', '#0066ff', '#CC66FF', '#33FF99', '#990066', '#0033FF', '#3399FF', '#330033', '#CC00FF', '#99FFFF', '#3333CC', '#00FF66', '#9933FF', '#99CC00', '#9999FF', '#990066', '#00FF99', '#0066CC', '#003333', '#003300', '#33FF00', '#0099CC', '#9900FF', '#3366FF', '#3300CC', '#FF3300', '#CC9933', '#66CC99', '#FF6600', '#6666CC', '#FF00CC', '#CC66FF', '#C23531', '#E8E83E', '#00ff66', '#ff5809', '#69edfc', '#0066ff', '#CC66FF', '#33FF99', '#990066', '#0033FF', '#3399FF', '#330033', '#CC00FF', '#99FFFF', '#3333CC', '#00FF66', '#9933FF', '#99CC00', '#9999FF', '#990066', '#00FF99', '#0066CC', '#003333', '#003300', '#33FF00', '#0099CC', '#9900FF', '#3366FF', '#3300CC', '#FF3300', '#CC9933', '#66CC99', '#FF6600', '#6666CC', '#FF00CC', '#CC66FF'
						];
					}
					echartsPieTest(legendArr, "ect" + index, xData, yData, echartsTitle, pieColorArr);
					$("#ect" + index).css('border', '1px solid #ccc');
				} else if (echartsClass == "speedPan") {
					/*扇形图color格式为数组形式,设置默认颜色*/
					var ringColor = echartsColor;
					var ringColorArr = ringColor.split(',');
					var ringColorLength = ringColorArr.length;
					if (!ringColor || ringColorLength < xData.length) {
						ringColorArr = [
							'#00ff66', '#87CEEB', '#E8E83E', '#ff5809', '#69edfc', '#0066ff', '#CC66FF', '#33FF99', '#990066', '#0033FF', '#3399FF', '#330033', '#CC00FF', '#99FFFF', '#3333CC', '#00FF66', '#9933FF', '#99CC00', '#9999FF', '#990066', '#00FF99', '#0066CC', '#003333', '#003300', '#33FF00', '#0099CC', '#9900FF', '#3366FF', '#3300CC', '#FF3300', '#CC9933', '#66CC99', '#FF6600', '#6666CC', '#FF00CC', '#CC66FF', '#C23531', '#E8E83E', '#00ff66', '#ff5809', '#69edfc', '#0066ff', '#CC66FF', '#33FF99', '#990066', '#0033FF', '#3399FF', '#330033', '#CC00FF', '#99FFFF', '#3333CC', '#00FF66', '#9933FF', '#99CC00', '#9999FF', '#990066', '#00FF99', '#0066CC', '#003333', '#003300', '#33FF00', '#0099CC', '#9900FF', '#3366FF', '#3300CC', '#FF3300', '#CC9933', '#66CC99', '#FF6600', '#6666CC', '#FF00CC', '#CC66FF', '#C23531', '#E8E83E', '#00ff66', '#ff5809', '#69edfc', '#0066ff', '#CC66FF', '#33FF99', '#990066', '#0033FF', '#3399FF', '#330033', '#CC00FF', '#99FFFF', '#3333CC', '#00FF66', '#9933FF', '#99CC00', '#9999FF', '#990066', '#00FF99', '#0066CC', '#003333', '#003300', '#33FF00', '#0099CC', '#9900FF', '#3366FF', '#3300CC', '#FF3300', '#CC9933', '#66CC99', '#FF6600', '#6666CC', '#FF00CC', '#CC66FF', '#C23531', '#E8E83E', '#00ff66', '#ff5809', '#69edfc', '#0066ff', '#CC66FF', '#33FF99', '#990066', '#0033FF', '#3399FF', '#330033', '#CC00FF', '#99FFFF', '#3333CC', '#00FF66', '#9933FF', '#99CC00', '#9999FF', '#990066', '#00FF99', '#0066CC', '#003333', '#003300', '#33FF00', '#0099CC', '#9900FF', '#3366FF', '#3300CC', '#FF3300', '#CC9933', '#66CC99', '#FF6600', '#6666CC', '#FF00CC', '#CC66FF', '#C23531', '#E8E83E', '#00ff66', '#ff5809', '#69edfc', '#0066ff', '#CC66FF', '#33FF99', '#990066', '#0033FF', '#3399FF', '#330033', '#CC00FF', '#99FFFF', '#3333CC', '#00FF66', '#9933FF', '#99CC00', '#9999FF', '#990066', '#00FF99', '#0066CC', '#003333', '#003300', '#33FF00', '#0099CC', '#9900FF', '#3366FF', '#3300CC', '#FF3300', '#CC9933', '#66CC99', '#FF6600', '#6666CC', '#FF00CC', '#CC66FF'
						];
					}
					echartsSpeed(legendArr, "ect" + index, xData, yData, echartsTitle, ringColorArr);
				} else if (echartsClass == "plato") {
					var platoColor = echartsColor;
					var platoColorArr = platoColor.split(',');
					var platoColorLength = platoColorArr.length;
					if (!platoColor) {
						platoColorArr = [
							'#00ff66', '#87CEEB', '#E8E83E', '#ff5809', '#69edfc', '#0066ff', '#CC66FF', '#33FF99', '#990066', '#0033FF', '#3399FF', '#330033', '#CC00FF', '#99FFFF', '#3333CC', '#00FF66', '#9933FF', '#99CC00', '#9999FF', '#990066', '#00FF99', '#0066CC', '#003333', '#003300', '#33FF00', '#0099CC', '#9900FF', '#3366FF', '#3300CC', '#FF3300', '#CC9933', '#66CC99', '#FF6600', '#6666CC', '#FF00CC', '#CC66FF', '#C23531', '#E8E83E', '#00ff66', '#ff5809', '#69edfc', '#0066ff', '#CC66FF', '#33FF99', '#990066', '#0033FF', '#3399FF', '#330033', '#CC00FF', '#99FFFF', '#3333CC', '#00FF66', '#9933FF', '#99CC00', '#9999FF', '#990066', '#00FF99', '#0066CC', '#003333', '#003300', '#33FF00', '#0099CC', '#9900FF', '#3366FF', '#3300CC', '#FF3300', '#CC9933', '#66CC99', '#FF6600', '#6666CC', '#FF00CC', '#CC66FF', '#C23531', '#E8E83E', '#00ff66', '#ff5809', '#69edfc', '#0066ff', '#CC66FF', '#33FF99', '#990066', '#0033FF', '#3399FF', '#330033', '#CC00FF', '#99FFFF', '#3333CC', '#00FF66', '#9933FF', '#99CC00', '#9999FF', '#990066', '#00FF99', '#0066CC', '#003333', '#003300', '#33FF00', '#0099CC', '#9900FF', '#3366FF', '#3300CC', '#FF3300', '#CC9933', '#66CC99', '#FF6600', '#6666CC', '#FF00CC', '#CC66FF', '#C23531', '#E8E83E', '#00ff66', '#ff5809', '#69edfc', '#0066ff', '#CC66FF', '#33FF99', '#990066', '#0033FF', '#3399FF', '#330033', '#CC00FF', '#99FFFF', '#3333CC', '#00FF66', '#9933FF', '#99CC00', '#9999FF', '#990066', '#00FF99', '#0066CC', '#003333', '#003300', '#33FF00', '#0099CC', '#9900FF', '#3366FF', '#3300CC', '#FF3300', '#CC9933', '#66CC99', '#FF6600', '#6666CC', '#FF00CC', '#CC66FF', '#C23531', '#E8E83E', '#00ff66', '#ff5809', '#69edfc', '#0066ff', '#CC66FF', '#33FF99', '#990066', '#0033FF', '#3399FF', '#330033', '#CC00FF', '#99FFFF', '#3333CC', '#00FF66', '#9933FF', '#99CC00', '#9999FF', '#990066', '#00FF99', '#0066CC', '#003333', '#003300', '#33FF00', '#0099CC', '#9900FF', '#3366FF', '#3300CC', '#FF3300', '#CC9933', '#66CC99', '#FF6600', '#6666CC', '#FF00CC', '#CC66FF'
						];
					}
					echartsPlato(legendArr, "ect" + index, xData, yData, echartsTitle, platoColorArr);
				}
			}
		}
	});
}
/*对div监听resize,对echarts图形重新渲染*/
function echartsRender(divClass, myChart) {
	var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
	var target = document.querySelector(divClass);
	var observer = new MutationObserver(function (mutations) {
		mutations.forEach(function (mutation) {
			myChart.resize();
		});
	});
	var config = {
		attributes: true,
		childList: true,
		characterData: true
	}
	observer.observe(target, config);
}