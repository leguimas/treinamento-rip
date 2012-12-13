function HolyavengerSvnVersion(root, url)
{
	var version = url.substr(root.length).split("/");
        return (version[1] == "trunk")? version[1] : version[1]+'/'+version[2];
}

function HolyavengerSvnDate(dateString)
{
	var d = dateString.substr(0,10).split("-");
	var h = dateString.substr(11,8).split(":");
	var date = new Date();
	date.setUTCFullYear(d[0]);
	date.setUTCMonth(d[1]);
	date.setUTCDate(d[2]);
	date.setUTCHours(h[0]);
	date.setUTCMinutes(h[1]);
	date.setUTCSeconds(h[2].substr(0,2));
	return date;
}

function HolyavengerSvn(file)
{
	var result;
	var file = (typeof(file) == 'undefined')? "holy/version.xml" : file;
	$.ajax({
		async: false,
		type: "GET",
		url: file,
		dataType: "xml",
		success: function(xml) {
			var root    = $(xml).find('root').text();
			var url     = $(xml).find('url').text();
			var version = HolyavengerSvnVersion(root, url);  
			var date    = HolyavengerSvnDate($(xml).find('date').text())
			result = { root: root,
					   url: url,
			           revision: $(xml).find('commit').attr('revision'),
					   author: $(xml).find('author').text(),
					   date: date,
					   version: version
			};
		}
	});
	return result;
}

function easterEgg(target, buttonId, turn, keys)
{
	if(typeof(turn) != "undefined"){
		if(turn){
			$(buttonId).show();
		}
	}
	var kkeys  = [];
	var secret = (typeof(keys) == "undefined")? "38,38,40,40,37,39,37,39,66,65" : keys;
	$(document).keydown(function(e) {
	  kkeys.push( e.keyCode );
	  if ( kkeys.toString().indexOf( secret ) >= 0 ){
	    $(document).unbind('keydown',arguments.callee);
	    $HL(target);     
	  }
	});
}