$.fn.dxToogle = function(ev){
	var contentPanel = $(this).children(".dxContent")[0];
	if ($(this).hasClass("dxTooglePanelCollapsed")){
		$(this).removeClass("dxTooglePanelCollapsed");
		$(contentPanel).slideDown();
	} else {
		$(this).addClass("dxTooglePanelCollapsed");
		$(contentPanel).slideUp();
	}
	if (ev != null){
		ev.stopImmediatePropagation();
	}
}

$("div.dxTooglePanel h3, div.dxTooglePanel .dxTitle").live("click", function(ev){
	var tooglePanel = $($(this.parentNode)[0]);
	$(tooglePanel).dxToogle(ev);
});

EventsDxTooglePanel = {};
EventsDxTooglePanel.applyRules = function(){
	$("div.dxTooglePanel h3, div.dxTooglePanel .dxTitle").each(function(i,el){
		if (!$(el).hasClass("dxTooglePanelHeader")){
			$(el).corner("top");
			$(el).addClass("dxTooglePanelHeader");
		}
	});
	$("div.dxTooglePanelCollapsed").children(".dxContent").hide();
};

Holyavenger.addEvent({
	name: "EventsDxTooglePanel.applyRules", 
	onLoad: EventsDxTooglePanel.applyRules
});