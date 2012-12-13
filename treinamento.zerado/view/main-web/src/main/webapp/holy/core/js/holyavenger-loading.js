Holyavenger.Loading = {};

Holyavenger.Loading.Popup = {};

Holyavenger.Loading.Popup.div = null;
Holyavenger.Loading.Popup.internalDiv = null;
Holyavenger.Loading.Popup.showPopup = false;

Holyavenger.Loading.Popup.getDiv = function() {
	if(Holyavenger.Loading.Popup.div != null) {
		return Holyavenger.Loading.Popup.div;
	}
	Holyavenger.Loading.Popup.internalDiv = $.create("div",  { "class": "holyLoadingInternal" }, [ "Carregando" ]);
	Holyavenger.Loading.Popup.internalDiv.innerHTML = "<p><em>Carregando...</em><br/>Por favor, aguarde.</p>";
	Holyavenger.Loading.Popup.div = $.create("div", { "class": "holyLoading" }, [ Holyavenger.Loading.Popup.internalDiv ]);
	Holyavenger.Loading.Popup.show();
	Holyavenger.Loading.Popup.hide();
	document.body.appendChild(Holyavenger.Loading.Popup.div);
	return Holyavenger.Loading.Popup.div;
}

Holyavenger.Loading.Popup.show = function() {
	if (Holyavenger.Loading.Popup.showPopup) {
        Holyavenger.Loading.Popup.getDiv().className = 'holyLoadingShow';
    }
}

Holyavenger.Loading.Popup.hide = function() {
    Holyavenger.Loading.Popup.getDiv().className = 'holyLoadingHide';
    Holyavenger.load.turnoff();
}

Holyavenger.Loading.count = 0;

Holyavenger.Loading.onStartLoad = function(response) {
	Holyavenger.Loading.count++;
	if(Holyavenger.Loading.count == 1) {
		Holyavenger.Debug("Holyavenger.Loading.onStartLoad: " + Holyavenger.Loading.count + " " + response);
		Holyavenger.Loading.Popup.show();
	}
}

Holyavenger.Loading.onLoad = function(opts) {
	Holyavenger.Loading.count--;
	if(Holyavenger.Loading.count == 0) {
		Holyavenger.Debug("Holyavenger.Loading.onLoad: " + Holyavenger.Loading.count + " " + opts);
		Holyavenger.Loading.Popup.hide();
	}
}

Holyavenger.addEvent( {
	name: "Holyavenger.Loading",
	onStartLoad: Holyavenger.Loading.onStartLoad,
	onLoad: Holyavenger.Loading.onLoad,
	onError: Holyavenger.Loading.onLoad } );

