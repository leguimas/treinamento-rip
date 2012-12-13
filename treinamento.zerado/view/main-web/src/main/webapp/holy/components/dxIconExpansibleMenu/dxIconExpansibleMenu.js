EventsDxIExpansibleMenu = {};
EventsDxIExpansibleMenu.applyRules = function(){
	$("ul.dxFeaturesMenu li a").bind("click", function(){
		$("li", $(this).parents("ul")).removeClass("active");
		$(this).parent().addClass("active");
	});
	$("div.dxContentMenu .close input").bind("click", function(ev){
		var dxContent = $(this).parents("div.dxContentMenu").parent().children("div.dxMainContent");
		var dxContentMenu = $(this).parents("div.dxContentMenu"); 
		if ($(dxContent).hasClass("dxExpandedContent")){
			$(dxContentMenu).removeClass("dxCollapsedContentMenu");
			$(dxContent).removeClass("dxExpandedContent");
			//$(this)[0].value = "<";
		} else {
			$(dxContentMenu).addClass("dxCollapsedContentMenu");
			$(dxContent).addClass("dxExpandedContent");
			//$(this)[0].value = ">";
		}
		ev.stopImmediatePropagation();
	});
	$("div.dxContentMenu").bind("click", function(ev){
		$(this).children(".close").children("input").click();
		ev.stopImmediatePropagation();
	});
	$("div.dxContentMenu ul li.folder > a").bind("click", function(ev){
		if ($(this.parentNode).hasClass("openedFolder")){
			$(this.parentNode).removeClass("openedFolder");
		} else {
			$(this.parentNode).addClass("openedFolder");
		}
		ev.stopImmediatePropagation();
	});
	$("div.dxContentMenu ul li a").bind("click", function(ev){
		ev.stopImmediatePropagation();
	});
	if($("div.dxContentMenu ul li").length == 0){
		$("ul.featuresMenu li.active a").click();
	}
}

Holyavenger.addEvent(
	{ name: "EventsDxIExpansibleMenu.applyRules", 
	onLoad: EventsDxIExpansibleMenu.applyRules }
);