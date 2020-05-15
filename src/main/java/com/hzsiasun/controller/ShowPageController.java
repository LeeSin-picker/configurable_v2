package com.hzsiasun.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ShowPageController {
@RequestMapping("/")
public String ShowIndex() {
	return "view/index";
}
@RequestMapping("/visibleBoard")
public String showVisibleBoard() {
	return "view/configurable_kanban";
}
/*新增看板配置*/
@RequestMapping("/newKanban")
public String showNewKanban() {
	return "view/newKanban";
}
@RequestMapping("/newKanbanA")
public String showNewKanbanA() {
	return "view/newKanbanA";
}
@RequestMapping("/newKanbanB")
public String showNewKanbanB() {
	return "view/newKanbanB";
}
@RequestMapping("/newKanbanC")
public String showNewKanbanC() {
	return "view/newKanbanC";
}
}
