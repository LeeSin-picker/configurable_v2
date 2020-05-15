package com.hzsiasun.dao;

import java.util.List;

import com.hzsiasun.model.VbChart;

public interface VbChartMapper {
	public List<VbChart> findAll();

	public boolean addVbChart(  VbChart vbchart);

	public boolean delVbChart(VbChart vbchart);

	public boolean updateVbChart(VbChart vbchart);
}
