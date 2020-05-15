package com.hzsiasun.model;

import java.io.Serializable;
import java.util.Date;

public class VbChart implements Serializable{

	private Integer vcID;//主键
	private String vcCode;//图标编号
	private String vcPageCode;//图表所属的页面编号
	private String vcChartType;//图表类型(柱状图，折线图，扇形图)等
	private String vcWhType;//百分比或px
	private String vcWidth;//宽度(%)
	private String vcHeight;//高度(%)
	private String vcXaxis;//X轴
	private String vcYaxis;//Y轴
	private String vcData;//图表等填充的内容
	private String vcDataType;//输入类型http或webservice
	private String vcCreateTime;//创建时间
	private String vcUpdateTime;//修改时间
	private String vcTimer;//定时器

	private String vcCreater;//创建人
	private String vcExParam1;//颜色
	private String vcExParam2;//基准线
	private String vcExParam3;//表格列宽比
	private String vcExParam4;//表格表头及index
	private String vcExParam5;
	private String vcTitle;//图表标题
	private String vcMinX;//xlist名称
	private String vcMaxX;//ylist名称
	private String vcShowType;
	private String vcNamespace;//命名空间
	private String vcMethod;//方法
	private String vcParams;//参数
	private String vcPercent;//y轴单位是否加百分号
	private String vcLineTitle;//折线标题
	private String vcXUnit;//x轴单位
	private String vcYUnit;//y轴单位
	
	private String vcExParam6;
	private String vcExParam7;
	private String vcExParam8;
	private String vcExParam9;
	private String vcExParam10;
	
	
	public Integer getVcID() {
		return vcID;
	}
	public void setVcID(Integer vcID) {
		this.vcID = vcID;
	}
	public String getVcCode() {
		return vcCode;
	}
	public void setVcCode(String vcCode) {
		this.vcCode = vcCode;
	}
	public String getVcPageCode() {
		return vcPageCode;
	}
	public void setVcPageCode(String vcPageCode) {
		this.vcPageCode = vcPageCode;
	}
	public String getVcChartType() {
		return vcChartType;
	}
	public void setVcChartType(String vcChartType) {
		this.vcChartType = vcChartType;
	}
	public String getVcWhType() {
		return vcWhType;
	}
	public void setVcWhType(String vcWhType) {
		this.vcWhType = vcWhType;
	}
	public String getVcWidth() {
		return vcWidth;
	}
	public void setVcWidth(String vcWidth) {
		this.vcWidth = vcWidth;
	}
	public String getVcHeight() {
		return vcHeight;
	}
	public void setVcHeight(String vcHeight) {
		this.vcHeight = vcHeight;
	}
	public String getVcXaxis() {
		return vcXaxis;
	}
	public void setVcXaxis(String vcXaxis) {
		this.vcXaxis = vcXaxis;
	}
	public String getVcYaxis() {
		return vcYaxis;
	}
	public void setVcYaxis(String vcYaxis) {
		this.vcYaxis = vcYaxis;
	}
	public String getVcData() {
		return vcData;
	}
	public void setVcData(String vcData) {
		this.vcData = vcData;
	}
	public String getVcDataType() {
		return vcDataType;
	}
	public void setVcDataType(String vcDataType) {
		this.vcDataType = vcDataType;
	}
	
	public String getVcTimer() {
		return vcTimer;
	}
	public void setVcTimer(String vcTimer) {
		this.vcTimer = vcTimer;
	}
	public String getVcCreater() {
		return vcCreater;
	}
	public void setVcCreater(String vcCreater) {
		this.vcCreater = vcCreater;
	}
	public String getVcExParam1() {
		return vcExParam1;
	}
	public void setVcExParam1(String vcExParam1) {
		this.vcExParam1 = vcExParam1;
	}
	public String getVcExParam2() {
		return vcExParam2;
	}
	public void setVcExParam2(String vcExParam2) {
		this.vcExParam2 = vcExParam2;
	}
	public String getVcExParam3() {
		return vcExParam3;
	}
	public void setVcExParam3(String vcExParam3) {
		this.vcExParam3 = vcExParam3;
	}
	public String getVcExParam4() {
		return vcExParam4;
	}
	public void setVcExParam4(String vcExParam4) {
		this.vcExParam4 = vcExParam4;
	}
	public String getVcExParam5() {
		return vcExParam5;
	}
	public void setVcExParam5(String vcExParam5) {
		this.vcExParam5 = vcExParam5;
	}
	public String getVcTitle() {
		return vcTitle;
	}
	public void setVcTitle(String vcTitle) {
		this.vcTitle = vcTitle;
	}
	public String getVcMinX() {
		return vcMinX;
	}
	public void setVcMinX(String vcMinX) {
		this.vcMinX = vcMinX;
	}
	public String getVcMaxX() {
		return vcMaxX;
	}
	public void setVcMaxX(String vcMaxX) {
		this.vcMaxX = vcMaxX;
	}
	public String getVcShowType() {
		return vcShowType;
	}
	public void setVcShowType(String vcShowType) {
		this.vcShowType = vcShowType;
	}
	public String getVcNamespace() {
		return vcNamespace;
	}
	public void setVcNamespace(String vcNamespace) {
		this.vcNamespace = vcNamespace;
	}
	public String getVcMethod() {
		return vcMethod;
	}
	public void setVcMethod(String vcMethod) {
		this.vcMethod = vcMethod;
	}
	public String getVcParams() {
		return vcParams;
	}
	public void setVcParams(String vcParams) {
		this.vcParams = vcParams;
	}
	public String getVcCreateTime() {
		return vcCreateTime;
	}
	public void setVcCreateTime(String vcCreateTime) {
		this.vcCreateTime = vcCreateTime;
	}
	public String getVcUpdateTime() {
		return vcUpdateTime;
	}
	public void setVcUpdateTime(String vcUpdateTime) {
		this.vcUpdateTime = vcUpdateTime;
	}
	public String getVcPercent() {
		return vcPercent;
	}
	public void setVcPercent(String vcPercent) {
		this.vcPercent = vcPercent;
	}
	public String getVcLineTitle() {
		return vcLineTitle;
	}
	public void setVcLineTitle(String vcLineTitle) {
		this.vcLineTitle = vcLineTitle;
	}
	public String getVcXUnit() {
		return vcXUnit;
	}
	public void setVcXUnit(String vcXUnit) {
		this.vcXUnit = vcXUnit;
	}
	public String getVcYUnit() {
		return vcYUnit;
	}
	public void setVcYUnit(String vcYUnit) {
		this.vcYUnit = vcYUnit;
	}
	public String getVcExParam6() {
		return vcExParam6;
	}
	public void setVcExParam6(String vcExParam6) {
		this.vcExParam6 = vcExParam6;
	}
	public String getVcExParam7() {
		return vcExParam7;
	}
	public void setVcExParam7(String vcExParam7) {
		this.vcExParam7 = vcExParam7;
	}
	public String getVcExParam8() {
		return vcExParam8;
	}
	public void setVcExParam8(String vcExParam8) {
		this.vcExParam8 = vcExParam8;
	}
	public String getVcExParam9() {
		return vcExParam9;
	}
	public void setVcExParam9(String vcExParam9) {
		this.vcExParam9 = vcExParam9;
	}
	public String getVcExParam10() {
		return vcExParam10;
	}
	public void setVcExParam10(String vcExParam10) {
		this.vcExParam10 = vcExParam10;
	}
	@Override
	public String toString() {
		return "VbChart [vcID=" + vcID + ", vcCode=" + vcCode + ", vcPageCode=" + vcPageCode + ", vcChartType="
				+ vcChartType + ", vcWhType=" + vcWhType + ", vcWidth=" + vcWidth + ", vcHeight=" + vcHeight
				+ ", vcXaxis=" + vcXaxis + ", vcYaxis=" + vcYaxis + ", vcData=" + vcData + ", vcDataType=" + vcDataType
				+ ", vcCreateTime=" + vcCreateTime + ", vcUpdateTime=" + vcUpdateTime + ", vcTimer=" + vcTimer
				+ ", vcCreater=" + vcCreater + ", vcExParam1=" + vcExParam1 + ", vcExParam2=" + vcExParam2
				+ ", vcExParam3=" + vcExParam3 + ", vcExParam4=" + vcExParam4 + ", vcExParam5=" + vcExParam5
				+ ", vcTitle=" + vcTitle + ", vcMinX=" + vcMinX + ", vcMaxX=" + vcMaxX + ", vcShowType=" + vcShowType
				+ ", vcNamespace=" + vcNamespace + ", vcMethod=" + vcMethod + ", vcParams=" + vcParams + ", vcPercent="
				+ vcPercent + ", vcLineTitle=" + vcLineTitle + ", vcXUnit=" + vcXUnit + ", vcYUnit=" + vcYUnit
				+ ", vcExParam6=" + vcExParam6 + ", vcExParam7=" + vcExParam7 + ", vcExParam8=" + vcExParam8
				+ ", vcExParam9=" + vcExParam9 + ", vcExParam10=" + vcExParam10 + "]";
	}
	
	
	
	
	
}
