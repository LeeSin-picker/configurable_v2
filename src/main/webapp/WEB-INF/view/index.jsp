<%@ page contentType="text/html;charset=UTF-8"%>
<!DOCTYPE html>
<!--[if IE 9]>         <html class="no-js lt-ie10" lang="en"> <![endif]-->
<!--[if gt IE 9]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
	<meta charset="utf-8">

	<title>可配置看板</title>

	<meta name="description" content="AppUI is a Web App Bootstrap Admin Template created by pixelcave and published on Themeforest">
	<meta name="author" content="pixelcave">
	<meta name="robots" content="noindex, nofollow">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<link rel="stylesheet" href="<%=request.getContextPath()%>/css/plugins.css">
	<link rel="stylesheet" href="<%=request.getContextPath()%>/css/main.css">
	<link rel="stylesheet" href="<%=request.getContextPath()%>/css/bootstrap.css">
	<link rel="stylesheet" href="<%=request.getContextPath()%>/css/firstPage.css">
	<link rel="stylesheet" href="<%=request.getContextPath()%>/css/AdminLTE.min.css">
	<script src="<%=request.getContextPath()%>/js/vendor/modernizr-3.3.1.min.js"></script>
</head>
<body>
<div class='maskLayer'>
	<img src=''>
	<div class='closeBtn'><strong>X</strong></div>
</div>
<div id="page-wrapper" class="page-loading">
	<div id="page-container" class="header-fixed-top sidebar-visible-lg-full">
		<!-- Main Sidebar -->
		<div id="sidebar">
			<!-- Sidebar Brand -->
			<div id="sidebar-brand" class="themed-background">
				<a href="" class="sidebar-title">
					<i class="fa fa-cube"></i> <span class="sidebar-nav-mini-hide">SIASUN<strong></strong></span>
				</a>
			</div>
			<!-- END Sidebar Brand -->
			<!-- Wrapper for scrolling functionality -->
			<div id="sidebar-scroll">
				<!-- Sidebar Content -->
				<div class="sidebar-content">
					<!-- Sidebar Navigation -->
					<ul class="sidebar-nav">
						<li class="sidebar-separator">
							<i class="fa fa-ellipsis-h"></i>
						</li>
						<li>
							<a href="#" class="sidebar-nav-menu"><i class="fa fa-chevron-left sidebar-nav-indicator sidebar-nav-mini-hide"></i><i class="gi gi-more_items sidebar-nav-icon"></i><span class="sidebar-nav-mini-hide">看板</span></a>
							<!-- 在以下ul标签复制新增li标签--fzy -->
							<ul>
								<li>
									<a href='' class='visibleBoard' target="_Blank">供应链看板</a>
								</li>
								<li>
									<a href='' class='newKanban' target="_Blank">机加工看板</a>
								</li>
								<li>
									<a href='' class='newKanbanA' target="_Blank">看板3</a>
								</li>
								<li>
									<a href='' class='newKanbanB' target="_Blank">看板4</a>
								</li>
								<li>
									<a href='' class='newKanbanC' target="_Blank">看板5</a>
								</li>
							</ul>
						</li>
					</ul>
				</div>
				<!-- END Sidebar Content -->
			</div>
			<!-- END Wrapper for scrolling functionality -->
		</div>
		<div id="main-container">
			<header class="navbar navbar-inverse navbar-fixed-top">
				<!-- Left Header Navigation -->
				<ul class="nav navbar-nav-custom">
					<!-- Main Sidebar Toggle Button -->
					<li>
						<a href="javascript:void(0)" onclick="App.sidebar('toggle-sidebar');this.blur();">
							<i class="fa fa-ellipsis-v fa-fw animation-fadeInRight" id="sidebar-toggle-mini"></i>
							<i class="fa fa-bars fa-fw animation-fadeInRight" id="sidebar-toggle-full"></i>
						</a>
					</li>
					<!-- END Main Sidebar Toggle Button -->
	
					<!-- Header Link -->
			
					<!-- END Header Link -->
				</ul>
				<h4>可配置看板系统</h4>
				<!-- END Left Header Navigation -->
			</header>
			<div id='page-content'>
				<iframe id="ifra" name="ifra" width="100%" style="height:90vh"  frameborder="0" border="0" marginwidth="0" marginheight="0"  src=""></iframe>
			</div>
		</div>
			<!-- END Page Content -->
		<!-- END Main Container -->
	</div>
	<!-- END Page Container -->
	
</div>
<!-- END Page Wrapper -->

<!-- jQuery, Bootstrap, jQuery plugins and Custom JS code -->
<script src="<%=request.getContextPath()%>/js/vendor/jquery-2.2.4.min.js"></script>
<script src="<%=request.getContextPath()%>/js/vendor/bootstrap.min.js"></script>
<script src="<%=request.getContextPath()%>/js/plugins.js"></script>
<script src="<%=request.getContextPath()%>/js/app.js"></script>
<script src="<%=request.getContextPath()%>/js/common.js"></script>
<script src="<%=request.getContextPath()%>/js/firstPage.js"></script>
<!-- Load and execute javascript code used only in this page -->
<!--<script src="js/pages/readyDashboard.js"></script>-->
<script>
	$(function(){
		/* 初始化footer宽度 */
		var pageWidth = $('#page-content').css('width');
        	var sidebarWidth = $('#sidebar').css('width');
        	$('.main-footer').css('width',pageWidth);
        	$('.main-footer').css('left',sidebarWidth);
        $('input').val('');
        var indexUrl = '<%=request.getContextPath()%>';
        var visibleBoardUrl = '<%=request.getContextPath()%>'+ '/visibleBoard';
        $('.sidebar-title').attr('href',indexUrl);
        $('.dashboard').attr('href',indexUrl);
        console.log(visibleBoardUrl)
       	$('.visibleBoard').attr('href',visibleBoardUrl);

       	//新增看板新添js--fzy
       	var newKanbanUrl = '<%=request.getContextPath()%>'+ '/newKanban';
       	$('.newKanban').attr('href',newKanbanUrl);
       	var newKanbanUrlA = '<%=request.getContextPath()%>'+ '/newKanbanA';
       	$('.newKanbanA').attr('href',newKanbanUrlA);
       	var newKanbanUrlB = '<%=request.getContextPath()%>'+ '/newKanbanB';
       	$('.newKanbanB').attr('href',newKanbanUrlB);
       	var newKanbanUrlC = '<%=request.getContextPath()%>'+'/newKanbanC';
       	$('.newKanbanC').attr('href',newKanbanUrlC);
        /* footer宽度随动 */
        $('#page-content').on('resize',function () {
        	var pageWidth = $('#page-content').css('width');
        	var sidebarWidth = $('#sidebar').css('width');
        	$('.main-footer').css('width',pageWidth);
        	$('.main-footer').css('left',sidebarWidth);
        })
        /* 左侧栏点击在右侧iframe渲染 */
        function JumpA (pageIndex) {
        	$('#ifra').attr('src','<%=request.getContextPath()%>'+pageIndex);
        }
	     });
</script>
</body>
</html>