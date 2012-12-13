$.fn.dxLoadActiveTab = function(){
	$HL($(this).find("ul li.active a").attr("hl:onclick"));
}
$("div.dxTabs ul.dxTabsList li > a").live("click", function(ev){
	$(this).parents(".dxTabs").find("li.active").removeClass("active");
	$(this).parents("li").addClass("active");
});