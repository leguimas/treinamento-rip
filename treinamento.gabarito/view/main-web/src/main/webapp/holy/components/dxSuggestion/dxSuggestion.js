$.fn.dxSuggest = function(options){
    var url = $(this).attr("hl:suggestions");
    $(this).autocomplete(url, options);
    
    $(this).result(function(event, data, formatted) {
    	$(this).flushCache();
        if (data){
            $(this).parent().find("input.dxSuggestionRealValue").val(data[1]);
        }
    });
	$(this).bind('change', this, function(e){
        if ($(e.data).val() == ""){
                $(e.data).parent().find("input.dxSuggestionRealValue").val("");
        }
    });
};

$.fn.dxSuggestMultiple = function(options){
    var url = $(this).attr("hl:suggestions");
    $(this).autocomplete(url, options);
    $(this).result(function(event, data, formatted) {
    	$(this).flushCache();
    });
};

EventsDxSuggestion = {};
EventsDxSuggestion.applyRules = function(){
    $("input.dxSuggestion").each(function(i,el){
        if (!$(el).hasClass("dxSuggestionUserEntry")){
            var originalName = el.name;
            el.name = "dxSuggestionOriginal-" + el.name;
            var inputHidden = $.create("input", { "type": "hidden", "name" : originalName, "class": "dxSuggestionRealValue" });
            el.parentNode.appendChild(inputHidden);
            $(el).addClass("dxSuggestionUserEntry");
            var options = {}; 
            options.cacheLength = 1; 
            $(el).dxSuggest(options); 
        }
    });
    
    $("textarea.dxMultipleSuggestion").each(function(i,el){
        if (!$(el).hasClass("dxSuggestionUserEntry")){
            $(el).addClass("dxSuggestionUserEntry");
            var options = {};
            options.multiple = true;
            options.mustMatch = true;
            options.cacheLength = 1; 
            $(el).dxSuggestMultiple(options); 
        }
    });
};

Holyavenger.addEvent({
	name: "EventsDxSuggestion.applyRules",
	onLoad: EventsDxSuggestion.applyRules
});