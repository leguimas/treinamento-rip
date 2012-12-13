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
});EventsDxDropMenu = {};
EventsDxDropMenu.applyRules = function(){
	$("div.dxDropdownMenu ul li").hover(
		function(){ $(this).children("ul").css("display", "block"); },
		function(){ $(this).children("ul").css("display", "none"); }
	);
	$("div.dxDropdownMenu ul ul li").hover(
		function(){ $(this).addClass("hover"); },
		function(){ $(this).removeClass("hover"); }
	);
	$("div.dxDropdownMenu > ul ul > li:odd").addClass("odd");
	$("div.dxDropdownMenu > ul ul li ul li:odd").addClass("odd");
	
	$("div.dxDropdownMenu").each(function(i,el){
		if ($(this).find("> ul li span.firstLevelArrow").length == 0){
			$(this).find("> ul > li:has(ul)").children("a").append(" <span class='firstLevelArrow'></span>");
			$(this).find("> ul ul li:has(ul)").children("a").append(" <span class='arrow'>&raquo;</span>");
		}	
	});
	
	
};

Holyavenger.addEvent({
	name: "EventsDxDropMenu.applyRules",
	onLoad: EventsDxDropMenu.applyRules
});EventsDxIExpansibleMenu = {};
EventsDxIExpansibleMenu.applyRules = function(){
	$("ul.dxFeaturesMenu li a").bind("click", function(){
		$("li", $(this).parents("ul")).removeClass("active");
		$(this).parent().addClass("active");
	});
	$("div.dxContentMenu .close input").bind("click", function(ev){
		var dxContent = $(this).parents("div.dxContentMenu").parent().children("div.dxMainContent");
		var dxContentMenu = $(this).parents("div.dxContentMenu"); 
		if ($(dxContent).hasClass("dxExpandedContent")){
			$(dxContentMenu).removeClass("dxCollapsedContentMenu");
			$(dxContent).removeClass("dxExpandedContent");
			//$(this)[0].value = "<";
		} else {
			$(dxContentMenu).addClass("dxCollapsedContentMenu");
			$(dxContent).addClass("dxExpandedContent");
			//$(this)[0].value = ">";
		}
		ev.stopImmediatePropagation();
	});
	$("div.dxContentMenu").bind("click", function(ev){
		$(this).children(".close").children("input").click();
		ev.stopImmediatePropagation();
	});
	$("div.dxContentMenu ul li.folder > a").bind("click", function(ev){
		if ($(this.parentNode).hasClass("openedFolder")){
			$(this.parentNode).removeClass("openedFolder");
		} else {
			$(this.parentNode).addClass("openedFolder");
		}
		ev.stopImmediatePropagation();
	});
	$("div.dxContentMenu ul li a").bind("click", function(ev){
		ev.stopImmediatePropagation();
	});
	if($("div.dxContentMenu ul li").length == 0){
		$("ul.featuresMenu li.active a").click();
	}
}

Holyavenger.addEvent(
	{ name: "EventsDxIExpansibleMenu.applyRules", 
	onLoad: EventsDxIExpansibleMenu.applyRules }
);$.fn.dxAllowSort = function(cols, itemsPerPage, initialSort){
    var table = this;
    if ($("tbody tr", table).length > 0){
	    initialSort = (initialSort == null ? [[1,0]] : initialSort);
	    $(this).tablesorter({
	       headers : cols,
	       cssAsc: "dxHeaderSortUp", 
	       cssDesc: "dxHeaderSortDown",
	       cssHeader: "dxHeaderSortable",
	       sortList: initialSort,
	       widgets: ["zebra"]
	    });
	    if (itemsPerPage != null){
		$(this).dxPaginate(itemsPerPage);
		$(this).find('th').click(function(){
			$(table).find('tr').removeClass('dxView');
			var tr = $(table).find('tr');
			for(i=0; i<itemsPerPage; i++){
		          $(tr[i]).addClass('dxView');
			}
			var t = setTimeout(function(){
		           $(table).parent().find('.page-1').click();
			}, 50);    
		});
	    }
	}
}
$.fn.dxSortedGoToFirstPage = function(){ $(this).parent().find(".dxPaginationLinks a.first").click() };
$.fn.dxSortedPaginate = function(itemsPerPage){
    if (!$(this).hasClass("dxSortedPaginated")){
	    var pagLinks = $("<div class='dxPaginationLinks'></div>")[0];
	    var pagForm = $("<form>" + 
	        '<a class="first">« primeira</a>' + 
	        '<a class="prev">‹ anterior</a>' +
	        '<input type="text" readonly="readonly" class="pagedisplay"/>' + 
	        '<a class="next">próxima ›</a>' + 
	        '<a class="last">última »</a>' + 
	        '<input type="hidden" class="pagesize" value="' + itemsPerPage + '"/>' +
	    '</form>')[0];
	    pagLinks.appendChild(pagForm);
	    $(this.parent())[0].appendChild(pagLinks, this[0]);
	    var pagContainer = $(this).parent().find(".dxPaginationLinks");
		$(this).tablesorterPager({
		   container: pagContainer,
		   size : itemsPerPage
		});
		$(this).addClass("dxSortedPaginated");
		$(this).dxSortedGoToFirstPage();
	}
}

$.fn.dxPaginate = function(itemsPerPage){
    var table = $(this);
    table.addClass("dxPaginatedResultTable");
    table.attr("page", 1);
    table.attr("itemsPerPage", itemsPerPage);
    table.dxListPageLinks();
    table.dxGoToPage(1);
    EventsDxResultTable.zebraRows(table);
}

$.fn.dxGoToPage = function(page){
	$(this).children("tbody").children().removeClass("dxView");
	$(this).attr("page", page);
	var itemsPerPage = parseInt($(this).attr("itemsPerPage"));
	var end	= page*itemsPerPage;
	var start = end-itemsPerPage;
	var index = start;
	var childs = $(this).children("tbody").children("tr:not(.dxSelectAll)");
	var checked = true;
	while (index < end){
		$(childs[index]).addClass("dxView");
		if ($(childs[index]).find("td.dxSelect").length > 0) {
		  if (!$(childs[index]).find("td.dxSelect input").attr("checked")){
		      checked = false;
		  }
		}
		index++;
	}
	if (!checked){
        $(this).find("tbody tr.dxSelectAll").remove();
	} 
	$(this).find("thead th.dxSelect input").attr("checked", checked);
	
	var totalItems = $(this).children("tbody").children().length;
	var totalPages = parseInt(totalItems/itemsPerPage);
	if ((totalItems % itemsPerPage) > 0){
		totalPages++;
	}
	$(this).parent().find("div.dxPaginationLinks a").removeClass("disabled");
	$(this).parent().find("div.dxPaginationLinks a.selected").removeClass("selected");
	if (page == 1){
		$(this).parent().find("div.dxPaginationLinks a.firstPage").addClass("disabled");
		$(this).parent().find("div.dxPaginationLinks a.previousPage").addClass("disabled");
	}
	if (parseInt(page) == totalPages){
		$(this).parent().find("div.dxPaginationLinks a.lastPage").addClass("disabled");
		$(this).parent().find("div.dxPaginationLinks .nextPage").addClass("disabled");
	}
	$(this).parent().find("div.dxPaginationLinks a.page-"+page).addClass("selected");
}

$.fn.dxListPageLinks = function(){
	var itemsPerPage = parseInt($(this).attr("itemsPerPage"));
	var totalItems = $(this).children("tbody").children().length;
	var totalPages = parseInt(totalItems/itemsPerPage);
	if ((totalItems % itemsPerPage) > 0){
		totalPages++;
	}

	var pagLinks;
	pagLinks = $.create("div", { "class": "dxPaginationLinks" });
	var element = null;
	
	//first
	element = $.create("a", { "page" : "1", "class" : "firstPage" }, ["« primeira"]);
	
	$(element).bind("click", function(){
		$(this.parentNode.parentNode).children("table.dxResultTable").dxGoToPage(1);
	}); 
	pagLinks.appendChild(element);
	
	//previous
	element = $.create("a", { "class" : "previousPage"}, ["‹ anterior"]);
	$(element).bind("click", function(){
		var dxTable = $(this.parentNode.parentNode).children("table.dxResultTable");
		var destinPage = parseInt(dxTable.attr("page"))-1;
		if (destinPage > 0){
			dxTable.dxGoToPage(destinPage);
		}
	}); 
	pagLinks.appendChild(element);
	
	for (var i = 1; i <= totalPages; i++){
		element = $.create("a", { "page" : eval(i), "class" : "page-"+i }, ["" + eval(i)]);
		$(element).bind("click", function(){
			$(this.parentNode.parentNode).children("table.dxResultTable").dxGoToPage($(this).attr("page"));
		}); 
		pagLinks.appendChild(element);
	}
	
	//next
	element = $.create("a", { "class" : "nextPage" }, ["próxima ›"]);
	$(element).bind("click", function(){
		var dxTable = $(this.parentNode.parentNode).children("table.dxResultTable");
		var destinPage = parseInt(dxTable.attr("page"))+1;
		if (destinPage <= eval(totalPages)){
			dxTable.dxGoToPage(destinPage);
		}
	}); 
	pagLinks.appendChild(element);

	//last
	element = $.create("a", { "page" : eval(totalPages), "class" : "lastPage" }, ["última »"]);
	$(element).bind("click", function(){
		$(this.parentNode.parentNode).children("table.dxResultTable").dxGoToPage(eval(totalPages));
	}); 
	pagLinks.appendChild(element);
	this[0].parentNode.appendChild(pagLinks, this[0]);
}

EventsDxResultTable = {};
EventsDxResultTable.messageLoad = "As %d linhas desta página estão selecionadas. Para selecionar todas as %d linhas da tabela, clique <a href='#' onclick='EventsDxResultTable.selectAllRows(this);return false'>aqui</a>";;
EventsDxResultTable.messageLoaded = "Todas as %d linhas da tabela estão selecionadas. <a href='#' onclick='EventsDxResultTable.unselectAllRows(this);return false'>Desfazer seleção</a>";
EventsDxResultTable.selectAllRows = function(element){
    var parentTable = $(element).parents("table.dxResultTable");
    parentTable.find("tr td.dxSelect input").attr('checked', true);
    var rows = parentTable.children("tbody").children("tr").length-1 ;
    $(element).parent().html($.sprintf(EventsDxResultTable.messageLoaded,rows))
    return false;
}
EventsDxResultTable.unselectAllRows = function(element){
    var parentTable = $(element).parents("table.dxResultTable");
    parentTable.find("tr td.dxSelect input").attr('checked', false);
    parentTable.find("tr.dxSelectAll").remove();
    parentTable.find("thead th.dxSelect input").attr("checked", false);
}

EventsDxResultTable.zebraRows = function(table){
    $(table).find("tbody tr").removeClass("odd").removeClass("even");
    $(table).find("tbody tr:odd").addClass("odd");
    $(table).find("tbody tr:even").addClass("even");
}

EventsDxResultTable.applyRules = function(){
    EventsDxResultTable.zebraRows($("table.dxResultTable"));
	
	//selectAll
	$("table.dxResultTable th.dxSelect input").bind("click", function(ev){
		var parentTable = $(this).parents("table.dxResultTable");
		if($(this).attr('checked')){
			parentTable.find("tr.dxView td.dxSelect input").attr('checked', true);
			parentTable.find("tr.dxSelectAll").remove();
			var cols = parentTable.find("tbody tr:first-child").children("td").length;
			var rows = parentTable.children("tbody").children("tr").length;
			if (rows > parentTable.attr("itemsPerPage")){
				var message = $.sprintf(EventsDxResultTable.messageLoad, parentTable.attr("itemsPerPage"), rows);
				parentTable.children("tbody").prepend("<tr class='dxSelectAll'><td></td><td colspan='" +(parseInt(cols)-1)+ "'>" + message +"</td></tr>");
			}
		}else{
			parentTable.find("tr.dxView td.dxSelect input").attr('checked', false);
			parentTable.find("tr.dxSelectAll").remove();
		}
	});
	$("table.dxResultTable th.dxSelect input").tooltip({fade: 150, showURL: false, track: true, delay: 0});
};

Holyavenger.addEvent(
	{ name: "EventsDxResultTable.applyRules", onLoad: EventsDxResultTable.applyRules }
);
$.fn.dxLoadActiveTab = function(){
	$HL($(this).find("ul li.active a").attr("hl:onclick"));
}
$("div.dxTabs ul.dxTabsList li > a").live("click", function(ev){
	$(this).parents(".dxTabs").find("li.active").removeClass("active");
	$(this).parents("li").addClass("active");
});$.fn.dxToogle = function(ev){
	var contentPanel = $(this).children(".dxContent")[0];
	if ($(this).hasClass("dxTooglePanelCollapsed")){
		$(this).removeClass("dxTooglePanelCollapsed");
		$(contentPanel).slideDown();
	} else {
		$(this).addClass("dxTooglePanelCollapsed");
		$(contentPanel).slideUp();
	}
	if (ev != null){
		ev.stopImmediatePropagation();
	}
}

$("div.dxTooglePanel h3, div.dxTooglePanel .dxTitle").live("click", function(ev){
	var tooglePanel = $($(this.parentNode)[0]);
	$(tooglePanel).dxToogle(ev);
});

EventsDxTooglePanel = {};
EventsDxTooglePanel.applyRules = function(){
	$("div.dxTooglePanel h3, div.dxTooglePanel .dxTitle").each(function(i,el){
		if (!$(el).hasClass("dxTooglePanelHeader")){
			$(el).corner("top");
			$(el).addClass("dxTooglePanelHeader");
		}
	});
	$("div.dxTooglePanelCollapsed").children(".dxContent").hide();
};

Holyavenger.addEvent({
	name: "EventsDxTooglePanel.applyRules", 
	onLoad: EventsDxTooglePanel.applyRules
});EventsForms = {};
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
$(".dxButton").live("mouseover", function(){
	$(this).addClass("dxButtonHover")
});
$(".dxButton").live("mouseout", function(){
	$(this).removeClass("dxButtonHover")
});

EventsDxButtons = {};
EventsDxButtons.applyRules = function(){
    $(".dxButton[disabled]").addClass("dxButtonDisabled");
};

Holyavenger.addEvent({
	name: "EventsDxButtons.applyRules", 
    onLoad: EventsDxButtons.applyRules
});$(".dxButtonIcon").live("mouseover", function(){
	$(this).addClass("dxButtonIconHover")
});
$(".dxButtonIcon").live("mouseout", function(){
	$(this).removeClass("dxButtonIconHover")
});

/* old wrong stuff */
$("").live("mouseover", function(){
	$(this).addClass("dxButtonIconHover")
});
$(".dxButtonIcons").live("mouseout", function(){
	$(this).removeClass("dxButtonIconHover")
});

EventsDxButtonIcons = {};
EventsDxButtonIcons.applyRules = function(){
	$(".dxButtonIcon[disabled],.dxButtonIcons[disabled]").addClass("dxButtonIconDisabled");
};

Holyavenger.addEvent({
	name: "EventsDxButtonIcons.applyRules", onLoad: EventsDxButtonIcons.applyRules
});function pickListClone(){
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
					  onLoad: EventsDxPickList.applyRules } );$.fn.dxSuggest = function(options){
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
});hlLoad("holy/components/index.css");