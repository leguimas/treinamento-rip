$(".dxButtonIcon").live("mouseover", function(){
	$(this).addClass("dxButtonIconHover")
});
$(".dxButtonIcon").live("mouseout", function(){
	$(this).removeClass("dxButtonIconHover")
});

/* old wrong stuff */
$("").live("mouseover", function(){
	$(this).addClass("dxButtonIconHover")
});
$(".dxButtonIcons").live("mouseout", function(){
	$(this).removeClass("dxButtonIconHover")
});

EventsDxButtonIcons = {};
EventsDxButtonIcons.applyRules = function(){
	$(".dxButtonIcon[disabled],.dxButtonIcons[disabled]").addClass("dxButtonIconDisabled");
};

Holyavenger.addEvent({
	name: "EventsDxButtonIcons.applyRules", onLoad: EventsDxButtonIcons.applyRules
});