EventsDesign = {};
EventsDesign.applyRules = function(){
    if (BrowserDetect.browser == "Explorer") {
        if (BrowserDetect.version == 6) {
            $(".dxButton").parent().pngFix();
            $(".dxAppMenu li").pngFix();
        }
        $("input[type='checkbox'], input[type='radio']").css('border', 'none');
        $("input[type='checkbox'], input[type='radio']").css('background', 'none');
    }
    $("ul#messageBoard").css("height", "auto");
    $("ul#messageBoard:empty").css("height", "0");
    $("div.dxDropdownMenu > ul li:last-child").css("border", "none");
    $("div.dxDropdownMenu > ul").corner("top");
	$("div#main > div.dxContentMenu").height($("#main").height()-$("#header").height()-13);
}
Holyavenger.addEvent({
    name: "EventsDesign.applyRules", onLoad: EventsDesign.applyRules
});
