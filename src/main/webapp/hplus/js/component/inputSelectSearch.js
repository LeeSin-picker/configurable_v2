// -----------lmy-----为jqgrid添加弹出框内自定义的可输入搜索可下拉的select

function getProName1(purl) {
	var results = []; //----lmy--存后台获得的数据
	$.ajax({
		type: "post",
		url: purl,
		data: {
			search: true,
			keyWord: 5
		},
		dataType: "json",
		async: false,
		// contentType:"application/json",
		success: function (data) {
			var resultsItem;
			data = data.msg;
			data = data.split(';');
			for (var i = 0; i < data.length; i++) {
				data1 = data[i].split(':');
				resultsItem = {
					id: data1[0],
					text: data1[1]
				}
				results.push(resultsItem);
			}
			// console.log(results);
		},
		error: function (data) {}
	});
	return results;
}

// -----------lmy-----为高鹏福之特有后台代码写的函数
// （为什马每次你传回来的数据格式都和别人不统一，为什么不用msg非要用toSelectDobj！！！！！！！！！）

function getProName2(purl) {
	var results = []; //----lmy--存后台获得的数据
	$.ajax({
		type: "post",
		url: purl,
		data: {
			// search: true,
			// keyWord: 5
		},
		dataType: "json",
		async: false,
		// contentType:"application/json",
		success: function (data) {
			var resultsItem;
			data =  data.toSelectDobj;
			data = data.split(';');
			for (var i = 0; i < data.length; i++) {
				data1 = data[i].split(':');
				resultsItem = {
					id: data1[0],
					text: data1[1]
				}
				results.push(resultsItem);
			}
			// console.log(results);
		},
		error: function (data) {}
	});
	return results;
}


function elemFunc1(elem, data) {
	$(elem).select2({
		data: data,
		placeholder: '请选择', //默认文字提示
		language: "zh-CN", //汉化
		allowClear: true //允许清空
	})
	

}

 // ----lmy---解决因为自定义的select插件引起的“弹出框关闭时选择框悬浮”的bugtr_bpaPid
 var timer = setInterval(function () {
	 
	 if($(".ui-overlay").css("display")=='block'){
		 if($('.select2-dropdown').length>0){
			 $('.select2-dropdown').addClass('disBlock');
		 }
	 }
	 
 	if ($(".ui-overlay").css("display") != 'block') {
 		$('.disBlock').css("display", 'none');
 	}
 }, 100)
 









