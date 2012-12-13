EventsDesign = {};
EventsDesign.applyRules = function(){
    if (BrowserDetect.browser == "Explorer") {
        if (BrowserDetect.version == 6) {
            $(".dxButton").parent().pngFix();
            $(".dxAppMenu li").pngFix();
			$(".dxContentMenu ul li a").parent().pngFix();
        }
        $("input[type='checkbox'], input[type='radio']").css('border', 'none');
        $("input[type='checkbox'], input[type='radio']").css('background', 'none');
    }
    $("ul#messageBoard").css("display", "block");
	$("ul#messageBoard").css("height", "auto");
    $("ul#messageBoard:empty").css("display", "none");
	$("ul.dxFeaturesMenu li a span.dxFeatureActive").remove();
	$("ul.dxFeaturesMenu li.active a").prepend("<span class='dxFeatureActive'>&gt; </span>");
//	$("div#main > div.dxContentMenu").height($("#wrap").height()-$("#header").height()-3);
}
Holyavenger.addEvent({
    name: "EventsDesign.applyRules", onLoad: EventsDesign.applyRules
});