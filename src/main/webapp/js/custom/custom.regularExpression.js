/**
 * DATE:     2016年04月25日
 * FUNCTION: 正则表达式检查,数据有效性检查,数据格式检查
 * AUTHOR:   Yudengdeng
 */

	var rExpT_C10 = "number-sequences";    //匹配数字序列
	var rExpT_C11 = "real-number";    	   //匹配实数
	var rExpT_C12 = "integer";             //匹配整数（整数 ）
	var rExpT_C13 = "n-n-integer";         //匹配非负整数（正整数 + 0）
	var rExpT_C14 = "n-n-float";           //匹配非负浮点数（正浮点数 + 0） 
	
	var rExpT_C50 = "age";                 //匹配年龄（0-120）
	var rExpT_C51 = "phone";               //匹配电话号码
	
	var rExpT_C60 = "ip";                  //匹配IP地址
	var rExpT_C61 = "port";                //匹配端口号（0-65535）

	
	var rExpT_C9 = "";
	var rExpT_C10 = "";

	/**
	 * DATE:     2016年04月25日
	 * FUNCTION: 通用数据检查：正则表达式检查,数据有效性检查,数据格式检查；
	 * AUTHOR:   Yudengdeng
	 */
	function regularExpressionCheck(type,value){
		//alert("正则表达式检查:"+type+" - "+value);
		
		switch(type){
			case "number-sequences":{     //匹配数字序列
	    		var validNumber = /^[0-9]*$/;  
   				if (!value.match(validNumber)){
					return [false,"Please enter legal numerical sequences!"];
				}else{
				   return [true,""];
			    }
	    	}
			case "real-number":{     //匹配实数（实数）
	    		var validInergerNumber = /^[-+]?\d+(\.\d+)?$/;  
   				if (!value.match(validInergerNumber)){
					return [false,"Please enter legal real number!"];
				}else{
				   return [true,""];
			    }
	    	}
			case "integer":{     //匹配整数（整数 ）
				var validInergerNumber = /^-?[1-9]d*|0$/;  
				if (!value.match(validInergerNumber)){
					return [false,"Please enter legal inerger number!"];
				}else{
					return [true,""];
				}
			}
			case "n-n-integer":{     //匹配非负整数（正整数 + 0）
	    		var validNonNegativeInergerNumber = /^[1-9]d*|0$/;  
   				if (!value.match(validNonNegativeInergerNumber)){
					return [false,"Please enter legal non-negative inerger number!"];
				}else{
				   return [true,""];
			    }
	    	}
	    	case "n-n-float":{      //匹配非负浮点数（正浮点数 + 0） 
	    		var validNonNegativeFloatNumber = /^[1-9]d*.d*|0.d*[1-9]d*|0?.0+|0$/;
   				if (!value.match(validPhoneNumber)){
					return [false,"Please enter legal non-negative float number!"];
				}else{
				   return [true,""];
			    }
	    	}
	    	case "phone":{      //匹配电话号码        //经过调用验证
	    		var validPhoneNumber = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
   				if (!value.match(validPhoneNumber)){
					return [false,"Please enter legal phone number!"];
				}else{
				   return [true,""];
			    }
	    	}
	    	case "ip":{     //匹配IP地址
	    		var validIp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
   				if (!value.match(validIp)){
					return [false,"Please enter legal IP address!"];
				}else{
				   return [true,""];
			    }
	    	}
	    	case "port":{    //匹配端口号
	    		var validNonNegativeInergerNumber = /^[1-9]d*|0$/;    //匹配非负整数（正整数 + 0）
    		    if(!value.match(validNonNegativeInergerNumber) || value<0 || value>65535){
				   return [false,"Please enter legal port number between 0 and 65535 !"];
				}else{
				   return [true,""];
			    }
	    	}
	    	case "age":{    //匹配年龄（0-120）
    		    if(value<0||value>120) 
				   return [false,"Please enter value between 0 and 120"];
				else{
				   return [true,""];
			    }
	    	}
	    	default :{
	    		return [true,""];
	    	}
    	}
	}
	
	
	
	
	//***************************************************************************************************
	//电话号码验证
	var  recO_Contact_Phone= ["Please enter legal phone number! ^_^ !",
	                         "^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$"]; //【正确】注意正则表达式前后无“/”
//	var  recO_Contact_Phone= ["Please enter legal phone number! ^_^ !",
//	                          /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/];//【正确】注意正则表达式前后有“/”
	//匹配实数（实数）
	var  rec1_Number_RealN= ["Please enter legal real number! ^_^ !",
	                    //   "^[-+]?\d+(\.\d+)?$"];         //【错误】注意正则表达式前后无“/”
							 "^[-+]?\[0-9]+(\.\[0-9]+)?$"]; //【正确】注意正则表达式前后无“/”
						//	 /^[-+]?\d+(\.\d+)?$/];         //【正确】注意正则表达式前后无“/”
	
	
	/**
	 * DATE:     2016年04月25日
	 * FUNCTION: 通用数据检查：正则表达式检查,数据有效性检查,数据格式检查；
	 * AUTHOR:   Yudengdeng
	 */
	function regularExpressionCheckOptions(recOption,value){    //valid!
		//alert(recOption[0] +" - "+recOption[1]);
		if (!value.match(recOption[1])){
			return [false,recOption[0]];
		}else{
		   return [true,""];
	    }
	}
	
	function regularExpressionCheckOptionsExtra(recOption,value,preInfo){    //valid!
		//alert(recOption[0] +" - "+value +" - "+preInfo );
		
		if (!value.match(recOption[1])){
			return [false,preInfo+recOption[0]];
		}else{
		   return [true,""];
	    }
	}