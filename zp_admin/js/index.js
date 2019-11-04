$(function(){
	// 为导航添加事件
	$("#left_nav").on("click","li",function(){

		var url = $(this).attr("url");
		// alert(url);
		$("#left_nav > li").removeClass("current");//移除
		$(this).addClass("current");//点击时添加
		$("#right_bot_wrapper").load(url);
	})

	// 模拟点击第一个li
	$("#left_nav > li:first-child").trigger("click");
	
});