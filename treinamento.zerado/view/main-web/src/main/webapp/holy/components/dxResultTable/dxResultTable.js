$.fn.dxAllowSort = function(cols, itemsPerPage, initialSort){
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
