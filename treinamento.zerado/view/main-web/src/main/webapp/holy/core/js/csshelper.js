var cssHelper = {
    initialize: function () {
    	this.body = this.getBody();
        this.createPanel();
    },
	createPanel: function () {
	
		var div = document.createElement('div');
		div.style.cssText =  "position: fixed; top: 1%; left: 85%;";
		
		var buttonReload = document.createElement('button');
		buttonReload.appendChild(document.createTextNode('Recarregar'));
		buttonReload.onclick = function () { cssHelper.reload() };
		var buttonDialog = document.createElement('button');
		buttonDialog.appendChild(document.createTextNode('Configurar'));
		buttonDialog.onclick = function () { cssHelper.createDialog() };
		div.appendChild(buttonReload);
		div.appendChild(buttonDialog);
		this.body.appendChild(div);
		
	},
    reload: function () {
        links = this.getLinkStylesheets();
        if (links.length > 0) {
            for (i = 0; i < links.length; i++) {
				link = links[i].href;
				if (link.indexOf('?') > 0) {
					novoLink = link.substring(0, link.indexOf('?'));
				} else {
					novoLink = link; 
				}
				d = new Date();
				novoLink = novoLink + '?' + d.getTime();
				links[i].href = novoLink;
            }
        }
    },    
    getBody: function () {
    	body = document.getElementsByTagName('body');
		return body[0];
    },
	getLinkStylesheets: function () {
	    elements = document.getElementsByTagName('link');
	    links = new Array();
	    j = 0;
	    for (i = 0; i < elements.length; i++) {
	        if (elements[i].getAttribute('type') == 'text/css' ||
	        	elements[i].getAttribute('rel') == 'stylesheet') {
	            links[j++] = elements[i];
	        }
	    }
	    return links;
	}, 
	setAndReload: function () {
		inputs = this.dialog.getElementsByTagName('input');
		links = this.getLinkStylesheets();
		for (i = 0; i < inputs.length; i++) {
			if (inputs[i].value != '') {
				links[i].href = inputs[i].value;
			}
		}
		this.destroyDialog();
		this.reload();
	},
	createDialog: function () {
		var div = document.createElement('div');
		div.style.cssText = "position: fixed; top: 0; left: 0; background: white; height: 450px; overflow: show;";
		
		var buttonSetAndReload = document.createElement('button');
		buttonSetAndReload.appendChild(document.createTextNode('Alterar e Recarregar'));
		buttonSetAndReload.onclick = function () { cssHelper.setAndReload() };
		
		var buttonDestroy = document.createElement('button');
		buttonDestroy.appendChild(document.createTextNode('Cancelar'));
		buttonDestroy.onclick = function () { cssHelper.destroyDialog() };
		
		var dl = document.createElement('dl');
		links = this.getLinkStylesheets();
		for (i = 0; i < links.length; i++) {
			var dt = document.createElement('dt');
			dt.appendChild(document.createTextNode(links[i].href));
			
			var dd = document.createElement('dd');
			var input = document.createElement('input');
			input.setAttribute('type','text');
			input.setAttribute('size','50');
			
			dd.appendChild(input);
			dt.appendChild(dd);
			dl.appendChild(dt);
		}
		
		div.appendChild(buttonSetAndReload);
		div.appendChild(buttonDestroy);
		div.appendChild(dl);
		this.dialog = div;
		this.body.appendChild(div);

	},
	destroyDialog: function () {
		this.dialog.parentNode.removeChild(this.dialog);
	}
};

if (debug >= 3 && BrowserDetect.browser != "Explorer") {
    $(document).ready(function(){
       cssHelper.initialize();
    });
}