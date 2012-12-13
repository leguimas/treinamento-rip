EventsQuest = {};
EventsQuest.applyRules = function(){
	$(".questionario .questao:odd").addClass("questaoOdd");
}

Holyavenger.addEvent({
    name: "EventsQuest.applyRules", onLoad: EventsQuest.applyRules
});