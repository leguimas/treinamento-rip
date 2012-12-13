EventsDxDropMenu = {};
EventsDxDropMenu.applyRules = function(){
	$("div.dxDropdownMenu ul li").hover(
		function(){ $(this).children("ul").css("display", "block"); },
		function(){ $(this).children("ul").css("display", "none"); }
	);
	$("div.dxDropdownMenu ul ul li").hover(
		function(){ $(this).addClass("hover"); },
		function(){ $(this).removeClass("hover"); }
	);
	$("div.dxDropdownMenu > ul ul > li:odd").addClass("odd");
	$("div.dxDropdownMenu > ul ul li ul li:odd").addClass("odd");
	
	$("div.dxDropdownMenu").each(function(i,el){
		if ($(this).find("> ul li span.firstLevelArrow").length == 0){
			$(this).find("> ul > li:has(ul)").children("a").append(" <span class='firstLevelArrow'></span>");
			$(this).find("> ul ul li:has(ul)").children("a").append(" <span class='arrow'>&raquo;</span>");
		}	
	});
	
	
};

Holyavenger.addEvent({
	name: "EventsDxDropMenu.applyRules",
	onLoad: EventsDxDropMenu.applyRules
});