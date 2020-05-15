package com.hzsiasun.service;

import java.util.List;

import com.hzsiasun.model.VbChart;

public interface VbChartService {
List<VbChart>findAll();

Boolean addVbChart(VbChart vbchart);

Boolean delVbChart(VbChart vbchart);

Boolean updateVbChart(VbChart vbchart);
}
