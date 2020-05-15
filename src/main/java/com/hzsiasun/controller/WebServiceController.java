package com.hzsiasun.controller;

import java.util.HashMap;
import java.util.Map;

import javax.xml.namespace.QName;

import org.apache.axis2.AxisFault;
import org.apache.axis2.addressing.EndpointReference;
import org.apache.axis2.client.Options;
import org.apache.axis2.rpc.client.RPCServiceClient;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.hzsiasun.util.ResultUtil;
@Controller
@RequestMapping(produces = "application/json;charset=UTF-8;")
public class WebServiceController {
	@RequestMapping("/showWebService")
	 /**
     * 访问服务
     *
     * @param url  wsdl地址
     * @param namespace     命名空间
     * @param method 方法名
     * @param params   参数 key1:value1,key2:value2
     * @return String
     * @throws Exception
     */
	@ResponseBody
	public String findByWebService(String url,String namespace,String method,String params) {
		ResultUtil resultUtil = new ResultUtil();
		/*String url="http://localhost:8080/TTMes/services/KanbanService?wsdl";
		String params=null;
		String namespace="http://base.ws.mes.hzsiasun.com";
		String method="aabb";*/
		Object[] objs = new Object[10];
		Object[] obj = getStringToArray(params);
		String response =null;
		// 访问axis2发布的ws接口
		try {
			RPCServiceClient client = new RPCServiceClient();
			Options options = client.getOptions();
			EndpointReference end = new EndpointReference(url);
			options.setTo(end);
			//必须按照参数顺序来传递
			Class<?>[] classes = new Class[] { String.class };
			// 命名空间 方法名
			// QName qname = new QName("http://base.ws.isl.hzsiasun.com",
			// "mAreaStateAlert");
			QName qname = new QName(namespace, method);
			objs=client.invokeBlocking(qname, obj, classes);
				 response = objs[0]+"";
			System.out.println(response);
		} catch (AxisFault e) {
			e.printStackTrace();
			return "接口调用返回结果失败";	
		}
		
		return response;	
	}
	
	public static Object[] getStringToArray(String str) {
		// 根据逗号截取字符串数组
		Object[] str1 = str.split(",");
		
		return str1;
	}
	
}
