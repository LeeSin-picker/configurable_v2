/**
 * Author: yudengdeng
 * DateTime: 2016年11月01日
 * FileName: jqGrid.func.js
 * Function: jqGrid相关通用功能函数
 * Referred: javascript不支持重载
 */



	/**
	 * Author: yudengdeng
	 * DateTime: 2016年11月04日
	 * function: 点击jQGrid表格标题栏控制表体是否显示；
	 * @returns
	 */
    function girdBodyToggle(){
    	//alert("页面元素动态布局事件");
    	
    	//【0】测试：有效：直接隐藏表头
    	//$(this).closest('.ui-jqgrid-view').find('div.ui-jqgrid-hdiv').hide()
    	
    	//【1】测试：获取可见性
    	//【注意】jQuery选择器中多个类之间空格隔开；
    	/*alert(($(".jqGrid_wrapper .ui-jqgrid-bdiv"))[0]);   //有效
    	alert(($(".jqGrid_wrapper .ui-jqgrid-bdiv"))[0].className);   //有效
    	alert($(".jqGrid_wrapper .ui-jqgrid-bdiv").is("body"));       //有效
    	alert($(".jqGrid_wrapper .ui-jqgrid-bdiv").is(":visible"));   //有效：但不受toggle()影响
    	alert($(".jqGrid_wrapper .ui-jqgrid-bdiv").is(":hidden"));    //有效：且受toggle()影响
    	alert($(".jqGrid_wrapper .ui-jqgrid-bdiv").css("display"));   //有效：且受toggle()影响
    	alert($(".jqGrid_wrapper .ui-jqgrid-bdiv").css("visibility"));//有效：但不受toggle()影响
    	*/  
    	
    	//【采用】可采用下面两种方法，判断toggle()后的当前显示状态；
    	//alert($(".jqGrid_wrapper .ui-jqgrid-bdiv").is(":hidden"));    //有效：且受toggle()影响
    	//alert($(".jqGrid_wrapper .ui-jqgrid-bdiv").css("display"));   //有效：且受toggle()影响
    	//为保证唯一性，使用id（注意设置id与最后生成id区别）最好；例如包含子表具有相同类；
    	//代码设置id:table_list_2,最终生产id:gbox_table_list_2
    	//alert($(".jqGrid_wrapper #gbox_table_list_2 .ui-jqgrid-bdiv").is(":hidden"));    //有效：且受toggle()影响
    	
    	
    	//【2】测试：click事件触发测试
    	//alert(($('.jqGrid_wrapper').find("div.ui-jqgrid-titlebar"))[0].className);
		//触发jQGrid表格标题栏单击事件；“jQGrid表格标题栏单击事件”在定义表格的gridComplete事件处理程序中定义；
		//$(".jqGrid_wrapper .ui-jqgrid-titlebar").trigger("click");           //有效 //js单击事件触发；
		//$(".jqGrid_wrapper .ui-jqgrid-titlebar").click();                    //有效//jQuery单击事件触发；“jQGrid表格标题栏单击事件”在定义表格的gridComplete事件处理程序中定义；
		//$(".jqGrid_wrapper div .ui-jqgrid-titlebar").click();                //有效//jQuery单击事件触发；“jQGrid表格标题栏单击事件”在定义表格的gridComplete事件处理程序中定义；
		//$('.jqGrid_wrapper').find("div.ui-jqgrid-titlebar").click();         //有效//jQuery单击事件触发；“jQGrid表格标题栏单击事件”在定义表格的gridComplete事件处理程序中定义；
		//$('.jqGrid_wrapper').find("div.ui-jqgrid-titlebar").first().click(); //有效//jQuery单击事件触发；“jQGrid表格标题栏单击事件”在定义表格的gridComplete事件处理程序中定义；
		//$(($('.jqGrid_wrapper').find("div.ui-jqgrid-titlebar"))[0]).click(); //有效//jQuery单击事件触发；“jQGrid表格标题栏单击事件”在定义表格的gridComplete事件处理程序中定义；
		
		//【采用】
		//为保证唯一性，使用id（注意设置id与最后生成id区别）最好；例如包含子表具有相同类；
		//代码设置id:table_list_2,最终生产id:gbox_table_list_2
		//$(".jqGrid_wrapper .ui-jqgrid-titlebar").click();                    //有效//jQuery单击事件触发；“jQGrid表格标题栏单击事件”在定义表格的gridComplete事件处理程序中定义；
		//$(".jqGrid_wrapper #gbox_table_list_2 .ui-jqgrid-titlebar").click();   //有效//jQuery单击事件触发；“jQGrid表格标题栏单击事件”在定义表格的gridComplete事件处理程序中定义；

    	
		//【3】编码：绑定click事件；
    	//页面元素动态布局事件
    	/* $(".jqGrid_wrapper .ui-jqgrid-titlebar").click(function(){
    		
        	alert("显示或隐藏");
        	$(".jqGrid_wrapper .ui-jqgrid-hdiv").toggle();
    		$(".jqGrid_wrapper .ui-jqgrid-bdiv").toggle();
    		$(".jqGrid_wrapper #pager_list_2").toggle();
    		
        	//$(".jqGrid_wrapper 。ui-jqgrid-titlebar").hide()
        }); */
    	//【注意】jQGrid表格每次加载完都会触发girdComplete事件，因此绑定click事件前，应先解绑；否则没绑定一次，单击处理函数多执行一遍；
        $(this).closest('.ui-jqgrid-view').find("div.ui-jqgrid-titlebar").unbind("click");   //应先解绑
        $(this).closest('.ui-jqgrid-view').find("div.ui-jqgrid-titlebar").click(function(){
    		
        	//alert("显示或隐藏");
        	
        	//【结论】this指向jQGrid表格标题栏（div元素）；
        	//alert($(this));
        	//alert(this);
        	//alert(this.toString());      //有效
        	//alert(this.InnerHtml);       //显示"undefined"
        	//alert(this.class);           //显示"undefined"
        	//alert(this.className);       //显示"ui-jqgrid-titlebar ui-jqgrid-caption":this指向jQGrid表格标题栏；

        	$(this).closest('.ui-jqgrid-view').find("div.ui-jqgrid-hdiv").toggle();
        	$(this).closest('.ui-jqgrid-view').find("div.ui-jqgrid-bdiv").toggle();
        	
        	//$(".jqGrid_wrapper #pager_list_2").toggle();  //有效
        	//下方无效;因为this指向jQGrid表格标题栏（div元素）；
        	//$(this).closest('.ui-jqgrid-pager').find("div.ui-pager-control").toggle();   //无效
        	//$(this).find('.ui-jqgrid-pager').find("div.ui-pager-control").toggle();   //无效
        	
        	//alert(($(this).parent())[0]);
        	//alert(($(this).parent())[0].className);
        	//$(this).parent().closest('.ui-jqgrid-pager').find("div.ui-pager-control").toggle();   //无效
        	//$(this).parent().parent().find('.ui-jqgrid-pager').find("div.ui-pager-control").toggle();   //有效
        	$(this).parent().parent().find('.ui-jqgrid-pager').toggle();   //有效

    		
        	//$(".jqGrid_wrapper 。ui-jqgrid-titlebar").hide()
        });
    }


	/**
	 * Author: yudengdeng
	 * DateTime: 2016年11月02日
	 * function: 采用Ajax请求，将jQGrid表格的指定列翻译为数据库中有意义列内容；
	 * @param gridJQueryObject jqGrid表格包装集对象；
	 * @param xtype            请求类型，post或get,默认post
	 * @param xurl             请求url
	 * @param xpostdata        请求数据
	 * @param colname          jQGrid表格的指定列，待翻译列
	 * @param mapname          请求响应数据，后台MAP对象名称
	 * @returns data           返回后台响应数据data
	 */
	function xsetColProp(gridJQueryObject,colname,map)
	{
		var res = map;
    	gridJQueryObject.jqGrid('setColProp',colname,{editoptions:{value:map}});                            
		return res;
	}
	function xsetColPropEx(gridJQueryObject,xurl,colname,mapname,mapEx){
		//alert("xsetColPropEx");
		
		var xpostdata = null;
		var xtype = 'post';
		return xsetColProp4(gridJQueryObject,xtype,xurl,xpostdata,colname,mapname,mapEx);
	}
	function xsetColProp1(gridJQueryObject,xurl,colname,mapname){
		///alert("xsetColProp1");
		
		var xpostdata = null;
		return xsetColProp2(gridJQueryObject,xurl,xpostdata,colname,mapname);
	}
	
	function xsetColProp2(gridJQueryObject,xurl,xpostdata,colname,mapname){
		//alert("xsetColProp2");
		
		var xtype = 'post';
		return xsetColProp3(gridJQueryObject,xtype,xurl,xpostdata,colname,mapname);
	}
	
	function xsetColProp3(gridJQueryObject,xtype,xurl,xpostdata,colname,mapname)
	{
		var mapEx = {};
		return xsetColProp4(gridJQueryObject,xtype,xurl,xpostdata,colname,mapname,mapEx);
	}
	function xsetColProp4(gridJQueryObject,xtype,xurl,xpostdata,colname,mapname,mapEx)
	{
		var res = null;
		
		//alert("xsetColProp3");
		
		/*$.ajax({
            url: 'deliv/getAllCUItemNames',
            async: false,
            type: 'post',
            success: function(data){
				$("#table_list_2").jqGrid('setColProp','itemName',{editoptions:{value:data.allCUItemNameList}});                            
            }
        });*/
		
		$.ajax({
            type: xtype,
            url: xurl,
            data: xpostdata,
            dataType: "json",
            async: false,             //默认设置同步；
            success: function(data){
            	//alert("xsetColProp success!");
            	
            	res = data;
            	//gridJQueryObject.jqGrid('setColProp',colname,{editoptions:{value:data[mapname]}});         
            	//新增扩展数据支持
            	var map = data[mapname];
            	//alert(JSON.stringify(map));
    			if(null ==mapEx)
    				mapEx={};
            	$.extend(map, mapEx);
            	//alert(JSON.stringify(map));
            	gridJQueryObject.jqGrid('setColProp',colname,{editoptions:{value:map}});                            
            }
        });
		
		return res;
	}
	


	/**
	 * function: 根据查询条件，jQGrid表格重新加载数据；
	 * 
	 * gridJQueryObject：jqGrid表格包装集对象；
	 * 
	 * issearch：是否查询，boolean类型（非字符串）；
	 *  
	 * sdata：查询条件数据，json格式；会扩展到postdata中；
	 * 
	 * spage：加载页数，默认1；
	 * 
	 */

	function xreloadGrid1(gridJQueryObject,issearch)
	{
		var sdata = {};
		xreloadGrid3(gridJQueryObject,issearch,sdata,1);
	}

	function xreloadGrid2(gridJQueryObject,issearch,sdata)
	{
		xreloadGrid3(gridJQueryObject,issearch,sdata,1);
	}
	
	function xreloadGrid3(gridJQueryObject,issearch,sdata,spage)
	{
		/*
        var road_code=$('#road option:selected').val();
        var sdata = {      
            road_code: road_code,
            station_code: '-1'
        };    
        var postData = $("#gridTable").jqGrid("getGridParam", "postData");  
        $.extend(postData, sdata);                
        $.extend(postData, sdata);                
        $("#gridTable").jqGrid("setGridParam", {  
            search: true    // 将jqGrid的search选项设为true  
        }).trigger("reloadGrid", [{page:1}]);   // 重新载入Grid表格，以使上述设置生效  
        */
		
		//【方式一】扩展jQGrid表格的postData属性------------------------------------------------------------------
		gridJQueryObject.clearGridData();
		
		var postData = gridJQueryObject.jqGrid("getGridParam", "postData");  
        //$.extend(postData, sdata);                
        $.extend(postData, sdata);          
        
        //gridJQueryObject.jqGrid("setGridParam", {  
		//				            search: true    // 将jqGrid的search选项设为true  
		//				        })
		//	        	.trigger("reloadGrid", [{page:spage}]);   // 重新载入Grid表格，以使上述设置生效  
        
        //在调用时，search也通过sdata传递进来；
        //经测试传递无效，如以下两种sdata：
        //var sdata = {search: true,sMatboxId:rowdata.boxId};   //无法传递search
        //var sdata = {search:'true',sMatboxId:rowdata.boxId};  //无法传递search
        //gridJQueryObject.trigger("reloadGrid", [{page:spage}]);   // 重新载入Grid表格，以使上述设置生效  
        
        
        gridJQueryObject.jqGrid("setGridParam", {  
						            //search: true    // 将jqGrid的search选项设为true  
						            search: issearch    // 将jqGrid的search选项设为true  
						        })
			        	.trigger("reloadGrid", [{page:spage}]);   // 重新载入Grid表格，以使上述设置生效  
        
        
		//【方式二】直接覆盖jQGrid表格的postData属性------------------------------------------------------------------
        /*gridJQueryObject.setGridParam({  
         								search: true        // 将jqGrid的search选项设为true
							            datatype:'json',  
							            //url:myNewUrl,
							            //postData:{'keyword':encodeURI(encodeURI(keyword))}, //发送数据  
							            postData:sdata, //发送数据
							            //page:1
							            page:spage  
							         })
				        .trigger("reloadGrid"); //重新载入
        */
    } 