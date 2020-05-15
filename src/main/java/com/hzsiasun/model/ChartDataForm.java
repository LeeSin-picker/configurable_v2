package com.hzsiasun.model;

import java.util.List;

public class ChartDataForm {
	private List<String> xlist;//X轴的数据
	private List<String> ylist;//Y轴的数据
	private String BPCode;;////产品编号
	private String OPRealTime;////创建时间
	private String EquStationCode;////工序编号
	private VbChart vbChart;
	private String dataMessage;
	
	public String getDataMessage() {
		return dataMessage;
	}


	public void setDataMessage(String dataMessage) {
		this.dataMessage = dataMessage;
	}


	public ChartDataForm(){}

	
	public ChartDataForm(List<String> xlist, List<String> ylist, String bPCode, String oPRealTime, String equStationCode,
			VbChart vbChart) {
		super();
		this.xlist = xlist;
		this.ylist = ylist;
		BPCode = bPCode;
		OPRealTime = oPRealTime;
		EquStationCode = equStationCode;
		this.vbChart = vbChart;
	}

	public List<String> getXlist() {
		return xlist;
	}

	public void setXlist(List<String> xlist) {
		this.xlist = xlist;
	}

	public List<String> getYlist() {
		return ylist;
	}

	public void setYlist(List<String> ylist) {
		this.ylist = ylist;
	}

	public String getBPCode() {
		return BPCode;
	}

	public void setBPCode(String bPCode) {
		BPCode = bPCode;
	}

	public String getOPRealTime() {
		return OPRealTime;
	}

	public void setOPRealTime(String oPRealTime) {
		OPRealTime = oPRealTime;
	}

	public String getEquStationCode() {
		return EquStationCode;
	}

	public void setEquStationCode(String equStationCode) {
		EquStationCode = equStationCode;
	}

	public VbChart getVbChart() {
		return vbChart;
	}

	public void setVbChart(VbChart vbChart) {
		this.vbChart = vbChart;
	}


	@Override
	public String toString() {
		return "ChartDataForm [xlist=" + xlist + ", ylist=" + ylist + ", BPCode=" + BPCode + ", OPRealTime="
				+ OPRealTime + ", EquStationCode=" + EquStationCode + ", vbChart=" + vbChart + ", dataMessage="
				+ dataMessage + "]";
	}
	
	

}
