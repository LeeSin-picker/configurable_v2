//拷贝jqGrid表格，实现导出Excel
//titles:列标题，tableId:导出的表格id，startCol:开始列下标（去掉行号列和自增序号列）
    var idTmr;
    //导出
    var ExportTable= function (o) {
        try {
            if(o.startCol==undefined)
                o.startCol=0;
            var $curTb = null;
            $curTb = $("#" + o.tableId);
            var curTbl = $curTb[0];
            var Lenr = null; 
            var Lenc = null;
            var oXL = null;     
            var fname= null;  
            try { 
                Lenr = curTbl.rows.length; 
                if(Lenr<=1){
                   alert('没有记录！');
                   return;
                }
                Lenc = curTbl.rows(0).cells.length;
                oXL = new ActiveXObject("Excel.Application"); 
                var filename=o.caption;
                //获取用户输入的文件名，filefilter设置成双，每双显示为一种格式，其中逗号后的显示在括号中
                fname = oXL.Application.GetSaveAsFilename(filename, "Excel 工作簿,*.xlsx,Excel 97-2003 工作簿,*.xls");
            } catch (E2) { 
                    alert("请确认:\n 1.使用IE浏览器.\n 2.安装Microsoft Excel.\n 3.设置浏览器安全级别：\n  Internet 选项=>安全=>自定义级别 \"将ActiveX控件启用\""); 
                    return; 
              }
              
            //用户未点取消才导出
            if(fname!=false){
                var oWB = oXL.Workbooks.Add();
                var oSheet = oWB.ActiveSheet;
                
                //设置表头行（如高速检测数据）
                oSheet.Range(oSheet.Cells(1, 1), oSheet.Cells(1, Lenc-o.startCol)).MergeCells=true; 
                oSheet.Cells(1,1).value=o.caption;
                oSheet.Cells(1,1).HorizontalAlignment = 3;
                oSheet.Cells(1,1).Font.Size = 14;
                oSheet.Cells(1,1).Font.Bold = true;
                
                //设置报表日期及制表日期行
                var half=Math.round((Lenc-o.startCol)*0.85);
                oSheet.Range(oSheet.Cells(2, 1), oSheet.Cells(2,half)).MergeCells=true; 
                oSheet.Range(oSheet.Cells(2, half+1), oSheet.Cells(2,Lenc-o.startCol)).MergeCells=true; 
                if(o.reportTime){
                    oSheet.Cells(2,1).value='报表日期:'+o.reportTime;
                    oSheet.Cells(2,half+1).value='制表日期:'+getTimeString();
                }
                else                    
                    oSheet.Cells(2,1).value='制表日期:'+getTimeString();
                
                //设置标题行
                for(var k=o.startCol;k<Lenc;k++)
                    oSheet.Cells( 3, k -o.startCol + 1).value = o.titles[k];
                oSheet.Rows(3).HorizontalAlignment = 3;
                oSheet.Rows(3).Font.Bold = true;
                
                //防止第一列编号的长串数字显示为科学计数法
                oSheet.Range(oSheet.Cells(4, 1), oSheet.Cells(Lenr+2, 1)).NumberFormatLocal = "@ "; 
                
                //开始导出数据部分		
                var i=0;                		 
                var obj=new Object();
                obj.total=Lenr-1; 
                obj.cur=i;
                var child=window.showModelessDialog("../statistic/modal.jsp",obj,"dialogWidth=200px;dialogHeight=100px;status=no;scroll=no;help=no");
                
                for (i = 4; i < Lenr+3; i++){ 
                    obj.cur=i-3; 
                    child.document.write("正在导出第 <span id='cur'>"+obj.cur+"</span> / "+obj.total+" 行。。。");
                    child.document.close();
                    
                    for (var j = o.startCol; j < Lenc; j++) 
                        oSheet.Cells(i , j -o.startCol + 1).value = curTbl.rows(i-3).cells(j).innerText;   //赋值 
                }
                
	            //设置表尾
	            oSheet.Range(oSheet.Cells(i, 1), oSheet.Cells(i, half)).MergeCells=true; 
                oSheet.Range(oSheet.Cells(i, half+1), oSheet.Cells(i, Lenc-o.startCol)).MergeCells=true; 
	            oSheet.Cells(i,1).value='制表单位:';
                oSheet.Cells(i,half+1).value='制表人:';
                oSheet.Rows(i).Font.Size = 12;
                
                oSheet.Range(oSheet.Cells(3, 1), oSheet.Cells(i-1, Lenc-o.startCol)).Borders.Weight=2; 
                oSheet.Range(oSheet.Cells(4, 1), oSheet.Cells(i-1, Lenc-o.startCol)).HorizontalAlignment=4; 
                oSheet.Columns.AutoFit ;            
                //oXL.Visible = true;
                
                oWB.SaveAs(fname);      
                oWB.Close(savechanges=false);
                
                child.document.write("导出完成! ");  
                child.close();                       
            }               
        } catch(e) {
            alert("导出失败!");
            alert(e.message);
        } finally {
            oXL.Quit();
            oXL=null;
            child.close();
            idTmr=window.setInterval("Cleanup();",1); 
        }
    }
    //打印
    var PrintTable= function (o) {
        try {
            if(o.startCol==undefined)
                o.startCol=0;
            var $curTb = null;
            $curTb = $("#" + o.tableId);
            var curTbl = $curTb[0];
            var Lenr = null; 
            var Lenc = null;
            var oXL = null;     
            var fname= null;  
            try { 
                Lenr = curTbl.rows.length; 
                if(Lenr<=1){
                   alert('没有记录！');
                   return;
                }
                Lenc = curTbl.rows(0).cells.length;
                oXL = new ActiveXObject("Excel.Application"); 
            } catch (E2) { 
                    alert("请确认:\n 1.使用IE浏览器.\n 2.安装Microsoft Excel.\n 3.设置浏览器安全级别：\n  Internet 选项=>安全=>自定义级别 \"将ActiveX控件启用\""); 
                    return; 
              }
              
            var oWB = oXL.Workbooks.Add();
            var oSheet = oWB.ActiveSheet;
            
            //设置表头行（如高速检测数据）
            oSheet.Range(oSheet.Cells(1, 1), oSheet.Cells(1, Lenc-o.startCol)).MergeCells=true; 
            oSheet.Cells(1,1).value=o.caption;
            oSheet.Cells(1,1).HorizontalAlignment = 3;
            oSheet.Cells(1,1).Font.Size = 14;
            oSheet.Cells(1,1).Font.Bold = true;
            
            //设置报表日期及制表日期行
            var half=Math.round((Lenc-o.startCol)*0.85);
            oSheet.Range(oSheet.Cells(2, 1), oSheet.Cells(2,half)).MergeCells=true; 
            oSheet.Range(oSheet.Cells(2, half+1), oSheet.Cells(2,Lenc-o.startCol)).MergeCells=true; 
            oSheet.Cells(2,1).value='报表日期:'+o.reportTime;
            oSheet.Cells(2,half+1).value='制表日期:'+getTimeString();
            
            //设置标题行
            for(var k=o.startCol;k<Lenc;k++)
                oSheet.Cells( 3, k -o.startCol + 1).value = o.titles[k];
            oSheet.Rows(3).HorizontalAlignment = 3;
            oSheet.Rows(3).Font.Bold = true;
            
            //防止第一列编号的长串数字显示为科学计数法
            oSheet.Range(oSheet.Cells(4, 1), oSheet.Cells(Lenr+2, 1)).NumberFormatLocal = "@ "; 
            
            //开始导出数据部分      
            var i=0;     
            
            for (i = 4; i < Lenr+3; i++)
                for (var j = o.startCol; j < Lenc; j++) 
                    oSheet.Cells(i , j -o.startCol + 1).value = curTbl.rows(i-3).cells(j).innerText;   //赋值 
                        
            //设置表尾
            oSheet.Range(oSheet.Cells(i, 1), oSheet.Cells(i, half)).MergeCells=true; 
            oSheet.Range(oSheet.Cells(i, half+1), oSheet.Cells(i, Lenc-o.startCol)).MergeCells=true; 
            oSheet.Cells(i,1).value='制表单位:';
            oSheet.Cells(i,half+1).value='制表人:';
            oSheet.Rows(i).Font.Size = 12;
            
            oSheet.Range(oSheet.Cells(3, 1), oSheet.Cells(i-1, Lenc-o.startCol)).Borders.Weight=2; 
            oSheet.Range(oSheet.Cells(4, 1), oSheet.Cells(i-1, Lenc-o.startCol)).HorizontalAlignment=4; 
            oSheet.Columns.AutoFit ;            
            
            oXL.Visible = true;    //要预览必须设置visible            
            with(oSheet.PageSetup){ Orientation  = 2; CenterHorizontally=true;  }  
            oSheet.PrintOut(1,1,1,true);  //from,to,copies,preview
            oWB.Close(savechanges=false);
        } catch(e) {
            alert("打印失败!\n错误信息："+e.message);
        } finally {
            oXL.Quit();
            oXL=null;
            idTmr=window.setInterval("Cleanup();",1); 
        }
    }
    
    //获取制表时间yyyymmdd
    function getTimeString() {
        var time=new Date(); 
        var timeString=time.getFullYear()+'年';
        var mm=time.getMonth()+1;  
        timeString+=( mm < 10 ? '0'+mm:mm)+'月' ;
        var dd=time.getDate();
        timeString+=( dd < 10 ? '0'+dd:dd)+'日' ;
        return timeString;
    }
    
    function Cleanup() {
        window.clearInterval(idTmr);
        CollectGarbage();
    }

