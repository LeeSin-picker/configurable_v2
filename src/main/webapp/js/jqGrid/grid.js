	//当前日期
	var curDate=new Date();
	var yspan=10;
	var myDate;
	
	//修改过：
	//Date中的月份是0-11
//	var myDate=curDate.getFullYear()+'-'+(curDate.getMonth()+1)+'-'+curDate.getDate();
	//Date中的月份是0-11
	if (curDate.getMonth() < 9){
		if (curDate.getDate() < 9)
			myDate=curDate.getFullYear()+'-0'+(curDate.getMonth()+1)+'-0'+curDate.getDate();
		else
			myDate=curDate.getFullYear()+'-0'+(curDate.getMonth()+1)+'-'+curDate.getDate();
	}
	else {
		if (curDate.getDate() < 9)
			myDate=curDate.getFullYear()+'-'+(curDate.getMonth()+1)+'-0'+curDate.getDate();
		else
			myDate=curDate.getFullYear()+'-'+(curDate.getMonth()+1)+'-'+curDate.getDate();
	}
//	var myDate="2323";
//	alert(myDate); 
 
	//为日期类添加方法
	Date.prototype.addDays = Date.prototype.addDays || function(days){
        this.setDate(this.getDate() + days);
        return this;
    } 
    
    //将日期格式化为yyyymmdd字符串
	function format(date){
	    var s1=date.split('-');
	    var s2=s1[0];
	    s2+=s1[1].length==1 ? '0'+s1[1] : s1[1];
	    s2+=s1[2].length==1 ? '0'+s1[2] : s1[2];
	    return s2;
	}    
           
	//选中前先清除之前的选中，即保持表格单选
	function singleSelect(rowid){
	    //若点击的不是当前选中行，则执行清除操作
	    if($("#gridTable").jqGrid('getGridParam','selrow')!=rowid){
	        $("#gridTable").jqGrid('resetSelection');
	    }
	    return true;
	} 
	
	function showError(xhr,status,error){   
	     alert(" 加载失败，请检查网络状态! " );
	}
	    
	function vehnames(){            
		//从session中取出车型-名称对照字符串，修改Veh_Type列的editoptions                                                      
		var vehNames='<%=session.getAttribute("vehNames")%>';  
		if(vehNames!='null')
		    $("#gridTable").jqGrid('setColProp','Veh_Type',{editoptions:{value: vehNames}});   
		else{
		    $.ajax({
		        url: 'vehsearch/getVehNames',
		        async: false,
		        type: 'post',
		        success: function(data){
		            $("#gridTable").jqGrid('setColProp','Veh_Type',{editoptions:{value:data.vehNames}});                          
		        }
		    });
		}
	}
	                 
	function hsComplete(){
	     var ids = $('#gridTable').getDataIDs();        
	     for ( var i=0; i<ids.length;i++ ){              
	         var value = $('#gridTable').getCell( ids[i],'OverLoad_Sign' );
	         if ( value == 1 )            
	             $('#gridTable').setRowData ( ids[i],{},'highlight');
	         else{
	            value=$('#gridTable').getCell( ids[i],'Over_Load' );
	            if(value > 0)
	                $('#gridTable').setRowData ( ids[i],{},'highlight');
	         }
	     }
	} 
 


