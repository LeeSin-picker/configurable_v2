/**
 * Author: yudengdeng
 * DateTime: 2016年11月02日
 * FileName: custom.control.js
 * Function: 常用控件相关js功能函数
 * Referred: javascript不支持重载
 */


	/**
	 * Author: yudengdeng
	 * DateTime: 2016年11月07日
	 * function: 发起Ajax请求，返回后台响应数据data。
	 * @param xtype                 请求类型，post或get,默认post
	 * @param xurl                  请求url
	 * @param xpostdata             请求数据
	 * @param xasync                设置同步(false)、异步(true)
	 * @returns data                返回后台响应数据data
	 */
	function xajaxdata1(xurl)
	{
		var xpostdata = null;
		return xajaxdata2(xurl,xpostdata);
	}
	function xajaxdata2(xurl,xpostdata)
	{
		var xtype = 'post';
		return xajaxdata3(xtype,xurl,xpostdata);
	}
	function xajaxdata3(xtype,xurl,xpostdata)
	{
		var xasync = false;          //默认设置同步
		return xajaxdata4(xtype,xurl,xpostdata,xasync);
	}
	function xajaxdata4(xtype,xurl,xpostdata,xasync)
	{
		var res = null;
		
		$.ajax({
            type: xtype,
            url: xurl,
            data: xpostdata,
            dataType: "json",
            //async: false,                //设置同步
            async: xasync,                 //设置同步(false)、异步(true)
            success: function(data){
            	res = data;
            }
        });
		
		return res;      //若为异步请求，即xasync为true,则此处返回值恒为NULL.
	}


	
	
	/**
	 * Author: yudengdeng
	 * DateTime: 2016年11月02日
	 * function: 采用Ajax请求，将编辑表单中的指定输入控件设置为后台返回字符串值（通过调用val()方法）。
	 * @param controlJQueryObject   输入控件包装集对象；
	 * @param xtype                 请求类型，post或get,默认post
	 * @param xurl                  请求url
	 * @param xpostdata             请求数据
 	 * @param xasync                设置同步(false)、异步(true)
	 * @param stringparamname       请求响应数据，后台String类型变量名称
	 * @returns data                返回后台响应数据data
	 */
	function xsetControlValue1(controlJQueryObject,xurl,stringparamname){
		//alert("xsetControlValue1");
		
		var xpostdata = null;
		return xsetControlValue2(controlJQueryObject,xurl,xpostdata,stringparamname);
	}
	
	function xsetControlValue2(controlJQueryObject,xurl,xpostdata,stringparamname){
		//alert("xsetControlValue2");
		
		var xtype = 'post';
		return xsetControlValue3(controlJQueryObject,xtype,xurl,xpostdata,stringparamname);
	}
	
	function xsetControlValue3(controlJQueryObject,xtype,xurl,xpostdata,stringparamname)
	{
		var xasync = false;          //默认设置同步
		return xsetControlValue4(controlJQueryObject,xtype,xurl,xpostdata,xasync,stringparamname);
	}
	
	function xsetControlValue4(controlJQueryObject,xtype,xurl,xpostdata,xasync,stringparamname)
	{
		var res = null;
		
		//alert("xsetControlValue3");
		
		/*
		$.ajax({
            url: 'org/getCompanyNames',
            async: false,
            type: 'post',
            success: function(data){
            	//alert(data.com);
            	//alert(eval('('+data.com+')'));
            	//alert(JSON.stringify(data.com));
		   		$(formid[0].userCompany).val(data.com);       //有效！！！                            
		   		//$(formid[0].userCompany).val(data.com.comName);       //无效，无法直接访问JAVA BEAN！！！                            
            }
        });*/
		
		$.ajax({
            type: xtype,
            url: xurl,
            data: xpostdata,
            dataType: "json",
            //async: false,               //设置同步
            async: xasync,               //设置同步(false)、异步(true)
            success: function(data){
            	res = data;
            	
            	//alert("xsetControlValue success!");
            	//$(formid[0].userCompany).val(data.com);       //有效！！！                            
		   		//$(formid[0].userCompany).val(data.com.comName);       //无效，无法直接访问JAVA BEAN！！！       
            	controlJQueryObject.val(data[stringparamname]);
            }
        });
		
		return res;
	}
	
	



	/**
	 * Author: yudengdeng
	 * DateTime: 2016年11月02日
	 * function: 根据查询条件发送post请求，并将默认数据和返回数据加载到下拉列表select控件。；
	 * @param selectJQueryObject   select包装集对象；
	 * @param url                post请求url
	 * @param postdata           post请求回传数据
  	 * @param xasync             设置同步(false)、异步(true)
	 * @param mapname            post请求响应数据，后台MAP对象名称
	 * @param defaultdata        默认数据，会先加载select列表项中，再加载回传数据；{'1':'1','2':'-3'}
	 * @returns data             返回后台响应数据data
	 */
	function xreloadSelect1(selectJQueryObject,url,mapname)
	{
		var postdata={};
		return xreloadSelect2(selectJQueryObject,url,postdata,mapname);
	}
	
	function xreloadSelect2(selectJQueryObject,url,postdata,mapname)
	{
		var defaultdata={};
		return xreloadSelect3(selectJQueryObject,url,postdata,mapname,defaultdata);
	}
	
	function xreloadSelect3(selectJQueryObject,url,postdata,mapname,defaultdata)
	{
		var xasync = true;          //默认设置异步
		return xreloadSelect4(selectJQueryObject,url,postdata,xasync,mapname,defaultdata);
	}
	
	function xreloadSelect4(selectJQueryObject,url,postdata,xasync,mapname,defaultdata)
	{
		//alert(url);
		//alert("xreloadSelect4");
		//alert(selectJQueryObject.attr("id"));
		
		var res = null;
		//alert(!xasync);
		
		//post默认为异步请求（async为true），因为ajax默认为异步请求（async为true）；下方代码修改默认值
		$.ajaxSetup({
			//async : false     //设置同步
			async : xasync      //设置同步(false)、异步(true)
			});
		
		//post默认为异步请求
		$.post(url,postdata,function(data){
			res = data;
			//alert(JSON.stringify(data));
			
			selectJQueryObject.empty();
			
            //$('#station').append("<option value='-3'>全部</option>");
            
            //加载默认数据
			if(null ==defaultdata)
				defaultdata={};
            $.each(defaultdata, function(key, val) {
            	selectJQueryObject.append("<option value='"+key+"'>"+val+"</option>");
            });
            //alert("2");
            
            //js中通过函数名字符串调用函数,名称为funcname的方法要先定义好；
            //var funcBB = eval(funcname);
            //new funcBB(i,j,k);
            
            //alert(JSON.stringify(data[mapname]));
            
            //$.each(data.stationList, function(key, val) {
            $.each(data[mapname], function(key, val) { 
            	selectJQueryObject.append("<option value='"+key+"'>"+val+"</option>");
            });
        });
		
		$.ajaxSetup({
			async : true          //恢复默认设置，ajax默认为异步请求（async为true）。
			//async : (!xasync)   //恢复原设置；
			});
		
		return res;
	}
	
	/**
	 * Author: yudengdeng
	 * DateTime: 2016年11月10日
	 * function: 根据默认数据和列表数据，重置下拉列表select控件。
	 * @param selectJQueryObject   select包装集对象；
	 * @param listMap            一般后台回传的map数据
	 * @param defaultdata        默认数据，会先加载select列表项中，再加载回传数据；{'1':'1','2':'-3'}
	 * @returns
	 */
	function xresetSelect1(selectJQueryObject,listMap)
	{
		var defaultdata = {};
		xresetSelect2(selectJQueryObject,listMap,defaultdata);
	}
	function xresetSelect2(selectJQueryObject,listMap,defaultdata)
	{
		//alert("xresetSelect2");
		//alert(selectJQueryObject.attr("id"));
		
		selectJQueryObject.empty();
		
        //$('#station').append("<option value='-3'>全部</option>");
        
        //加载默认数据
		if(null ==defaultdata)
			defaultdata={};
        $.each(defaultdata, function(key, val) {
        	selectJQueryObject.append("<option value='"+key+"'>"+val+"</option>");
        });
        
        //js中通过函数名字符串调用函数,名称为funcname的方法要先定义好；
        //var funcBB = eval(funcname);
        //new funcBB(i,j,k);
        
        //$.each(data.stationList, function(key, val) {
        $.each(listMap, function(key, val) { 
        	//alert(key+":"+val);
        	selectJQueryObject.append("<option value='"+key+"'>"+val+"</option>");
        });
	}
	
	
	/**
	 * Author: yudengdeng
	 * DateTime: 2016年11月07日
	 * function: 表单序列化，返回表单JSON数据对象。
	 * @param formJQueryObject   form包装集对象;
	 * @returns  data            返回表单JSON数据对象;
	 */
	function xformJsonSerialize(formJQueryObject)
	{
		//定义扩展数据
		//var sdata = {oper:"add-dm"};     //类型：新增任务
		
		//序列化为查询字符串；
		//var xpostdata = $("#delivm-form").serialize();
		var xpostdata = formJQueryObject.serialize();
		
		//表单序列化查询字符串转换为json字符串；
		//xpostdata=xpostdata.replace("=",":'");  //只替换一个
		//xpostdata=xpostdata.replace("&","',");
		xpostdata=xpostdata.replace(/=/g,"':'");  //使用正则表达式，全部替换
		xpostdata=xpostdata.replace(/&/g,"','");
		xpostdata="{'"+xpostdata+"'}";
		
		//json字符串转换为JSON对象
		//alert(xpostdata);
		xpostdata=eval('('+xpostdata+')');    //转换为json对象  //转换成功
		//xpostdata=JSON.parse(xpostdata);   //转换为json对象  //转换不成功
		
		//扩展JSON对象
		//alert(xpostdata);
		//alert(JSON.stringify(xpostdata));
		//$.extend(xpostdata, sdata);        //$.extend()要求参数均为JSON对象；
		
		return xpostdata;
	}
	
	/**
	 * Author: yudengdeng
	 * DateTime: 2016年12月09日
	 * function: 对js从Action类中获取的MAP字符串进行处理，返回JSON数据对象。
	 * @param    strMap   js从Action类中获取的MAP字符串;
	 * @returns  data            返回JSON数据对象;
	 */
	function strMap2JsonMap(strMap)
	{
		//alert("对js从Action类中获取的MAP字符串进行处理，返回JSON数据对象");
		//alert(strMap);
		//定义扩展数据
		//var sdata = {oper:"add-dm"};     //类型：新增任务
		
		//序列化为查询字符串；
		//var xpostdata = $("#delivm-form").serialize();
		//var xpostdata = formJQueryObject.serialize();
		var xpostdata = strMap;
		
		//alert(xpostdata);
		
		if(null==xpostdata || xpostdata == ""){
			return null;
		}
		
		//表单序列化查询字符串转换为json字符串；
		//xpostdata=xpostdata.replace("=",":'");  //只替换一个
		//xpostdata=xpostdata.replace("&","',");
		
		xpostdata=xpostdata.replace(/=/g,'":"');  //使用正则表达式，全部替换
		//xpostdata=xpostdata.replace(/&/g,'","');
		xpostdata=xpostdata.replace(/,/g,'","');
		xpostdata=xpostdata.replace(/ /g,'');        //去除空格
		//xpostdata="{'"+xpostdata+"'}";
		xpostdata=xpostdata.replace(/{/g,'{"');  //使用正则表达式，全部替换
		xpostdata=xpostdata.replace(/}/g,'"}');  //使用正则表达式，全部替换
		
		//20161215:将取值"null"替换为"";
		xpostdata=xpostdata.replace(/null/g,'');  //使用正则表达式，全部替换
		
		//json字符串转换为JSON对象
		//alert(xpostdata);
		xpostdata=eval('('+xpostdata+')');    //转换为json对象  //转换成功
		//xpostdata=JSON.parse(xpostdata);   //转换为json对象  //转换不成功
		
		//扩展JSON对象
		//alert(xpostdata);
		//alert(JSON.stringify(xpostdata));
		//$.extend(xpostdata, sdata);        //$.extend()要求参数均为JSON对象；
		
		return xpostdata;
	}
	
	function strArrayMap2JsonArrayMap(strMap)
	{
		//alert("json数组字符串转换为JSON数组");
		//alert(strMap);
		//定义扩展数据
		//var sdata = {oper:"add-dm"};     //类型：新增任务
		
		//序列化为查询字符串；
		//var xpostdata = $("#delivm-form").serialize();
		//var xpostdata = formJQueryObject.serialize();
		var xpostdata = strMap;
		
		//alert(xpostdata);
		
		if(null==xpostdata || xpostdata == ""){
			return null;
		}
		
		//表单序列化查询字符串转换为json字符串；
		//xpostdata=xpostdata.replace("=",":'");  //只替换一个
		//xpostdata=xpostdata.replace("&","',");
		
		xpostdata=xpostdata.replace(/=/g,'":"');  //使用正则表达式，全部替换
		//xpostdata=xpostdata.replace(/&/g,'","');
		xpostdata=xpostdata.replace(/,/g,'","');
		xpostdata=xpostdata.replace(/ /g,'');        //去除空格
		//xpostdata="{'"+xpostdata+"'}";
		xpostdata=xpostdata.replace(/{/g,'{"');  //使用正则表达式，全部替换
		xpostdata=xpostdata.replace(/}/g,'"}');  //使用正则表达式，全部替换
		
		//新增
		xpostdata=xpostdata.replace(/}","{/g,'},{');  //使用正则表达式，全部替换
		
		//20161215:将取值"null"替换为"";
		xpostdata=xpostdata.replace(/null/g,'');  //使用正则表达式，全部替换
		
		//json字符串转换为JSON对象
		//alert("json数组字符串转换为JSON数组");
		//alert(xpostdata);
		//xpostdata=eval('('+xpostdata+')');    //json对象字符串，转换为json对象  //转换成功
		//xpostdata=eval("r=" + xpostdata);    //json数组字符串，转换为json对象  //转换成功
		xpostdata=eval(xpostdata);    //json数组字符串，转换为json对象  //转换成功
		//xpostdata=JSON.parse(xpostdata);   //转换为json对象  //转换不成功
		
		//扩展JSON对象
		//alert(xpostdata);
		//alert(JSON.stringify(xpostdata));
		//$.extend(xpostdata, sdata);        //$.extend()要求参数均为JSON对象；
		
		return xpostdata;
	}