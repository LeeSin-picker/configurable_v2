package com.hzsiasun.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hzsiasun.dao.VbChartMapper;
import com.hzsiasun.model.VbChart;
import com.hzsiasun.service.VbChartService;

@Service
public class VbChartServiceImpl implements VbChartService {
@Autowired
public VbChartMapper vbChartMapper;
	@Override
	public List<VbChart> findAll() {
		List<VbChart> list = vbChartMapper.findAll();
		return list;
	}
	
	
	@Override
	public Boolean addVbChart(VbChart vbchart) {
		boolean b =vbChartMapper.addVbChart(vbchart);
		return b;
	}


	@Override
	public Boolean delVbChart(VbChart vbchart) {
		boolean b =vbChartMapper.delVbChart(vbchart);
		return b;
	}


	@Override
	public Boolean updateVbChart(VbChart vbchart) {
		boolean b =vbChartMapper.updateVbChart(vbchart);
		return b;
	}

}
