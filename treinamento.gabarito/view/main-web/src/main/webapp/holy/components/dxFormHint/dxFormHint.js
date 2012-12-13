EventsFormHint = {};
EventsFormHint.applyRules = function(){
	//$(".dxFormHint").parents("form").children("fieldset").addClass("dxFormHintFieldset");
}

Holyavenger.addEvent({ name: "EventsFormHint.applyRules",
    onLoad: EventsFormHint.applyRules });