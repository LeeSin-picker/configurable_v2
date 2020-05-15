package com.hzsiasun.controller;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.hzsiasun.model.ChartDataForm;
import com.hzsiasun.model.VbChart;
import com.hzsiasun.service.VbChartService;
import com.hzsiasun.util.HttpClient;
import com.hzsiasun.util.ResultUtil;

@Controller
@RequestMapping(produces = "application/json;charset=UTF-8;")
public class ShowKanbanController {
	@Autowired
	public VbChartService vbChartService;

	@RequestMapping(value="/findAllChart")
	@ResponseBody
	public String findAllChart() {
		ResultUtil resultUtil = new ResultUtil();
		List<ChartDataForm> cdfList = new ArrayList<ChartDataForm>();
		List<VbChart> chartlist = vbChartService.findAll();
		if (chartlist != null && chartlist.size() > 0) {
			for (VbChart vbChart : chartlist) {
				// 输入类型分类：,httpClient,innerUrl
				String dataType = vbChart.getVcDataType();
				// 图表分类：bar,line,pie,jqTable,notice
				String chartType = vbChart.getVcChartType();
				// 二者全为空
				if (("".equals(dataType) || null == dataType) && ("".equals(chartType) || null == chartType)) {
					// 无效的图表
				}
				// 走http接口，不能https
				else if ("httpClient".equals(dataType)) {
					ChartDataForm cdf = new ChartDataForm();
					cdf.setVbChart(vbChart);
					cdfList.add(cdf);
				}
				// 执行内嵌网页
				else if ("innerUrl".equals(dataType)) {
					ChartDataForm cdf = new ChartDataForm();
					cdf.setVbChart(vbChart);
					cdfList.add(cdf);
				} else if("webService".equals(dataType)){
					ChartDataForm cdf = new ChartDataForm();
					cdf.setVbChart(vbChart);
					cdfList.add(cdf);
				}
				
				else if("notice".equals(chartType)){
					ChartDataForm cdf = new ChartDataForm();
					cdf.setVbChart(vbChart);
					cdfList.add(cdf);
				}
				else if("imgImport".equals(dataType)){
					ChartDataForm cdf = new ChartDataForm();
					cdf.setVbChart(vbChart);
					cdfList.add(cdf);
				}
			}
		} else {
			resultUtil.setResult("ERROR");
			resultUtil.setMsg("暂时没有图，请先创建");
			return JSON.toJSONString(resultUtil);
		}
		resultUtil.setResult("SUCCESS");
		resultUtil.setMsg("成功");
		resultUtil.setData(cdfList);
		return JSON.toJSONString(resultUtil);
	}

	@RequestMapping(value ="/httpResult")
	@ResponseBody
	public String  httpResult( String url, String params)  {
		try {
			params = new String(params.getBytes("ISO8859-1"), "utf-8");
		} catch (UnsupportedEncodingException e1) {
			
			e1.printStackTrace();
		}
		ResultUtil resultUtil = new ResultUtil();
		HttpClient client = new HttpClient(url);
		client.setHttps(false);// 是否是https协议
		if ("".equals(params) || null == params) {
			client.setParameter(null);
		} else {
			Map<String, String> map = getStringToMap(params);
			client.setParameter(map);
		}
		try {
			client.get();
		} catch (IOException e) {
			e.printStackTrace();
			return "第三方接口格式有误";
		}
		try {
			Object result = client.getContent();
			if("".equals(result)||null==result) {
				return "接口调用异常";
			}
			return result+"";
		} catch (ParseException e) {
			e.printStackTrace();
			return "第三方接口格式有误";
		} catch (IOException e) {
			e.printStackTrace();
			return "第三方接口格式有误";
		}
		
	}

	public static Map<String, String> getStringToMap(String str) {
		// 根据逗号截取字符串数组
		String[] str1 = str.split(",");
		// 创建Map对象
		Map<String, String> map = new HashMap<>();
		// 循环加入map集合
		for (int i = 0; i < str1.length; i++) {
			// 根据":"截取字符串数组
			String[] str2 = str1[i].split(":");
			// str2[0]为KEY,str2[1]为值
			map.put(str2[0], str2[1]);
		}
		return map;
	}

	@RequestMapping("/addVbchart")
	@ResponseBody
	public void addVbChart(VbChart vbchart) {
		// 生成创建时间
		Date currentTime = new Date();
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String CreateTime = formatter.format(currentTime);
		vbchart.setVcCreateTime(CreateTime);
		boolean b = vbChartService.addVbChart(vbchart);
		
	}

	@RequestMapping("/delVbchart")
	@ResponseBody
	public String delVbChart( VbChart vbchart) {
		ResultUtil resultUtil = new ResultUtil();
		boolean b = vbChartService.delVbChart(vbchart);
		if(b) {
			resultUtil.setResult("SUCCESS");
			resultUtil.setMsg(b+"");
			return JSON.toJSONString(resultUtil);	
		}
		resultUtil.setResult("ERROR");
		resultUtil.setMsg("删除失败");
		return JSON.toJSONString(resultUtil);
	}

	@RequestMapping("/updateVbchart")
	@ResponseBody
	public void updateVbchart( VbChart vbchart) {
		// 生成当前时间
				Date currentTime = new Date();
				SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				String UpdateTime = formatter.format(currentTime);
				vbchart.setVcUpdateTime(UpdateTime);
		boolean b = vbChartService.updateVbChart(vbchart);
	
	}

}
