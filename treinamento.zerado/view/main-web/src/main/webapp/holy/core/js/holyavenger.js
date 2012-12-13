Holyavenger = {}
Holyavenger.alias = "hl:";
Holyavenger.cache = true;

Holyavenger.eventAlias = Holyavenger.alias + "on";
debug = (typeof debug == "undefined")? false : debug;
Holyavenger.DebugEnabled = debug;

Holyavenger.Debug = function (msg) {
	if(!Holyavenger.DebugEnabled) {
		return false;
	}
	if($("#holyavengerDebug")[0] == null) {
		$('body').append('<div id="holyavengerDebug"></div>');
	}
    var t = new Date();
    var dd = (t.getTime() / 1000) - (d.getTime()/1000); 
	dd = dd.toFixed(2);
    if (debug == 2 || debug == 4) {
        document.title = dd + " Segundos";
    }
    if (debug == 1 || debug == 4) {
        $("#holyavengerDebug").append("<p>" + msg + " " + dd + " segundos</p>");
    }
    return true;
}

Holyavenger.eventSequence = new Array();

Holyavenger.addEvent = function(event) {
    Holyavenger.eventSequence[Holyavenger.eventSequence.length] = event;
}

Holyavenger.dispatchLoadSequence = function(response) {
    for(var i = 0; i < Holyavenger.eventSequence.length; i++) {
        var e = Holyavenger.eventSequence[i];
        if(e.onLoad) {
            Holyavenger.Debug("executing: " + e.name);
	        e.onLoad(response);
        }
    }
}

Holyavenger.dispatchErrorSequence = function(response, e) {
    for(var i = 0; i < Holyavenger.eventSequence.length; i++) {
        var e = Holyavenger.eventSequence[i];
        if(e.onError) {
	        e.onError(response, e);
        }
    }
}

Holyavenger.dispatchStartLoadSequence = function(opts) {
    for(var i = 0; i < Holyavenger.eventSequence.length; i++) {
        var e = Holyavenger.eventSequence[i];
        if(e.onStartLoad) {
	        e.onStartLoad(opts);
        }
    }
}

Holyavenger.Process = function(url, opts) {
    if(!opts) {
        opts = {};
    }
    var key = new Date(); key = key.getTime();
    opts.data = 'requestId=' + key + '&';

    if(opts.form != null) {
    	var method = $(opts.form[0]).attr("method");
    	if(method != null && method != "") {
    		opts.type = method.toLowerCase();
    	} else {
    		opts.type = "get";
    	} 
   		opts.data = opts.data + $(opts.form[0]).serialize();
   		opts.form = null;
   	}

	opts.url = url;
	opts.cache = Holyavenger.cache;
	opts.dataType = "xml";
	
	opts.complete = function(response, status) {
		if (status == "success"){
    		Holyavenger.Parse(response);
        	Holyavenger.dispatchLoadSequence(response);
        }
    }
    
    opts.error = function(response, error, e) {
    	if (!e){
	    	Holyavenger.Debug("Fail: " + error + " ");
	        if (typeof(response) != 'undefined') {
				Holyavenger.Parse(response);
				Holyavenger.dispatchErrorSequence(response);
			}
	   	} else {
	   		Holyavenger.Debug("Exception: " + e.message);
	   		Holyavenger.dispatchErrorSequence(response, e);
	   	}
    }
    Holyavenger.dispatchStartLoadSequence(opts);
    try { 
		$.ajax(opts);
	} catch (e){
		Holyavenger.Debug("Exception: " + e.message);
	   	Holyavenger.dispatchErrorSequence(e);
	}
}

Holyavenger.Parse = function(response) {
	try {
		Holyavenger.Debug("Parsing: " + response.responseXML.documentURI);
		var xml = response.responseXML;
	} catch(e){
		document.write(response.responseText);
	}

	var list = xml.firstChild.childNodes;
	// <engine> childs
    for(var i = 0; i < list.length; i++) {
        var node = list.item(i);
        // Is it Element?
        if(node.nodeType == 1) {
            var parser = Holyavenger.Parser[node.tagName];
            if(!parser) {
                Holyavenger.Debug("Holyavenger.Parser not found: " + node.tagName);
            } else {
                parser.parse(node);
            }
        }
    }
}

Holyavenger.WriteXML = function(element) {
    var ret = "";
   	if(element.nodeType == 1) {
       	// It is element?
       	ret += "<" + element.nodeName;
       	var attrs = element.attributes;
       	for(var i = 0; i < attrs.length; i++) {
       		var attr = attrs.item(i);
       		ret += ' ' + attr.name + '="' + attr.value + '"';
       	}
       	ret += ">";
       	ret += Holyavenger.ReadText(element);
       	ret += "</" + element.nodeName + ">";
       
   	} else if(element.nodeType == 3 || element.nodeType == 4) {
       	// It is text or cdata
       	ret += element.data;
       
    } else {
   	    Holyavenger.Debug("nodeType unknown: " + element.nodeType);
   	}
	return ret;    
}


Holyavenger.ReadText = function(element) {
    var ret = "";
	var list = element.childNodes;
	for(var i = 0; i < list.length; i++) {
    	var child = list.item(i);
    	ret += Holyavenger.WriteXML(child);
	}	
	return ret;
}

Holyavenger.Parser = {
}

Holyavenger.Parser.action = {
	parse : function(element) {
		var comps = new Array();
	    var id = element.getAttribute('id');
	    if (id){
	    	comps[0] = $("#" + id)[0];	
	    } else {
	    	var selector = element.getAttribute('selector');
	    	comps = $(selector);	    	
		    if(!selector) {
		    	throw "<action/> requires id or selector attribute";
		    }
		}
	    if(comps.length == 0) {
	    	throw "Component not found: " + selector;
	    }
	    for(var i = 0; i < comps.length; i++) {
	    	var comp = $(comps[i]);
	        var attr = element.getAttribute('attribute');
	        var content = Holyavenger.ReadText(element);
	        var append = element.getAttribute('append');
	        if(attr) {
	            var strip = content.strip();
	            Holyavenger.Debug("action on " + selector + " -" + attr + " = " + strip);
	            comp.setAttribute(attr, strip);				
	        } else {
	            Holyavenger.Debug("action on " + selector + " -innerHTML");
	            if (append) {
					comp.append(content);
				} else {
					comp.html(content);
				}
	        }
		}
	}
}

Holyavenger.Parser.script = {
	parse : function(element) {
	    var list = element.childNodes;
	    var text = Holyavenger.ReadText(element);
	    Holyavenger.Debug("script: '" + text + "'");
			eval(text);
	}
}

$HL = function(uri, opts) {
	Holyavenger.Process(uri, opts);
}

Holyavenger.AutoLoad = function() {
	$(':hl').each(function(){
		for(var i=0; i<this.attributes.length; i++){
			if(this.attributes[i].name.indexOf(':') != -1){
				var attrName = this.attributes[i].name;
				var eventName = attrName.replace('hl:on', '');
				var value = this.attributes[i].value;
			}
		}
		$(this).bind(eventName, function(){
			var comp = this;
			var opts = {};
			if (comp != null) {
				var noSubmit = $(this).attr("hl:nosubmit");
				if (!noSubmit) {
					var form = $(comp.form);
					if (form) {
						opts.form = form;
					}
				}
				$(this).removeAttr("hl:nosubmit");
			}
			Holyavenger.Process(value, opts);
		});
		$(this).removeAttr(attrName);		
	});
}

Holyavenger.addEvent( { name: "Holyavenger.AutoLoad", onLoad: Holyavenger.AutoLoad } );
