<%@ page language="java" import="java.util.*" pageEncoding="utf-8" %>
        <%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <title>可配置看板</title>
    <link rel="stylesheet" href="<%=basePath%>hplus/css/kanban/bootstrap.min.css"/>
    <link rel="stylesheet" href="<%=basePath%>hplus/css/kanban/swiper.min.css">
    <link href="<%=basePath%>hplus/css/bootstrap.min14ed.css?v=3.3.6" rel="stylesheet">
    <link href="<%=basePath%>hplus/css/font-awesome.min93e3.css?v=4.4.0" rel="stylesheet">
    <link href="<%=basePath%>hplus/css/plugins/jqgrid/ui.jqgridffe4.css?0820" rel="stylesheet">
    <link rel="stylesheet" href="<%=basePath%>hplus/css/kanban/configurable_kanban.css"/>
    <link rel="stylesheet" href="<%=basePath%>hplus/css/plugins/kindeditor/themes/default/default.css"/>
    <link rel="stylesheet" href="<%=basePath%>hplus/css/IconFont/iconfont.css"/>
    <link rel="stylesheet" href="<%=basePath%>hplus/css/animate.min.css"/>
    </head>
    <body>
    <div class="contain">
    	<div class='partLeft'>
    		<!-----------------------头部开始------------------------------>
		    <div class="header col-lg-12 col-md-12 col-sm-12 row">
		         <div class="leftTop lef col-lg-4 col-md-4 col-sm-4 logo">
		           <img src="/logoUrl/logo.png" alt="logo" />
		         </div>
		         <div class="middleTop lef col-lg-4 col-md-4 col-sm-4">
		           <h2 class="titleLineName">B看板</h2>
		         </div>
		         <ul class="rightTop lef col-lg-4 col-md-4 col-sm-4">
		           <!--<li class="rig timeTop">2017-10-27 10:30:57</li>-->
		           <!--<li class="rig temperature">温度：30.6℃</li>-->
		           <!--<li class="rig opeMode">运行模式：自动生产</li>-->
		           <!--<li class="rig humidity">湿度：50%</li>-->
		         </ul>
		    </div>
		    <!--控制面板按钮-->
		    <button class="btn btn-primary controlBtn">控制面板</button>
		    <div class="container" pageNum="6">
		    </div>
    	</div>
    	<div class='partRight'>
    		<!-----------------------主要内容部分开始------------------------------>
		    <div class="controlBoard col-lg-12 col-md-12 col-sm-12">
		    <div class="controlTop">控制面板</div>
		    <!-- Nav tabs -->
		    <ul class="nav nav-tabs" role="tablist">
		    <li role="presentation" class="active"><a href="#eCreate" aria-controls="home" role="tab"
		    data-toggle="tab">图表生成</a></li>
		    <li role="presentation" class="edit_button"><a href="#eEdit" aria-controls="profile" role="tab"
		    data-toggle="tab">图表编辑</a></li>
		    <li role="presentation" class="edit_button"><a href="#noticeCreate" aria-controls="profile" role="tab"
		    data-toggle="tab">公告生成</a></li>
		    <li role="presentation" class="edit_button"><a href="#noticeEdit" aria-controls="profile" role="tab"
		    data-toggle="tab">公告编辑</a></li>
		    </ul>
		
		    <!-- Tab panes -->
		    <div class="tab-content">
		    <!-- 图表生成页面--fzy -->
		    <div role="tabpanel" class="tab-pane fade in active" id="eCreate">
		    <div class="echartsCreate">
			<!-- 设置提示框 -->
			<div class='ecCue'></div>
		    <label for="dataSelect">数据输入:</label>
		    <select id="dataSelect" class="form-control">
		    <option value="innerUrl">内嵌网站url</option>
		    <option value="httpClient">http接口</option>
		    <option value="webService">webService</option>
		    <option value="imgImport">图片名称</option>
		    
		    </select>
		    <div class="dataInputBtn" title="输入数据"><span class="iconfont icon-icon--"></span></div>
		    <div class="dataInput col-lg-12 col-md-12 col-sm-12">
		    <textarea id="innerUrl" class="form-control"></textarea>
		    <textarea id="wsPortInput" class="form-control">url:
params:
		    </textarea>
		   <!--  新增webService接口 -->
		    <textarea id="wsInput" class="form-control">url:
namespace:
method:
params:
		    </textarea>
		    <textarea id="imgUrl" class="form-control"></textarea>		    
		    <button class="dataConfirm btn btn-primary">确定</button>
		    </div>
		    <br>
		    <div class='echartsSelectDiv'>
		    	<label for="echartsSelect">图表选择:</label>
			    <select class="form-control" name="" id="echartsSelect">
				    <option value="bar">柱形图</option>
				    <option value='horizontalBar'>横向柱状图</option>
				    <option value="line">折线图</option>
				    <option value='doubleLine'>双折线图</option>
				    <option value="pie">扇形图</option>
				    <option value="speedPan">速度表盘</option>
				    <option value="ring">环形图</option>
				    <option value="plato">柏拉图</option>
				    <option value="jqTable">表格</option>
				    <option value="text">文本</option>
				    <option value="insertUrl">内嵌网站</option>
			    </select>
		    </div>
		    <!-- 增加y轴数据描述单位 -->
		    <div class='yListDiv'>
		    	<label for='yList'>y轴数据格式:</label>
		    	<select id='yList' class="form-control">
		    		<option value='normal'>普通格式</option>
		    		<option value='percent'>百分率格式</option>
		    	</select>
		    </div>
		    <!-- 增加小标题说明 -->
		    <div class='legendTitleDiv'>
		    	<label for='legendTitle'>柱形(折线)标题:</label>
		    	<input id='legendTitle' class="form-control">
		    </div>
		    <!-- 数据定时刷新时间 -->
		    <div class='timerDiv'>
		    	<label for='timer' class='timerLabel'>数据刷新时间:</label>
		    	<input id='timer' placeholder='秒' class="form-control">
		    </div>
		    <div class='echartsColorDiv'>
		    	<label for='echartsColor' class='echartsColorLabel'>图形颜色:</label>
		    	<input class="form-control" type='text' id='echartsColor' placeholder='' autocomplete='off'>
		    	<label for='baseLine' class='baseLineLabel'>基准线:</label>
		    	<input class="form-control" type='text' id='baseLine' autocomplete='off'>
		    </div>
		    <!-- 表格列宽 -->
		    <div class='colWidthDiv'>
		    	<label for='colWidth' class='colWidthLabel'>表格列宽:</label>
		    	<input class="form-control" type='text' id='colWidth' placeholder='列宽比例' autocomplete='off'>
		    </div>
		    <!--  表头字段 -->
		    <div class='captionSignDiv'>
		    	<label for='captionSign' class='captionSignLabel'>表头字段:</label>
		    	<div class='captionIcon'><span class="iconfont icon-icon--"></span></div>
		    </div>
		    <div class="captionInput col-lg-12 col-md-12 col-sm-12">
		    <textarea id="captionSignInput" class="form-control"></textarea>
		    <button class="captionInputConfirm btn btn-primary">确定</button>
		    </div>
		    <div class='ecTitleDiv'>
		    	<label for="ecTitle" class='ecTitleLabel'>图表标题:</label>
		    	<input type="text" class="form-control" id="ecTitle" autocomplete='off'>
		    </div>
		    <label for="ewhcType">宽高单位:</label>
		    <select id="ewhcType" class="form-control">
		    <option value="percent">百分比%</option>
		    <option value="pixel">像素px</option>
		    </select>
		    <br>
		    <label for="setWidth" id="setWidthLabel">宽度(%):</label>
		    <input class="form-control" type="number" id="setWidth" min="0" max="100" step="1" style="width:20%;">
		    <label for="setHeight" id="setHeightLabel">高度(%):</label>
		    <input class="form-control" type="number" id="setHeight" min="0" max="100" step="1" style="width:20%;">
		    <br>
		    <label for="setX">X轴(%):</label>
		    <input class="form-control" type="number" id="setX" min="0" max="100" style="width:20%;">
		    <label for="setY">Y轴(%):</label>
		    <input class="form-control" type="number" id="setY" min="0" max="100" style="width:20%;">
		    <br>
		    <button id="setBtn" class="btn btn-primary">创建</button>
		    <input type=button value="刷新" class="create btn btn-primary" style="width: 50px;">
		    </div>
		    </div>
		    <!--  图表编辑页面--fzy -->
		    <div role="tabpanel" class="tab-pane fade" id="eEdit">
		    <div class="edit">
		    <!-- 设置提示框 -->
			<div class='eeCue'></div>
		    <!-- 以下的数据输入框的id需要重新设置 -->
		    <label for="dataEditSelect">数据输入:</label>
		    <select id="dataEditSelect" class="form-control">
		    <option value="innerUrl">内嵌网站url</option>
		    <option value="httpClient">http接口</option>
		    <option value="webService">webService</option>
		    <option value="imgImport">图片名称</option>
		    </select>    
		    <div class="dataEditBtn" title="输入数据"><span class="iconfont icon-icon--"></span></div>
		    <div class="dataEditInput col-lg-12 col-md-12 col-sm-12">
		    <textarea id="textEditInput" class="form-control">url:
params:
		    </textarea>
		    <textarea id="sqlEditInput" class="form-control">
		    </textarea>
		    <textarea id="wsEditInput" class="form-control">url:
namespace:
method:
params:
		    </textarea>
		    <textarea id="imgEditUrl" class="form-control"></textarea>
		    <button class="dataEditConfirm btn btn-primary">确定</button>
		    </div>
		    <!-- y轴是否启用百分率表示 -->
		    <div class='yListEditDiv'>
		    	<label for='yListEdit'>y轴数据格式:</label>
		    	<select id='yListEdit' class="form-control">
		    		<option value='normal'>普通格式</option>
		    		<option value='percent'>百分率格式</option>
		    	</select>
		    </div>
		    <!-- 增加小标题说明 -->
		    <div class='legendTitleDivEdit'>
		    	<label for='legendTitleEdit'>柱形(折线)标题:</label>
		    	<input id='legendTitleEdit' class="form-control">
		    </div>
		    <!-- 数据定时刷新时间 -->
		    <div class='timerDivEdit'>
		    	<label for='timer' class='timerLabelEdit'>数据刷新时间:</label>
		    	<input id='timerEdit' placeholder='秒' class="form-control">
		    </div>
		    <div class='echartsColorDivEdit'>
		    	<label for='echartsColor' class='echartsColorLabelEdit'>图形颜色:</label>
		    	<input class="form-control" type='text' id='echartsColorEdit' placeholder='' autocomplete='off'>
		    	<label for='baseLine' class='baseLineLabelEdit'>基准线:</label>
		    	<input class="form-control" type='text' id='baseLineEdit' autocomplete='off'>
		    </div>
		    <!-- 表格列宽 -->
		    <div class='colWidthDivEdit'>
		    	<label for='colWidth' class='colWidthLabelEdit'>表格列宽:</label>
		    	<input class="form-control" type='text' id='colWidthEdit' placeholder='列宽比例' autocomplete='off'>
		    </div>
		    <!--  表头字段 -->
		    <div class='captionSignDivEdit'>
		    	<label for='captionSign' class='captionSignLabelEdit'>表头字段:</label>
		    	<div class='captionIconEdit'><span class="iconfont icon-icon--"></span></div>
		    </div>
		    <div class="captionInputEdit col-lg-12 col-md-12 col-sm-12">
		    <textarea id="captionSignInputEdit" class="form-control"></textarea>
		    <button class="captionConfirmEdit btn btn-primary">确定</button>
		    </div> 
		    <div class='eeTitleDiv'>
			    <label for="eeTitle">图表标题:</label>
			    <input type="text" class="form-control" id="eeTitle">
		    </div>       
		    <label for='createTime' style='display:none;'>创建时间:</label>
		    <input type='text' id='createTime' style='display:none;'>
		    <label for='primaryKey' style='display:none;'>主键名:</label>
		    <input type='number' id='primaryKey' style='display:none;'>
		    <label for="num" style='display:none;'>图表编号:</label>
		    <input type="text" id="num" readonly="true" style='display:none;'>
		    <label for="editEcharts" style='display:none;'>图表类型:</label>
		    <input type="text" id="editEcharts" readonly="true" style='display:none;'>
		    <label for="ewheType">宽高单位:</label>
		    <select class="form-control" id="ewheType">
		    <option value="percent">百分比%</option>
		    <option value="pixel">像素px</option>
		    </select>
		    <br>
		    <label for="width" id="widthLabel">宽度(%):</label>
		    <input class="form-control" type="number" name="" id="width" min="0" max="100" step="1" style="width:20%;">
		    <label for="height" id="heightLabel">高度(%):</label>
		    <input class="form-control" type="number" name="" id="height" min="0" max="100" step="1" style="width:20%;">
		    <br>
		    <label for="clientX">X轴(%):</label>
		    <input class="form-control" type="number" id="clientX" min="0" max="100" step="1" style="width:20%;">
		    <label for="clientY">Y轴(%):</label>
		    <input class="form-control" type="number" id="clientY" min="0" max="100" step="1" style="width:20%;">
		    <br>
		    <!-- <span class="rangeValueShow"></span> -->
		    <button id="saveBtn" class="btn btn-primary">保存</button>
		    <button id="delBtn" class="btn btn-primary">删除</button>
		    <input type=button class="btn btn-primary flashBtn" value="刷新" onclick="location.reload()" style="width: 50px;">
		    </div>
		    </div>
		    <!-- 公告生成页面--fzy -->
		    <div role="tabpanel" class="tab-pane fade" id="noticeCreate">
		    <!-- 设置提示框 -->
			<div class='ncCue'></div>
		    <label for="nwhcType">宽高单位:</label>
		    <select id="nwhcType" class="form-control">
		    <option value="percent">百分比%</option>
		    <option value="pixel">像素px</option>
		    </select>
		    <br>
		    <label for="noticeWidth" id="noticeWidthLabel">宽度(%):</label>
		    <input class="form-control" type="number" id="noticeWidth" min="0" max="100" step="1">
		    <br>
		    <label for="noticeHeight" id="noticeHeightLabel">高度(%):</label>
		    <input class="form-control" type="number" id="noticeHeight" min="0" max="100" step="1">
		    <br>
		    <label for="noticeX">X轴(%):</label>
		    <input class="form-control" type="number" id="noticeX" min="0" max="100">
		    <br>
		    <label for="noticeY">Y轴(%):</label>
		    <input class="form-control" type="number" id="noticeY" min="0" max="100">
		    <br>
		    <textarea id="create_id" name="content" style="Width:100%;height:260px;">
		    </textarea>
		    <button id="noticeCreateBtn" class="btn btn-primary">创建</button>
		    <input class="btn btn-primary" type=button value="刷新" class="create" style="width: 50px;">
		    </div>
		    <!-- 公告编辑页面--fzy -->
		    <div role="tabpanel" class="tab-pane fade" id="noticeEdit">
		    <!-- 设置提示框 -->
			<div class='neCue'></div>
		    <label for='noticeEditTime' style='display:none;'>创建时间:</label>
		    <input class="form-control" type='text' id='noticeEditTime' style='display:none;'>
		    <label for='noticeEditKey' style='display:none;'>主键名:</label>
		    <input class="form-control" type='number' id='noticeEditKey' style='display:none;'>
		    <label for="noticeEditNum" style='display:none;'>文本编号:</label>
		    <input class="form-control" type="text" id="noticeEditNum" readonly="true" style='display:none;'>
		    <label for="nwheType">宽高单位:</label>
		    <select class="form-control" id="nwheType">
		    <option value="percent">百分比%</option>
		    <option value="pixel">像素px</option>
		    </select>
		    <br>
		    <label for="noticeEditWidth" id="neWidthLabel">宽度(%):</label>
		    <input class="form-control" type="number" name="" id="noticeEditWidth" min="0" max="100" step="1" >
		    <br>
		    <label for="noticeEditHeight" id="neHeightLabel">高度(%):</label>
		    <input class="form-control" type="number" name="" id="noticeEditHeight" min="0" max="100" step="1" >
		    <br>
		    <label for="nEditClientX">X轴(%):</label>
		    <input class="form-control" type="number" id="nEditClientX" min="0" max="100">
		    <br>
		    <label for="nEditClientY">Y轴(%):</label>
		    <input class="form-control" type="number" id="nEditClientY" min="0" max="100">
		    <br>
		    <textarea id="edit_id" name="content" style="Width:100%;height:200px;">
		    </textarea>
		    <!-- <span class="rangeValueShow"></span> -->
		    <button id="nEditSaveBtn" class="btn btn-primary">保存</button>
		    <button id="nEditDelBtn" class="btn btn-primary">删除</button>
		    <input type=button class="btn btn-primary" value="刷新" onclick="location.reload()" style="width: 50px;">
		    </div>
		    </div>
		    </div>
    	</div>
    </div>
    <script>
    //-----------------设置图片的根目录
    var initLocation = "<%=basePath%>";
    </script>
    <script src="<%=basePath%>hplus/js/kanban/jquery-1.9.1.min.js"></script>
    <script src="<%=basePath%>hplus/js/kanban/bootstrap.min.js"></script>
    <script src="<%=basePath%>hplus/js/kanban/swiper.jquery.min.js"></script>
    <script src="<%=basePath%>hplus/js/kanban/echarts.js"></script>
    <!--------------------警告信息滚动依赖-------------------------------->
    <!--<script src="js/run.com.js"></script>-->
    <!--------------------看板方法汇总------------------------------------>
    <script src="<%=basePath%>hplus/js/kanban/KanBanFunc.js"></script>
    <script src="<%=basePath%>hplus/js/plugins/peity/jquery.peity.min.js"></script>
    <script src="<%=basePath%>hplus/js/plugins/jqgrid/i18n/grid.locale-cnffe4.js?0820"></script>
    <script src="<%=basePath%>hplus/js/plugins/jqgrid/jquery.jqGrid.minffe4.js?0820"></script>
    <script src="<%=basePath%>js/jqGrid/grid.js" type="text/javascript"></script>
    <script src="<%=basePath%>hplus/js/plugins/kindeditor/kindeditor-all-min.js"></script>
    <script src="<%=basePath%>hplus/js/plugins/kindeditor/lang/zh-CN.js"></script>
    <!--新增：自定义功能脚步文件 -->
    <script src="<%=basePath%>js/custom/jqGrid.adaptive.js"></script>
    <!--------------------本看板方法初始化和调用-------------------------->
     <script src="<%=basePath%>js/common.js"></script>
    <script src="<%=basePath%>hplus/js/kanban/configurable_kanban.js"></script>
    
    <!--<script src="js/run.js"></script>-->
    <script>
    $(function () {
    	/* UpdateTime(); */
    	/* 火狐浏览器select下拉框刷新重新选择 */
    	var listLength = $('select').length;
    	var list = $('select');
    	for(var i =0;i<listLength;i++) {
    		list.eq(i).find('option').eq(0).attr('selected',true);
    	}
    	/* 屏蔽权限代码 */
    	$('.controlBtn').css('display','block');
    	<%-- $.ajax({
    		/* url:'<%=basePath%>chart/judgeChartAuth', */
    		url:'<%=basePath%>chart/judgeChartAuth',
    		type:'post',
    		async:false,
    		dataType:'json',
    		data:{},
    		success:function (data) {
    			if (data.msg == 'editable') {
    				$('.controlBtn').css('display','block');
    			}else {
    				$('.controlBtn').css('display','none');
    			}
    		},
    		err:function () {
    			
    		}
    	}); --%>
    /* 文本编辑器初始化 --notice创建*/
    var editorOption = {minWidth:'300px',height: '260px',items:[
     'source', '|', 'undo', 'redo', '|', 'preview', 'cut', 'copy', 'paste',
     '|', 'justifyleft', 'justifycenter', 'justifyright',
     'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
     'superscript', 'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
     'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|',
     'table', 'hr', 'pagebreak', 'selectall','plainpaste'
     ]};
    window.editor = new Array();  
	KindEditor.ready(function(K) {  
		editor[0] = K.create("#create_id",editorOption);  
		editor[1] = K.create("#edit_id",editorOption);  
	});
    // 定义一个空数组
    var randoms = [];//定义一个空数组储存随机生成的
    var commonPage = [];
    var localArr = [];
    var flag = true;
    var pageNum = $(".container").attr("pageNum");
    /* var localArr = JSON.parse(localStorage.getItem("localArr") || "[]"); */
    $.ajax({
    url:'<%=basePath%>findAllChart',
    type:'get',
    data:{},
    dataType:'json',
    async:false,
    success:function(data) {
    	console.log(data)
    localArr = data.data;
    /* 获取jqgrid表格组件编号，进而获取数据-fzy */
    /* var jqTableIdList = data.ids.split(',');
    $.each(jqTableIdList,function(index,value){
    	jqTableCreate(value,pageNum);
    }) */
    }
    });
    if (localArr && localArr.length) {
    for (var j =0; j <localArr.length;j++) {
    	console.log(localArr[j].vbChart.vcPageCode)
    if (localArr[j].vbChart.vcPageCode == pageNum) {
    /* localObj = localArr[j];
    flag = false; */
    commonPage.push(localArr[j]);
    randoms.push(localArr[j].vbChart.vcCode);
    }
    }
    }
    var arr = commonPage;
    var mouseStartX = 0;
    var mouseStartY = 0;
    var distanceX = 0;
    var distanceY = 0;
    var mouseEndX = 0;
    var mouseEndY = 0;
    var divStartX = 0;
    var divStartY = 0;
    var divEndX = 0;
    var divEndY = 0;
    var screenX = 0;
    var screenY = 0;
    for (var i = 0; i < arr.length; i++) {
	    var dataInputType = arr[i].vbChart.vcDataType;
	    var kanbanData = null;
	    /* whType为宽高单位 */
	    var whType = arr[i].vbChart.vcWhType;
	    /* echartsClass为图表选择 */
	    var echartsClass = arr[i].vbChart.vcChartType;
	    /* index为创建div的id依据 */
	    var index = arr[i].vbChart.vcCode;
	    /* vcWidth为div设置的宽度 */
	    var width = arr[i].vbChart.vcWidth;
	    /* vcHeight为div设置的高度 */
	    var height = arr[i].vbChart.vcHeight;
	    /* vcXaxis为div的x轴位置信息 */
	    var clientX = arr[i].vbChart.vcXaxis;
	    /* vcYaxis为div的y轴位置信息 */
	    var clientY = arr[i].vbChart.vcYaxis;
	    /* vcTitle为div的标题 */
	    var echartsTitle = arr[i].vbChart.vcTitle;
	    /* vcData为ajax请求的数据接口 */
	    var ajaxUrl = arr[i].vbChart.vcData;
	    /* vcParams为ajax请求的参数 */
	    var params = arr[i].vbChart.vcParams;
	    /* vcExParam1为echarts的颜色 */
	    var echartsColor = arr[i].vbChart.vcExParam1;
	    /* vcExParam2为echarts的基准线 */
	    var echartsBaseLine = arr[i].vbChart.vcExParam2;
	    /* vcExParam3为jqgrid表格列宽比 */
	    var tableColWidth = arr[i].vbChart.vcExParam3;
	    /* vcExParam4为jqgrid表格表头信息 */
	    var tableCaptionInfor = arr[i].vbChart.vcExParam4;
	    /* vcTimer为数据请求接口的刷新时间 */
	    var timer = arr[i].vbChart.vcTimer;
	    /* vcNamespace为webService请求需要的参数 */
	    var namespace = arr[i].vbChart.vcNamespace;
	    /* vcMethod为webService请求需要的参数 */
	    var method = arr[i].vbChart.vcMethod
	    var echartsShowType = arr[i].vbChart.vcShowType;
	    /* vcPercent为y轴单位是否加百分号 */
	    var yListForm = arr[i].vbChart.vcPercent;
		/* 柱形标题(折线) */
		var legendTitle = arr[i].vbChart.vcLineTitle;
	    /* 对echartsClass进行判断 */
	    if (echartsClass == 'jqTable') {
	    	jqTableCreate(namespace,method,params,timer,tableCaptionInfor,tableColWidth,ajaxUrl,index,width,height,clientX,clientY,whType,echartsTitle,dataInputType);
	    }else {
	    	console.log(dataInputType)
	    	if (dataInputType == 'imgImport') {
	    		//引入图片
	    		imageCreate(ajaxUrl,timer,index,whType,width,height,clientX,clientY)
	    	}else {
	    		//根据index值生成对应图表的width和height
		        echartsCreate(legendTitle,yListForm,namespace,method,params,timer,tableCaptionInfor,tableColWidth,echartsBaseLine,echartsColor,ajaxUrl,index,echartsClass,width,height,clientX,clientY,kanbanData,dataInputType,whType,echartsTitle,echartsShowType);
	    	}	    	
	    }
    }
    /* console.log(randoms) */
    //点击创建按钮创建一个图表
    $("#setBtn").click(function () {
    /* 数据定时刷新时间 */
    var timer = $('#timer').val();
    if (timer < 60) {
    	timer = 60;
    }
    var ecTitle = $('#ecTitle').val();
    var ewhcType = $('#ewhcType').val();
    var dataType = $('#dataSelect').val();
    var echartsClass = $("#echartsSelect").val();
    /* 判断图表选择下拉框的值 */
    if (echartsClass == 'bar' ||echartsClass == 'horizontalBar' || echartsClass == 'pie' ||echartsClass == 'speedPan' || echartsClass == 'line'|| echartsClass == 'doubleLine'|| echartsClass == 'plato'||echartsClass == 'ring') {
    	/* 图形颜色 */
        var echartsColor = $('#echartsColor').val();
        /*图形基准线 */
     	var baseLine = $('#baseLine').val();
        /* 表格列宽 */
        var colWidth = null;
        /* 表头字段 */
        var captionSign = null;
        if (echartsClass == 'pie' ||echartsClass == 'speedPan'||echartsClass == 'ring') {
        	/* y轴数据格式 */
            var yListForm = null;
        }else {
        	/* y轴数据格式 */
            var yListForm = $('#yList').val();
        }
        /*  柱形标题（折线） */
        var legendTitle = $('#legendTitle').val();
    }else if (echartsClass == 'jqTable') {
    	/* 图形颜色 */
        var echartsColor = null;
        /*图形基准线 */
     	var baseLine = null;
     	/* 表格列宽 */
        var colWidth = $('#colWidth').val();
        /* 表头字段 */
        var captionSign = $('#captionSignInput').val();
        /* y轴数据格式 */
        var yListForm = null;
        /*  柱形标题（折线） */
        var legendTitle = null;
    }else if (echartsClass == 'text') {
    	/*图形基准线 */
     	var baseLine = null;
     	/* 表格列宽 */
        var colWidth = null;
        /* 表头字段 */
        var captionSign = null;
        /* y轴数据格式 */
        var yListForm = null;
        /*  柱形标题（折线） */
        var legendTitle = null;
    }else {
    	var echartsColor = null;
        /*图形基准线 */
     	var baseLine = null;
     	/* 表格列宽 */
        var colWidth = null;
        /* 表头字段 */
        var captionSign = null;
        /* 标题 */
        ecTitle = null;
       /*  数据刷新时间 */
        timer = null;
        /* y轴数据格式 */
        var yListForm = null;
        /*  柱形标题（折线） */
        var legendTitle = null;
    }
    //每创建一次图表就检测arr的长度，num的值保存后自动加1
    while(true) {
		var isExists = false;
	    // 获取一个10–100范围的数
	    var random = parseInt(10 + (90 - 10) * (Math.random()))
	    // 判断当前随机数是否已经存在
	    for (var i = 0; i < randoms.length; i++) {
	        if (random == randoms[i]) {
	            isExists = true;
	            break;
	        }
	    }
	    // 如果不存在，则添加进去
	    if (!isExists) {
	    	var createNum = random;
	    	randoms.push(createNum);
	    	break;
	    }     
			}
    var createWidth = Math.floor($("#setWidth").val() * 10) / 10;
    var createHeight = Math.floor($("#setHeight").val() * 10) / 10;
    var createClientX = $("#setX").val();
    var createClientY = $("#setY").val();
    /* 根据宽高单位选项的类型适配clientX、clientY */
    if (ewhcType == "percent") {
    	var screenxMax = 100 - createWidth -1;
    	var screenyMax = ($(window).height() / $(".container").height()) * 100 - createHeight;
    	var screenxMin = 1;
    	var screenyMin = ($(".header").height() / $(".container").height()) * 100;	
    }else {
    	var screenxMax = 100 - (createWidth / $(".container").width()) * 100 -1;
    	var screenyMax = ($(window).height() - createHeight) / $(".container").height() * 100 ;
    	var screenxMin = 1;
    	var screenyMin = $(".header").height() / $(".container").height() * 100;
    }
    if (createClientX > screenxMax) {
    createClientX = screenxMax;
    }
    if (createClientX < screenxMin) {
    	createClientX = screenxMin;
    }
    if (createClientY > screenyMax) {
    	createClientY = screenyMax;
    }
    if (createClientY < screenyMin) {
        createClientY = screenyMin;//ceshi
    }
    /* 获取数据输入框里的值 */
    if (dataType == 'innerUrl') {
    	var namespace = null;
	    var method = null;
	    var paramsInput = null;
	    var echartsData = $('#innerUrl').val();
    }else if (dataType == 'imgImport') {
    	var namespace = null;
	    var method = null;
	    var paramsInput = null;
	    var echartsData = $('#imgUrl').val();    
    }else if (dataType == 'httpClient') {
    	var namespace = null;
	    var method = null;
	    var wsPortInput = $('#wsPortInput').val().replace(/\s*/g,'');
	    var wsPortArr = wsPortInput.split('url:')[1];
	    var wsPort = wsPortArr.split('params:');
	    var echartsData = wsPort[0];
	    var paramsInput = wsPort[1];
    }else if (dataType == 'webService') {
    	var wsInput = $('#wsInput').val().replace(/\s*/g,'');
	    var wsArr1 = wsInput.split('url:')[1];
	    var wsArr2 = wsArr1.split('namespace:');
	    var echartsData = wsArr2[0];
	    var wsArr3 = wsArr2[1].split('method:');
	    var namespace = wsArr3[0];
	    var wsArr4 = wsArr3[1].split('params:');
	    var method = wsArr4[0];
	    var paramsInput = wsArr4[1];
    }
    /* 判断是否存在没有输入的input，出现提示语 */
    if (echartsData == "") {
    	$('.ecCue').html('请输入数据');
    	$('.ecCue').css('display','block');
    	return;
    }
    if (createWidth == 0) {
    	$('.ecCue').html('请输入宽度');
    	$('.ecCue').css('display','block');
    	return;
    }
    if (createHeight == 0) {
    	$('.ecCue').html('请输入高度');
    	$('.ecCue').css('display','block');
    	return;
    }
    $.ajax({
    url:'<%=basePath%>addVbchart',
    async:false,
    contentType: "application/x-www-form-urlencoded",//一种编码。好像在post请求的时候需要用到。这里用的get请求，注释掉这句话也能拿到数据
    type:'post',
    data:{'vcCode':createNum,
    'vcPageCode':pageNum,
    'vcTitle':ecTitle,
    'vcWhType':ewhcType,
    'vcData':echartsData,
    'vcDataType':dataType,
    'vcChartType':echartsClass,
    'vcWidth':createWidth,
    'vcHeight':createHeight,
    'vcXaxis':createClientX,
    'vcYaxis':createClientY,
    'vcNamespace':namespace,
    'vcMethod':method,
    'vcParams':paramsInput,
    'vcExParam1':echartsColor,
    'vcExParam2':baseLine,
    'vcExParam3':colWidth,
    'vcExParam4':captionSign,
    'vcTimer':timer,
    'vcPercent':yListForm,
    'vcLineTitle':legendTitle
    },
    dataType:'json',
    success:function(data) {
    	/* location.reload(); */ 
    },
    err:function() {
    alert("请求超时");
    }
    });
    });
    //点击刷新一个图表
    $(".create").click(function () {
    location.reload();
    });
    //点击编辑按钮
    $(".controlBtn").on('click',function () {
    	/* 控制右编辑框的显示 */
    	var controlState = $('.partRight').css('display');
    	//点击编辑才可以拖动图形
        for (var j = 0; j < arr.length; j++) {
        var number1 = arr[j].vbChart.vcCode;
        selected("#ect" + number1, arr,controlState);
        }
    	if (controlState == 'block') {
    		$('.partRight').css('display','none');
    	}else {
    		$('.partRight').css('display','block');
    	}
    });
    //点击删除按钮 --echarts
    $("#delBtn").click(function () {
    var delNum = $("#primaryKey").val();
    if (delNum == "") {
    	$('.eeCue').html('请选中图表');
    	$('.eeCue').css('display','block');
    	return;
    }
    randoms.splice(randoms.indexOf(delNum),1);
    $.ajax({
    url:'<%=basePath%>delVbchart',
    async:false,
    type:'post',
    data:{'vcID':delNum},
    dataType:'json',
    success:function(data) {
    },
    err:function() {
    alert('请求超时');
    }
    });
    });
    //点击保存按钮 --echarts
    $("#saveBtn").click(function () {
    var saveLegendTitle = $('#legendTitleEdit').val();//获取柱形(折线)的值
    var saveYlistForm = $('#yListEdit').val();//获取y轴单位是否加百分号
   	var saveTimer = $('#timerEdit').val();//获取数据刷新时间
   	var saveColor = $('#echartsColorEdit').val();//获取图形颜色
   	var saveBaseLine = $('#baseLineEdit').val();//获取图形基准线
   	var saveColWidth = $('#colWidthEdit').val();//获取表格列宽
    var saveDataType = $('#dataEditSelect').val();
    if (saveDataType == 'innerUrl') {
    	var saveData = $('#sqlEditInput').val();
        var saveParams = null;
        var saveNamespace = null;
        var saveParams = null;
    }else if (saveDataType == 'httpClient'){
    	var captionSignInput = $('#textEditInput').val().replace(/\s*/g,'');
        var captionSignArr = captionSignInput.split('url:')[1];
        var captionSign = captionSignArr.split('params:');
        var saveData = captionSign[0];
        var saveParams = captionSign[1];
        var saveNamespace = null;
    }else if (saveDataType == 'webService') {
    	var saveWsInput = $('#wsEditInput').val().replace(/\s*/g,'');
	    var saveWsArr1 = saveWsInput.split('url:')[1];
	    var saveWsArr2 = saveWsArr1.split('namespace:');
	    var saveData = saveWsArr2[0];
	    var saveWsArr3 = saveWsArr2[1].split('method:');
	    var saveNamespace = saveWsArr3[0];
	    var saveWsArr4 = saveWsArr3[1].split('params:');
	    var saveMethod = saveWsArr4[0];
	    var saveParams = saveWsArr4[1];
    }else if (saveDataType == 'imgImport') {
    	var saveData = $('#imgEditUrl').val();
    }
    var saveEeTitle = $('#eeTitle').val();
    var saveEwheType = $('#ewheType').val();
    var saveKey = $("#primaryKey").val();
    var saveCreateTime = $("#createTime").val();
    var saveNum = $("#num").val();
    var saveWidth = $("#width").val();
    var saveHeight = $("#height").val();
    var saveClientX = $("#clientX").val();
    var saveClientY = $("#clientY").val();
    var saveEchartsClass = $('#editEcharts').val();
    if (saveEchartsClass == 'jqTable') {
    	var saveTableTh = $('#captionSignInputEdit').val();
    }else {
    	var saveTableTh = null;
    }
    /* 修改的x轴及y轴的数据校验 */
    if (saveEwheType == "percent") {
    	var screenxMax = 100 - saveWidth -1;
    	var screenyMax = ($(window).height() / $(".container").height()) * 100 - saveHeight;
    	var screenxMin = 1;
    	/* y值最小值为标题之下 */
    	var screenyMin = ($(".header").height() / $(".container").height()) * 100;	
    }else {
    	var screenxMax = 100 - (saveWidth / $(".container").width()) * 100 -1;
    	var screenyMax = ($(window).height() - saveHeight) / $(".container").height() * 100 ;
    	var screenxMin = 1;
    	/* y值最小值为标题之下 */
    	var screenyMin = $(".header").height() / $(".container").height() * 100;
    }
    if (saveClientX > screenxMax) {
    	saveClientX = screenxMax;
    }
    if (saveClientX < screenxMin) {
    	saveClientX = screenxMin;
    }
    if (saveClientY > screenyMax) {
    	saveClientY = screenyMax;
    }
    if (saveClientY < screenyMin) {
    	saveClientY = screenyMin;
    }
    /* 判断是否存在没有输入的input，出现提示语 */
    if (saveNum == "") {
    	$('.eeCue').html('请选中图表');
    	$('.eeCue').css('display','block');
    	return;
    }
    if (saveData == "") {
    	$('.eeCue').html('请输入sql或文本数据');
    	$('.eeCue').css('display','block');
    	return;
    }
    if (saveWidth == 0) {
    	$('.eeCue').html('请输入宽度');
    	$('.eeCue').css('display','block');
    	return;
    }
    if (saveHeight == 0) {
    	$('.eeCue').html('请输入高度');
    	$('.eeCue').css('display','block');
    	return;
    }
    $.ajax({
    url:'<%=basePath%>updateVbchart',
    async:false,
    type:'post',
    data:{'vcID':saveKey,
    'vcCode':saveNum,
    'vcTitle':saveEeTitle,
    'vcWhType':saveEwheType,
    'vcDataType':saveDataType,
    'vcData':saveData,
    'vcCreateTime':saveCreateTime,
    'vcChartType':saveEchartsClass,
    'vcPageCode':pageNum,
    'vcWidth':saveWidth,
    'vcHeight':saveHeight,
    'vcXaxis':saveClientX,
    'vcYaxis':saveClientY,
    'vcTimer':saveTimer, //数据刷新时间
    'vcExParam1':saveColor,//图形颜色
    'vcExParam2':saveBaseLine,//图形基准线
    'vcExParam3':saveColWidth,//表格列宽
    'vcExParam4':saveTableTh,//表格th
    'vcParams':saveParams,
    'vcNamespace':saveNamespace,
    'vcMethod':saveMethod,
    'vcPercent':saveYlistForm,
    'vcLineTitle':saveLegendTitle
    },
    dataType:'json',
    success:function(data) {
    	console.log('提交成功')
    },
    err:function() {
    alert('请求超时');
    }
    });
    });
    /* 数据输入框控制 */
    $('.dataInputBtn').off('click').on('click',function () {
    $('.dataInput').css('display','block');
    });
    $('.dataConfirm').off('click').on('click',function () {
    $('.dataInput').css('display','none');
    });
    /* 表头字段输入框控制 */
    $('.captionIcon').off('click').on('click',function () {
    	$('.captionInput ').css('display','block');
    });
    $('.captionInputConfirm').off('click').on('click',function () {
        $('.captionInput').css('display','none');
    });
    $('.captionIconEdit').off('click').on('click',function () {
    	$('.captionInputEdit').css('display','block');
    });
    $('.captionConfirmEdit').off('click').on('click',function () {
        $('.captionInputEdit').css('display','none');
    });
    /* 根据数据选择类型变换数据输入框 */
    $('#dataSelect').change(function () {
    var dataSelectValue = $(this).val();
    if (dataSelectValue == 'imgImport') {
    	$('#innerUrl').css('display','none');
        $('#wsPortInput').css('display','none');
        $('#wsInput').css('display','none');
        $('#imgUrl').css('display','block');
        // 隐藏不需要的输入框
		$('.echartsSelectDiv').css('display','none');
		$('.colWidthDiv').css('display','none');
		$('.captionSignDiv').css('display','none');
		$('.echartsColorDiv').css('display','none');
		/* 隐藏标题输入栏 */
		$('.ecTitleDiv').css('display','none');
		/* 显示数据刷新时间 */
		$('.timerDiv').css('display','none');
		/* 隐藏y轴数据格式 */
		$('.yListDiv').css('display','none');
		/* 隐藏柱形/折线标题 */
		$('.legendTitleDiv').css('display','none');
    }else {
    	//显示输入框
		$('.echartsSelectDiv').css('display','block');
		$('.colWidthDiv').css('display','block');
		$('.captionSignDiv').css('display','block');
		$('.echartsColorDiv').css('display','block');
		/* 隐藏标题输入栏 */
		$('.ecTitleDiv').css('display','block');
		/* 显示数据刷新时间 */
		$('.timerDiv').css('display','block');
		/* 隐藏y轴数据格式 */
		$('.yListDiv').css('display','block');
		/* 隐藏柱形/折线标题 */
		$('.legendTitleDiv').css('display','block');
    	if (dataSelectValue == 'innerUrl') {
    	    $('#innerUrl').css('display','block');
    	    $('#wsPortInput').css('display','none');
    	    $('#wsInput').css('display','none');
    	    $('#imgUrl').css('display','none');
        }else if (dataSelectValue == 'httpClient') {
        	$('#wsPortInput').css('display','block');
        	$('#innerUrl').css('display','none');
        	$('#wsInput').css('display','none');
        	$('#imgUrl').css('display','none');
        }else if (dataSelectValue == 'webService') {
        	$('#innerUrl').css('display','none');
            $('#wsPortInput').css('display','none');
            $('#wsInput').css('display','block');
            $('#imgUrl').css('display','none');
        }
    	/* 判断图表选择是否为表格 */
    	var eSelectVal = $("#echartsSelect").val()
    	if (eSelectVal == 'jqTable'){
    		/* 显示表格相关输入框 */
    		$(".colWidthDiv").css('display','block')
    		$(".captionSignDiv").css('display','block')
    		/* 隐藏echarts不相关的输入框 */
    		$(".yListDiv").css('display','none')
    		$(".legendTitleDiv").css('display','none')
    		$(".echartsColorDiv").css('display','none')
    	}else {
    		/* 隐藏表格相关输入框 */
    		$(".colWidthDiv").css('display','none')
    		$(".captionSignDiv").css('display','none')
    		/* 显示echarts不相关的输入框 */
    		$(".yListDiv").css('display','block')
    		$(".legendTitleDiv").css('display','block')
    		$(".echartsColorDiv").css('display','block')
    	}
    }
    });
    /* 数据输入框控制 --图表编辑页面*/
    $('.dataEditBtn').off('click').on('click',function () {
    $('.dataEditInput').css('display','block');
    });
    $('.dataEditConfirm').off('click').on('click',function () {
    $('.dataEditInput').css('display','none');
    });
    /* 根据数据选择类型变换数据输入框 */
    $('#dataEditSelect').change(function () {
    var dataSelectValue = $(this).val();
    if (dataSelectValue == 'innerUrl') {
	    $('#sqlEditInput').css('display','block');
	    $('#textEditInput').css('display','none');
	    $('#wsEditInput').css('display','none');
	    $('#imgEditUrl').css('display','none');
    }else if (dataSelectValue == 'httpClient') {
	    $('#sqlEditInput').css('display','none');
	    $('#textEditInput').css('display','block');
	    $('#wsEditInput').css('display','none');
	    $('#imgEditUrl').css('display','none');
    }else if (dataSelectValue == 'webService') {
    	$('#sqlEditInput').css('display','none');
	    $('#textEditInput').css('display','none');
	    $('#wsEditInput').css('display','block');
	    $('#imgEditUrl').css('display','none');
    }else if (dataSelectValue == 'imgImport') {
    	$('#sqlEditInput').css('display','none');
	    $('#textEditInput').css('display','none');
	    $('#wsEditInput').css('display','none');
	    $('#imgEditUrl').css('display','block');
    }
    });
    /* 公告创建模块 */
    $('#noticeCreateBtn').click(function () {
    	//每创建一次图表就检测arr的长度，num的值保存后自动加1
        while(true) {
    		var isExists = false;
    	    // 获取一个10–100范围的数
    	    var random = parseInt(10 + (90 - 10) * (Math.random()))
    	    // 判断当前随机数是否已经存在
    	    for (var i = 0; i < randoms.length; i++) {
    	        if (random == randoms[i]) {
    	            isExists = true;
    	            break;
    	        }
    	    }
    	    // 如果不存在，则添加进去
    	    if (!isExists) {
    	    	var noticeNum = random;
    	    	randoms.push(noticeNum);
    	    	break;
    	    }     
    			}
    var noticeWhType = $('#nwhcType').val();
    var noticeWidth = $('#noticeWidth').val();
    var noticeHeight = $('#noticeHeight').val();
    var noticeX = $('#noticeX').val();
    var noticeY = $('#noticeY').val();
    /* 根据宽高单位选项的类型适配clientX、clientY */
    if (noticeWhType == "percent") {
    	var screenxMax = 100 - noticeWidth -1;
    	var screenyMax = ($(window).height() / $(".container").height()) * 100 - noticeHeight;
    	var screenxMin = 1;
    	var screenyMin = 0;	
    }else {
    	var screenxMax = 100 - (noticeWidth / $(".container").width()) * 100 -1;
    	var screenyMax = ($(window).height() - noticeHeight) / $(".container").height() * 100 ;
    	var screenxMin = 1;
    	var screenyMin = 0;
    }
    if (noticeX > screenxMax) {
    	noticeX = screenxMax;
    }
    if (noticeX < screenxMin) {
    	noticeX = screenxMin;
    }
    if (noticeY > screenyMax) {
    	noticeY = screenyMax;
    }
    if (noticeY < screenyMin) {
    	noticeY = screenyMin;
    }
    var noticeData = editor[0].html().replace(/\"/g,"'");
    noticeData = noticeData.replace(/[\n]|[\t]/,'');
    /* 判断是否存在没有输入的input，出现提示语 */ 
    if (noticeWidth == 0) {
    	$('.ncCue').html('请输入宽度');
    	$('.ncCue').css('display','block');
    	return;
    }
    if (noticeHeight == 0) {
    	$('.ncCue').html('请输入高度');
    	$('.ncCue').css('display','block');
    	return;
    }
    if (noticeData == "") {
    	$('.ncCue').html('请编辑文本框');
    	$('.ncCue').css('display','block');
    	return;
    }
    $.ajax({
    url:'<%=basePath%>addVbchart',
    async:false,
    type:'post',
    data:{'vcCode':noticeNum,
    'vcPageCode':pageNum,
    'vcWhType':noticeWhType,
    'vcData':noticeData,
    'vcWidth':noticeWidth,
    'vcHeight':noticeHeight,
    'vcXaxis':noticeX,
    'vcYaxis':noticeY,
    'vcChartType':'notice'
    },
    dataType:'json',
    success:function(data) {
    	/* location.reload(); */
    },
    err:function() {
    alert("请求超时");
    }
    });
    });
  //点击保存按钮 --kindEditor
    $("#nEditSaveBtn").click(function () {
    var snKey = $("#noticeEditKey").val();
    var snWhType = $('#nwheType').val();
    var snCreateTime = $("#noticeEditTime").val();
    var snNum = $("#noticeEditNum").val();
    var snWidth = $("#noticeEditWidth").val();
    var snHeight = $("#noticeEditHeight").val();
    var snClientX = $("#nEditClientX").val();
    var snClientY = $("#nEditClientY").val();
    var snDataInput = editor[1].html().replace(/\"/g,"'");
    /* 修改的x轴及y轴的数据校验 */
    if (snWhType == "percent") {
    	var screenxMax = 100 - snWidth -1;
    	var screenyMax = ($(window).height() / $(".container").height()) * 100 - snHeight;
    	var screenxMin = 1;
    	/* 最下值为浏览器顶端 */
    	var screenyMin = 0;	
    }else {
    	var screenxMax = 100 - (snWidth / $(".container").width()) * 100 -1;
    	var screenyMax = ($(window).height() - snHeight) / $(".container").height() * 100 ;
    	var screenxMin = 1;
    	/* 最下值为浏览器顶端 */
    	var screenyMin = 0;
    }
    if (snClientX > screenxMax) {
    	snClientX = screenxMax;
    }
    if (snClientX < screenxMin) {
    	snClientX = screenxMin;
    }
    if (snClientY > screenyMax) {
    	snClientY = screenyMax;
    }
    if (snClientY < screenyMin) {
    	snClientY = screenyMin;
    }
    /* 判断是否存在没有输入的input，出现提示语 */
    if (snNum == "") {
    	$('.neCue').html('请选中提示框');
    	$('.neCue').css('display','block');
    	return;
    }
    if (snWidth == 0) {
    	$('.neCue').html('请输入宽度');
    	$('.neCue').css('display','block');
    	return;
    }
    if (snHeight == 0) {
    	$('.neCue').html('请输入高度');
    	$('.neCue').css('display','block');
    	return;
    }
    if (snDataInput == "") {
    	$('.neCue').html('请编辑文本框');
    	$('.neCue').css('display','block');
    	return;
    }
    $.ajax({
    url:'<%=basePath%>updateVbchart',
    async:false,
    type:'post',
    data:{'vcID':snKey,
    'vcCode':snNum,
    'vcWhType':snWhType,
    'vcData':snDataInput,
    'vcCreateTime':snCreateTime,
    'vcPageCode':pageNum,
    'vcWidth':snWidth,
    'vcHeight':snHeight,
    'vcXaxis':snClientX,
    'vcYaxis':snClientY,
    'vcChartType':'notice'
    },
    dataType:'json',
    success:function(data) {
    },
    err:function() {
    alert('请求超时');
    }
    });
    });
  //点击删除按钮 --kindEditor
    $("#nEditDelBtn").click(function () {
    var noticeDelNum = $("#noticeEditKey").val();
    /* 判断是否存在没有输入的input，出现提示语 */
    if (noticeDelNum == "") {
    	$('.neCue').html('请选中提示框');
    	$('.neCue').css('display','block');
    	return;
    }
    randoms.splice(randoms.indexOf(noticeDelNum),1);
    $.ajax({
    url:'<%=basePath%>delVbchart',
    async:false,
    type:'post',
    data:{'vcID':noticeDelNum},
    dataType:'json',
    success:function(data) {
    },
    err:function() {
    alert('请求超时');
    }
    });
    });
  /* echarts创建界面宽高类型绑定change事件 */
  	$('#ewhcType').change(function () {
  		if ($(this).val() == 'percent') {
  			$('#setWidthLabel').html('宽度(%):');
  			$('#setHeightLabel').html('高度(%):');
  		}else if ($(this).val() == 'pixel') {
  			$('#setWidthLabel').html('宽度(px):');
  			$('#setHeightLabel').html('高度(px):');
  		}
  	});
  /* echarts图标选择绑定change事件 */
  $('#echartsSelect').change(function () {
		if ($(this).val() == 'bar' ||$(this).val() == 'horizontalBar' || $(this).val() == 'line'|| $(this).val() == 'doubleLine' || $(this).val() == 'pie' || $(this).val() == 'speedPan'|| $(this).val() == 'plato'|| $(this).val() == 'ring') {
			$('.echartsColorDiv').css('display','block');
			/* 选择echarts类型为扇形则隐藏基准线 */
			if ($(this).val() == 'pie'||$(this).val() == 'speedPan'||$(this).val() == 'ring') {
				$('.baseLineLabel').css('display','none');
				$('#baseLine').css('display','none');
				/* 隐藏y轴数据格式 */
				$('.yListDiv').css('display','none');
			}else {
				$('.baseLineLabel').css('display','inline-block');
				$('#baseLine').css('display','inline-block');
				/* 隐藏y轴数据格式 */
				$('.yListDiv').css('display','block');
			}
			$('.colWidthDiv').css('display','none');
			$('.captionSignDiv').css('display','none');
			/* 显示标题输入框 */
			$('.ecTitleDiv').css('display','block');
			/* 显示数据刷新时间 */
			$('.timerDiv').css('display','block');
			/* 显示柱形/折线标题 */
			$('.legendTitleDiv').css('display','block');
		}else if ($(this).val() == 'jqTable'){
			$('.colWidthDiv').css('display','block');
			$('.captionSignDiv').css('display','block');
			$('.echartsColorDiv').css('display','none');
			/* 显示标题输入框 */
			$('.ecTitleDiv').css('display','block');
			/* 显示数据刷新时间 */
			$('.timerDiv').css('display','block');
			/* 隐藏y轴数据格式 */
			$('.yListDiv').css('display','none');
			/* 隐藏柱形/折线标题 */
			$('.legendTitleDiv').css('display','none');
		}else if ($(this).val() == 'text') {
			$('.echartsColorDiv').css('display','block');
			/* 选择echarts类型为扇形则隐藏基准线 */
			$('.baseLineLabel').css('display','none');
			$('#baseLine').css('display','none');
			$('.colWidthDiv').css('display','none');
			$('.captionSignDiv').css('display','none');
			/* 显示标题输入框 */
			$('.ecTitleDiv').css('display','block');
			/* 显示数据刷新时间 */
			$('.timerDiv').css('display','block');
			/* 隐藏y轴数据格式 */
			$('.yListDiv').css('display','none');
			/* 隐藏柱形/折线标题 */
			$('.legendTitleDiv').css('display','none');
		}else {
			$('.colWidthDiv').css('display','none');
			$('.captionSignDiv').css('display','none');
			$('.echartsColorDiv').css('display','none');
			/* 隐藏标题输入栏 */
			$('.ecTitleDiv').css('display','none');
			/* 显示数据刷新时间 */
			$('.timerDiv').css('display','none');
			/* 隐藏y轴数据格式 */
			$('.yListDiv').css('display','none');
			/* 隐藏柱形/折线标题 */
			$('.legendTitleDiv').css('display','none');
		}
	});
  /* echarts编辑界面宽高类型绑定change事件 */
  	$('#ewheType').change(function () {
  		if ($(this).val() == 'percent') {
  			$('#widthLabel').html('宽度(%):');
  			$('#heightLabel').html('高度(%):');
  		}else if ($(this).val() == 'pixel') {
  			$('#widthLabel').html('宽度(px):');
  			$('#heightLabel').html('高度(px):');
  		}
  	});
  /* notice创建界面宽高类型绑定change事件 */
  	$('#nwhcType').change(function () {
  		if ($(this).val() == 'percent') {
  			$('#noticeWidthLabel').html('宽度(%):');
  			$('#noticeHeightLabel').html('高度(%):');
  		}else if ($(this).val() == 'pixel') {
  			$('#noticeWidthLabel').html('宽度(px):');
  			$('#noticeHeightLabel').html('高度(px):');
  		}
  	});
  /* notice编辑界面宽高类型绑定change事件 */
  	$('#nwheType').change(function () {
  		if ($(this).val() == 'percent') {
  			$('#neWidthLabel').html('宽度(%):');
  			$('#neHeightLabel').html('高度(%):');
  		}else if ($(this).val() == 'pixel') {
  			$('#neWidthLabel').html('宽度(px):');
  			$('#neHeightLabel').html('高度(px):');
  		}
  	});
  
    });
    </script>
    </body>
    </html>
