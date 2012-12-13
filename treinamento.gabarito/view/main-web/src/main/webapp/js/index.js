/**
 * Put in file below all events started by your application
 */
hlLoad("js/load.js");
hlLoad("js/custom.js");

// Sobrescrevendo funcao showHint
EventsForms.showHint = function(el){
	var hint = $(el.parentNode).children(".dxHint");
	if (hint.length > 0){
		if ($(el.form).find(".dxFormHint").length > 0){
			$(el.form).find(".dxFormHint").children("div.dxHint").html(hint.html());
		} else {
	   		//$(el.parentNode).children(".dxHint").show();
		}
	}
};