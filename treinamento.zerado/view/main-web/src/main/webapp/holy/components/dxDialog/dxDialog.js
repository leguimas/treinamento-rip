$.fn.dxDialogSetToClose = function(){
	$(this).bind("click", function(){
		$(this).parents(".dxDialog").dxDialogClose();		
	});
}
$.fn.dxDialogClose = function(){
	$(this).parents(".dxDialogContainer").remove();
}
$.fn.dxDialogOpen = function(){
	var dialogContainer = $("<div class='dxDialogContainer dxDialogContainerOpened'></div>");
	var parentNode = this.parent();
	dialogContainer.append("<div class='dxDialogOverlay'></div>");
	dialogContainer.append(this);
	parentNode.append(dialogContainer);
	$(this).dxDialogFixTabs();
}
$.fn.dxDialogFixTabs = function(){
	var tabbableFields = $(this).find(":tabbale");
	if (tabbableFields.length > 0) {
		var firstField = tabbableFields[0];
		var lastField = tabbableFields[tabbableFields.length - 1];
		$(firstField).bind("keypress", function(ev){
			if ((ev.keyCode == 9) && (ev.shiftKey == true)) {
				$(lastField).focus();
			}
		});
		$(lastField).bind("keypress", function(ev){
			if ((ev.keyCode == 9) && (ev.shiftKey == false)) {
				$(firstField).focus();
			}
		});
	}
}
$.fn.dxDialogLockFormContainer = function(overflow, height){
	$(this).addClass("dxDialogLockedFormContainer");
    $(this).find(".dxButtons").css('width', Math.floor($('.dxDialog form').width()) + 'px');
	$(this).find("form").css('overflow', overflow);
	dialogHeight = $(this).height();
	formHeight = $(this).height();
	bodyHeight = $('body').height();
	if (dialogHeight > bodyHeight) {
        $(this).css('height', Math.floor(bodyHeight * 0.8) + 'px');
        $(this).find('form').css('height', Math.floor(bodyHeight * 0.8 - 90) + 'px');
        $(this).css('top', Math.floor(bodyHeight * 0.1) + 'px');
        $(this).find('.dxButtons').css('top', Math.floor(formHeight + 50) + 'px');
    } else {
        $(this).css('height', height + 'px');
        $(this).find('form').css('height', Math.floor(dialogHeight -80) + 'px');
        $(this).css('top', Math.floor((bodyHeight - dialogHeight) / 2));
        $(this).find('.dxButtons').css('top', (formHeight + 40) + 'px');
    }
}
$(".dxDialog .dxClose, .dxDialog .dxDialogClose, .dxDialog .dxButtonClose, .dxDialog .dxButtonCancel").live("click", function(){
	$(this).parents(".dxDialog").dxDialogClose();
});