/**
 * Author: yudengdeng
 * DateTime: 2016年04月08日
 * FileName: jqGrid.func.js
 * Function: jqGrid相关通用设置函数
 */


	/**
	 * function: 根据表格父视窗大小，自动设置修改表格宽度、是否自适应列宽、及是否显示水平滚动条；；
	 * 
	 * 说明：使用外部传入的自适应宽度阀值，当视图宽度小于该值时，使用水平滚动条；否则使用自适应表格宽度和自适应列宽；
	 * 
	 * gridJQueryObject：jqGrid表格包装集对象；
	 * 
	 * parentJQueryObject：jqGrid表格的直接父元素包装集对象；
	 * 
	 * setTableWidth：取值0：则使用首次加载页面Grid表格的宽度值，作为自适应阀值；【首次加载页面Grid表格的宽度值，受“autowidth:true,”影响；为true则获取到根据视窗调整后的宽度；否则为原始定义宽度（基于各列宽定义）】
	 * 				 取值大于0，则使用该值作为自适应阀值；
	 */

	function adaptiveGridTable(gridJQueryObject,parentJQueryObject)
	{
		adaptiveGridTables(gridJQueryObject,parentJQueryObject,0);
	}
	
	function adaptiveGridTables(gridJQueryObject,parentJQueryObject,setTableWidth)
	{
		//获取定义Grid时设置的表格宽度值
		/*var colModel = gridJQueryObject.getGridParam("colModel");   //获取成功
		var totalTableWidth = 0;
		alert(colModel);
		alert(JSON.stringify(colModel));      //转换成JSON对象；
		alert(JSON.stringify(colModel[0]));   //转换成JSON对象；
		alert(colModel[0].width);             //成功获取设置或默认的列宽值；   
		*/
		
		//自动获取首次加载页面是Grid表格的宽度值，作为自适应阀值；
		if(setTableWidth == 0){
			setTableWidth = gridJQueryObject.width();     //“autowidth:true,”影响该值，为true则获取到根据视窗调整后的宽度；否则为原始定义宽度（基于各列宽定义）；
			//alert("首次加载表格宽度："+setTableWidth);
		}
		else if(setTableWidth < 0){
			alert("自适应宽度阀值错误！");
			return;
		}
		
    	//根据表格父视窗大小，自动设置修改表格宽度、是否自适应列宽、及是否显示水平滚动条；；
        //function adaptiveTable(gridJQueryObject,parentJQueryObject){
        //var aTable = function adaptiveTable(gridJQueryObject,parentJQueryObject,boolInit){
        var aTable = function adaptiveTable(gridJQueryObject,parentJQueryObject,setTableWidth){
   	        var viewTableWidth = parentJQueryObject.width();
        	            
           	//realTableWidth:代表实际定义的显示表格宽度;可能比视窗大或小，是一个固定值；
           	var realTableWidth = 800;
           	//【1】获取realTableWidth方法1：仅在首次加载页面是正确值；改变视图后值变化了；
           	//realTableWidth = gridJQueryObject.width();        //获取的是Grid表格宽度“width”；setGridWidth()方法会改变该值(自适应列宽后改变宽度值)；

            //【2】获取realTableWidth方法2：仅在首次加载页面是正确值；改变视图后值变化了；
            //获取表格滚动条宽度total；setGridWidth()方法会改变该值(自适应列宽后改变宽度值)；
            /*var total=gridJQueryObject.closest('.ui-jqgrid-bdiv')[0].scrollWidth;//获取表格宽度
    		alert(total);
    		realTableWidth = total;    //total；setGridWidth()方法会改变该值(自适应列宽后改变宽度值)；
    		*/
    		
    		//【3】获取realTableWidth方法3：仅在首次加载页面是正确值；改变视图后值变化了；
    		//获取定义Grid时设置的表格宽度值totalTableWidth；setGridWidth()方法会改变该值(自适应列宽后改变宽度值)；
			/*var colModel = gridJQueryObject.getGridParam("colModel");   //获取成功
			var totalTableWidth = 0;
			$.each(colModel, function(){
				//alert(this.width);
				if(boolInit && !this.hidden)          //页面初始化时；提取显示列；有效
					totalTableWidth += this.width;    
				else if(!boolInit && !this.hidedlg)   //非初始化时；；提取显示列；--有误
					totalTableWidth += this.width;
			});
			realTableWidth = totalTableWidth;  //totalTableWidth；setGridWidth()方法会改变该值(自适应列宽后改变宽度值)；
            */
            
            
            //【4】【解决】使用外部传入的自适应宽度阀值，当视图宽度小于该值时，使用水平滚动条；否则使用自适应表格宽度和自适应列宽；
            //自适应宽度阀值最佳值：比实际的表格定义（显示）宽度小或不大于；
            realTableWidth = setTableWidth;
            
            //alert(realTableWidth +" "+viewTableWidth);
            
            if(realTableWidth <= viewTableWidth){
            	//【1】自适应Grid表格:第一步:设置表格宽度值；及是否自适应列宽-----------------------
            	gridJQueryObject.setGridWidth(viewTableWidth,true);    //设置表格宽度值（"实际宽度"等于“视图宽度”）；为实际父容器的宽度,且列宽自适应;
           		//【2】自适应Grid表格:第二步:显示或隐藏水平滚动条；-----------------------------
           		gridJQueryObject.closest(".ui-jqgrid-bdiv").css({ 'overflow' : 'hidden' });       //隐藏滚动条！！！
           	}
           	else{
           		//【1】自适应Grid表格:第一步:设置表格宽度值；及是否自适应列宽-----------------------
           		gridJQueryObject.setGridWidth(realTableWidth,true);     //【有效】通过自适应调整列宽来使grid表格"实际宽度"等于指定值realTableWidth；
            	gridJQueryObject.setGridWidth(viewTableWidth,false);    //【有效】设置表格“视图宽度”值；为实际父容器的宽度（由于后面参数为false,不会进行自适应列宽调整，表格"实际宽度"不变）,且列宽固定为设置值;
            	//【2】自适应Grid表格:第二步:显示或隐藏水平滚动条；-----------------------------
           		gridJQueryObject.closest(".ui-jqgrid-bdiv").css({ 'overflow' : 'auto' });       //隐藏滚动条！！！
      		}
      		//alert(gridJQueryObject.width());
      	};
      	
      	//alert("1");
    	//页面初始化加载时；
    	//aTable(gridJQueryObject,parentJQueryObject,true);
    	aTable(gridJQueryObject,parentJQueryObject,setTableWidth);
    	//页面视窗改变时；
    	//$(window).bind("resize",function(){aTable(gridJQueryObject,parentJQueryObject,false);});
    	$(window).bind("resize",function(){aTable(gridJQueryObject,parentJQueryObject,setTableWidth);});
    	//alert("2");
          	
          	
      	/*
    	//【绑定到含参数函数】-----------------------------------------------------------
    	//【1】闭包------------------------------------------------
   		$("#summary").bind("click", GetCode("abc"));
		function GetCode(str)
		{
		  	return function(){
		    	 alert(str)
		  	}
		}
    	//【2】------------------------------------------------
    	function GetCode(event)
		{
		    alert(event.data.foo)
		}
		$(document).ready(function(){
		    $("#summary").bind("click", {foo:'abc'} ,GetCode);
		});
    	//【3】------------------------------------------------
    	$("#summary").bind("click", function(){GetCode("abc")});
		function GetCode(str)
		{
		}*/
		//【绑定到含参数函数】-----------------------------------------------------------
    } 