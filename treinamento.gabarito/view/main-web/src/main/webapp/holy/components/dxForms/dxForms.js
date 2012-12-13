EventsForms = {};
EventsForms.validateRequiredFields = function(htmlForm){
    $(htmlForm).find("li.required").removeClass("dxEmptyRequired");
    $("li.validateRequiredError").remove();
    var missing = false;
    $(htmlForm).find("li.required").each(function(i,el){
        field = $(el).children("label + *");
        if ($(el).hasClass("multipleCheck")){
            //checkbox, radio
            var multipleChecked = false;
            var checkFields = $(el).find("input[type=radio],input[type=checkbox]");
            for (index = 0; index < checkFields.length; index++){
                if (checkFields[index].checked){
                    multipleChecked = true;
                }
            }
            if (!multipleChecked){
                $(el).addClass("dxEmptyRequired");
                missing = true;
            }
        } else {
            //input, select, textarea
            if ((field.val().length == 0) || (field.val() == "")){
                $(el).addClass("dxEmptyRequired");
                missing = true;
            }
        }
    });
    if (missing){
        $("ul#messageBoard").append("<li class='error validateRequiredError'>Os campos em vermelho s&atilde;o obrigat&oacute;rios e n&atilde;o foram preenchidos.</li>");
    }
    return missing;
};
EventsForms.hideHint = function(el){
   	$(el).closest("form").find(".dxFormHint").css("visibility", "hidden");
};
EventsForms.showHint = function(el){
    var content = $(el).parent().find(".dxHint").html();
	if(typeof(content) != 'undefined'){
		$(el).closest("form").find(".dxFormHint .dxHint").html(content);
		$(el).closest("form").find(".dxFormHint").css("visibility", "visible");
	}
};
EventsForms.applyRules = function(){
	/* [EmptyCheckBoxSolution] */
	$("fieldset ul li input[type=checkbox]").each(function(i,el){
	    if(!$(el).hasClass("dxCheckbox")){
		var originalName = el.name;
		el.name = "//originalCheckbox-" + el.name;
		var checkboxValue = (el.checked ? "true" : "false");
		var inputHidden = $.create("input", { "type": "hidden", "name" : originalName, "class": "dxCheckboxHelper", "value": checkboxValue });
		el.parentNode.appendChild(inputHidden);
		$(el).addClass("dxCheckbox");
	    }
	});

	$("fieldset ul li input[type=checkbox]").bind("click", function(){
		if (this.checked){
			$(this.parentNode).children(".dxCheckboxHelper").val("true");
		} else {
			$(this.parentNode).children(".dxCheckboxHelper").val("false");
		}
	});
	
	$.mask.masks.percentual = {mask:'99,999', type:'reverse', defaultValue:'000'};
	
	/* Masks */
	$("fieldset ul li input.phone").attr("alt", "phone");
	$("fieldset ul li input.integer").attr("alt", "integer");
    $("fieldset ul li input.decimal").attr("alt", "decimal");
    $("fieldset ul li input.signedDecimal").attr("alt", "signedDecimal");
    $("fieldset ul li input.currency").attr("alt", "currency");
	$("fieldset ul li input.date").attr("alt", "date");
	$("fieldset ul li input.cpf").attr("alt", "cpf");
	$("fieldset ul li input.percentual").attr("alt", "percentual");
	
	// compatibility with older versions
    $("fieldset ul li input.phoneNumber").attr("alt", "phone");
    $("fieldset ul li input.currencySimple").attr("alt", "decimal");
	$("fieldset ul li input.currencyFive").attr("alt","decimal-5");
    $("fieldset ul li input.float").attr("alt", "decimal");
    $("fieldset ul li input.numeric").attr("alt", "integer");
    
    // apply masks
    $("input:text").setMask();
    
	$("#datepicker").each(function(i,el){ 
        if (!$(el).hasClass('dxDatePickerLoaded')){ 
            $(el).datepicker({showOn: 'button', buttonImage: 'images/calendar.gif', buttonImageOnly: true}); 
            $(el).addClass('dxDatePickerLoaded'); 
        } 
    }); 
    
    $("fieldset ul li input.date").each(function(i,el){
    	if (!$(el).hasClass('dxDatePickerLoaded')){
	    	$(el).datepicker({ 
	            showOn: 'button', buttonImage: 'holy/themes/dextra/images/datepicker.png', 
	            buttonImageOnly: true,
	            changeYear: true,
	            onClose: function(dateText, inst){
	                $(this).parent().next().find('select,input, textarea').focus();
	            },
				onChangeMonthYear: function(year, month, inst){
					$(el).val($(el).val().replace(/\/[0-9]{4}/i, '/'+year));
				}
	        });
			$(el).addClass("dxDatePickerLoaded");	   	
	   	}
    });
	
	
	/* [required fields] */
	$("form:not(.dxFormFluid) fieldset ul li.required > label").each(function(){
	   if ($(this).find("span.dxRequiredMark").length == 0){
	       $(this).prepend("<span class='dxRequiredMark'>*</span> ");
	   } 
	});
	$("form.dxFormFluid fieldset ul li.required > label").each(function(){
	   if ($(this).find("span.dxRequiredMark").length == 0){
           $(this).append(" <span class='dxRequiredMark'>*</span> ");
       } 
	});
	
	
	
	/* [dxFormHints] */
	$("fieldset ul li label + *").bind("focus", function(){
                EventsForms.showHint(this);
        }).bind("blur", function(){
                EventsForms.hideHint(this);
        });
	$("fieldset ul li label + *:not(select)").bind("focus", function(){
		$(this).addClass("focus");
	}).bind("blur", function(){
		$(this).removeClass("focus");
	});

	$("fieldset ul li.multipleCheck input").bind("focus", function(){
		var el = this.parentNode.parentNode.parentNode;
		EventsForms.showHint(el);
	});
	$("fieldset ul li.multipleCheck input").bind("blur", function(){
		var el = this.parentNode.parentNode.parentNode;
		EventsForms.hideHint(el);
	});
	$("fieldset ul li.check input").bind("focus", function(){
		EventsForms.showHint(this);
	});
	$("fieldset ul li.check input").bind("blur", function(){
		EventsForms.hideHint(this);
	});
	$('form').bind('submit', function(){return false});
};

Holyavenger.addEvent({ name: "EventsForms.applyRules", onLoad: EventsForms.applyRules });
