$(".dxButton").live("mouseover", function(){
	$(this).addClass("dxButtonHover")
});
$(".dxButton").live("mouseout", function(){
	$(this).removeClass("dxButtonHover")
});

EventsDxButtons = {};
EventsDxButtons.applyRules = function(){
    $(".dxButton[disabled]").addClass("dxButtonDisabled");
};

Holyavenger.addEvent({
	name: "EventsDxButtons.applyRules", 
    onLoad: EventsDxButtons.applyRules
});