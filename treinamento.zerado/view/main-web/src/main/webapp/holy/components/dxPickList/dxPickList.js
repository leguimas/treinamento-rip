function pickListClone(){
    $("select.dxSelectClone option").remove();
    $("select.dxPickListTo").each(function(){
        clone = $(this).clone();
   		$(clone).removeClass('dxPickListTo');
		$(clone).addClass('dxSelectClone');   
        var options = $(clone).children().each(function(){
            if($(this).attr('selected')[0] == undefined){
                $(this).attr('selected', true);
            }
        }); 
        if($(this).next().attr("class") == "dxSelectClone"){
            $(this).next().html(options);
        }else{
            $(clone).html(options).insertAfter($(this));  
            $(this).removeAttr('name');
            $(this).removeAttr('id');	 
        }
    });
    return false;
}

EventsDxPickList = {};
EventsDxPickList.applyRules = function(){
    pickListClone();
    
	$('fieldset.dxPickList .dxButtonsCopy').click(function() {  
		var from   = $(this).parents("fieldset.dxPickList").find("select.dxPickListFrom");
		var to     = $(this).parents("fieldset.dxPickList").find("select.dxPickListTo");
		$($(from).find('option:selected').remove().appendTo($($(to))));
		return pickListClone();
	});
	
	$('fieldset.dxPickList .dxButtonsCopyAll').click(function() {  
		var from   = $(this).parents("fieldset.dxPickList").find("select.dxPickListFrom");
		var to     = $(this).parents("fieldset.dxPickList").find("select.dxPickListTo");	
		$($(from).find('option').remove().appendTo($($(to))));
		return pickListClone();
	});		
	
	$('fieldset.dxPickList .dxButtonsRemove').click(function() {  
		var to   = $(this).parents("fieldset.dxPickList").find("select.dxPickListFrom");
		var from = $(this).parents("fieldset.dxPickList").find("select.dxPickListTo");			
		$($(from).find('option:selected').remove().appendTo($($(to))));
		return pickListClone();
	});		
	
	$('fieldset.dxPickList .dxButtonsRemoveAll').click(function() {  
		var to   = $(this).parents("fieldset.dxPickList").find("select.dxPickListFrom");
		var from = $(this).parents("fieldset.dxPickList").find("select.dxPickListTo");
		$($(from).find('option').remove().appendTo($($(to))));
		return pickListClone();
	});
    $('fieldset.dxPickList .dxButtonIconIncr').click(function(){
        $(this).parents('.dxPickListOrder').next().find('option').qsort({order: "asc"});
        return pickListClone();
    });
    $('fieldset.dxPickList .dxButtonIconDecr').click(function(){
        $(this).parents('.dxPickListOrder').next().find('option').qsort({order: "desc"});
        return pickListClone();
    });    
    $('fieldset.dxPickList .dxButtonsMoveUp').click(function(){
        var e = $(this).parent().parent().prev().find('.dxPickListTo option:selected');
        $(e).prev().before($(e));
        return pickListClone();
    });
    $('fieldset.dxPickList .dxButtonsMoveDown').click(function(){
        var e = $(this).parent().parent().prev().find('.dxPickListTo option:selected');
        $(e).next().after($(e));
        return pickListClone();
    });    
};

Holyavenger.addEvent( { name: "EventsDxPickList.applyRules", 
					  onLoad: EventsDxPickList.applyRules } );