Holyavenger.ClearMessages = {};
Holyavenger.ClearMessages.msgCssRule = ".messages li";
Holyavenger.ClearMessages.selectors  = "a, input, button[type=submit]";
Holyavenger.ClearMessages.velocity   = "slow";
Holyavenger.ClearMessages.run        = true;

Holyavenger.ClearMessages.onLoad = function(opts) {
	if(Holyavenger.ClearMessages.run){
		$(Holyavenger.ClearMessages.selectors).unbind('click.removeMessage');
		$(Holyavenger.ClearMessages.selectors).bind('click.removeMessage', function() {
			Holyavenger.Debug("Clean Messages: " + $(this)[0]);
			$(Holyavenger.ClearMessages.msgCssRule).fadeOut(Holyavenger.ClearMessages.velocity, function(){
				$(Holyavenger.ClearMessages.msgCssRule).remove();
			});
		});	
	}
};

Holyavenger.addEvent({ 
	name: "Holyavenger.ClearMessages", 
	onLoad: Holyavenger.ClearMessages.onLoad,
	onError: Holyavenger.ClearMessages.onLoad });
	
